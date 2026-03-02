"use client";

import { motion } from "framer-motion";
import { Save, MousePointerClick, Sparkles } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Build your Profile",
      description:
        "Upload your resume once. Our AI builds a complete profile you can use anywhere.",
    },
    {
      number: "02",
      title: "Open any Form",
      description:
        "Navigate to any website; the extension automatically understands what info is needed.",
    },
    {
      number: "03",
      title: "One-Click Fill",
      description:
        "Click fill and watch the form complete itself. You can always undo or edit the results.",
    },
  ];

  return (
    <section className="relative py-32 px-6 overflow-hidden bg-white dark:bg-onyx">
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="text-left mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.05] rounded-full px-4 py-1.5 mb-8">
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/80 dark:text-white/80">
              The Workflow
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white tracking-tight">
            Designed for high-speed <br />
            professionals.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative group p-8 border border-white/[0.07] bg-white/2 rounded-2xl hover:border-brand-accent/20 hover:bg-white/4 transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-brand-accent">{step.number}</span>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-white tracking-tight">
                  {step.title}
                </h3>
                <p className="text-[13px] text-white/50 leading-relaxed font-light">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
