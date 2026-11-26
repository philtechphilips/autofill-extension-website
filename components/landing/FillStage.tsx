"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { Check, ChevronDown, Lock } from "lucide-react";
import { EASE } from "@/components/site/motion";
import { LogoMark } from "@/components/site/Primitives";

type Phase = "idle" | "aim" | "press" | "scan" | "fill" | "done";
type FieldState = "empty" | "detected" | "typing" | "filled";

const FIELDS = [
  { label: "Full name", value: "Amara Okafor" },
  { label: "Email", value: "amara@example.com" },
  { label: "Phone", value: "+44 20 7946 0958" },
  { label: "Location", value: "Lagos, Nigeria" },
  {
    label: "Why do you want this role?",
    value:
      "I’ve spent five years designing tools people use every day, and I’d love to bring that same care to your team.",
    multiline: true,
  },
];

const FILL_START = 2900;
const STEP = 480;
const LONG_TYPE = 1.4;
const DONE_AT = FILL_START + (FIELDS.length - 1) * STEP + LONG_TYPE * 1000 + 250;
const LOOP_AT = DONE_AT + 3800;

function fieldState(phase: Phase, active: number, i: number): FieldState {
  if (phase === "done") return "filled";
  if (phase === "fill") return i < active ? "filled" : i === active ? "typing" : "detected";
  if (phase === "scan") return "detected";
  return "empty";
}

function Field({
  label,
  value,
  multiline,
  state,
  index,
}: {
  label: string;
  value: string;
  multiline?: boolean;
  state: FieldState;
  index: number;
}) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (state !== "typing") return;
    const controls = animate(0, value.length, {
      duration: multiline ? LONG_TYPE : Math.min(0.42, value.length * 0.03),
      ease: "linear",
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [state, value.length, multiline]);

  const text = state === "filled" ? value : state === "typing" ? value.slice(0, shown) : "";
  const tone = {
    empty: "bg-paper ring-line",
    detected: "bg-white ring-cobalt/35",
    typing: "bg-white ring-cobalt shadow-[0_0_0_3px_rgba(49,80,224,0.12)]",
    filled: "bg-tile-3 ring-transparent",
  }[state];

  return (
    <div className={multiline ? "sm:col-span-2" : ""}>
      <div className="mb-1.5 text-[12px] text-ink-mute">{label}</div>
      <div
        className={`relative flex rounded-lg px-3 text-left text-[13.5px] text-ink ring-1 ring-inset transition-[background-color,box-shadow] duration-500 ease-soft ${tone} ${
          multiline ? "min-h-[70px] items-start py-2.5 leading-relaxed" : "h-10 items-center"
        }`}
        style={{ transitionDelay: state === "detected" ? `${index * 50}ms` : "0ms" }}
      >
        <span className={multiline ? "pr-6" : "truncate pr-6"}>
          {text}
          {state === "typing" && (
            <motion.span
              className="ml-px inline-block h-[1.05em] w-[1.5px] translate-y-[2px] bg-cobalt"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
            />
          )}
        </span>
        <AnimatePresence>
          {state === "filled" && (
            <motion.span
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 28 }}
              className={`absolute right-2.5 grid size-4 place-items-center rounded-[5px] bg-ink text-white ${
                multiline ? "top-3" : "top-1/2 -mt-2"
              }`}
            >
              <Check className="size-2.5" strokeWidth={3} />
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const STATUS: Record<Phase, string> = {
  idle: "Ready",
  aim: "Ready",
  press: "Reading page",
  scan: "Reading page",
  fill: "Filling",
  done: "Done",
};

export default function FillStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { margin: "-10% 0px -10% 0px" });
  const reduce = useReducedMotion();

  const [livePhase, setPhase] = useState<Phase>("idle");
  const [liveActive, setActive] = useState(-1);
  const [cycle, setCycle] = useState(0);

  const phase: Phase = reduce ? "done" : livePhase;
  const active = reduce ? FIELDS.length : liveActive;

  const cx = useMotionValue(0);
  const cy = useMotionValue(0);
  const cScale = useMotionValue(1);
  const cOpacity = useMotionValue(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));

    const run = () => {
      timers.length = 0;
      setCycle((c) => c + 1);
      setPhase("idle");
      setActive(-1);
      at(900, () => setPhase("aim"));
      at(1950, () => setPhase("press"));
      at(2250, () => setPhase("scan"));
      at(FILL_START, () => {
        setPhase("fill");
        setActive(0);
      });
      for (let i = 1; i < FIELDS.length; i++) at(FILL_START + i * STEP, () => setActive(i));
      at(DONE_AT, () => {
        setPhase("done");
        setActive(FIELDS.length);
      });
      at(LOOP_AT, run);
    };

    at(0, run);
    return () => timers.forEach(clearTimeout);
  }, [inView, reduce]);

  useEffect(() => {
    const stage = stageRef.current;
    const btn = buttonRef.current;
    if (!stage || !btn || reduce) return;
    const s = stage.getBoundingClientRect();
    const b = btn.getBoundingClientRect();
    const tx = b.left - s.left + b.width * 0.62;
    const ty = b.top - s.top + b.height * 0.5;

    if (phase === "idle") {
      animate(cOpacity, 0, { duration: 0.3 });
      cx.set(s.width * 0.55);
      cy.set(s.height * 0.92);
    } else if (phase === "aim") {
      animate(cOpacity, 1, { duration: 0.35 });
      animate(cx, tx, { duration: 1, ease: EASE });
      animate(cy, ty, { duration: 1, ease: EASE });
    } else if (phase === "press") {
      animate(cScale, [1, 0.8, 1], { duration: 0.32 });
    } else if (phase === "done") {
      animate(cx, tx - 90, { duration: 1.4, ease: EASE });
      animate(cy, ty + 80, { duration: 1.4, ease: EASE });
    }
  }, [phase, reduce, cx, cy, cScale, cOpacity]);

  const filledCount =
    phase === "done" ? FIELDS.length : phase === "fill" ? Math.max(active, 0) : 0;
  const pressed = phase === "press";

  return (
    <div ref={stageRef} className="relative grid gap-4 lg:grid-cols-[1fr_240px]">
      {/* Page with a form */}
      <div className="relative overflow-hidden rounded-xl bg-white">
        <div className="flex h-10 items-center gap-3 border-b border-line px-4">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((d) => (
              <span key={d} className="size-2 rounded-full bg-line-strong" />
            ))}
          </div>
          <div className="mx-auto flex items-center gap-1.5 text-[11.5px] text-ink-mute">
            <Lock className="size-3" />
            careers.fieldnote.io/apply
          </div>
          <div className="w-8" />
        </div>

        <div className="p-5 text-left sm:p-6">
          <div className="font-serif-display text-[24px] leading-none text-ink">
            Product Designer
          </div>
          <div className="mt-1.5 text-[12.5px] text-ink-mute">Fieldnote · Remote · Full-time</div>

          <div className="mt-5 grid gap-x-3 gap-y-3.5 sm:grid-cols-2">
            {FIELDS.map((f, i) => (
              <Field key={`${cycle}-${i}`} {...f} index={i} state={fieldState(phase, active, i)} />
            ))}
          </div>

          <div className="mt-5">
            <span
              className={`inline-flex h-9 items-center rounded-lg px-4 text-[13px] text-white transition-colors duration-500 ${
                phase === "done" ? "bg-ink" : "bg-ink/20"
              }`}
            >
              Submit application
            </span>
          </div>
        </div>

        <AnimatePresence>
          {phase === "scan" && (
            <motion.div
              key="scan"
              className="pointer-events-none absolute inset-x-0 h-20 -translate-y-1/2 bg-gradient-to-b from-transparent via-cobalt/[0.07] to-transparent"
              initial={{ top: "8%", opacity: 0 }}
              animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
            >
              <div className="absolute inset-x-0 top-1/2 h-px bg-cobalt/35" />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase === "done" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="absolute bottom-5 right-5 flex items-center gap-2.5 rounded-lg bg-ink py-2 pl-2 pr-3.5 text-[12.5px] text-white sm:bottom-6 sm:right-6"
            >
              <span className="grid size-5 place-items-center rounded-[5px] bg-white/15">
                <Check className="size-3" strokeWidth={3} />
              </span>
              {FIELDS.length} fields filled
              <span className="h-3 w-px bg-white/25" />
              <span className="text-white/65">Undo</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Extension popup */}
      <div className="hidden self-start rounded-xl bg-white p-4 text-left lg:block">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LogoMark size={22} />
            <span className="text-[13px] font-medium">AutoFill AI</span>
          </div>
          <span className="rounded-md bg-tile-3 px-2 py-1 text-[11px] text-ink-soft">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={STATUS[phase]}
                className="inline-block"
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.2 }}
              >
                {STATUS[phase]}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>

        <div className="mt-4 flex items-center gap-2.5 rounded-lg bg-paper p-2.5">
          <span className="grid size-8 place-items-center rounded-full bg-tile-1 text-[11px] font-medium text-ink">
            AO
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[13px]">Amara Okafor</div>
            <div className="text-[11px] text-ink-mute">Job search</div>
          </div>
          <ChevronDown className="size-4 text-ink-mute" />
        </div>

        <div className="mt-4 flex justify-between text-[12px]">
          <span className="text-ink-mute">Filled</span>
          <span className="tabular-nums">
            {filledCount}/{FIELDS.length}
          </span>
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-paper-deep">
          <motion.div
            className="h-full rounded-full bg-ink"
            animate={{ width: `${(filledCount / FIELDS.length) * 100}%` }}
            transition={{ duration: 0.45, ease: EASE }}
          />
        </div>

        <motion.div
          ref={buttonRef}
          animate={{ scale: pressed ? 0.96 : 1 }}
          transition={{ duration: 0.15 }}
          className={`mt-4 flex h-10 items-center justify-center gap-2 rounded-lg text-[13px] text-white transition-colors duration-300 ${
            pressed ? "bg-cobalt" : "bg-ink"
          }`}
        >
          Fill this form
          <span className="rounded bg-white/15 px-1.5 py-0.5 text-[10.5px] text-white/80">⌃⇧F</span>
        </motion.div>
        <div className="mt-2.5 text-center text-[11.5px] text-ink-mute">Undo anytime with ⌃⇧Z</div>
      </div>

      {/* Cursor */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-10 hidden lg:block"
        style={{ x: cx, y: cy, scale: cScale, opacity: cOpacity }}
      >
        <svg width="22" height="24" viewBox="0 0 22 24" fill="none" className="drop-shadow-[0_3px_6px_rgba(15,27,61,0.3)]">
          <path
            d="M2 2.5 19 10.2l-7.3 2.1-3.4 7.2L2 2.5Z"
            fill="#0f1b3d"
            stroke="#fff"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </div>
  );
}
