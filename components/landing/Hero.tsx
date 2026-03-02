"use client";

import { motion } from "framer-motion";
import Button from "../ui/Button";
import { Chrome, ArrowRight, Shield, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden px-6 pt-48 pb-20 select-none">
      {/* Background */}
      <div className="absolute inset-0 bg-onyx" />
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute inset-0 gradient-mesh opacity-100" />
      {/* Subtle radial vignette at center-top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-brand-accent/[0.04] blur-[120px] rounded-full pointer-events-none" />

      {/* Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center text-center">
        {/* Release Status Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-3 bg-brand-accent/[0.08] border border-brand-accent/20 rounded-full px-5 py-2 mb-12 backdrop-blur-xl"
        >
          <div className="w-2 h-2 bg-brand-accent rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
          <span className="text-[11px] font-semibold tracking-[0.12em] text-brand-accent/90">
            AUTOFILL V1.0 IS LIVE
          </span>
          <ArrowRight className="w-3 h-3 text-brand-accent/70" />
        </motion.div>

        {/* Hero Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          <h1 className="text-5xl sm:text-7xl lg:text-[96px] leading-[0.92] font-bold tracking-[-0.05em] text-gradient">
            Fill any form <br className="hidden sm:block" />
            instantly.
          </h1>

          <p className="text-lg md:text-xl text-white/50 leading-relaxed max-w-4xl mx-auto font-light">
            Stop wasting time on repetitive typing. Our smart AI engine fills
            your information into any website in seconds.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 flex flex-col items-center gap-5"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              className="px-10 h-13 text-sm tracking-wide gap-3"
            >
              <Chrome className="w-4 h-4" />
              Install for Chrome
            </Button>
            <a
              href="#features"
              className="flex items-center gap-2 group text-white/60 hover:text-white transition-all text-sm font-medium h-13"
            >
              Browse use cases
              <div className="w-6 h-6 rounded-full border border-white/15 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/5 transition-all">
                <ArrowRight className="w-3 h-3" />
              </div>
            </a>
          </div>
          <p className="text-xs text-white/30 flex flex-wrap items-center justify-center gap-3">
            <span>No credit card required</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>500 Free credits on sign up</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>Pay only for what you use</span>
          </p>
        </motion.div>

        {/* Browser Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 relative w-full max-w-4xl group"
        >
          {/* Glow behind mockup */}
          <div className="absolute -inset-1 bg-brand-accent/10 blur-[60px] rounded-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-1000" />

          <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_32px_80px_rgba(0,0,0,0.6)] bg-[#0d0d0f]">
            {/* Chrome UI Bar */}
            <div className="h-10 bg-[#1a1a1d] border-b border-white/[0.06] flex items-center px-4 gap-5">
              {/* Traffic lights */}
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              {/* URL bar */}
              <div className="flex-1 h-6 bg-white/[0.04] border border-white/[0.06] rounded-md flex items-center px-3 gap-2">
                <Shield className="w-3 h-3 text-emerald-400/70 shrink-0" />
                <span className="text-[10px] text-white/40 font-mono tracking-tight truncate">
                  https://vanguard.ai/careers/apply
                </span>
              </div>
            </div>

            {/* Browser body */}
            <div className="p-10 flex flex-col sm:flex-row gap-12 items-center sm:items-start text-left">
              {/* Form area */}
              <div className="flex-1 space-y-6 w-full">
                {/* Status bar */}
                <div className="h-10 w-full bg-white/[0.02] border border-white/[0.05] rounded-lg relative overflow-hidden flex items-center px-4 gap-3">
                  <motion.div
                    animate={{ x: ["100%", "-100%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-accent/8 to-transparent"
                  />
                  <div className="w-2 h-2 rounded-full bg-brand-accent/60 animate-pulse shrink-0" />
                  <span className="text-white/40 text-[11px] font-mono tracking-widest">
                    AI ANALYZING FORM FIELDS...
                  </span>
                </div>

                {/* Form fields */}
                <div className="space-y-4">
                  {[
                    { label: "Full Name", value: "Alex Sterling", filled: true },
                    { label: "Email Address", value: "a.sterling@vanguard.io", filled: true },
                    { label: "Resume / CV", value: "alex_sterling_2026.pdf", filled: false },
                  ].map((field, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="h-2.5 w-20 bg-white/10 rounded-full" />
                      <div className={`h-11 w-full rounded-lg border flex items-center px-4 ${field.filled
                        ? "bg-brand-accent/[0.06] border-brand-accent/20"
                        : "bg-white/[0.02] border-white/[0.06]"
                        } relative overflow-hidden`}>
                        {field.filled ? (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 + i * 0.3 }}
                            className="text-[13px] text-white/70 font-mono"
                          >
                            {field.value}
                          </motion.span>
                        ) : (
                          <>
                            <motion.div
                              animate={{ x: ["100%", "-100%"] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }}
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-accent/8 to-transparent"
                            />
                            <span className="text-[11px] text-white/25 font-mono tracking-wider">
                              Filling...
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extension Floating Panel */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-full sm:w-60 bg-[#111113] border border-white/[0.1] rounded-xl p-5 shadow-2xl flex flex-col gap-4 shrink-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                    <Chrome className="w-4 h-4 text-black" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold text-white tracking-tight">
                      AutoFill AI
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[9px] text-emerald-400 uppercase tracking-[0.15em] font-semibold">
                        Engine active
                      </span>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-white/[0.06] w-full" />

                <div className="space-y-2.5">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-white/50">Match accuracy</span>
                    <span className="text-white font-semibold">99.8%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "99.8%" }}
                      transition={{ delay: 1.8, duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-brand-accent accent-glow"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  {["Name", "Email", "Resume"].map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-[10px]">
                      <span className="text-white/40">{item}</span>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 + i * 0.3 }}
                        className={i < 2 ? "text-emerald-400 font-medium" : "text-brand-accent font-medium"}
                      >
                        {i < 2 ? "✓ Filled" : "Filling..."}
                      </motion.span>
                    </div>
                  ))}
                </div>

                <button className="w-full bg-white text-black text-[11px] font-bold h-9 rounded-lg hover:bg-white/90 transition-all flex items-center justify-center gap-2 mt-1">
                  <Zap className="w-3 h-3 fill-current" />
                  Instant Fill
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Tech Stack */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-16 flex items-center gap-8"
        >
          <div className="h-px flex-1 max-w-20 bg-gradient-to-r from-transparent to-white/10" />
          {["DeepSeek-V3", "Chrome Extension", "AES-256"].map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/25"
            >
              {tech}
            </span>
          ))}
          <div className="h-px flex-1 max-w-20 bg-gradient-to-l from-transparent to-white/10" />
        </motion.div> */}
      </div>
    </section>
  );
}
