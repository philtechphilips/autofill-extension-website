"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { FileText } from "lucide-react";
import SiteButton from "@/components/site/SiteButton";
import { Reveal } from "@/components/site/Reveal";
import { Keycap, Narrow, Tag } from "@/components/site/Primitives";
import { EASE } from "@/components/site/motion";

/* ── helpers ──────────────────────────────────────────────── */

function useMedia(query: string) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return match;
}

/** Re-mounts its children on an interval while visible, replaying their entrance. */
function useLoop(ms: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(() => setTick((t) => t + 1), ms);
    return () => window.clearInterval(id);
  }, [inView, ms]);
  return { ref, tick, inView };
}

function Cursor({ path, duration = 6 }: { path: { x: string[]; y: string[] }; duration?: number }) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute z-10"
      animate={{ left: path.x, top: path.y }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width="24" height="26" viewBox="0 0 22 24" fill="none" className="drop-shadow-[0_3px_6px_rgba(15,27,61,0.3)]">
        <path d="M2 2.5 19 10.2l-7.3 2.1-3.4 7.2L2 2.5Z" fill="#0f1b3d" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    </motion.div>
  );
}

/* ── panel UIs ────────────────────────────────────────────── */

function ProfileUI() {
  const { ref, tick } = useLoop(7000);
  const rows = [
    ["Full name", "Amara Okafor"],
    ["Email", "amara@example.com"],
    ["Experience", "Product Designer · 5 yrs"],
    ["Education", "BSc Design"],
  ];
  return (
    <div ref={ref} className="w-full max-w-[460px] rounded-xl bg-white p-6 sm:p-8">
      <div className="font-serif-display text-[30px] leading-none text-ink">Your profile</div>
      <div key={tick}>
        <div className="mt-6 flex items-center gap-3 rounded-lg bg-paper p-3">
          <span className="grid size-9 place-items-center rounded-md bg-tile-1">
            <FileText className="size-4 text-ink" strokeWidth={1.5} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-[13.5px] text-ink">resume.pdf</div>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-paper-deep">
              <motion.div
                className="h-full rounded-full bg-ink"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, ease: EASE }}
              />
            </div>
          </div>
        </div>
        <div className="mt-4 divide-y divide-line">
          {rows.map(([k, v], i) => (
            <motion.div
              key={k}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 1.2 + i * 0.25 }}
              className="flex items-center justify-between gap-4 py-3 text-[13.5px]"
            >
              <span className="text-ink-mute">{k}</span>
              <span className="truncate text-ink">{v}</span>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
          className="mt-4 flex flex-wrap gap-1.5"
        >
          {["Figma", "Research", "Prototyping", "Design systems"].map((s) => (
            <span key={s} className="rounded-md bg-tile-3 px-2.5 py-1 text-[12px] text-ink">
              {s}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function MatchUI() {
  const { ref, tick } = useLoop(6500);
  const rows = [
    ["Given name *", "Amara"],
    ["How can we reach you?", "amara@example.com"],
    ["Current employer", "Fieldnote"],
    ["Earliest start date", "2 weeks’ notice"],
    ["Need visa sponsorship?", "No"],
  ];
  return (
    <div ref={ref} className="relative w-full max-w-[560px] rounded-xl bg-white p-6 sm:p-8">
      <div className="font-serif-display text-[30px] leading-none text-ink">Application</div>
      <div className="mt-6 grid grid-cols-[1.2fr_1fr_auto] gap-x-4 border-b border-line pb-2 text-[11.5px] text-ink-mute">
        <span>The form asks</span>
        <span>AutoFill used</span>
        <span>Status</span>
      </div>
      <div key={tick}>
        {rows.map(([q, a], i) => (
          <div
            key={q}
            className="grid grid-cols-[1.2fr_1fr_auto] items-center gap-x-4 border-b border-line py-3 text-[13px]"
          >
            <span className="truncate text-ink">{q}</span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.35 }}
              className="truncate text-ink-soft"
            >
              {a}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.7 + i * 0.35 }}
              className="rounded-md bg-tile-2 px-2 py-0.5 text-[11px] text-ink"
            >
              Matched
            </motion.span>
          </div>
        ))}
      </div>
      <Cursor path={{ x: ["70%", "52%", "52%", "80%", "70%"], y: ["90%", "40%", "62%", "75%", "90%"] }} />
    </div>
  );
}

function ShortcutsUI() {
  const [platform, setPlatform] = useState<"mac" | "win">("mac");
  const { ref, tick } = useLoop(1600);
  const rows = [
    ["Quick fill", ["⌃", "⇧", "F"], ["Alt", "Shift", "F"]],
    ["Undo fill", ["⌃", "⇧", "Z"], ["Alt", "Shift", "Z"]],
    ["Open dashboard", ["⌥", "⇧", "Y"], ["Alt", "Shift", "Y"]],
    ["Switch profile", ["1", "–", "9"], ["1", "–", "9"]],
  ] as const;
  const pressed = tick % rows.length;
  return (
    <div ref={ref} className="w-full max-w-[520px] rounded-xl bg-white p-6 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <div className="font-serif-display text-[30px] leading-none text-ink">Shortcuts</div>
        <div className="inline-flex rounded-lg bg-paper p-1">
          {(["mac", "win"] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPlatform(p)}
              className={`relative rounded-md px-3 py-1 text-[12.5px] ${
                platform === p ? "text-white" : "text-ink-soft"
              }`}
            >
              {platform === p && (
                <motion.span
                  layoutId="kbd-platform"
                  className="absolute inset-0 rounded-md bg-ink"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              )}
              <span className="relative">{p === "mac" ? "macOS" : "Windows"}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="mt-5">
        {rows.map(([label, mac, win], i) => (
          <div
            key={label}
            className="flex items-center justify-between border-b border-line py-3.5 last:border-b-0"
          >
            <span className="text-[14px] text-ink">{label}</span>
            <span className="flex gap-1">
              {(platform === "mac" ? mac : win).map((k, j) => (
                <motion.span
                  key={`${platform}-${k}-${j}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: pressed === i ? 2 : 0 }}
                  transition={{ duration: 0.25, delay: pressed === i ? j * 0.05 : 0 }}
                >
                  <Keycap
                    size="sm"
                    className={`min-w-8 px-2 transition-colors duration-200 ${
                      pressed === i ? "bg-tile-2 shadow-none" : ""
                    }`}
                  >
                    {k}
                  </Keycap>
                </motion.span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PrivacyUI() {
  const { ref, tick } = useLoop(3200);
  const on = tick % 2 === 1;
  const rows = [
    ["Name", "Amara Okafor", "Jordan Reyes"],
    ["Email", "amara@example.com", "jordan.r@example.net"],
    ["Phone", "+44 20 7946 0958", "+44 20 7946 0321"],
  ];
  return (
    <div ref={ref} className="relative w-full max-w-[460px] rounded-xl bg-white p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <div className="font-serif-display text-[30px] leading-none text-ink">Privacy mode</div>
        <span className={`relative h-7 w-12 rounded-full transition-colors duration-300 ${on ? "bg-ink" : "bg-line-strong"}`}>
          <motion.span
            className="absolute top-1 size-5 rounded-full bg-white"
            animate={{ left: on ? 24 : 4 }}
            transition={{ type: "spring", stiffness: 500, damping: 32 }}
          />
        </span>
      </div>
      <div className="mt-6 space-y-3">
        {rows.map(([k, real, fake]) => (
          <div key={k}>
            <div className="mb-1.5 text-[12px] text-ink-mute">{k}</div>
            <div className="relative h-10 overflow-hidden rounded-lg bg-paper px-3 text-[13.5px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={on ? fake : real}
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -16, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="flex h-10 items-center text-ink"
                >
                  {on ? fake : real}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-5 text-[12.5px] text-ink-mute">
        {on ? "Using stand-in details for this site." : "Using your real profile."}
      </p>
    </div>
  );
}

/* ── panels ───────────────────────────────────────────────── */

type Panel = {
  title: string;
  body: string;
  pills: string[];
  cta: { label: string; href: string; external?: boolean };
  tone: string;
  ui: ReactNode;
};

const panels: Panel[] = [
  {
    title: "Resume to profile",
    body: "Upload your resume once and get a complete, editable profile in seconds.",
    pills: ["PDF upload", "Edit any detail", "Multiple profiles", "Synced across devices"],
    cta: { label: "Create your profile", href: "/register" },
    tone: "bg-tile-1",
    ui: <ProfileUI />,
  },
  {
    title: "Fills fields it has never seen",
    body: "AutoFill reads each label the way a person would, so unusual questions still get the right answer.",
    pills: ["Custom questions", "Multi-step forms", "React and SPA sites", "Company portals"],
    cta: { label: "Get started free", href: "/register" },
    tone: "bg-tile-2",
    ui: <MatchUI />,
  },
  {
    title: "A shortcut for everything",
    body: "Fill, undo and switch profiles without touching your mouse. Every shortcut can be changed.",
    pills: ["Quick fill", "Undo fill", "Switch profiles", "Fully customizable"],
    cta: { label: "Get started", href: "/register" },
    tone: "bg-tile-warm",
    ui: <ShortcutsUI />,
  },
  {
    title: "Privacy mode",
    body: "Use realistic stand-in details when you’re testing, or signing up somewhere you don’t trust yet.",
    pills: ["One toggle", "Realistic stand-ins", "Great for testing"],
    cta: { label: "Get started", href: "/register" },
    tone: "bg-tile-3",
    ui: <PrivacyUI />,
  },
];

function PanelCard({ panel, className = "" }: { panel: Panel; className?: string }) {
  return (
    <div
      className={`grid gap-10 overflow-hidden rounded-2xl p-7 sm:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:p-16 ${panel.tone} ${className}`}
    >
      <div className="flex flex-col">
        <h3 className="text-[28px] leading-[1.15] tracking-[-0.02em] text-ink sm:text-[32px]">
          {panel.title}
        </h3>
        <p className="mt-5 max-w-[440px] text-[15px] leading-[1.55] text-ink">{panel.body}</p>
        <ul className="mt-8 flex flex-col items-start gap-2.5">
          {panel.pills.map((p) => (
            <li
              key={p}
              className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[14px] text-ink"
            >
              <span className="size-1.5 rounded-full bg-ink/30" />
              {p}
            </li>
          ))}
        </ul>
        <div className="mt-10 lg:mt-auto lg:pt-10">
          <SiteButton href={panel.cta.href} external={panel.cta.external} arrow>
            {panel.cta.label}
          </SiteButton>
        </div>
      </div>
      <div className="flex items-center justify-center lg:justify-end">{panel.ui}</div>
    </div>
  );
}

function HorizontalPanels() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return (
    <section ref={sectionRef} style={{ height: `calc(100vh + ${distance}px)` }} className="relative">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex gap-5 px-9">
          {panels.map((p) => (
            <PanelCard
              key={p.title}
              panel={p}
              className="h-[min(760px,84vh)] w-[min(1280px,88vw)] shrink-0"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── intro art ────────────────────────────────────────────── */

function RippleArt() {
  return (
    <svg viewBox="0 0 320 320" className="h-auto w-[240px] text-ink sm:w-[300px]" aria-hidden>
      {[40, 80, 120, 160].map((r, i) => (
        <motion.path
          key={r}
          d={`M ${160 - r} 160 A ${r} ${r} 0 0 1 ${160 + r} 160`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.6, ease: EASE, delay: 0.15 * i }}
        />
      ))}
      <motion.path
        d="M150 150 L150 236 L170 216 L184 248 L198 241 L184 210 L212 210 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.7 }}
      />
    </svg>
  );
}

/* ── section ──────────────────────────────────────────────── */

export default function Features() {
  const desktop = useMedia("(min-width: 1024px)");

  return (
    <div id="features">
      <section className="py-24 md:py-32">
        <Narrow className="flex flex-col items-start justify-between gap-12 md:flex-row md:items-center">
          <RippleArt />
          <div className="md:text-right">
            <Reveal>
              <Tag>Features</Tag>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-serif-display text-[42px] leading-[1.1] text-ink sm:text-[56px]">
                Small tools that save
                <br className="hidden sm:block" /> you hours every week.
              </h2>
            </Reveal>
          </div>
        </Narrow>
      </section>

      {desktop ? (
        <HorizontalPanels />
      ) : (
        <div className="space-y-4 px-4 sm:px-6">
          {panels.map((p) => (
            <Reveal key={p.title}>
              <PanelCard panel={p} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
