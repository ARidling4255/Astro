import { ChartColumn, Mic, Sun, Target, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { AccountScreen } from "@/components/fitness/account-screen";
import { AuthCorner } from "@/components/fitness/auth-corner";
import { GoalsScreen } from "@/components/fitness/goals-screen";
import { HistoryScreen } from "@/components/fitness/history-screen";
import { LogScreen } from "@/components/fitness/log-screen";
import { TodayScreen } from "@/components/fitness/today-screen";
import { PlanetScene } from "@/components/fitness/marks";
import { NightSky } from "@/components/fitness/night-sky";
import { ThemeToggle, useDarkTheme } from "@/components/fitness/theme-toggle";
import { readyList, readySentence, todayIso } from "@/lib/fitness/logic";
import { useHeft } from "@/lib/fitness/store";
import { useAccountSync } from "@/lib/fitness/account-sync";
import { useTodayIso } from "@/lib/fitness/use-today";
import type { ClassKind } from "@/lib/fitness/types";

type Tab = "today" | "log" | "account" | "history" | "goals";

const TABS: Array<{ id: Tab; label: string; icon: typeof Sun }> = [
  { id: "today", label: "Today", icon: Sun },
  { id: "log", label: "Log", icon: Mic },
  { id: "account", label: "Account", icon: UserRound },
  { id: "history", label: "History", icon: ChartColumn },
  { id: "goals", label: "Goals", icon: Target },
];

export function Shell() {
  const [tab, setTab] = useState<Tab>("today");
  const [confirmClear, setConfirmClear] = useState(false);
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

  useEffect(() => {
    let cancel = false;
    void Promise.resolve(useHeft.persist.rehydrate()).then(() => {
      if (!cancel) useHeft.getState().rollDraftTo(todayIso(), true);
    });
    return () => {
      cancel = true;
    };
  }, []);

  useEffect(() => {
    rollDraftTo(day, true);
  }, [day, rollDraftTo]);

  function openHistory(movementId: string, filter: ClassKind) {
    setHistoryMovement(movementId);
    setHistoryFilter(filter);
    setTab("history");
  }

  return (
    <div className="relative h-dvh overflow-hidden bg-paper font-sans text-ink">
      {dark ? <NightSky /> : null}
      <div className="relative z-10 isolate mx-auto flex h-full w-full max-w-3xl flex-col">
        <div className="relative z-30 flex shrink-0 items-center justify-end gap-2 px-4 pt-3 pb-1">
          <ThemeToggle />
          <AuthCorner />
        </div>
        {dark ? <div className="sky-lane relative z-20 shrink-0 lg:hidden" aria-hidden="true" /> : null}
        <div className="flex min-h-0 flex-1">
        <aside className="hidden w-72 shrink-0 flex-col justify-between border-r border-line bg-card px-8 py-8 text-ink shadow-[8px_0_28px_-18px_rgba(8,122,136,0.55)] lg:flex">
          <div>
            <PlanetScene className="h-28 w-44" />
            <p className="mt-6 font-display text-3xl tracking-[0.28em]">ASTRO</p>
            <h2 className="mt-6 text-xl text-balance">Know what to pick up before class.</h2>
            <p className="mt-4 text-base leading-relaxed text-pretty text-muted">
              Say how the lifts felt on the way home. Astro keeps what was easy, sets aside the night that
              wasn't, and has the cheat sheet ready in the morning.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold leading-relaxed text-orange">{readySentence(ready)}</p>
            <button
              type="button"
              onClick={() => {
                if (!confirmClear) {
                  setConfirmClear(true);
                  return;
                }
                clearLogs();
                setConfirmClear(false);
                setTab("today");
              }}
              className="mt-4 text-sm font-semibold text-muted"
            >
              {confirmClear ? "Tap again to clear logs" : "Clear logs"}
            </button>
          </div>
        </aside>

        <div className="mx-auto flex h-full min-h-0 w-full max-w-md flex-col lg:mx-0">
          <main className="flex-1 overflow-y-auto px-5 pt-3 pb-8">
            {tab === "today" ? <TodayScreen onOpen={openHistory} onLog={() => setTab("log")} /> : null}
            {tab === "log" ? <LogScreen /> : null}
            {tab === "account" ? <AccountScreen /> : null}
            {tab === "history" ? <HistoryScreen /> : null}
            {tab === "goals" ? <GoalsScreen /> : null}
          </main>
          <nav
            className="grid shrink-0 grid-cols-5 border-t border-line bg-card shadow-[inset_0_2px_0_#12b4c4]"
            aria-label="Sections"
          >
            {TABS.map((item) => {
              const Icon = item.icon;
              const active = tab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-current={active ? "page" : undefined}
                  onClick={() => setTab(item.id)}
                  className="relative flex flex-col items-center gap-1 px-0.5 pt-3 pb-2"
                >
                  <span
                    className={cn(
                      "absolute inset-x-1.5 top-0 h-[3px] rounded-full",
                      active
                        ? "bg-coral shadow-[0_0_10px_2px_rgba(8,122,136,0.75)]"
                        : "bg-transparent",
                    )}
                  />
                  <Icon
                    className={cn("size-4", active ? "text-orange" : "text-muted")}
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <span
                    className={cn(
                      "text-[10px] font-semibold tracking-[0.04em] uppercase",
                      active ? "text-orange" : "text-muted",
                    )}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
        </div>
      </div>
    </div>
  );
}
