import { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "secondary" | "light" | "outline-light" | "ghost";
type Size = "sm" | "md" | "lg";

type Props = {
  children: ReactNode;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  arrow?: boolean;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
};

const base =
  "group/btn relative inline-flex select-none items-center justify-center gap-2.5 whitespace-nowrap rounded-[10px] font-normal tracking-[-0.01em] " +
  "transition-[background-color,color,box-shadow] duration-300 ease-soft " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-offset-2 focus-visible:ring-offset-paper " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-white hover:bg-ink-hover",
  secondary: "bg-card text-ink ring-1 ring-inset ring-line hover:ring-line-strong hover:bg-white",
  light: "bg-white text-ink hover:bg-paper",
  "outline-light": "text-white ring-1 ring-inset ring-white/30 hover:bg-white/10",
  ghost: "text-ink hover:bg-ink/[0.05]",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[14.5px]",
  md: "h-12 px-5 text-[15px]",
  lg: "h-14 px-6 text-[16px]",
};

export default function SiteButton({
  children,
  href,
  external,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  icon,
  arrow,
  disabled,
  loading,
  className = "",
}: Props) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const content = (
    <>
      {loading ? (
        <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        icon && <span className="-ml-0.5 flex shrink-0 [&>svg]:size-[18px]">{icon}</span>
      )}
      <span>{children}</span>
      {arrow && !loading && (
        <ArrowRight
          aria-hidden
          strokeWidth={1.5}
          className="-mr-0.5 size-[18px] shrink-0 transition-transform duration-300 ease-soft group-hover/btn:translate-x-1"
        />
      )}
    </>
  );

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }
  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
    >
      {content}
    </button>
  );
}

/** Oversized dark call-to-action block with a long arrow. */
export function CtaBar({
  children,
  href,
  external,
  icon,
  tone = "ink",
  className = "",
}: {
  children: ReactNode;
  href: string;
  external?: boolean;
  icon?: ReactNode;
  tone?: "ink" | "white";
  className?: string;
}) {
  const classes = `group/cta flex min-h-[84px] items-center justify-between gap-6 whitespace-nowrap rounded-2xl px-7 py-5 text-[19px] tracking-[-0.015em] transition-colors duration-500 ease-soft sm:px-9 sm:text-[21px] ${
    tone === "ink"
      ? "bg-ink text-white hover:bg-ink-hover"
      : "bg-white text-ink ring-1 ring-inset ring-line hover:ring-line-strong"
  } ${className}`;
  const arrow = (
    <svg
      aria-hidden
      viewBox="0 0 48 48"
      fill="none"
      className="size-9 shrink-0 transition-transform duration-500 ease-soft group-hover/cta:translate-x-1.5 sm:size-10"
    >
      <path
        d="M6 24h34M27 11l13 13-13 13"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        <span className="flex items-center gap-3">
          {icon}
          {children}
        </span>
        {arrow}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      <span className="flex items-center gap-3">
        {icon}
        {children}
      </span>
      {arrow}
    </Link>
  );
}
