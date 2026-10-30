-- Per-user workout snapshot. Payload is JSON text so preview PGLite and Neon match.
create table if not exists heft_state (
  user_id text primary key,
  payload text not null,
  updated_at timestamptz not null default now()
);
