"use client";

import { motion } from "framer-motion";
import Button from "../ui/Button";
import { Chrome, ArrowRight, Sparkles } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative py-48 px-6 overflow-hidden bg-white dark:bg-onyx">
      {/* Absolute Minimalist Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-accent/[0.02] to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.05] rounded-full px-4 py-1.5 mb-10">
            <Sparkles className="w-3 h-3 text-brand-accent" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/80 dark:text-white/80">
              Ready to accelerate?
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold text-black dark:text-white tracking-tighter mb-8 leading-[0.95]">
            Experience the future <br />
            of form filling.
          </h2>

          <p className="text-lg text-black/80 dark:text-white/80 mb-14 max-w-5xl mx-auto font-light leading-relaxed">
            Join 12,000+ power users who save 10+ hours every week. Open source,
            secure, and ready for your workflow.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button variant="primary" size="lg" className="px-12 h-14">
              Download extension
            </Button>
            <a
              href="#pricing"
              className="text-black/80 dark:text-white/80 hover:text-white transition-colors text-sm font-medium flex items-center gap-2"
            >
              View lifetime plans
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="mt-20 flex flex-wrap justify-center gap-x-12 gap-y-6 text-[10px] font-mono tracking-[0.2em] text-black/70 dark:text-white/70 uppercase">
            <span>No credit card required</span>
            <span>500 Free credits for new users</span>
            <span>Pay only for what you use</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
