import { CSSProperties, ReactNode } from "react";

/** Infinite horizontal ticker. Pauses on hover; stops for reduced-motion users. */
export default function Marquee({
  children,
  duration = 45,
  reverse = false,
  className = "",
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={`group relative overflow-hidden mask-fade-x ${className}`}>
      <div
        className={`flex w-max animate-marquee group-hover:[animation-play-state:paused] ${
          reverse ? "[animation-direction:reverse]" : ""
        }`}
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        <div className="flex shrink-0 items-center gap-3 pr-3">{children}</div>
        <div className="flex shrink-0 items-center gap-3 pr-3" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
