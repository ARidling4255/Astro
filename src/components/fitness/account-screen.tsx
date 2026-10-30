import { useState } from "react";
import { SignedOut } from "@/lib/auth/gates";
import { cn } from "@/lib/cn";
import { dailyCalories, formatShort, profileReady, workoutBurns, weekKcal } from "@/lib/fitness/logic";
import { useHeft } from "@/lib/fitness/store";
import type { Sex } from "@/lib/fitness/types";

const SEXES: Array<{ id: Sex; label: string }> = [
  { id: "female", label: "Female" },
  { id: "male", label: "Male" },
  { id: "unspecified", label: "Other" },
];

export function AccountScreen() {
  const profile = useHeft((state) => state.profile);
  const logs = useHeft((state) => state.logs);
  const setProfile = useHeft((state) => state.setProfile);
  const ready = profileReady(profile);
  const daily = dailyCalories(profile);
  const burns = workoutBurns(logs, profile);
  const week = weekKcal(logs, profile);
  const feet = profile.heightIn == null ? "" : String(Math.floor(profile.heightIn / 12));
  const inches = profile.heightIn == null ? "" : String(profile.heightIn % 12);

  function setHeight(nextFeet: string, nextInches: string) {
    if (nextFeet === "" && nextInches === "") {
      setProfile({ heightIn: null });
      return;
    }
    const total = (Number(nextFeet) || 0) * 12 + (Number(nextInches) || 0);
    setProfile({ heightIn: total > 0 ? total : null });
  }

  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.22em] text-muted uppercase">Body</p>
      <h1 className="mt-3 text-balance">Account</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Gender, size, and class length. Astro uses them to estimate calories and to read load goals against your
        bodyweight.
      </p>
      <SignedOut>
        <p className="mt-2 text-sm text-muted">Sign in at the top to keep this history on your account.</p>
      </SignedOut>

      <fieldset className="mt-6">
        <legend className="text-sm font-semibold">Gender</legend>
        <div className="mt-2 grid grid-cols-3 gap-1 rounded-2xl bg-just-soft p-1">
          {SEXES.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={profile.sex === item.id}
              onClick={() => setProfile({ sex: profile.sex === item.id ? null : item.id })}
              className={cn(
                "rounded-xl py-2 text-sm font-semibold",
                profile.sex === item.id ? "bg-card text-ink shadow-sm" : "text-muted",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <NumberField
          id="age"
          label="Age"
          value={profile.age}
          suffix="yr"
          onChange={(age) => setProfile({ age })}
        />
        <NumberField
          id="weight"
          label="Weight"
          value={profile.weightLb}
          suffix="lb"
          onChange={(weightLb) => setProfile({ weightLb })}
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <label className="block text-sm font-semibold" htmlFor="height-ft">
          Height
          <span className="mt-1 flex h-12 items-center rounded-xl border border-line bg-card px-3">
            <input
              id="height-ft"
              inputMode="numeric"
              value={feet}
              aria-label="Height in feet"
              onChange={(event) => setHeight(event.target.value.replace(/[^\d]/g, ""), inches)}
              className="w-full bg-transparent text-base tabular-nums outline-none"
            />
            <span className="text-sm text-muted">ft</span>
          </span>
        </label>
        <label className="block text-sm font-semibold" htmlFor="height-in">
          <span className="invisible">Inches</span>
          <span className="mt-1 flex h-12 items-center rounded-xl border border-line bg-card px-3">
            <input
              id="height-in"
              inputMode="numeric"
              value={inches}
              aria-label="Height in inches"
              onChange={(event) => setHeight(feet, event.target.value.replace(/[^\d]/g, ""))}
              className="w-full bg-transparent text-base tabular-nums outline-none"
            />
            <span className="text-sm text-muted">in</span>
          </span>
        </label>
      </div>

      <div className="mt-4">
        <NumberField
          id="class-minutes"
          label="Usual class length"
          value={profile.classMinutes}
          suffix="min"
          onChange={(classMinutes) => setProfile({ classMinutes: classMinutes && classMinutes > 0 ? classMinutes : 45 })}
        />
      </div>

      <section className="mt-8 rounded-3xl border border-line bg-card p-4">
        <h2 className="text-base">Calories</h2>
        {daily ? (
          <>
            <p className="mt-3 text-3xl font-semibold text-orange tabular-nums">{daily.kcal.toLocaleString()}</p>
            <p className="mt-1 text-sm text-muted">kcal a day to maintain your weight</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              From your gender, age, weight, height, and a {daily.minutes}-minute class. This is an estimate, not a
              prescription.
            </p>
          </>
        ) : (
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Add gender, age, weight, and height. Astro turns those into a daily calorie requirement.
          </p>
        )}
        {ready ? (
          <div className="mt-5 border-t border-line pt-4">
            <p className="text-sm font-semibold">{week.toLocaleString()} kcal this week from class</p>
            {burns.length === 0 ? (
              <p className="mt-2 text-sm text-muted">Log a class and each workout shows up here.</p>
            ) : (
              <ul className="mt-2 divide-y divide-line">
                {burns.slice(0, 8).map((burn) => (
                  <li key={`${burn.date}-${burn.classKind}`} className="flex items-baseline justify-between gap-3 py-3">
                    <span>
                      <span className="block font-semibold capitalize">{burn.classKind}</span>
                      <span className="text-sm text-muted">
                        {formatShort(burn.date)} · {burn.minutes} min
                      </span>
                    </span>
                    <span className="text-lg font-semibold tabular-nums">{burn.kcal} kcal</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : null}
      </section>
    </div>
  );
}

function NumberField({
  id,
  label,
  value,
  suffix,
  onChange,
}: {
  id: string;
  label: string;
  value: number | null;
  suffix: string;
  onChange: (value: number | null) => void;
}) {
  const [text, setText] = useState(value == null ? "" : String(value));
  const [touched, setTouched] = useState(false);
  const shown = touched ? text : value == null ? "" : String(value);

  return (
    <label className="block text-sm font-semibold" htmlFor={id}>
      {label}
      <span className="mt-1 flex h-12 items-center rounded-xl border border-line bg-card px-3">
        <input
          id={id}
          inputMode="numeric"
          value={shown}
          onChange={(event) => {
            const next = event.target.value.replace(/[^\d]/g, "");
            setTouched(true);
            setText(next);
            onChange(next === "" ? null : Number(next));
          }}
          className="w-full bg-transparent text-base tabular-nums outline-none"
        />
        <span className="text-sm text-muted">{suffix}</span>
      </span>
    </label>
  );
}
