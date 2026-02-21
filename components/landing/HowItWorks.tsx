'use client';

import { motion } from 'framer-motion';
import { Save, MousePointerClick, Sparkles } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Define your identity',
      description: 'Centralize your data once. Securely mapped and ready for deployment.',
    },
    {
      number: '02',
      title: 'Contextual Detection',
      description: 'Our engine identifies field schemas in real-time as you navigate.',
    },
    {
      number: '03',
      title: 'Instant Execution',
      description: 'One command fills any form with 99.8% precision. Review and go.',
    },
  ];

  return (
    <section className="relative py-32 px-6 overflow-hidden bg-onyx">
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="text-left mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.05] rounded-full px-4 py-1.5 mb-8">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">The Workflow</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Designed for high-speed <br />
            professionals.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative group p-8 border border-white/[0.03] rounded-2xl hover:bg-white/[0.02] transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-[40px] font-bold text-white/5 group-hover:text-brand-accent/20 transition-colors duration-500 mb-6">
                {step.number}
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-white tracking-tight">{step.title}</h3>
                <p className="text-[13px] text-white/80 leading-relaxed font-light">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
