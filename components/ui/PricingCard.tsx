"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Button from "./Button";

interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  features: string[];
  recommended?: boolean;
  ctaText: string;
  badge?: string;
}

export default function PricingCard({
  name,
  price,
  period,
  features,
  recommended = false,
  ctaText,
  badge,
}: PricingCardProps) {
  return (
    <motion.div
      className={`relative rounded-xl p-10 border transition-all duration-500 ${
        recommended
          ? "bg-white/[0.03] border-white/[0.1] shadow-2xl scale-[1.02]"
          : "bg-transparent border-white/[0.03] hover:border-white/[0.08]"
      }`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {recommended && (
        <div className="absolute -top-3 left-6 bg-white text-black text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
          Most Popular
        </div>
      )}

      <div className="flex flex-col gap-10">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-white/80 uppercase tracking-widest">
            {name}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-white tracking-tighter">
              {price}
            </span>
            {period && <span className="text-white/80 text-xs">/{period}</span>}
          </div>
          {badge && (
            <div className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">
              {badge}
            </div>
          )}
        </div>

        <ul className="flex flex-col gap-4">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-start gap-4 text-[13px] text-white/80 font-light"
            >
              <Check className="w-4 h-4 text-white/80 shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          variant={recommended ? "primary" : "secondary"}
          className="w-full"
        >
          {ctaText}
        </Button>
      </div>
    </motion.div>
  );
}
