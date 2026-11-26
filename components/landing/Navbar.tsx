"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useAuthStore } from "@/store/authStore";
import { Container, Wordmark } from "@/components/site/Primitives";
import SiteButton from "@/components/site/SiteButton";
import { EASE } from "@/components/site/motion";

const links = [
  { label: "How it works", href: "/#how" },
  { label: "Features", href: "/#features" },
  { label: "Security", href: "/#security" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
];

export default function Navbar() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 8);
    if (y > 600 && y > prev + 2 && !open) setHidden(true);
    if (y < prev - 2) setHidden(false);
  });

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ y: hidden ? "-100%" : "0%", opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`transition-[background-color,backdrop-filter] duration-500 ${
          scrolled || open ? "bg-paper/90 backdrop-blur-xl" : "bg-paper/0"
        }`}
      >
        <Container className="flex h-[72px] items-center justify-between gap-6 md:h-[84px]">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
          >
            <Wordmark />
          </Link>

          <nav
            aria-label="Main"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative py-1 text-[15px] text-ink transition-opacity hover:opacity-70"
              >
                {l.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-ink transition-transform duration-500 ease-soft group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <SiteButton href="/dashboard" size="sm" arrow>
                Dashboard
              </SiteButton>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden px-3 py-2 text-[15px] text-ink transition-opacity hover:opacity-70 sm:inline-flex"
                >
                  Sign in
                </Link>
                <SiteButton href="/register" size="sm">
                  Get started
                </SiteButton>
              </>
            )}
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="ml-1 grid size-10 place-items-center rounded-[10px] text-ink transition-colors hover:bg-ink/[0.05] lg:hidden"
            >
              <span className="relative block h-3 w-[18px]">
                <motion.span
                  className="absolute left-0 top-0 h-[1.5px] w-full rounded-full bg-current"
                  animate={open ? { y: 5.25, rotate: 45 } : { y: 0, rotate: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                />
                <motion.span
                  className="absolute bottom-0 left-0 h-[1.5px] w-full rounded-full bg-current"
                  animate={open ? { y: -5.25, rotate: -45 } : { y: 0, rotate: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                />
              </span>
            </button>
          </div>
        </Container>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden bg-paper lg:hidden"
          >
            <Container className="flex flex-col pb-8">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.04 * i }}
                  className="border-b border-line py-4 font-serif-display text-[28px] text-ink"
                >
                  {l.label}
                </motion.a>
              ))}
              {!isAuthenticated && (
                <SiteButton href="/login" variant="secondary" className="mt-6 w-full">
                  Sign in
                </SiteButton>
              )}
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
