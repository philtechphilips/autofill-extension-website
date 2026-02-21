'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, EyeOff, ShieldCheck } from 'lucide-react';

export default function Security() {
  const securityFeatures = [
    {
      icon: <Lock className="w-5 h-5" />,
      title: 'End-to-end encryption',
      description: 'Your data is encrypted locally with AES-256 before any synchronization.',
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Zero server storage',
      description: 'We follow a zero-knowledge architecture. Your profiles never touch our database.',
    },
    {
      icon: <EyeOff className="w-5 h-5" />,
      title: 'No tracking',
      description: 'Privacy is the product. We don\'t collect behavioral data or analytics.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: 'Open Source',
      description: 'Trust is earned through transparency. Audit our extension on GitHub anytime.',
    },
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
            <Shield className="w-3 h-3 text-white/80" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">Security Architecture</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            Privacy as a first principle.
          </h2>
          <p className="text-lg text-white/80 max-w-5xl mx-auto font-light">
            We built AutoFill AI to be the most secure way to handle your personal data.
            No cloud, no logs, no compromises.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="group p-8 border border-white/[0.03] rounded-2xl hover:bg-white/[0.02] transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-white/80 group-hover:text-white transition-colors duration-500 mb-6 font-bold uppercase tracking-widest text-xs">
                {feature.icon}
              </div>
              <h3 className="text-sm font-semibold text-white tracking-tight mb-3">{feature.title}</h3>
              <p className="text-[13px] text-white/80 leading-relaxed font-light">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
