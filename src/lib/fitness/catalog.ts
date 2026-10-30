import type { Movement, Unit } from "@/lib/fitness/types";

export const CONTEXTS = {
  "poor-sleep": { chip: "poor sleep", hold: "slept badly", label: "Poor sleep" },
  wine: { chip: "wine", hold: "you had wine", label: "Wine" },
} as const;

export const SAMPLE_TRANSCRIPT =
  "Strength day. Goblet squats with the 35, felt easy again. Deadlift 115, pretty tough. Thrusters with the 25s, brutal, but I slept badly last night. Renegade rows 20s, solid.";

type Seed = [id: string, name: string, unit: Unit, increment: number, aliases: string[]];

const SEEDS: Seed[] = [
  ["goblet-squat", "Goblet squat", "lb", 5, ["goblet squats", "goblet squat", "db goblet", "kb goblet"]],
  ["kettlebell-swing", "Kettlebell swing", "lb", 5, ["kettlebell swings", "kettle bell swings", "kb swing", "kb swings", "kettlebell swing", "kettle bell swing"]],
  ["deadlift", "Deadlift", "lb", 5, ["deadlifts", "deadlift", "dead lifts", "dead lift", "conventional deadlift"]],
  ["db-bench-press", "DB bench press", "lb", 5, ["dumbbell bench press", "dumbbell bench", "db bench press", "db bench", "bench"]],
  ["renegade-row", "Renegade row", "lb", 4, ["renegade rows", "renegade row"]],
  ["thrusters", "Thrusters", "lb", 5, ["thrusters", "thruster"]],
  ["reverse-lunge", "Reverse lunge", "lb", 5, ["reverse lunges", "reverse lunge"]],
  ["box-jump", "Box jump", "in", 4, ["box jumps", "box jump"]],
  ["back-squat", "Back squat", "lb", 5, ["back squats", "back squat", "barbell squats", "barbell squat", "high bar squat", "low bar squat", "squats", "squat"]],
  ["front-squat", "Front squat", "lb", 5, ["front squats", "front squat"]],
  ["sumo-deadlift", "Sumo deadlift", "lb", 5, ["sumo deadlifts", "sumo deadlift", "sumo"]],
  ["romanian-deadlift", "Romanian deadlift", "lb", 5, ["romanian deadlifts", "romanian deadlift", "romanian dead lift", "rdl", "rdls"]],
  ["hip-thrust", "Hip thrust", "lb", 10, ["hip thrusts", "hip thrust", "barbell hip thrust"]],
  ["good-morning", "Good morning", "lb", 5, ["good mornings", "good morning"]],
  ["barbell-bench", "Barbell bench", "lb", 5, ["barbell bench press", "barbell bench", "bb bench"]],
  ["incline-bench", "Incline bench", "lb", 5, ["incline bench press", "incline bench", "incline db bench"]],
  ["overhead-press", "Overhead press", "lb", 5, ["overhead presses", "overhead press", "ohp", "shoulder press", "shoulder presses", "military press", "strict press"]],
  ["push-press", "Push press", "lb", 5, ["push presses", "push press"]],
  ["barbell-row", "Barbell row", "lb", 5, ["barbell rows", "barbell row", "bent over row", "bent-over row", "bb row"]],
  ["power-clean", "Power clean", "lb", 5, ["power cleans", "power clean"]],
  ["hang-clean", "Hang clean", "lb", 5, ["hang cleans", "hang clean"]],
  ["snatch", "Snatch", "lb", 5, ["snatches", "snatch", "power snatch"]],
  ["barbell-curl", "Barbell curl", "lb", 5, ["barbell curls", "barbell curl", "ez bar curl"]],
  ["db-shoulder-press", "DB shoulder press", "lb", 5, ["db shoulder press", "dumbbell shoulder press", "db press"]],
  ["db-row", "DB row", "lb", 5, ["db rows", "dumbbell row", "db row", "one arm row"]],
  ["walking-lunge", "Walking lunge", "lb", 5, ["walking lunges", "walking lunge"]],
  ["bulgarian-split-squat", "Bulgarian split squat", "lb", 5, ["bulgarian split squats", "bulgarian split squat", "bss", "rear foot elevated split squat"]],
  ["step-up", "Step up", "lb", 5, ["step ups", "step-ups", "step up"]],
  ["db-rdl", "DB Romanian deadlift", "lb", 5, ["db rdl", "dumbbell rdl", "db romanian deadlift"]],
  ["lateral-raise", "Lateral raise", "lb", 2, ["lateral raises", "lateral raise", "side raise"]],
  ["rear-delt-fly", "Rear delt fly", "lb", 2, ["rear delt flies", "rear delt fly", "reverse fly"]],
  ["hammer-curl", "Hammer curl", "lb", 5, ["hammer curls", "hammer curl"]],
  ["db-curl", "DB curl", "lb", 5, ["db curls", "dumbbell curl", "dumbbell curls", "db curl", "bicep curl", "bicep curls", "biceps curl", "biceps curls"]],
  ["chest-fly", "Chest fly", "lb", 5, ["chest flies", "chest fly", "db fly"]],
  ["farmer-carry", "Farmer carry", "lb", 5, ["farmer carries", "farmer carry", "farmers carry", "farmer walk"]],
  ["kb-clean", "Kettlebell clean", "lb", 4, ["kettlebell cleans", "kb clean", "kettlebell clean"]],
  ["turkish-get-up", "Turkish get-up", "lb", 4, ["turkish get-ups", "turkish get up", "turkish get-up", "tgu"]],
  ["lat-pulldown", "Lat pulldown", "lb", 5, ["lat pulldowns", "lat pulldown", "pulldown"]],
  ["seated-row", "Seated row", "lb", 5, ["seated rows", "seated row", "cable row"]],
  ["leg-press", "Leg press", "lb", 10, ["leg presses", "leg press"]],
  ["leg-curl", "Leg curl", "lb", 5, ["leg curls", "leg curl", "hamstring curl"]],
  ["leg-extension", "Leg extension", "lb", 5, ["leg extensions", "leg extension"]],
  ["calf-raise", "Calf raise", "lb", 5, ["calf raises", "calf raise", "standing calf raise"]],
  ["face-pull", "Face pull", "lb", 5, ["face pulls", "face pull"]],
  ["tricep-pushdown", "Tricep pushdown", "lb", 5, ["tricep pushdowns", "tricep pushdown", "pushdown", "cable pushdown"]],
  ["cable-fly", "Cable fly", "lb", 5, ["cable flies", "cable fly"]],
  ["chest-press", "Chest press", "lb", 5, ["chest press", "machine chest press"]],
  ["pull-up", "Pull-up", "lb", 5, ["pull-ups", "pull ups", "pullups", "pull-up", "pull up"]],
  ["chin-up", "Chin-up", "lb", 5, ["chin-ups", "chin ups", "chin-up", "chin up"]],
  ["dip", "Dip", "lb", 5, ["dips", "dip", "chest dip"]],
  ["push-up", "Push-up", "lb", 5, ["push-ups", "push ups", "pushups", "push-up", "push up"]],
  ["plank", "Plank", "lb", 5, ["planks", "plank"]],
  ["sit-up", "Sit-up", "lb", 5, ["sit-ups", "sit ups", "situps", "sit-up"]],
  ["burpee", "Burpee", "lb", 5, ["burpees", "burpee"]],
  ["kettlebell-snatch", "Kettlebell snatch", "lb", 4, ["kb snatch", "kettlebell snatch"]],
  ["single-leg-deadlift", "Single-leg deadlift", "lb", 5, ["single leg deadlift", "single-leg deadlift", "sldl"]],
  ["hack-squat", "Hack squat", "lb", 10, ["hack squats", "hack squat"]],
  ["pause-squat", "Pause squat", "lb", 5, ["pause squats", "pause squat"]],
  ["floor-press", "Floor press", "lb", 5, ["floor presses", "floor press"]],
  ["landmine-press", "Landmine press", "lb", 5, ["landmine presses", "landmine press"]],
  ["sled-push", "Sled push", "lb", 10, ["sled pushes", "sled push", "prowler"]],
];

const STARTER = new Set([
  "goblet-squat",
  "kettlebell-swing",
  "deadlift",
  "db-bench-press",
  "renegade-row",
  "thrusters",
  "reverse-lunge",
  "box-jump",
]);

export const EXERCISE_LIBRARY: Movement[] = SEEDS.map(([id, name, unit, increment, aliases], order) => ({
  id,
  name,
  unit,
  increment,
  aliases,
  order,
}));

export const MOVEMENTS: Movement[] = EXERCISE_LIBRARY.filter((movement) => STARTER.has(movement.id));

export function exerciseHit(movement: Pick<Movement, "name" | "aliases">, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  if (movement.name.toLowerCase().includes(q)) return true;
  return movement.aliases.some((alias) => alias.includes(q));
}

export function libraryMatches(query: string, owned: Movement[]) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const ids = new Set(owned.map((movement) => movement.id));
  return EXERCISE_LIBRARY.filter((movement) => !ids.has(movement.id) && exerciseHit(movement, q)).slice(0, 8);
}

export function sessionId(movementId: string, date: string, classKind: string) {
  return `${movementId}:${date}:${classKind}`;
}
