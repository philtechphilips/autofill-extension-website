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
      className={`glassmorphic rounded-xl p-8 border border-white/[0.03] group hover:border-white/[0.08] transition-all duration-500 ${
        large ? "md:col-span-2" : ""
      }`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col gap-6">
        <div className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-white/80 group-hover:text-white transition-colors duration-500">
          {icon}
        </div>
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-white tracking-tight">
            {title}
          </h3>
          <p className="text-[13px] text-white/80 leading-relaxed font-light">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
