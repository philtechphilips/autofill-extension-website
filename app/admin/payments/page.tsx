"use client";

import { useEffect, useState } from "react";
import {
    DollarSign,
    CreditCard,
    TrendingUp,
    Users,
    Package,
    RefreshCcw,
    ArrowUpRight,
    ArrowDownRight,
    Calendar,
    Coins,
} from "lucide-react";
import api from "@/lib/api";

interface PaymentAnalytics {
    overview: {
        allTime: {
            totalRevenue: number;
            totalCredits: number;
            totalOrders: number;
        };
        period: {
            label: string;
            revenue: number;
            credits: number;
            orders: number;
        };
        refunds: {
            totalRefunded: number;
            refundCount: number;
        };
    };
    revenueByPack: Array<{
        _id: string;
        packName: string;
        revenue: number;
        credits: number;
        orders: number;
    }>;
    dailyRevenue: Array<{
        _id: string;
        revenue: number;
        orders: number;
    }>;
    usageByOperation: Array<{
        _id: string;
        totalUsed: number;
        count: number;
    }>;
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

export default function PaymentsPage() {
    const [analytics, setAnalytics] = useState<PaymentAnalytics | null>(null);
    const [loading, setLoading] = useState(true);
    const [period, setPeriod] = useState("30d");

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
    }, [period]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount || 0);
    };

    const formatNumber = (num: number) => (num || 0).toLocaleString();

    const operationNames: Record<string, string> = {
        formAnalysis: "Form Analysis",
        textEnhancement: "Text Enhancement",
        cvParsing: "CV Parsing",
        profileUsage: "Profile Usage",
    };

    const MetricCard = ({
        label,
        value,
        subValue,
        icon: Icon,
        trend,
        color = "blue",
    }: {
        label: string;
        value: string;
        subValue?: string;
        icon: any;
        trend?: "up" | "down";
        color?: string;
    }) => {
        const colorClasses: Record<string, string> = {
            blue: "bg-blue-500/10 border-blue-500/20 text-blue-500",
            green: "bg-emerald-500/10 border-emerald-500/20 text-emerald-500",
            purple: "bg-purple-500/10 border-purple-500/20 text-purple-500",
            orange: "bg-orange-500/10 border-orange-500/20 text-orange-500",
        };

        return (
            <div className="glassmorphic p-6 rounded-[24px] group hover:border-white/[0.1] transition-all duration-500">
                <div className="flex items-start justify-between mb-4">
                    <div
                        className={`w-10 h-10 rounded-xl ${colorClasses[color]} border flex items-center justify-center`}
                    >
                        <Icon className="w-5 h-5" />
                    </div>
                    {trend && (
                        <div
                            className={`flex items-center gap-1 text-xs font-medium ${trend === "up" ? "text-emerald-500" : "text-red-500"
                                }`}
                        >
                            {trend === "up" ? (
                                <ArrowUpRight className="w-3 h-3" />
                            ) : (
                                <ArrowDownRight className="w-3 h-3" />
                            )}
                        </div>
                    )}
                </div>
                <div className="space-y-1">
                    {loading ? (
                        <div className="h-8 w-24 bg-black/10 dark:bg-white/10 rounded animate-pulse" />
                    ) : (
                        <h3 className="text-2xl font-bold text-black dark:text-white tracking-tight">
                            {value}
                        </h3>
                    )}
                    <p className="text-xs font-medium text-black/50 dark:text-white/90 uppercase tracking-wider">
                        {label}
                    </p>
                    {subValue && (
                        <p className="text-xs text-black/40 dark:text-white/40">{subValue}</p>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold uppercase tracking-[0.3em]">
                        <DollarSign className="w-4 h-4" />
                        Payment Analytics
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white tracking-tighter">
                        Revenue Overview
                    </h1>
                </div>

                <div className="flex items-center gap-2">
                    <select
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        className="px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm font-medium text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                        <option value="7d">Last 7 days</option>
                        <option value="30d">Last 30 days</option>
                        <option value="90d">Last 90 days</option>
                        <option value="all">All time</option>
                    </select>
                    <button
                        onClick={fetchAnalytics}
                        className="p-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                    >
                        <RefreshCcw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                    </button>
                </div>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                    label="Total Revenue"
                    value={formatCurrency(analytics?.overview.allTime.totalRevenue || 0)}
                    subValue={`${formatCurrency(analytics?.overview.period.revenue || 0)} this period`}
                    icon={DollarSign}
                    color="green"
                />
                <MetricCard
                    label="Total Orders"
                    value={formatNumber(analytics?.overview.allTime.totalOrders || 0)}
                    subValue={`${formatNumber(analytics?.overview.period.orders || 0)} this period`}
                    icon={CreditCard}
                    color="blue"
                />
                <MetricCard
                    label="Credits Sold"
                    value={formatNumber(analytics?.overview.allTime.totalCredits || 0)}
                    subValue={`${formatNumber(analytics?.overview.period.credits || 0)} this period`}
                    icon={Coins}
                    color="purple"
                />
                <MetricCard
                    label="Refunds"
                    value={formatNumber(analytics?.overview.refunds.refundCount || 0)}
                    subValue={`${formatNumber(analytics?.overview.refunds.totalRefunded || 0)} credits refunded`}
                    icon={RefreshCcw}
                    color="orange"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue by Pack */}
                <div className="glassmorphic p-6 rounded-[24px]">
                    <h2 className="text-lg font-bold text-black dark:text-white mb-4 flex items-center gap-2">
                        <Package className="w-5 h-5 text-purple-500" />
                        Revenue by Pack
                    </h2>
                    <div className="space-y-3">
                        {loading ? (
                            Array(3)
                                .fill(0)
                                .map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-16 bg-black/5 dark:bg-white/5 rounded-xl animate-pulse"
                                    />
                                ))
                        ) : analytics?.revenueByPack.length ? (
                            analytics.revenueByPack.map((pack) => (
                                <div
                                    key={pack._id}
                                    className="flex items-center justify-between p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5"
                                >
                                    <div>
                                        <p className="font-semibold text-black dark:text-white">
                                            {pack.packName || pack._id || "Unknown"}
                                        </p>
                                        <p className="text-xs text-black/50 dark:text-white/90">
                                            {pack.orders} orders · {formatNumber(pack.credits)} credits
                                        </p>
                                    </div>
                                    <p className="text-lg font-bold text-emerald-500">
                                        {formatCurrency(pack.revenue)}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-black/50 dark:text-white/90 py-8">
                                No sales data yet
                            </p>
                        )}
                    </div>
                </div>

                {/* Credit Usage by Operation */}
                <div className="glassmorphic p-6 rounded-[24px]">
                    <h2 className="text-lg font-bold text-black dark:text-white mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-blue-500" />
                        Credit Usage by Operation
                    </h2>
                    <div className="space-y-3">
                        {loading ? (
                            Array(4)
                                .fill(0)
                                .map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-12 bg-black/5 dark:bg-white/5 rounded-xl animate-pulse"
                                    />
                                ))
                        ) : analytics?.usageByOperation.length ? (
                            analytics.usageByOperation.map((op) => {
                                const total = analytics.usageByOperation.reduce(
                                    (sum, o) => sum + o.totalUsed,
                                    0
                                );
                                const percentage = total > 0 ? (op.totalUsed / total) * 100 : 0;
                                return (
                                    <div key={op._id} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-black dark:text-white">
                                                {operationNames[op._id] || op._id}
                                            </p>
                                            <p className="text-sm text-black/70 dark:text-white/90">
                                                {formatNumber(op.totalUsed)} credits ({op.count} uses)
                                            </p>
                                        </div>
                                        <div className="h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-blue-500 rounded-full transition-all duration-500"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-center text-black/50 dark:text-white/90 py-8">
                                No usage data yet
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Top Customers */}
            <div className="glassmorphic p-6 rounded-[24px]">
                <h2 className="text-lg font-bold text-black dark:text-white mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-orange-500" />
                    Top Customers
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-black/5 dark:border-white/5">
                                <th className="px-4 py-3 text-left text-xs font-bold text-black/50 dark:text-white/90 uppercase tracking-wider">
                                    Customer
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-bold text-black/50 dark:text-white/90 uppercase tracking-wider">
                                    Orders
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-bold text-black/50 dark:text-white/90 uppercase tracking-wider">
                                    Credits
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-bold text-black/50 dark:text-white/90 uppercase tracking-wider">
                                    Total Spent
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                Array(5)
                                    .fill(0)
                                    .map((_, i) => (
                                        <tr
                                            key={i}
                                            className="border-b border-black/5 dark:border-white/5"
                                        >
                                            <td className="px-4 py-3">
                                                <div className="h-4 w-32 bg-black/10 dark:bg-white/10 rounded animate-pulse" />
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="h-4 w-12 bg-black/10 dark:bg-white/10 rounded animate-pulse ml-auto" />
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="h-4 w-16 bg-black/10 dark:bg-white/10 rounded animate-pulse ml-auto" />
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="h-4 w-20 bg-black/10 dark:bg-white/10 rounded animate-pulse ml-auto" />
                                            </td>
                                        </tr>
                                    ))
                            ) : analytics?.topCustomers.length ? (
                                analytics.topCustomers.map((customer, idx) => (
                                    <tr
                                        key={customer._id}
                                        className="border-b border-black/5 dark:border-white/5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                                    >
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                                                    {idx + 1}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-black dark:text-white">
                                                        {customer.name || "N/A"}
                                                    </p>
                                                    <p className="text-xs text-black/50 dark:text-white/90">
                                                        {customer.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-right text-sm text-black/70 dark:text-white/90">
                                            {customer.orderCount}
                                        </td>
                                        <td className="px-4 py-3 text-right text-sm text-black/70 dark:text-white/90">
                                            {formatNumber(customer.totalCredits)}
                                        </td>
                                        <td className="px-4 py-3 text-right font-semibold text-emerald-500">
                                            {formatCurrency(customer.totalSpent)}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-4 py-8 text-center text-black/50 dark:text-white/90"
                                    >
                                        No customers yet
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="glassmorphic p-6 rounded-[24px]">
                <h2 className="text-lg font-bold text-black dark:text-white mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    Recent Transactions
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-black/5 dark:border-white/5">
                                <th className="px-4 py-3 text-left text-xs font-bold text-black/50 dark:text-white/90 uppercase tracking-wider">
                                    Customer
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-black/50 dark:text-white/90 uppercase tracking-wider">
                                    Pack
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-bold text-black/50 dark:text-white/90 uppercase tracking-wider">
                                    Credits
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-bold text-black/50 dark:text-white/90 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-bold text-black/50 dark:text-white/90 uppercase tracking-wider">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                Array(5)
                                    .fill(0)
                                    .map((_, i) => (
                                        <tr
                                            key={i}
                                            className="border-b border-black/5 dark:border-white/5"
                                        >
                                            <td className="px-4 py-3">
                                                <div className="h-4 w-32 bg-black/10 dark:bg-white/10 rounded animate-pulse" />
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="h-4 w-20 bg-black/10 dark:bg-white/10 rounded animate-pulse" />
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="h-4 w-12 bg-black/10 dark:bg-white/10 rounded animate-pulse ml-auto" />
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="h-4 w-16 bg-black/10 dark:bg-white/10 rounded animate-pulse ml-auto" />
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="h-4 w-24 bg-black/10 dark:bg-white/10 rounded animate-pulse ml-auto" />
                                            </td>
                                        </tr>
                                    ))
                            ) : analytics?.recentTransactions.length ? (
                                analytics.recentTransactions.map((tx) => (
                                    <tr
                                        key={tx.id}
                                        className="border-b border-black/5 dark:border-white/5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                                    >
                                        <td className="px-4 py-3">
                                            <p className="font-medium text-black dark:text-white">
                                                {tx.user?.name || "N/A"}
                                            </p>
                                            <p className="text-xs text-black/50 dark:text-white/90">
                                                {tx.user?.email || "Unknown"}
                                            </p>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="px-2 py-1 rounded-lg bg-purple-500/10 text-purple-500 text-xs font-medium">
                                                {tx.packName || "N/A"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right text-sm text-black/70 dark:text-white/90">
                                            +{formatNumber(tx.credits)}
                                        </td>
                                        <td className="px-4 py-3 text-right font-semibold text-emerald-500">
                                            {formatCurrency(tx.amount)}
                                        </td>
                                        <td className="px-4 py-3 text-right text-sm text-black/50 dark:text-white/90">
                                            {new Date(tx.date).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-4 py-8 text-center text-black/50 dark:text-white/90"
                                    >
                                        No transactions yet
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
