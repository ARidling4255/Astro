import { MOVEMENTS } from "@/lib/fitness/catalog";
import type {
  ClassKind,
  Draft,
  DraftLine,
  Effort,
  Goal,
  HistoryFilter,
  Movement,
  Profile,
  Recovery,
  SessionLog,
  Sex,
  Unit,
} from "@/lib/fitness/types";

export type DaySkips = {
  date: string;
  ids: string[];
};

export type HeftSnapshot = {
  movements: Movement[];
  logs: SessionLog[];
  goals: Goal[];
  recovery: Recovery | null;
  profile: Profile;
  draft: Draft;
  historyMovementId: string;
  historyFilter: HistoryFilter;
  skipped: DaySkips;
};

const EFFORTS = new Set<Effort>(["easy", "just-right", "hard"]);
const KINDS = new Set<ClassKind>(["strength", "cardio"]);
const UNITS = new Set<Unit>(["lb", "in"]);
const CONTEXTS = new Set(["poor-sleep", "wine"]);
const SEXES = new Set<Sex>(["female", "male", "unspecified"]);
const GOAL_KINDS = new Set(["load", "milestone", "endurance", "calories"]);
const FILTERS = new Set<HistoryFilter>(["strength", "cardio", "mixed"]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function text(value: unknown, max: number) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}

function looseText(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.slice(0, max);
}

function num(value: unknown, min: number, max: number) {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  if (value < min || value > max) return null;
  return value;
}

function flag(value: unknown) {
  return value === true;
}

function iso(value: unknown) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : null;
}

function blankDraft(date: string): Draft {
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

function movement(value: unknown): Movement | null {
  if (!isRecord(value)) return null;
  const id = text(value.id, 64);
  const name = text(value.name, 80);
  const unit = UNITS.has(value.unit as Unit) ? (value.unit as Unit) : null;
  const increment = num(value.increment, 1, 50);
  const order = num(value.order, 0, 9999);
  if (!id || !name || !unit || increment == null || order == null) return null;
  const aliases = Array.isArray(value.aliases)
    ? value.aliases
        .map((alias) => text(alias, 48))
        .filter((alias): alias is string => Boolean(alias))
        .slice(0, 12)
    : [];
  const heardAs = text(value.heardAs, 80);
  return { id, name, aliases, unit, increment, order, ...(heardAs ? { heardAs } : {}) };
}

function draftLine(value: unknown): DraftLine | null {
  if (!isRecord(value)) return null;
  const movementId = text(value.movementId, 64);
  const key = text(value.key, 80);
  const load = num(value.value, 0, 2000);
  const effort = EFFORTS.has(value.effort as Effort) ? (value.effort as Effort) : null;
  if (!movementId || !key || load == null || !effort) return null;
  const context = CONTEXTS.has(value.context as string) ? (value.context as DraftLine["context"]) : undefined;
  const effortWord = text(value.effortWord, 40) ?? undefined;
  return { key, movementId, value: load, effort, ...(context ? { context } : {}), ...(effortWord ? { effortWord } : {}) };
}

function draft(value: unknown): Draft {
  if (!isRecord(value)) return blankDraft("1970-01-01");
  const date = iso(value.date) ?? "1970-01-01";
  const classKind = KINDS.has(value.classKind as ClassKind) ? (value.classKind as ClassKind) : "strength";
  const phase = value.phase === "review" ? "review" : "compose";
  const lines = Array.isArray(value.lines) ? value.lines.map(draftLine).filter((line): line is DraftLine => Boolean(line)).slice(0, 40) : [];
  const error = text(value.error, 160) ?? undefined;
  return {
    date,
    classKind,
    transcript: looseText(value.transcript, 2000),
    lines,
    phase,
    editing: flag(value.editing),
    savedTick: num(value.savedTick, 0, Number.MAX_SAFE_INTEGER) ?? 0,
    datePinned: flag(value.datePinned),
    ...(error ? { error } : {}),
  };
}

function log(value: unknown): SessionLog | null {
  if (!isRecord(value)) return null;
  const id = text(value.id, 96);
  const date = iso(value.date);
  const movementId = text(value.movementId, 64);
  const classKind = KINDS.has(value.classKind as ClassKind) ? (value.classKind as ClassKind) : null;
  const load = num(value.value, 0, 2000);
  const effort = EFFORTS.has(value.effort as Effort) ? (value.effort as Effort) : null;
  if (!id || !date || !movementId || !classKind || load == null || !effort) return null;
  const context = CONTEXTS.has(value.context as string) ? (value.context as SessionLog["context"]) : undefined;
  const note = text(value.note, 80) ?? undefined;
  return {
    id,
    date,
    movementId,
    classKind,
    value: load,
    effort,
    setAside: flag(value.setAside),
    ...(context ? { context } : {}),
    ...(note ? { note } : {}),
  };
}

function goal(value: unknown): Goal | null {
  if (!isRecord(value)) return null;
  const id = text(value.id, 64);
  const title = text(value.title, 80);
  const kind = GOAL_KINDS.has(value.kind as string) ? (value.kind as Goal["kind"]) : null;
  if (!id || !title || !kind) return null;
  const movementId = text(value.movementId, 64) ?? undefined;
  const target = num(value.target, 0, 100000) ?? undefined;
  const progress = num(value.progress, 0, 100) ?? undefined;
  return { id, title, kind, ...(movementId ? { movementId } : {}), ...(target != null ? { target } : {}), ...(progress != null ? { progress } : {}) };
}

function profile(value: unknown): Profile {
  const source = isRecord(value) ? value : {};
  const sex = SEXES.has(source.sex as Sex) ? (source.sex as Sex) : null;
  return {
    sex,
    age: num(source.age, 13, 100),
    weightLb: num(source.weightLb, 70, 500),
    heightIn: num(source.heightIn, 48, 96),
    classMinutes: num(source.classMinutes, 15, 180) ?? 45,
  };
}

function skips(value: unknown): DaySkips {
  if (!isRecord(value)) return { date: "", ids: [] };
  const date = iso(value.date) ?? "";
  const ids = Array.isArray(value.ids)
    ? value.ids
        .map((id) => text(id, 64))
        .filter((id): id is string => Boolean(id))
        .slice(0, 12)
    : [];
  return { date, ids };
}

function recovery(value: unknown): Recovery | null {
  if (!isRecord(value)) return null;
  const dropBpm = num(value.dropBpm, 0, 80);
  const previousDrop = num(value.previousDrop, 0, 80);
  const highZoneMin = num(value.highZoneMin, 0, 180);
  const previousWhen = text(value.previousWhen, 40);
  const note = text(value.note, 160);
  if (dropBpm == null || previousDrop == null || highZoneMin == null || !previousWhen || !note) return null;
  return { dropBpm, previousDrop, previousWhen, highZoneMin, note };
}

export function sanitizeSnapshot(input: unknown): HeftSnapshot | null {
  if (!isRecord(input)) return null;
  const movements = Array.isArray(input.movements)
    ? input.movements.map(movement).filter((item): item is Movement => Boolean(item)).slice(0, 120)
    : [];
  const logs = Array.isArray(input.logs) ? input.logs.map(log).filter((item): item is SessionLog => Boolean(item)).slice(0, 1500) : [];
  const goals = Array.isArray(input.goals) ? input.goals.map(goal).filter((item): item is Goal => Boolean(item)).slice(0, 40) : [];
  const owned = movements.length > 0 ? movements : MOVEMENTS.map((item) => ({ ...item, aliases: [...item.aliases] }));
  const historyMovementId = text(input.historyMovementId, 64) ?? owned[0]?.id ?? "goblet-squat";
  const historyFilter = FILTERS.has(input.historyFilter as HistoryFilter)
    ? (input.historyFilter as HistoryFilter)
    : "strength";
  return {
    movements: owned,
    logs,
    goals,
    recovery: recovery(input.recovery),
    profile: profile(input.profile),
    draft: draft(input.draft),
    historyMovementId,
    historyFilter,
    skipped: skips(input.skipped),
  };
}

export function snapshotBytes(snapshot: HeftSnapshot) {
  return JSON.stringify(snapshot).length;
}
