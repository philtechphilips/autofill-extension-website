"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Coins, CreditCard, DollarSign, RefreshCcw } from "lucide-react";
import api from "@/lib/api";
import {
  Badge,
  PageHeader,
  Panel,
  PanelHeader,
  Segmented,
  StatTile,
  table,
} from "@/components/app/AppUI";
import { EASE } from "@/components/site/motion";

interface PaymentAnalytics {
  overview: {
    allTime: { totalRevenue: number; totalCredits: number; totalOrders: number };
    period: { label: string; revenue: number; credits: number; orders: number };
    refunds: { totalRefunded: number; refundCount: number };
  };
  revenueByPack: Array<{ _id: string; packName: string; revenue: number; credits: number; orders: number }>;
  dailyRevenue: Array<{ _id: string; revenue: number; orders: number }>;
  usageByOperation: Array<{ _id: string; totalUsed: number; count: number }>;
  topCustomers: Array<{
    _id: string;
    name: string;
    email: string;
    totalSpent: number;
    totalCredits: number;
    orderCount: number;
  }>;
  recentTransactions: Array<{
    id: string;
    user: { name: string; email: string } | null;
    packName: string;
    amount: number;
    credits: number;
    date: string;
  }>;
}

type Period = "7d" | "30d" | "90d" | "all";

const operationNames: Record<string, string> = {
  formAnalysis: "Form analysis",
  textEnhancement: "Text enhancement",
  cvParsing: "Resume parsing",
  profileUsage: "Profile usage",
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount || 0);
const formatNumber = (num: number) => (num || 0).toLocaleString();

function Skeleton({ className = "" }: { className?: string }) {
  return <span className={`inline-block animate-pulse rounded-md bg-ink/[0.07] ${className}`} />;
}

export default function PaymentsPage() {
  const [analytics, setAnalytics] = useState<PaymentAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<Period>("30d");

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/admin/payments/analytics?period=${period}`);
      setAnalytics(res.data.data);
    } catch (err) {
      console.error("Failed to fetch payment analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  const v = (s: string) => (loading ? <Skeleton className="h-10 w-24" /> : s);
  const usageTotal = analytics?.usageByOperation.reduce((sum, o) => sum + o.totalUsed, 0) || 0;

  return (
    <div>
      <PageHeader
        tag="Admin"
        title="Payments"
        subtitle="Revenue, orders and how credits are being used."
        actions={
          <>
            <Segmented<Period>
              id="payments-period"
              value={period}
              onChange={setPeriod}
              options={[
                { value: "7d", label: "7 days" },
                { value: "30d", label: "30 days" },
                { value: "90d", label: "90 days" },
                { value: "all", label: "All time" },
              ]}
            />
            <button
              onClick={fetchAnalytics}
              aria-label="Refresh"
              className="grid size-10 place-items-center rounded-[10px] bg-white text-ink ring-1 ring-inset ring-line hover:ring-line-strong"
            >
              <RefreshCcw className={`size-4 ${loading ? "animate-spin" : ""}`} strokeWidth={1.5} />
            </button>
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        <StatTile
          tone="periwinkle"
          label="Total revenue"
          icon={<DollarSign />}
          value={v(formatCurrency(analytics?.overview.allTime.totalRevenue || 0))}
          hint={`${formatCurrency(analytics?.overview.period.revenue || 0)} this period`}
        />
        <StatTile
          tone="haze"
          delay={0.05}
          label="Orders"
          icon={<CreditCard />}
          value={v(formatNumber(analytics?.overview.allTime.totalOrders || 0))}
          hint={`${formatNumber(analytics?.overview.period.orders || 0)} this period`}
        />
        <StatTile
          tone="mist"
          delay={0.1}
          label="Credits sold"
          icon={<Coins />}
          value={v(formatNumber(analytics?.overview.allTime.totalCredits || 0))}
          hint={`${formatNumber(analytics?.overview.period.credits || 0)} this period`}
        />
        <StatTile
          tone="warm-soft"
          delay={0.15}
          label="Refunds"
          icon={<RefreshCcw />}
          value={v(formatNumber(analytics?.overview.refunds.refundCount || 0))}
          hint={`${formatNumber(analytics?.overview.refunds.totalRefunded || 0)} credits refunded`}
        />
      </div>

      <div className="mt-4 grid gap-4 lg:mt-5 lg:grid-cols-2 lg:gap-5">
        <Panel delay={0.2}>
          <PanelHeader title="Revenue by pack" />
          <div className="space-y-2 px-6 pb-6 sm:px-7">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="block h-16 w-full" />)
            ) : analytics?.revenueByPack.length ? (
              analytics.revenueByPack.map((pack) => (
                <div key={pack._id} className="flex items-center justify-between rounded-xl bg-paper px-4 py-3.5">
                  <div>
                    <div className="text-[15px]">{pack.packName || pack._id || "Unknown"}</div>
                    <div className="text-[13px] text-ink-mute">
                      {pack.orders} orders · {formatNumber(pack.credits)} credits
                    </div>
                  </div>
                  <div className="font-serif-display text-[26px] leading-none">{formatCurrency(pack.revenue)}</div>
                </div>
              ))
            ) : (
              <p className="py-10 text-center text-[14px] text-ink-mute">No sales yet</p>
            )}
          </div>
        </Panel>

        <Panel delay={0.25}>
          <PanelHeader title="Credit usage by operation" />
          <div className="space-y-5 px-6 pb-6 sm:px-7">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="block h-10 w-full" />)
            ) : analytics?.usageByOperation.length ? (
              analytics.usageByOperation.map((op) => {
                const pct = usageTotal > 0 ? (op.totalUsed / usageTotal) * 100 : 0;
                return (
                  <div key={op._id}>
                    <div className="mb-2 flex items-center justify-between text-[14px]">
                      <span>{operationNames[op._id] || op._id}</span>
                      <span className="text-ink-mute">
                        {formatNumber(op.totalUsed)} credits · {op.count} uses
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-paper-deep">
                      <motion.div
                        className="h-full rounded-full bg-ink"
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.9, ease: EASE }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="py-10 text-center text-[14px] text-ink-mute">No usage yet</p>
            )}
          </div>
        </Panel>
      </div>

      <Panel delay={0.3} className="mt-4 lg:mt-5">
        <PanelHeader title="Top customers" />
        <div className={table.wrap}>
          <table className={table.table}>
            <thead>
              <tr>
                <th className={table.th}>Customer</th>
                <th className={`${table.th} text-right`}>Orders</th>
                <th className={`${table.th} text-right`}>Credits</th>
                <th className={`${table.th} text-right`}>Total spent</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i}>
                    <td className={table.td}><Skeleton className="h-4 w-40" /></td>
                    <td className={`${table.td} text-right`}><Skeleton className="h-4 w-10" /></td>
                    <td className={`${table.td} text-right`}><Skeleton className="h-4 w-14" /></td>
                    <td className={`${table.td} text-right`}><Skeleton className="h-4 w-16" /></td>
                  </tr>
                ))
              ) : analytics?.topCustomers.length ? (
                analytics.topCustomers.map((c, idx) => (
                  <tr key={c._id} className={table.row}>
                    <td className={table.td}>
                      <div className="flex items-center gap-3">
                        <span className="grid size-8 place-items-center rounded-full bg-tile-1 text-[12.5px]">
                          {idx + 1}
                        </span>
                        <div>
                          <div>{c.name || "N/A"}</div>
                          <div className="text-[13px] text-ink-mute">{c.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className={`${table.td} text-right tabular-nums text-ink-soft`}>{c.orderCount}</td>
                    <td className={`${table.td} text-right tabular-nums text-ink-soft`}>{formatNumber(c.totalCredits)}</td>
                    <td className={`${table.td} text-right tabular-nums`}>{formatCurrency(c.totalSpent)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-7 py-12 text-center text-ink-mute">No customers yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel delay={0.35} className="mt-4 lg:mt-5">
        <PanelHeader title="Recent transactions" />
        <div className={table.wrap}>
          <table className={table.table}>
            <thead>
              <tr>
                <th className={table.th}>Customer</th>
                <th className={table.th}>Pack</th>
                <th className={`${table.th} text-right`}>Credits</th>
                <th className={`${table.th} text-right`}>Amount</th>
                <th className={`${table.th} text-right`}>Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i}>
                    <td className={table.td}><Skeleton className="h-4 w-40" /></td>
                    <td className={table.td}><Skeleton className="h-4 w-20" /></td>
                    <td className={`${table.td} text-right`}><Skeleton className="h-4 w-12" /></td>
                    <td className={`${table.td} text-right`}><Skeleton className="h-4 w-16" /></td>
                    <td className={`${table.td} text-right`}><Skeleton className="h-4 w-20" /></td>
                  </tr>
                ))
              ) : analytics?.recentTransactions.length ? (
                analytics.recentTransactions.map((tx) => (
                  <tr key={tx.id} className={table.row}>
                    <td className={table.td}>
                      <div>{tx.user?.name || "N/A"}</div>
                      <div className="text-[13px] text-ink-mute">{tx.user?.email || "Unknown"}</div>
                    </td>
                    <td className={table.td}>
                      <Badge tone="info">{tx.packName || "N/A"}</Badge>
                    </td>
                    <td className={`${table.td} text-right tabular-nums text-ink-soft`}>+{formatNumber(tx.credits)}</td>
                    <td className={`${table.td} text-right tabular-nums`}>{formatCurrency(tx.amount)}</td>
                    <td className={`${table.td} text-right text-ink-soft`}>{new Date(tx.date).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-7 py-12 text-center text-ink-mute">No transactions yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
