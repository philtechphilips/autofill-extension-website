"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Keyboard, Zap, Undo2, MousePointer2, Sparkles, Hash, Apple, Monitor } from "lucide-react";

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
        h-7 rounded-[6px]
        bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08]
        text-[11px] font-mono font-medium text-black/80 dark:text-white/80
        shadow-[0_2px_0_0_rgba(0,0,0,0.03)] dark:shadow-[0_2px_0_0_rgba(255,255,255,0.03)]
        group-hover:bg-black/[0.08] dark:group-hover:bg-white/[0.08] group-hover:border-black/[0.12] dark:group-hover:border-white/[0.12]
        group-hover:text-black dark:group-hover:text-white
        transition-all duration-300
    `}
    >
        {children}
    </span>
);

export default function Shortcuts() {
    const [platform, setPlatform] = useState<"mac" | "windows">("mac");

    const shortcutFeatures = [
        {
            icon: <Zap className="w-5 h-5" />,
            title: "Quick Fill",
            description: "Instantly analyze and fill forms without opening any popup.",
            macKeys: ["⌃", "⇧", "F"],
            windowsKeys: ["Alt", "Shift", "F"],
            color: "text-emerald-400",
            bg: "bg-emerald-400/10",
            border: "border-emerald-400/20"
        },
        {
            icon: <Undo2 className="w-5 h-5" />,
            title: "Safe Undo",
            description: "Quickly revert all fields to their previous state if you make a mistake.",
            macKeys: ["⌃", "⇧", "Z"],
            windowsKeys: ["Alt", "Shift", "Z"],
            color: "text-blue-400",
            bg: "bg-blue-400/10",
            border: "border-blue-400/20"
        },
        {
            icon: <MousePointer2 className="w-5 h-5" />,
            title: "Open Dashboard",
            description: "Access your profiles and settings in a split second.",
            macKeys: ["⌥", "⇧", "Y"],
            windowsKeys: ["Alt", "Shift", "Y"],
            color: "text-purple-400",
            bg: "bg-purple-400/10",
            border: "border-purple-400/20"
        },
        {
            icon: <Hash className="w-5 h-5" />,
            title: "Fast Switching",
            description: "Switch active profiles instantly using number keys.",
            macKeys: ["1", "-", "9"],
            windowsKeys: ["1", "-", "9"],
            color: "text-amber-400",
            bg: "bg-amber-400/10",
            border: "border-amber-400/20"
        },
    ];

    return (
        <section className="relative py-32 px-6 overflow-hidden bg-white dark:bg-onyx">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto">
                <motion.div
                    className="text-center mb-24"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.05] rounded-full px-4 py-1.5 mb-8">
                        <Keyboard className="w-3 h-3 text-black/80 dark:text-white/80" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-black/80 dark:text-white/80">
                            Kinetic Input
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white tracking-tight mb-6">
                        Move at the speed of thought.
                    </h2>
                    <p className="text-lg text-black/60 dark:text-white/60 max-w-4xl mx-auto font-light leading-relaxed mb-12">
                        Never touch your mouse. Master our global shortcuts to automate data entry across the web in milliseconds.
                    </p>

                    <div className="flex justify-center mb-0">
                        <div className="flex items-center gap-2 p-1 bg-black/[0.03] dark:bg-white/[0.03] rounded-full border border-black/[0.05] dark:border-white/[0.05] inline-flex">
                            <button
                                onClick={() => setPlatform("mac")}
                                className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${platform === "mac"
                                        ? "bg-white text-black shadow-sm"
                                        : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.05]"
                                    }`}
                            >
                                <Apple className="w-3.5 h-3.5" />
                                macOS
                            </button>
                            <button
                                onClick={() => setPlatform("windows")}
                                className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${platform === "windows"
                                        ? "bg-white text-black shadow-sm"
                                        : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.05]"
                                    }`}
                            >
                                <Monitor className="w-3.5 h-3.5" />
                                Windows
                            </button>
                        </div>
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {shortcutFeatures.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="group relative p-8 rounded-3xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.04] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] hover:border-black/[0.08] dark:hover:border-white/[0.08] transition-all duration-500 overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className={`w-12 h-12 rounded-2xl ${feature.bg} border ${feature.border} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                                <div className={feature.color}>
                                    {feature.icon}
                                </div>
                            </div>

                            <div className="space-y-4 relative z-10">
                                <div className="flex items-center gap-1.5 mb-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                                    {(platform === "mac" ? feature.macKeys : feature.windowsKeys).map((key, i) => (
                                        <KeyCap key={i} variant={key.length > 1 ? "wide" : "default"}>
                                            {key}
                                        </KeyCap>
                                    ))}
                                </div>

                                <h3 className="text-lg font-bold text-black dark:text-white tracking-tight">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-black/60 dark:text-white/60 font-light leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>

                            {/* Hover gradient effect */}
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/[0.02] dark:from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="mt-16 text-center flex items-center justify-center gap-3 text-sm text-black/40 dark:text-white/40 font-light"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                >
                    <Sparkles className="w-4 h-4" />
                    <span>Fully customizable in Chrome extension settings</span>
                </motion.div>
            </div>
        </section>
    );
}
