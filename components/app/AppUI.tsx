"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/components/site/motion";

/** Serif page title with optional tag, subtitle and actions. */
export function PageHeader({
  tag,
  title,
  subtitle,
  actions,
}: {
  tag?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-6 md:mb-10 md:flex-row md:items-end md:justify-between">
      <div>
        {tag && (
          <span className="mb-5 inline-flex rounded-md bg-tile-2 px-2.5 py-1 text-[13px] text-ink">
            {tag}
          </span>
        )}
        <h1 className="font-serif-display text-[38px] leading-[1.05] text-ink sm:text-[48px]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 max-w-[560px] text-[15.5px] leading-[1.55] text-ink-soft">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
    </div>
  );
}

const tones = {
  periwinkle: "bg-tile-1",
  mist: "bg-tile-2",
  haze: "bg-tile-3",
  warm: "bg-tile-warm",
  "warm-soft": "bg-tile-warm-soft",
  ink: "bg-ink text-white",
  card: "bg-card ring-1 ring-inset ring-line",
} as const;

export type Tone = keyof typeof tones;

/** Flat content block. Use "card" for tables and lists, pastel tones for highlights. */
export function Panel({
  children,
  tone = "card",
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className={`rounded-2xl text-ink ${tones[tone]} ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function PanelHeader({
  title,
  subtitle,
  action,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 px-6 pb-4 pt-6 sm:px-7">
      <div>
        <h2 className="text-[19px] tracking-[-0.02em]">{title}</h2>
        {subtitle && <p className="mt-1 text-[14px] text-ink-soft">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatTile({
  label,
  value,
  hint,
  icon,
  tone = "haze",
  delay = 0,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  icon?: ReactNode;
  tone?: Tone;
  delay?: number;
}) {
  return (
    <Panel tone={tone} delay={delay} className="flex min-h-[168px] flex-col justify-between p-6">
      <div className="flex items-center justify-between gap-3">
        <span className={`text-[14px] ${tone === "ink" ? "text-white/70" : "text-ink-soft"}`}>
          {label}
        </span>
        {icon && <span className="[&>svg]:size-[18px] [&>svg]:stroke-[1.5]">{icon}</span>}
      </div>
      <div>
        <div className="font-serif-display text-[44px] leading-none tracking-[-0.02em]">{value}</div>
        {hint && (
          <div className={`mt-2 text-[13px] ${tone === "ink" ? "text-white/60" : "text-ink-mute"}`}>
            {hint}
          </div>
        )}
      </div>
    </Panel>
  );
}

const badgeTones = {
  neutral: "bg-paper-deep text-ink-soft",
  info: "bg-tile-2 text-ink",
  success: "bg-emerald-50 text-emerald-800",
  warning: "bg-amber-50 text-amber-800",
  danger: "bg-red-50 text-red-700",
} as const;

export function Badge({
  children,
  tone = "neutral",
  className = "",
}: {
  children: ReactNode;
  tone?: keyof typeof badgeTones;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[12px] leading-5 ${badgeTones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export function EmptyState({
  icon,
  title,
  children,
  action,
}: {
  icon?: ReactNode;
  title: string;
  children?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      {icon && (
        <span className="grid size-12 place-items-center rounded-xl bg-tile-3 text-ink [&>svg]:size-5 [&>svg]:stroke-[1.5]">
          {icon}
        </span>
      )}
      <h3 className="mt-5 text-[18px] tracking-[-0.02em]">{title}</h3>
      {children && <p className="mt-2 max-w-[360px] text-[14px] text-ink-soft">{children}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function Spinner({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block size-6 animate-spin rounded-full border-2 border-ink/15 border-t-ink ${className}`}
    />
  );
}

/** Table helpers so every data table reads the same. */
export const table = {
  wrap: "overflow-x-auto",
  table: "w-full min-w-[640px] text-left text-[14px] [&_tbody_tr:last-child_td]:border-b-0",
  th: "border-b border-line px-6 py-3 text-[12.5px] font-normal text-ink-mute sm:px-7",
  td: "border-b border-line px-6 py-4 text-ink sm:px-7",
  row: "transition-colors hover:bg-paper",
};

/** Segmented control with a sliding highlight. */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  id,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  id: string;
}) {
  return (
    <div className="inline-flex flex-wrap rounded-[10px] bg-tile-3 p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={`relative rounded-lg px-3.5 py-1.5 text-[14px] transition-colors duration-300 ${
            value === o.value ? "text-white" : "text-ink hover:opacity-70"
          }`}
        >
          {value === o.value && (
            <motion.span
              layoutId={id}
              className="absolute inset-0 rounded-lg bg-ink"
              transition={{ type: "spring", stiffness: 420, damping: 36 }}
            />
          )}
          <span className="relative">{o.label}</span>
        </button>
      ))}
    </div>
  );
}

/** Numbered pager with a 5-page window. */
export function Pager({
  page,
  pages,
  total,
  limit,
  onPage,
}: {
  page: number;
  pages: number;
  total: number;
  limit: number;
  onPage: (p: number) => void;
}) {
  if (pages <= 1) return null;
  const windowStart = pages <= 5 ? 1 : page <= 3 ? 1 : page >= pages - 2 ? pages - 4 : page - 2;
  const nums = Array.from({ length: Math.min(5, pages) }, (_, i) => windowStart + i);
  const btn =
    "grid size-9 place-items-center rounded-lg text-[13.5px] transition-colors disabled:cursor-not-allowed disabled:opacity-30";
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 sm:px-7">
      <div className="text-[13px] text-ink-mute">
        Showing {(page - 1) * limit + 1}–{Math.min(page * limit, total)} of {total}
      </div>
      <div className="flex items-center gap-1">
        <button
          aria-label="Previous page"
          onClick={() => onPage(Math.max(1, page - 1))}
          disabled={page === 1}
          className={`${btn} text-ink hover:bg-ink/[0.05]`}
        >
          ‹
        </button>
        {nums.map((n) => (
          <button
            key={n}
            onClick={() => onPage(n)}
            className={`${btn} ${page === n ? "bg-ink text-white" : "text-ink hover:bg-ink/[0.05]"}`}
          >
            {n}
          </button>
        ))}
        <button
          aria-label="Next page"
          onClick={() => onPage(Math.min(pages, page + 1))}
          disabled={page === pages}
          className={`${btn} text-ink hover:bg-ink/[0.05]`}
        >
          ›
        </button>
      </div>
    </div>
  );
}
