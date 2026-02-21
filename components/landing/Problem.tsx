'use client';

import { motion } from 'framer-motion';
import { Minus, Clock, TrendingDown } from 'lucide-react';

export default function Problem() {
  const frictionPoints = [
    'Redundant identity verification',
    'Structural copy-paste latency',
    'Schema identification failure',
    'Manual field reconciliation',
  ];

  return (
    <section className="relative py-32 px-6 overflow-hidden bg-onyx">
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.05] rounded-full px-4 py-1.5 mb-8">
            <TrendingDown className="w-3 h-3 text-white/80" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">The Friction Gap</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            Manual entry is technical debt.
          </h2>
          <p className="text-lg text-white/80 max-w-4xl mx-auto font-light leading-relaxed">
            The modern web is built on complex schemas that standard autofill cannot parse.
            This creates a systemic bottleneck for high-velocity professionals who interact
            with hundreds of unique interfaces every week.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Analysis View */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {frictionPoints.map((point, index) => (
              <div key={index} className="flex items-center gap-6 p-6 border border-white/[0.03] rounded-xl hover:bg-white/[0.01] transition-colors group">
                <Minus className="w-4 h-4 text-white/70 group-hover:text-white/80 transition-colors" />
                <span className="text-[13px] font-medium text-white/80 tracking-wide uppercase">{point}</span>
              </div>
            ))}
          </motion.div>

          {/* Metric View */}
          <motion.div
            className="p-12 border border-white/[0.05] rounded-3xl bg-gradient-to-br from-white/[0.02] to-transparent relative overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/[0.03] blur-[100px] rounded-full" />

            <div className="relative space-y-12">
              <div className="space-y-4">
                <p className="text-[10px] font-mono tracking-[0.2em] text-white/70 uppercase">Baseline Latency</p>
                <div className="flex items-baseline gap-4">
                  <span className="text-6xl font-bold text-white/70 tracking-tighter italic">18.4m</span>
                  <span className="text-sm text-white/60 font-light">avg / human iteration</span>
                </div>
              </div>

              <div className="w-full h-px bg-white/[0.05]" />

              <div className="space-y-4">
                <p className="text-[10px] font-mono tracking-[0.2em] text-brand-accent uppercase">AutoFill Optimized</p>
                <div className="flex items-baseline gap-4">
                  <span className="text-7xl font-bold text-white tracking-tighter animate-pulse">0.4s</span>
                  <span className="text-sm text-white/80 font-light">verified deployment</span>
                </div>
              </div>

              <div className="pt-6">
                <div className="inline-flex items-center gap-2 text-white/80 text-[11px] font-medium tracking-widest uppercase">
                  <Clock className="w-3 h-3" />
                  <span>98% Efficiency Recovery</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
