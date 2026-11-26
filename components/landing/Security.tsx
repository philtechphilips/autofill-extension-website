"use client";

import { Check } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Reveal";
import { Narrow, Tag } from "@/components/site/Primitives";

const items = [
  "Your profile is encrypted with AES-256 before it ever leaves your browser.",
  "Zero-knowledge sync across devices, so we can’t read what you’ve saved.",
  "Anonymous analytics. We measure fill success rates, not people, and you can opt out.",
  "Built on open standards, with a security review before every release ships.",
  "The core engine is open source on GitHub for anyone to inspect.",
  "If a fill isn’t right, one undo restores every field to how it was.",
];

export default function Security() {
  return (
    <section id="security" className="py-24 md:py-36">
      <Narrow className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
        <div>
          <Reveal>
            <Tag>Security and privacy</Tag>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-serif-display text-[42px] leading-[1.08] text-ink sm:text-[60px]">
              Privacy you can
              <br />
              count on
            </h2>
          </Reveal>
        </div>

        <Stagger className="grid gap-x-8 gap-y-12 sm:grid-cols-2" gap={0.08}>
          {items.map((text) => (
            <StaggerItem key={text}>
              <span className="grid size-7 place-items-center rounded-md bg-ink text-white">
                <Check className="size-4" strokeWidth={2.25} />
              </span>
              <p className="mt-5 max-w-[260px] text-[15px] leading-[1.5] text-ink">{text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Narrow>
    </section>
  );
}
