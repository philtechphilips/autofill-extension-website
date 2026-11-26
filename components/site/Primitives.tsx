import { ReactNode } from "react";

/** Full-bleed layout width used for tiles and bento grids. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-9 ${className}`}>
      {children}
    </div>
  );
}

/** Inset reading column used for text-led sections. */
export function Narrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1088px] px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export type TileTone =
  | "periwinkle"
  | "mist"
  | "haze"
  | "warm"
  | "warm-soft"
  | "ink"
  | "card"
  | "paper";

export const tileTone: Record<TileTone, string> = {
  periwinkle: "bg-tile-1 text-ink",
  mist: "bg-tile-2 text-ink",
  haze: "bg-tile-3 text-ink",
  warm: "bg-tile-warm text-ink",
  "warm-soft": "bg-tile-warm-soft text-ink",
  ink: "bg-ink text-white",
  card: "bg-card text-ink ring-1 ring-inset ring-line",
  paper: "bg-paper text-ink ring-1 ring-inset ring-line",
};

/** Flat, borderless block. The core building unit of every layout. */
export function Tile({
  children,
  tone = "mist",
  className = "",
}: {
  children?: ReactNode;
  tone?: TileTone;
  className?: string;
}) {
  return <div className={`rounded-2xl ${tileTone[tone]} ${className}`}>{children}</div>;
}

/** Small squared label that sits above headings. */
export function Tag({
  children,
  tone = "mist",
  className = "",
}: {
  children: ReactNode;
  tone?: "mist" | "white" | "warm" | "ink";
  className?: string;
}) {
  const tones = {
    mist: "bg-tile-2 text-ink",
    white: "bg-white text-ink",
    warm: "bg-tile-warm text-ink",
    ink: "bg-white/12 text-white",
  };
  return (
    <span
      className={`inline-flex items-center rounded-md px-2.5 py-1 text-[14px] leading-none tracking-[-0.005em] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/**
 * Brand mark: a navy tile holding two filled "form lines" and a third line
 * still being typed, with a periwinkle caret. Drawn in SVG so it stays crisp.
 */
export function LogoMark({
  size = 30,
  animated = false,
  className = "",
}: {
  size?: number;
  animated?: boolean;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden
      className={`shrink-0 ${className}`}
    >
      <rect width="32" height="32" rx="9" fill="#0f1b3d" />
      <rect x="7.5" y="8.5" width="17" height="3.2" rx="1.6" fill="#ffffff" />
      <rect x="7.5" y="14.4" width="12.5" height="3.2" rx="1.6" fill="#ffffff" />
      <rect x="7.5" y="20.3" width="6.5" height="3.2" rx="1.6" fill="#c9d3f8" />
      <rect
        x="16"
        y="19.1"
        width="1.8"
        height="5.6"
        rx="0.9"
        fill="#c9d3f8"
        className={animated ? "animate-caret" : undefined}
      />
    </svg>
  );
}

export function Wordmark({ size = 32, animated = true }: { size?: number; animated?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark size={size} animated={animated} />
      <span className="text-[18px] font-semibold leading-none tracking-[-0.03em] text-ink">
        AutoFill AI
      </span>
    </span>
  );
}

export function Keycap({
  children,
  size = "md",
  className = "",
}: {
  children: ReactNode;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <kbd
      className={`inline-flex items-center justify-center rounded-lg bg-card font-display font-medium text-ink ring-1 ring-inset ring-line shadow-[inset_0_-2px_0_var(--color-line)] ${
        size === "sm" ? "h-7 min-w-7 px-1.5 text-[12px]" : "h-10 min-w-10 px-2.5 text-[14px]"
      } ${className}`}
    >
      {children}
    </kbd>
  );
}
