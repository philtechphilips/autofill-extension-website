'use client';

import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { Chrome, ArrowRight, Sparkles } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="relative py-48 px-6 overflow-hidden bg-onyx">
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
          <div className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.05] rounded-full px-4 py-1.5 mb-10">
            <Sparkles className="w-3 h-3 text-brand-accent" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Ready to accelerate?</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-8 leading-[0.95]">
            Experience the future <br />
            of form filling.
          </h2>

          <p className="text-lg text-white/40 mb-14 max-w-5xl mx-auto font-light leading-relaxed">
            Join 12,000+ power users who save 10+ hours every week.
            Open source, secure, and ready for your workflow.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button variant="primary" size="lg" className="px-12 h-14">
              Download extension
            </Button>
            <button className="text-white/40 hover:text-white transition-colors text-sm font-medium flex items-center gap-2">
              View lifetime plans
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-20 flex flex-wrap justify-center gap-x-12 gap-y-6 text-[10px] font-mono tracking-[0.2em] text-white/20 uppercase">
            <span>No credit card required</span>
            <span>14-day pro trial</span>
            <span>Cancel anytime</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
