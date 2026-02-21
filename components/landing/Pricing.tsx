"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CreditCard, Clock, X, Globe, Zap } from "lucide-react";
import PricingCard from "../ui/PricingCard";

export default function Pricing() {
  const [region, setRegion] = useState<"Global" | "Nigeria">("Global");

  useEffect(() => {
    // Attempt to detect region
    const detectRegion = async () => {
      try {
        // 1. Check Timezone (Fast & Free)
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (timezone === "Africa/Lagos") {
          setRegion("Nigeria");
          return;
        }

        // 2. Check IP API (More accurate)
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        if (data.country === "NG") {
          setRegion("Nigeria");
        }
      } catch (err) {
        console.error("Region detection failed:", err);
      }
    };

    detectRegion();
  }, []);

  const packs = [
    {
      name: "Welcome Pack",
      price: region === "Nigeria" ? "₦0" : "$0",
      period: "one-time",
      features: [
        "50 Free Credits",
        "2 Local Profiles",
        "Basic AI Analysis",
        "Cloud Sync (Beta)",
      ],
      ctaText: "Claim Free Credits",
    },
    {
      name: "Pro Pack",
      price: region === "Nigeria" ? "₦1,500" : "$2.50",
      period: "250 credits",
      features: [
        "250 AI Actions",
        "Resume to Profile",
        "Text Enhancement",
        "Priority Support",
        "Valid Forever",
      ],
      recommended: true,
      ctaText: "Buy Credits",
      badge: "Most Popular",
    },
    {
      name: "Elite Pack",
      price: region === "Nigeria" ? "₦5,000" : "$8.00",
      period: "1000 credits",
      features: [
        "1000 AI Actions",
        "Deep Form Analysis",
        "Early Feature Access",
        "Lifetime Cloud Sync",
        "Advanced Formatting",
      ],
      ctaText: "Get 1000 Credits",
    },
  ];

  const trustBadges = [
    { icon: CreditCard, text: "No credit card required" },
    { icon: Clock, text: "14-day Pro trial included" },
    { icon: X, text: "Cancel anytime" },
  ];

  return (
    <section id="pricing" className="relative py-20 px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-mesh opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simple Credit-Based Pricing
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Pay for what you use. No monthly subscriptions.
          </p>

          {/* Region Toggle */}
          <div className="inline-flex items-center p-1 bg-white/5 border border-white/10 rounded-full mb-8">
            <button
              onClick={() => setRegion("Global")}
              className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold transition-all ${
                region === "Global"
                  ? "bg-white text-black shadow-lg"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Globe className="w-3 h-3" />
              GLOBAL
            </button>
            <button
              onClick={() => setRegion("Nigeria")}
              className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold transition-all ${
                region === "Nigeria"
                  ? "bg-white text-black shadow-lg"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Zap className="w-3 h-3" />
              NIGERIA
            </button>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 mb-16"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {trustBadges.map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2"
            >
              <badge.icon className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-white/80 font-medium">
                {badge.text}
              </span>
            </div>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packs.map((pack, index) => (
            <PricingCard
              key={index}
              name={pack.name}
              price={pack.price}
              period={pack.period}
              features={pack.features}
              recommended={pack.recommended}
              ctaText={pack.ctaText}
              badge={pack.badge}
            />
          ))}
        </div>

        <motion.div
          className="text-center mt-12 space-y-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-400">
            Start free, upgrade when you need more. No payment required to get
            started.
          </p>
          <p className="text-sm text-gray-500">
            Payment integration coming soon. Enjoy full Pro features during the
            beta!
          </p>
        </motion.div>
      </div>
    </section>
  );
}
