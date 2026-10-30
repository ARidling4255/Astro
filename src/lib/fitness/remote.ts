import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { sanitizeSnapshot, snapshotBytes, type HeftSnapshot } from "@/lib/fitness/snapshot";

function parsePayload(value: unknown) {
  if (typeof value === "string") {
    try {
      return JSON.parse(value) as unknown;
    } catch {
      return null;
    }
  }
  return value;
}

export const loadHeft = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<HeftSnapshot | null> => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const rows = await sql<{ payload: unknown }>`
      select payload from heft_state where user_id = ${context.userId}
    `;
    const row = rows[0];
    if (!row) return null;
    return sanitizeSnapshot(parsePayload(row.payload));
  });

export const saveHeft = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => {
    const snapshot = sanitizeSnapshot(input);
    if (!snapshot) throw new Error("Invalid workout data");
    if (snapshotBytes(snapshot) > 400_000) throw new Error("Workout data is too large");
    return snapshot;
  })
  .handler(async ({ context, data }) => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const payload = JSON.stringify(data);
    await sql`
      insert into heft_state (user_id, payload, updated_at)
      values (${context.userId}, ${payload}, now())
      on conflict (user_id) do update
        set payload = excluded.payload,
            updated_at = now()
    `;
    return { ok: true as const };
  });
