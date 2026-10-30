import { useState } from "react";
import { Sheet } from "@/components/fitness/sheet";
import { OrbitDivider } from "@/components/fitness/marks";
import { cn } from "@/lib/cn";
import { goalKindLabel, goalSnapshot, recoveryCopy } from "@/lib/fitness/logic";
import { useHeft } from "@/lib/fitness/store";
import type { Goal, GoalKind, Recovery } from "@/lib/fitness/types";

export function GoalsScreen() {
  const goals = useHeft((state) => state.goals);
  const movements = useHeft((state) => state.movements);
  const logs = useHeft((state) => state.logs);
  const profile = useHeft((state) => state.profile);
  const recovery = useHeft((state) => state.recovery);
  const addGoal = useHeft((state) => state.addGoal);
  const updateGoal = useHeft((state) => state.updateGoal);
  const removeGoal = useHeft((state) => state.removeGoal);
  const setRecovery = useHeft((state) => state.setRecovery);
  const clearLogs = useHeft((state) => state.clearLogs);

  const [goalOpen, setGoalOpen] = useState(false);
  const [editing, setEditing] = useState<Goal | null>(null);
  const [recoveryOpen, setRecoveryOpen] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-balance">Goals</h1>
        <button
          type="button"
          onClick={() => {
            setEditing(null);
            setGoalOpen(true);
          }}
          className="capsule-quiet px-4 py-2 text-xs"
        >
          + Add goal
        </button>
      </div>

      <ul className="mt-6 space-y-3">
        {goals.length === 0 ? (
          <li className="rounded-3xl border border-line bg-card p-4 text-sm leading-relaxed text-muted">
            No goals yet.
          </li>
        ) : null}
        {goals.map((goal) => {
          const movement = movements.find((item) => item.id === goal.movementId);
          const snap = goalSnapshot(goal, movement, logs, profile);
          return (
            <li key={goal.id}>
              <button
                type="button"
                onClick={() => {
                  setEditing(goal);
                  setGoalOpen(true);
                }}
                className="w-full rounded-3xl border border-line bg-card p-4 text-left"
              >
                <span className="flex items-baseline justify-between gap-3">
                  <span className="text-lg font-bold">{goal.title}</span>
                  <span className="shrink-0 text-sm text-muted">{goalKindLabel(goal.kind)}</span>
                </span>
                <span className="mt-3 block h-2 overflow-hidden rounded-full bg-track">
                  <span className="block h-full rounded-full bg-pop" style={{ width: `${snap.progress}%` }} />
                </span>
                <span className="mt-3 flex items-center justify-between gap-3 text-sm">
                  <span>{snap.left}</span>
                  <span className="text-right">{snap.right}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <OrbitDivider />
      <div className="flex items-end justify-between gap-3">
        <h2 className="text-base">Effort and recovery</h2>
        <p className="text-xs font-semibold tracking-wide text-muted">WATCH · OPTIONAL</p>
      </div>

      {recovery ? (
        <RecoveryCard recovery={recovery} onEdit={() => setRecoveryOpen(true)} />
      ) : (
        <button
          type="button"
          onClick={() => setRecoveryOpen(true)}
          className="mt-3 w-full rounded-3xl border border-line bg-hero p-5 text-left text-on-hero"
        >
          <p className="font-semibold">No watch reading yet</p>
          <p className="mt-1 text-sm text-hero-muted">Add heart-rate recovery if you wear one. It's optional.</p>
        </button>
      )}

      <button
        type="button"
        onClick={() => {
          if (!confirmClear) {
            setConfirmClear(true);
            return;
          }
          clearLogs();
          setConfirmClear(false);
        }}
        className="mt-8 text-sm font-semibold text-muted"
      >
        {confirmClear ? "Tap again to clear logs" : "Clear logs"}
      </button>

      <GoalSheet
        open={goalOpen}
        initial={editing}
        onClose={() => setGoalOpen(false)}
        onSave={(goal) => {
          if (editing) updateGoal(editing.id, goal);
          else addGoal({ ...goal, id: `goal-${Date.now()}` });
          setGoalOpen(false);
        }}
        onRemove={
          editing
            ? () => {
                removeGoal(editing.id);
                setGoalOpen(false);
              }
            : undefined
        }
      />
      <RecoverySheet
        open={recoveryOpen}
        initial={recovery}
        onClose={() => setRecoveryOpen(false)}
        onSave={(next) => {
          setRecovery(next);
          setRecoveryOpen(false);
        }}
        onClear={() => {
          setRecovery(null);
          setRecoveryOpen(false);
        }}
      />
    </div>
  );
}

function RecoveryCard({ recovery, onEdit }: { recovery: Recovery; onEdit: () => void }) {
  const copy = recoveryCopy(recovery);
  return (
    <div className="mt-3 rounded-3xl border border-line bg-hero p-5 text-on-hero">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-hero-muted">Cardio recovery</p>
          <p className="mt-1 text-3xl font-semibold text-orange tabular-nums">{copy.drop}</p>
          <p className="mt-1 text-sm leading-snug text-hero-muted">{copy.dropDetail}</p>
        </div>
        <div>
          <p className="text-sm text-hero-muted">Cardio days, high zones</p>
          <p className="mt-1 text-3xl font-semibold text-navy tabular-nums">{copy.zone}</p>
          <p className="mt-1 text-sm leading-snug text-hero-muted">{copy.zoneDetail}</p>
        </div>
      </div>
      <p className="mt-4 border-t border-hero-line pt-4 text-sm leading-relaxed">{recovery.note}</p>
      <button type="button" onClick={onEdit} className="mt-3 text-sm font-semibold text-orange">
        Update
      </button>
    </div>
  );
}

function GoalSheet({
  open,
  initial,
  onClose,
  onSave,
  onRemove,
}: {
  open: boolean;
  initial: Goal | null;
  onClose: () => void;
  onSave: (goal: Omit<Goal, "id">) => void;
  onRemove?: () => void;
}) {
  return (
    <Sheet open={open} title={initial ? "Edit goal" : "Add a goal"} onClose={onClose}>
      {open ? (
        <GoalForm key={initial?.id ?? "new"} initial={initial} onSave={onSave} onRemove={onRemove} />
      ) : null}
    </Sheet>
  );
}

function GoalForm({
  initial,
  onSave,
  onRemove,
}: {
  initial: Goal | null;
  onSave: (goal: Omit<Goal, "id">) => void;
  onRemove?: () => void;
}) {
  const movements = useHeft((state) => state.movements);
  const [kind, setKind] = useState<GoalKind>(initial?.kind ?? "load");
  const [movementId, setMovementId] = useState(initial?.movementId ?? movements[0]?.id ?? "");
  const [target, setTarget] = useState(initial?.target ? String(initial.target) : "");
  const [title, setTitle] = useState(initial?.title ?? "");
  const [titleDirty, setTitleDirty] = useState(Boolean(initial));

  const movement = movements.find((item) => item.id === movementId);
  const targetNumber = Number(target);
  const auto =
    kind === "endurance"
      ? "Easier cardio days"
      : kind === "calories" && targetNumber > 0
        ? `Burn ${targetNumber.toLocaleString()} kcal a week`
        : movement && targetNumber > 0
          ? kind === "milestone" && movement.unit === "in"
            ? `${targetNumber}-inch ${movement.name.toLowerCase()}`
            : `${movement.name} ${targetNumber} ${movement.unit === "in" ? "in" : "lb"}`
          : "";
  const shownTitle = titleDirty ? title : auto || title;

  return (
    <form
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        if (kind !== "endurance" && !(targetNumber > 0)) return;
        onSave({
          title: shownTitle || "New goal",
          kind,
          movementId: kind === "endurance" || kind === "calories" ? undefined : movementId,
          target: kind === "endurance" ? undefined : targetNumber,
          progress: kind === "endurance" ? (initial?.progress ?? 24) : undefined,
        });
      }}
    >
      <div className="grid grid-cols-2 gap-1 rounded-2xl bg-just-soft p-1">
        {(["load", "milestone", "endurance", "calories"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              setKind(item);
              if (!titleDirty) setTitle("");
            }}
            className={cn(
              "rounded-xl py-2 text-sm font-semibold",
              kind === item ? "bg-card shadow-sm" : "text-muted",
            )}
          >
            {goalKindLabel(item)}
          </button>
        ))}
      </div>
      {kind === "load" || kind === "milestone" ? (
        <>
          <label className="block text-sm font-semibold" htmlFor="goal-movement">
            Movement
          </label>
          <select
            id="goal-movement"
            value={movementId}
            onChange={(event) => setMovementId(event.target.value)}
            className="w-full rounded-xl border border-line bg-paper px-3 py-3 text-base"
          >
            {movements.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <label className="block text-sm font-semibold" htmlFor="goal-target">
            Target
          </label>
          <input
            id="goal-target"
            inputMode="numeric"
            value={target}
            onChange={(event) => setTarget(event.target.value.replace(/[^\d]/g, ""))}
            className="w-full rounded-xl border border-line bg-paper px-3 py-3 text-base tabular-nums"
          />
        </>
      ) : null}
      {kind === "calories" ? (
        <>
          <label className="block text-sm font-semibold" htmlFor="goal-kcal">
            Kcal each week
          </label>
          <input
            id="goal-kcal"
            inputMode="numeric"
            value={target}
            onChange={(event) => setTarget(event.target.value.replace(/[^\d]/g, ""))}
            className="w-full rounded-xl border border-line bg-paper px-3 py-3 text-base tabular-nums"
          />
        </>
      ) : null}
      <label className="block text-sm font-semibold" htmlFor="goal-title">
        Name
      </label>
      <input
        id="goal-title"
        value={shownTitle}
        onChange={(event) => {
          setTitleDirty(true);
          setTitle(event.target.value);
        }}
        className="w-full rounded-xl border border-line bg-paper px-3 py-3 text-base"
      />
      <button
        type="submit"
        className="capsule h-12 w-full text-sm"
      >
        Save goal
      </button>
      {onRemove ? (
        <button type="button" onClick={onRemove} className="w-full py-2 text-sm font-semibold text-muted">
          Remove goal
        </button>
      ) : null}
    </form>
  );
}

function RecoverySheet({
  open,
  initial,
  onClose,
  onSave,
  onClear,
}: {
  open: boolean;
  initial: Recovery | null;
  onClose: () => void;
  onSave: (recovery: Recovery) => void;
  onClear: () => void;
}) {
  return (
    <Sheet open={open} title="Watch reading" onClose={onClose}>
      {open ? (
        <RecoveryForm key={initial?.dropBpm ?? "empty"} initial={initial} onSave={onSave} onClear={onClear} />
      ) : null}
    </Sheet>
  );
}

function RecoveryForm({
  initial,
  onSave,
  onClear,
}: {
  initial: Recovery | null;
  onSave: (recovery: Recovery) => void;
  onClear: () => void;
}) {
  const [drop, setDrop] = useState(initial ? String(initial.dropBpm) : "28");
  const [previous, setPrevious] = useState(initial ? String(initial.previousDrop) : "22");
  const [when, setWhen] = useState(initial?.previousWhen ?? "Sep");
  const [zone, setZone] = useState(initial ? String(initial.highZoneMin) : "18");
  const [note, setNote] = useState(initial?.note ?? "");

  return (
    <form
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        onSave({
          dropBpm: Number(drop) || 0,
          previousDrop: Number(previous) || 0,
          previousWhen: when || "last month",
          highZoneMin: Number(zone) || 0,
          note: note.trim() || "Logged from your watch.",
        });
      }}
    >
      <Field label="Recovery drop (bpm)" value={drop} onChange={setDrop} numeric />
      <Field label="Previous drop" value={previous} onChange={setPrevious} numeric />
      <Field label="Previous period" value={when} onChange={setWhen} />
      <Field label="High-zone minutes" value={zone} onChange={setZone} numeric />
      <label className="block text-sm font-semibold" htmlFor="watch-note">
        Note
      </label>
      <textarea
        id="watch-note"
        value={note}
        onChange={(event) => setNote(event.target.value)}
        className="min-h-24 w-full resize-none rounded-xl border border-line bg-paper px-3 py-3 text-base leading-relaxed"
      />
      <button
        type="submit"
        className="capsule h-12 w-full text-sm"
      >
        Save reading
      </button>
      <button type="button" onClick={onClear} className="w-full py-2 text-sm font-semibold text-muted">
        Clear reading
      </button>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  numeric,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  numeric?: boolean;
}) {
  const id = label.toLowerCase().replace(/[^a-z]+/g, "-");
  return (
    <>
      <label className="block text-sm font-semibold" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        inputMode={numeric ? "numeric" : "text"}
        value={value}
        onChange={(event) => onChange(numeric ? event.target.value.replace(/[^\d]/g, "") : event.target.value)}
        className="w-full rounded-xl border border-line bg-paper px-3 py-3 text-base"
      />
    </>
  );
}
