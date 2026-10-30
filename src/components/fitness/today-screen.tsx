import { ArrowUp, Check, Search, X } from "lucide-react";
import { useState } from "react";
import { exerciseHit, libraryMatches } from "@/lib/fitness/catalog";
import {
  displayLoad,
  formatToday,
  parseDay,
  readyList,
  weightSubtitle,
  workoutBurns,
} from "@/lib/fitness/logic";
import { recommendDay } from "@/lib/fitness/recommend";
import type { ClassKind } from "@/lib/fitness/types";
import { useHeft } from "@/lib/fitness/store";
import { useTodayIso } from "@/lib/fitness/use-today";
import { PlanetScene, Starburst } from "@/components/fitness/marks";
import { WorkoutName } from "@/components/fitness/how-to";

type TodayScreenProps = {
  onOpen: (movementId: string, filter: ClassKind) => void;
  onLog: () => void;
};

export function TodayScreen({ onOpen, onLog }: TodayScreenProps) {
  const day = useTodayIso();
  const movements = useHeft((state) => state.movements);
  const addMovement = useHeft((state) => state.addMovement);
  const logs = useHeft((state) => state.logs);
  const goals = useHeft((state) => state.goals);
  const profile = useHeft((state) => state.profile);
  const logRecommended = useHeft((state) => state.logRecommended);
  const skipRecommended = useHeft((state) => state.skipRecommended);
  const skipped = useHeft((state) => state.skipped);
  const [query, setQuery] = useState("");
  const ready = readyList(movements, logs);
  const readyIds = new Set(ready.map((item) => item.movement.id));
  const q = query.trim();
  const rows = movements
    .filter((movement) => (q ? exerciseHit(movement, q) : !readyIds.has(movement.id)))
    .slice()
    .sort((a, b) => a.order - b.order);
  const more = libraryMatches(q, movements);
  const todayKcal = workoutBurns(logs, profile)
    .filter((burn) => burn.date === day)
    .reduce((sum, burn) => sum + burn.kcal, 0);
  const plan = recommendDay({ day, movements, logs, profile });
  const hidden = new Set(skipped?.date === day ? skipped.ids : []);
  const lifts = plan.lifts.filter((lift) => !hidden.has(lift.movementId));
  const listedKcal = lifts.reduce((sum, lift) => sum + (lift.kcal ?? 0), 0);

  return (
    <div>
      <div className="flex items-center gap-2">
        <Starburst className="size-4 text-navy" />
        <p className="text-xs font-semibold tracking-[0.22em] text-muted uppercase" suppressHydrationWarning>
          {formatToday(parseDay(day))}
        </p>
      </div>
      <h1 className="mt-3 text-balance">Welcome to Astro</h1>
      {todayKcal > 0 ? (
        <p className="mt-2 text-sm text-muted">About {todayKcal.toLocaleString()} kcal today</p>
      ) : null}

      <section className="mt-6 rounded-3xl border border-line bg-card px-4 pt-4 pb-4">
        <p className="text-[10px] font-semibold tracking-[0.18em] text-muted uppercase">Recommended</p>
        <h2 className="mt-2 text-base">{plan.title}</h2>
        <p className="mt-1 text-sm text-muted">
          {lifts.some((lift) => lift.kcal != null) ? `About ${listedKcal.toLocaleString()} kcal` : "Add weight for kcal"} ·{" "}
          {plan.minutes} min · just right
        </p>
        <ul className="mt-2 divide-y divide-line">
          {lifts.length === 0 ? (
            <li className="py-4 text-sm text-muted">Cleared for today. Tomorrow starts a new list.</li>
          ) : (
            lifts.map((lift) => (
              <li key={lift.movementId} className="flex items-center gap-2 py-3">
                <span className="min-w-0 flex-1">
                  <WorkoutName movement={{ id: lift.movementId, name: lift.name }} />
                  <span className="mt-0.5 block text-sm text-muted tabular-nums">
                    {lift.weight} {lift.unit} · {lift.reps} reps · {lift.kcal != null ? `~${lift.kcal} kcal` : "— kcal"}
                  </span>
                </span>
                <button
                  type="button"
                  aria-label={lift.logged ? `${lift.name} approved` : `Approve ${lift.name}`}
                  aria-pressed={lift.logged}
                  disabled={lift.logged}
                  onClick={() =>
                    logRecommended(day, plan.classKind, [
                      { movementId: lift.movementId, value: lift.weight, reps: lift.reps },
                    ])
                  }
                  className={
                    lift.logged
                      ? "grid size-11 shrink-0 place-items-center rounded-full bg-[#148a45] text-white"
                      : "grid size-11 shrink-0 place-items-center rounded-full border-2 border-[#148a45] text-[#148a45]"
                  }
                >
                  <Check className="size-5" strokeWidth={2.5} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label={`Remove ${lift.name}`}
                  onClick={() => skipRecommended(day, lift.movementId)}
                  className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-[#d61f3c] text-[#d61f3c]"
                >
                  <X className="size-5" strokeWidth={2.5} aria-hidden="true" />
                </button>
              </li>
            ))
          )}
        </ul>
      </section>

      {ready.length > 0 ? (
        <section className="relative mt-8 overflow-hidden rounded-3xl border border-line bg-hero p-4 text-on-hero">
          <PlanetScene className="pointer-events-none absolute -top-2 -right-4 h-24 w-32" />
          <div className="relative mb-3 flex items-center gap-2 pr-24">
            <ArrowUp className="size-4 text-orange" aria-hidden="true" />
            <h2 className="text-base">Ready to go up</h2>
          </div>
          <div className="relative space-y-2">
            {ready.map((item) => (
              <div
                key={`${item.movement.id}-${item.classKind}`}
                className="flex w-full items-center justify-between gap-3 rounded-2xl bg-hero-raise px-4 py-3 text-left"
              >
                <span className="min-w-0">
                  <WorkoutName movement={item.movement} className="block text-left font-semibold underline decoration-hero-line decoration-1 underline-offset-4" />
                  <button
                    type="button"
                    onClick={() => onOpen(item.movement.id, item.classKind)}
                    className="mt-0.5 block text-left text-sm text-hero-muted"
                  >
                    Easy {item.streak} {item.classKind} {item.streak === 1 ? "class" : "classes"} in a row
                  </button>
                </span>
                <button
                  type="button"
                  onClick={() => onOpen(item.movement.id, item.classKind)}
                  className="shrink-0 text-right tabular-nums"
                >
                  <span className="text-hero-muted">{item.from}</span>{" "}
                  <span className="text-xl font-bold text-navy">{item.to}</span>
                  <span className="text-sm font-semibold text-navy">
                    {" "}
                    {item.movement.unit === "in" ? "in" : "lb"}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="relative mt-8 overflow-hidden rounded-3xl border border-line bg-hero p-5 text-on-hero">
          <PlanetScene className="pointer-events-none absolute -top-1 -right-6 h-32 w-40" />
          <div className="relative">
            <div className="flex items-center gap-2 pr-28">
              <ArrowUp className="size-4 text-orange" aria-hidden="true" />
              <h2 className="text-base">
                {logs.length === 0 ? "Nothing logged yet" : "Nothing ready to go up"}
              </h2>
            </div>
            <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-hero-muted">
              {logs.length === 0
                ? "Log today's class. Two easy days at the same lift, and the next weight shows up here."
                : "Two easy classes at the same lift and the next weight will land here."}
            </p>
            <button type="button" onClick={onLog} className="capsule mt-5 h-12 w-full text-sm">
              Log today
            </button>
          </div>
        </section>
      )}

      <section className="mt-8">
        <div className="mb-3 flex items-end gap-3 px-1">
          <h2 className="min-w-0 flex-1 text-base">Your weights</h2>
          <span className="w-24 shrink-0 whitespace-nowrap text-right text-[10px] font-semibold tracking-[0.14em] text-muted">
            STRENGTH
          </span>
          <span className="w-24 shrink-0 whitespace-nowrap text-right text-[10px] font-semibold tracking-[0.14em] text-muted">
            CARDIO
          </span>
        </div>
        <label className="mb-3 flex h-11 items-center gap-2 rounded-full border border-line bg-card px-4">
          <Search className="size-4 shrink-0 text-muted" aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search exercises"
            aria-label="Search exercises"
            className="w-full bg-transparent text-base outline-none"
          />
        </label>
        {rows.length === 0 && more.length === 0 ? (
          <p className="rounded-3xl border border-line bg-card px-4 py-6 text-sm text-muted">
            {q ? "Nothing matches that." : "Every lift is ready to go up."}
          </p>
        ) : rows.length > 0 ? (
          <ul className="divide-y divide-line rounded-3xl border border-line bg-card px-4">
            {rows.map((movement) => (
              <li key={movement.id} className="flex items-center gap-3 py-3">
                <div className="min-w-0 flex-1">
                  <WorkoutName movement={movement} />
                  <button
                    type="button"
                    onClick={() => onOpen(movement.id, "strength")}
                    className="mt-0.5 block text-left text-sm text-muted"
                  >
                    {weightSubtitle(movement, logs, goals)}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => onOpen(movement.id, "strength")}
                  className="w-24 shrink-0 text-right text-xl font-semibold tabular-nums"
                >
                  {displayLoad(movement, logs, "strength")}
                </button>
                <button
                  type="button"
                  onClick={() => onOpen(movement.id, "cardio")}
                  className="w-24 shrink-0 text-right text-xl font-semibold tabular-nums"
                >
                  {displayLoad(movement, logs, "cardio")}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
        {more.length > 0 ? (
          <ul className="mt-3 divide-y divide-line rounded-3xl border border-line bg-card px-4">
            {more.map((movement) => (
              <li key={movement.id} className="flex items-center justify-between gap-3 py-3">
                <span className="min-w-0">
                  <WorkoutName movement={movement} />
                  <span className="text-sm text-muted">In the exercise library</span>
                </span>
                <button
                  type="button"
                  onClick={() => addMovement({ ...movement, order: movements.length + movement.order })}
                  className="capsule-quiet h-9 px-4 text-xs"
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    </div>
  );
}
