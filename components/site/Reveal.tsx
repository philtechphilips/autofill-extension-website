"use client";

import { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { DURATION, EASE, VIEWPORT } from "./motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** "view" reveals on scroll; "mount" plays immediately (above-the-fold content). */
  trigger?: "view" | "mount";
};

/** Fade + rise. Content starts faint rather than invisible, then settles to full ink. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 22,
  trigger = "view",
}: RevealProps) {
  const target = { opacity: 1, y: 0 };
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0.12, y }}
      {...(trigger === "mount"
        ? { animate: target }
        : { whileInView: target, viewport: VIEWPORT })}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Tile entrance: a soft scale-and-fade, used for blocks in bento grids. */
export function TileReveal({
  children,
  className,
  delay = 0,
  trigger = "view",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  trigger?: "view" | "mount";
}) {
  const target = { opacity: 1, scale: 1, y: 0 };
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.985, y: 16 }}
      {...(trigger === "mount"
        ? { animate: target }
        : { whileInView: target, viewport: VIEWPORT })}
      transition={{ duration: DURATION.slow, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

const groupVariants = (gap: number, delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base + 0.2, ease: EASE },
  },
};

export function Stagger({
  children,
  className,
  gap = 0.08,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={groupVariants(gap, delay)}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
