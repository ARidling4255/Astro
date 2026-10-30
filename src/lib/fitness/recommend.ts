import { EXERCISE_LIBRARY } from "@/lib/fitness/catalog";
import { logsFor, parseDay, projectClassKcal, suggestionForKind } from "@/lib/fitness/logic";
import type { ClassKind, Movement, Profile, SessionLog, Unit } from "@/lib/fitness/types";

export type PlannedLift = {
  movementId: string;
  name: string;
  unit: Unit;
  weight: number;
  reps: number;
  kcal: number | null;
  logged: boolean;
};

export type DayPlan = {
  title: string;
  classKind: ClassKind;
  minutes: number;
  kcal: number | null;
  lifts: PlannedLift[];
};

const DAYS: Array<{ title: string; classKind: ClassKind; focus: string[] }> = [
  { title: "Easy strength", classKind: "strength", focus: ["goblet-squat", "kettlebell-swing", "reverse-lunge", "db-bench-press"] },
  { title: "Lower strength", classKind: "strength", focus: ["deadlift", "goblet-squat", "reverse-lunge", "box-jump"] },
  { title: "Cardio circuit", classKind: "cardio", focus: ["kettlebell-swing", "thrusters", "box-jump", "goblet-squat"] },
  { title: "Upper strength", classKind: "strength", focus: ["db-bench-press", "renegade-row", "thrusters", "kettlebell-swing"] },
  { title: "Engine day", classKind: "cardio", focus: ["thrusters", "box-jump", "kettlebell-swing", "deadlift"] },
  { title: "Full body", classKind: "strength", focus: ["deadlift", "goblet-squat", "db-bench-press", "renegade-row"] },
  { title: "Saturday mix", classKind: "cardio", focus: ["kettlebell-swing", "thrusters", "reverse-lunge", "box-jump"] },
];

const REPS: Record<string, number> = {
  deadlift: 5,
  "back-squat": 5,
  "front-squat": 5,
  "sumo-deadlift": 5,
  "romanian-deadlift": 6,
  "kettlebell-swing": 15,
  "box-jump": 8,
  thrusters: 8,
  "goblet-squat": 10,
  "renegade-row": 8,
  "reverse-lunge": 8,
  "db-bench-press": 10,
};

const RATIO: Record<string, number> = {
  deadlift: 0.55,
  "goblet-squat": 0.16,
  "db-bench-press": 0.14,
  "renegade-row": 0.1,
  thrusters: 0.12,
  "reverse-lunge": 0.12,
  "kettlebell-swing": 0.16,
};

const FALLBACK: Record<string, number> = {
  deadlift: 95,
  "goblet-squat": 25,
  "db-bench-press": 25,
  "renegade-row": 15,
  thrusters: 20,
  "reverse-lunge": 20,
  "kettlebell-swing": 25,
  "box-jump": 20,
};

function snap(value: number, increment: number) {
  const step = increment > 0 ? increment : 5;
  return Math.max(step, Math.round(value / step) * step);
}

function findMovement(id: string, owned: Movement[]) {
  return owned.find((movement) => movement.id === id) ?? EXERCISE_LIBRARY.find((movement) => movement.id === id);
}

function starterLoad(movement: Movement, profile: Profile) {
  if (movement.unit === "in") return movement.id === "box-jump" ? 20 : 16;
  const body = profile.weightLb != null && profile.weightLb >= 70 ? profile.weightLb : null;
  const ratio = RATIO[movement.id];
  if (body && ratio) return snap(body * ratio, movement.increment);
  return snap(FALLBACK[movement.id] ?? 20, movement.increment);
}

function plannedWeight(movement: Movement, logs: SessionLog[], classKind: ClassKind, profile: Profile) {
  const suggestion = suggestionForKind(movement, logs, classKind);
  if (suggestion) return suggestion.to;
  const series = logsFor(logs, movement.id, classKind).filter((log) => !log.setAside);
  const last = series[series.length - 1];
  if (last) {
    if (last.effort === "easy") return last.value + movement.increment;
    if (last.effort === "hard" && !last.context) return Math.max(movement.increment, last.value - movement.increment);
    return last.value;
  }
  const otherKind: ClassKind = classKind === "strength" ? "cardio" : "strength";
  const other = logsFor(logs, movement.id, otherKind).filter((log) => !log.setAside);
  const borrowed = other[other.length - 1];
  if (borrowed) return borrowed.value;
  return starterLoad(movement, profile);
}

function share(total: number | null, loads: number[]) {
  if (total == null) return loads.map(() => null);
  if (loads.length === 0) return [];
  const sum = loads.reduce((acc, load) => acc + load, 0) || 1;
  const parts = loads.map((load) => Math.round(((total * load) / sum) / 10) * 10);
  const drift = total - parts.reduce((acc, part) => acc + part, 0);
  parts[parts.length - 1] = Math.max(0, (parts[parts.length - 1] ?? 0) + drift);
  return parts;
}

export function recommendDay(input: {
  day: string;
  movements: Movement[];
  logs: SessionLog[];
  profile: Profile;
}): DayPlan {
  const plan = DAYS[parseDay(input.day).getDay()] ?? DAYS[1];
  const minutes = Math.min(180, Math.max(15, input.profile.classMinutes || 45));
  const logged = new Set(
    input.logs
      .filter((log) => log.date === input.day && log.classKind === plan.classKind && !log.setAside && log.value > 0)
      .map((log) => log.movementId),
  );
  const chosen = plan.focus
    .map((id) => findMovement(id, input.movements))
    .filter((movement): movement is Movement => Boolean(movement))
    .slice(0, 4);
  const weights = chosen.map((movement) => plannedWeight(movement, input.logs, plan.classKind, input.profile));
  const reps = chosen.map((movement) => REPS[movement.id] ?? 10);
  const total = projectClassKcal(input.profile, plan.classKind);
  const kcal = share(
    total,
    weights.map((weight, index) => Math.max(1, weight * (reps[index] ?? 10))),
  );
  return {
    title: plan.title,
    classKind: plan.classKind,
    minutes,
    kcal: total,
    lifts: chosen.map((movement, index) => ({
      movementId: movement.id,
      name: movement.name,
      unit: movement.unit,
      weight: weights[index] ?? movement.increment,
      reps: reps[index] ?? 10,
      kcal: kcal[index] ?? null,
      logged: logged.has(movement.id),
    })),
  };
}
