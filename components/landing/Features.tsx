"use client";

import { motion } from "framer-motion";
import FeatureCard from "../ui/FeatureCard";
import {
  Users,
  Brain,
  Zap,
  Shield,
  Globe,
  Settings,
  UsersRound,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Brain className="w-5 h-5" />,
      title: "Advanced AI Engine",
      description:
        "Smart AI that actually understands what a form is asking for, not just labels.",
      large: true,
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Resume to Profile",
      description:
        "Upload your resume and we will instantly build a profile you can use to fill forms.",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Fill with Confidence",
      description:
        "One click to fill any form. If anything looks wrong, you can undo it instantly.",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Smart Form Matching",
      description:
        "Automatically matches your saved info to any web form with incredible accuracy.",
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Works Everywhere",
      description:
        "Built to work on even the most complex websites and private company portals.",
    },
    {
      icon: <Settings className="w-5 h-5" />,
      title: "Privacy Modes",
      description:
        "Generate unique, realistic info to protect your privacy when testing or signing up.",
    },
    {
      icon: <UsersRound className="w-5 h-5" />,
      title: "Secure Cloud Sync",
      description:
        "Sync your profiles across devices with military-grade encryption.",
    },
  ];

  return (
    <section
      id="features"
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
            <Zap className="w-3 h-3 text-black/80 dark:text-white/80" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/80 dark:text-white/80">
              Capabilities
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white tracking-tight mb-6">
            Everything you need to work faster.
          </h2>
          <p className="text-lg text-black/80 dark:text-white/80 max-w-5xl mx-auto font-light leading-relaxed">
            Every feature is designed to save you hours of boring work every
            day. Automate with confidence using our most advanced AI engine yet.
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
