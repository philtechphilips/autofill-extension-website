"use client";

import { motion } from "framer-motion";
import {
  Zap,
  ShieldCheck,
  History,
  ArrowRight,
  Globe,
  CheckCircle2,
  Lock,
  Loader2,
  RefreshCw,
  AlertCircle,
  Clock,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Button from "@/components/ui/Button";
import usePayment, { Pack, CreditStats } from "@/hooks/usePayment";

export default function BillingPage() {
  const searchParams = useSearchParams();
  const [region, setRegion] = useState<"Global" | "Nigeria">("Global");
  const [credits, setCredits] = useState<number>(0);
  const [stats, setStats] = useState<CreditStats | null>(null);
  const [packs, setPacks] = useState<Pack[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { getCredits, getPricing, createCheckout, checkoutLoading } = usePayment();

  useEffect(() => {
    const success = searchParams.get("success");
    const canceled = searchParams.get("canceled");
    const packId = searchParams.get("packId");

    if (success === "true") {
      toast.success("Payment successful!", {
        description: "Your credits have been added to your account.",
      });
      window.history.replaceState({}, "", "/dashboard/billing");
    } else if (canceled === "true") {
      toast.info("Payment canceled", {
        description: "Your payment was canceled. No charges were made.",
      });
      window.history.replaceState({}, "", "/dashboard/billing");
    }
  }, [searchParams]);

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
      } catch (err) {}
    };
    detectRegion();
  }, []);

  const fetchData = async () => {
    try {
      setLoadingData(true);
      setError(null);

      const [creditsData, pricingData] = await Promise.all([
        getCredits(),
        getPricing(),
      ]);

      setCredits(creditsData.credits);
      setStats(creditsData.stats);
      setPacks(pricingData.packs.filter((p) => p.isActive && p.priceUSD > 0));
    } catch (err: any) {
      setError("Failed to load billing data");
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCheckout = async (packId: string) => {
    if (region === "Nigeria") {
      toast.info("Naira payments coming soon!", {
        description: "Please switch to Global (USD) to complete your purchase. We're working on adding local payment options.",
      });
      return;
    }

    try {
      await createCheckout(packId);
    } catch (err) {
      // Error already handled in hook
    }
  };

  const getPackFeatures = (pack: Pack) => {
    return [
      `${pack.tokens} AI Actions`,
      "Resume to Profile",
      "Text Enhancement",
      "Valid Forever",
    ];
  };

  if (loadingData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-brand-accent" />
          <p className="text-sm text-black/60 dark:text-white/60">
            Loading billing information...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4 text-center">
          <AlertCircle className="w-12 h-12 text-red-500/60" />
          <p className="text-black/60 dark:text-white/60">{error}</p>
          <Button variant="secondary" onClick={fetchData}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

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
            className={`flex items-center gap-2 px-6 py-2 rounded-full text-[10px] font-bold transition-all ${
              region === "Global"
                ? "bg-white dark:bg-black text-black dark:text-white shrink-0 shadow-lg"
                : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
            }`}
          >
            <Globe className="w-3 h-3" />
            GLOBAL (USD)
          </button>
          <button
            onClick={() => setRegion("Nigeria")}
            className={`flex items-center gap-2 px-6 py-2 rounded-full text-[10px] font-bold transition-all ${
              region === "Nigeria"
                ? "bg-white dark:bg-black text-black dark:text-white shrink-0 shadow-lg"
                : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
            }`}
          >
            <Zap className="w-3 h-3" />
            NIGERIA (NGN)
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
                  {credits}
                </span>
                <span className="text-xl font-medium text-black/40 dark:text-white/40 mb-2">
                  Credits
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              {credits > 0 && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-accent/10 border border-brand-accent/20 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-accent" />
                  <span className="text-[10px] font-bold text-black/80 dark:text-white/80 uppercase tracking-widest">
                    Active
                  </span>
                </div>
              )}
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
                {stats?.totalPurchased || 0}
              </div>
              <div className="text-[10px] font-medium text-black/40 dark:text-white/40 uppercase tracking-widest">
                Total Purchased
              </div>
            </div>
            <div className="bg-black/5 dark:bg-white/5 rounded-2xl p-4 border border-black/5 dark:border-white/5 text-center">
              <div className="text-xl font-bold text-black dark:text-white tracking-tight">
                {stats?.totalUsed || 0}
              </div>
              <div className="text-[10px] font-medium text-black/40 dark:text-white/40 uppercase tracking-widest">
                Credits Used
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

        {packs.length === 0 ? (
          <div className="text-center py-12 text-black/60 dark:text-white/60">
            <p>No credit packs available at the moment.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packs.map((pack, i) => {
              const isRecommended = pack.packId === "pro";
              const isLoading = checkoutLoading === pack.packId;
              const price =
                region === "Nigeria"
                  ? `₦${pack.priceNGN.toLocaleString()}`
                  : `$${pack.priceUSD.toFixed(2)}`;

              return (
                <motion.div
                  key={pack.packId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative group p-8 rounded-3xl border transition-all duration-300 ${
                    isRecommended
                      ? "bg-white/[0.04] dark:bg-white/[0.04] border-black/20 dark:border-white/20 shadow-2xl"
                      : "bg-transparent border-black/[0.08] dark:border-white/[0.08] hover:bg-black/[0.02] dark:hover:bg-white/[0.02] hover:border-black/20 dark:hover:border-white/20"
                  }`}
                >
                  {isRecommended && (
                    <div className="absolute -top-3 left-6 bg-brand-accent text-black text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-brand-accent/20">
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
                            {price}
                          </span>
                          <span className="text-black/40 dark:text-white/40 text-[11px] font-medium uppercase tracking-widest ml-1">
                            / {pack.tokens} credits
                          </span>
                        </div>
                      </div>
                      <div
                        className={`p-3 rounded-2xl ${
                          isRecommended
                            ? "bg-brand-accent/10 border border-brand-accent/20"
                            : "bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10"
                        }`}
                      >
                        <Zap
                          className={`w-6 h-6 ${
                            isRecommended
                              ? "text-brand-accent"
                              : "text-black/40 dark:text-white/40"
                          }`}
                        />
                      </div>
                    </div>

                    <ul className="space-y-4">
                      {getPackFeatures(pack).map((feature, j) => (
                        <li
                          key={j}
                          className="flex items-center gap-3 text-sm text-black/60 dark:text-white/60 font-light group-hover:text-black/80 dark:group-hover:text-white/80 transition-colors"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-500/60" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button
                      variant={isRecommended ? "primary" : "secondary"}
                      className="w-full h-14 rounded-2xl font-bold tracking-tight mt-2 flex items-center justify-center gap-2 group"
                      onClick={() => handleCheckout(pack.packId)}
                      disabled={isLoading || checkoutLoading !== null}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Processing...
                        </>
                      ) : region === "Nigeria" ? (
                        <>
                          Coming Soon
                          <Clock className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          Get Credits
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Security/Trust Footer */}
      <div className="pt-12 border-t border-black/[0.05] dark:border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-black/40 dark:text-white/40">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/50 dark:text-white/50">
              Secure checkout via Polar
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
    </div>
  );
}
