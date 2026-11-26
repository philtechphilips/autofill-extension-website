"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Copy, CornerDownLeft, Hash, MousePointer2, Sparkles, Undo2, X, Zap } from "lucide-react";
import { toast } from "sonner";
import { PageHeader, Panel, PanelHeader, Segmented } from "@/components/app/AppUI";
import { Keycap } from "@/components/site/Primitives";
import { EASE } from "@/components/site/motion";

type Platform = "mac" | "windows";

interface ShortcutItem {
  action: string;
  description: string;
  mac: string[];
  windows: string[];
  icon: typeof Zap;
  category: "global" | "popup";
}

const shortcuts: ShortcutItem[] = [
  {
    action: "Open popup",
    description: "Opens the AutoFill AI popup for settings and manual fill.",
    mac: ["⌥", "⇧", "Y"],
    windows: ["Alt", "Shift", "Y"],
    icon: MousePointer2,
    category: "global",
  },
  {
    action: "Quick fill",
    description: "Reads and fills the current form without opening the popup.",
    mac: ["⌃", "⇧", "F"],
    windows: ["Alt", "Shift", "F"],
    icon: Zap,
    category: "global",
  },
  {
    action: "Undo last fill",
    description: "Restores every field to how it was before the last fill.",
    mac: ["⌃", "⇧", "Z"],
    windows: ["Alt", "Shift", "Z"],
    icon: Undo2,
    category: "global",
  },
  {
    action: "Confirm fill",
    description: "In preview mode, applies the suggested values to the form.",
    mac: ["↵"],
    windows: ["Enter"],
    icon: CornerDownLeft,
    category: "popup",
  },
  {
    action: "Cancel or close",
    description: "Cancels the current preview or closes any open dialog.",
    mac: ["Esc"],
    windows: ["Esc"],
    icon: X,
    category: "popup",
  },
  {
    action: "Switch profile",
    description: "Jump between your saved profiles with the number keys.",
    mac: ["1", "–", "9"],
    windows: ["1", "–", "9"],
    icon: Hash,
    category: "popup",
  },
  {
    action: "AI-only mode",
    description: "Press 0 to deselect any profile and use AI-generated values.",
    mac: ["0"],
    windows: ["0"],
    icon: Sparkles,
    category: "popup",
  },
];

function ShortcutList({ items, platform }: { items: ShortcutItem[]; platform: Platform }) {
  return (
    <div className="border-t border-line">
      {items.map(({ action, description, mac, windows, icon: Icon }) => {
        const keys = platform === "mac" ? mac : windows;
        return (
          <div
            key={action}
            className="flex flex-col gap-4 border-b border-line px-6 py-5 last:border-b-0 sm:flex-row sm:items-center sm:px-7"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-[10px] bg-tile-3 text-ink">
              <Icon className="size-[18px]" strokeWidth={1.5} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[15px] text-ink">{action}</div>
              <div className="mt-0.5 text-[13.5px] text-ink-mute">{description}</div>
            </div>
            <div className="flex gap-1.5">
              <AnimatePresence mode="popLayout" initial={false}>
                {keys.map((k, i) => (
                  <motion.span
                    key={`${platform}-${k}-${i}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: EASE, delay: i * 0.04 }}
                  >
                    <Keycap className="min-w-10 px-2.5">{k}</Keycap>
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function copyUrl(url: string) {
  navigator.clipboard.writeText(url);
  toast.success("Copied to clipboard", {
    description: `Paste ${url} into your address bar to change shortcuts.`,
  });
}

export default function ShortcutsPage() {
  const [platform, setPlatform] = useState<Platform>("mac");

  const tips = [
    {
      title: "Quick fill",
      body: `Use ${platform === "mac" ? "⌃⇧F" : "Alt+Shift+F"} to fill a form without opening the popup. Ideal for a run of job applications.`,
      tone: "periwinkle" as const,
    },
    {
      title: "Profile switching",
      body: "Press 1–9 in the popup to switch profiles. Quick fill remembers your choice.",
      tone: "mist" as const,
    },
    {
      title: "Safe undo",
      body: `Made a mistake? ${platform === "mac" ? "⌃⇧Z" : "Alt+Shift+Z"} restores every field to its previous value.`,
      tone: "warm-soft" as const,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Shortcuts"
        subtitle="Fill, undo and switch profiles without reaching for your mouse."
        actions={
          <Segmented<Platform>
            id="shortcut-platform"
            value={platform}
            onChange={setPlatform}
            options={[
              { value: "mac", label: "macOS" },
              { value: "windows", label: "Windows" },
            ]}
          />
        }
      />

      <div className="grid gap-4 lg:gap-5">
        <Panel>
          <PanelHeader title="Anywhere in your browser" subtitle="Work on any page, even with the popup closed." />
          <ShortcutList items={shortcuts.filter((s) => s.category === "global")} platform={platform} />
        </Panel>

        <Panel delay={0.05}>
          <PanelHeader title="Inside the popup" subtitle="Available while the extension popup is open." />
          <ShortcutList items={shortcuts.filter((s) => s.category === "popup")} platform={platform} />
        </Panel>

        <div className="grid gap-4 md:grid-cols-3 lg:gap-5">
          {tips.map((t, i) => (
            <Panel key={t.title} tone={t.tone} delay={0.1 + i * 0.05} className="p-7">
              <h3 className="text-[19px] tracking-[-0.02em]">{t.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.55] text-ink-soft">{t.body}</p>
            </Panel>
          ))}
        </div>

        <Panel tone="ink" delay={0.25} className="flex flex-col gap-6 p-7 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-[19px] tracking-[-0.02em]">Change your shortcuts</h3>
            <p className="mt-1 text-[14px] text-white/65">
              Every global shortcut can be remapped in your browser&apos;s extension settings.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => copyUrl("chrome://extensions/shortcuts")}
              className="inline-flex h-11 items-center gap-2 rounded-[10px] bg-white px-4 text-[14.5px] text-ink transition-colors hover:bg-paper"
            >
              <Copy className="size-4" strokeWidth={1.5} /> Chrome settings
            </button>
            <button
              onClick={() => copyUrl("edge://extensions/shortcuts")}
              className="inline-flex h-11 items-center gap-2 rounded-[10px] px-4 text-[14.5px] text-white ring-1 ring-inset ring-white/30 transition-colors hover:bg-white/10"
            >
              <Copy className="size-4" strokeWidth={1.5} /> Edge settings
            </button>
          </div>
        </Panel>
      </div>
    </div>
  );
}
