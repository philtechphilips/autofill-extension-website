"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SiteButton from "@/components/site/SiteButton";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Reveal";
import { Narrow, Tag } from "@/components/site/Primitives";
import { EASE } from "@/components/site/motion";

const faqs = [
  {
    question: "Does it work on complex forms?",
    answer:
      "Yes. AutoFill AI is built to handle multi-step flows, React-based forms and custom field names that built-in browser autofill misses.",
  },
  {
    question: "Where is my data stored?",
    answer:
      "Your data stays in your browser. We zero-log your profiles and utilize local compute for all AI operations.",
  },
  {
    question: "Can I keep more than one profile?",
    answer:
      "Yes. Switch between personal, work and project profiles with a single keyboard shortcut.",
  },
  {
    question: "Is it open source?",
    answer:
      "The core engine is open source on GitHub. We think security and transparency go together.",
  },
  {
    question: "Which browsers are supported?",
    answer:
      "AutoFill AI works on Google Chrome and Microsoft Edge. Firefox support is in active development.",
  },
];

function Item({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  const id = useId();
  return (
    <div className="border-b border-line">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-6 py-7 text-left"
        >
          <span className="text-[19px] tracking-[-0.015em] text-ink sm:text-[21px]">{q}</span>
          <span className="relative grid size-6 shrink-0 place-items-center">
            <span className="absolute h-[1.5px] w-4 bg-ink" />
            <motion.span
              className="absolute h-4 w-[1.5px] bg-ink"
              animate={{ scaleY: open ? 0 : 1 }}
              transition={{ duration: 0.4, ease: EASE }}
            />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            key="a"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="max-w-[560px] pb-8 text-[15.5px] leading-[1.6] text-ink-soft">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 md:py-32">
      <Narrow className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <Tag>FAQ</Tag>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-serif-display text-[42px] leading-[1.08] text-ink sm:text-[56px]">
              Questions,
              <br />
              answered
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[320px] text-[15px] leading-[1.55] text-ink">
              Can&apos;t find what you&apos;re looking for? We usually reply within a day.
            </p>
            <SiteButton href="/contact" arrow className="mt-7">
              Contact us
            </SiteButton>
          </Reveal>
        </div>

        <Stagger className="border-t border-line" gap={0.06}>
          {faqs.map((f, i) => (
            <StaggerItem key={f.question}>
              <Item
                q={f.question}
                a={f.answer}
                open={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </Narrow>
    </section>
  );
}
