"use client";

import { ReactNode, useEffect } from "react";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      lerp: 0.11,
      wheelMultiplier: 0.95,
    });

    return () => lenis.destroy();
  }, []);

  return null;
}

/** Wraps every public page: light theme, smooth scroll, reduced-motion aware. */
export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      <div className="site relative min-h-screen w-full overflow-x-clip antialiased">
        {children}
      </div>
    </MotionConfig>
  );
}
