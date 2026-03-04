"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Settings, Save, ShieldAlert, Loader2 } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";

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
                toast.error("Failed to load generic settings.");
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
            if (res.data.success) {
                toast.success("Token costs updated successfully");
            }
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
            const packToSave = packs.find(p => p.packId === packId);
            if (!packToSave) return;
            const res = await api.put(`/admin/settings/packs/${packId}`, {
                name: packToSave.name,
                tokens: Number(packToSave.tokens),
                priceNGN: Number(packToSave.priceNGN),
                priceUSD: Number(packToSave.priceUSD),
                isActive: packToSave.isActive,
            });
            if (res.data.success) {
                toast.success(`${packToSave.name} updated successfully`);
            }
        } catch (err) {
            console.error("Failed to update pack:", err);
            toast.error("Failed to update pack");
        } finally {
            setSavingPack(null);
        }
    };

    const handlePackChange = (packId: string, field: keyof Pack, value: any) => {
        setPacks(packs.map(p => p.packId === packId ? { ...p, [field]: value } : p));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-black/50 dark:text-white/90 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-12">
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-500 text-xs font-bold uppercase tracking-[0.3em] animate-pulse">
                    <Settings className="w-4 h-4" />
                    System Settings
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-black dark:text-white tracking-tighter leading-none">
                    Configuration<span className="text-black/70 dark:text-white/90">.</span>
                </h1>
                <p className="text-xl text-black/80 dark:text-white/80 font-light max-w-4xl">
                    Manage token costs for AI actions and configure pricing packs.
                </p>
            </div>

            <div className="glassmorphic p-8 rounded-[40px] max-w-4xl">
                <h2 className="text-2xl font-bold text-black dark:text-white tracking-tight mb-8">
                    Token Costs Configuration
                </h2>
                <form onSubmit={handleUpdateTokenCosts} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-black/80 dark:text-white/80">Form Analysis Cost</label>
                            <input
                                type="number"
                                min="0"
                                value={tokenCosts.formAnalysis}
                                onChange={(e) => setTokenCosts({ ...tokenCosts, formAnalysis: Number(e.target.value) })}
                                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-black dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-black/80 dark:text-white/80">Text Enhancement Cost</label>
                            <input
                                type="number"
                                min="0"
                                value={tokenCosts.textEnhancement}
                                onChange={(e) => setTokenCosts({ ...tokenCosts, textEnhancement: Number(e.target.value) })}
                                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-black dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-black/80 dark:text-white/80">Text Generation Cost</label>
                            <input
                                type="number"
                                min="0"
                                value={tokenCosts.textGeneration}
                                onChange={(e) => setTokenCosts({ ...tokenCosts, textGeneration: Number(e.target.value) })}
                                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-black dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-black/80 dark:text-white/80">CV Parsing Cost</label>
                            <input
                                type="number"
                                min="0"
                                value={tokenCosts.cvParsing}
                                onChange={(e) => setTokenCosts({ ...tokenCosts, cvParsing: Number(e.target.value) })}
                                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-black dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-black/80 dark:text-white/80">Profile Usage Cost</label>
                            <input
                                type="number"
                                min="0"
                                value={tokenCosts.profileUsage}
                                onChange={(e) => setTokenCosts({ ...tokenCosts, profileUsage: Number(e.target.value) })}
                                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-black dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={savingTokens}
                        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-black dark:text-white px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50"
                    >
                        {savingTokens ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Token Costs
                    </button>
                </form>
            </div>

            <div className="glassmorphic p-8 rounded-[40px] max-w-4xl">
                <h2 className="text-2xl font-bold text-black dark:text-white tracking-tight mb-8">
                    Pricing Packs Configuration
                </h2>
                <div className="space-y-12">
                    {packs.map((pack) => (
                        <form key={pack.packId} onSubmit={(e) => handleUpdatePack(e, pack.packId)} className="space-y-6 pb-12 border-b border-black/10 dark:border-white/10 last:border-0 last:pb-0">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-black dark:text-white capitalize">{pack.packId} Pack</h3>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <span className="text-sm text-black/60 dark:text-white/80">Active Status</span>
                                    <input
                                        type="checkbox"
                                        checked={pack.isActive}
                                        onChange={(e) => handlePackChange(pack.packId, 'isActive', e.target.checked)}
                                        className="w-5 h-5 accent-blue-500 rounded bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10"
                                    />
                                </label>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-black/80 dark:text-white/80">Display Name</label>
                                    <input
                                        type="text"
                                        value={pack.name}
                                        onChange={(e) => handlePackChange(pack.packId, 'name', e.target.value)}
                                        className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-black dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-black/80 dark:text-white/80">Tokens Provided</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={pack.tokens}
                                        onChange={(e) => handlePackChange(pack.packId, 'tokens', Number(e.target.value))}
                                        className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-black dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-black/80 dark:text-white/80">Price (NGN)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={pack.priceNGN}
                                        onChange={(e) => handlePackChange(pack.packId, 'priceNGN', Number(e.target.value))}
                                        className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-black dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-black/80 dark:text-white/80">Price (USD)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={pack.priceUSD}
                                        onChange={(e) => handlePackChange(pack.packId, 'priceUSD', Number(e.target.value))}
                                        className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-black dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={savingPack === pack.packId}
                                className="flex items-center gap-2 bg-blue-500/20 text-blue-500 hover:bg-blue-500 hover:text-white px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50"
                            >
                                {savingPack === pack.packId ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                Update {pack.name}
                            </button>
                        </form>
                    ))}
                </div>
            </div>
        </div>
    );
}
