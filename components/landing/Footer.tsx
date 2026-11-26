"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Twitter } from "lucide-react";
import BrowserCtas from "@/components/site/BrowserCtas";
import { TileReveal } from "@/components/site/Reveal";
import { Container, Wordmark } from "@/components/site/Primitives";
import { EASE, GITHUB_URL, X_URL } from "@/components/site/motion";

const columns = {
  Product: [
    { name: "How it works", href: "/#how" },
    { name: "Features", href: "/#features" },
    { name: "Pricing", href: "/#pricing" },
    { name: "FAQ", href: "/#faq" },
  ],
  Company: [
    { name: "Contact", href: "/contact" },
    { name: "Security", href: "/#security" },
    { name: "Sign in", href: "/login" },
    { name: "Create account", href: "/register" },
  ],
};

const socials = [
  { name: "X", href: X_URL, icon: Twitter },
  { name: "GitHub", href: GITHUB_URL, icon: Github },
];

/** Field outlines that draw themselves in, then fill. */
function FieldArt() {
  const rows = [
    { y: 34, w: 250 },
    { y: 92, w: 320 },
    { y: 150, w: 210 },
    { y: 208, w: 290 },
  ];
  return (
    <svg viewBox="0 0 440 276" className="h-full w-full text-ink" preserveAspectRatio="xMidYMid meet" aria-hidden>
      {rows.map((r, i) => (
        <g key={r.y}>
          <motion.rect
            x={60}
            y={r.y}
            width={r.w}
            height={34}
            rx={8}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: EASE, delay: i * 0.15 }}
          />
          <motion.rect
            x={68}
            y={r.y + 13}
            height={8}
            rx={4}
            fill="currentColor"
            initial={{ width: 0 }}
            whileInView={{ width: r.w * 0.55 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.3 + i * 0.2 }}
          />
        </g>
      ))}
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="pb-6 pt-16 md:pt-24">
      <Container>
        <div className="grid gap-4 lg:grid-cols-[58fr_42fr] lg:gap-5">
          {/* Closing CTA */}
          <div className="flex flex-col gap-4 lg:gap-5">
            <TileReveal className="flex flex-1 flex-col justify-between gap-16 rounded-2xl bg-tile-2 p-8 sm:p-11">
              <h2 className="font-serif-display text-[48px] leading-[1.02] text-ink sm:text-[72px]">
                Your next form
                <br />
                fills itself.
              </h2>
              <p className="max-w-[420px] text-[15px] leading-[1.55] text-ink">
                Install in under a minute and start with free credits. No card needed, no
                subscription, and your credits never expire.
              </p>
            </TileReveal>
            <TileReveal delay={0.1}>
              <BrowserCtas />
            </TileReveal>
          </div>

          {/* Art + links */}
          <div className="flex flex-col gap-4 lg:gap-5">
            <TileReveal delay={0.15} className="h-[220px] overflow-hidden rounded-2xl bg-tile-warm sm:h-[270px]">
              <FieldArt />
            </TileReveal>
            <TileReveal delay={0.25} className="flex-1 rounded-2xl bg-tile-1 p-8 sm:p-10">
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
                {Object.entries(columns).map(([title, links]) => (
                  <div key={title}>
                    <h4 className="text-[14px] text-ink-soft">{title}</h4>
                    <ul className="mt-4 space-y-2.5">
                      {links.map((l) => (
                        <li key={l.name}>
                          <a href={l.href} className="text-[15px] text-ink transition-opacity hover:opacity-60">
                            {l.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div>
                  <h4 className="text-[14px] text-ink-soft">Social</h4>
                  <ul className="mt-4 space-y-2.5">
                    {socials.map(({ name, href, icon: Icon }) => (
                      <li key={name}>
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[15px] text-ink transition-opacity hover:opacity-60"
                        >
                          <Icon className="size-4" strokeWidth={1.5} />
                          {name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-12">
                <Link href="/" aria-label="AutoFill AI home">
                  <Wordmark size={30} />
                </Link>
              </div>
            </TileReveal>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 px-1 text-[13px] text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-ink">
              Privacy policy
            </Link>
            <Link href="/terms" className="hover:text-ink">
              Terms of service
            </Link>
          </div>
          <p>© {year} AutoFill Labs Inc. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
