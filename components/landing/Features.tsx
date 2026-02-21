'use client';

import { motion } from 'framer-motion';
import FeatureCard from '../ui/FeatureCard';
import { Users, Brain, Zap, Shield, Globe, Settings, UsersRound } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Users className="w-5 h-5" />,
      title: 'Smart Identity Engine',
      description: 'Orchestrate hundreds of profiles across multiple ecosystems with zero friction.',
      large: true,
    },
    {
      icon: <Brain className="w-5 h-5" />,
      title: 'Neural Detection',
      description: 'Llama-powered field analysis that understands context, not just labels.',
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: 'Single-Cycle Fill',
      description: '0.24ms execution speed from detection to deployment.',
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Local Residency',
      description: 'AES-256 encryption at rest. Your data remains on your hardware.',
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: 'Universal Logic',
      description: 'Built to dominate 99% of web schemas, including shadow DOMs.',
    },
    {
      icon: <Settings className="w-5 h-5" />,
      title: 'Pattern Mapping',
      description: 'Override any field logic with custom regex and manual overrides.',
    },
    {
      icon: <UsersRound className="w-5 h-5" />,
      title: 'Team Sync',
      description: 'Collaborative identity management for high-growth organizations.',
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
            <Zap className="w-3 h-3 text-white/80" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">Capabilities</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            Engineered for precision.
          </h2>
          <p className="text-lg text-white/80 max-w-5xl mx-auto font-light leading-relaxed">
            Every feature is fine-tuned to remove technical debt from your daily workflows.
            Automate with confidence using our most advanced logic engine yet.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              large={feature.large}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
