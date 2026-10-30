import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { MOVEMENTS, EXERCISE_LIBRARY, sessionId } from "@/lib/fitness/catalog";
import { bumpEndurance, blankProfile, parseTranscript, todayIso } from "@/lib/fitness/logic";
import type { HeftSnapshot } from "@/lib/fitness/snapshot";
import type {
  Draft,
  DraftLine,
  Effort,
  Goal,
  HistoryFilter,
  Movement,
  Profile,
  Recovery,
  SessionLog,
} from "@/lib/fitness/types";

type HeftState = HeftSnapshot & {
  setHistoryMovement: (id: string) => void;
  setHistoryFilter: (filter: HistoryFilter) => void;
  setAside: (logId: string, value: boolean) => void;
  setDraft: (patch: Partial<Draft>) => void;
  upsertDraftLine: (movementId: string, patch: Partial<DraftLine>) => void;
  removeDraftLine: (key: string) => void;
  addDraftLine: () => void;
  applyTranscript: (text: string) => void;
  repeatClass: (entries: Array<Pick<SessionLog, "movementId" | "value" | "effort" | "context">>) => void;
  saveDraft: () => void;
  logRecommended: (
    date: string,
    classKind: SessionLog["classKind"],
    lines: Array<{ movementId: string; value: number; reps: number }>,
  ) => void;
  startNewLog: (date: string) => void;
  rollDraftTo: (date: string, force?: boolean) => void;
  addGoal: (goal: Goal) => void;
  updateGoal: (id: string, patch: Partial<Goal>) => void;
  removeGoal: (id: string) => void;
  setRecovery: (recovery: Recovery | null) => void;
  setProfile: (patch: Partial<Profile>) => void;
  addMovement: (movement: Movement) => void;
  clearLogs: () => void;
  skipRecommended: (date: string, movementId: string) => void;
  hydrate: (snapshot: HeftSnapshot) => void;
};

const DEMO_GOAL_IDS = new Set(["goal-deadlift", "goal-box", "goal-cardio"]);

function cloneMovements() {
  return MOVEMENTS.map((movement) => ({ ...movement, aliases: [...movement.aliases] }));
}

export function blankDraft(date = todayIso()): Draft {
  return {
    date,
    classKind: "strength",
    transcript: "",
    lines: [],
    phase: "compose",
    editing: false,
    savedTick: 0,
    datePinned: false,
  };
}

function freshData(): HeftSnapshot {
  const movements = cloneMovements();
  return {
    movements,
    logs: [],
    goals: [],
    recovery: null,
    profile: blankProfile(),
    draft: blankDraft(),
    historyMovementId: movements[0]?.id ?? "goblet-squat",
    historyFilter: "strength",
    skipped: { date: "", ids: [] },
  };
}

function wipePersisted(persisted: unknown): HeftSnapshot {
  const prev = (persisted ?? {}) as Partial<HeftSnapshot>;
  const movements =
    Array.isArray(prev.movements) && prev.movements.length > 0 ? prev.movements : cloneMovements();
  const goals = Array.isArray(prev.goals) ? prev.goals.filter((goal) => !DEMO_GOAL_IDS.has(goal.id)) : [];
  const profile =
    prev.profile && typeof prev.profile === "object"
      ? { ...blankProfile(), ...prev.profile }
      : blankProfile();
  return {
    movements,
    logs: [],
    goals,
    recovery: null,
    profile,
    draft: blankDraft(),
    historyMovementId: movements[0]?.id ?? "goblet-squat",
    historyFilter: "strength",
    skipped: { date: "", ids: [] },
  };
}

const memoryStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

export const useHeft = create<HeftState>()(
  persist(
    (set, get) => ({
      ...freshData(),
      setHistoryMovement: (id) => set({ historyMovementId: id }),
      setHistoryFilter: (filter) => set({ historyFilter: filter }),
      setAside: (logId, value) =>
        set({
          logs: get().logs.map((log) => (log.id === logId ? { ...log, setAside: value } : log)),
        }),
      setDraft: (patch) => set({ draft: { ...get().draft, ...patch, savedTick: patch.savedTick ?? 0 } }),
      upsertDraftLine: (movementId, patch) => {
        const { draft } = get();
        const existing = draft.lines.find((line) => line.movementId === movementId);
        const lines = existing
          ? draft.lines.map((line) => (line.movementId === movementId ? { ...line, ...patch } : line))
          : [
              ...draft.lines,
              {
                key: movementId,
                movementId,
                value: 0,
                effort: "just-right" as Effort,
                ...patch,
              },
            ];
        set({ draft: { ...draft, lines, savedTick: 0, error: undefined } });
      },
      removeDraftLine: (key) =>
        set({
          draft: {
            ...get().draft,
            savedTick: 0,
            lines: get().draft.lines.filter((line) => line.key !== key && line.movementId !== key),
          },
        }),
      addDraftLine: () => {
        const { movements, draft } = get();
        const used = new Set(draft.lines.map((line) => line.movementId));
        const movement = movements.find((item) => !used.has(item.id)) ?? movements[0];
        if (!movement) return;
        const line: DraftLine = {
          key: `${movement.id}-${Date.now()}`,
          movementId: movement.id,
          value: 0,
          effort: "just-right",
        };
        set({
          draft: { ...draft, savedTick: 0, editing: true, phase: "compose", lines: [...draft.lines, line] },
        });
      },
      applyTranscript: (text) => {
        const { draft, movements } = get();
        const knownIds = new Set(movements.map((movement) => movement.id));
        const known = [
          ...movements,
          ...EXERCISE_LIBRARY.filter((movement) => !knownIds.has(movement.id)),
        ];
        const parsed = parseTranscript(text, draft.classKind, known);
        if (parsed.lines.length === 0) {
          set({
            draft: {
              ...draft,
              transcript: text,
              phase: "compose",
              savedTick: 0,
              error: 'Name the lift and the weight. Try "Deadlift 115, pretty tough."',
            },
          });
          return;
        }
        let lines = draft.lines.slice();
        const added: Movement[] = [];
        for (const line of parsed.lines) {
          const next: DraftLine = { ...line, key: line.movementId };
          const index = lines.findIndex((item) => item.movementId === line.movementId);
          if (index >= 0) lines[index] = { ...lines[index], ...next };
          else lines = [...lines, next];
          if (!knownIds.has(line.movementId)) {
            const fromLibrary = EXERCISE_LIBRARY.find((movement) => movement.id === line.movementId);
            if (fromLibrary) added.push(fromLibrary);
          }
        }
        set({
          movements: added.length > 0 ? [...movements, ...added] : movements,
          draft: {
            ...draft,
            transcript: text,
            classKind: parsed.classKind,
            lines,
            phase: "compose",
            editing: false,
            savedTick: 0,
            error: undefined,
          },
        });
      },
      repeatClass: (entries) => {
        const { draft } = get();
        let lines = draft.lines.slice();
        for (const entry of entries) {
          const next: DraftLine = {
            key: entry.movementId,
            movementId: entry.movementId,
            value: entry.value,
            effort: entry.effort,
            context: entry.context,
          };
          const index = lines.findIndex((item) => item.movementId === entry.movementId);
          if (index >= 0) lines[index] = { ...lines[index], ...next };
          else lines = [...lines, next];
        }
        set({ draft: { ...draft, lines, savedTick: 0, error: undefined, transcript: "" } });
      },
      saveDraft: () => {
        const { draft, logs, goals } = get();
        const ready = draft.lines.filter((line) => line.value > 0);
        if (ready.length === 0) return;
        let nextLogs = logs.slice();
        let nextGoals = goals.slice();
        for (const line of ready) {
          const id = sessionId(line.movementId, draft.date, draft.classKind);
          const existing = nextLogs.find((log) => log.id === id);
          if (!existing) {
            nextLogs.push({
              id,
              date: draft.date,
              movementId: line.movementId,
              classKind: draft.classKind,
              value: line.value,
              effort: line.effort,
              context: line.context,
              setAside: false,
            });
            if (draft.classKind === "cardio") nextGoals = bumpEndurance(nextGoals, line.effort);
          } else {
            const effortChanged = existing.effort !== line.effort;
            nextLogs = nextLogs.map((log) =>
              log.id === id
                ? {
                    ...log,
                    value: line.value,
                    effort: line.effort,
                    context: line.context,
                    note: log.note,
                  }
                : log,
            );
            if (effortChanged && draft.classKind === "cardio") {
              nextGoals = bumpEndurance(nextGoals, line.effort);
            }
          }
        }
        set({
          logs: nextLogs,
          goals: nextGoals,
          draft: { ...draft, savedTick: Date.now(), editing: false, error: undefined },
        });
      },
      startNewLog: (date) => set({ draft: blankDraft(date) }),
      logRecommended: (date, classKind, lines) => {
        const { logs, goals, movements } = get();
        let nextMovements = movements.slice();
        let nextLogs = logs.slice();
        let nextGoals = goals.slice();
        for (const line of lines) {
          if (line.value <= 0) continue;
          if (!nextMovements.some((movement) => movement.id === line.movementId)) {
            const fromLibrary = EXERCISE_LIBRARY.find((movement) => movement.id === line.movementId);
            if (!fromLibrary) continue;
            nextMovements = [...nextMovements, { ...fromLibrary, order: nextMovements.length + fromLibrary.order }];
          }
          const id = sessionId(line.movementId, date, classKind);
          if (nextLogs.some((log) => log.id === id && !log.setAside && log.value > 0)) continue;
          nextLogs = nextLogs.filter((log) => log.id !== id);
          nextLogs.push({
            id,
            date,
            movementId: line.movementId,
            classKind,
            value: line.value,
            effort: "just-right",
            setAside: false,
            note: `${line.reps} reps`,
          });
          if (classKind === "cardio") nextGoals = bumpEndurance(nextGoals, "just-right");
        }
        set({ movements: nextMovements, logs: nextLogs, goals: nextGoals });
      },
      rollDraftTo: (date, force = false) => {
        if (!date) return;
        const { draft } = get();
        const dirty =
          draft.savedTick === 0 &&
          (draft.lines.some((line) => line.value > 0) || draft.transcript.trim().length > 0);
        if (!force) {
          if (draft.datePinned || draft.date === date || dirty) return;
          set({ draft: { ...blankDraft(date), classKind: draft.classKind } });
          return;
        }
        if (dirty) return;
        if (draft.date === date && !draft.datePinned) return;
        set({ draft: { ...blankDraft(date), classKind: draft.classKind } });
      },
      addGoal: (goal) => set({ goals: [...get().goals, goal] }),
      updateGoal: (id, patch) =>
        set({ goals: get().goals.map((goal) => (goal.id === id ? { ...goal, ...patch } : goal)) }),
      removeGoal: (id) => set({ goals: get().goals.filter((goal) => goal.id !== id) }),
      setRecovery: (recovery) => set({ recovery }),
      setProfile: (patch) => set({ profile: { ...get().profile, ...patch } }),
      addMovement: (movement) => set({ movements: [...get().movements, movement] }),
      clearLogs: () =>
        set({
          logs: [],
          recovery: null,
          draft: blankDraft(todayIso()),
          skipped: { date: "", ids: [] },
        }),
      skipRecommended: (date, movementId) => {
        if (!date || !movementId) return;
        const current = get().skipped ?? { date: "", ids: [] };
        const ids = current.date === date ? current.ids : [];
        if (ids.includes(movementId)) return;
        set({ skipped: { date, ids: [...ids, movementId] } });
      },
      hydrate: (snapshot) => set({ ...snapshot }),
    }),
    {
      name: "heft-v1",
      version: 2,
      migrate: (persisted) => wipePersisted(persisted),
      storage: createJSONStorage(() =>
        typeof window === "undefined" ? memoryStorage : window.localStorage,
      ),
      skipHydration: true,
      partialize: (state) => ({
        movements: state.movements,
        logs: state.logs,
        goals: state.goals,
        recovery: state.recovery,
        profile: state.profile,
        draft: state.draft,
        historyMovementId: state.historyMovementId,
        historyFilter: state.historyFilter,
        skipped: state.skipped,
      }),
    },
  ),
);

export function readSnapshot(): HeftSnapshot {
  const state = useHeft.getState();
  return {
    movements: state.movements,
    logs: state.logs,
    goals: state.goals,
    recovery: state.recovery,
    profile: state.profile,
    draft: state.draft,
    historyMovementId: state.historyMovementId,
    historyFilter: state.historyFilter,
    skipped: state.skipped ?? { date: "", ids: [] },
  };
}

