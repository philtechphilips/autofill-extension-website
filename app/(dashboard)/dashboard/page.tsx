"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  ShieldCheck,
  History,
  CreditCard,
  MousePointer2,
  Clock,
  Globe,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  FileText,
  Wand2,
  XCircle,
  ArrowRight,
} from "lucide-react";
import api from "@/lib/api";
import Link from "next/link";

interface Stats {
  totalFills: number;
  totalFieldsFilled: number;
  totalSuccessfulFills: number;
  totalCVParses: number;
  totalEnhancements: number;
  timeSavedHours: number;
  successRate: number;
  lastActivityAt: string | null;
}

interface DailyData {
  date: string;
  count: number;
  fieldsFilled: number;
}

interface RecentEvent {
  id: string;
  type: "form_fill" | "cv_parse" | "text_enhance";
  domain: string | null;
  pageTitle: string | null;
  fieldCount: number;
  success: boolean;
  createdAt: string;
}

interface MetricCardProps {
  label: string;
  value: string;
  description: string;
  icon: any;
  trend?: string;
  loading?: boolean;
}

const MetricCard = ({
  label,
  value,
  description,
  icon: Icon,
  trend,
  loading,
}: MetricCardProps) => (
  <div className="glassmorphic p-8 rounded-[32px] group hover:border-white/[0.1] transition-all duration-500 overflow-hidden relative">
    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity translate-x-4 -translate-y-4 group-hover:translate-x-2 group-hover:-translate-y-2 duration-700">
      <Icon className="w-24 h-24" />
    </div>

    <div className="relative z-10">
      <div className="w-12 h-12 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.05] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
        <Icon className="w-6 h-6 text-black/80 dark:text-white/80 group-hover:text-white transition-colors" />
      </div>

      <div className="space-y-1 mb-4">
        <div className="flex items-end gap-3">
          {loading ? (
            <div className="h-10 w-20 bg-black/10 dark:bg-white/10 rounded animate-pulse" />
          ) : (
            <h3 className="text-4xl font-bold text-black dark:text-white tracking-tighter leading-none">
              {value}
            </h3>
          )}
          {trend && !loading && (
            <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 uppercase tracking-widest pb-1">
              <TrendingUp className="w-3 h-3" />
              {trend}
            </div>
          )}
        </div>
        <p className="text-xs font-bold text-black/70 dark:text-white/70 uppercase tracking-[0.2em]">
          {label}
        </p>
      </div>

      <p className="text-sm text-black/80 dark:text-white/80 font-light leading-relaxed max-w-[200px]">
        {description}
      </p>
    </div>
  </div>
);

const ActivityItem = ({ event }: { event: RecentEvent }) => {
  const getTimeAgo = (dateStr: string) => {
    const seconds = Math.floor(
      (Date.now() - new Date(dateStr).getTime()) / 1000,
    );
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const getEventTitle = (event: RecentEvent) => {
    if (event.type === "cv_parse") return "CV Parsed";
    if (event.type === "text_enhance") return "Text Enhanced";
    return event.pageTitle || "Form Fill";
  };

  const getEventIcon = () => {
    if (event.type === "cv_parse") return FileText;
    if (event.type === "text_enhance") return Wand2;
    return event.success ? CheckCircle2 : XCircle;
  };

  const EventIcon = getEventIcon();

  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/[0.02] transition-colors group cursor-pointer border border-transparent hover:border-white/[0.05]">
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center ${event.success ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}`}
      >
        <EventIcon className="w-5 h-5" />
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="text-sm font-semibold text-black dark:text-white truncate">
          {getEventTitle(event)}
        </div>
        <div className="text-[11px] text-black/70 dark:text-white/70 flex items-center gap-2">
          <Globe className="w-3 h-3" />
          {event.domain || "Local"}
        </div>
      </div>

      <div className="text-right">
        <div className="text-xs font-bold text-black/80 dark:text-white/80 uppercase tracking-tighter">
          {getTimeAgo(event.createdAt)}
        </div>
        {event.type === "form_fill" && event.fieldCount > 0 && (
          <div className="text-[10px] text-black/60 dark:text-white/60 mt-0.5">
            {event.fieldCount} fields
          </div>
        )}
      </div>

      <ChevronRight className="w-4 h-4 text-black/5 dark:text-white/5 group-hover:text-white/70 transition-colors" />
    </div>
  );
};

const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  }
  return num.toLocaleString();
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [dailyData, setDailyData] = useState<DailyData[]>([]);
  const [recentEvents, setRecentEvents] = useState<RecentEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, dailyRes, recentRes] = await Promise.all([
          api.get("/analytics/stats"),
          api.get("/analytics/daily?days=30"),
          api.get("/analytics/recent?limit=6"),
        ]);

        setStats(statsRes.data.data?.stats || statsRes.data.stats);
        setDailyData(dailyRes.data.data?.daily || dailyRes.data.daily || []);
        setRecentEvents(
          recentRes.data.data?.events || recentRes.data.events || [],
        );
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const maxDailyCount = Math.max(...dailyData.map((d) => d.count), 1);
  const chartData =
    dailyData.length > 0 ? dailyData : Array(30).fill({ count: 0 });

  const getDateRange = () => {
    if (dailyData.length === 0) return { start: "", end: "" };
    const startDate = new Date(dailyData[0]?.date);
    const endDate = new Date(dailyData[dailyData.length - 1]?.date);
    const format = (d: Date) =>
      d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    return { start: format(startDate), end: format(endDate) };
  };

  const dateRange = getDateRange();

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-brand-accent text-xs font-bold uppercase tracking-[0.3em] animate-pulse">
            <Sparkles className="w-4 h-4" />
            System Online
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-black dark:text-white tracking-tighter leading-none">
            Overview<span className="text-black/70 dark:text-white/70">.</span>
          </h1>
          <p className="text-xl text-black/80 dark:text-white/80 font-light max-w-4xl">
            Monitor your automated precision and efficiency gains across the
            digital landscape.
          </p>
        </div>

        {/* Credits Callout */}
        <Link href="/dashboard/billing">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="glassmorphic p-6 px-10 rounded-[32px] flex items-center justify-between gap-10 border-black/5 dark:border-white/5 hover:border-white/20 transition-all group cursor-pointer overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-6 relative z-10">
              <div className="w-12 h-12 bg-brand-accent/10 rounded-2xl flex items-center justify-center border border-brand-accent/20">
                <Zap className="w-6 h-6 text-brand-accent px-0" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-black/40 dark:text-white/40 uppercase tracking-[0.2em] mb-1">
                  Available Credits
                </div>
                <div className="text-3xl font-black text-black dark:text-white tracking-tighter">
                  42{" "}
                  <span className="text-sm font-light text-black/40 dark:text-white/40 ml-1 italic tracking-normal">
                    Credits left
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 relative z-10">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                Active Pack: Pro
              </span>
              <div className="flex items-center gap-2 text-black/60 dark:text-white/60 group-hover:text-white transition-colors">
                <span className="text-xs font-medium">Add credits</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>
        </Link>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          label="Autofills"
          value={formatNumber(stats?.totalFills || 0)}
          description="Total forms analyzed and successfully populated by AI."
          icon={Zap}
          loading={loading}
        />
        <MetricCard
          label="Fields Filled"
          value={formatNumber(stats?.totalFieldsFilled || 0)}
          description="Granular data points precisely mapped to remote schemas."
          icon={MousePointer2}
          loading={loading}
        />
        <MetricCard
          label="Time Saved"
          value={`${stats?.timeSavedHours?.toFixed(1) || "0"} h`}
          description="Estimated manual effort eliminated through automation."
          icon={Clock}
          loading={loading}
        />
        <MetricCard
          label="Success Rate"
          value={`${stats?.successRate?.toFixed(1) || "100"}%`}
          description="AI precision rating across diverse form architectures."
          icon={Sparkles}
          loading={loading}
        />
      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Usage Chart */}
        <div className="lg:col-span-2 glassmorphic p-10 rounded-[40px] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10">
            <Sparkles className="w-8 h-8 text-black/5 dark:text-white/5 animate-slow-pulse" />
          </div>

          <div className="flex items-center justify-between mb-12">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-black dark:text-white tracking-tight">
                Usage Intensity
              </h2>
              <p className="text-sm text-black/80 dark:text-white/80 font-light italic">
                Frequency of automated interactions over 30 days.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-accent shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              <span className="text-[10px] font-bold text-black/80 dark:text-white/80 uppercase tracking-widest pb-px">
                Live Data
              </span>
            </div>
          </div>

          <div className="h-64 w-full flex items-end gap-1 px-2 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-brand-accent/5 to-transparent rounded-3xl" />
            {chartData.map((day, i) => {
              const height =
                maxDailyCount > 0 ? (day.count / maxDailyCount) * 100 : 0;
              return (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.max(height, 2)}%` }}
                  transition={{
                    delay: i * 0.02,
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex-1 bg-black/[0.03] dark:bg-white/[0.03] hover:bg-white/[0.1] rounded-t-lg transition-all relative group/bar"
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap shadow-xl z-10">
                    {day.count} fills
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex justify-between mt-8 px-2 text-[10px] font-bold text-black/60 dark:text-white/60 uppercase tracking-[0.2em]">
            <span>{dateRange.start}</span>
            <span>{dateRange.end}</span>
          </div>
        </div>

        {/* Activity Log */}
        <div className="glassmorphic p-8 rounded-[40px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-black dark:text-white tracking-tight">
              Recent Stream
            </h2>
            <Link
              href="/dashboard/history"
              className="text-[10px] font-bold text-black/70 dark:text-white/70 hover:text-white transition-colors uppercase tracking-widest border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] px-3 py-1.5 rounded-full"
            >
              View all
            </Link>
          </div>

          <div className="flex-1 space-y-2">
            {loading ? (
              Array(6)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex items-center gap-4 p-4">
                    <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-32 bg-black/10 dark:bg-white/10 rounded animate-pulse" />
                      <div className="h-3 w-24 bg-black/5 dark:bg-white/5 rounded animate-pulse" />
                    </div>
                  </div>
                ))
            ) : recentEvents.length > 0 ? (
              recentEvents.map((event) => (
                <ActivityItem key={event.id} event={event} />
              ))
            ) : (
              <div className="flex-1 flex items-center justify-center text-black/50 dark:text-white/50 text-sm">
                No activity yet. Start filling forms!
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-black/[0.05] dark:border-white/[0.05] text-center">
            <p className="text-[10px] font-bold text-black/60 dark:text-white/60 uppercase tracking-[0.3em]">
              Autofill Engine
              <span className="text-emerald-500/40 ml-2">ONLINE</span>
            </p>
          </div>
        </div>
      </div>
    </div >
  );
}
