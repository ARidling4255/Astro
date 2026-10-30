import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { NightSky } from "@/components/fitness/night-sky";
import { PlanetScene } from "@/components/fitness/marks";
import { ThemeToggle, useDarkTheme } from "@/components/fitness/theme-toggle";
import { UserButton } from "@/lib/auth/gates";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { isGuestSession } from "@/components/fitness/auth-corner";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const dark = useDarkTheme();
  const navigate = useNavigate();
  const { user, isPending } = useCurrentUserState();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (pending) return;
    setError(null);
    const mail = email.trim();
    if (!mail.includes("@") || password.length < 8) {
      setError(password.length < 8 ? "Use at least 8 characters." : "Enter a real email.");
      return;
    }
    if (mode === "up" && name.trim().length < 2) {
      setError("Add the name you want on the account.");
      return;
    }
    setPending(true);
    const result =
      mode === "up"
        ? await authClient.signUp.email({
            name: name.trim(),
            email: mail,
            password,
            callbackURL: "/",
          })
        : await authClient.signIn.email({
            email: mail,
            password,
            callbackURL: "/",
          });
    setPending(false);
    if (result.error) {
      setError(result.error.message ?? (mode === "up" ? "Could not create that account." : "Could not sign in."));
      return;
    }
    await navigate({ to: "/" });
  }

  return (
    <div className="relative min-h-dvh overflow-hidden bg-paper text-ink">
      {dark ? <NightSky /> : null}
      <div className="relative z-10 isolate mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 pt-3 pb-10">
        <div className="flex items-center justify-end gap-2">
          <ThemeToggle />
        </div>
        <Link
          to="/"
          aria-label="Back to today"
          className="mt-6 inline-flex h-24 w-36"
        >
          <PlanetScene className="h-full w-full" />
        </Link>
        <p className="mt-6 text-xs font-semibold tracking-[0.22em] text-muted uppercase">Account</p>
        <h1 className="mt-3 text-balance">Welcome to Astro</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Create an account to keep your logs, weights, and goals with you.
        </p>

        {isPending ? (
          <div className="mt-8 h-40 animate-pulse rounded-3xl bg-track" />
        ) : user && !isGuestSession(user) ? (
          <div className="mt-8 rounded-3xl border border-line bg-card p-5">
            <p className="font-semibold">Signed in as {user.displayName ?? user.primaryEmail ?? "you"}.</p>
            <p className="mt-2 text-sm text-muted">Your history is on this account.</p>
            <UserButton />
            <Link to="/" className="capsule mt-4 inline-flex h-12 w-full items-center justify-center text-sm">
              Back to today
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-6 grid grid-cols-2 rounded-2xl bg-just-soft p-1">
              {(
                [
                  ["in", "Sign in"],
                  ["up", "Create"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setMode(id);
                    setError(null);
                  }}
                  className={mode === id ? "h-10 rounded-xl bg-card text-sm font-semibold" : "h-10 rounded-xl text-sm font-semibold text-muted"}
                >
                  {label}
                </button>
              ))}
            </div>
            <form onSubmit={submit} className="mt-4 space-y-3">
              {mode === "up" ? (
                <label className="block">
                  <span className="mb-1 block text-[10px] font-semibold tracking-[0.16em] text-muted uppercase">Name</span>
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    autoComplete="name"
                    className="h-12 w-full rounded-full border border-line bg-card px-4 text-base outline-none"
                  />
                </label>
              ) : null}
              <label className="block">
                <span className="mb-1 block text-[10px] font-semibold tracking-[0.16em] text-muted uppercase">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  className="h-12 w-full rounded-full border border-line bg-card px-4 text-base outline-none"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-[10px] font-semibold tracking-[0.16em] text-muted uppercase">Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete={mode === "up" ? "new-password" : "current-password"}
                  className="h-12 w-full rounded-full border border-line bg-card px-4 text-base outline-none"
                />
              </label>
              {error ? <p className="text-sm text-navy">{error}</p> : null}
              <button type="submit" disabled={pending || !authEnabled} className="capsule h-12 w-full text-sm disabled:opacity-40">
                {pending ? "One moment" : mode === "up" ? "Create account" : "Sign in"}
              </button>
            </form>
            <div className="mt-6 space-y-3">
              {GROK_PROVIDERS.map((provider) => (
                <button
                  key={provider.providerId}
                  type="button"
                  onClick={() => {
                  setError(null);
                  void signIn(provider.providerId, { callbackURL: "/" }).catch((err: unknown) => {
                    setError(err instanceof Error ? err.message : "Could not sign in.");
                  });
                }}
                  className="capsule-quiet h-12 w-full text-sm"
                >
                  Continue with {provider.label}
                </button>
              ))}
            </div>
          </>
        )}
        <Link to="/" className="mt-8 text-center text-sm font-semibold text-muted">
          Use Astro on this device only
        </Link>
      </div>
    </div>
  );
}
