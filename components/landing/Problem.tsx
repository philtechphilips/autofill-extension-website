"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Check } from "lucide-react";
import { Narrow, Tag } from "@/components/site/Primitives";

type Pos = { x: number; y: number; r: number };

const FIELDS = [
  { label: "Full name", value: "Amara Okafor", caret: true },
  { label: "Email", value: "amara@example.com" },
  { label: "Phone", value: "+44 20 7946 0958" },
  { label: "Location", value: "Lagos, Nigeria", caret: true },
  { label: "Work history", value: "Fieldnote · 5 years" },
  { label: "Education", value: "BSc Design" },
  { label: "Cover letter", value: "I’d love to bring…" },
];

const DESKTOP: { from: Pos[]; to: Pos[] } = {
  from: [
    { x: 7, y: 12, r: -8 },
    { x: 22, y: 58, r: 5 },
    { x: 37, y: 20, r: -3 },
    { x: 53, y: 70, r: 6 },
    { x: 67, y: 6, r: -5 },
    { x: 82, y: 58, r: 4 },
    { x: 95, y: 16, r: -6 },
  ],
  to: [
    { x: 40, y: 0, r: 0 },
    { x: 60, y: 0, r: 0 },
    { x: 40, y: 25, r: 0 },
    { x: 60, y: 25, r: 0 },
    { x: 40, y: 50, r: 0 },
    { x: 60, y: 50, r: 0 },
    { x: 40, y: 75, r: 0 },
  ],
};

const MOBILE: { from: Pos[]; to: Pos[] } = {
  from: [
    { x: 18, y: 4, r: -8 },
    { x: 78, y: 14, r: 6 },
    { x: 30, y: 30, r: 4 },
    { x: 84, y: 44, r: -5 },
    { x: 20, y: 58, r: -4 },
    { x: 72, y: 70, r: 7 },
    { x: 34, y: 84, r: -6 },
  ],
  to: [
    { x: 27, y: 0, r: 0 },
    { x: 73, y: 0, r: 0 },
    { x: 27, y: 25, r: 0 },
    { x: 73, y: 25, r: 0 },
    { x: 27, y: 50, r: 0 },
    { x: 73, y: 50, r: 0 },
    { x: 27, y: 75, r: 0 },
  ],
};

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return mobile;
}

function FloatingField({
  p,
  index,
  from,
  to,
  label,
  value,
  caret,
}: {
  p: MotionValue<number>;
  index: number;
  from: Pos;
  to: Pos;
  label: string;
  value: string;
  caret?: boolean;
}) {
  const left = useTransform(p, [0.32, 0.6], [`${from.x}%`, `${to.x}%`]);
  const top = useTransform(p, [0.32, 0.6], [`${from.y}%`, `${to.y}%`]);
  const rotate = useTransform(p, [0.32, 0.6], [from.r, to.r]);
  const start = 0.66 + index * 0.025;
  const fill = useTransform(p, [start, start + 0.04], [0, 1]);
  const caretOpacity = useTransform(p, [0.28, 0.34], [1, 0]);
  // Hand-drawn outline -> real input -> filled input
  const borderColor = useTransform(p, [0.5, 0.62], ["#0f1b3d", "#e3e2ec"]);
  const backgroundColor = useTransform(
    p,
    [0.5, 0.62, start, start + 0.04],
    ["rgba(251,250,247,0)", "#fbfaf7", "#fbfaf7", "#eef1fd"],
  );

  return (
    <motion.div style={{ left, top, rotate, x: "-50%" }} className="absolute w-[44%] md:w-[19%]">
      <div className="mb-1.5 text-[12px] text-ink sm:text-[13px]">{label}</div>
      <motion.div
        style={{ borderColor, backgroundColor }}
        className="relative flex h-10 items-center rounded-[10px] border-[1.5px] px-3 sm:h-11"
      >
        {caret && (
          <motion.span style={{ opacity: caretOpacity }} className="absolute left-3 top-1/2 -translate-y-1/2">
            <span className="block h-4 w-[1.5px] animate-pulse bg-ink" />
          </motion.span>
        )}
        <motion.div
          style={{ opacity: fill }}
          className="flex min-w-0 flex-1 items-center justify-between gap-2 text-[12px] text-ink sm:text-[14px]"
        >
          <span className="truncate">{value}</span>
          <span className="grid size-[18px] shrink-0 place-items-center rounded-full bg-ink text-white">
            <Check className="size-2.5" strokeWidth={3} />
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Problem() {
  const ref = useRef<HTMLElement>(null);
  const mobile = useIsMobile();
  const layout = mobile ? MOBILE : DESKTOP;

  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const bg = useTransform(p, [0.36, 0.52], ["#fbfaf7", "#c9d3f8"]);
  const problemOpacity = useTransform(p, [0.34, 0.44], [1, 0]);
  const problemY = useTransform(p, [0.34, 0.44], [0, -20]);
  const solutionOpacity = useTransform(p, [0.48, 0.58], [0, 1]);
  const solutionY = useTransform(p, [0.48, 0.58], [20, 0]);
  const submitOpacity = useTransform(p, [0.86, 0.92], [0, 1]);
  const cardOpacity = useTransform(p, [0.52, 0.64], [0, 1]);
  const cardScale = useTransform(p, [0.52, 0.64], [0.97, 1]);
  const submitLeft = mobile ? "73%" : "60%";

  return (
    <section ref={ref} className="relative h-[300vh]">
      <motion.div
        style={{ backgroundColor: bg }}
        className="sticky top-0 flex h-[100svh] flex-col overflow-hidden"
      >
        <Narrow className="pt-[14vh] md:pt-[17vh]">
          <div className="grid">
            <motion.div style={{ opacity: problemOpacity, y: problemY }} className="[grid-area:1/1]">
              <Tag>Without AutoFill</Tag>
              <p className="mt-6 max-w-[900px] font-serif-display text-[26px] leading-[1.25] text-ink sm:text-[40px]">
                Built-in autofill only knows the basics. Everything else, from work history to
                that one odd custom field, you type by hand. Again and again.
              </p>
            </motion.div>
            <motion.div
              style={{ opacity: solutionOpacity, y: solutionY }}
              className="[grid-area:1/1]"
            >
              <Tag tone="white">With AutoFill</Tag>
              <p className="mt-6 max-w-[900px] font-serif-display text-[26px] leading-[1.25] text-ink sm:text-[40px]">
                AutoFill AI reads the whole form, matches every field to your profile, and fills
                it in one click, including the ones browsers skip.
              </p>
            </motion.div>
          </div>
        </Narrow>

        <div
          aria-hidden
          className="relative mx-auto mb-[9vh] mt-auto h-[300px] w-full max-w-[1440px] sm:h-[330px]"
        >
          {/* The tidy form the fields settle into */}
          <motion.div
            style={{ opacity: cardOpacity, scale: cardScale, x: "-50%" }}
            className="absolute left-1/2 top-[-92px] h-[calc(100%+122px)] w-[calc(100%-16px)] rounded-2xl bg-white md:w-[calc(39%+64px)]"
          >
            <div className="px-3 pt-6 md:px-8">
              <div className="font-serif-display text-[22px] leading-none text-ink">Job application</div>
              <div className="mt-1.5 text-[12.5px] text-ink-mute">Fieldnote · Product Designer</div>
            </div>
          </motion.div>

          {FIELDS.map((f, i) => (
            <FloatingField
              key={f.label}
              p={p}
              index={i}
              from={layout.from[i]}
              to={layout.to[i]}
              {...f}
            />
          ))}

          <motion.div
            style={{ opacity: submitOpacity, left: submitLeft, top: "75%", x: "-50%" }}
            className="absolute w-[44%] pt-[22px] sm:pt-6 md:w-[19%]"
          >
            <div className="flex h-10 items-center justify-center rounded-[10px] bg-ink text-[13px] text-white sm:h-11 sm:text-[14px]">
              Submit application
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
