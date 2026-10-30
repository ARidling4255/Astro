import { useState } from "react";
import { Sheet } from "@/components/fitness/sheet";
import { demoFor } from "@/lib/fitness/demos";
import type { Movement } from "@/lib/fitness/types";

type WorkoutNameProps = {
  movement: Pick<Movement, "id" | "name">;
  className?: string;
};

export function WorkoutName({ movement, className }: WorkoutNameProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          setOpen(true);
        }}
        className={className ?? "block text-left font-semibold underline decoration-line decoration-1 underline-offset-4"}
      >
        {movement.name}
      </button>
      <HowToSheet movement={movement} open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export function HowToSheet({
  movement,
  open,
  onClose,
}: {
  movement: Pick<Movement, "id" | "name">;
  open: boolean;
  onClose: () => void;
}) {
  const demo = demoFor(movement);
  return (
    <Sheet open={open} title={movement.name} onClose={onClose}>
      <p className="text-sm leading-relaxed text-muted">{demo.focus}</p>
      <h3 className="mt-5 text-sm font-semibold normal-case tracking-normal">Set up</h3>
      <p className="mt-1 text-sm leading-relaxed">{demo.setup}</p>
      <h3 className="mt-5 text-sm font-semibold normal-case tracking-normal">Do it</h3>
      <ol className="mt-2 space-y-2">
        {demo.steps.map((step, index) => (
          <li key={step} className="flex gap-3 text-sm leading-relaxed">
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-orange-soft text-xs font-semibold text-orange">
              {index + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
      <h3 className="mt-5 text-sm font-semibold normal-case tracking-normal">A clean example</h3>
      <p className="mt-1 text-sm leading-relaxed">{demo.example}</p>
      <h3 className="mt-5 text-sm font-semibold normal-case tracking-normal">Easy to miss</h3>
      <p className="mt-1 text-sm leading-relaxed">{demo.miss}</p>
    </Sheet>
  );
}
