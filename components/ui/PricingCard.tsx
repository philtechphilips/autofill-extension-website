"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "./Button";

interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  features: string[];
  recommended?: boolean;
  ctaText: string;
  badge?: string;
  packId?: string;
}

export default function PricingCard({
  name,
  price,
  period,
  features,
  recommended = false,
  ctaText,
  badge,
  packId,
}: PricingCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/dashboard/billing");
  };

  return (
    <motion.div
      className={`relative rounded-2xl p-8 border transition-all duration-500 overflow-hidden ${
        recommended
          ? "bg-white/[0.04] border-brand-accent/30 shadow-[0_0_0_1px_rgba(59,130,246,0.15),0_0_60px_rgba(59,130,246,0.1),0_8px_40px_rgba(0,0,0,0.4)] scale-[1.03]"
          : "bg-white/[0.02] border-white/[0.07] hover:border-white/[0.12] hover:bg-white/[0.04]"
      }`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Recommended glow blob */}
      {recommended && (
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-accent/10 blur-3xl rounded-full pointer-events-none" />
      )}

      <div className="relative flex flex-col gap-8">
        {/* Badge inline — visible regardless of overflow */}
        {recommended && (
          <div className="inline-flex self-start items-center bg-brand-accent text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-[0_0_16px_rgba(59,130,246,0.4)]">
            Most Popular
          </div>
        )}

        <div className="space-y-3">
          <h3 className={`text-xs font-bold uppercase tracking-widest ${recommended ? "text-brand-accent" : "text-white/50"}`}>
            {name}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-white tracking-tighter">
              {price}
            </span>
            {period && <span className="text-white/40 text-xs">/{period}</span>}
          </div>
          {badge && (
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {badge}
            </div>
          )}
        </div>

        <div className="h-px bg-white/[0.06]" />

        <ul className="flex flex-col gap-3.5">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-[13px] text-white/60 font-light"
            >
              <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-emerald-400" />
              </div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          variant={recommended ? "primary" : "secondary"}
          className="w-full"
          onClick={handleClick}
        >
          {ctaText}
        </Button>
      </div>
    </motion.div>
  );
}
