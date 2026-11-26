"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { EASE } from "./motion";

/** Number that counts up from zero the first time it scrolls into view. */
export default function CountUp({
  to,
  duration = 1.8,
  prefix = "",
  suffix = "",
}: {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!inView || !node) return;
    const format = (v: number) => `${prefix}${Math.round(v).toLocaleString()}${suffix}`;

    if (reduce) {
      node.textContent = format(to);
      return;
    }

    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => {
        node.textContent = format(v);
      },
    });
    return () => controls.stop();
  }, [inView, reduce, to, duration, prefix, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      {`${prefix}0${suffix}`}
    </span>
  );
}
