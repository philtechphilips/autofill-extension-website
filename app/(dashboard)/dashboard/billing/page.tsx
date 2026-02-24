"use client";

import { motion } from "framer-motion";
import {
  Zap,
  ShieldCheck,
  History,
  CreditCard,
  ArrowRight,
  Globe,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";

export default function BillingPage() {
  const [region, setRegion] = useState<"Global" | "Nigeria">("Global");

  useEffect(() => {
    const detectRegion = async () => {
      try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (timezone === "Africa/Lagos") {
          setRegion("Nigeria");
          return;
        }
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        if (data.country === "NG") setRegion("Nigeria");
      } catch (err) { }
    };
    detectRegion();
  }, []);

  const packs = [
    {
      name: "Pro Pack",
      price: region === "Nigeria" ? "₦1,500" : "$2.50",
      credits: "250",
      features: [
        "250 AI Actions",
        "Resume to Profile",
        "Text Enhancement",
        "Valid Forever",
      ],
      recommended: true,
    },
    {
      name: "Elite Pack",
      price: region === "Nigeria" ? "₦5,000" : "$8.00",
      credits: "1000",
      features: [
        "1000 AI Actions",
        "Deep Form Analysis",
        "Priority Cloud Sync",
        "Valid Forever",
      ],
    },
  ];

  return (
    <div className="mx-auto space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-black dark:text-white tracking-tight">
            Credits & Billing
          </h1>
          <p className="text-black/60 dark:text-white/60 font-light">
            Manage your balance and upgrade your AI capabilities.
          </p>
        </div>

        {/* Region Toggle */}
        <div className="inline-flex items-center p-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full">
          <button
            onClick={() => setRegion("Global")}
            className={`flex items-center gap-2 px-6 py-2 rounded-full text-[10px] font-bold transition-all ${region === "Global"
                ? "bg-white text-black shrink-0 shadow-lg"
                : "text-white/60 hover:text-white"
              }`}
          >
            <Globe className="w-3 h-3" />
            GLOBAL
          </button>
          <button
            onClick={() => setRegion("Nigeria")}
            className={`flex items-center gap-2 px-6 py-2 rounded-full text-[10px] font-bold transition-all ${region === "Nigeria"
                ? "bg-white text-black shrink-0 shadow-lg"
                : "text-white/60 hover:text-white"
              }`}
          >
            <Zap className="w-3 h-3" />
            NIGERIA
          </button>
        </div>
      </div>

      {/* Current Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-brand-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="relative bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/[0.08] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-6 text-center md:text-left">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-black/50 dark:text-white/50 uppercase tracking-[0.2em]">
                Available Balance
              </span>
              <div className="flex items-center justify-center md:justify-start gap-4">
                <span className="text-6xl font-black text-black dark:text-white tracking-tighter">
                  42
                </span>
                <span className="text-xl font-medium text-black/40 dark:text-white/40 mb-2">
                  Credits
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-accent/10 border border-brand-accent/20 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-accent" />
                <span className="text-[10px] font-bold text-black/80 dark:text-white/80 uppercase tracking-widest">
                  Active Pack: Pro
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full">
                <History className="w-3.5 h-3.5 text-black/40 dark:text-white/40" />
                <span className="text-[10px] font-bold text-black/80 dark:text-white/80 uppercase tracking-widest">
                  Never Expires
                </span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto grid grid-cols-2 gap-4">
            <div className="bg-black/5 dark:bg-white/5 rounded-2xl p-4 border border-black/5 dark:border-white/5 text-center">
              <div className="text-xl font-bold text-black dark:text-white tracking-tight">
                12
              </div>
              <div className="text-[10px] font-medium text-black/40 dark:text-white/40 uppercase tracking-widest">
                Fills this month
              </div>
            </div>
            <div className="bg-black/5 dark:bg-white/5 rounded-2xl p-4 border border-black/5 dark:border-white/5 text-center">
              <div className="text-xl font-bold text-black dark:text-white tracking-tight">
                15x
              </div>
              <div className="text-[10px] font-medium text-black/40 dark:text-white/40 uppercase tracking-widest">
                Speed multiplier
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Credit Packs */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <h2 className="text-sm font-bold text-black/80 dark:text-white/80 uppercase tracking-[0.2em]">
            Purchase More Credits
          </h2>
          <div className="h-px flex-1 bg-black/[0.05] dark:bg-white/[0.05]" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packs.map((pack, i) => (
            <motion.div
              key={pack.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative group p-8 rounded-3xl border transition-all duration-300 ${pack.recommended
                  ? "bg-white/[0.04] border-white/20 shadow-2xl"
                  : "bg-transparent border-white/[0.08] hover:bg-white/[0.02] hover:border-white/20"
                }`}
            >
              {pack.recommended && (
                <div className="absolute -top-3 left-6 bg-brand-accent text-black dark:text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-brand-accent/20">
                  Best Value
                </div>
              )}

              <div className="flex flex-col gap-8">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-black dark:text-white tracking-tight">
                      {pack.name}
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-black dark:text-white tracking-tighter">
                        {pack.price}
                      </span>
                      <span className="text-black/40 dark:text-white/40 text-[11px] font-medium uppercase tracking-widest ml-1">
                        / {pack.credits} credits
                      </span>
                    </div>
                  </div>
                  <div
                    className={`p-3 rounded-2xl ${pack.recommended ? "bg-brand-accent/10 border border-brand-accent/20" : "bg-white/5 border border-white/10"}`}
                  >
                    <Zap
                      className={`w-6 h-6 ${pack.recommended ? "text-brand-accent" : "text-white/40"}`}
                  />
                </div>
              </div>

              <ul className="space-y-4">
                {pack.features.map((feature, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-3 text-sm text-black/60 dark:text-white/60 font-light group-hover:text-white/80 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500/60" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                variant={pack.recommended ? "primary" : "secondary"}
                className="w-full h-14 rounded-2xl font-bold tracking-tight mt-2 flex items-center justify-center gap-2 group"
              >
                Get Credits
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            </motion.div>
          ))}
      </div>
    </div>

      {/* Security/Trust Footer */ }
  <div className="pt-12 border-t border-black/[0.05] dark:border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-8">
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2 text-black/40 dark:text-white/40">
        <ShieldCheck className="w-4 h-4" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-black/50 dark:text-white/50">
          Secure checkout via Stripe
        </span>
      </div>
      <div className="flex items-center gap-2 text-black/40 dark:text-white/40 border-l border-black/10 dark:border-white/10 pl-6">
        <Lock className="w-4 h-4" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-black/50 dark:text-white/50">
          256-bit AES Encryption
        </span>
      </div>
    </div>

    <p className="text-[10px] font-mono text-black/30 dark:text-white/30 uppercase tracking-[0.2em]">
      V1.0.4 Credit Engine • Nominal Status
    </p>
  </div>
    </div >
  );
}
