import { n as createMiddleware } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/snapshot-Brvgqk_Z.js
/**
* Auth middleware for server functions — the standard way to get the caller's
* verified user id. When deployed the session cookie is same-origin and rides
* along automatically. In the live preview the client also forwards the bearer
* token (partitioned cookies) via the `.client` hook below — call sites do not
* thread it themselves.
*
*   import { createServerFn } from "@tanstack/react-start";
*   import { getSql } from "@/lib/db";
*   import { authMiddleware } from "@/lib/auth/middleware";
*
*   export const listTodos = createServerFn({ method: "GET" })
*     .middleware([authMiddleware])
*     .handler(async ({ context }) => {
*       const sql = await getSql();
*       return sql`select * from todos where user_id = ${context.userId}`;
*     });
*
* Signed out with auth on (live preview included) -> throws `UnauthorizedError`
* (see `verify.server.ts`). With auth disabled (`VITE_AUTH_ENABLED=false`, the
* shipped default) it resolves the shared dev user — but throws instead when a
* `DATABASE_URL` is also set, so an app without sign-in must not use this at
* all. On the auth-on path, use it on every server function that touches
* per-user data and scope every query by `context.userId`.
*/
var authMiddleware = createMiddleware({ type: "function" }).client(async ({ next }) => {
	const { getBearerToken } = await import("./client-IWHfIGH2.mjs").then((n) => n.n).then((n) => n.n);
	return next({ sendContext: { bearerToken: getBearerToken() ?? void 0 } });
}).server(async ({ next, context }) => {
	const { assertSameSiteRequest } = await import("./isolation.server-CGNg1r0B.mjs");
	const { requireUserId } = await import("./verify.server-BZPsMFR9.mjs");
	assertSameSiteRequest();
	return next({ context: { userId: await requireUserId(context.bearerToken) } });
});
var CONTEXTS$1 = {
	"poor-sleep": {
		chip: "poor sleep",
		hold: "slept badly",
		label: "Poor sleep"
	},
	wine: {
		chip: "wine",
		hold: "you had wine",
		label: "Wine"
	}
};
var SAMPLE_TRANSCRIPT = "Strength day. Goblet squats with the 35, felt easy again. Deadlift 115, pretty tough. Thrusters with the 25s, brutal, but I slept badly last night. Renegade rows 20s, solid.";
var SEEDS = [
	[
		"goblet-squat",
		"Goblet squat",
		"lb",
		5,
		[
			"goblet squats",
			"goblet squat",
			"db goblet",
			"kb goblet"
		]
	],
	[
		"kettlebell-swing",
		"Kettlebell swing",
		"lb",
		5,
		[
			"kettlebell swings",
			"kettle bell swings",
			"kb swing",
			"kb swings",
			"kettlebell swing",
			"kettle bell swing"
		]
	],
	[
		"deadlift",
		"Deadlift",
		"lb",
		5,
		[
			"deadlifts",
			"deadlift",
			"dead lifts",
			"dead lift",
			"conventional deadlift"
		]
	],
	[
		"db-bench-press",
		"DB bench press",
		"lb",
		5,
		[
			"dumbbell bench press",
			"dumbbell bench",
			"db bench press",
			"db bench",
			"bench"
		]
	],
	[
		"renegade-row",
		"Renegade row",
		"lb",
		4,
		["renegade rows", "renegade row"]
	],
	[
		"thrusters",
		"Thrusters",
		"lb",
		5,
		["thrusters", "thruster"]
	],
	[
		"reverse-lunge",
		"Reverse lunge",
		"lb",
		5,
		["reverse lunges", "reverse lunge"]
	],
	[
		"box-jump",
		"Box jump",
		"in",
		4,
		["box jumps", "box jump"]
	],
	[
		"back-squat",
		"Back squat",
		"lb",
		5,
		[
			"back squats",
			"back squat",
			"barbell squats",
			"barbell squat",
			"high bar squat",
			"low bar squat",
			"squats",
			"squat"
		]
	],
	[
		"front-squat",
		"Front squat",
		"lb",
		5,
		["front squats", "front squat"]
	],
	[
		"sumo-deadlift",
		"Sumo deadlift",
		"lb",
		5,
		[
			"sumo deadlifts",
			"sumo deadlift",
			"sumo"
		]
	],
	[
		"romanian-deadlift",
		"Romanian deadlift",
		"lb",
		5,
		[
			"romanian deadlifts",
			"romanian deadlift",
			"romanian dead lift",
			"rdl",
			"rdls"
		]
	],
	[
		"hip-thrust",
		"Hip thrust",
		"lb",
		10,
		[
			"hip thrusts",
			"hip thrust",
			"barbell hip thrust"
		]
	],
	[
		"good-morning",
		"Good morning",
		"lb",
		5,
		["good mornings", "good morning"]
	],
	[
		"barbell-bench",
		"Barbell bench",
		"lb",
		5,
		[
			"barbell bench press",
			"barbell bench",
			"bb bench"
		]
	],
	[
		"incline-bench",
		"Incline bench",
		"lb",
		5,
		[
			"incline bench press",
			"incline bench",
			"incline db bench"
		]
	],
	[
		"overhead-press",
		"Overhead press",
		"lb",
		5,
		[
			"overhead presses",
			"overhead press",
			"ohp",
			"shoulder press",
			"shoulder presses",
			"military press",
			"strict press"
		]
	],
	[
		"push-press",
		"Push press",
		"lb",
		5,
		["push presses", "push press"]
	],
	[
		"barbell-row",
		"Barbell row",
		"lb",
		5,
		[
			"barbell rows",
			"barbell row",
			"bent over row",
			"bent-over row",
			"bb row"
		]
	],
	[
		"power-clean",
		"Power clean",
		"lb",
		5,
		["power cleans", "power clean"]
	],
	[
		"hang-clean",
		"Hang clean",
		"lb",
		5,
		["hang cleans", "hang clean"]
	],
	[
		"snatch",
		"Snatch",
		"lb",
		5,
		[
			"snatches",
			"snatch",
			"power snatch"
		]
	],
	[
		"barbell-curl",
		"Barbell curl",
		"lb",
		5,
		[
			"barbell curls",
			"barbell curl",
			"ez bar curl"
		]
	],
	[
		"db-shoulder-press",
		"DB shoulder press",
		"lb",
		5,
		[
			"db shoulder press",
			"dumbbell shoulder press",
			"db press"
		]
	],
	[
		"db-row",
		"DB row",
		"lb",
		5,
		[
			"db rows",
			"dumbbell row",
			"db row",
			"one arm row"
		]
	],
	[
		"walking-lunge",
		"Walking lunge",
		"lb",
		5,
		["walking lunges", "walking lunge"]
	],
	[
		"bulgarian-split-squat",
		"Bulgarian split squat",
		"lb",
		5,
		[
			"bulgarian split squats",
			"bulgarian split squat",
			"bss",
			"rear foot elevated split squat"
		]
	],
	[
		"step-up",
		"Step up",
		"lb",
		5,
		[
			"step ups",
			"step-ups",
			"step up"
		]
	],
	[
		"db-rdl",
		"DB Romanian deadlift",
		"lb",
		5,
		[
			"db rdl",
			"dumbbell rdl",
			"db romanian deadlift"
		]
	],
	[
		"lateral-raise",
		"Lateral raise",
		"lb",
		2,
		[
			"lateral raises",
			"lateral raise",
			"side raise"
		]
	],
	[
		"rear-delt-fly",
		"Rear delt fly",
		"lb",
		2,
		[
			"rear delt flies",
			"rear delt fly",
			"reverse fly"
		]
	],
	[
		"hammer-curl",
		"Hammer curl",
		"lb",
		5,
		["hammer curls", "hammer curl"]
	],
	[
		"db-curl",
		"DB curl",
		"lb",
		5,
		[
			"db curls",
			"dumbbell curl",
			"dumbbell curls",
			"db curl",
			"bicep curl",
			"bicep curls",
			"biceps curl",
			"biceps curls"
		]
	],
	[
		"chest-fly",
		"Chest fly",
		"lb",
		5,
		[
			"chest flies",
			"chest fly",
			"db fly"
		]
	],
	[
		"farmer-carry",
		"Farmer carry",
		"lb",
		5,
		[
			"farmer carries",
			"farmer carry",
			"farmers carry",
			"farmer walk"
		]
	],
	[
		"kb-clean",
		"Kettlebell clean",
		"lb",
		4,
		[
			"kettlebell cleans",
			"kb clean",
			"kettlebell clean"
		]
	],
	[
		"turkish-get-up",
		"Turkish get-up",
		"lb",
		4,
		[
			"turkish get-ups",
			"turkish get up",
			"turkish get-up",
			"tgu"
		]
	],
	[
		"lat-pulldown",
		"Lat pulldown",
		"lb",
		5,
		[
			"lat pulldowns",
			"lat pulldown",
			"pulldown"
		]
	],
	[
		"seated-row",
		"Seated row",
		"lb",
		5,
		[
			"seated rows",
			"seated row",
			"cable row"
		]
	],
	[
		"leg-press",
		"Leg press",
		"lb",
		10,
		["leg presses", "leg press"]
	],
	[
		"leg-curl",
		"Leg curl",
		"lb",
		5,
		[
			"leg curls",
			"leg curl",
			"hamstring curl"
		]
	],
	[
		"leg-extension",
		"Leg extension",
		"lb",
		5,
		["leg extensions", "leg extension"]
	],
	[
		"calf-raise",
		"Calf raise",
		"lb",
		5,
		[
			"calf raises",
			"calf raise",
			"standing calf raise"
		]
	],
	[
		"face-pull",
		"Face pull",
		"lb",
		5,
		["face pulls", "face pull"]
	],
	[
		"tricep-pushdown",
		"Tricep pushdown",
		"lb",
		5,
		[
			"tricep pushdowns",
			"tricep pushdown",
			"pushdown",
			"cable pushdown"
		]
	],
	[
		"cable-fly",
		"Cable fly",
		"lb",
		5,
		["cable flies", "cable fly"]
	],
	[
		"chest-press",
		"Chest press",
		"lb",
		5,
		["chest press", "machine chest press"]
	],
	[
		"pull-up",
		"Pull-up",
		"lb",
		5,
		[
			"pull-ups",
			"pull ups",
			"pullups",
			"pull-up",
			"pull up"
		]
	],
	[
		"chin-up",
		"Chin-up",
		"lb",
		5,
		[
			"chin-ups",
			"chin ups",
			"chin-up",
			"chin up"
		]
	],
	[
		"dip",
		"Dip",
		"lb",
		5,
		[
			"dips",
			"dip",
			"chest dip"
		]
	],
	[
		"push-up",
		"Push-up",
		"lb",
		5,
		[
			"push-ups",
			"push ups",
			"pushups",
			"push-up",
			"push up"
		]
	],
	[
		"plank",
		"Plank",
		"lb",
		5,
		["planks", "plank"]
	],
	[
		"sit-up",
		"Sit-up",
		"lb",
		5,
		[
			"sit-ups",
			"sit ups",
			"situps",
			"sit-up"
		]
	],
	[
		"burpee",
		"Burpee",
		"lb",
		5,
		["burpees", "burpee"]
	],
	[
		"kettlebell-snatch",
		"Kettlebell snatch",
		"lb",
		4,
		["kb snatch", "kettlebell snatch"]
	],
	[
		"single-leg-deadlift",
		"Single-leg deadlift",
		"lb",
		5,
		[
			"single leg deadlift",
			"single-leg deadlift",
			"sldl"
		]
	],
	[
		"hack-squat",
		"Hack squat",
		"lb",
		10,
		["hack squats", "hack squat"]
	],
	[
		"pause-squat",
		"Pause squat",
		"lb",
		5,
		["pause squats", "pause squat"]
	],
	[
		"floor-press",
		"Floor press",
		"lb",
		5,
		["floor presses", "floor press"]
	],
	[
		"landmine-press",
		"Landmine press",
		"lb",
		5,
		["landmine presses", "landmine press"]
	],
	[
		"sled-push",
		"Sled push",
		"lb",
		10,
		[
			"sled pushes",
			"sled push",
			"prowler"
		]
	]
];
var STARTER = /* @__PURE__ */ new Set([
	"goblet-squat",
	"kettlebell-swing",
	"deadlift",
	"db-bench-press",
	"renegade-row",
	"thrusters",
	"reverse-lunge",
	"box-jump"
]);
var EXERCISE_LIBRARY = SEEDS.map(([id, name, unit, increment, aliases], order) => ({
	id,
	name,
	unit,
	increment,
	aliases,
	order
}));
var MOVEMENTS = EXERCISE_LIBRARY.filter((movement) => STARTER.has(movement.id));
function exerciseHit(movement, query) {
	const q = query.trim().toLowerCase();
	if (!q) return true;
	if (movement.name.toLowerCase().includes(q)) return true;
	return movement.aliases.some((alias) => alias.includes(q));
}
function libraryMatches(query, owned) {
	const q = query.trim().toLowerCase();
	if (!q) return [];
	const ids = new Set(owned.map((movement) => movement.id));
	return EXERCISE_LIBRARY.filter((movement) => !ids.has(movement.id) && exerciseHit(movement, q)).slice(0, 8);
}
function sessionId(movementId, date, classKind) {
	return `${movementId}:${date}:${classKind}`;
}
var EFFORTS = /* @__PURE__ */ new Set([
	"easy",
	"just-right",
	"hard"
]);
var KINDS = /* @__PURE__ */ new Set(["strength", "cardio"]);
var UNITS = /* @__PURE__ */ new Set(["lb", "in"]);
var CONTEXTS = /* @__PURE__ */ new Set(["poor-sleep", "wine"]);
var SEXES = /* @__PURE__ */ new Set([
	"female",
	"male",
	"unspecified"
]);
var GOAL_KINDS = /* @__PURE__ */ new Set([
	"load",
	"milestone",
	"endurance",
	"calories"
]);
var FILTERS = /* @__PURE__ */ new Set([
	"strength",
	"cardio",
	"mixed"
]);
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function text(value, max) {
	if (typeof value !== "string") return null;
	const trimmed = value.trim();
	if (!trimmed) return null;
	return trimmed.slice(0, max);
}
function looseText(value, max) {
	if (typeof value !== "string") return "";
	return value.slice(0, max);
}
function num(value, min, max) {
	if (typeof value !== "number" || !Number.isFinite(value)) return null;
	if (value < min || value > max) return null;
	return value;
}
function flag(value) {
	return value === true;
}
function iso(value) {
	return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : null;
}
function blankDraft(date) {
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
function movement(value) {
	if (!isRecord(value)) return null;
	const id = text(value.id, 64);
	const name = text(value.name, 80);
	const unit = UNITS.has(value.unit) ? value.unit : null;
	const increment = num(value.increment, 1, 50);
	const order = num(value.order, 0, 9999);
	if (!id || !name || !unit || increment == null || order == null) return null;
	const aliases = Array.isArray(value.aliases) ? value.aliases.map((alias) => text(alias, 48)).filter((alias) => Boolean(alias)).slice(0, 12) : [];
	const heardAs = text(value.heardAs, 80);
	return {
		id,
		name,
		aliases,
		unit,
		increment,
		order,
		...heardAs ? { heardAs } : {}
	};
}
function draftLine(value) {
	if (!isRecord(value)) return null;
	const movementId = text(value.movementId, 64);
	const key = text(value.key, 80);
	const load = num(value.value, 0, 2e3);
	const effort = EFFORTS.has(value.effort) ? value.effort : null;
	if (!movementId || !key || load == null || !effort) return null;
	const context = CONTEXTS.has(value.context) ? value.context : void 0;
	const effortWord = text(value.effortWord, 40) ?? void 0;
	return {
		key,
		movementId,
		value: load,
		effort,
		...context ? { context } : {},
		...effortWord ? { effortWord } : {}
	};
}
function draft(value) {
	if (!isRecord(value)) return blankDraft("1970-01-01");
	const date = iso(value.date) ?? "1970-01-01";
	const classKind = KINDS.has(value.classKind) ? value.classKind : "strength";
	const phase = value.phase === "review" ? "review" : "compose";
	const lines = Array.isArray(value.lines) ? value.lines.map(draftLine).filter((line) => Boolean(line)).slice(0, 40) : [];
	const error = text(value.error, 160) ?? void 0;
	return {
		date,
		classKind,
		transcript: looseText(value.transcript, 2e3),
		lines,
		phase,
		editing: flag(value.editing),
		savedTick: num(value.savedTick, 0, Number.MAX_SAFE_INTEGER) ?? 0,
		datePinned: flag(value.datePinned),
		...error ? { error } : {}
	};
}
function log(value) {
	if (!isRecord(value)) return null;
	const id = text(value.id, 96);
	const date = iso(value.date);
	const movementId = text(value.movementId, 64);
	const classKind = KINDS.has(value.classKind) ? value.classKind : null;
	const load = num(value.value, 0, 2e3);
	const effort = EFFORTS.has(value.effort) ? value.effort : null;
	if (!id || !date || !movementId || !classKind || load == null || !effort) return null;
	const context = CONTEXTS.has(value.context) ? value.context : void 0;
	const note = text(value.note, 80) ?? void 0;
	return {
		id,
		date,
		movementId,
		classKind,
		value: load,
		effort,
		setAside: flag(value.setAside),
		...context ? { context } : {},
		...note ? { note } : {}
	};
}
function goal(value) {
	if (!isRecord(value)) return null;
	const id = text(value.id, 64);
	const title = text(value.title, 80);
	const kind = GOAL_KINDS.has(value.kind) ? value.kind : null;
	if (!id || !title || !kind) return null;
	const movementId = text(value.movementId, 64) ?? void 0;
	const target = num(value.target, 0, 1e5) ?? void 0;
	const progress = num(value.progress, 0, 100) ?? void 0;
	return {
		id,
		title,
		kind,
		...movementId ? { movementId } : {},
		...target != null ? { target } : {},
		...progress != null ? { progress } : {}
	};
}
function profile(value) {
	const source = isRecord(value) ? value : {};
	return {
		sex: SEXES.has(source.sex) ? source.sex : null,
		age: num(source.age, 13, 100),
		weightLb: num(source.weightLb, 70, 500),
		heightIn: num(source.heightIn, 48, 96),
		classMinutes: num(source.classMinutes, 15, 180) ?? 45
	};
}
function skips(value) {
	if (!isRecord(value)) return {
		date: "",
		ids: []
	};
	return {
		date: iso(value.date) ?? "",
		ids: Array.isArray(value.ids) ? value.ids.map((id) => text(id, 64)).filter((id) => Boolean(id)).slice(0, 12) : []
	};
}
function recovery(value) {
	if (!isRecord(value)) return null;
	const dropBpm = num(value.dropBpm, 0, 80);
	const previousDrop = num(value.previousDrop, 0, 80);
	const highZoneMin = num(value.highZoneMin, 0, 180);
	const previousWhen = text(value.previousWhen, 40);
	const note = text(value.note, 160);
	if (dropBpm == null || previousDrop == null || highZoneMin == null || !previousWhen || !note) return null;
	return {
		dropBpm,
		previousDrop,
		previousWhen,
		highZoneMin,
		note
	};
}
function sanitizeSnapshot(input) {
	if (!isRecord(input)) return null;
	const movements = Array.isArray(input.movements) ? input.movements.map(movement).filter((item) => Boolean(item)).slice(0, 120) : [];
	const logs = Array.isArray(input.logs) ? input.logs.map(log).filter((item) => Boolean(item)).slice(0, 1500) : [];
	const goals = Array.isArray(input.goals) ? input.goals.map(goal).filter((item) => Boolean(item)).slice(0, 40) : [];
	const owned = movements.length > 0 ? movements : MOVEMENTS.map((item) => ({
		...item,
		aliases: [...item.aliases]
	}));
	const historyMovementId = text(input.historyMovementId, 64) ?? owned[0]?.id ?? "goblet-squat";
	const historyFilter = FILTERS.has(input.historyFilter) ? input.historyFilter : "strength";
	return {
		movements: owned,
		logs,
		goals,
		recovery: recovery(input.recovery),
		profile: profile(input.profile),
		draft: draft(input.draft),
		historyMovementId,
		historyFilter,
		skipped: skips(input.skipped)
	};
}
function snapshotBytes(snapshot) {
	return JSON.stringify(snapshot).length;
}
//#endregion
export { authMiddleware as a, sanitizeSnapshot as c, SAMPLE_TRANSCRIPT as i, sessionId as l, EXERCISE_LIBRARY as n, exerciseHit as o, MOVEMENTS as r, libraryMatches as s, CONTEXTS$1 as t, snapshotBytes as u };
