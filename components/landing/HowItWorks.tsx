"use client";

import { ReactNode } from "react";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Reveal";
import { Narrow, Tag } from "@/components/site/Primitives";

const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.25,
  fill: "none",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const icons: Record<string, ReactNode> = {
  profile: (
    <svg viewBox="0 0 64 64" className="size-16">
      <rect x="14" y="6" width="36" height="52" rx="3" {...stroke} />
      <circle cx="32" cy="22" r="6" {...stroke} />
      <path d="M22 38h20M22 44h20M22 50h12" {...stroke} />
    </svg>
  ),
  form: (
    <svg viewBox="0 0 64 64" className="size-16">
      <rect x="4" y="10" width="56" height="44" rx="3" {...stroke} />
      <path d="M4 18h56" {...stroke} />
      <rect x="11" y="25" width="42" height="7" rx="1.5" {...stroke} />
      <rect x="11" y="37" width="42" height="7" rx="1.5" {...stroke} />
      <path d="M11 49h14" {...stroke} />
    </svg>
  ),
  click: (
    <svg viewBox="0 0 64 64" className="size-16">
      <rect x="6" y="14" width="40" height="16" rx="3" {...stroke} />
      <path d="M14 22h16" {...stroke} />
      <path d="M34 26l16 34 4-12 12-4-32-18Z" {...stroke} />
      <path d="M40 6v4M52 10l-3 3M28 10l3 3" {...stroke} />
    </svg>
  ),
};

const steps = [
  {
    icon: "profile",
    title: "Build your profile once.",
    body: "Upload your resume. AutoFill AI turns it into a complete profile you can use on any site.",
    tone: "bg-tile-3",
  },
  {
    icon: "form",
    title: "Open any form.",
    body: "The extension reads the page and works out what each field is asking for, even with unusual labels.",
    tone: "bg-tile-2",
  },
  {
    icon: "click",
    title: "Fill it in one click.",
    body: "Press Fill or use the shortcut. Check the result, edit anything, or undo it all in one keystroke.",
    tone: "bg-tile-1",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-24 md:py-36">
      <Narrow>
        <Reveal>
          <Tag>How it works</Tag>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 font-serif-display text-[42px] leading-[1.08] text-ink sm:text-[60px]">
            Set it up once,
            <br />
            then fill forever.
          </h2>
        </Reveal>

        <Stagger className="mt-14 grid gap-4 md:mt-16 md:grid-cols-3 md:gap-5" gap={0.12}>
          {steps.map((s) => (
            <StaggerItem key={s.title}>
              <div
                className={`flex h-full min-h-[340px] flex-col rounded-2xl p-8 text-ink sm:p-10 ${s.tone}`}
              >
                <div className="text-ink">{icons[s.icon]}</div>
                <h3 className="mt-auto pt-12 text-[26px] leading-[1.15] tracking-[-0.02em]">
                  {s.title}
                </h3>
                <p className="mt-5 text-[14.5px] leading-[1.55]">{s.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Narrow>
    </section>
  );
}
