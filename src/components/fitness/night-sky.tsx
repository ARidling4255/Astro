import { useEffect, useState } from "react";

type Pass = "rocket" | "shoot" | "alien" | "sputnik";

const STARS = Array.from({ length: 42 }, (_, index) => ({
  x: (index * 73 + 11) % 100,
  y: (index * 41 + 7) % 100,
  delay: `${(index % 9) * 0.32}s`,
  size: index % 7 === 0 ? 3 : index % 3 === 0 ? 2 : 1.5,
  color: index % 11 === 0 ? "#ff4b96" : index % 5 === 0 ? "#f4c400" : "#f4f1e6",
}));

const BURSTS = [
  { x: 12, y: 18, color: "#f4c400" },
  { x: 78, y: 12, color: "#5ad4e2" },
  { x: 64, y: 70, color: "#ff4b96" },
  { x: 28, y: 84, color: "#f4c400" },
  { x: 88, y: 46, color: "#5ad4e2" },
];

export function NightSky() {
  const [pass, setPass] = useState<Pass | null>(null);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;

    let cancelled = false;
    const timers = new Set<number>();

    const later = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        timers.delete(id);
        if (!cancelled) fn();
      }, ms);
      timers.add(id);
    };

    const life: Record<Pass, number> = { rocket: 7400, shoot: 1500, alien: 11200, sputnik: 12000 };

    const order: Pass[] = ["sputnik", "rocket", "alien", "shoot"];
    let index = 0;

    const run = () => {
      const kind = order[index % order.length] ?? "sputnik";
      index += 1;
      setPass(kind);
      later(() => {
        setPass(null);
        later(run, 4500);
      }, life[kind]);
    };

    later(run, 900);

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {STARS.map((star) => (
        <span
          key={`${star.x}-${star.y}`}
          className="star absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            background: star.color,
            animationDelay: star.delay,
          }}
        />
      ))}
      {BURSTS.map((burst) => (
        <svg
          key={`${burst.x}-${burst.y}`}
          viewBox="0 0 16 16"
          className="star absolute size-3"
          style={{ left: `${burst.x}%`, top: `${burst.y}%`, color: burst.color }}
        >
          <path fill="currentColor" d="M8 0 9.2 6.2 16 8 9.2 9.8 8 16 6.8 9.8 0 8 6.8 6.2Z" />
        </svg>
      ))}
      {pass === "rocket" ? <CartoonRocket /> : null}
      {pass === "shoot" ? <ShootingStar /> : null}
      {pass === "alien" ? <Saucer /> : null}
      {pass === "sputnik" ? <Sputnik /> : null}
    </div>
  );
}

function CartoonRocket() {
  return (
    <div className="rocket-by absolute flex items-center">
      <svg viewBox="0 0 78 32" className="rocket-plume" aria-hidden="true">
        <defs>
          <linearGradient id="plume-outer" x1="0" x2="1">
            <stop offset="0" stopColor="#ff4b96" stopOpacity="0" />
            <stop offset="0.28" stopColor="#ff3b78" />
            <stop offset="0.62" stopColor="#ff6a1a" />
            <stop offset="1" stopColor="#ffd15a" />
          </linearGradient>
          <linearGradient id="plume-mid" x1="0" x2="1">
            <stop offset="0" stopColor="#ff8a1a" stopOpacity="0" />
            <stop offset="0.35" stopColor="#ffb000" />
            <stop offset="1" stopColor="#fff1a8" />
          </linearGradient>
          <linearGradient id="plume-core" x1="0" x2="1">
            <stop offset="0" stopColor="#fff6c8" stopOpacity="0" />
            <stop offset="0.4" stopColor="#fff6c8" />
            <stop offset="1" stopColor="#ffffff" />
          </linearGradient>
        </defs>
        <path
          className="tongue tongue-outer"
          fill="url(#plume-outer)"
          d="M76 16C58 6 34 2 8 16 34 30 58 26 76 16Z"
        />
        <path
          className="tongue tongue-mid"
          fill="url(#plume-mid)"
          d="M76 16C60 10 42 8 24 16 42 24 60 22 76 16Z"
        />
        <path className="tongue tongue-core" fill="url(#plume-core)" d="M76 16C64 13 50 13 38 16 50 19 64 19 76 16Z" />
        <circle className="ember ember-a" cx="70" cy="16" r="1.5" fill="#ffe38a" />
        <circle className="ember ember-b" cx="70" cy="16" r="1.15" fill="#ff9a2a" />
        <circle className="ember ember-c" cx="70" cy="16" r="1.3" fill="#fff6d0" />
      </svg>
      <img
        src="/flybys/rocket.png"
        alt=""
        draggable={false}
        className="relative h-4 w-auto max-w-none -ml-3"
      />
    </div>
  );
}

function Saucer() {
  return (
    <div className="alien-by absolute">
      <img
        src="/flybys/ufo.png"
        alt=""
        draggable={false}
        className="ufo-bob h-5 w-auto max-w-none"
      />
    </div>
  );
}

function Sputnik() {
  return (
    <div className="sputnik-by absolute">
      <img
        src="/flybys/sputnik.png"
        alt=""
        draggable={false}
        className="sputnik-wobble h-16 w-auto max-w-none"
      />
    </div>
  );
}

function ShootingStar() {
  return (
    <svg viewBox="0 0 140 16" className="shoot-by absolute h-3 w-32">
      <defs>
        <linearGradient id="streak" x1="0" x2="1">
          <stop offset="0" stopColor="#f4c400" stopOpacity="0" />
          <stop offset="0.7" stopColor="#f4c400" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
      </defs>
      <rect x="0" y="6" width="124" height="3" rx="1.5" fill="url(#streak)" />
      <circle cx="128" cy="7.5" r="3" fill="#ffffff" />
    </svg>
  );
}
