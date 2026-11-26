"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, CreditCard, Infinity as InfinityIcon, Wallet } from "lucide-react";
import SiteButton from "@/components/site/SiteButton";
import { Reveal, TileReveal } from "@/components/site/Reveal";
import { Container, Tag } from "@/components/site/Primitives";
import { EASE } from "@/components/site/motion";

interface Pack {
  packId: string;
  name: string;
  tokens: number | string;
  priceNGN: number;
  priceUSD: number;
}

type Region = "Global" | "Nigeria";

function RegionToggle({ value, onChange }: { value: Region; onChange: (r: Region) => void }) {
  return (
    <div
      role="tablist"
      aria-label="Pricing region"
      className="inline-flex rounded-[10px] bg-tile-3 p-1"
    >
      {(["Global", "Nigeria"] as const).map((r) => (
        <button
          key={r}
          role="tab"
          aria-selected={value === r}
          onClick={() => onChange(r)}
          className={`relative rounded-lg px-4 py-2 text-[14px] transition-colors duration-300 ${
            value === r ? "text-white" : "text-ink hover:opacity-70"
          }`}
        >
          {value === r && (
            <motion.span
              layoutId="region-pill"
              className="absolute inset-0 rounded-lg bg-ink"
              transition={{ type: "spring", stiffness: 420, damping: 36 }}
            />
          )}
          <span className="relative">{r === "Global" ? "USD" : "Naira"}</span>
        </button>
      ))}
    </div>
  );
}

export default function Pricing() {
  const [region, setRegion] = useState<Region>("Global");
  const [packsData, setPacksData] = useState<Pack[]>([]);

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
      } catch (err) {
        console.error("Region detection failed:", err);
      }
    };

    const fetchPricing = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000/api/v1";
        const res = await fetch(`${url}/pricing`);
        const json = await res.json();
        if (json.success && json.data?.packs) setPacksData(json.data.packs);
      } catch (err) {
        console.error("Failed to fetch pricing:", err);
      }
    };

    detectRegion();
    fetchPricing();
  }, []);

  const find = (id: string) => packsData.find((p) => p.packId === id);

  const price = (id: string, ngn: string, usd: string) => {
    const pack = find(id);
    if (!pack) return region === "Nigeria" ? ngn : usd;
    return region === "Nigeria" ? `₦${pack.priceNGN.toLocaleString()}` : `$${pack.priceUSD}`;
  };
  const tokens = (id: string, fallback: number) => find(id)?.tokens ?? fallback;
  const name = (id: string, fallback: string) => find(id)?.name ?? fallback;

  const features = (n: number | string) => [
    `${n} AI actions`,
    "Resume to profile",
    "Text enhancement",
    "Credits never expire",
  ];

  const packs = [
    {
      id: "welcome",
      name: name("welcome", "Welcome Pack"),
      price: price("welcome", "₦0", "$0"),
      period: "one-time",
      note: "Free when you sign up",
      features: features(tokens("welcome", 50)),
      cta: "Claim free credits",
    },
    {
      id: "pro",
      name: name("pro", "Pro Pack"),
      price: price("pro", "₦1,500", "$2.50"),
      period: `${tokens("pro", 250)} credits`,
      note: "Best for an active job search",
      features: features(tokens("pro", 250)),
      cta: "Buy credits",
      featured: true,
    },
    {
      id: "elite",
      name: name("elite", "Elite Pack"),
      price: price("elite", "₦5,000", "$8.00"),
      period: `${tokens("elite", 1000)} credits`,
      note: "For heavy, everyday use",
      features: features(tokens("elite", 1000)),
      cta: `Get ${tokens("elite", 1000)} credits`,
    },
  ];

  const tones = ["bg-tile-3", "bg-ink text-white", "bg-tile-2"];

  return (
    <section id="pricing" className="py-24 md:py-32">
      <Container>
        <div className="flex flex-col gap-8 px-1 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <Tag>Pricing</Tag>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-serif-display text-[42px] leading-[1.08] text-ink sm:text-[60px]">
                Pay only for
                <br />
                what you use
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="flex flex-col items-start gap-5 md:items-end">
            <p className="max-w-[360px] text-[15px] leading-[1.55] text-ink md:text-right">
              Buy credits when you need them. No subscriptions, and your credits never expire.
            </p>
            <RegionToggle value={region} onChange={setRegion} />
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 md:mt-14 md:grid-cols-3 lg:gap-5">
          {packs.map((p, i) => {
            const dark = p.featured;
            return (
              <TileReveal key={p.id} delay={i * 0.1}>
                <div className={`flex h-full min-h-[520px] flex-col rounded-2xl p-8 sm:p-10 ${tones[i]}`}>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-[22px] tracking-[-0.02em]">{p.name}</h3>
                    {dark && (
                      <span className="rounded-md bg-white/12 px-2.5 py-1 text-[13px]">
                        Most popular
                      </span>
                    )}
                  </div>
                  <p className={`mt-2 text-[14px] ${dark ? "text-white/65" : "text-ink-soft"}`}>
                    {p.note}
                  </p>

                  <div className="mt-10 flex items-baseline gap-2">
                    <span className="relative inline-flex h-[68px] overflow-hidden">
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                          key={p.price}
                          initial={{ y: "100%", opacity: 0 }}
                          animate={{ y: "0%", opacity: 1 }}
                          exit={{ y: "-100%", opacity: 0 }}
                          transition={{ duration: 0.5, ease: EASE }}
                          className="block font-serif-display text-[60px] leading-[68px] tabular-nums"
                        >
                          {p.price}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                    <span className={`text-[14px] ${dark ? "text-white/65" : "text-ink-soft"}`}>
                      / {p.period}
                    </span>
                  </div>

                  <ul className="mt-8 space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-[15px]">
                        <span
                          className={`grid size-5 shrink-0 place-items-center rounded-[5px] ${
                            dark ? "bg-white text-ink" : "bg-ink text-white"
                          }`}
                        >
                          <Check className="size-3" strokeWidth={2.75} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-10">
                    <SiteButton
                      href="/dashboard/billing"
                      variant={dark ? "light" : "primary"}
                      arrow
                      className="w-full justify-between"
                    >
                      {p.cta}
                    </SiteButton>
                  </div>
                </div>
              </TileReveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 px-1 text-[14px] text-ink">
            {[
              { icon: CreditCard, text: "No card needed to start" },
              { icon: InfinityIcon, text: "Credits never expire" },
              { icon: Wallet, text: "Pay in Naira or USD" },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="inline-flex items-center gap-2">
                <Icon className="size-4 text-ink-mute" strokeWidth={1.5} />
                {text}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
