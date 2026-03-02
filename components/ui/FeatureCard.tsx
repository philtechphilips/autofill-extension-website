"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  large?: boolean;
}

export default function FeatureCard({
  icon,
  title,
  description,
  large = false,
}: FeatureCardProps) {
  return (
    <motion.div
      className={`relative rounded-2xl p-8 border border-white/[0.07] bg-white/2 group hover:border-brand-accent/25 hover:bg-white/4 transition-all duration-500 overflow-hidden ${
        large ? "md:col-span-2" : ""
      }`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute top-0 left-0 w-32 h-32 bg-brand-accent/6 blur-2xl rounded-full -translate-x-8 -translate-y-8" />
      </div>

      <div className="relative flex flex-col gap-6">
        <div className="w-11 h-11 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent/15 group-hover:border-brand-accent/30 transition-all duration-500">
          {icon}
        </div>
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-white tracking-tight">
            {title}
          </h3>
          <p className="text-[13px] text-white/50 leading-relaxed font-light">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
