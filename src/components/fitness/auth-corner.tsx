import { Link } from "@tanstack/react-router";
import { useState, useSyncExternalStore } from "react";
import { authEnabled, signOut } from "@/lib/auth/client";
import { hasGateSessionMarker } from "@/lib/auth/gate-session-marker";
import { useCurrentUser, useCurrentUserState, type AppUser } from "@/lib/auth/use-current-user";

const subscribeToNothing = () => () => {};
const noGateSessionOnServer = () => false;

/** The preview gate's unnamed fallback — not an account the person created. */
export function isGuestSession(user: Pick<AppUser, "displayName" | "primaryEmail">) {
  const email = user.primaryEmail ?? "";
  return user.displayName === "Grok user" || email.endsWith("@viewer.grok.invalid");
}

export function AuthCorner() {
  const { user, isPending } = useCurrentUserState();
  if (!authEnabled) return null;
  if (isPending) {
    return <span className="inline-block h-11 w-24 animate-pulse rounded-full bg-track" />;
  }
  if (!user || isGuestSession(user)) {
    return (
      <Link
        to="/login"
        className="capsule-quiet inline-flex h-11 items-center px-4 text-xs font-semibold"
      >
        Sign in
      </Link>
    );
  }
  return <SignedChip />;
}

function SignedChip() {
  const user = useCurrentUser();
  const [signingOut, setSigningOut] = useState(false);
  const gateSession = useSyncExternalStore(subscribeToNothing, hasGateSessionMarker, noGateSessionOnServer);
  if (!user) return null;
  const label = user.displayName ?? user.primaryEmail ?? "You";
  const first = label.split(" ")[0] ?? label;
  return (
    <span className="inline-flex h-11 items-center gap-2">
      <Link to="/login" className="capsule-quiet inline-flex h-11 max-w-36 items-center truncate px-4 text-xs">
        {first}
      </Link>
      {authEnabled && !gateSession ? (
        <button
          type="button"
          disabled={signingOut}
          onClick={() => {
            setSigningOut(true);
            void signOut().catch(() => setSigningOut(false));
          }}
          className="text-[10px] font-semibold tracking-[0.14em] text-muted uppercase disabled:opacity-60"
        >
          {signingOut ? "…" : "Out"}
        </button>
      ) : null}
    </span>
  );
}
