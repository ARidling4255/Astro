import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const KEY = "heft-theme";

function paint(theme: "light" | "dark") {
  document.documentElement.dataset.theme = theme === "dark" ? "dark" : "";
  if (theme === "light") delete document.documentElement.dataset.theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "dark" ? "#070b16" : "#f7f6f3");
}

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === "dark");
  }, []);

  function toggle() {
    const next = dark ? "light" : "dark";
    setDark(next === "dark");
    paint(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* private mode */
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span id="theme-switch-label" className="text-[10px] font-semibold tracking-[0.18em] text-muted uppercase">
        {dark ? "Dark" : "Light"}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={dark}
        aria-labelledby="theme-switch-label"
        onClick={toggle}
        className={cn(
          "relative h-8 w-[3.25rem] shrink-0 rounded-full border-2 p-0.5 transition-colors",
          dark ? "border-[#5ad4e2] bg-[#070b16]" : "border-ink bg-paper",
        )}
      >
        <span
          className={cn(
            "block size-6 rounded-full transition-transform duration-200",
            dark
              ? "translate-x-5 bg-pop shadow-[0_0_8px_#f4c400]"
              : "translate-x-0 bg-coral",
          )}
        />
      </button>
    </div>
  );
}

export function useDarkTheme() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const sync = () => setDark(document.documentElement.dataset.theme === "dark");
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return dark;
}
