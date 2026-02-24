"use client";

import { motion } from "framer-motion";
import {
  Keyboard,
  Command,
  Zap,
  Undo2,
  MousePointer2,
  ArrowBigUp,
  Hash,
  CornerDownLeft,
  X,
  Monitor,
  Apple,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

interface ShortcutItem {
  action: string;
  description: string;
  mac: string[];
  windows: string[];
  icon: any;
  category: "global" | "popup" | "page";
}

const shortcuts: ShortcutItem[] = [
  {
    action: "Open Popup",
    description:
      "Opens the Autofill.AI extension popup for configuration and manual fill.",
    mac: ["⌥", "⇧", "Y"],
    windows: ["Alt", "Shift", "Y"],
    icon: MousePointer2,
    category: "global",
  },
  {
    action: "Quick Autofill",
    description:
      "Instantly analyzes and fills the current form without opening the popup.",
    mac: ["⌃", "⇧", "F"],
    windows: ["Alt", "Shift", "F"],
    icon: Zap,
    category: "global",
  },
  {
    action: "Undo Last Fill",
    description:
      "Restores all form fields to their previous values before the last autofill.",
    mac: ["⌃", "⇧", "Z"],
    windows: ["Alt", "Shift", "Z"],
    icon: Undo2,
    category: "global",
  },
  {
    action: "Confirm Fill",
    description:
      "When in preview mode, confirms and applies the generated values to the form.",
    mac: ["↵"],
    windows: ["Enter"],
    icon: CornerDownLeft,
    category: "popup",
  },
  {
    action: "Cancel / Close",
    description:
      "Cancels the current preview or closes any open modal in the popup.",
    mac: ["Esc"],
    windows: ["Esc"],
    icon: X,
    category: "popup",
  },
  {
    action: "Quick Profile Select",
    description:
      "Instantly switch between your saved profiles using number keys 1-9.",
    mac: ["1", "-", "9"],
    windows: ["1", "-", "9"],
    icon: Hash,
    category: "popup",
  },
  {
    action: "AI Only Mode",
    description:
      "Press 0 to deselect any profile and use pure AI-generated values.",
    mac: ["0"],
    windows: ["0"],
    icon: Sparkles,
    category: "popup",
  },
];

const KeyCap = ({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "wide";
}) => (
  <span
    className={`
        inline-flex items-center justify-center
        ${variant === "wide" ? "px-3 min-w-[40px]" : "px-2 min-w-[28px]"}
        h-7 rounded-lg
        bg-white/[0.05] border border-white/[0.1]
        text-xs font-mono font-bold text-white/90
        shadow-[0_2px_0_0_rgba(255,255,255,0.05)]
        group-hover:bg-white/[0.1] group-hover:border-white/[0.15]
        transition-all duration-300
    `}
  >
    {children}
  </span>
);

const ShortcutRow = ({
  shortcut,
  index,
  platform,
}: {
  shortcut: ShortcutItem;
  index: number;
  platform: "mac" | "windows";
}) => {
  const keys = platform === "mac" ? shortcut.mac : shortcut.windows;
  const Icon = shortcut.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-center gap-6 p-6 hover:bg-white/[0.02] transition-all group border-b border-black/[0.03] dark:border-white/[0.03] last:border-b-0"
    >
      <div className="w-12 h-12 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.05] flex items-center justify-center group-hover:scale-110 group-hover:bg-white/[0.05] transition-all duration-500">
        <Icon className="w-5 h-5 text-black/70 dark:text-white/70 group-hover:text-white transition-colors" />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-bold text-black dark:text-white mb-1 tracking-tight">
          {shortcut.action}
        </h3>
        <p className="text-xs text-black/60 dark:text-white/60 font-light leading-relaxed line-clamp-2">
          {shortcut.description}
        </p>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        {keys.map((key, i) => (
          <KeyCap key={i} variant={key.length > 1 ? "wide" : "default"}>
            {key}
          </KeyCap>
        ))}
      </div>
    </motion.div>
  );
};

const CategorySection = ({
  title,
  shortcuts,
  platform,
}: {
  title: string;
  shortcuts: ShortcutItem[];
  platform: "mac" | "windows";
}) => (
  <div className="space-y-4">
    <div className="flex items-center gap-3 px-2">
      <div className="h-px flex-1 bg-gradient-to-r from-white/[0.1] to-transparent" />
      <span className="text-[10px] font-bold text-black/40 dark:text-white/40 uppercase tracking-[0.3em]">
        {title}
      </span>
      <div className="h-px flex-1 bg-gradient-to-l from-white/[0.1] to-transparent" />
    </div>
    <div className="glassmorphic rounded-[32px] overflow-hidden">
      {shortcuts.map((shortcut, index) => (
        <ShortcutRow
          key={shortcut.action}
          shortcut={shortcut}
          index={index}
          platform={platform}
        />
      ))}
    </div>
  </div>
);

export default function ShortcutsPage() {
  const [platform, setPlatform] = useState<"mac" | "windows">("mac");

  const globalShortcuts = shortcuts.filter((s) => s.category === "global");
  const popupShortcuts = shortcuts.filter((s) => s.category === "popup");

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-brand-accent text-xs font-bold uppercase tracking-[0.3em]">
          <Keyboard className="w-4 h-4" />
          Kinetic Input
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-black dark:text-white tracking-tighter leading-none">
          Shortcuts<span className="text-black/70 dark:text-white/70">.</span>
        </h1>
        <p className="text-xl text-black/80 dark:text-white/80 font-light max-w-4xl">
          Master the high-speed interface with keyboard commands for
          lightning-fast form automation.
        </p>
      </div>

      {/* Platform Toggle */}
      <div className="flex items-center gap-4">
        <span className="text-xs font-bold text-black/60 dark:text-white/60 uppercase tracking-wider">
          Platform:
        </span>
        <div className="flex items-center gap-2 p-1 bg-black/[0.03] dark:bg-white/[0.03] rounded-full border border-black/[0.05] dark:border-white/[0.05]">
          <button
            onClick={() => setPlatform("mac")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              platform === "mac"
                ? "bg-white text-black"
                : "text-white/70 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            <Apple className="w-3.5 h-3.5" />
            macOS
          </button>
          <button
            onClick={() => setPlatform("windows")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              platform === "windows"
                ? "bg-white text-black"
                : "text-white/70 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            Windows
          </button>
        </div>
      </div>

      {/* Key Legend */}
      <div className="glassmorphic p-6 rounded-[24px] flex flex-wrap items-center gap-6">
        <span className="text-[10px] font-bold text-black/40 dark:text-white/40 uppercase tracking-[0.2em]">
          Key Legend:
        </span>
        {platform === "mac" ? (
          <>
            <div className="flex items-center gap-2">
              <KeyCap>⌘</KeyCap>
              <span className="text-xs text-black/70 dark:text-white/70">Command</span>
            </div>
            <div className="flex items-center gap-2">
              <KeyCap>⌥</KeyCap>
              <span className="text-xs text-black/70 dark:text-white/70">Option/Alt</span>
            </div>
            <div className="flex items-center gap-2">
              <KeyCap>⌃</KeyCap>
              <span className="text-xs text-black/70 dark:text-white/70">Control</span>
            </div>
            <div className="flex items-center gap-2">
              <KeyCap>⇧</KeyCap>
              <span className="text-xs text-black/70 dark:text-white/70">Shift</span>
            </div>
            <div className="flex items-center gap-2">
              <KeyCap>↵</KeyCap>
              <span className="text-xs text-black/70 dark:text-white/70">Return</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <KeyCap variant="wide">Ctrl</KeyCap>
              <span className="text-xs text-black/70 dark:text-white/70">Control</span>
            </div>
            <div className="flex items-center gap-2">
              <KeyCap variant="wide">Alt</KeyCap>
              <span className="text-xs text-black/70 dark:text-white/70">Alt</span>
            </div>
            <div className="flex items-center gap-2">
              <KeyCap variant="wide">Shift</KeyCap>
              <span className="text-xs text-black/70 dark:text-white/70">Shift</span>
            </div>
            <div className="flex items-center gap-2">
              <KeyCap variant="wide">Enter</KeyCap>
              <span className="text-xs text-black/70 dark:text-white/70">Enter</span>
            </div>
          </>
        )}
      </div>

      {/* Shortcuts Sections */}
      <div className="space-y-10">
        <CategorySection
          title="Global Shortcuts — Work Anywhere in Chrome"
          shortcuts={globalShortcuts}
          platform={platform}
        />
        <CategorySection
          title="Popup Shortcuts — When Extension is Open"
          shortcuts={popupShortcuts}
          platform={platform}
        />
      </div>

      {/* Customize Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glassmorphic p-8 rounded-[32px] flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center">
            <Command className="w-5 h-5 text-brand-accent" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-black dark:text-white mb-1">
              Customize Your Shortcuts
            </h3>
            <p className="text-xs text-black/60 dark:text-white/60 font-light">
              You can customize all global shortcuts in Chrome's extension
              settings.
            </p>
          </div>
        </div>
        <a
          href="chrome://extensions/shortcuts"
          onClick={(e) => {
            e.preventDefault();
            navigator.clipboard.writeText("chrome://extensions/shortcuts");
            alert(
              "Copied to clipboard! Paste this URL in your Chrome address bar:\n\nchrome://extensions/shortcuts",
            );
          }}
          className="flex items-center gap-2 px-6 py-3 bg-black/[0.05] dark:bg-white/[0.05] hover:bg-white/[0.1] border border-black/[0.1] dark:border-white/[0.1] hover:border-white/[0.2] rounded-full text-xs font-bold text-black dark:text-white uppercase tracking-wider transition-all group"
        >
          <span>Open Chrome Shortcuts</span>
          <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </motion.div>

      {/* Tips Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glassmorphic p-6 rounded-[24px] space-y-3"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <Zap className="w-5 h-5 text-emerald-500" />
          </div>
          <h4 className="text-sm font-bold text-black dark:text-white">Pro Tip: Quick Fill</h4>
          <p className="text-xs text-black/60 dark:text-white/60 font-light leading-relaxed">
            Use {platform === "mac" ? "⌃⇧F" : "Alt+Shift+F"} to instantly fill
            forms without opening the popup. Perfect for rapid job applications.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glassmorphic p-6 rounded-[24px] space-y-3"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
            <Hash className="w-5 h-5 text-amber-500" />
          </div>
          <h4 className="text-sm font-bold text-black dark:text-white">
            Pro Tip: Profile Switching
          </h4>
          <p className="text-xs text-black/60 dark:text-white/60 font-light leading-relaxed">
            Press 1-9 in the popup to instantly switch profiles. Your selection
            is remembered for Quick Fill shortcuts.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glassmorphic p-6 rounded-[24px] space-y-3"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
            <Undo2 className="w-5 h-5 text-blue-500" />
          </div>
          <h4 className="text-sm font-bold text-black dark:text-white">Pro Tip: Safe Undo</h4>
          <p className="text-xs text-black/60 dark:text-white/60 font-light leading-relaxed">
            Made a mistake? Press {platform === "mac" ? "⌃⇧Z" : "Alt+Shift+Z"}{" "}
            to instantly restore all fields to their previous values.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
