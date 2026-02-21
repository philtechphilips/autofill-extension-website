"use client";

import { motion } from "framer-motion";
import { Keyboard, Zap, Undo2, MousePointer2, Sparkles, Hash } from "lucide-react";

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
        bg-white/[0.04] border border-white/[0.08]
        text-[11px] font-mono font-medium text-white/80
        shadow-[0_2px_0_0_rgba(255,255,255,0.03)]
        group-hover:bg-white/[0.08] group-hover:border-white/[0.12]
        group-hover:text-white
        transition-all duration-300
    `}
    >
        {children}
    </span>
);

export default function Shortcuts() {
    const shortcutFeatures = [
        {
            icon: <Zap className="w-5 h-5" />,
            title: "Quick Fill",
            description: "Instantly analyze and fill forms without opening any popup.",
            keys: ["⌥", "⇧", "F"],
            color: "text-emerald-400",
            bg: "bg-emerald-400/10",
            border: "border-emerald-400/20"
        },
        {
            icon: <Undo2 className="w-5 h-5" />,
            title: "Safe Undo",
            description: "Quickly revert all fields to their previous state if you make a mistake.",
            keys: ["⌥", "⇧", "Z"],
            color: "text-blue-400",
            bg: "bg-blue-400/10",
            border: "border-blue-400/20"
        },
        {
            icon: <MousePointer2 className="w-5 h-5" />,
            title: "Open Dashboard",
            description: "Access your profiles and settings in a split second.",
            keys: ["⌥", "⇧", "Y"],
            color: "text-purple-400",
            bg: "bg-purple-400/10",
            border: "border-purple-400/20"
        },
        {
            icon: <Hash className="w-5 h-5" />,
            title: "Fast Switching",
            description: "Switch active profiles instantly using number keys.",
            keys: ["1", "-", "9"],
            color: "text-amber-400",
            bg: "bg-amber-400/10",
            border: "border-amber-400/20"
        },
    ];

    return (
        <section className="relative py-32 px-6 overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto">
                <motion.div
                    className="text-center mb-24"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.05] rounded-full px-4 py-1.5 mb-8">
                        <Keyboard className="w-3 h-3 text-white/80" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">
                            Kinetic Input
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
                        Move at the speed of thought.
                    </h2>
                    <p className="text-lg text-white/60 max-w-4xl mx-auto font-light leading-relaxed">
                        Never touch your mouse. Master our global shortcuts to automate data entry across the web in milliseconds.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {shortcutFeatures.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-500 overflow-hidden"
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
                                    {feature.keys.map((key, i) => (
                                        <KeyCap key={i} variant={key.length > 1 ? "wide" : "default"}>
                                            {key}
                                        </KeyCap>
                                    ))}
                                </div>

                                <h3 className="text-lg font-bold text-white tracking-tight">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-white/60 font-light leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>

                            {/* Hover gradient effect */}
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="mt-16 text-center flex items-center justify-center gap-3 text-sm text-white/40 font-light"
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
