import { useEffect } from "react";
import { authEnabled } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { loadHeft, saveHeft } from "@/lib/fitness/remote";
import type { HeftSnapshot } from "@/lib/fitness/snapshot";
import { readSnapshot, useHeft } from "@/lib/fitness/store";
import { todayIso } from "@/lib/fitness/logic";

const GUEST_KEY = "astro-guest-snapshot";

let activeUser: string | null = null;
let stopSave: (() => void) | null = null;
let ticket = 0;

function captureGuest(): HeftSnapshot {
  try {
    const existing = sessionStorage.getItem(GUEST_KEY);
    if (existing) {
      const parsed = JSON.parse(existing) as HeftSnapshot;
      if (parsed && Array.isArray(parsed.logs) && parsed.profile) return parsed;
    }
  } catch {
    /* ignore broken storage */
  }
  const snap = readSnapshot();
  try {
    sessionStorage.setItem(GUEST_KEY, JSON.stringify(snap));
  } catch {
    /* private mode */
  }
  return snap;
}

function catchUpToday() {
  useHeft.getState().rollDraftTo(todayIso(), true);
  window.dispatchEvent(new Event("heft-today"));
}

function clearGuest() {
  try {
    sessionStorage.removeItem(GUEST_KEY);
  } catch {
    /* private mode */
  }
}

function watchSaves() {
  let timer = 0;
  const flush = () => {
    window.clearTimeout(timer);
    void saveHeft({ data: readSnapshot() }).catch(() => {});
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

export function useAccountSync() {
  const { user, isPending } = useCurrentUserState();
  const userId = authEnabled ? (user?.id ?? null) : null;

  useEffect(() => {
    if (!authEnabled || isPending) return;
    const mine = ++ticket;

    if (!userId) {
      stopSave?.();
      stopSave = null;
      activeUser = null;
      try {
        const raw = sessionStorage.getItem(GUEST_KEY);
        if (raw) {
          const guest = JSON.parse(raw) as HeftSnapshot;
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

    void (async () => {
      await useHeft.persist.rehydrate();
      if (mine !== ticket) return;
      const guest = captureGuest();
      let remote: HeftSnapshot | null = null;
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
