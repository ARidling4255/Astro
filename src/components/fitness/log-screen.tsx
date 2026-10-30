import { Check, Mic, Minus, Plus, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { CONTEXTS, SAMPLE_TRANSCRIPT, exerciseHit, libraryMatches } from "@/lib/fitness/catalog";
import {
  contextCallout,
  effortLabel,
  formatToday,
  lastClass,
  lastValue,
  parseDay,
  slugify,
  todayIso,
  unitWord,
  workoutBurns,
} from "@/lib/fitness/logic";
import { useHeft } from "@/lib/fitness/store";
import { useTodayIso } from "@/lib/fitness/use-today";
import { WorkoutName } from "@/components/fitness/how-to";
import type { ClassKind, Effort } from "@/lib/fitness/types";

type SpeechChunk = ArrayLike<{ transcript: string }> & { isFinal?: boolean };
type SpeechResult = { results: ArrayLike<SpeechChunk>; error?: string };

type SpeechEngine = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechResult) => void) | null;
  onerror: ((event: SpeechResult) => void) | null;
  onend: (() => void) | null;
};

function getSpeechEngine() {
  if (typeof window === "undefined") return null;
  const root = window as Window & {
    SpeechRecognition?: new () => SpeechEngine;
    webkitSpeechRecognition?: new () => SpeechEngine;
  };
  const Ctor = root.SpeechRecognition ?? root.webkitSpeechRecognition;
  return Ctor ? new Ctor() : null;
}

const EFFORTS: Effort[] = ["easy", "just-right", "hard"];

export function LogScreen() {
  const today = useTodayIso();
  const draft = useHeft((state) => state.draft);
  const movements = useHeft((state) => state.movements);
  const logs = useHeft((state) => state.logs);
  const profile = useHeft((state) => state.profile);
  const setDraft = useHeft((state) => state.setDraft);
  const upsertDraftLine = useHeft((state) => state.upsertDraftLine);
  const removeDraftLine = useHeft((state) => state.removeDraftLine);
  const applyTranscript = useHeft((state) => state.applyTranscript);
  const repeatClass = useHeft((state) => state.repeatClass);
  const saveDraft = useHeft((state) => state.saveDraft);
  const startNewLog = useHeft((state) => state.startNewLog);
  const addMovement = useHeft((state) => state.addMovement);

  const [listening, setListening] = useState(false);
  const [speechOk, setSpeechOk] = useState(false);
  const [speechNote, setSpeechNote] = useState("");
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [query, setQuery] = useState("");
  const visible = movements.filter((movement) => exerciseHit(movement, query));
  const more = libraryMatches(query, movements);
  const engine = useRef<SpeechEngine | null>(null);
  const field = useRef<HTMLTextAreaElement>(null);
  const heard = useRef("");

  useEffect(() => {
    setSpeechOk(getSpeechEngine() != null);
    return () => engine.current?.stop();
  }, []);

  const callout = contextCallout(draft.lines, movements);
  const readyCount = draft.lines.filter((line) => line.value > 0).length;
  const previous = lastClass(logs, draft.classKind);
  const saved = draft.savedTick > 0;
  const liveToday = today || todayIso();
  const savedBurn = workoutBurns(logs, profile).find(
    (burn) => burn.date === draft.date && burn.classKind === draft.classKind,
  );

  function toggleMic() {
    if (!speechOk) {
      setSpeechNote("This browser can't use the mic. Type the class instead.");
      field.current?.focus();
      return;
    }
    if (listening) {
      engine.current?.stop();
      setListening(false);
      return;
    }
    const next = getSpeechEngine();
    if (!next) return;
    next.lang = "en-US";
    next.continuous = true;
    next.interimResults = true;
    next.onresult = (event) => {
      let text = "";
      let latestFinal = false;
      for (let i = 0; i < event.results.length; i += 1) {
        const chunk = event.results[i];
        text += `${chunk?.[0]?.transcript ?? ""} `;
        if (i === event.results.length - 1 && chunk?.isFinal) latestFinal = true;
      }
      const cleaned = text.replace(/\s+/g, " ").trim();
      if (!cleaned) return;
      heard.current = cleaned;
      setDraft({ transcript: cleaned, error: undefined });
      if (latestFinal) applyTranscript(cleaned);
    };
    next.onerror = (event) => {
      setListening(false);
      if (event?.error === "aborted" || event?.error === "no-speech") return;
      setSpeechNote("The mic didn't catch that. You can type it.");
    };
    next.onend = () => {
      setListening(false);
      if (heard.current) applyTranscript(heard.current);
    };
    engine.current = next;
    setSpeechNote("");
    next.start();
    setListening(true);
  }

  function addNamedMovement() {
    const name = newName.trim();
    if (!name) return;
    const id = `${slugify(name)}-${Date.now().toString().slice(-4)}`;
    addMovement({
      id,
      name,
      aliases: [name.toLowerCase()],
      unit: "lb",
      increment: 5,
      order: movements.length,
    });
    setNewName("");
    window.setTimeout(() => document.getElementById(`lift-${id}`)?.focus(), 0);
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold tracking-widest text-muted" suppressHydrationWarning>
          {formatToday(parseDay(draft.date))}
        </p>
        <button
          type="button"
          onClick={() => setDateOpen((open) => !open)}
          className="text-sm font-semibold text-orange"
        >
          {dateOpen ? "Hide date" : "Change date"}
        </button>
      </div>
      {dateOpen ? (
        <input
          id="class-date"
          type="date"
          aria-label="Class date"
          value={draft.date}
          onChange={(event) => {
            if (!event.target.value) return;
            setDraft({ date: event.target.value, datePinned: true });
          }}
          className="mt-2 w-full rounded-2xl border border-line bg-card px-4 py-3 text-base"
        />
      ) : null}
      <div className="mt-1 flex items-end justify-between gap-3">
        <h1 className="text-balance">Log class</h1>
        {draft.date !== liveToday || draft.lines.length > 0 || saved ? (
          <button
            type="button"
            onClick={() => startNewLog(liveToday)}
            className="mb-1 shrink-0 text-sm font-semibold text-orange"
          >
            {draft.date === liveToday ? "Clear" : "Use today"}
          </button>
        ) : null}
      </div>
      <p className="mt-2 text-sm text-muted">Tap how each lift felt. Only those get saved.</p>

      <div className="mt-4">
        <KindToggle
          value={draft.classKind}
          onChange={(classKind) => setDraft({ classKind })}
        />
      </div>

      {previous.length > 0 ? (
        <button
          type="button"
          onClick={() => repeatClass(previous)}
          className="capsule-quiet mt-3 h-11 w-full text-sm"
        >
          Repeat last {draft.classKind} class
        </button>
      ) : null}

      <button
        type="button"
        onClick={() => setVoiceOpen((open) => !open)}
        className="mt-3 text-sm font-semibold text-orange"
      >
        {voiceOpen ? "Hide voice log" : "Say it instead"}
      </button>

      {voiceOpen ? (
        <div className="mt-3">
          <label className="block text-sm font-semibold" htmlFor="transcript">
            What you said
          </label>
          <textarea
            id="transcript"
            ref={field}
            value={draft.transcript}
            onChange={(event) => setDraft({ transcript: event.target.value, error: undefined })}
            placeholder="Deadlift 115, pretty tough. Goblet squats 35, easy."
            className="mt-1 min-h-28 w-full resize-none rounded-2xl border border-line bg-card px-4 py-3 text-base leading-relaxed"
          />
          {draft.error ? <p className="mt-2 text-sm text-orange">{draft.error}</p> : null}
          {speechNote ? <p className="mt-2 text-sm text-muted">{speechNote}</p> : null}
          <div className="mt-3 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={toggleMic}
              className={cn(
                "flex h-12 items-center justify-center gap-2 rounded-full text-sm font-semibold",
                listening ? "capsule capsule-hot" : "capsule-quiet",
              )}
            >
              <Mic className="size-4" aria-hidden="true" />
              {listening ? "Listening" : "Speak"}
            </button>
            <button
              type="button"
              onClick={() => applyTranscript(draft.transcript)}
              disabled={draft.transcript.trim().length === 0}
              className="capsule h-12 text-sm disabled:opacity-40"
            >
              Fill the list
            </button>
          </div>
          <button
            type="button"
            onClick={() => {
              setDraft({ transcript: SAMPLE_TRANSCRIPT, error: undefined });
              applyTranscript(SAMPLE_TRANSCRIPT);
            }}
            className="mt-3 text-sm font-semibold text-muted"
          >
            Try an example sentence
          </button>
        </div>
      ) : null}

      {draft.transcript && !voiceOpen ? (
        <p className="mt-3 text-sm leading-relaxed text-muted">"{draft.transcript}"</p>
      ) : null}

      <label className="mt-4 flex h-11 items-center gap-2 rounded-full border border-line bg-card px-4">
        <Search className="size-4 shrink-0 text-muted" aria-hidden="true" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search exercises"
          aria-label="Search exercises"
          className="w-full bg-transparent text-base outline-none"
        />
      </label>

      {visible.length === 0 ? (
        <p className="mt-3 text-sm text-muted">
          {query.trim() ? "Nothing in your list matches." : "No exercises yet."}
        </p>
      ) : (
      <ul className="mt-3 divide-y divide-line rounded-3xl border border-line bg-card px-4">
        {visible.map((movement) => {
          const line = draft.lines.find((item) => item.movementId === movement.id);
          const suggested = lastValue(logs, movement.id, draft.classKind);
          const shown = line?.value || suggested || 0;
          const unit = unitWord(movement);
          return (
            <li key={movement.id} className="py-3">
              <div className="flex items-baseline justify-between gap-3">
                <WorkoutName movement={movement} />
                <p className="shrink-0 text-sm text-muted">
                  {line && line.value > 0 ? "In this class" : suggested ? `Last ${suggested} ${unit}` : "New"}
                </p>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  aria-label={`Decrease ${movement.name}`}
                  onClick={() => {
                    const next = Math.max(0, shown - movement.increment);
                    if (next <= 0) removeDraftLine(movement.id);
                    else upsertDraftLine(movement.id, { value: next, effort: line?.effort ?? "just-right" });
                  }}
                  className="flex size-11 items-center justify-center rounded-xl bg-just-soft"
                >
                  <Minus className="size-4" aria-hidden="true" />
                </button>
                <input
                  id={`lift-${movement.id}`}
                  aria-label={`${movement.name} weight`}
                  inputMode="numeric"
                  value={line ? line.value || "" : suggested ?? ""}
                  placeholder="0"
                  onChange={(event) => {
                    const value = Number(event.target.value.replace(/[^\d]/g, ""));
                    if (value <= 0) removeDraftLine(movement.id);
                    else upsertDraftLine(movement.id, { value, effort: line?.effort ?? "just-right" });
                  }}
                  className={cn(
                    "h-11 w-20 rounded-xl border border-line bg-paper text-center text-lg font-semibold tabular-nums",
                    line && line.value > 0 ? "text-ink" : "text-muted",
                  )}
                />
                <span className="text-sm font-semibold text-muted">{unit}</span>
                <button
                  type="button"
                  aria-label={`Increase ${movement.name}`}
                  onClick={() =>
                    upsertDraftLine(movement.id, {
                      value: shown + movement.increment,
                      effort: line?.effort ?? "just-right",
                    })
                  }
                  className="flex size-11 items-center justify-center rounded-xl bg-just-soft"
                >
                  <Plus className="size-4" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-1 rounded-xl bg-just-soft p-1">
                {EFFORTS.map((effort) => {
                  const active = Boolean(line && line.value > 0 && line.effort === effort);
                  return (
                    <button
                      key={effort}
                      type="button"
                      onClick={() => {
                        if (active) {
                          removeDraftLine(movement.id);
                          return;
                        }
                        const value = line?.value || suggested || 0;
                        if (value <= 0) {
                          document.getElementById(`lift-${movement.id}`)?.focus();
                          return;
                        }
                        upsertDraftLine(movement.id, { effort, value });
                      }}
                      className={cn(
                        "h-11 rounded-lg text-sm font-semibold",
                        active
                          ? effort === "easy"
                            ? "bg-coral text-on-orange"
                            : effort === "hard"
                              ? "bg-navy text-on-navy"
                              : "bg-just text-ink"
                          : "text-ink",
                      )}
                    >
                      {effortLabel(effort)}
                    </button>
                  );
                })}
              </div>
              {line?.context ? (
                <p className="mt-2 text-sm text-muted">Context: {CONTEXTS[line.context].chip}</p>
              ) : null}
            </li>
          );
        })}
      </ul>
      )}

      {more.length > 0 ? (
        <ul className="mt-3 divide-y divide-line rounded-3xl border border-line bg-card px-4">
          {more.map((movement) => (
            <li key={movement.id} className="flex items-center justify-between gap-3 py-3">
              <span className="min-w-0">
                <WorkoutName movement={movement} />
                <span className="text-sm text-muted">In the exercise library</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  addMovement({ ...movement, order: movements.length + movement.order });
                  upsertDraftLine(movement.id, { value: 0, effort: "just-right" });
                }}
                className="capsule-quiet h-9 px-4 text-xs"
              >
                Add
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {callout ? <p className="mt-3 text-sm leading-relaxed text-muted">{callout}</p> : null}

      <form
        className="mt-4 flex gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          addNamedMovement();
        }}
      >
        <input
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
          placeholder="Add a movement"
          aria-label="New movement name"
          className="min-w-0 flex-1 rounded-xl border border-line bg-card px-3 py-3 text-base"
        />
        <button type="submit" className="rounded-xl bg-card px-4 text-sm font-semibold shadow-sm">
          Add
        </button>
      </form>

      <div className="sticky bottom-0 -mx-5 mt-4 border-t border-line bg-paper px-5 py-3">
        <button
          type="button"
          onClick={saveDraft}
          disabled={readyCount === 0}
          className="capsule flex h-12 w-full items-center justify-center gap-2 text-sm disabled:opacity-40"
        >
          {saved ? <Check className="size-4" aria-hidden="true" /> : null}
          {saved ? "Saved" : readyCount > 0 ? `Save ${readyCount}` : "Save class"}
        </button>
        {saved ? (
          <p className="mt-2 text-center text-sm text-muted">
            {savedBurn ? `About ${savedBurn.kcal} kcal. Saved for today.` : "Saved for today."}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function KindToggle({ value, onChange }: { value: ClassKind; onChange: (kind: ClassKind) => void }) {
  return (
    <div className="grid grid-cols-2 rounded-2xl bg-just-soft p-1">
      {(["strength", "cardio"] as const).map((kind) => (
        <button
          key={kind}
          type="button"
          onClick={() => onChange(kind)}
          className={cn(
            "h-11 rounded-xl text-sm font-semibold capitalize",
            value === kind ? "bg-card text-ink shadow-sm" : "text-muted",
          )}
        >
          {kind}
        </button>
      ))}
    </div>
  );
}
