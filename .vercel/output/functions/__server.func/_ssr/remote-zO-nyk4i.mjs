import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { a as authMiddleware, c as sanitizeSnapshot, u as snapshotBytes } from "./snapshot-Brvgqk_Z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/remote-zO-nyk4i.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function parsePayload(value) {
	if (typeof value === "string") try {
		return JSON.parse(value);
	} catch {
		return null;
	}
	return value;
}
var loadHeft_createServerFn_handler = createServerRpc({
	id: "699dade32ccc22329c95f3788146ed33ba10a4729266514cb638978ac991ccfb",
	name: "loadHeft",
	filename: "src/lib/fitness/remote.ts"
}, (opts) => loadHeft.__executeServer(opts));
var loadHeft = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(loadHeft_createServerFn_handler, async ({ context }) => {
	const { getSql } = await import("./db-B54dxFT9.mjs").then((n) => n.t).then((n) => n.t);
	const row = (await (await getSql())`
      select payload from heft_state where user_id = ${context.userId}
    `)[0];
	if (!row) return null;
	return sanitizeSnapshot(parsePayload(row.payload));
});
var saveHeft_createServerFn_handler = createServerRpc({
	id: "5d3f9ff659c52341b1193377006f88997f24af1917bd52a051c3042f64dcf1c8",
	name: "saveHeft",
	filename: "src/lib/fitness/remote.ts"
}, (opts) => saveHeft.__executeServer(opts));
var saveHeft = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => {
	const snapshot = sanitizeSnapshot(input);
	if (!snapshot) throw new Error("Invalid workout data");
	if (snapshotBytes(snapshot) > 4e5) throw new Error("Workout data is too large");
	return snapshot;
}).handler(saveHeft_createServerFn_handler, async ({ context, data }) => {
	const { getSql } = await import("./db-B54dxFT9.mjs").then((n) => n.t).then((n) => n.t);
	const sql = await getSql();
	const payload = JSON.stringify(data);
	await sql`
      insert into heft_state (user_id, payload, updated_at)
      values (${context.userId}, ${payload}, now())
      on conflict (user_id) do update
        set payload = excluded.payload,
            updated_at = now()
    `;
	return { ok: true };
});
//#endregion
export { loadHeft_createServerFn_handler, saveHeft_createServerFn_handler };
