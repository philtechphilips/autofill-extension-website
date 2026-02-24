"use client";

import { motion } from "framer-motion";
import Button from "../ui/Button";
import { Chrome, ArrowRight, Shield, Zap, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden px-6 pt-48 pb-20 select-none">
      {/* Background - Total Minimalist */}
      <div className="absolute inset-0 bg-white dark:bg-onyx" />
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute inset-0 gradient-mesh opacity-100" />

      {/* Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center text-center">
        {/* Release Status Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-3 bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/[0.08] rounded-full px-4 py-1.5 mb-12 backdrop-blur-xl"
        >
          <div className="w-2 h-2 bg-brand-accent rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
          <span className="text-[11px] font-medium tracking-[0.1em] text-black/80 dark:text-white/80">
            AUTOFILL V1.0 IS LIVE
          </span>
          <ArrowRight className="w-3 h-3 text-black/80 dark:text-white/80" />
        </motion.div>

        {/* Hero Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-10"
        >
          <h1 className="text-5xl sm:text-7xl lg:text-[100px] leading-[0.9] font-bold tracking-[-0.05em] text-gradient">
            Fill any form <br className="hidden sm:block" />
            instantly.
          </h1>

          <p className="text-lg md:text-xl text-brand-secondary leading-relaxed max-w-5xl mx-auto font-light tracking-tight">
            Stop wasting time on repetitive typing. Our smart AI engine{" "}
            <br className="hidden md:block" />
            fills your information into any website in seconds.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-14 flex flex-col items-center gap-6"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button
              variant="primary"
              size="lg"
              className="px-10 h-14 text-sm tracking-wide"
            >
              Install for Chrome
            </Button>
            <a
              href="#features"
              className="flex items-center gap-2 group text-black/80 dark:text-white/80 hover:text-white transition-all text-sm font-medium h-14"
            >
              Browse use cases
              <div className="w-5 h-5 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center group-hover:border-white/20 transition-all">
                <ArrowRight className="w-3 h-3" />
              </div>
            </a>
          </div>
          <p className="text-xs text-black/50 dark:text-white/50 flex items-center gap-4">
            <span>No credit card required</span>
            <span className="w-1 h-1 rounded-full bg-black/30 dark:bg-white/30" />
            <span>500 Free credits for new users</span>
            <span className="w-1 h-1 rounded-full bg-black/30 dark:bg-white/30" />
            <span>Pay only for what you use</span>
          </p>
        </motion.div>

        {/* The "Masterpiece" Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-32 relative w-full max-w-4xl group"
        >
          {/* Shadow Glow */}
          <div className="absolute -inset-10 bg-brand-accent/5 blur-[120px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

          <div className="relative glassmorphic rounded-2xl overflow-hidden border border-black/[0.03] dark:border-white/[0.03] shadow-2xl">
            {/* Fake Chrome UI Bar */}
            <div className="h-10 bg-black/5 dark:bg-white/5 border-b border-black/[0.05] dark:border-white/[0.05] flex items-center px-4 gap-6">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-black/10 dark:bg-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-black/10 dark:bg-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-black/10 dark:bg-white/10" />
              </div>
              <div className="flex-1 h-5 bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.05] rounded-md flex items-center px-3 gap-2">
                <Shield className="w-2 h-2 text-black/70 dark:text-white/70" />
                <div className="text-[10px] text-black/70 dark:text-white/70 font-mono tracking-tighter">
                  https://vanguard.ai/careers/apply
                </div>
              </div>
            </div>

            {/* The "Ghost Interface" */}
            <div className="p-12 flex flex-col sm:flex-row gap-16 items-center sm:items-start text-left">
              <div className="flex-1 space-y-8 w-full">
                <div className="space-y-2">
                  <div className="h-3 w-32 bg-black/5 dark:bg-white/5 rounded-full" />
                  <div className="h-12 w-full bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.05] rounded-lg relative overflow-hidden">
                    <motion.div
                      animate={{ x: ["100%", "-100%"] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-accent/5 to-transparent"
                    />
                    <div className="absolute inset-0 flex items-center px-4">
                      <span className="text-black/70 dark:text-white/70 text-sm font-mono tracking-widest">
                        DETECTING...
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    { l: "Identity", v: "Alex Sterling", state: "filled" },
                    {
                      l: "Global Email",
                      v: "a.sterling@vanguard.io",
                      state: "filled",
                    },
                    {
                      l: "Resume Source",
                      v: "alex_sterling_2026.pdf",
                      state: "active",
                    },
                  ].map((field, i) => (
                    <div key={i} className="flex gap-6 items-center">
                      <div className="w-24 h-2 bg-black/10 dark:bg-white/10 rounded-full" />
                      <div className="flex-1 h-1 bg-black/5 dark:bg-white/5 rounded-full relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: field.state === "filled" ? "100%" : "60%",
                          }}
                          transition={{ delay: 1 + i * 0.4, duration: 0.8 }}
                          className={`absolute inset-0 ${field.state === "filled" ? "bg-white/40" : "bg-brand-accent/50"}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* The Mini Extension Floating Box */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-full sm:w-64 bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.1] dark:border-white/[0.1] rounded-xl p-6 backdrop-blur-2xl shadow-xl flex flex-col gap-5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center transition-transform group-hover:scale-110">
                    <Chrome className="w-4 h-4 text-white dark:text-black" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-black dark:text-white tracking-wide">
                      AutoFill AI
                    </span>
                    <span className="text-[9px] text-black/80 dark:text-white/80 uppercase tracking-[0.15em] font-bold">
                      Engine active
                    </span>
                  </div>
                </div>

                <div className="h-px bg-black/10 dark:bg-white/10 w-full" />

                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] text-black/80 dark:text-white/80">
                    <span>Efficiency</span>
                    <span className="text-black dark:text-white">99.8%</span>
                  </div>
                  <div className="h-1.5 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "99%" }}
                      transition={{ delay: 2, duration: 1.5 }}
                      className="h-full bg-brand-accent shadow-[0_0_10px_#3b82f6]"
                    />
                  </div>
                </div>

                <button className="w-full bg-black dark:bg-white text-white dark:text-black text-[12px] font-bold h-10 rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
                  <Zap className="w-3 h-3 fill-current" />
                  Instant Fill
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Tech Stack Footer Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1.5 }}
          className="mt-24 flex items-center gap-12"
        >
          {["DeepSeek-V3", "chrome-web-store", "aes-256"].map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono tracking-[0.3em] uppercase"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
