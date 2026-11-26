"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";
import { PageHeader, Panel, PanelHeader, Spinner } from "@/components/app/AppUI";
import SiteButton from "@/components/site/SiteButton";
import { fieldClass, FieldLabel } from "@/components/site/Field";

interface TokenCosts {
  formAnalysis: number;
  textEnhancement: number;
  textGeneration: number;
  cvParsing: number;
  profileUsage: number;
}

interface Pack {
  packId: string;
  name: string;
  tokens: number;
  priceNGN: number;
  priceUSD: number;
  isActive: boolean;
}

const costFields: { key: keyof TokenCosts; label: string }[] = [
  { key: "formAnalysis", label: "Form analysis" },
  { key: "textEnhancement", label: "Text enhancement" },
  { key: "textGeneration", label: "Text generation" },
  { key: "cvParsing", label: "Resume parsing" },
  { key: "profileUsage", label: "Profile usage" },
];

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="inline-flex items-center gap-3 text-[14px] text-ink-soft"
    >
      {label}
      <span className={`relative h-6 w-10 rounded-full transition-colors duration-300 ${checked ? "bg-ink" : "bg-line-strong"}`}>
        <motion.span
          className="absolute top-0.5 size-5 rounded-full bg-white"
          animate={{ left: checked ? 18 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 32 }}
        />
      </span>
    </button>
  );
}

export default function AdminSettingsPage() {
  const [tokenCosts, setTokenCosts] = useState<TokenCosts>({
    formAnalysis: 0,
    textEnhancement: 0,
    textGeneration: 0,
    cvParsing: 0,
    profileUsage: 0,
  });
  const [packs, setPacks] = useState<Pack[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingTokens, setSavingTokens] = useState(false);
  const [savingPack, setSavingPack] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get("/admin/settings");
        if (res.data.success) {
          setTokenCosts(res.data.data.tokenCosts);
          setPacks(res.data.data.packs);
        }
      } catch (err) {
        console.error("Failed to fetch settings:", err);
        toast.error("Failed to load settings.");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleUpdateTokenCosts = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingTokens(true);
    try {
      const res = await api.put("/admin/settings/token-costs", tokenCosts);
      if (res.data.success) toast.success("Token costs updated successfully");
    } catch (err) {
      console.error("Failed to update token costs:", err);
      toast.error("Failed to update token costs");
    } finally {
      setSavingTokens(false);
    }
  };

  const handleUpdatePack = async (e: React.FormEvent, packId: string) => {
    e.preventDefault();
    setSavingPack(packId);
    try {
      const packToSave = packs.find((p) => p.packId === packId);
      if (!packToSave) return;
      const res = await api.put(`/admin/settings/packs/${packId}`, {
        name: packToSave.name,
        tokens: Number(packToSave.tokens),
        priceNGN: Number(packToSave.priceNGN),
        priceUSD: Number(packToSave.priceUSD),
        isActive: packToSave.isActive,
      });
      if (res.data.success) toast.success(`${packToSave.name} updated successfully`);
    } catch (err) {
      console.error("Failed to update pack:", err);
      toast.error("Failed to update pack");
    } finally {
      setSavingPack(null);
    }
  };

  const handlePackChange = (packId: string, field: keyof Pack, value: any) => {
    setPacks(packs.map((p) => (p.packId === packId ? { ...p, [field]: value } : p)));
  };

  if (loading) {
    return (
      <div className="grid place-items-center py-24">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <PageHeader tag="Admin" title="Settings" subtitle="Credit costs for each AI action, and the packs people can buy." />

      <Panel>
        <PanelHeader title="Credit costs" subtitle="How many credits each action uses." />
        <form onSubmit={handleUpdateTokenCosts} className="px-6 pb-6 sm:px-7">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {costFields.map(({ key, label }) => (
              <label key={key} className="block">
                <FieldLabel>{label}</FieldLabel>
                <input
                  type="number"
                  min="0"
                  value={tokenCosts[key]}
                  onChange={(e) => setTokenCosts({ ...tokenCosts, [key]: Number(e.target.value) })}
                  className={fieldClass}
                />
              </label>
            ))}
          </div>
          <div className="mt-6 border-t border-line pt-6">
            <SiteButton type="submit" loading={savingTokens} icon={<Save />}>
              Save credit costs
            </SiteButton>
          </div>
        </form>
      </Panel>

      <h2 className="mb-5 mt-12 text-[22px] tracking-[-0.02em] text-ink">Credit packs</h2>
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
        {packs.map((pack, i) => (
          <Panel key={pack.packId} delay={0.05 * i}>
            <form onSubmit={(e) => handleUpdatePack(e, pack.packId)} className="p-6 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h3 className="text-[19px] capitalize tracking-[-0.02em]">{pack.packId} pack</h3>
                <Toggle
                  label={pack.isActive ? "Active" : "Hidden"}
                  checked={pack.isActive}
                  onChange={(v) => handlePackChange(pack.packId, "isActive", v)}
                />
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <FieldLabel>Display name</FieldLabel>
                  <input
                    type="text"
                    value={pack.name}
                    onChange={(e) => handlePackChange(pack.packId, "name", e.target.value)}
                    className={fieldClass}
                    required
                  />
                </label>
                <label className="block">
                  <FieldLabel>Credits included</FieldLabel>
                  <input
                    type="number"
                    min="0"
                    value={pack.tokens}
                    onChange={(e) => handlePackChange(pack.packId, "tokens", Number(e.target.value))}
                    className={fieldClass}
                    required
                  />
                </label>
                <label className="block">
                  <FieldLabel>Price (NGN)</FieldLabel>
                  <input
                    type="number"
                    min="0"
                    value={pack.priceNGN}
                    onChange={(e) => handlePackChange(pack.packId, "priceNGN", Number(e.target.value))}
                    className={fieldClass}
                    required
                  />
                </label>
                <label className="block">
                  <FieldLabel>Price (USD)</FieldLabel>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={pack.priceUSD}
                    onChange={(e) => handlePackChange(pack.packId, "priceUSD", Number(e.target.value))}
                    className={fieldClass}
                    required
                  />
                </label>
              </div>

              <div className="mt-6 border-t border-line pt-6">
                <SiteButton type="submit" variant="secondary" loading={savingPack === pack.packId} icon={<Save />}>
                  Update {pack.name}
                </SiteButton>
              </div>
            </form>
          </Panel>
        ))}
      </div>
    </div>
  );
}
