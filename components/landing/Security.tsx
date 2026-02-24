"use client";

import { motion } from "framer-motion";
import { Shield, Lock, EyeOff, ShieldCheck } from "lucide-react";

export default function Security() {
  const securityFeatures = [
    {
      icon: <Lock className="w-5 h-5" />,
      title: "Local-First Encryption",
      description:
        "Your data is encrypted with AES-256 before it ever leaves your local environment.",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Encrypted Cloud Sync",
      description:
        "Enable multi-device sync with zero-knowledge architecture. We can't read your data.",
    },
    {
      icon: <EyeOff className="w-5 h-5" />,
      title: "Privacy-First Analytics",
      description:
        "We track success rates, not individuals. Fully anonymized, opt-out telemetry.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: "Enterprise Audited",
      description:
        "Built on open-source standards with high-frequency security audits on every release.",
    },
  ];

  return (
    <section
      id="security"
      className="relative py-32 px-6 overflow-hidden bg-white dark:bg-onyx"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.05] rounded-full px-4 py-1.5 mb-8">
            <Shield className="w-3 h-3 text-black/80 dark:text-white/80" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/80 dark:text-white/80">
              Security Architecture
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white tracking-tight mb-6">
            Privacy as a first principle.
          </h2>
          <p className="text-lg text-black/80 dark:text-white/80 max-w-5xl mx-auto font-light">
            We built AutoFill AI to be the most secure way to handle your
            personal data. No cloud, no logs, no compromises.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="group p-8 border border-black/[0.03] dark:border-white/[0.03] rounded-2xl hover:bg-white/[0.02] transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-10 h-10 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.05] flex items-center justify-center text-black/80 dark:text-white/80 group-hover:text-white transition-colors duration-500 mb-6 font-bold uppercase tracking-widest text-xs">
                {feature.icon}
              </div>
              <h3 className="text-sm font-semibold text-black dark:text-white tracking-tight mb-3">
                {feature.title}
              </h3>
              <p className="text-[13px] text-black/80 dark:text-white/80 leading-relaxed font-light">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
