"use client";

import { CSSProperties } from "react";
import { Check } from "lucide-react";
import CountUp from "@/components/site/CountUp";
import { Reveal, TileReveal } from "@/components/site/Reveal";
import { Container, Tag } from "@/components/site/Primitives";

const fields = [
  "Full name",
  "Email address",
  "Phone number",
  "Home address",
  "Work history",
  "Education",
  "Portfolio link",
  "Cover letter",
];

function FieldTicker() {
  return (
    <div className="relative h-full overflow-hidden mask-fade-y">
      <div
        className="animate-ticker-up"
        style={{ "--ticker-duration": "22s" } as CSSProperties}
      >
        {[...fields, ...fields].map((f, i) => (
          <div
            key={i}
            aria-hidden={i >= fields.length}
            className="flex items-center justify-center gap-3 py-5 font-serif-display text-[30px] text-ink sm:text-[36px]"
          >
            <span className="grid size-6 place-items-center rounded-md bg-ink/90 text-white">
              <Check className="size-3.5" strokeWidth={2.5} />
            </span>
            {f}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Statement() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-5">
          <TileReveal className="h-[380px] rounded-2xl bg-tile-warm px-6 sm:h-[460px]">
            <FieldTicker />
          </TileReveal>

          <div className="lg:px-16">
            <Reveal>
              <Tag>Built for speed</Tag>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-6 font-serif-display text-[30px] leading-[1.22] text-ink sm:text-[38px]">
                Most forms ask for the same twenty things. AutoFill AI remembers them and
                fills them in for you, on any site.
              </p>
            </Reveal>

            <Reveal delay={0.15} className="mt-12 flex gap-12 sm:gap-16">
              <div>
                <div className="text-[52px] font-light leading-none tracking-[-0.04em] text-ink sm:text-[60px]">
                  <CountUp to={15} suffix="×" />
                </div>
                <p className="mt-3 text-[14px] text-ink">faster than by hand</p>
              </div>
              <div>
                <div className="text-[52px] font-light leading-none tracking-[-0.04em] text-ink sm:text-[60px]">
                  ~<CountUp to={1} /> min
                </div>
                <p className="mt-3 text-[14px] text-ink">per job application</p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
