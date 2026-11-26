"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  FileText,
  MousePointer2,
  Sparkles,
  Wand2,
  XCircle,
  Zap,
} from "lucide-react";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { EmptyState, PageHeader, Panel, PanelHeader, StatTile } from "@/components/app/AppUI";
import { EASE } from "@/components/site/motion";

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

interface LastPack {
  packId: string;
  packName: string;
  purchasedAt: string;
}

const formatNumber = (num: number): string => {
  if (num >= 1000) return (num / 1000).toFixed(1) + "k";
  return num.toLocaleString();
};

const timeAgo = (dateStr: string) => {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};

function ActivityRow({ event }: { event: RecentEvent }) {
  const title =
    event.type === "cv_parse"
      ? "Resume parsed"
      : event.type === "text_enhance"
        ? "Text enhanced"
        : event.pageTitle || "Form fill";
  const Icon =
    event.type === "cv_parse"
      ? FileText
      : event.type === "text_enhance"
        ? Wand2
        : event.success
          ? CheckCircle2
          : XCircle;

  return (
    <div className="flex items-center gap-4 border-b border-line px-6 py-4 last:border-b-0 sm:px-7">
      <span
        className={`grid size-10 shrink-0 place-items-center rounded-[10px] ${
          event.success ? "bg-tile-3 text-ink" : "bg-red-50 text-red-700"
        }`}
      >
        <Icon className="size-[18px]" strokeWidth={1.5} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[14.5px] text-ink">{title}</div>
        <div className="truncate text-[13px] text-ink-mute">{event.domain || "Local"}</div>
      </div>
      <div className="text-right text-[13px]">
        <div className="text-ink-soft">{timeAgo(event.createdAt)}</div>
        {event.type === "form_fill" && event.fieldCount > 0 && (
          <div className="text-ink-mute">{event.fieldCount} fields</div>
        )}
      </div>
    </div>
  );
}

function Skeleton({ className = "" }: { className?: string }) {
  return <span className={`inline-block animate-pulse rounded-md bg-ink/[0.07] ${className}`} />;
}

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const [stats, setStats] = useState<Stats | null>(null);
  const [dailyData, setDailyData] = useState<DailyData[]>([]);
  const [recentEvents, setRecentEvents] = useState<RecentEvent[]>([]);
  const [credits, setCredits] = useState<number>(0);
  const [lastPack, setLastPack] = useState<LastPack | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, dailyRes, recentRes, creditsRes] = await Promise.all([
          api.get("/analytics/stats"),
          api.get("/analytics/daily?days=30"),
          api.get("/analytics/recent?limit=6"),
          api.get("/payment/credits"),
        ]);

        setStats(statsRes.data.data?.stats || statsRes.data.stats);
        setDailyData(dailyRes.data.data?.daily || dailyRes.data.daily || []);
        setRecentEvents(recentRes.data.data?.events || recentRes.data.events || []);
        setCredits(creditsRes.data.data?.credits || 0);
        setLastPack(creditsRes.data.data?.lastPack || null);
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const maxDailyCount = Math.max(...dailyData.map((d) => d.count), 1);
  const chartData: { count: number; date?: string }[] =
    dailyData.length > 0 ? dailyData : Array(30).fill({ count: 0 });

  const fmt = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const dateRange =
    dailyData.length === 0
      ? { start: "", end: "" }
      : {
          start: fmt(new Date(dailyData[0]?.date)),
          end: fmt(new Date(dailyData[dailyData.length - 1]?.date)),
        };

  const firstName = user?.name?.split(" ")[0];
  const value = (v: string) => (loading ? <Skeleton className="h-10 w-20" /> : v);

  return (
    <div>
      <PageHeader
        title={firstName ? `Welcome back, ${firstName}` : "Overview"}
        subtitle="Here’s what AutoFill has done for you so far."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        <StatTile
          tone="haze"
          label="Forms filled"
          icon={<Zap />}
          value={value(formatNumber(stats?.totalFills || 0))}
          hint="Forms read and filled for you"
        />
        <StatTile
          tone="mist"
          delay={0.05}
          label="Fields filled"
          icon={<MousePointer2 />}
          value={value(formatNumber(stats?.totalFieldsFilled || 0))}
          hint="Individual answers entered"
        />
        <StatTile
          tone="warm-soft"
          delay={0.1}
          label="Time saved"
          icon={<Clock />}
          value={value(`${stats?.timeSavedHours?.toFixed(1) || "0"} h`)}
          hint="Estimated typing you skipped"
        />
        <StatTile
          tone="periwinkle"
          delay={0.15}
          label="Success rate"
          icon={<Sparkles />}
          value={value(`${stats?.successRate?.toFixed(1) || "100"}%`)}
          hint="Fills completed without errors"
        />
      </div>

      <div className="mt-4 grid gap-4 lg:mt-5 lg:grid-cols-3 lg:gap-5">
        {/* Chart */}
        <Panel delay={0.2} className="lg:col-span-2">
          <PanelHeader title="Activity" subtitle="Forms filled over the last 30 days" />
          <div className="px-6 pb-6 sm:px-7">
            <div className="flex h-56 items-end gap-[3px]">
              {chartData.map((day, i) => {
                const height = (day.count / maxDailyCount) * 100;
                return (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.max(height, 2)}%` }}
                    transition={{ delay: 0.3 + i * 0.015, duration: 0.8, ease: EASE }}
                    className="group/bar relative flex-1 rounded-t-[4px] bg-tile-1 transition-colors hover:bg-ink"
                  >
                    <span className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink px-2 py-1 text-[11px] text-white opacity-0 transition-opacity group-hover/bar:opacity-100">
                      {day.count} fills
                    </span>
                  </motion.div>
                );
              })}
            </div>
            <div className="mt-3 flex justify-between text-[12.5px] text-ink-mute">
              <span>{dateRange.start}</span>
              <span>{dateRange.end}</span>
            </div>
          </div>
        </Panel>

        {/* Credits */}
        <Panel tone="ink" delay={0.25} className="flex flex-col justify-between p-7">
          <div>
            <div className="text-[14px] text-white/70">Available credits</div>
            <div className="mt-4 font-serif-display text-[64px] leading-none">
              {loading ? <Skeleton className="h-14 w-28 bg-white/10" /> : formatNumber(credits)}
            </div>
            <div className="mt-3 text-[13.5px] text-white/60">
              {loading ? "" : lastPack ? `Last pack: ${lastPack.packName}` : "Free tier"}
            </div>
          </div>
          <Link
            href="/dashboard/billing"
            className="group mt-10 flex items-center justify-between rounded-[10px] bg-white px-5 py-4 text-[15px] text-ink transition-colors hover:bg-paper"
          >
            {lastPack ? "Add more credits" : "Get credits"}
            <ArrowRight className="size-[18px] transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
          </Link>
        </Panel>
      </div>

      {/* Recent activity */}
      <Panel delay={0.3} className="mt-4 lg:mt-5">
        <PanelHeader
          title="Recent activity"
          action={
            <Link
              href="/dashboard/history"
              className="inline-flex items-center gap-1.5 text-[14px] text-ink hover:opacity-70"
            >
              View all <ArrowRight className="size-4" strokeWidth={1.5} />
            </Link>
          }
        />
        <div className="border-t border-line">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 border-b border-line px-6 py-4 last:border-b-0 sm:px-7">
                <Skeleton className="size-10 rounded-[10px]" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="block h-4 w-40" />
                  <Skeleton className="block h-3 w-24" />
                </div>
              </div>
            ))
          ) : recentEvents.length > 0 ? (
            recentEvents.map((event) => <ActivityRow key={event.id} event={event} />)
          ) : (
            <EmptyState icon={<Zap />} title="No activity yet">
              Open any form with the extension installed and press Fill. Your activity will show
              up here.
            </EmptyState>
          )}
        </div>
      </Panel>
    </div>
  );
}
