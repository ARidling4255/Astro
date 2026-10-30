import { useEffect, useState } from "react";
import { todayIso } from "@/lib/fitness/logic";

function msUntilNextMidnight() {
  const now = new Date();
  const next = new Date(now);
  next.setHours(24, 0, 0, 0);
  return Math.max(1000, next.getTime() - now.getTime());
}

/** Local calendar day. Flips at midnight, and again when the tab or a sign-in wakes the app. */
export function useTodayIso() {
  const [iso, setIso] = useState(() => todayIso());

  useEffect(() => {
    let midnight = 0;

    const sync = () => {
      const next = todayIso();
      setIso((prev) => (prev === next ? prev : next));
      window.clearTimeout(midnight);
      midnight = window.setTimeout(sync, msUntilNextMidnight());
    };

    const onVisible = () => {
      if (document.visibilityState === "visible") sync();
    };

    sync();
    const poll = window.setInterval(sync, 60_000);
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
