'use client';

import { motion } from 'framer-motion';
import {
    Zap,
    MousePointer2,
    Clock,
    Globe,
    ArrowUpRight,
    TrendingUp,
    CheckCircle2,
    Search,
    ChevronRight,
    Sparkles
} from 'lucide-react';

interface MetricCardProps {
    label: string;
    value: string;
    description: string;
    icon: any;
    trend?: string;
}

const MetricCard = ({ label, value, description, icon: Icon, trend }: MetricCardProps) => (
    <div className="glassmorphic p-8 rounded-[32px] group hover:border-white/[0.1] transition-all duration-500 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity translate-x-4 -translate-y-4 group-hover:translate-x-2 group-hover:-translate-y-2 duration-700">
            <Icon className="w-24 h-24" />
        </div>

        <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Icon className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" />
            </div>

            <div className="space-y-1 mb-4">
                <div className="flex items-end gap-3">
                    <h3 className="text-4xl font-bold text-white tracking-tighter leading-none">{value}</h3>
                    {trend && (
                        <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 uppercase tracking-widest pb-1">
                            <TrendingUp className="w-3 h-3" />
                            {trend}
                        </div>
                    )}
                </div>
                <p className="text-xs font-bold text-white/70 uppercase tracking-[0.2em]">{label}</p>
            </div>

            <p className="text-sm text-white/80 font-light leading-relaxed max-w-[200px]">
                {description}
            </p>
        </div>
    </div>
);

const ActivityItem = ({ title, domain, time, status }: { title: string, domain: string, time: string, status: 'success' | 'pending' }) => (
    <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/[0.02] transition-colors group cursor-pointer border border-transparent hover:border-white/[0.05]">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${status === 'success' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-white/5 text-white/70'
            }`}>
            {status === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
        </div>

        <div className="flex-1 overflow-hidden">
            <div className="text-sm font-semibold text-white truncate">{title}</div>
            <div className="text-[11px] text-white/70 flex items-center gap-2">
                <Globe className="w-3 h-3" />
                {domain}
            </div>
        </div>

        <div className="text-right">
            <div className="text-xs font-bold text-white/80 uppercase tracking-tighter">{time}</div>
            <div className="text-[10px] text-white/60 mt-0.5 font-mono">ID: 882B..E92</div>
        </div>

        <ChevronRight className="w-4 h-4 text-white/5 group-hover:text-white/70 transition-colors" />
    </div>
);

export default function DashboardPage() {
    return (
        <div className="space-y-12">
            {/* Welcoming Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-brand-accent text-xs font-bold uppercase tracking-[0.3em] animate-pulse">
                        <Sparkles className="w-4 h-4" />
                        System Online
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tighter leading-none">
                        Overview<span className="text-white/70">.</span>
                    </h1>
                    <p className="text-xl text-white/80 font-light max-w-xl">
                        Monitor your automated precision and efficiency gains across the digital landscape.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="h-14 w-14 glassmorphic rounded-2xl flex items-center justify-center group cursor-pointer hover:border-white/20 transition-all">
                        <Search className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
                    </div>
                    <button className="h-14 px-8 glassmorphic rounded-2xl text-sm font-bold tracking-tight text-white hover:bg-white/[0.05] transition-all flex items-center gap-3">
                        Report Export
                        <ArrowUpRight className="w-4 h-4 text-white/70" />
                    </button>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    label="Autofills"
                    value="1,284"
                    trend="+12%"
                    description="Total forms analyzed and successfully populated by AI."
                    icon={Zap}
                />
                <MetricCard
                    label="Fields Filled"
                    value="14.2k"
                    trend="+8%"
                    description="Granular data points precisely mapped to remote schemas."
                    icon={MousePointer2}
                />
                <MetricCard
                    label="Time Saved"
                    value="42.5h"
                    trend="+15%"
                    description="Estimated manual effort eliminated through automation."
                    icon={Clock}
                />
                <MetricCard
                    label="Efficiency"
                    value="99.4%"
                    description="AI precision rating across diverse form architectures."
                    icon={Sparkles}
                />
            </div>

            {/* Main Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Visual Analytics Simulation */}
                <div className="lg:col-span-2 glassmorphic p-10 rounded-[40px] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-10">
                        <Sparkles className="w-8 h-8 text-white/5 animate-slow-pulse" />
                    </div>

                    <div className="flex items-center justify-between mb-12">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-bold text-white tracking-tight">Usage Intensity</h2>
                            <p className="text-sm text-white/80 font-light italic">Frequency of automated interactions over 30 days.</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-brand-accent shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                            <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest pb-px">Live Stream</span>
                        </div>
                    </div>

                    {/* Mock Graph */}
                    <div className="h-64 w-full flex items-end gap-1 px-2 relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-accent/5 to-transparent rounded-3xl" />
                        {[40, 60, 45, 80, 55, 90, 70, 85, 95, 80, 65, 50, 75, 85, 100, 90, 70, 60, 55, 40].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ delay: i * 0.05, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="flex-1 bg-white/[0.03] hover:bg-white/[0.1] rounded-t-lg transition-all relative group/bar"
                            >
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-white text-black text-[10px] font-bold opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
                                    {h * 12} forms
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex justify-between mt-8 px-2 text-[10px] font-bold text-white/60 uppercase tracking-[0.2em]">
                        <span>Jan 21</span>
                        <span>Feb 21</span>
                    </div>
                </div>

                {/* Activity Log */}
                <div className="glassmorphic p-8 rounded-[40px] flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-bold text-white tracking-tight">Recent Stream</h2>
                        <button className="text-[10px] font-bold text-white/70 hover:text-white transition-colors uppercase tracking-widest border border-white/5 bg-white/[0.02] px-3 py-1.5 rounded-full">
                            View all
                        </button>
                    </div>

                    <div className="flex-1 space-y-2">
                        <ActivityItem title="Visa Application" domain="gov.uk" time="2m ago" status="success" />
                        <ActivityItem title="Standard Checkout" domain="amazon.com" time="14m ago" status="success" />
                        <ActivityItem title="Enterprise Survey" domain="typeform.com" time="1h ago" status="success" />
                        <ActivityItem title="User Registration" domain="stripe.com" time="3h ago" status="success" />
                        <ActivityItem title="KYC Verification" domain="binance.com" time="5h ago" status="pending" />
                        <ActivityItem title="B2B Lead Form" domain="hubspot.com" time="昨天" status="success" />
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/[0.05] text-center">
                        <p className="text-[10px] font-bold text-white/60 uppercase tracking-[0.3em]">
                            Global Precision Engine
                            <span className="text-emerald-500/40 ml-2">V2.4 ONLINE</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
