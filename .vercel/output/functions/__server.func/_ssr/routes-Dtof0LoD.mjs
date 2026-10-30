import { o as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { a as SignedOut, d as useCurrentUserState, f as useDarkTheme, i as PlanetScene, l as cn, n as NightSky, o as Starburst, r as OrbitDivider, s as ThemeToggle, t as AuthCorner } from "./theme-toggle-NCsYjTe-.mjs";
import { a as authMiddleware, c as sanitizeSnapshot, i as SAMPLE_TRANSCRIPT, l as sessionId, n as EXERCISE_LIBRARY, o as exerciseHit, r as MOVEMENTS, s as libraryMatches, t as CONTEXTS$1, u as snapshotBytes } from "./snapshot-Brvgqk_Z.mjs";
import { a as Sun, c as Minus, d as Check, f as ChartColumn, i as Target, l as Mic, n as UserRound, o as Search, p as ArrowUp, s as Plus, t as X, u as ChevronDown } from "../_libs/lucide-react.mjs";
import { t as format } from "../_libs/date-fns.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Dtof0LoD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var HARD_WORDS = [
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
	["hard", "hard"]
];
var EASY_WORDS = [
	["way too light", "too light"],
	["too light", "too light"],
	["too easy", "too easy"],
	["felt easy", "easy"],
	["really easy", "easy"],
	["piece of cake", "easy"],
	["easier", "easier"],
	["easy", "easy"],
	["light", "light"]
];
var RIGHT_WORDS = [
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
	["fine", "fine"]
];
var SPOKEN_ONES = {
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
	nineteen: 19
};
var SPOKEN_TENS = {
	twenty: 20,
	thirty: 30,
	forty: 40,
	fifty: 50,
	sixty: 60,
	seventy: 70,
	eighty: 80,
	ninety: 90
};
var ONES_RE = "one|two|three|four|five|six|seven|eight|nine";
var TEENS_RE = "ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen";
var TENS_RE = "twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety";
var GYM_TENS_RE = "fifteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety";
var TENS_STEM = {
	twent: "twenty",
	thirt: "thirty",
	fort: "forty",
	fift: "fifty",
	sixt: "sixty",
	sevent: "seventy",
	eight: "eighty",
	ninet: "ninety"
};
function spokenValue(word) {
	const key = word.toLowerCase();
	return SPOKEN_ONES[key] ?? SPOKEN_TENS[key] ?? null;
}
function normalizeSpokenNumbers(input) {
	let text = input.toLowerCase();
	text = text.replace(new RegExp(`\\b(${ONES_RE})-(${TENS_RE})-(${ONES_RE})\\b`, "gi"), "$1 $2 $3");
	text = text.replace(new RegExp(`\\b(${ONES_RE})-(${TENS_RE}|${TEENS_RE})\\b`, "gi"), "$1 $2");
	text = text.replace(new RegExp(`\\b(${TENS_RE})-(${ONES_RE})\\b`, "gi"), "$1 $2");
	text = text.replace(/\b(twent|thirt|fort|fift|sixt|sevent|eight|ninet)ies\b/gi, (_word, stem) => {
		return TENS_STEM[stem.toLowerCase()] ?? _word;
	});
	text = text.replace(new RegExp(`\\b(${TENS_RE})\\s+(${ONES_RE})s\\b`, "gi"), "$1 $2");
	text = text.replace(new RegExp(`\\b(?:the|those)\\s+(${ONES_RE}|${TEENS_RE})s\\b`, "gi"), "$1");
	text = text.replace(new RegExp(`\\b(?:(a|an|${ONES_RE})\\s+)?hundred(?:\\s+and)?(?:\\s+(${TENS_RE}))?(?:\\s+(${ONES_RE}|${TEENS_RE}))?\\b`, "gi"), (_full, mult, ten, one) => {
		const head = (mult ?? "").toLowerCase();
		const base = !head || head === "a" || head === "an" ? 100 : (SPOKEN_ONES[head] ?? 1) * 100;
		return String(base + (ten ? spokenValue(ten) ?? 0 : 0) + (one ? spokenValue(one) ?? 0 : 0));
	});
	text = text.replace(new RegExp(`\\b(${ONES_RE})\\s+(${GYM_TENS_RE})(?:\\s+(${ONES_RE}))?\\b`, "gi"), (_full, plates, ten, one) => String((SPOKEN_ONES[plates.toLowerCase()] ?? 0) * 100 + (spokenValue(ten) ?? 0) + (one ? SPOKEN_ONES[one.toLowerCase()] ?? 0 : 0)));
	text = text.replace(new RegExp(`\\b(${TENS_RE})(?:\\s+(${ONES_RE}))?\\b`, "gi"), (_full, ten, one) => String((spokenValue(ten) ?? 0) + (one ? SPOKEN_ONES[one.toLowerCase()] ?? 0 : 0)));
	text = text.replace(new RegExp(`\\b(${TEENS_RE})\\b`, "gi"), (word) => String(spokenValue(word) ?? word));
	text = text.replace(new RegExp(`\\b((?:${ONES_RE})(?:\\s+(?:${ONES_RE})){1,2})\\b`, "gi"), (seq) => {
		const digits = seq.split(/\s+/).map((word) => SPOKEN_ONES[word.toLowerCase()]);
		if (digits.some((digit) => digit == null)) return seq;
		return digits.join("");
	});
	text = text.replace(new RegExp(`\\b(?:the|at)\\s+(${ONES_RE}|${TEENS_RE})\\b`, "gi"), (_full, word) => {
		return String(spokenValue(word) ?? word);
	});
	text = text.replace(new RegExp(`\\b(${ONES_RE}|${TEENS_RE})\\s+(lb|lbs|pounds?|kg|kilos?)\\b`, "gi"), (_full, word, unit) => `${spokenValue(word) ?? word} ${unit}`);
	return text;
}
function parseDay(iso) {
	return /* @__PURE__ */ new Date(`${iso}T12:00:00`);
}
function formatToday(date = /* @__PURE__ */ new Date()) {
	return format(date, "EEEE, MMM d").toUpperCase();
}
function formatShort(iso) {
	return format(parseDay(iso), "MMM d");
}
function todayIso(date = /* @__PURE__ */ new Date()) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function blankProfile() {
	return {
		sex: null,
		age: null,
		weightLb: null,
		heightIn: null,
		classMinutes: 45
	};
}
var MET = {
	strength: {
		easy: 3.5,
		"just-right": 5,
		hard: 6
	},
	cardio: {
		easy: 6,
		"just-right": 8,
		hard: 10.5
	}
};
function weightKg(profile) {
	if (profile.weightLb == null || profile.weightLb < 70 || profile.weightLb > 500) return null;
	return profile.weightLb * .45359237;
}
function bmr(profile, kg) {
	const heightOk = profile.heightIn != null && profile.heightIn >= 48 && profile.heightIn <= 96;
	const ageOk = profile.age != null && profile.age >= 13 && profile.age <= 100;
	if (!heightOk || !ageOk || !profile.sex) return null;
	const cm = (profile.heightIn ?? 0) * 2.54;
	const sex = profile.sex === "male" ? 5 : profile.sex === "female" ? -161 : -78;
	return 10 * kg + 6.25 * cm - 5 * (profile.age ?? 0) + sex;
}
function restingPerMinute(profile, kg) {
	const resting = bmr(profile, kg);
	if (resting == null) return kg / 60;
	return Math.max(.5, resting / 1440);
}
function dailyCalories(profile) {
	const kg = weightKg(profile);
	if (kg == null) return null;
	const resting = bmr(profile, kg);
	if (resting == null) return null;
	const minutes = Math.min(180, Math.max(15, profile.classMinutes || 45));
	return {
		kcal: Math.max(0, Math.round(resting * (minutes >= 75 ? 1.725 : minutes >= 40 ? 1.55 : 1.375) / 10) * 10),
		minutes
	};
}
function profileReady(profile) {
	return weightKg(profile) != null;
}
function projectClassKcal(profile, classKind, effort = "just-right") {
	const kg = weightKg(profile);
	if (kg == null) return null;
	const rest = restingPerMinute(profile, kg);
	const minutes = Math.min(180, Math.max(15, profile.classMinutes || 45));
	const net = (MET[classKind][effort] * kg / 60 - rest) * minutes;
	return Math.max(0, Math.round(net / 10) * 10);
}
function workoutBurns(logs, profile) {
	const kg = weightKg(profile);
	if (kg == null) return [];
	const rest = restingPerMinute(profile, kg);
	const minutes = Math.min(180, Math.max(15, profile.classMinutes || 45));
	const groups = /* @__PURE__ */ new Map();
	for (const log of logs) {
		if (log.setAside || log.value <= 0) continue;
		const key = `${log.date}:${log.classKind}`;
		const list = groups.get(key);
		if (list) list.push(log);
		else groups.set(key, [log]);
	}
	const burns = [];
	for (const [key, lines] of groups) {
		const split = key.indexOf(":");
		const date = key.slice(0, split);
		const classKind = key.slice(split + 1);
		const net = (lines.reduce((sum, line) => sum + MET[classKind][line.effort], 0) / lines.length * kg / 60 - rest) * minutes;
		burns.push({
			date,
			classKind,
			minutes,
			kcal: Math.max(0, Math.round(net / 10) * 10)
		});
	}
	burns.sort((a, b) => b.date.localeCompare(a.date) || a.classKind.localeCompare(b.classKind));
	return burns;
}
function weekKcal(logs, profile, today = todayIso()) {
	const day = parseDay(today);
	day.setDate(day.getDate() - day.getDay());
	const start = todayIso(day);
	return workoutBurns(logs, profile).filter((burn) => burn.date >= start && burn.date <= today).reduce((sum, burn) => sum + burn.kcal, 0);
}
function effortLabel(effort) {
	if (effort === "easy") return "Easy";
	if (effort === "hard") return "Hard";
	return "Just right";
}
function unitWord(movement) {
	return movement.unit === "in" ? "in" : "lb";
}
function lastValue(logs, movementId, kind) {
	const series = logsFor(logs, movementId, kind).filter((log) => !log.setAside);
	return series.length > 0 ? series[series.length - 1].value : null;
}
function lastClass(logs, kind) {
	const series = logs.filter((log) => log.classKind === kind && !log.setAside).slice().sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
	const latest = series[series.length - 1];
	if (!latest) return [];
	return series.filter((log) => log.date === latest.date);
}
function logsFor(logs, movementId, filter) {
	return logs.filter((log) => log.movementId === movementId && (filter === "mixed" || log.classKind === filter)).slice().sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
}
function suggestionForKind(movement, logs, classKind) {
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
		streak
	};
}
function readyList(movements, logs) {
	const items = [];
	for (const movement of movements) for (const classKind of ["strength", "cardio"]) {
		const suggestion = suggestionForKind(movement, logs, classKind);
		if (suggestion) items.push({
			movement,
			...suggestion
		});
	}
	items.sort((a, b) => {
		if (a.classKind !== b.classKind) return a.classKind === "strength" ? -1 : 1;
		return a.movement.order - b.movement.order;
	});
	return items;
}
function suggestionForFilter(movement, logs, filter) {
	if (filter === "mixed") return suggestionForKind(movement, logs, "strength") ?? suggestionForKind(movement, logs, "cardio");
	return suggestionForKind(movement, logs, filter);
}
function readyText(suggestion, movement) {
	if (movement.unit === "in") return `Ready: try ${suggestion.to} in`;
	return `Ready: try ${suggestion.to}`;
}
function weightSubtitle(movement, logs, goals) {
	const goal = goals.find((item) => item.movementId === movement.id && (item.kind === "load" || item.kind === "milestone"));
	if (goal?.target) return `Goal: ${goal.target} ${unitWord(movement)}`;
	const strength = logsFor(logs, movement.id, "strength");
	const cardio = logsFor(logs, movement.id, "cardio");
	if (strength.length > 0 && cardio.length === 0) return "No cardio-day log yet";
	if (cardio.length > 0 && strength.length === 0) return "No strength-day log yet";
	const counted = [...strength, ...cardio].filter((log) => !log.setAside).sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
	const latest = counted[counted.length - 1];
	if (!latest) return "No logs yet";
	if (latest.effort === "just-right") return "Last: just right";
	if (latest.effort === "easy") return "Last: easy";
	if (latest.context) return `Hold: hard, but ${CONTEXTS$1[latest.context].hold}`;
	return "Hold: last one was hard";
}
function displayLoad(movement, logs, kind) {
	const series = logsFor(logs, movement.id, kind);
	if (series.length === 0) return "—";
	const last = series[series.length - 1];
	if (movement.unit === "in") return `${last.value} in`;
	return String(last.value);
}
function historyMeta(log, movement) {
	const load = movement.unit === "in" ? `${log.value} in` : `${log.value} lb`;
	const context = log.context ? ` · Context: ${CONTEXTS$1[log.context].chip}` : "";
	return `${formatShort(log.date)} · ${load} · ${effortLabel(log.effort)}${context}`;
}
function chartSectionTitle(filter) {
	if (filter === "strength") return "Last 6 strength classes";
	if (filter === "cardio") return "Last 6 cardio classes";
	return "Last 6 classes";
}
function goalKindLabel(kind) {
	if (kind === "load") return "Load";
	if (kind === "milestone") return "Milestone";
	if (kind === "calories") return "Calories";
	return "Endurance";
}
function goalSnapshot(goal, movement, logs, profile) {
	if (goal.kind === "calories") {
		if (!profileReady(profile)) return {
			progress: 0,
			left: "Add weight in Account",
			right: "Needed for kcal"
		};
		const burned = weekKcal(logs, profile);
		const target = goal.target ?? 0;
		return {
			progress: target > 0 ? Math.min(100, Math.round(burned / target * 100)) : 0,
			left: `${burned.toLocaleString()} kcal this week`,
			right: target > 0 && burned >= target ? "Week covered" : `${Math.max(0, target - burned).toLocaleString()} to go`
		};
	}
	if (goal.kind === "endurance") {
		const progress = Math.min(100, Math.max(0, goal.progress ?? 0));
		return {
			progress,
			left: progress >= 70 ? "Feeling easier" : progress >= 35 ? "Recovery improving" : "Keep showing up",
			right: progress >= 100 ? "On track" : "Keep logging"
		};
	}
	const values = logs.filter((log) => log.movementId === goal.movementId).map((log) => log.value);
	const now = values.length > 0 ? Math.max(...values) : 0;
	const target = goal.target ?? 0;
	const increment = movement?.increment ?? 5;
	const unit = movement ? unitWord(movement) : "lb";
	const progress = target > 0 ? Math.min(100, Math.round(now / target * 100)) : 0;
	const next = target > 0 && now >= target ? null : target > 0 ? Math.min(target, (now || 0) + increment) : null;
	const ratio = movement?.unit === "lb" && profile.weightLb && profile.weightLb > 0 && now > 0 ? ` · ${(now / profile.weightLb).toFixed(2)}× you` : "";
	return {
		progress,
		left: now > 0 ? `Now: ${now} ${unit}${ratio}` : "Now: —",
		right: next == null ? "Goal hit" : `Next step: ${next} ${unit}`
	};
}
function recoveryCopy(recovery) {
	const direction = recovery.dropBpm >= recovery.previousDrop ? "up" : "down";
	return {
		drop: `−${recovery.dropBpm} bpm`,
		dropDetail: `1 min after class · ${direction} from −${recovery.previousDrop} in ${recovery.previousWhen}`,
		zone: `${recovery.highZoneMin} min`,
		zoneDetail: "Avg per class, steady effort"
	};
}
function readySentence(items) {
	if (items.length === 0) return "Two easy classes at the same weight, and the next one shows up here.";
	if (items.length === 1) return `${items[0].movement.name} is ready to go up.`;
	const second = items[1].movement.name.toLowerCase();
	if (items.length === 2) return `${items[0].movement.name} and ${second} are ready to go up.`;
	return `${items.length} lifts are ready to go up.`;
}
function contextCallout(lines, movements) {
	const hits = lines.filter((line) => line.effort === "hard" && line.context);
	if (hits.length === 0) return null;
	const first = hits[0];
	const name = movements.find((movement) => movement.id === first.movementId)?.name ?? "That lift";
	const word = first.effortWord ?? "hard";
	const chip = CONTEXTS$1[first.context].chip;
	if (hits.length === 1) return `Context: ${chip}. ${name} "${word}" won't hold back your progress.`;
	return `Context: ${chip}. Those hard sets won't hold back your progress.`;
}
function findWord(text, pairs) {
	const lower = text.toLowerCase();
	for (const [needle, word] of pairs) {
		const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		if (new RegExp(`\\b${escaped}\\b`, "i").test(lower)) return word;
	}
	return null;
}
function findContext(text) {
	if (/slept badly|slept bad|slept poorly|slept terrible|poor sleep|bad sleep|didn'?t sleep|did not sleep|no sleep|couldn'?t sleep|could not sleep|rough night|bad night|awful night|insomnia/i.test(text)) return "poor-sleep";
	if (/\bwine\b/i.test(text)) return "wine";
}
function extractValue(clause) {
	let text = clause.toLowerCase();
	text = text.replace(/\b\d{1,2}\s*(?:x|×|by)\s*\d{1,2}\b/gi, " ");
	text = text.replace(/\b\d{1,2}\s+sets?\s+of\s+\d{1,2}\b/gi, " ");
	text = text.replace(/\bsets?\s+of\s+\d{1,2}\b/gi, " ");
	text = text.replace(/\b\d{1,2}\s+sets?\b/gi, " ");
	text = text.replace(/\b\d{1,2}\s*(?:reps?|times)\b/gi, " ");
	text = text.replace(/\bfor\s+(\d{1,3}(?:\.\d+)?)(?:\s*(?:reps?|times))?\b/gi, (full, raw, offset) => {
		const num = Number(raw);
		const rest = `${text.slice(0, offset)} ${text.slice(offset + full.length)}`;
		if ((/reps?|times/i.test(full) || num <= 30) && /\d/.test(rest)) return " ";
		return full;
	});
	const re = /(\d{1,3}(?:\.\d+)?)(?:\s*(lb|lbs|pound|pounds|kg|kilo|kilos|s|in|inch|inches))?\b/gi;
	const found = [];
	for (const match of text.matchAll(re)) {
		const suffix = (match[2] ?? "").toLowerCase();
		const kilos = [
			"kg",
			"kilo",
			"kilos"
		].includes(suffix);
		const weighted = [
			"lb",
			"lbs",
			"pound",
			"pounds",
			"s",
			"in",
			"inch",
			"inches",
			"kg",
			"kilo",
			"kilos"
		].includes(suffix);
		const raw = Number(match[1]);
		const value = kilos ? Math.round(raw * 2.20462) : Math.round(raw);
		found.push({
			value,
			weighted
		});
	}
	if (found.length === 0) return null;
	const weighted = found.filter((item) => item.weighted);
	const pool = weighted.length > 0 ? weighted : found;
	return pool[pool.length - 1].value;
}
function findMentions(text, movements) {
	const lower = text.toLowerCase();
	const found = [];
	for (const movement of movements) {
		const names = [...movement.aliases, movement.name].map((name) => name.toLowerCase()).sort((a, b) => b.length - a.length);
		const seen = /* @__PURE__ */ new Set();
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
				if (beforeOk && afterOk) found.push({
					movement,
					index,
					length: name.length
				});
				from = index + Math.max(name.length, 1);
			}
		}
	}
	found.sort((a, b) => a.index - b.index || b.length - a.length);
	const kept = [];
	for (const mention of found) {
		const last = kept[kept.length - 1];
		if (last && mention.index < last.index + last.length) continue;
		kept.push(mention);
	}
	return kept;
}
function parseTranscript(text, fallbackKind, movements) {
	const spoken = normalizeSpokenNumbers(text);
	let classKind = fallbackKind;
	if (/\bcardio\b/i.test(spoken) && !/\bstrength\b/i.test(spoken)) classKind = "cardio";
	else if (/\bstrength\b/i.test(spoken)) classKind = "strength";
	const mentions = findMentions(spoken, movements);
	const lines = [];
	const numberFirst = extractValue(spoken.slice(0, mentions[0]?.index ?? 0)) != null;
	mentions.forEach((mention, index) => {
		const next = mentions[index + 1];
		const prev = mentions[index - 1];
		const before = spoken.slice(prev ? prev.index + prev.length : 0, mention.index);
		const after = spoken.slice(mention.index + mention.length, next?.index ?? spoken.length);
		const afterSentences = after.split(/[.!]+\s+/).map((part) => part.trim()).filter(Boolean);
		const beforeSentences = before.split(/[.!]+\s+/).map((part) => part.trim()).filter(Boolean);
		const afterValue = extractValue(afterSentences[0] ?? "") ?? extractValue(after);
		const beforeValue = extractValue(before);
		const value = numberFirst ? beforeValue ?? afterValue : afterValue ?? beforeValue;
		if (value == null) return;
		const nameSentence = afterSentences[0] ?? "";
		const follow = afterSentences[1];
		const nameHasEffort = Boolean(findWord(nameSentence, HARD_WORDS) || findWord(nameSentence, EASY_WORDS) || findWord(nameSentence, RIGHT_WORDS));
		const lead = beforeSentences[beforeSentences.length - 1] ?? "";
		let effortSource = nameSentence;
		if (!nameHasEffort && follow && !/\d/.test(follow)) effortSource = `${nameSentence} ${follow}`;
		if (!findWord(effortSource, HARD_WORDS) && !findWord(effortSource, EASY_WORDS) && !findWord(effortSource, RIGHT_WORDS)) effortSource = `${effortSource} ${lead}`;
		const hard = findWord(effortSource, HARD_WORDS);
		const easy = findWord(effortSource, EASY_WORDS);
		const right = findWord(effortSource, RIGHT_WORDS);
		let effort = "just-right";
		let effortWord;
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
			context: findContext(nameSentence) ?? (/\d/.test(lead) ? void 0 : findContext(lead)),
			effortWord
		});
	});
	return {
		classKind,
		lines
	};
}
function bumpEndurance(goals, effort) {
	const delta = effort === "easy" ? 8 : effort === "just-right" ? 3 : -6;
	return goals.map((goal) => {
		if (goal.kind !== "endurance") return goal;
		const progress = Math.min(100, Math.max(8, (goal.progress ?? 20) + delta));
		return {
			...goal,
			progress
		};
	});
}
function slugify(name) {
	return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "lift";
}
var DEMO_GOAL_IDS = /* @__PURE__ */ new Set([
	"goal-deadlift",
	"goal-box",
	"goal-cardio"
]);
function cloneMovements() {
	return MOVEMENTS.map((movement) => ({
		...movement,
		aliases: [...movement.aliases]
	}));
}
function blankDraft(date = todayIso()) {
	return {
		date,
		classKind: "strength",
		transcript: "",
		lines: [],
		phase: "compose",
		editing: false,
		savedTick: 0,
		datePinned: false
	};
}
function freshData() {
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
		skipped: {
			date: "",
			ids: []
		}
	};
}
function wipePersisted(persisted) {
	const prev = persisted ?? {};
	const movements = Array.isArray(prev.movements) && prev.movements.length > 0 ? prev.movements : cloneMovements();
	return {
		movements,
		logs: [],
		goals: Array.isArray(prev.goals) ? prev.goals.filter((goal) => !DEMO_GOAL_IDS.has(goal.id)) : [],
		recovery: null,
		profile: prev.profile && typeof prev.profile === "object" ? {
			...blankProfile(),
			...prev.profile
		} : blankProfile(),
		draft: blankDraft(),
		historyMovementId: movements[0]?.id ?? "goblet-squat",
		historyFilter: "strength",
		skipped: {
			date: "",
			ids: []
		}
	};
}
var memoryStorage = {
	getItem: () => null,
	setItem: () => {},
	removeItem: () => {}
};
var useHeft = create()(persist((set, get) => ({
	...freshData(),
	setHistoryMovement: (id) => set({ historyMovementId: id }),
	setHistoryFilter: (filter) => set({ historyFilter: filter }),
	setAside: (logId, value) => set({ logs: get().logs.map((log) => log.id === logId ? {
		...log,
		setAside: value
	} : log) }),
	setDraft: (patch) => set({ draft: {
		...get().draft,
		...patch,
		savedTick: patch.savedTick ?? 0
	} }),
	upsertDraftLine: (movementId, patch) => {
		const { draft } = get();
		const lines = draft.lines.find((line) => line.movementId === movementId) ? draft.lines.map((line) => line.movementId === movementId ? {
			...line,
			...patch
		} : line) : [...draft.lines, {
			key: movementId,
			movementId,
			value: 0,
			effort: "just-right",
			...patch
		}];
		set({ draft: {
			...draft,
			lines,
			savedTick: 0,
			error: void 0
		} });
	},
	removeDraftLine: (key) => set({ draft: {
		...get().draft,
		savedTick: 0,
		lines: get().draft.lines.filter((line) => line.key !== key && line.movementId !== key)
	} }),
	addDraftLine: () => {
		const { movements, draft } = get();
		const used = new Set(draft.lines.map((line) => line.movementId));
		const movement = movements.find((item) => !used.has(item.id)) ?? movements[0];
		if (!movement) return;
		const line = {
			key: `${movement.id}-${Date.now()}`,
			movementId: movement.id,
			value: 0,
			effort: "just-right"
		};
		set({ draft: {
			...draft,
			savedTick: 0,
			editing: true,
			phase: "compose",
			lines: [...draft.lines, line]
		} });
	},
	applyTranscript: (text) => {
		const { draft, movements } = get();
		const knownIds = new Set(movements.map((movement) => movement.id));
		const known = [...movements, ...EXERCISE_LIBRARY.filter((movement) => !knownIds.has(movement.id))];
		const parsed = parseTranscript(text, draft.classKind, known);
		if (parsed.lines.length === 0) {
			set({ draft: {
				...draft,
				transcript: text,
				phase: "compose",
				savedTick: 0,
				error: "Name the lift and the weight. Try \"Deadlift 115, pretty tough.\""
			} });
			return;
		}
		let lines = draft.lines.slice();
		const added = [];
		for (const line of parsed.lines) {
			const next = {
				...line,
				key: line.movementId
			};
			const index = lines.findIndex((item) => item.movementId === line.movementId);
			if (index >= 0) lines[index] = {
				...lines[index],
				...next
			};
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
				error: void 0
			}
		});
	},
	repeatClass: (entries) => {
		const { draft } = get();
		let lines = draft.lines.slice();
		for (const entry of entries) {
			const next = {
				key: entry.movementId,
				movementId: entry.movementId,
				value: entry.value,
				effort: entry.effort,
				context: entry.context
			};
			const index = lines.findIndex((item) => item.movementId === entry.movementId);
			if (index >= 0) lines[index] = {
				...lines[index],
				...next
			};
			else lines = [...lines, next];
		}
		set({ draft: {
			...draft,
			lines,
			savedTick: 0,
			error: void 0,
			transcript: ""
		} });
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
					setAside: false
				});
				if (draft.classKind === "cardio") nextGoals = bumpEndurance(nextGoals, line.effort);
			} else {
				const effortChanged = existing.effort !== line.effort;
				nextLogs = nextLogs.map((log) => log.id === id ? {
					...log,
					value: line.value,
					effort: line.effort,
					context: line.context,
					note: log.note
				} : log);
				if (effortChanged && draft.classKind === "cardio") nextGoals = bumpEndurance(nextGoals, line.effort);
			}
		}
		set({
			logs: nextLogs,
			goals: nextGoals,
			draft: {
				...draft,
				savedTick: Date.now(),
				editing: false,
				error: void 0
			}
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
				nextMovements = [...nextMovements, {
					...fromLibrary,
					order: nextMovements.length + fromLibrary.order
				}];
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
				note: `${line.reps} reps`
			});
			if (classKind === "cardio") nextGoals = bumpEndurance(nextGoals, "just-right");
		}
		set({
			movements: nextMovements,
			logs: nextLogs,
			goals: nextGoals
		});
	},
	rollDraftTo: (date, force = false) => {
		if (!date) return;
		const { draft } = get();
		const dirty = draft.savedTick === 0 && (draft.lines.some((line) => line.value > 0) || draft.transcript.trim().length > 0);
		if (!force) {
			if (draft.datePinned || draft.date === date || dirty) return;
			set({ draft: {
				...blankDraft(date),
				classKind: draft.classKind
			} });
			return;
		}
		if (dirty) return;
		if (draft.date === date && !draft.datePinned) return;
		set({ draft: {
			...blankDraft(date),
			classKind: draft.classKind
		} });
	},
	addGoal: (goal) => set({ goals: [...get().goals, goal] }),
	updateGoal: (id, patch) => set({ goals: get().goals.map((goal) => goal.id === id ? {
		...goal,
		...patch
	} : goal) }),
	removeGoal: (id) => set({ goals: get().goals.filter((goal) => goal.id !== id) }),
	setRecovery: (recovery) => set({ recovery }),
	setProfile: (patch) => set({ profile: {
		...get().profile,
		...patch
	} }),
	addMovement: (movement) => set({ movements: [...get().movements, movement] }),
	clearLogs: () => set({
		logs: [],
		recovery: null,
		draft: blankDraft(todayIso()),
		skipped: {
			date: "",
			ids: []
		}
	}),
	skipRecommended: (date, movementId) => {
		if (!date || !movementId) return;
		const current = get().skipped ?? {
			date: "",
			ids: []
		};
		const ids = current.date === date ? current.ids : [];
		if (ids.includes(movementId)) return;
		set({ skipped: {
			date,
			ids: [...ids, movementId]
		} });
	},
	hydrate: (snapshot) => set({ ...snapshot })
}), {
	name: "heft-v1",
	version: 2,
	migrate: (persisted) => wipePersisted(persisted),
	storage: createJSONStorage(() => typeof window === "undefined" ? memoryStorage : window.localStorage),
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
		skipped: state.skipped
	})
}));
function readSnapshot() {
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
		skipped: state.skipped ?? {
			date: "",
			ids: []
		}
	};
}
var SEXES = [
	{
		id: "female",
		label: "Female"
	},
	{
		id: "male",
		label: "Male"
	},
	{
		id: "unspecified",
		label: "Other"
	}
];
function AccountScreen() {
	const profile = useHeft((state) => state.profile);
	const logs = useHeft((state) => state.logs);
	const setProfile = useHeft((state) => state.setProfile);
	const ready = profileReady(profile);
	const daily = dailyCalories(profile);
	const burns = workoutBurns(logs, profile);
	const week = weekKcal(logs, profile);
	const feet = profile.heightIn == null ? "" : String(Math.floor(profile.heightIn / 12));
	const inches = profile.heightIn == null ? "" : String(profile.heightIn % 12);
	function setHeight(nextFeet, nextInches) {
		if (nextFeet === "" && nextInches === "") {
			setProfile({ heightIn: null });
			return;
		}
		const total = (Number(nextFeet) || 0) * 12 + (Number(nextInches) || 0);
		setProfile({ heightIn: total > 0 ? total : null });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-semibold tracking-[0.22em] text-muted uppercase",
			children: "Body"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-3 text-balance",
			children: "Account"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm leading-relaxed text-muted",
			children: "Gender, size, and class length. Heft uses them to estimate calories and to read load goals against your bodyweight."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedOut, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted",
			children: "Sign in at the top to keep this history on your account."
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
			className: "mt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
				className: "text-sm font-semibold",
				children: "Gender"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 grid grid-cols-3 gap-1 rounded-2xl bg-just-soft p-1",
				children: SEXES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-pressed": profile.sex === item.id,
					onClick: () => setProfile({ sex: profile.sex === item.id ? null : item.id }),
					className: cn("rounded-xl py-2 text-sm font-semibold", profile.sex === item.id ? "bg-card text-ink shadow-sm" : "text-muted"),
					children: item.label
				}, item.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid grid-cols-2 gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
				id: "age",
				label: "Age",
				value: profile.age,
				suffix: "yr",
				onChange: (age) => setProfile({ age })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
				id: "weight",
				label: "Weight",
				value: profile.weightLb,
				suffix: "lb",
				onChange: (weightLb) => setProfile({ weightLb })
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid grid-cols-2 gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-sm font-semibold",
				htmlFor: "height-ft",
				children: ["Height", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mt-1 flex h-12 items-center rounded-xl border border-line bg-card px-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "height-ft",
						inputMode: "numeric",
						value: feet,
						"aria-label": "Height in feet",
						onChange: (event) => setHeight(event.target.value.replace(/[^\d]/g, ""), inches),
						className: "w-full bg-transparent text-base tabular-nums outline-none"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted",
						children: "ft"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-sm font-semibold",
				htmlFor: "height-in",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "invisible",
					children: "Inches"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mt-1 flex h-12 items-center rounded-xl border border-line bg-card px-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "height-in",
						inputMode: "numeric",
						value: inches,
						"aria-label": "Height in inches",
						onChange: (event) => setHeight(feet, event.target.value.replace(/[^\d]/g, "")),
						className: "w-full bg-transparent text-base tabular-nums outline-none"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted",
						children: "in"
					})]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
				id: "class-minutes",
				label: "Usual class length",
				value: profile.classMinutes,
				suffix: "min",
				onChange: (classMinutes) => setProfile({ classMinutes: classMinutes && classMinutes > 0 ? classMinutes : 45 })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8 rounded-3xl border border-line bg-card p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base",
					children: "Calories"
				}),
				daily ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-3xl font-semibold text-orange tabular-nums",
						children: daily.kcal.toLocaleString()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "kcal a day to maintain your weight"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm leading-relaxed text-muted",
						children: [
							"From your gender, age, weight, height, and a ",
							daily.minutes,
							"-minute class. This is an estimate, not a prescription."
						]
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted",
					children: "Add gender, age, weight, and height. Heft turns those into a daily calorie requirement."
				}),
				ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 border-t border-line pt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-semibold",
						children: [week.toLocaleString(), " kcal this week from class"]
					}), burns.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Log a class and each workout shows up here."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 divide-y divide-line",
						children: burns.slice(0, 8).map((burn) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-baseline justify-between gap-3 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-semibold capitalize",
								children: burn.classKind
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-sm text-muted",
								children: [
									formatShort(burn.date),
									" · ",
									burn.minutes,
									" min"
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-lg font-semibold tabular-nums",
								children: [burn.kcal, " kcal"]
							})]
						}, `${burn.date}-${burn.classKind}`))
					})]
				}) : null
			]
		})
	] });
}
function NumberField({ id, label, value, suffix, onChange }) {
	const [text, setText] = (0, import_react.useState)(value == null ? "" : String(value));
	const [touched, setTouched] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block text-sm font-semibold",
		htmlFor: id,
		children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "mt-1 flex h-12 items-center rounded-xl border border-line bg-card px-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id,
				inputMode: "numeric",
				value: touched ? text : value == null ? "" : String(value),
				onChange: (event) => {
					const next = event.target.value.replace(/[^\d]/g, "");
					setTouched(true);
					setText(next);
					onChange(next === "" ? null : Number(next));
				},
				className: "w-full bg-transparent text-base tabular-nums outline-none"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm text-muted",
				children: suffix
			})]
		})]
	});
}
function Sheet({ open, title, onClose, children }) {
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKey = (event) => {
			if (event.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, onClose]);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-40 flex items-end justify-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "absolute inset-0 bg-black/50",
			"aria-label": "Close",
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-label": title,
			className: "sheet-rise relative z-10 max-h-[85dvh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-card px-5 pt-3 pb-8 shadow-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mb-4 h-1 w-12 rounded-full bg-coral shadow-[0_0_10px_2px_rgba(8,122,136,0.55)]" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children
				})
			]
		})]
	});
}
function GoalsScreen() {
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
	const [goalOpen, setGoalOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [recoveryOpen, setRecoveryOpen] = (0, import_react.useState)(false);
	const [confirmClear, setConfirmClear] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-balance",
				children: "Goals"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => {
					setEditing(null);
					setGoalOpen(true);
				},
				className: "capsule-quiet px-4 py-2 text-xs",
				children: "+ Add goal"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "mt-6 space-y-3",
			children: [goals.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "rounded-3xl border border-line bg-card p-4 text-sm leading-relaxed text-muted",
				children: "No goals yet."
			}) : null, goals.map((goal) => {
				const snap = goalSnapshot(goal, movements.find((item) => item.id === goal.movementId), logs, profile);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						setEditing(goal);
						setGoalOpen(true);
					},
					className: "w-full rounded-3xl border border-line bg-card p-4 text-left",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-baseline justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-lg font-bold",
								children: goal.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 text-sm text-muted",
								children: goalKindLabel(goal.kind)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-3 block h-2 overflow-hidden rounded-full bg-track",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block h-full rounded-full bg-pop",
								style: { width: `${snap.progress}%` }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-3 flex items-center justify-between gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: snap.left }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-right",
								children: snap.right
							})]
						})
					]
				}) }, goal.id);
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitDivider, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-base",
				children: "Effort and recovery"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold tracking-wide text-muted",
				children: "WATCH · OPTIONAL"
			})]
		}),
		recovery ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecoveryCard, {
			recovery,
			onEdit: () => setRecoveryOpen(true)
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => setRecoveryOpen(true),
			className: "mt-3 w-full rounded-3xl border border-line bg-hero p-5 text-left text-on-hero",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-semibold",
				children: "No watch reading yet"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-hero-muted",
				children: "Add heart-rate recovery if you wear one. It's optional."
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => {
				if (!confirmClear) {
					setConfirmClear(true);
					return;
				}
				clearLogs();
				setConfirmClear(false);
			},
			className: "mt-8 text-sm font-semibold text-muted",
			children: confirmClear ? "Tap again to clear logs" : "Clear logs"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoalSheet, {
			open: goalOpen,
			initial: editing,
			onClose: () => setGoalOpen(false),
			onSave: (goal) => {
				if (editing) updateGoal(editing.id, goal);
				else addGoal({
					...goal,
					id: `goal-${Date.now()}`
				});
				setGoalOpen(false);
			},
			onRemove: editing ? () => {
				removeGoal(editing.id);
				setGoalOpen(false);
			} : void 0
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecoverySheet, {
			open: recoveryOpen,
			initial: recovery,
			onClose: () => setRecoveryOpen(false),
			onSave: (next) => {
				setRecovery(next);
				setRecoveryOpen(false);
			},
			onClear: () => {
				setRecovery(null);
				setRecoveryOpen(false);
			}
		})
	] });
}
function RecoveryCard({ recovery, onEdit }) {
	const copy = recoveryCopy(recovery);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3 rounded-3xl border border-line bg-hero p-5 text-on-hero",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-hero-muted",
						children: "Cardio recovery"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-3xl font-semibold text-orange tabular-nums",
						children: copy.drop
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm leading-snug text-hero-muted",
						children: copy.dropDetail
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-hero-muted",
						children: "Cardio days, high zones"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-3xl font-semibold text-navy tabular-nums",
						children: copy.zone
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm leading-snug text-hero-muted",
						children: copy.zoneDetail
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 border-t border-hero-line pt-4 text-sm leading-relaxed",
				children: recovery.note
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onEdit,
				className: "mt-3 text-sm font-semibold text-orange",
				children: "Update"
			})
		]
	});
}
function GoalSheet({ open, initial, onClose, onSave, onRemove }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		title: initial ? "Edit goal" : "Add a goal",
		onClose,
		children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoalForm, {
			initial,
			onSave,
			onRemove
		}, initial?.id ?? "new") : null
	});
}
function GoalForm({ initial, onSave, onRemove }) {
	const movements = useHeft((state) => state.movements);
	const [kind, setKind] = (0, import_react.useState)(initial?.kind ?? "load");
	const [movementId, setMovementId] = (0, import_react.useState)(initial?.movementId ?? movements[0]?.id ?? "");
	const [target, setTarget] = (0, import_react.useState)(initial?.target ? String(initial.target) : "");
	const [title, setTitle] = (0, import_react.useState)(initial?.title ?? "");
	const [titleDirty, setTitleDirty] = (0, import_react.useState)(Boolean(initial));
	const movement = movements.find((item) => item.id === movementId);
	const targetNumber = Number(target);
	const auto = kind === "endurance" ? "Easier cardio days" : kind === "calories" && targetNumber > 0 ? `Burn ${targetNumber.toLocaleString()} kcal a week` : movement && targetNumber > 0 ? kind === "milestone" && movement.unit === "in" ? `${targetNumber}-inch ${movement.name.toLowerCase()}` : `${movement.name} ${targetNumber} ${movement.unit === "in" ? "in" : "lb"}` : "";
	const shownTitle = titleDirty ? title : auto || title;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "space-y-3",
		onSubmit: (event) => {
			event.preventDefault();
			if (kind !== "endurance" && !(targetNumber > 0)) return;
			onSave({
				title: shownTitle || "New goal",
				kind,
				movementId: kind === "endurance" || kind === "calories" ? void 0 : movementId,
				target: kind === "endurance" ? void 0 : targetNumber,
				progress: kind === "endurance" ? initial?.progress ?? 24 : void 0
			});
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-1 rounded-2xl bg-just-soft p-1",
				children: [
					"load",
					"milestone",
					"endurance",
					"calories"
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setKind(item);
						if (!titleDirty) setTitle("");
					},
					className: cn("rounded-xl py-2 text-sm font-semibold", kind === item ? "bg-card shadow-sm" : "text-muted"),
					children: goalKindLabel(item)
				}, item))
			}),
			kind === "load" || kind === "milestone" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "block text-sm font-semibold",
					htmlFor: "goal-movement",
					children: "Movement"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					id: "goal-movement",
					value: movementId,
					onChange: (event) => setMovementId(event.target.value),
					className: "w-full rounded-xl border border-line bg-paper px-3 py-3 text-base",
					children: movements.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: item.id,
						children: item.name
					}, item.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "block text-sm font-semibold",
					htmlFor: "goal-target",
					children: "Target"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "goal-target",
					inputMode: "numeric",
					value: target,
					onChange: (event) => setTarget(event.target.value.replace(/[^\d]/g, "")),
					className: "w-full rounded-xl border border-line bg-paper px-3 py-3 text-base tabular-nums"
				})
			] }) : null,
			kind === "calories" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "block text-sm font-semibold",
				htmlFor: "goal-kcal",
				children: "Kcal each week"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: "goal-kcal",
				inputMode: "numeric",
				value: target,
				onChange: (event) => setTarget(event.target.value.replace(/[^\d]/g, "")),
				className: "w-full rounded-xl border border-line bg-paper px-3 py-3 text-base tabular-nums"
			})] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "block text-sm font-semibold",
				htmlFor: "goal-title",
				children: "Name"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: "goal-title",
				value: shownTitle,
				onChange: (event) => {
					setTitleDirty(true);
					setTitle(event.target.value);
				},
				className: "w-full rounded-xl border border-line bg-paper px-3 py-3 text-base"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "submit",
				className: "capsule h-12 w-full text-sm",
				children: "Save goal"
			}),
			onRemove ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onRemove,
				className: "w-full py-2 text-sm font-semibold text-muted",
				children: "Remove goal"
			}) : null
		]
	});
}
function RecoverySheet({ open, initial, onClose, onSave, onClear }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		title: "Watch reading",
		onClose,
		children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecoveryForm, {
			initial,
			onSave,
			onClear
		}, initial?.dropBpm ?? "empty") : null
	});
}
function RecoveryForm({ initial, onSave, onClear }) {
	const [drop, setDrop] = (0, import_react.useState)(initial ? String(initial.dropBpm) : "28");
	const [previous, setPrevious] = (0, import_react.useState)(initial ? String(initial.previousDrop) : "22");
	const [when, setWhen] = (0, import_react.useState)(initial?.previousWhen ?? "Sep");
	const [zone, setZone] = (0, import_react.useState)(initial ? String(initial.highZoneMin) : "18");
	const [note, setNote] = (0, import_react.useState)(initial?.note ?? "");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "space-y-3",
		onSubmit: (event) => {
			event.preventDefault();
			onSave({
				dropBpm: Number(drop) || 0,
				previousDrop: Number(previous) || 0,
				previousWhen: when || "last month",
				highZoneMin: Number(zone) || 0,
				note: note.trim() || "Logged from your watch."
			});
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Recovery drop (bpm)",
				value: drop,
				onChange: setDrop,
				numeric: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Previous drop",
				value: previous,
				onChange: setPrevious,
				numeric: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Previous period",
				value: when,
				onChange: setWhen
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "High-zone minutes",
				value: zone,
				onChange: setZone,
				numeric: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "block text-sm font-semibold",
				htmlFor: "watch-note",
				children: "Note"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				id: "watch-note",
				value: note,
				onChange: (event) => setNote(event.target.value),
				className: "min-h-24 w-full resize-none rounded-xl border border-line bg-paper px-3 py-3 text-base leading-relaxed"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "submit",
				className: "capsule h-12 w-full text-sm",
				children: "Save reading"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onClear,
				className: "w-full py-2 text-sm font-semibold text-muted",
				children: "Clear reading"
			})
		]
	});
}
function Field({ label, value, onChange, numeric }) {
	const id = label.toLowerCase().replace(/[^a-z]+/g, "-");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: "block text-sm font-semibold",
		htmlFor: id,
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		id,
		inputMode: numeric ? "numeric" : "text",
		value,
		onChange: (event) => onChange(numeric ? event.target.value.replace(/[^\d]/g, "") : event.target.value),
		className: "w-full rounded-xl border border-line bg-paper px-3 py-3 text-base"
	})] });
}
var FILTERS = [
	{
		id: "strength",
		label: "Strength"
	},
	{
		id: "cardio",
		label: "Cardio"
	},
	{
		id: "mixed",
		label: "Mixed"
	}
];
function barClass(effort, setAside) {
	const color = effort === "easy" ? "bg-coral" : effort === "hard" ? "bg-navy" : "bg-just";
	return setAside ? `${color} opacity-40` : color;
}
function HistoryScreen() {
	const movements = useHeft((state) => state.movements);
	const logs = useHeft((state) => state.logs);
	const movementId = useHeft((state) => state.historyMovementId);
	const filter = useHeft((state) => state.historyFilter);
	const setMovement = useHeft((state) => state.setHistoryMovement);
	const setFilter = useHeft((state) => state.setHistoryFilter);
	const setAside = useHeft((state) => state.setAside);
	const addMovement = useHeft((state) => state.addMovement);
	const [picker, setPicker] = (0, import_react.useState)(false);
	const [newName, setNewName] = (0, import_react.useState)("");
	const movement = movements.find((item) => item.id === movementId) ?? movements[0];
	if (!movement) return null;
	const series = logsFor(logs, movement.id, filter);
	const bars = series.slice(-6);
	const max = Math.max(...bars.map((bar) => bar.value), 1);
	const suggestion = suggestionForFilter(movement, logs, filter);
	const notes = series.filter((log) => log.note || log.context || log.effort === "hard").slice().reverse();
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
			order: movements.length
		});
		setMovement(id);
		setNewName("");
		setPicker(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-semibold tracking-widest text-muted",
			children: "HISTORY"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-3 text-balance",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "text-left",
				onClick: () => setPicker(true),
				children: [movement.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
					className: "ml-1 inline size-6 align-middle text-muted",
					"aria-hidden": "true"
				})]
			})
		}),
		heard ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 text-sm leading-relaxed text-muted",
			children: ["Also heard as ", heard]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 grid grid-cols-3 rounded-2xl bg-just-soft p-1",
			children: FILTERS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setFilter(item.id),
				className: cn("rounded-xl py-2 text-sm font-semibold", filter === item.id ? "bg-card text-ink shadow-sm" : "text-muted"),
				children: item.label
			}, item.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-4 rounded-3xl border border-line bg-card p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: chartSectionTitle(filter)
					}), suggestion ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "shrink-0 text-sm font-semibold text-orange",
						children: readyText(suggestion, movement)
					}) : null]
				}),
				bars.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "py-8 text-center text-sm text-muted",
					children: [
						"No ",
						filter === "mixed" ? "" : `${filter} `,
						"logs for this yet."
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-40 items-end gap-1",
					children: bars.map((bar) => {
						const height = Math.max(18, Math.round(bar.value / max * 112));
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex h-full min-w-0 flex-1 flex-col items-center justify-end",
							"aria-label": `${historyMeta(bar, movement)}${bar.setAside ? ", set aside" : ""}`,
							onClick: () => document.getElementById(`note-${bar.id}`)?.scrollIntoView({ block: "nearest" }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 text-sm font-semibold tabular-nums",
								children: bar.value
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("w-full max-w-8 rounded-t-md", barClass(bar.effort, bar.setAside)),
								style: { height }
							})]
						}, bar.id);
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex gap-1",
					children: bars.map((bar) => {
						const [month, day] = formatShort(bar.date).split(" ");
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex-1 text-center text-xs leading-tight text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block",
								children: month
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block tabular-nums",
								children: day
							})]
						}, bar.id);
					})
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-4 text-sm text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
							swatch: "bg-coral",
							label: "Easy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
							swatch: "bg-just",
							label: "Just right"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
							swatch: "bg-navy",
							label: "Hard"
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitDivider, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-base",
			children: "Notes"
		}),
		notes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted",
			children: "Notes and off days show up here."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 space-y-3",
			children: notes.map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteCard, {
				log,
				meta: historyMeta(log, movement),
				onSetAside: setAside
			}, log.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
			open: picker,
			title: "Movements",
			onClose: () => setPicker(false),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-line",
				children: movements.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						setMovement(item.id);
						setPicker(false);
					},
					className: "flex w-full items-center justify-between gap-3 py-3 text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold",
						children: item.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-sm tabular-nums text-muted",
						children: [
							displayLoad(item, logs, "strength"),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "px-1",
								children: "/"
							}),
							displayLoad(item, logs, "cardio")
						]
					})]
				}) }, item.id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-4 flex gap-2",
				onSubmit: (event) => {
					event.preventDefault();
					addNamedMovement();
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: newName,
					onChange: (event) => setNewName(event.target.value),
					placeholder: "Add a movement",
					"aria-label": "New movement name",
					className: "min-w-0 flex-1 rounded-xl border border-line bg-paper px-3 py-3 text-base"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "capsule px-4 text-sm",
					children: "Add"
				})]
			})]
		})
	] });
}
function Legend({ swatch, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("size-2 rounded-full", swatch),
			"aria-hidden": "true"
		}), label]
	});
}
function NoteCard({ log, meta, onSetAside }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		id: `note-${log.id}`,
		className: cn("rounded-3xl border border-line bg-card p-4", log.setAside && "opacity-70"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [meta, log.setAside ? " · Set aside" : ""]
			}),
			log.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-base leading-relaxed italic",
				children: [
					"“",
					log.note,
					"”",
					!log.setAside && (log.effort === "hard" || log.context) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => onSetAside(log.id, true),
						className: "ml-2 font-semibold text-orange not-italic",
						children: "Set aside"
					}) : null
				]
			}) : !log.setAside && (log.effort === "hard" || log.context) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onSetAside(log.id, true),
				className: "mt-2 font-semibold text-orange",
				children: "Set aside"
			}) : null,
			log.setAside ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onSetAside(log.id, false),
				className: "mt-2 text-sm font-semibold text-orange",
				children: "Use this class"
			}) : null
		]
	});
}
function msUntilNextMidnight() {
	const now = /* @__PURE__ */ new Date();
	const next = new Date(now);
	next.setHours(24, 0, 0, 0);
	return Math.max(1e3, next.getTime() - now.getTime());
}
/** Local calendar day. Flips at midnight, and again when the tab or a sign-in wakes the app. */
function useTodayIso() {
	const [iso, setIso] = (0, import_react.useState)(() => todayIso());
	(0, import_react.useEffect)(() => {
		let midnight = 0;
		const sync = () => {
			const next = todayIso();
			setIso((prev) => prev === next ? prev : next);
			window.clearTimeout(midnight);
			midnight = window.setTimeout(sync, msUntilNextMidnight());
		};
		const onVisible = () => {
			if (document.visibilityState === "visible") sync();
		};
		sync();
		const poll = window.setInterval(sync, 6e4);
		document.addEventListener("visibilitychange", onVisible);
		window.addEventListener("focus", sync);
		window.addEventListener("pageshow", sync);
		window.addEventListener("heft-today", sync);
		return () => {
			window.clearTimeout(midnight);
			window.clearInterval(poll);
			document.removeEventListener("visibilitychange", onVisible);
			window.removeEventListener("focus", sync);
			window.removeEventListener("pageshow", sync);
			window.removeEventListener("heft-today", sync);
		};
	}, []);
	return iso;
}
var DEMOS = {
	"goblet-squat": {
		focus: "Quads and glutes, with the weight held at your chest.",
		setup: "Hold one dumbbell or kettlebell against your chest, elbows pointing down. Feet a bit wider than your hips, toes slightly out.",
		steps: [
			"Sit between your heels until your elbows pass the inside of your knees.",
			"Keep your chest tall. The weight stays glued to your sternum.",
			"Drive the floor away and stand tall without bouncing out of the bottom."
		],
		example: "8 reps with a 35 lb kettlebell, the last two still smooth.",
		miss: "Heels lifting, or the weight drifting away from your chest."
	},
	"kettlebell-swing": {
		focus: "Hips and hamstrings. The bell floats because you hinge, not because you lift with your arms.",
		setup: "Feet shoulder-width. Bell on the floor a foot in front of you. Hinge and hike it back between your legs.",
		steps: [
			"Snap your hips forward. The bell rises to about chest height.",
			"Let it fall, and hinge again so your forearms graze your thighs.",
			"Keep your arms long. They are a rope, not a curl."
		],
		example: "10 swings with a 35 lb bell, each one finishing with hips locked.",
		miss: "Squatting the swing, or muscling it overhead with your shoulders."
	},
	deadlift: {
		focus: "Posterior chain: hamstrings, glutes, and back.",
		setup: "Bar over mid-foot. Hinge, grip just outside your legs, shins close to the bar. Chest up, back flat.",
		steps: [
			"Push the floor away. The bar stays against your legs.",
			"Stand until your hips and knees lock together.",
			"Lower it by hinging first, then bending the knees as it passes them."
		],
		example: "5 reps at 115 lb, each rep starting from a dead stop.",
		miss: "Rounding the low back, or yanking the bar off the floor with your arms."
	},
	"db-bench-press": {
		focus: "Chest, with the shoulders and triceps helping.",
		setup: "Lie on a bench, a dumbbell in each hand, wrists stacked over elbows.",
		steps: [
			"Lower the bells until your upper arms are about parallel to the floor.",
			"Press up and slightly in, stopping just short of clanging them together.",
			"Keep your feet planted and your shoulders on the bench."
		],
		example: "8 reps with 25 lb bells, elbows at about 45 degrees.",
		miss: "Flaring the elbows straight out, or bouncing the bells off your chest."
	},
	"renegade-row": {
		focus: "Back and core, one arm at a time from a plank.",
		setup: "Hands on dumbbells, feet a little wider than a push-up, body in a straight line.",
		steps: [
			"Row one bell toward your hip without twisting the shoulders.",
			"Set it down softly, then row the other side.",
			"Squeeze the glutes so your hips do not rock."
		],
		example: "6 rows each side with 20 lb bells.",
		miss: "Hiking the hip of the working side to cheat the bell up."
	},
	thrusters: {
		focus: "A squat into an overhead press, done as one motion.",
		setup: "Dumbbells at your shoulders, feet about shoulder-width.",
		steps: [
			"Squat until your hips are at least parallel.",
			"Drive up and use that speed to press the bells overhead.",
			"Finish with arms straight and ribs down, then lower the bells to the shoulders."
		],
		example: "8 thrusters with 20 lb bells.",
		miss: "Pressing before you have stood up, so the bells stall at your chin."
	},
	"reverse-lunge": {
		focus: "One leg at a time: quads, glutes, and balance.",
		setup: "Dumbbells at your sides, or a bar on your back. Stand tall.",
		steps: [
			"Step back and lower until the back knee hovers over the floor.",
			"Front heel stays down. Both knees bend.",
			"Push through the front foot to stand, then switch legs."
		],
		example: "8 each leg with 25 lb bells.",
		miss: "The front knee collapsing inward, or a tiny step that never loads the leg."
	},
	"box-jump": {
		focus: "Power. The height is the number you log, in inches.",
		setup: "Stand a short step back from a box you can land on quietly.",
		steps: [
			"Dip, swing the arms, and jump up onto the box.",
			"Land with soft knees, both feet fully on the box.",
			"Stand tall, then step down. Do not rebound off a sloppy landing."
		],
		example: "6 jumps onto a 20-inch box, each one stuck.",
		miss: "Landing on the toes and stumbling forward."
	},
	"back-squat": {
		focus: "Quads and glutes with a bar on your upper back.",
		setup: "Bar on the shelf of your upper back, not your neck. Feet about shoulder-width, brace.",
		steps: [
			"Sit down and slightly back until your hips pass parallel.",
			"Knees track over your toes.",
			"Stand by driving the floor away, chest up."
		],
		example: "5 reps at 135 lb, the last one still above parallel.",
		miss: "Good-morning the squat, so your chest dumps and the bar rolls forward."
	},
	"front-squat": {
		focus: "Quads, with the bar in front so your torso stays more upright.",
		setup: "Bar on the front of your shoulders, elbows high, fingertips under the bar.",
		steps: [
			"Sit straight down between your feet.",
			"Keep the elbows up so the bar does not roll.",
			"Drive up without shooting the hips back first."
		],
		example: "5 reps at 95 lb, elbows staying high the whole set.",
		miss: "Elbows dropping, which dumps the bar."
	},
	"sumo-deadlift": {
		focus: "Same lift as a deadlift, with a wide stance and a more upright torso.",
		setup: "Feet wide, toes out. Hands inside your knees, bar over mid-foot.",
		steps: [
			"Push the knees out over the toes and take the slack out of the bar.",
			"Stand by pushing the floor apart, bar close to you.",
			"Lock the hips at the top without leaning back."
		],
		example: "5 reps at 135 lb, knees pushed out the whole way.",
		miss: "Hips shooting up first so it turns into a stiff-leg pull."
	},
	"romanian-deadlift": {
		focus: "Hamstrings. You hinge, you do not squat.",
		setup: "Bar or bells in front of your thighs. Soft knees, not a deep bend.",
		steps: [
			"Push the hips back until you feel a stretch in the hamstrings.",
			"Keep the weight close and the back flat.",
			"Stand by squeezing the glutes. Do not bounce."
		],
		example: "8 reps at 95 lb, bar staying against the legs.",
		miss: "Bending the knees so much it becomes a regular deadlift."
	},
	"hip-thrust": {
		focus: "Glutes.",
		setup: "Upper back on a bench, bar or bell across the hips, feet planted.",
		steps: [
			"Drive through the heels until your hips are in line with your knees and shoulders.",
			"Squeeze at the top for a beat. Ribs stay down.",
			"Lower until the hips are just off the floor, then go again."
		],
		example: "10 reps at 135 lb, a one-second squeeze on each.",
		miss: "Overarching the low back to fake a higher lockout."
	},
	"good-morning": {
		focus: "Hamstrings and the spinal erectors, with a light bar.",
		setup: "Bar on your back like a squat. Knees softly bent.",
		steps: [
			"Hinge until your torso is about parallel, or as far as your hamstrings allow.",
			"Keep the bar over mid-foot.",
			"Stand tall by driving the hips forward."
		],
		example: "8 reps with just the bar, or 65 lb if that stays easy.",
		miss: "Using a deadlift weight. This is a lighter hinge."
	},
	"barbell-bench": {
		focus: "Chest, shoulders, and triceps.",
		setup: "Eyes under the bar. Feet planted. Grip a little wider than shoulder-width.",
		steps: [
			"Unrack and lower the bar to the lower chest.",
			"Press up and slightly back toward the rack.",
			"Shoulder blades stay pinched."
		],
		example: "5 reps at 95 lb, bar touching the chest under control.",
		miss: "Bouncing the bar, or flaring the elbows to 90 degrees."
	},
	"incline-bench": {
		focus: "Upper chest.",
		setup: "Bench around 30 degrees. Dumbbells or a bar over the upper chest.",
		steps: [
			"Lower until the upper arms are about parallel to the floor.",
			"Press up over the upper chest, not over the face.",
			"Keep the shoulders down, away from the ears."
		],
		example: "8 reps with 30 lb bells.",
		miss: "Setting the bench so steep it becomes a shoulder press."
	},
	"overhead-press": {
		focus: "Shoulders and triceps.",
		setup: "Bar or bells at the shoulders, wrists stacked, glutes and ribs tight.",
		steps: [
			"Press straight up, moving the head through once the bar clears it.",
			"Finish with the weight over the middle of the foot, arms straight.",
			"Lower to the shoulders. Do not turn it into a push press."
		],
		example: "6 strict reps at 65 lb.",
		miss: "Leaning back so hard the low back takes the load."
	},
	"push-press": {
		focus: "A shoulder press with a small leg drive.",
		setup: "Same rack as a strict press.",
		steps: [
			"Dip the knees a few inches, then drive up.",
			"Press as the hips lock. The legs start it; the arms finish it.",
			"Catch with arms straight overhead."
		],
		example: "5 reps at 85 lb.",
		miss: "A deep squat. The dip is short."
	},
	"barbell-row": {
		focus: "Upper back.",
		setup: "Hinge until your torso is near parallel. Bar hanging under the shoulders.",
		steps: [
			"Pull the bar to the bottom of the ribs.",
			"Squeeze the shoulder blades, then lower with control.",
			"The torso does not stand up to help."
		],
		example: "8 reps at 95 lb.",
		miss: "Yanking with the low back and standing halfway up."
	},
	"power-clean": {
		focus: "A pull from the floor into a front rack.",
		setup: "Deadlift stance. Hook grip if you use one. Bar over mid-foot.",
		steps: [
			"Push the floor away and keep the bar close.",
			"When it passes the knees, extend the hips hard.",
			"Pull yourself under and catch it on the front of the shoulders, elbows through."
		],
		example: "3 reps at 95 lb, each one re-set on the floor.",
		miss: "Reverse-curling the bar instead of catching it."
	},
	"hang-clean": {
		focus: "The same catch as a power clean, starting from the hang.",
		setup: "Bar at mid-thigh, shoulders over the bar, knees soft.",
		steps: [
			"Hinge slightly, then snap the hips.",
			"Elbows stay high as the bar rises.",
			"Catch in a quarter squat with the bar on the shoulders."
		],
		example: "5 reps at 75 lb.",
		miss: "Starting the pull with a big arm bend."
	},
	snatch: {
		focus: "A wide-grip pull from the floor to overhead.",
		setup: "Wide grip. Bar over mid-foot. Back flat.",
		steps: [
			"Pull close past the knees, then extend the hips.",
			"Punch under the bar and lock the arms.",
			"Stand up from the catch with the bar over mid-foot."
		],
		example: "3 power snatches at 65 lb.",
		miss: "Catching with bent elbows and pressing it out."
	},
	"barbell-curl": {
		focus: "Biceps.",
		setup: "Stand tall, bar in front of the thighs, elbows at your sides.",
		steps: [
			"Curl until the bar is near the shoulders.",
			"Lower until the arms are straight.",
			"Keep the elbows from drifting forward."
		],
		example: "10 reps at 45 lb.",
		miss: "Swinging the hips to start each rep."
	},
	"db-shoulder-press": {
		focus: "Shoulders, one bell in each hand.",
		setup: "Seated or standing, bells at shoulder height, palms forward.",
		steps: [
			"Press up until the arms are straight, bells close but not touching.",
			"Lower until the elbows are about level with the shoulders.",
			"Do not shrug the shoulders to the ears."
		],
		example: "8 reps with 20 lb bells.",
		miss: "Arching the back to turn it into an incline press."
	},
	"db-row": {
		focus: "One side of the back.",
		setup: "One hand and one knee on a bench, or hinged with a free hand on a rack. Bell hanging.",
		steps: [
			"Pull the bell toward the hip.",
			"Pause when the elbow is past the ribs.",
			"Lower until the arm is straight."
		],
		example: "10 each side with a 30 lb bell.",
		miss: "Rotating the chest open to shorten the pull."
	},
	"walking-lunge": {
		focus: "Quads and glutes, moving forward.",
		setup: "Bells at your sides. Stand tall.",
		steps: [
			"Step forward and lower the back knee toward the floor.",
			"Front heel stays down.",
			"Push through the front foot into the next step."
		],
		example: "8 steps each leg with 20 lb bells.",
		miss: "Steps so short you are just bobbing in place."
	},
	"bulgarian-split-squat": {
		focus: "The front leg. The back foot is only there for balance.",
		setup: "Rear toes on a bench, front foot far enough forward that the knee can travel.",
		steps: [
			"Lower until the back knee is close to the floor.",
			"Keep most of the weight on the front heel.",
			"Stand by driving the front foot down."
		],
		example: "8 each leg with 25 lb bells.",
		miss: "Pushing off the back foot so the front leg never works."
	},
	"step-up": {
		focus: "One leg, stepping onto a box.",
		setup: "Box about knee height. Bell or bells in your hands.",
		steps: [
			"Put the whole foot on the box.",
			"Stand up without a hop from the back leg.",
			"Step down under control and switch."
		],
		example: "8 each leg onto a 20-inch box with 20 lb bells.",
		miss: "Springing off the floor leg."
	},
	"db-rdl": {
		focus: "Hamstrings, with dumbbells.",
		setup: "Bells in front of the thighs. Soft knees.",
		steps: [
			"Push the hips back until the bells pass the knees.",
			"Back stays flat. Bells stay close.",
			"Stand by squeezing the glutes."
		],
		example: "8 reps with 30 lb bells.",
		miss: "Rounding the shoulders and letting the bells swing forward."
	},
	"lateral-raise": {
		focus: "Side delts.",
		setup: "Light bells at your sides, a tiny bend in the elbows.",
		steps: [
			"Raise the arms out to the side until they are about shoulder height.",
			"Lead with the elbows, not a shrug.",
			"Lower slowly."
		],
		example: "12 reps with 10 lb bells.",
		miss: "Swinging 25s up to the ears."
	},
	"rear-delt-fly": {
		focus: "Rear shoulders and upper back.",
		setup: "Hinge forward, bells hanging under the chest, elbows soft.",
		steps: [
			"Open the arms out to the side until they are in line with the shoulders.",
			"Squeeze the shoulder blades a little.",
			"Lower without dropping them."
		],
		example: "12 reps with 8 lb bells.",
		miss: "Standing up and turning it into a row."
	},
	"hammer-curl": {
		focus: "Biceps and brachialis. Palms face each other.",
		setup: "Bells at your sides, thumbs up.",
		steps: [
			"Curl without twisting the palms.",
			"Stop near the shoulders.",
			"Lower until the arms are straight."
		],
		example: "10 reps with 20 lb bells.",
		miss: "Elbows drifting forward and the shoulders taking over."
	},
	"db-curl": {
		focus: "Biceps.",
		setup: "Bells at your sides, palms forward.",
		steps: [
			"Curl one or both bells toward the shoulders.",
			"Keep the upper arms still.",
			"Lower all the way."
		],
		example: "10 reps with 15 lb bells.",
		miss: "Rocking the torso."
	},
	"chest-fly": {
		focus: "Chest stretch and squeeze, lighter than a press.",
		setup: "Lie on a bench, bells over the chest, elbows softly bent.",
		steps: [
			"Open the arms until you feel a stretch across the chest.",
			"The bend in the elbows stays the same.",
			"Bring the bells back together over the chest."
		],
		example: "10 reps with 15 lb bells.",
		miss: "Straightening the arms and turning it into a press with no control."
	},
	"farmer-carry": {
		focus: "Grip, trunk, and posture under load.",
		setup: "A heavy bell in each hand. Stand tall before you walk.",
		steps: [
			"Walk in short, even steps.",
			"Shoulders down, ribs stacked over the hips.",
			"Set the bells down instead of dropping them."
		],
		example: "40 steps with 40 lb bells.",
		miss: "Leaning to one side or shrugging the whole way."
	},
	"kb-clean": {
		focus: "A kettlebell swing that finishes in the rack.",
		setup: "One bell, hike it between the legs.",
		steps: [
			"Hinge and snap the hips.",
			"Keep the bell close and punch the hand through so it lands on the forearm.",
			"Catch it in the rack: bell on the shoulder, elbow in, wrist straight."
		],
		example: "6 cleans each side with a 35 lb bell.",
		miss: "Curling it onto the shoulder and banging the wrist."
	},
	"turkish-get-up": {
		focus: "Getting from the floor to standing with a weight locked overhead.",
		setup: "Lie on your back, bell pressed up with a straight arm. Same-side knee bent.",
		steps: [
			"Roll to the elbow, then the hand, eyes on the bell.",
			"Sweep the straight leg under and come to a kneel.",
			"Stand up. Reverse the steps to lie back down. The arm never bends."
		],
		example: "3 each side with a 25 lb bell.",
		miss: "Looking away from the bell and letting the arm drift."
	},
	"lat-pulldown": {
		focus: "Lats.",
		setup: "Sit tall, grip a little wider than the shoulders, thighs locked under the pads.",
		steps: [
			"Pull the bar to the upper chest.",
			"Elbows drive down and slightly back.",
			"Let the bar rise until the arms are straight, without shrugging at the top."
		],
		example: "10 reps at 80 lb.",
		miss: "Leaning way back and yanking with the arms."
	},
	"seated-row": {
		focus: "Mid-back.",
		setup: "Sit tall at a cable row, chest up, knees soft.",
		steps: [
			"Pull the handle to the lower ribs.",
			"Squeeze the shoulder blades, then reach forward.",
			"The torso stays mostly still."
		],
		example: "10 reps at 70 lb.",
		miss: "Rocking back and forth to move the stack."
	},
	"leg-press": {
		focus: "Quads and glutes, back supported.",
		setup: "Feet about shoulder-width on the platform, low enough that the knees can bend.",
		steps: [
			"Lower until the knees are around 90 degrees, low back still on the pad.",
			"Press the platform away without locking the knees hard.",
			"Do not let the hips tuck off the seat."
		],
		example: "10 reps at 180 lb.",
		miss: "Going so deep the low back rounds off the pad."
	},
	"leg-curl": {
		focus: "Hamstrings.",
		setup: "Lying or seated curl. Pad sits just above the heels.",
		steps: [
			"Curl the pad toward your glutes.",
			"Pause, then lower until the legs are nearly straight.",
			"Hips stay down if you are lying."
		],
		example: "10 reps at 50 lb.",
		miss: "Swinging the weight with the hips."
	},
	"leg-extension": {
		focus: "Quads.",
		setup: "Pad across the lower shins. Knees lined up with the machine's pivot.",
		steps: [
			"Straighten the legs.",
			"Squeeze at the top without throwing the weight.",
			"Lower until the knees are bent again."
		],
		example: "12 reps at 60 lb.",
		miss: "Kicking so hard the pad bounces."
	},
	"calf-raise": {
		focus: "Calves.",
		setup: "Balls of the feet on a step or the machine platform. Legs straight.",
		steps: [
			"Drop the heels for a stretch.",
			"Rise as high as you can.",
			"Pause at the top, then lower."
		],
		example: "12 reps at bodyweight, or 80 lb on the machine.",
		miss: "Bouncing through a tiny range."
	},
	"face-pull": {
		focus: "Rear shoulders and the muscles that hold the shoulder blades down.",
		setup: "Cable at face height, rope attachment.",
		steps: [
			"Pull the rope toward your face, hands ending beside the ears.",
			"Elbows stay high.",
			"Squeeze, then let the arms straighten."
		],
		example: "12 reps at 30 lb.",
		miss: "Turning it into a low row to the stomach."
	},
	"tricep-pushdown": {
		focus: "Triceps.",
		setup: "Cable high. Elbows pinned to your sides.",
		steps: [
			"Push the handle down until the arms are straight.",
			"The elbows do not travel forward.",
			"Let it rise until the forearms are about parallel to the floor."
		],
		example: "12 reps at 40 lb.",
		miss: "Leaning over the stack and pushing with the shoulders."
	},
	"cable-fly": {
		focus: "Chest, with a constant pull from the cables.",
		setup: "Cables set a little below the shoulders, one handle in each hand. Soft elbows.",
		steps: [
			"Bring the hands together in front of the chest.",
			"Open back until you feel a stretch.",
			"The elbow bend stays the same."
		],
		example: "12 reps at 15 lb a side.",
		miss: "Pressing with straight arms and a lot of shoulder."
	},
	"chest-press": {
		focus: "Chest, on a machine so the path is fixed.",
		setup: "Seat set so the handles line up with the mid-chest. Feet flat.",
		steps: [
			"Press until the arms are straight, not locked hard.",
			"Lower until the elbows are about even with the torso.",
			"Shoulders stay down."
		],
		example: "10 reps at 70 lb.",
		miss: "Shoulders shrugged up by the ears."
	},
	"pull-up": {
		focus: "Lats and arms. Log added weight if you use it, otherwise the reps are the work.",
		setup: "Hang from a bar, palms away, shoulders set down before you pull.",
		steps: [
			"Pull until the chin is over the bar.",
			"Lower until the arms are straight.",
			"Do not kip unless that is the version you meant to log."
		],
		example: "5 strict reps, or 5 with a 10 lb plate.",
		miss: "Half reps that stop with the elbows still bent at the bottom."
	},
	"chin-up": {
		focus: "Lats and biceps. Palms face you.",
		setup: "Hang with a shoulder-width underhand grip.",
		steps: [
			"Pull the chest toward the bar.",
			"Chin clears the bar.",
			"Lower to a straight-arm hang."
		],
		example: "6 strict reps.",
		miss: "Curling the chin over with a swing."
	},
	dip: {
		focus: "Chest and triceps.",
		setup: "Hands on parallel bars or a bench. Shoulders down.",
		steps: [
			"Lower until the upper arms are about parallel to the floor.",
			"Press back up until the arms are straight.",
			"Lean a little forward for chest, more upright for triceps."
		],
		example: "8 bodyweight reps, or 8 with a 10 lb bell between the feet.",
		miss: "Shrugging and sinking the shoulders toward the ears."
	},
	"push-up": {
		focus: "Chest, shoulders, and core.",
		setup: "Hands under the shoulders, body in one line from head to heels.",
		steps: [
			"Lower the chest until it nearly touches the floor.",
			"Elbows stay at about 45 degrees, not flared straight out.",
			"Press the floor away and finish tall."
		],
		example: "10 reps from the toes, hips not sagging.",
		miss: "Hips piked up or dropped, so the chest never really moves."
	},
	plank: {
		focus: "Holding a straight line. Time is the work, even if the logger uses a number.",
		setup: "Forearms under the shoulders, or hands if you are on a high plank.",
		steps: [
			"Brace as if someone is about to poke your stomach.",
			"Glutes on, ribs down, neck long.",
			"Stop when the low back starts to sag."
		],
		example: "A 40-second hold with the hips level.",
		miss: "Holding a sagging back just to add seconds."
	},
	"sit-up": {
		focus: "Trunk flexion.",
		setup: "Knees bent, feet anchored if you use them. Hands at the temples, not yanking the neck.",
		steps: [
			"Curl up until the torso leaves the floor.",
			"Lower one vertebra at a time.",
			"Keep the motion smooth."
		],
		example: "15 reps.",
		miss: "Jerking the head forward with the hands."
	},
	burpee: {
		focus: "A squat, a plank, and a jump, in that order.",
		setup: "Stand tall.",
		steps: [
			"Place the hands down and jump the feet back to a plank.",
			"Optional push-up, then jump the feet back in.",
			"Stand and jump, hands overhead."
		],
		example: "8 burpees, each one including a full plank.",
		miss: "Skipping the plank and just squatting up and down."
	},
	"kettlebell-snatch": {
		focus: "One kettlebell from between the legs to overhead.",
		setup: "Bell in one hand, hike it back.",
		steps: [
			"Snap the hips. The bell stays close to the body.",
			"Punch through at the top so it lands softly on the forearm, arm straight.",
			"Lower it back down the same path."
		],
		example: "6 each side with a 25 lb bell.",
		miss: "Casting the bell out in a big arc that slams the wrist."
	},
	"single-leg-deadlift": {
		focus: "One hamstring and your balance.",
		setup: "Stand on one leg, bell in the opposite hand or both hands.",
		steps: [
			"Hinge until the torso and the free leg make a line.",
			"Soft knee on the standing leg. Hips stay square.",
			"Stand by squeezing the standing glute."
		],
		example: "6 each leg with a 25 lb bell.",
		miss: "Opening the hip and spinning the free leg out to the side."
	},
	"hack-squat": {
		focus: "Quads, back against the pad.",
		setup: "Shoulders under the pads, feet a bit low on the platform.",
		steps: [
			"Unlock and lower until the knees are around 90 degrees.",
			"Keep the low back on the pad.",
			"Press up without locking the knees violently."
		],
		example: "8 reps at 140 lb.",
		miss: "Letting the hips lift off the pad at the bottom."
	},
	"pause-squat": {
		focus: "A squat with a still pause in the bottom.",
		setup: "Same setup as your back squat or goblet squat.",
		steps: [
			"Descend under control.",
			"Stop at the bottom and stay there for a full second. No bounce.",
			"Then stand."
		],
		example: "5 reps at a weight lighter than your normal squat, with a one-second pause.",
		miss: "A tap that is not actually a pause."
	},
	"floor-press": {
		focus: "Chest and triceps, with a shorter range because the floor stops the elbows.",
		setup: "Lie on the floor, knees bent. Bells or a bar over the chest.",
		steps: [
			"Lower until the upper arms rest on the floor.",
			"Pause, then press up.",
			"Elbows stay at about 45 degrees."
		],
		example: "8 reps with 30 lb bells.",
		miss: "Bouncing the arms off the floor."
	},
	"landmine-press": {
		focus: "A one-arm press on an angled bar.",
		setup: "Bar anchored in a corner or landmine. Hold the end at one shoulder, feet staggered.",
		steps: [
			"Press the bar up and away until the arm is straight.",
			"Do not twist the torso to finish it.",
			"Lower to the shoulder."
		],
		example: "8 each side.",
		miss: "Leaning away and side-bending the press."
	},
	"sled-push": {
		focus: "Legs and lungs, driving a sled.",
		setup: "Arms long, hips about level with the shoulders, body in one line.",
		steps: [
			"Drive through the balls of the feet in short, fast steps.",
			"Do not stand upright and jog it.",
			"Stop the sled under control at the end of the lane."
		],
		example: "One 20-yard push with the sled loaded to 90 lb.",
		miss: "Standing up so the sled barely moves."
	}
};
function demoFor(movement) {
	return DEMOS[movement.id] ?? {
		focus: `${movement.name}, the way you do it in class.`,
		setup: `Set up for ${movement.name} and get still before the first rep.`,
		steps: [
			"Brace, then start from a position you could pause in.",
			"Move through the full range you can control.",
			"Stop the set when the last rep is no longer clean."
		],
		example: `A working set of ${movement.name} where you could have done about two more reps.`,
		miss: "Cutting the range short just to make the number bigger."
	};
}
function WorkoutName({ movement, className }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: (event) => {
			event.stopPropagation();
			setOpen(true);
		},
		className: className ?? "block text-left font-semibold underline decoration-line decoration-1 underline-offset-4",
		children: movement.name
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HowToSheet, {
		movement,
		open,
		onClose: () => setOpen(false)
	})] });
}
function HowToSheet({ movement, open, onClose }) {
	const demo = demoFor(movement);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
		open,
		title: movement.name,
		onClose,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted",
				children: demo.focus
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-5 text-sm font-semibold normal-case tracking-normal",
				children: "Set up"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm leading-relaxed",
				children: demo.setup
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-5 text-sm font-semibold normal-case tracking-normal",
				children: "Do it"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-2 space-y-2",
				children: demo.steps.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-3 text-sm leading-relaxed",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-6 shrink-0 place-items-center rounded-full bg-orange-soft text-xs font-semibold text-orange",
						children: index + 1
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: step })]
				}, step))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-5 text-sm font-semibold normal-case tracking-normal",
				children: "A clean example"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm leading-relaxed",
				children: demo.example
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-5 text-sm font-semibold normal-case tracking-normal",
				children: "Easy to miss"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm leading-relaxed",
				children: demo.miss
			})
		]
	});
}
function getSpeechEngine() {
	if (typeof window === "undefined") return null;
	const root = window;
	const Ctor = root.SpeechRecognition ?? root.webkitSpeechRecognition;
	return Ctor ? new Ctor() : null;
}
var EFFORTS = [
	"easy",
	"just-right",
	"hard"
];
function LogScreen() {
	const today = useTodayIso();
	const draft = useHeft((state) => state.draft);
	const movements = useHeft((state) => state.movements);
	const logs = useHeft((state) => state.logs);
	const profile = useHeft((state) => state.profile);
	const setDraft = useHeft((state) => state.setDraft);
	const upsertDraftLine = useHeft((state) => state.upsertDraftLine);
	const removeDraftLine = useHeft((state) => state.removeDraftLine);
	const applyTranscript = useHeft((state) => state.applyTranscript);
	const repeatClass = useHeft((state) => state.repeatClass);
	const saveDraft = useHeft((state) => state.saveDraft);
	const startNewLog = useHeft((state) => state.startNewLog);
	const addMovement = useHeft((state) => state.addMovement);
	const [listening, setListening] = (0, import_react.useState)(false);
	const [speechOk, setSpeechOk] = (0, import_react.useState)(false);
	const [speechNote, setSpeechNote] = (0, import_react.useState)("");
	const [voiceOpen, setVoiceOpen] = (0, import_react.useState)(false);
	const [dateOpen, setDateOpen] = (0, import_react.useState)(false);
	const [newName, setNewName] = (0, import_react.useState)("");
	const [query, setQuery] = (0, import_react.useState)("");
	const visible = movements.filter((movement) => exerciseHit(movement, query));
	const more = libraryMatches(query, movements);
	const engine = (0, import_react.useRef)(null);
	const field = (0, import_react.useRef)(null);
	const heard = (0, import_react.useRef)("");
	(0, import_react.useEffect)(() => {
		setSpeechOk(getSpeechEngine() != null);
		return () => engine.current?.stop();
	}, []);
	const callout = contextCallout(draft.lines, movements);
	const readyCount = draft.lines.filter((line) => line.value > 0).length;
	const previous = lastClass(logs, draft.classKind);
	const saved = draft.savedTick > 0;
	const liveToday = today || todayIso();
	const savedBurn = workoutBurns(logs, profile).find((burn) => burn.date === draft.date && burn.classKind === draft.classKind);
	function toggleMic() {
		if (!speechOk) {
			setSpeechNote("This browser can't use the mic. Type the class instead.");
			field.current?.focus();
			return;
		}
		if (listening) {
			engine.current?.stop();
			setListening(false);
			return;
		}
		const next = getSpeechEngine();
		if (!next) return;
		next.lang = "en-US";
		next.continuous = true;
		next.interimResults = true;
		next.onresult = (event) => {
			let text = "";
			let latestFinal = false;
			for (let i = 0; i < event.results.length; i += 1) {
				const chunk = event.results[i];
				text += `${chunk?.[0]?.transcript ?? ""} `;
				if (i === event.results.length - 1 && chunk?.isFinal) latestFinal = true;
			}
			const cleaned = text.replace(/\s+/g, " ").trim();
			if (!cleaned) return;
			heard.current = cleaned;
			setDraft({
				transcript: cleaned,
				error: void 0
			});
			if (latestFinal) applyTranscript(cleaned);
		};
		next.onerror = (event) => {
			setListening(false);
			if (event?.error === "aborted" || event?.error === "no-speech") return;
			setSpeechNote("The mic didn't catch that. You can type it.");
		};
		next.onend = () => {
			setListening(false);
			if (heard.current) applyTranscript(heard.current);
		};
		engine.current = next;
		setSpeechNote("");
		next.start();
		setListening(true);
	}
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
			order: movements.length
		});
		setNewName("");
		window.setTimeout(() => document.getElementById(`lift-${id}`)?.focus(), 0);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold tracking-widest text-muted",
				suppressHydrationWarning: true,
				children: formatToday(parseDay(draft.date))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setDateOpen((open) => !open),
				className: "text-sm font-semibold text-orange",
				children: dateOpen ? "Hide date" : "Change date"
			})]
		}),
		dateOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			id: "class-date",
			type: "date",
			"aria-label": "Class date",
			value: draft.date,
			onChange: (event) => {
				if (!event.target.value) return;
				setDraft({
					date: event.target.value,
					datePinned: true
				});
			},
			className: "mt-2 w-full rounded-2xl border border-line bg-card px-4 py-3 text-base"
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-1 flex items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-balance",
				children: "Log class"
			}), draft.date !== liveToday || draft.lines.length > 0 || saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => startNewLog(liveToday),
				className: "mb-1 shrink-0 text-sm font-semibold text-orange",
				children: draft.date === liveToday ? "Clear" : "Use today"
			}) : null]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted",
			children: "Tap how each lift felt. Only those get saved."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindToggle, {
				value: draft.classKind,
				onChange: (classKind) => setDraft({ classKind })
			})
		}),
		previous.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => repeatClass(previous),
			className: "capsule-quiet mt-3 h-11 w-full text-sm",
			children: [
				"Repeat last ",
				draft.classKind,
				" class"
			]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => setVoiceOpen((open) => !open),
			className: "mt-3 text-sm font-semibold text-orange",
			children: voiceOpen ? "Hide voice log" : "Say it instead"
		}),
		voiceOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "block text-sm font-semibold",
					htmlFor: "transcript",
					children: "What you said"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					id: "transcript",
					ref: field,
					value: draft.transcript,
					onChange: (event) => setDraft({
						transcript: event.target.value,
						error: void 0
					}),
					placeholder: "Deadlift 115, pretty tough. Goblet squats 35, easy.",
					className: "mt-1 min-h-28 w-full resize-none rounded-2xl border border-line bg-card px-4 py-3 text-base leading-relaxed"
				}),
				draft.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-orange",
					children: draft.error
				}) : null,
				speechNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: speechNote
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: toggleMic,
						className: cn("flex h-12 items-center justify-center gap-2 rounded-full text-sm font-semibold", listening ? "capsule capsule-hot" : "capsule-quiet"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, {
							className: "size-4",
							"aria-hidden": "true"
						}), listening ? "Listening" : "Speak"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => applyTranscript(draft.transcript),
						disabled: draft.transcript.trim().length === 0,
						className: "capsule h-12 text-sm disabled:opacity-40",
						children: "Fill the list"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setDraft({
							transcript: SAMPLE_TRANSCRIPT,
							error: void 0
						});
						applyTranscript(SAMPLE_TRANSCRIPT);
					},
					className: "mt-3 text-sm font-semibold text-muted",
					children: "Try an example sentence"
				})
			]
		}) : null,
		draft.transcript && !voiceOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-3 text-sm leading-relaxed text-muted",
			children: [
				"\"",
				draft.transcript,
				"\""
			]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "mt-4 flex h-11 items-center gap-2 rounded-full border border-line bg-card px-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
				className: "size-4 shrink-0 text-muted",
				"aria-hidden": "true"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: query,
				onChange: (event) => setQuery(event.target.value),
				placeholder: "Search exercises",
				"aria-label": "Search exercises",
				className: "w-full bg-transparent text-base outline-none"
			})]
		}),
		visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm text-muted",
			children: query.trim() ? "Nothing in your list matches." : "No exercises yet."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 divide-y divide-line rounded-3xl border border-line bg-card px-4",
			children: visible.map((movement) => {
				const line = draft.lines.find((item) => item.movementId === movement.id);
				const suggested = lastValue(logs, movement.id, draft.classKind);
				const shown = line?.value || suggested || 0;
				const unit = unitWord(movement);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkoutName, { movement }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "shrink-0 text-sm text-muted",
								children: line && line.value > 0 ? "In this class" : suggested ? `Last ${suggested} ${unit}` : "New"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": `Decrease ${movement.name}`,
									onClick: () => {
										const next = Math.max(0, shown - movement.increment);
										if (next <= 0) removeDraftLine(movement.id);
										else upsertDraftLine(movement.id, {
											value: next,
											effort: line?.effort ?? "just-right"
										});
									},
									className: "flex size-11 items-center justify-center rounded-xl bg-just-soft",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, {
										className: "size-4",
										"aria-hidden": "true"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: `lift-${movement.id}`,
									"aria-label": `${movement.name} weight`,
									inputMode: "numeric",
									value: line ? line.value || "" : suggested ?? "",
									placeholder: "0",
									onChange: (event) => {
										const value = Number(event.target.value.replace(/[^\d]/g, ""));
										if (value <= 0) removeDraftLine(movement.id);
										else upsertDraftLine(movement.id, {
											value,
											effort: line?.effort ?? "just-right"
										});
									},
									className: cn("h-11 w-20 rounded-xl border border-line bg-paper text-center text-lg font-semibold tabular-nums", line && line.value > 0 ? "text-ink" : "text-muted")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-semibold text-muted",
									children: unit
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": `Increase ${movement.name}`,
									onClick: () => upsertDraftLine(movement.id, {
										value: shown + movement.increment,
										effort: line?.effort ?? "just-right"
									}),
									className: "flex size-11 items-center justify-center rounded-xl bg-just-soft",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
										className: "size-4",
										"aria-hidden": "true"
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 grid grid-cols-3 gap-1 rounded-xl bg-just-soft p-1",
							children: EFFORTS.map((effort) => {
								const active = Boolean(line && line.value > 0 && line.effort === effort);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										if (active) {
											removeDraftLine(movement.id);
											return;
										}
										const value = line?.value || suggested || 0;
										if (value <= 0) {
											document.getElementById(`lift-${movement.id}`)?.focus();
											return;
										}
										upsertDraftLine(movement.id, {
											effort,
											value
										});
									},
									className: cn("h-11 rounded-lg text-sm font-semibold", active ? effort === "easy" ? "bg-coral text-on-orange" : effort === "hard" ? "bg-navy text-on-navy" : "bg-just text-ink" : "text-ink"),
									children: effortLabel(effort)
								}, effort);
							})
						}),
						line?.context ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted",
							children: ["Context: ", CONTEXTS$1[line.context].chip]
						}) : null
					]
				}, movement.id);
			})
		}),
		more.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 divide-y divide-line rounded-3xl border border-line bg-card px-4",
			children: more.map((movement) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center justify-between gap-3 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkoutName, { movement }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted",
						children: "In the exercise library"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						addMovement({
							...movement,
							order: movements.length + movement.order
						});
						upsertDraftLine(movement.id, {
							value: 0,
							effort: "just-right"
						});
					},
					className: "capsule-quiet h-9 px-4 text-xs",
					children: "Add"
				})]
			}, movement.id))
		}) : null,
		callout ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm leading-relaxed text-muted",
			children: callout
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mt-4 flex gap-2",
			onSubmit: (event) => {
				event.preventDefault();
				addNamedMovement();
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: newName,
				onChange: (event) => setNewName(event.target.value),
				placeholder: "Add a movement",
				"aria-label": "New movement name",
				className: "min-w-0 flex-1 rounded-xl border border-line bg-card px-3 py-3 text-base"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "submit",
				className: "rounded-xl bg-card px-4 text-sm font-semibold shadow-sm",
				children: "Add"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky bottom-0 -mx-5 mt-4 border-t border-line bg-paper px-5 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: saveDraft,
				disabled: readyCount === 0,
				className: "capsule flex h-12 w-full items-center justify-center gap-2 text-sm disabled:opacity-40",
				children: [saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
					className: "size-4",
					"aria-hidden": "true"
				}) : null, saved ? "Saved" : readyCount > 0 ? `Save ${readyCount}` : "Save class"]
			}), saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-center text-sm text-muted",
				children: savedBurn ? `About ${savedBurn.kcal} kcal. Saved for today.` : "Saved for today."
			}) : null]
		})
	] });
}
function KindToggle({ value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-2 rounded-2xl bg-just-soft p-1",
		children: ["strength", "cardio"].map((kind) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onChange(kind),
			className: cn("h-11 rounded-xl text-sm font-semibold capitalize", value === kind ? "bg-card text-ink shadow-sm" : "text-muted"),
			children: kind
		}, kind))
	});
}
var DAYS = [
	{
		title: "Easy strength",
		classKind: "strength",
		focus: [
			"goblet-squat",
			"kettlebell-swing",
			"reverse-lunge",
			"db-bench-press"
		]
	},
	{
		title: "Lower strength",
		classKind: "strength",
		focus: [
			"deadlift",
			"goblet-squat",
			"reverse-lunge",
			"box-jump"
		]
	},
	{
		title: "Cardio circuit",
		classKind: "cardio",
		focus: [
			"kettlebell-swing",
			"thrusters",
			"box-jump",
			"goblet-squat"
		]
	},
	{
		title: "Upper strength",
		classKind: "strength",
		focus: [
			"db-bench-press",
			"renegade-row",
			"thrusters",
			"kettlebell-swing"
		]
	},
	{
		title: "Engine day",
		classKind: "cardio",
		focus: [
			"thrusters",
			"box-jump",
			"kettlebell-swing",
			"deadlift"
		]
	},
	{
		title: "Full body",
		classKind: "strength",
		focus: [
			"deadlift",
			"goblet-squat",
			"db-bench-press",
			"renegade-row"
		]
	},
	{
		title: "Saturday mix",
		classKind: "cardio",
		focus: [
			"kettlebell-swing",
			"thrusters",
			"reverse-lunge",
			"box-jump"
		]
	}
];
var REPS = {
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
	"db-bench-press": 10
};
var RATIO = {
	deadlift: .55,
	"goblet-squat": .16,
	"db-bench-press": .14,
	"renegade-row": .1,
	thrusters: .12,
	"reverse-lunge": .12,
	"kettlebell-swing": .16
};
var FALLBACK = {
	deadlift: 95,
	"goblet-squat": 25,
	"db-bench-press": 25,
	"renegade-row": 15,
	thrusters: 20,
	"reverse-lunge": 20,
	"kettlebell-swing": 25,
	"box-jump": 20
};
function snap(value, increment) {
	const step = increment > 0 ? increment : 5;
	return Math.max(step, Math.round(value / step) * step);
}
function findMovement(id, owned) {
	return owned.find((movement) => movement.id === id) ?? EXERCISE_LIBRARY.find((movement) => movement.id === id);
}
function starterLoad(movement, profile) {
	if (movement.unit === "in") return movement.id === "box-jump" ? 20 : 16;
	const body = profile.weightLb != null && profile.weightLb >= 70 ? profile.weightLb : null;
	const ratio = RATIO[movement.id];
	if (body && ratio) return snap(body * ratio, movement.increment);
	return snap(FALLBACK[movement.id] ?? 20, movement.increment);
}
function plannedWeight(movement, logs, classKind, profile) {
	const suggestion = suggestionForKind(movement, logs, classKind);
	if (suggestion) return suggestion.to;
	const series = logsFor(logs, movement.id, classKind).filter((log) => !log.setAside);
	const last = series[series.length - 1];
	if (last) {
		if (last.effort === "easy") return last.value + movement.increment;
		if (last.effort === "hard" && !last.context) return Math.max(movement.increment, last.value - movement.increment);
		return last.value;
	}
	const otherKind = classKind === "strength" ? "cardio" : "strength";
	const other = logsFor(logs, movement.id, otherKind).filter((log) => !log.setAside);
	const borrowed = other[other.length - 1];
	if (borrowed) return borrowed.value;
	return starterLoad(movement, profile);
}
function share(total, loads) {
	if (total == null) return loads.map(() => null);
	if (loads.length === 0) return [];
	const sum = loads.reduce((acc, load) => acc + load, 0) || 1;
	const parts = loads.map((load) => Math.round(total * load / sum / 10) * 10);
	const drift = total - parts.reduce((acc, part) => acc + part, 0);
	parts[parts.length - 1] = Math.max(0, (parts[parts.length - 1] ?? 0) + drift);
	return parts;
}
function recommendDay(input) {
	const plan = DAYS[parseDay(input.day).getDay()] ?? DAYS[1];
	const minutes = Math.min(180, Math.max(15, input.profile.classMinutes || 45));
	const logged = new Set(input.logs.filter((log) => log.date === input.day && log.classKind === plan.classKind && !log.setAside && log.value > 0).map((log) => log.movementId));
	const chosen = plan.focus.map((id) => findMovement(id, input.movements)).filter((movement) => Boolean(movement)).slice(0, 4);
	const weights = chosen.map((movement) => plannedWeight(movement, input.logs, plan.classKind, input.profile));
	const reps = chosen.map((movement) => REPS[movement.id] ?? 10);
	const total = projectClassKcal(input.profile, plan.classKind);
	const kcal = share(total, weights.map((weight, index) => Math.max(1, weight * (reps[index] ?? 10))));
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
			logged: logged.has(movement.id)
		}))
	};
}
function TodayScreen({ onOpen, onLog }) {
	const day = useTodayIso();
	const movements = useHeft((state) => state.movements);
	const addMovement = useHeft((state) => state.addMovement);
	const logs = useHeft((state) => state.logs);
	const goals = useHeft((state) => state.goals);
	const profile = useHeft((state) => state.profile);
	const logRecommended = useHeft((state) => state.logRecommended);
	const skipRecommended = useHeft((state) => state.skipRecommended);
	const skipped = useHeft((state) => state.skipped);
	const [query, setQuery] = (0, import_react.useState)("");
	const ready = readyList(movements, logs);
	const readyIds = new Set(ready.map((item) => item.movement.id));
	const q = query.trim();
	const rows = movements.filter((movement) => q ? exerciseHit(movement, q) : !readyIds.has(movement.id)).slice().sort((a, b) => a.order - b.order);
	const more = libraryMatches(q, movements);
	const todayKcal = workoutBurns(logs, profile).filter((burn) => burn.date === day).reduce((sum, burn) => sum + burn.kcal, 0);
	const plan = recommendDay({
		day,
		movements,
		logs,
		profile
	});
	const hidden = new Set(skipped?.date === day ? skipped.ids : []);
	const lifts = plan.lifts.filter((lift) => !hidden.has(lift.movementId));
	const listedKcal = lifts.reduce((sum, lift) => sum + (lift.kcal ?? 0), 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Starburst, { className: "size-4 text-navy" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold tracking-[0.22em] text-muted uppercase",
				suppressHydrationWarning: true,
				children: formatToday(parseDay(day))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-3 text-balance",
			children: "Welcome to Astro"
		}),
		todayKcal > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-sm text-muted",
			children: [
				"About ",
				todayKcal.toLocaleString(),
				" kcal today"
			]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6 rounded-3xl border border-line bg-card px-4 pt-4 pb-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] font-semibold tracking-[0.18em] text-muted uppercase",
					children: "Recommended"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 text-base",
					children: plan.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						lifts.some((lift) => lift.kcal != null) ? `About ${listedKcal.toLocaleString()} kcal` : "Add weight for kcal",
						" ·",
						" ",
						plan.minutes,
						" min · just right"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 divide-y divide-line",
					children: lifts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "py-4 text-sm text-muted",
						children: "Cleared for today. Tomorrow starts a new list."
					}) : lifts.map((lift) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-2 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkoutName, { movement: {
									id: lift.movementId,
									name: lift.name
								} }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mt-0.5 block text-sm text-muted tabular-nums",
									children: [
										lift.weight,
										" ",
										lift.unit,
										" · ",
										lift.reps,
										" reps · ",
										lift.kcal != null ? `~${lift.kcal} kcal` : "— kcal"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": lift.logged ? `${lift.name} approved` : `Approve ${lift.name}`,
								"aria-pressed": lift.logged,
								disabled: lift.logged,
								onClick: () => logRecommended(day, plan.classKind, [{
									movementId: lift.movementId,
									value: lift.weight,
									reps: lift.reps
								}]),
								className: lift.logged ? "grid size-11 shrink-0 place-items-center rounded-full bg-[#148a45] text-white" : "grid size-11 shrink-0 place-items-center rounded-full border-2 border-[#148a45] text-[#148a45]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
									className: "size-5",
									strokeWidth: 2.5,
									"aria-hidden": "true"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": `Remove ${lift.name}`,
								onClick: () => skipRecommended(day, lift.movementId),
								className: "grid size-11 shrink-0 place-items-center rounded-full border-2 border-[#d61f3c] text-[#d61f3c]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
									className: "size-5",
									strokeWidth: 2.5,
									"aria-hidden": "true"
								})
							})
						]
					}, lift.movementId))
				})
			]
		}),
		ready.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative mt-8 overflow-hidden rounded-3xl border border-line bg-hero p-4 text-on-hero",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanetScene, { className: "pointer-events-none absolute -top-2 -right-4 h-24 w-32" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mb-3 flex items-center gap-2 pr-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, {
						className: "size-4 text-orange",
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base",
						children: "Ready to go up"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative space-y-2",
					children: ready.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex w-full items-center justify-between gap-3 rounded-2xl bg-hero-raise px-4 py-3 text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkoutName, {
								movement: item.movement,
								className: "block text-left font-semibold underline decoration-hero-line decoration-1 underline-offset-4"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => onOpen(item.movement.id, item.classKind),
								className: "mt-0.5 block text-left text-sm text-hero-muted",
								children: [
									"Easy ",
									item.streak,
									" ",
									item.classKind,
									" ",
									item.streak === 1 ? "class" : "classes",
									" in a row"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => onOpen(item.movement.id, item.classKind),
							className: "shrink-0 text-right tabular-nums",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-hero-muted",
									children: item.from
								}),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xl font-bold text-navy",
									children: item.to
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm font-semibold text-navy",
									children: [" ", item.movement.unit === "in" ? "in" : "lb"]
								})
							]
						})]
					}, `${item.movement.id}-${item.classKind}`))
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative mt-8 overflow-hidden rounded-3xl border border-line bg-hero p-5 text-on-hero",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanetScene, { className: "pointer-events-none absolute -top-1 -right-6 h-32 w-40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 pr-28",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, {
							className: "size-4 text-orange",
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base",
							children: logs.length === 0 ? "Nothing logged yet" : "Nothing ready to go up"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-[16rem] text-sm leading-relaxed text-hero-muted",
						children: logs.length === 0 ? "Log today's class. Two easy days at the same lift, and the next weight shows up here." : "Two easy classes at the same lift and the next weight will land here."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onLog,
						className: "capsule mt-5 h-12 w-full text-sm",
						children: "Log today"
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-end gap-3 px-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "min-w-0 flex-1 text-base",
							children: "Your weights"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-24 shrink-0 whitespace-nowrap text-right text-[10px] font-semibold tracking-[0.14em] text-muted",
							children: "STRENGTH"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-24 shrink-0 whitespace-nowrap text-right text-[10px] font-semibold tracking-[0.14em] text-muted",
							children: "CARDIO"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mb-3 flex h-11 items-center gap-2 rounded-full border border-line bg-card px-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
						className: "size-4 shrink-0 text-muted",
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: query,
						onChange: (event) => setQuery(event.target.value),
						placeholder: "Search exercises",
						"aria-label": "Search exercises",
						className: "w-full bg-transparent text-base outline-none"
					})]
				}),
				rows.length === 0 && more.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-3xl border border-line bg-card px-4 py-6 text-sm text-muted",
					children: q ? "Nothing matches that." : "Every lift is ready to go up."
				}) : rows.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-line rounded-3xl border border-line bg-card px-4",
					children: rows.map((movement) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkoutName, { movement }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => onOpen(movement.id, "strength"),
									className: "mt-0.5 block text-left text-sm text-muted",
									children: weightSubtitle(movement, logs, goals)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => onOpen(movement.id, "strength"),
								className: "w-24 shrink-0 text-right text-xl font-semibold tabular-nums",
								children: displayLoad(movement, logs, "strength")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => onOpen(movement.id, "cardio"),
								className: "w-24 shrink-0 text-right text-xl font-semibold tabular-nums",
								children: displayLoad(movement, logs, "cardio")
							})
						]
					}, movement.id))
				}) : null,
				more.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 divide-y divide-line rounded-3xl border border-line bg-card px-4",
					children: more.map((movement) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkoutName, { movement }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-muted",
								children: "In the exercise library"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => addMovement({
								...movement,
								order: movements.length + movement.order
							}),
							className: "capsule-quiet h-9 px-4 text-xs",
							children: "Add"
						})]
					}, movement.id))
				}) : null
			]
		})
	] });
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var loadHeft = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("699dade32ccc22329c95f3788146ed33ba10a4729266514cb638978ac991ccfb"));
var saveHeft = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => {
	const snapshot = sanitizeSnapshot(input);
	if (!snapshot) throw new Error("Invalid workout data");
	if (snapshotBytes(snapshot) > 4e5) throw new Error("Workout data is too large");
	return snapshot;
}).handler(createSsrRpc("5d3f9ff659c52341b1193377006f88997f24af1917bd52a051c3042f64dcf1c8"));
var GUEST_KEY = "astro-guest-snapshot";
var activeUser = null;
var stopSave = null;
var ticket = 0;
function captureGuest() {
	try {
		const existing = sessionStorage.getItem(GUEST_KEY);
		if (existing) {
			const parsed = JSON.parse(existing);
			if (parsed && Array.isArray(parsed.logs) && parsed.profile) return parsed;
		}
	} catch {}
	const snap = readSnapshot();
	try {
		sessionStorage.setItem(GUEST_KEY, JSON.stringify(snap));
	} catch {}
	return snap;
}
function catchUpToday() {
	useHeft.getState().rollDraftTo(todayIso(), true);
	window.dispatchEvent(new Event("heft-today"));
}
function clearGuest() {
	try {
		sessionStorage.removeItem(GUEST_KEY);
	} catch {}
}
function watchSaves() {
	let timer = 0;
	const flush = () => {
		window.clearTimeout(timer);
		saveHeft({ data: readSnapshot() }).catch(() => {});
	};
	const unsub = useHeft.subscribe(() => {
		window.clearTimeout(timer);
		timer = window.setTimeout(flush, 600);
	});
	window.addEventListener("pagehide", flush);
	return () => {
		unsub();
		window.clearTimeout(timer);
		window.removeEventListener("pagehide", flush);
	};
}
function useAccountSync() {
	const { user, isPending } = useCurrentUserState();
	const userId = user?.id ?? null;
	(0, import_react.useEffect)(() => {
		if (isPending) return;
		const mine = ++ticket;
		if (!userId) {
			stopSave?.();
			stopSave = null;
			activeUser = null;
			try {
				const raw = sessionStorage.getItem(GUEST_KEY);
				if (raw) {
					const guest = JSON.parse(raw);
					if (guest && Array.isArray(guest.movements)) useHeft.getState().hydrate(guest);
					clearGuest();
				}
			} catch {
				clearGuest();
			}
			catchUpToday();
			return;
		}
		if (activeUser === userId && stopSave) return;
		stopSave?.();
		stopSave = null;
		activeUser = userId;
		(async () => {
			await useHeft.persist.rehydrate();
			if (mine !== ticket) return;
			const guest = captureGuest();
			let remote = null;
			try {
				remote = await loadHeft();
			} catch {
				if (mine === ticket) catchUpToday();
				return;
			}
			if (mine !== ticket) return;
			if (remote) useHeft.getState().hydrate(remote);
			else await saveHeft({ data: guest }).catch(() => {});
			if (mine !== ticket) return;
			stopSave = watchSaves();
			catchUpToday();
		})();
	}, [userId, isPending]);
}
var TABS = [
	{
		id: "today",
		label: "Today",
		icon: Sun
	},
	{
		id: "log",
		label: "Log",
		icon: Mic
	},
	{
		id: "account",
		label: "Account",
		icon: UserRound
	},
	{
		id: "history",
		label: "History",
		icon: ChartColumn
	},
	{
		id: "goals",
		label: "Goals",
		icon: Target
	}
];
function Shell() {
	const [tab, setTab] = (0, import_react.useState)("today");
	const [confirmClear, setConfirmClear] = (0, import_react.useState)(false);
	const day = useTodayIso();
	const movements = useHeft((state) => state.movements);
	const logs = useHeft((state) => state.logs);
	const setHistoryMovement = useHeft((state) => state.setHistoryMovement);
	const setHistoryFilter = useHeft((state) => state.setHistoryFilter);
	const clearLogs = useHeft((state) => state.clearLogs);
	const rollDraftTo = useHeft((state) => state.rollDraftTo);
	const ready = readyList(movements, logs);
	const dark = useDarkTheme();
	useAccountSync();
	(0, import_react.useEffect)(() => {
		let cancel = false;
		Promise.resolve(useHeft.persist.rehydrate()).then(() => {
			if (!cancel) useHeft.getState().rollDraftTo(todayIso(), true);
		});
		return () => {
			cancel = true;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		rollDraftTo(day, true);
	}, [day, rollDraftTo]);
	function openHistory(movementId, filter) {
		setHistoryMovement(movementId);
		setHistoryFilter(filter);
		setTab("history");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-dvh overflow-hidden bg-paper font-sans text-ink",
		children: [dark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NightSky, {}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 isolate mx-auto flex h-full w-full max-w-3xl flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-30 flex shrink-0 items-center justify-end gap-2 px-4 pt-3 pb-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthCorner, {})]
				}),
				dark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "sky-lane relative z-20 shrink-0 lg:hidden",
					"aria-hidden": "true"
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-h-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "hidden w-72 shrink-0 flex-col justify-between border-r border-line bg-card px-8 py-8 text-ink shadow-[8px_0_28px_-18px_rgba(8,122,136,0.55)] lg:flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanetScene, { className: "h-28 w-44" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 font-display text-3xl tracking-[0.28em]",
								children: "HEFT"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-6 text-xl text-balance",
								children: "Know what to pick up before class."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-base leading-relaxed text-pretty text-muted",
								children: "Say how the lifts felt on the way home. Heft keeps what was easy, sets aside the night that wasn't, and has the cheat sheet ready in the morning."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold leading-relaxed text-orange",
							children: readySentence(ready)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								if (!confirmClear) {
									setConfirmClear(true);
									return;
								}
								clearLogs();
								setConfirmClear(false);
								setTab("today");
							},
							className: "mt-4 text-sm font-semibold text-muted",
							children: confirmClear ? "Tap again to clear logs" : "Clear logs"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex h-full min-h-0 w-full max-w-md flex-col lg:mx-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
							className: "flex-1 overflow-y-auto px-5 pt-3 pb-8",
							children: [
								tab === "today" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TodayScreen, {
									onOpen: openHistory,
									onLog: () => setTab("log")
								}) : null,
								tab === "log" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogScreen, {}) : null,
								tab === "account" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountScreen, {}) : null,
								tab === "history" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryScreen, {}) : null,
								tab === "goals" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoalsScreen, {}) : null
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "grid shrink-0 grid-cols-5 border-t border-line bg-card shadow-[inset_0_2px_0_#12b4c4]",
							"aria-label": "Sections",
							children: TABS.map((item) => {
								const Icon = item.icon;
								const active = tab === item.id;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									"aria-current": active ? "page" : void 0,
									onClick: () => setTab(item.id),
									className: "relative flex flex-col items-center gap-1 px-0.5 pt-3 pb-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute inset-x-1.5 top-0 h-[3px] rounded-full", active ? "bg-coral shadow-[0_0_10px_2px_rgba(8,122,136,0.75)]" : "bg-transparent") }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
											className: cn("size-4", active ? "text-orange" : "text-muted"),
											strokeWidth: 1.75,
											"aria-hidden": "true"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("text-[10px] font-semibold tracking-[0.04em] uppercase", active ? "text-orange" : "text-muted"),
											children: item.label
										})
									]
								}, item.id);
							})
						})]
					})]
				})
			]
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {});
}
//#endregion
export { Home as component };
