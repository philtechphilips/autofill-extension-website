"use client";

import { motion } from "framer-motion";
import Button from "../ui/Button";
import { Chrome, ArrowRight, Sparkles } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative py-48 px-6 overflow-hidden bg-onyx">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-accent/6 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-175 h-100 bg-brand-accent/6 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-brand-accent/8 border border-brand-accent/20 rounded-full px-5 py-2 mb-10">
            <Sparkles className="w-3 h-3 text-brand-accent" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent/90">
              Ready to accelerate?
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-8 leading-[0.95]">
            Experience the future <br />
            of form filling.
          </h2>

          <p className="text-lg text-white/50 mb-14 max-w-4xl mx-auto font-light leading-relaxed">
            Join 12,000+ power users who save 10+ hours every week. Open source,
            secure, and ready for your workflow.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="primary" size="lg" className="px-12 h-14 gap-2">
              <Chrome className="w-4 h-4" />
              Download extension
            </Button>
            <a
              href="#pricing"
              className="text-white/50 hover:text-white transition-colors text-sm font-medium flex items-center gap-2"
            >
              View pricing plans
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-x-10 gap-y-4 text-[10px] font-mono tracking-[0.2em] text-white/30 uppercase">
            <span>No credit card required</span>
            <span className="w-1 h-1 rounded-full bg-white/20 self-center" />
            <span>500 Free credits for new users</span>
            <span className="w-1 h-1 rounded-full bg-white/20 self-center" />
            <span>Pay only for what you use</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
