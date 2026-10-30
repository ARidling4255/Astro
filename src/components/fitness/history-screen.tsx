import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { Sheet } from "@/components/fitness/sheet";
import { OrbitDivider } from "@/components/fitness/marks";
import {
  chartSectionTitle,
  displayLoad,
  formatShort,
  historyMeta,
  logsFor,
  readyText,
  slugify,
  suggestionForFilter,
} from "@/lib/fitness/logic";
import { useHeft } from "@/lib/fitness/store";
import type { Effort, HistoryFilter, SessionLog } from "@/lib/fitness/types";

const FILTERS: Array<{ id: HistoryFilter; label: string }> = [
  { id: "strength", label: "Strength" },
  { id: "cardio", label: "Cardio" },
  { id: "mixed", label: "Mixed" },
];

function barClass(effort: Effort, setAside: boolean) {
  const color = effort === "easy" ? "bg-coral" : effort === "hard" ? "bg-navy" : "bg-just";
  return setAside ? `${color} opacity-40` : color;
}

export function HistoryScreen() {
  const movements = useHeft((state) => state.movements);
  const logs = useHeft((state) => state.logs);
  const movementId = useHeft((state) => state.historyMovementId);
  const filter = useHeft((state) => state.historyFilter);
  const setMovement = useHeft((state) => state.setHistoryMovement);
  const setFilter = useHeft((state) => state.setHistoryFilter);
  const setAside = useHeft((state) => state.setAside);
  const addMovement = useHeft((state) => state.addMovement);

  const [picker, setPicker] = useState(false);
  const [newName, setNewName] = useState("");
  const movement = movements.find((item) => item.id === movementId) ?? movements[0];

  if (!movement) return null;

  const series = logsFor(logs, movement.id, filter);
  const bars = series.slice(-6);
  const max = Math.max(...bars.map((bar) => bar.value), 1);
  const suggestion = suggestionForFilter(movement, logs, filter);
  const notes = series
    .filter((log) => log.note || log.context || log.effort === "hard")
    .slice()
    .reverse();
  const aliases = movement.aliases.filter((alias) => alias.toLowerCase() !== movement.name.toLowerCase());
  const heard = movement.heardAs ?? aliases.slice(0, 3).map((alias) => `"${alias}"`).join(", ");

  function addNamedMovement() {
    const name = newName.trim();
    if (!name) return;
    const id = `${slugify(name)}-${Date.now().toString().slice(-4)}`;
    addMovement({
      id,
      name,
      aliases: [name.toLowerCase()],
      unit: "lb",
      increment: 5,
      order: movements.length,
    });
    setMovement(id);
    setNewName("");
    setPicker(false);
  }

  return (
    <div>
      <p className="text-xs font-semibold tracking-widest text-muted">HISTORY</p>
      <h1 className="mt-3 text-balance">
        <button type="button" className="text-left" onClick={() => setPicker(true)}>
          {movement.name}
          <ChevronDown className="ml-1 inline size-6 align-middle text-muted" aria-hidden="true" />
        </button>
      </h1>
      {heard ? <p className="mt-1 text-sm leading-relaxed text-muted">Also heard as {heard}</p> : null}

      <div className="mt-5 grid grid-cols-3 rounded-2xl bg-just-soft p-1">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            className={cn(
              "rounded-xl py-2 text-sm font-semibold",
              filter === item.id ? "bg-card text-ink shadow-sm" : "text-muted",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <section className="mt-4 rounded-3xl border border-line bg-card p-4">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h2 className="text-sm font-semibold">{chartSectionTitle(filter)}</h2>
          {suggestion ? (
            <p className="shrink-0 text-sm font-semibold text-orange">{readyText(suggestion, movement)}</p>
          ) : null}
        </div>
        {bars.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted">
            No {filter === "mixed" ? "" : `${filter} `}logs for this yet.
          </p>
        ) : (
          <>
            <div className="flex h-40 items-end gap-1">
              {bars.map((bar) => {
                const height = Math.max(18, Math.round((bar.value / max) * 112));
                return (
                  <button
                    key={bar.id}
                    type="button"
                    className="flex h-full min-w-0 flex-1 flex-col items-center justify-end"
                    aria-label={`${historyMeta(bar, movement)}${bar.setAside ? ", set aside" : ""}`}
                    onClick={() =>
                      document.getElementById(`note-${bar.id}`)?.scrollIntoView({ block: "nearest" })
                    }
                  >
                    <span className="mb-1 text-sm font-semibold tabular-nums">{bar.value}</span>
                    <span
                      className={cn("w-full max-w-8 rounded-t-md", barClass(bar.effort, bar.setAside))}
                      style={{ height }}
                    />
                  </button>
                );
              })}
            </div>
            <div className="mt-2 flex gap-1">
              {bars.map((bar) => {
                const [month, day] = formatShort(bar.date).split(" ");
                return (
                  <span key={bar.id} className="flex-1 text-center text-xs leading-tight text-muted">
                    <span className="block">{month}</span>
                    <span className="block tabular-nums">{day}</span>
                  </span>
                );
              })}
            </div>
          </>
        )}
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted">
          <Legend swatch="bg-coral" label="Easy" />
          <Legend swatch="bg-just" label="Just right" />
          <Legend swatch="bg-navy" label="Hard" />
        </div>
      </section>

      <OrbitDivider />
      <h2 className="text-base">Notes</h2>
      {notes.length === 0 ? (
        <p className="mt-2 text-sm text-muted">Notes and off days show up here.</p>
      ) : (
        <ul className="mt-3 space-y-3">
          {notes.map((log) => (
            <NoteCard key={log.id} log={log} meta={historyMeta(log, movement)} onSetAside={setAside} />
          ))}
        </ul>
      )}

      <Sheet open={picker} title="Movements" onClose={() => setPicker(false)}>
        <ul className="divide-y divide-line">
          {movements.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => {
                  setMovement(item.id);
                  setPicker(false);
                }}
                className="flex w-full items-center justify-between gap-3 py-3 text-left"
              >
                <span className="font-semibold">{item.name}</span>
                <span className="text-sm tabular-nums text-muted">
                  {displayLoad(item, logs, "strength")}
                  <span className="px-1">/</span>
                  {displayLoad(item, logs, "cardio")}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <form
          className="mt-4 flex gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            addNamedMovement();
          }}
        >
          <input
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
            placeholder="Add a movement"
            aria-label="New movement name"
            className="min-w-0 flex-1 rounded-xl border border-line bg-paper px-3 py-3 text-base"
          />
          <button type="submit" className="capsule px-4 text-sm">
            Add
          </button>
        </form>
      </Sheet>
    </div>
  );
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={cn("size-2 rounded-full", swatch)} aria-hidden="true" />
      {label}
    </span>
  );
}

function NoteCard({
  log,
  meta,
  onSetAside,
}: {
  log: SessionLog;
  meta: string;
  onSetAside: (id: string, value: boolean) => void;
}) {
  return (
    <li id={`note-${log.id}`} className={cn("rounded-3xl border border-line bg-card p-4", log.setAside && "opacity-70")}>
      <p className="text-sm text-muted">
        {meta}
        {log.setAside ? " · Set aside" : ""}
      </p>
      {log.note ? (
        <p className="mt-2 text-base leading-relaxed italic">
          “{log.note}”
          {!log.setAside && (log.effort === "hard" || log.context) ? (
            <button
              type="button"
              onClick={() => onSetAside(log.id, true)}
              className="ml-2 font-semibold text-orange not-italic"
            >
              Set aside
            </button>
          ) : null}
        </p>
      ) : !log.setAside && (log.effort === "hard" || log.context) ? (
        <button type="button" onClick={() => onSetAside(log.id, true)} className="mt-2 font-semibold text-orange">
          Set aside
        </button>
      ) : null}
      {log.setAside ? (
        <button
          type="button"
          onClick={() => onSetAside(log.id, false)}
          className="mt-2 text-sm font-semibold text-orange"
        >
          Use this class
        </button>
      ) : null}
    </li>
  );
}
