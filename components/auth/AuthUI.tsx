"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Check, X } from "lucide-react";
import { EASE } from "@/components/site/motion";

export function AuthHeading({ title, subtitle }: { title: string; subtitle?: ReactNode }) {
  return (
    <div>
      <h1 className="font-serif-display text-[40px] leading-[1.05] text-ink sm:text-[48px]">
        {title}
      </h1>
      {subtitle && <p className="mt-3 text-[15.5px] leading-[1.55] text-ink-soft">{subtitle}</p>}
    </div>
  );
}

export function AuthError({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="flex items-start gap-3 rounded-[10px] bg-red-50 p-4 text-[14px] text-red-700 ring-1 ring-inset ring-red-100"
    >
      <AlertCircle className="mt-0.5 size-4 shrink-0" />
      <span>{children}</span>
    </motion.div>
  );
}

/** Success / failure confirmation used after a submit. */
export function AuthStatus({
  tone,
  title,
  children,
  action,
}: {
  tone: "success" | "error";
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <span
        className={`grid size-11 place-items-center rounded-[10px] ${
          tone === "success" ? "bg-ink text-white" : "bg-red-100 text-red-700"
        }`}
      >
        {tone === "success" ? (
          <Check className="size-5" strokeWidth={2.25} />
        ) : (
          <X className="size-5" strokeWidth={2.25} />
        )}
      </span>
      <h1 className="mt-7 font-serif-display text-[40px] leading-[1.05] text-ink">{title}</h1>
      <p className="mt-3 text-[15.5px] leading-[1.55] text-ink-soft">{children}</p>
      {action && <div className="mt-9">{action}</div>}
    </motion.div>
  );
}

export function AuthSpinner() {
  return (
    <div className="flex justify-center py-16">
      <span className="size-7 animate-spin rounded-full border-2 border-ink/15 border-t-ink" />
    </div>
  );
}
