import { format } from "date-fns";
import { CONTEXTS } from "@/lib/fitness/catalog";
import type {
  ClassKind,
  ContextId,
  DraftLine,
  Effort,
  Goal,
  HistoryFilter,
  Movement,
  Profile,
  Recovery,
  SessionLog,
} from "@/lib/fitness/types";

const HARD_WORDS: Array<[string, string]> = [
  ["pretty tough", "pretty tough"],
  ["way too heavy", "too heavy"],
  ["really hard", "really hard"],
  ["too heavy", "too heavy"],
  ["too hard", "too hard"],
  ["super heavy", "super heavy"],
  ["too much", "too much"],
  ["brutal", "brutal"],
  ["grindy", "grindy"],
  ["difficult", "difficult"],
  ["challenging", "challenging"],
  ["failed", "failed"],
  ["tough", "tough"],
  ["heavy", "heavy"],
  ["hard", "hard"],
];

const EASY_WORDS: Array<[string, string]> = [
  ["way too light", "too light"],
  ["too light", "too light"],
  ["too easy", "too easy"],
  ["felt easy", "easy"],
  ["really easy", "easy"],
  ["piece of cake", "easy"],
  ["easier", "easier"],
  ["easy", "easy"],
  ["light", "light"],
];

const RIGHT_WORDS: Array<[string, string]> = [
  ["just right", "just right"],
  ["about right", "about right"],
  ["all right", "all right"],
  ["alright", "alright"],
  ["manageable", "manageable"],
  ["comfortable", "comfortable"],
  ["perfect", "perfect"],
  ["decent", "decent"],
  ["solid", "solid"],
  ["okay", "okay"],
  ["ok", "ok"],
  ["good", "good"],
  ["fine", "fine"],
];

const SPOKEN_ONES: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,
};

const SPOKEN_TENS: Record<string, number> = {
  twenty: 20,
  thirty: 30,
  forty: 40,
  fifty: 50,
  sixty: 60,
  seventy: 70,
  eighty: 80,
  ninety: 90,
};

const ONES_RE = "one|two|three|four|five|six|seven|eight|nine";
const TEENS_RE = "ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen";
const TENS_RE = "twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety";
const GYM_TENS_RE = "fifteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety";
const TENS_STEM: Record<string, string> = {
  twent: "twenty",
  thirt: "thirty",
  fort: "forty",
  fift: "fifty",
  sixt: "sixty",
  sevent: "seventy",
  eight: "eighty",
  ninet: "ninety",
};

function spokenValue(word: string) {
  const key = word.toLowerCase();
  return SPOKEN_ONES[key] ?? SPOKEN_TENS[key] ?? null;
}

export function normalizeSpokenNumbers(input: string) {
  let text = input.toLowerCase();
  text = text.replace(new RegExp(`\\b(${ONES_RE})-(${TENS_RE})-(${ONES_RE})\\b`, "gi"), "$1 $2 $3");
  text = text.replace(new RegExp(`\\b(${ONES_RE})-(${TENS_RE}|${TEENS_RE})\\b`, "gi"), "$1 $2");
  text = text.replace(new RegExp(`\\b(${TENS_RE})-(${ONES_RE})\\b`, "gi"), "$1 $2");
  text = text.replace(/\b(twent|thirt|fort|fift|sixt|sevent|eight|ninet)ies\b/gi, (_word, stem: string) => {
    return TENS_STEM[stem.toLowerCase()] ?? _word;
  });
  text = text.replace(new RegExp(`\\b(${TENS_RE})\\s+(${ONES_RE})s\\b`, "gi"), "$1 $2");
  text = text.replace(new RegExp(`\\b(?:the|those)\\s+(${ONES_RE}|${TEENS_RE})s\\b`, "gi"), "$1");
  text = text.replace(
    new RegExp(
      `\\b(?:(a|an|${ONES_RE})\\s+)?hundred(?:\\s+and)?(?:\\s+(${TENS_RE}))?(?:\\s+(${ONES_RE}|${TEENS_RE}))?\\b`,
      "gi",
    ),
    (_full, mult?: string, ten?: string, one?: string) => {
      const head = (mult ?? "").toLowerCase();
      const base = !head || head === "a" || head === "an" ? 100 : (SPOKEN_ONES[head] ?? 1) * 100;
      return String(base + (ten ? (spokenValue(ten) ?? 0) : 0) + (one ? (spokenValue(one) ?? 0) : 0));
    },
  );
  text = text.replace(
    new RegExp(`\\b(${ONES_RE})\\s+(${GYM_TENS_RE})(?:\\s+(${ONES_RE}))?\\b`, "gi"),
    (_full, plates: string, ten: string, one?: string) =>
      String((SPOKEN_ONES[plates.toLowerCase()] ?? 0) * 100 + (spokenValue(ten) ?? 0) + (one ? (SPOKEN_ONES[one.toLowerCase()] ?? 0) : 0)),
  );
  text = text.replace(
    new RegExp(`\\b(${TENS_RE})(?:\\s+(${ONES_RE}))?\\b`, "gi"),
    (_full, ten: string, one?: string) => String((spokenValue(ten) ?? 0) + (one ? (SPOKEN_ONES[one.toLowerCase()] ?? 0) : 0)),
  );
  text = text.replace(new RegExp(`\\b(${TEENS_RE})\\b`, "gi"), (word) => String(spokenValue(word) ?? word));
  text = text.replace(new RegExp(`\\b((?:${ONES_RE})(?:\\s+(?:${ONES_RE})){1,2})\\b`, "gi"), (seq) => {
    const digits = seq.split(/\s+/).map((word) => SPOKEN_ONES[word.toLowerCase()]);
    if (digits.some((digit) => digit == null)) return seq;
    return digits.join("");
  });
  text = text.replace(new RegExp(`\\b(?:the|at)\\s+(${ONES_RE}|${TEENS_RE})\\b`, "gi"), (_full, word: string) => {
    return String(spokenValue(word) ?? word);
  });
  text = text.replace(
    new RegExp(`\\b(${ONES_RE}|${TEENS_RE})\\s+(lb|lbs|pounds?|kg|kilos?)\\b`, "gi"),
    (_full, word: string, unit: string) => `${spokenValue(word) ?? word} ${unit}`,
  );
  return text;
}

export function parseDay(iso: string) {
  return new Date(`${iso}T12:00:00`);
}

export function formatToday(date = new Date()) {
  return format(date, "EEEE, MMM d").toUpperCase();
}

export function formatShort(iso: string) {
  return format(parseDay(iso), "MMM d");
}

export function formatClassEyebrow(iso: string, kind: ClassKind) {
  return `${format(parseDay(iso), "EEEE").toUpperCase()} CLASS · ${kind.toUpperCase()} DAY`;
}

export function todayIso(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function blankProfile(): Profile {
  return { sex: null, age: null, weightLb: null, heightIn: null, classMinutes: 45 };
}

const MET: Record<ClassKind, Record<Effort, number>> = {
  strength: { easy: 3.5, "just-right": 5, hard: 6 },
  cardio: { easy: 6, "just-right": 8, hard: 10.5 },
};

export type WorkoutBurn = {
  date: string;
  classKind: ClassKind;
  minutes: number;
  kcal: number;
};

function weightKg(profile: Profile) {
  if (profile.weightLb == null || profile.weightLb < 70 || profile.weightLb > 500) return null;
  return profile.weightLb * 0.45359237;
}

function bmr(profile: Profile, kg: number) {
  const heightOk = profile.heightIn != null && profile.heightIn >= 48 && profile.heightIn <= 96;
  const ageOk = profile.age != null && profile.age >= 13 && profile.age <= 100;
  if (!heightOk || !ageOk || !profile.sex) return null;
  const cm = (profile.heightIn ?? 0) * 2.54;
  const sex = profile.sex === "male" ? 5 : profile.sex === "female" ? -161 : -78;
  return 10 * kg + 6.25 * cm - 5 * (profile.age ?? 0) + sex;
}

function restingPerMinute(profile: Profile, kg: number) {
  const resting = bmr(profile, kg);
  if (resting == null) return kg / 60;
  return Math.max(0.5, resting / 1440);
}

export type DailyNeed = {
  kcal: number;
  minutes: number;
};

export function dailyCalories(profile: Profile): DailyNeed | null {
  const kg = weightKg(profile);
  if (kg == null) return null;
  const resting = bmr(profile, kg);
  if (resting == null) return null;
  const minutes = Math.min(180, Math.max(15, profile.classMinutes || 45));
  const factor = minutes >= 75 ? 1.725 : minutes >= 40 ? 1.55 : 1.375;
  return { kcal: Math.max(0, Math.round((resting * factor) / 10) * 10), minutes };
}

export function profileReady(profile: Profile) {
  return weightKg(profile) != null;
}

export function projectClassKcal(profile: Profile, classKind: ClassKind, effort: Effort = "just-right") {
  const kg = weightKg(profile);
  if (kg == null) return null;
  const rest = restingPerMinute(profile, kg);
  const minutes = Math.min(180, Math.max(15, profile.classMinutes || 45));
  const net = ((MET[classKind][effort] * kg) / 60 - rest) * minutes;
  return Math.max(0, Math.round(net / 10) * 10);
}

export function workoutBurns(logs: SessionLog[], profile: Profile): WorkoutBurn[] {
  const kg = weightKg(profile);
  if (kg == null) return [];
  const rest = restingPerMinute(profile, kg);
  const minutes = Math.min(180, Math.max(15, profile.classMinutes || 45));
  const groups = new Map<string, SessionLog[]>();
  for (const log of logs) {
    if (log.setAside || log.value <= 0) continue;
    const key = `${log.date}:${log.classKind}`;
    const list = groups.get(key);
    if (list) list.push(log);
    else groups.set(key, [log]);
  }
  const burns: WorkoutBurn[] = [];
  for (const [key, lines] of groups) {
    const split = key.indexOf(":");
    const date = key.slice(0, split);
    const classKind = key.slice(split + 1) as ClassKind;
    const met = lines.reduce((sum, line) => sum + MET[classKind][line.effort], 0) / lines.length;
    const net = ((met * kg) / 60 - rest) * minutes;
    burns.push({ date, classKind, minutes, kcal: Math.max(0, Math.round(net / 10) * 10) });
  }
  burns.sort((a, b) => b.date.localeCompare(a.date) || a.classKind.localeCompare(b.classKind));
  return burns;
}

export function weekKcal(logs: SessionLog[], profile: Profile, today = todayIso()) {
  const day = parseDay(today);
  day.setDate(day.getDate() - day.getDay());
  const start = todayIso(day);
  return workoutBurns(logs, profile)
    .filter((burn) => burn.date >= start && burn.date <= today)
    .reduce((sum, burn) => sum + burn.kcal, 0);
}

export function effortLabel(effort: Effort) {
  if (effort === "easy") return "Easy";
  if (effort === "hard") return "Hard";
  return "Just right";
}

export function unitWord(movement: Movement) {
  return movement.unit === "in" ? "in" : "lb";
}

export function lastValue(logs: SessionLog[], movementId: string, kind: ClassKind) {
  const series = logsFor(logs, movementId, kind).filter((log) => !log.setAside);
  return series.length > 0 ? series[series.length - 1].value : null;
}

export function lastClass(logs: SessionLog[], kind: ClassKind) {
  const series = logs
    .filter((log) => log.classKind === kind && !log.setAside)
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
  const latest = series[series.length - 1];
  if (!latest) return [];
  return series.filter((log) => log.date === latest.date);
}

export function logsFor(logs: SessionLog[], movementId: string, filter: HistoryFilter) {
  return logs
    .filter((log) => log.movementId === movementId && (filter === "mixed" || log.classKind === filter))
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
}

export type Suggestion = {
  classKind: ClassKind;
  from: number;
  to: number;
  streak: number;
};

export function suggestionForKind(
  movement: Movement,
  logs: SessionLog[],
  classKind: ClassKind,
): Suggestion | null {
  const series = logsFor(logs, movement.id, classKind).filter((log) => !log.setAside);
  if (series.length < 2) return null;
  let streak = 0;
  for (let i = series.length - 1; i >= 0; i -= 1) {
    if (series[i].effort !== "easy") break;
    streak += 1;
  }
  if (streak < 2) return null;
  const last = series[series.length - 1];
  return {
    classKind,
    from: last.value,
    to: last.value + movement.increment,
    streak,
  };
}

export type ReadyItem = Suggestion & { movement: Movement };

export function readyList(movements: Movement[], logs: SessionLog[]): ReadyItem[] {
  const items: ReadyItem[] = [];
  for (const movement of movements) {
    for (const classKind of ["strength", "cardio"] as const) {
      const suggestion = suggestionForKind(movement, logs, classKind);
      if (suggestion) items.push({ movement, ...suggestion });
    }
  }
  items.sort((a, b) => {
    if (a.classKind !== b.classKind) return a.classKind === "strength" ? -1 : 1;
    return a.movement.order - b.movement.order;
  });
  return items;
}

export function suggestionForFilter(
  movement: Movement,
  logs: SessionLog[],
  filter: HistoryFilter,
): Suggestion | null {
  if (filter === "mixed") {
    return (
      suggestionForKind(movement, logs, "strength") ?? suggestionForKind(movement, logs, "cardio")
    );
  }
  return suggestionForKind(movement, logs, filter);
}

export function readyText(suggestion: Suggestion, movement: Movement) {
  if (movement.unit === "in") return `Ready: try ${suggestion.to} in`;
  return `Ready: try ${suggestion.to}`;
}

export function weightSubtitle(movement: Movement, logs: SessionLog[], goals: Goal[]) {
  const goal = goals.find(
    (item) => item.movementId === movement.id && (item.kind === "load" || item.kind === "milestone"),
  );
  if (goal?.target) return `Goal: ${goal.target} ${unitWord(movement)}`;

  const strength = logsFor(logs, movement.id, "strength");
  const cardio = logsFor(logs, movement.id, "cardio");
  if (strength.length > 0 && cardio.length === 0) return "No cardio-day log yet";
  if (cardio.length > 0 && strength.length === 0) return "No strength-day log yet";

  const counted = [...strength, ...cardio]
    .filter((log) => !log.setAside)
    .sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
  const latest = counted[counted.length - 1];
  if (!latest) return "No logs yet";
  if (latest.effort === "just-right") return "Last: just right";
  if (latest.effort === "easy") return "Last: easy";
  if (latest.context) return `Hold: hard, but ${CONTEXTS[latest.context].hold}`;
  return "Hold: last one was hard";
}

export function displayLoad(movement: Movement, logs: SessionLog[], kind: ClassKind) {
  const series = logsFor(logs, movement.id, kind);
  if (series.length === 0) return "—";
  const last = series[series.length - 1];
  if (movement.unit === "in") return `${last.value} in`;
  return String(last.value);
}

export function historyMeta(log: SessionLog, movement: Movement) {
  const load = movement.unit === "in" ? `${log.value} in` : `${log.value} lb`;
  const context = log.context ? ` · Context: ${CONTEXTS[log.context].chip}` : "";
  return `${formatShort(log.date)} · ${load} · ${effortLabel(log.effort)}${context}`;
}

export function chartSectionTitle(filter: HistoryFilter) {
  if (filter === "strength") return "Last 6 strength classes";
  if (filter === "cardio") return "Last 6 cardio classes";
  return "Last 6 classes";
}

export function goalKindLabel(kind: Goal["kind"]) {
  if (kind === "load") return "Load";
  if (kind === "milestone") return "Milestone";
  if (kind === "calories") return "Calories";
  return "Endurance";
}

export function goalSnapshot(
  goal: Goal,
  movement: Movement | undefined,
  logs: SessionLog[],
  profile: Profile,
) {
  if (goal.kind === "calories") {
    if (!profileReady(profile)) {
      return { progress: 0, left: "Add weight in Account", right: "Needed for kcal" };
    }
    const burned = weekKcal(logs, profile);
    const target = goal.target ?? 0;
    const progress = target > 0 ? Math.min(100, Math.round((burned / target) * 100)) : 0;
    const left = `${burned.toLocaleString()} kcal this week`;
    const right = target > 0 && burned >= target ? "Week covered" : `${Math.max(0, target - burned).toLocaleString()} to go`;
    return { progress, left, right };
  }

  if (goal.kind === "endurance") {
    const progress = Math.min(100, Math.max(0, goal.progress ?? 0));
    const left =
      progress >= 70 ? "Feeling easier" : progress >= 35 ? "Recovery improving" : "Keep showing up";
    return { progress, left, right: progress >= 100 ? "On track" : "Keep logging" };
  }

  const values = logs.filter((log) => log.movementId === goal.movementId).map((log) => log.value);
  const now = values.length > 0 ? Math.max(...values) : 0;
  const target = goal.target ?? 0;
  const increment = movement?.increment ?? 5;
  const unit = movement ? unitWord(movement) : "lb";
  const progress = target > 0 ? Math.min(100, Math.round((now / target) * 100)) : 0;
  const next = target > 0 && now >= target ? null : target > 0 ? Math.min(target, (now || 0) + increment) : null;
  const ratio =
    movement?.unit === "lb" && profile.weightLb && profile.weightLb > 0 && now > 0
      ? ` · ${(now / profile.weightLb).toFixed(2)}× you`
      : "";
  return {
    progress,
    left: now > 0 ? `Now: ${now} ${unit}${ratio}` : "Now: —",
    right: next == null ? "Goal hit" : `Next step: ${next} ${unit}`,
  };
}

export function recoveryCopy(recovery: Recovery) {
  const direction = recovery.dropBpm >= recovery.previousDrop ? "up" : "down";
  return {
    drop: `−${recovery.dropBpm} bpm`,
    dropDetail: `1 min after class · ${direction} from −${recovery.previousDrop} in ${recovery.previousWhen}`,
    zone: `${recovery.highZoneMin} min`,
    zoneDetail: "Avg per class, steady effort",
  };
}

export function readySentence(items: ReadyItem[]) {
  if (items.length === 0) {
    return "Two easy classes at the same weight, and the next one shows up here.";
  }
  if (items.length === 1) return `${items[0].movement.name} is ready to go up.`;
  const second = items[1].movement.name.toLowerCase();
  if (items.length === 2) return `${items[0].movement.name} and ${second} are ready to go up.`;
  return `${items.length} lifts are ready to go up.`;
}

export function contextCallout(lines: DraftLine[], movements: Movement[]) {
  const hits = lines.filter((line) => line.effort === "hard" && line.context);
  if (hits.length === 0) return null;
  const first = hits[0];
  const name = movements.find((movement) => movement.id === first.movementId)?.name ?? "That lift";
  const word = first.effortWord ?? "hard";
  const chip = CONTEXTS[first.context as ContextId].chip;
  if (hits.length === 1) {
    return `Context: ${chip}. ${name} "${word}" won't hold back your progress.`;
  }
  return `Context: ${chip}. Those hard sets won't hold back your progress.`;
}

function findWord(text: string, pairs: Array<[string, string]>) {
  const lower = text.toLowerCase();
  for (const [needle, word] of pairs) {
    const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (new RegExp(`\\b${escaped}\\b`, "i").test(lower)) return word;
  }
  return null;
}

function findContext(text: string): ContextId | undefined {
  if (
    /slept badly|slept bad|slept poorly|slept terrible|poor sleep|bad sleep|didn'?t sleep|did not sleep|no sleep|couldn'?t sleep|could not sleep|rough night|bad night|awful night|insomnia/i.test(
      text,
    )
  ) {
    return "poor-sleep";
  }
  if (/\bwine\b/i.test(text)) return "wine";
  return undefined;
}

function extractValue(clause: string) {
  let text = clause.toLowerCase();
  text = text.replace(/\b\d{1,2}\s*(?:x|×|by)\s*\d{1,2}\b/gi, " ");
  text = text.replace(/\b\d{1,2}\s+sets?\s+of\s+\d{1,2}\b/gi, " ");
  text = text.replace(/\bsets?\s+of\s+\d{1,2}\b/gi, " ");
  text = text.replace(/\b\d{1,2}\s+sets?\b/gi, " ");
  text = text.replace(/\b\d{1,2}\s*(?:reps?|times)\b/gi, " ");
  text = text.replace(/\bfor\s+(\d{1,3}(?:\.\d+)?)(?:\s*(?:reps?|times))?\b/gi, (full, raw, offset) => {
    const num = Number(raw);
    const rest = `${text.slice(0, offset)} ${text.slice(offset + full.length)}`;
    const repsWord = /reps?|times/i.test(full);
    if ((repsWord || num <= 30) && /\d/.test(rest)) return " ";
    return full;
  });

  const re = /(\d{1,3}(?:\.\d+)?)(?:\s*(lb|lbs|pound|pounds|kg|kilo|kilos|s|in|inch|inches))?\b/gi;
  const found: Array<{ value: number; weighted: boolean }> = [];
  for (const match of text.matchAll(re)) {
    const suffix = (match[2] ?? "").toLowerCase();
    const kilos = ["kg", "kilo", "kilos"].includes(suffix);
    const weighted = ["lb", "lbs", "pound", "pounds", "s", "in", "inch", "inches", "kg", "kilo", "kilos"].includes(suffix);
    const raw = Number(match[1]);
    const value = kilos ? Math.round(raw * 2.20462) : Math.round(raw);
    found.push({ value, weighted });
  }
  if (found.length === 0) return null;
  const weighted = found.filter((item) => item.weighted);
  const pool = weighted.length > 0 ? weighted : found;
  return pool[pool.length - 1].value;
}

type Mention = { movement: Movement; index: number; length: number };

function findMentions(text: string, movements: Movement[]): Mention[] {
  const lower = text.toLowerCase();
  const found: Mention[] = [];
  for (const movement of movements) {
    const names = [...movement.aliases, movement.name]
      .map((name) => name.toLowerCase())
      .sort((a, b) => b.length - a.length);
    const seen = new Set<string>();
    for (const name of names) {
      if (seen.has(name)) continue;
      seen.add(name);
      let from = 0;
      while (from < lower.length) {
        const index = lower.indexOf(name, from);
        if (index < 0) break;
        const beforeOk = index === 0 || !/[a-z0-9]/i.test(lower[index - 1] ?? "");
        const afterIndex = index + name.length;
        const afterOk = afterIndex >= lower.length || !/[a-z0-9]/i.test(lower[afterIndex] ?? "");
        if (beforeOk && afterOk) found.push({ movement, index, length: name.length });
        from = index + Math.max(name.length, 1);
      }
    }
  }
  found.sort((a, b) => a.index - b.index || b.length - a.length);
  const kept: Mention[] = [];
  for (const mention of found) {
    const last = kept[kept.length - 1];
    if (last && mention.index < last.index + last.length) continue;
    kept.push(mention);
  }
  return kept;
}

export function parseTranscript(text: string, fallbackKind: ClassKind, movements: Movement[]) {
  const spoken = normalizeSpokenNumbers(text);
  let classKind = fallbackKind;
  if (/\bcardio\b/i.test(spoken) && !/\bstrength\b/i.test(spoken)) classKind = "cardio";
  else if (/\bstrength\b/i.test(spoken)) classKind = "strength";

  const mentions = findMentions(spoken, movements);
  const lines: DraftLine[] = [];
  const numberFirst = extractValue(spoken.slice(0, mentions[0]?.index ?? 0)) != null;
  mentions.forEach((mention, index) => {
    const next = mentions[index + 1];
    const prev = mentions[index - 1];
    const before = spoken.slice(prev ? prev.index + prev.length : 0, mention.index);
    const after = spoken.slice(mention.index + mention.length, next?.index ?? spoken.length);
    const afterSentences = after
      .split(/[.!]+\s+/)
      .map((part) => part.trim())
      .filter(Boolean);
    const beforeSentences = before
      .split(/[.!]+\s+/)
      .map((part) => part.trim())
      .filter(Boolean);
    const afterValue = extractValue(afterSentences[0] ?? "") ?? extractValue(after);
    const beforeValue = extractValue(before);
    const value = numberFirst ? (beforeValue ?? afterValue) : (afterValue ?? beforeValue);
    if (value == null) return;
    const nameSentence = afterSentences[0] ?? "";
    const follow = afterSentences[1];
    const nameHasEffort = Boolean(
      findWord(nameSentence, HARD_WORDS) || findWord(nameSentence, EASY_WORDS) || findWord(nameSentence, RIGHT_WORDS),
    );
    const lead = beforeSentences[beforeSentences.length - 1] ?? "";
    let effortSource = nameSentence;
    if (!nameHasEffort && follow && !/\d/.test(follow)) effortSource = `${nameSentence} ${follow}`;
    if (!findWord(effortSource, HARD_WORDS) && !findWord(effortSource, EASY_WORDS) && !findWord(effortSource, RIGHT_WORDS)) {
      effortSource = `${effortSource} ${lead}`;
    }
    const hard = findWord(effortSource, HARD_WORDS);
    const easy = findWord(effortSource, EASY_WORDS);
    const right = findWord(effortSource, RIGHT_WORDS);
    let effort: Effort = "just-right";
    let effortWord: string | undefined;
    if (hard) {
      effort = "hard";
      effortWord = hard;
    } else if (easy) {
      effort = "easy";
      effortWord = easy;
    } else if (right) {
      effort = "just-right";
      effortWord = right;
    }
    lines.push({
      key: `${mention.movement.id}-${index}`,
      movementId: mention.movement.id,
      value,
      effort,
      context: findContext(nameSentence) ?? (/\d/.test(lead) ? undefined : findContext(lead)),
      effortWord,
    });
  });

  return { classKind, lines };
}

export function bumpEndurance(goals: Goal[], effort: Effort) {
  const delta = effort === "easy" ? 8 : effort === "just-right" ? 3 : -6;
  return goals.map((goal) => {
    if (goal.kind !== "endurance") return goal;
    const progress = Math.min(100, Math.max(8, (goal.progress ?? 20) + delta));
    return { ...goal, progress };
  });
}

export function slugify(name: string) {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return slug || "lift";
}
