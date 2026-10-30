export function Starburst({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path fill="currentColor" d="M32 2 36.2 25.2 60 32 36.2 38.8 32 62 27.8 38.8 4 32 27.8 25.2Z" />
      <path
        fill="currentColor"
        opacity="0.8"
        d="M32 16 34 28.5 46 32 34 35.5 32 48 30 35.5 18 32 30 28.5Z"
        transform="rotate(35 32 32)"
      />
    </svg>
  );
}

export function AtomOrbit({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <ellipse cx="60" cy="60" rx="52" ry="18" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <ellipse
        cx="60"
        cy="60"
        rx="52"
        ry="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        transform="rotate(60 60 60)"
      />
      <ellipse
        cx="60"
        cy="60"
        rx="52"
        ry="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        transform="rotate(120 60 60)"
      />
      <circle cx="60" cy="60" r="5" fill="currentColor" />
    </svg>
  );
}

export function PlanetScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 140" className={className} aria-hidden="true">
      <path
        d="M8 36c22 4 38 16 48 32"
        fill="none"
        stroke="#087a88"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M8 36c22 4 38 16 48 32"
        fill="none"
        stroke="#f4c400"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M14 30c16 8 30 16 42 30"
        fill="none"
        stroke="#d31270"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.85"
      />
      <circle cx="62" cy="72" r="7" fill="#d31270" />
      <circle cx="62" cy="72" r="3" fill="#ffffff" />
      <circle cx="118" cy="78" r="34" fill="#087a88" />
      <path d="M90 66c10-16 36-22 52-10 4 16-8 28-24 30-16-6-28-8-28-20Z" fill="#14b4c2" opacity="0.55" />
      <ellipse
        cx="118"
        cy="78"
        rx="58"
        ry="14"
        fill="none"
        stroke="#087a88"
        strokeWidth="7"
        transform="rotate(-28 118 78)"
      />
      <ellipse
        cx="118"
        cy="78"
        rx="58"
        ry="14"
        fill="none"
        stroke="#f4c400"
        strokeWidth="3.5"
        transform="rotate(-28 118 78)"
      />
      <ellipse
        cx="118"
        cy="78"
        rx="58"
        ry="14"
        fill="none"
        stroke="#d31270"
        strokeWidth="1.4"
        transform="rotate(-28 118 78)"
      />
      <path fill="#f4c400" d="M36 104 37.4 108.2 41.6 109.6 37.4 111 36 115.2 34.6 111 30.4 109.6 34.6 108.2Z" />
      <path fill="#087a88" d="M156 28 157 31.2 160.2 32.2 157 33.2 156 36.4 155 33.2 151.8 32.2 155 31.2Z" />
    </svg>
  );
}

export function OrbitDivider() {
  return (
    <div className="my-8 flex items-center gap-3" aria-hidden="true">
      <span className="h-px flex-1 bg-line" />
      <AtomOrbit className="size-8 text-orange" />
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
