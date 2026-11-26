"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AlertCircle, Check, Lock, RefreshCw, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import usePayment, { Pack, CreditStats } from "@/hooks/usePayment";
import { EmptyState, PageHeader, Panel, Segmented, Spinner } from "@/components/app/AppUI";
import SiteButton from "@/components/site/SiteButton";

type Region = "Global" | "Nigeria";

export default function BillingPage() {
  const searchParams = useSearchParams();
  const [region, setRegion] = useState<Region>("Global");
  const [credits, setCredits] = useState<number>(0);
  const [stats, setStats] = useState<CreditStats | null>(null);
  const [packs, setPacks] = useState<Pack[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { getCredits, getPricing, createCheckout, initializePaystack, checkoutLoading } = usePayment();

  useEffect(() => {
    const success = searchParams.get("success");
    const canceled = searchParams.get("canceled");
    const method = searchParams.get("method");

    if (success === "true") {
      toast.success("Payment successful!", {
        description:
          method === "paystack"
            ? "Naira payment confirmed! Your credits have been added."
            : "Your credits have been added to your account.",
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
      } catch {}
    };
    detectRegion();
  }, []);

  const loadData = async () => {
    try {
      const [creditsData, pricingData] = await Promise.all([getCredits(), getPricing()]);
      setCredits(creditsData.credits);
      setStats(creditsData.stats);
      setPacks(pricingData.packs.filter((p) => p.isActive && p.priceUSD > 0));
      setError(null);
    } catch {
      setError("Failed to load billing data");
    } finally {
      setLoadingData(false);
    }
  };

  const fetchData = () => {
    setLoadingData(true);
    setError(null);
    loadData();
  };

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const [creditsData, pricingData] = await Promise.all([getCredits(), getPricing()]);
        if (ignore) return;
        setCredits(creditsData.credits);
        setStats(creditsData.stats);
        setPacks(pricingData.packs.filter((p) => p.isActive && p.priceUSD > 0));
      } catch {
        if (!ignore) setError("Failed to load billing data");
      } finally {
        if (!ignore) setLoadingData(false);
      }
    })();
    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCheckout = async (packId: string) => {
    try {
      if (region === "Nigeria") {
        await initializePaystack(packId);
      } else {
        await createCheckout(packId);
      }
    } catch {
      // Error already handled in hook
    }
  };

  const getPackFeatures = (pack: Pack) => [
    `${pack.tokens} AI actions`,
    "Resume to profile",
    "Text enhancement",
    "Credits never expire",
  ];

  if (loadingData) {
    return (
      <div className="grid min-h-[400px] place-items-center">
        <div className="flex flex-col items-center gap-4">
          <Spinner />
          <p className="text-[14px] text-ink-soft">Loading billing information…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Panel className="mt-10">
        <EmptyState
          icon={<AlertCircle />}
          title={error}
          action={
            <SiteButton variant="secondary" onClick={fetchData} icon={<RefreshCw />}>
              Try again
            </SiteButton>
          }
        />
      </Panel>
    );
  }

  return (
    <div>
      <PageHeader
        title="Credits"
        subtitle="Check your balance and top up whenever you need more."
        actions={
          <Segmented<Region>
            id="billing-region"
            value={region}
            onChange={setRegion}
            options={[
              { value: "Global", label: "Pay in USD" },
              { value: "Nigeria", label: "Pay in Naira" },
            ]}
          />
        }
      />

      {/* Balance */}
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-5">
        <Panel tone="periwinkle" className="flex flex-col justify-between p-7 sm:p-9">
          <div className="text-[14px] text-ink-soft">Available balance</div>
          <div className="mt-8 flex items-baseline gap-3">
            <span className="font-serif-display text-[80px] leading-none">{credits}</span>
            <span className="text-[16px] text-ink-soft">credits</span>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {credits > 0 && (
              <span className="rounded-md bg-white px-2.5 py-1 text-[13px]">Active</span>
            )}
            <span className="rounded-md bg-white px-2.5 py-1 text-[13px]">Never expires</span>
          </div>
        </Panel>
        <Panel tone="haze" delay={0.05} className="flex flex-col justify-between p-7">
          <div className="text-[14px] text-ink-soft">Total purchased</div>
          <div className="mt-8 font-serif-display text-[48px] leading-none">{stats?.totalPurchased || 0}</div>
        </Panel>
        <Panel tone="warm-soft" delay={0.1} className="flex flex-col justify-between p-7">
          <div className="text-[14px] text-ink-soft">Credits used</div>
          <div className="mt-8 font-serif-display text-[48px] leading-none">{stats?.totalUsed || 0}</div>
        </Panel>
      </div>

      {/* Packs */}
      <h2 className="mb-5 mt-12 text-[22px] tracking-[-0.02em] text-ink">Buy more credits</h2>
      {packs.length === 0 ? (
        <Panel>
          <EmptyState title="No credit packs available right now">
            Please check back soon.
          </EmptyState>
        </Panel>
      ) : (
        <div
          className={`grid gap-4 md:grid-cols-2 lg:gap-5 ${packs.length >= 3 ? "lg:grid-cols-3" : ""}`}
        >
          {packs.map((pack, i) => {
            const featured = pack.packId === "pro";
            const isLoading = checkoutLoading === pack.packId;
            const price =
              region === "Nigeria" ? `₦${pack.priceNGN.toLocaleString()}` : `$${pack.priceUSD.toFixed(2)}`;
            const tone = featured ? "ink" : i % 2 === 0 ? "haze" : "mist";

            return (
              <Panel key={pack.packId} tone={tone} delay={0.15 + i * 0.05} className="flex flex-col p-7 sm:p-8">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-[20px] tracking-[-0.02em]">{pack.name}</h3>
                  {featured && (
                    <span className="rounded-md bg-white/12 px-2.5 py-1 text-[12.5px]">Best value</span>
                  )}
                </div>
                <div className="mt-8 flex items-baseline gap-2">
                  <span className="font-serif-display text-[52px] leading-none">{price}</span>
                  <span className={`text-[14px] ${featured ? "text-white/65" : "text-ink-soft"}`}>
                    / {pack.tokens} credits
                  </span>
                </div>

                <ul className="mt-8 space-y-3">
                  {getPackFeatures(pack).map((f) => (
                    <li key={f} className="flex items-center gap-3 text-[15px]">
                      <span
                        className={`grid size-5 shrink-0 place-items-center rounded-[5px] ${
                          featured ? "bg-white text-ink" : "bg-ink text-white"
                        }`}
                      >
                        <Check className="size-3" strokeWidth={2.75} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-9">
                  <SiteButton
                    variant={featured ? "light" : "primary"}
                    className="w-full justify-between"
                    arrow={!isLoading}
                    loading={isLoading}
                    disabled={checkoutLoading !== null}
                    onClick={() => handleCheckout(pack.packId)}
                  >
                    {isLoading ? "Processing…" : region === "Nigeria" ? "Buy in Naira" : "Get credits"}
                  </SiteButton>
                </div>
              </Panel>
            );
          })}
        </div>
      )}

      <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-[14px] text-ink-soft">
        <span className="inline-flex items-center gap-2">
          <ShieldCheck className="size-4" strokeWidth={1.5} /> Secure checkout in Naira or USD
        </span>
        <span className="inline-flex items-center gap-2">
          <Lock className="size-4" strokeWidth={1.5} /> 256-bit AES encryption
        </span>
      </div>
    </div>
  );
}
