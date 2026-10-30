import { useEffect, type ReactNode } from "react";

type SheetProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export function Sheet({ open, title, onClose, children }: SheetProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center">
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        aria-label="Close"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="sheet-rise relative z-10 max-h-[85dvh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-card px-5 pt-3 pb-8 shadow-xl"
      >
        <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-coral shadow-[0_0_10px_2px_rgba(8,122,136,0.55)]" />
        <h2 className="text-lg">{title}</h2>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
