"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Users,
    Settings,
    Database,
    Activity,
    ShieldCheck,
    TrendingDown,
    TrendingUp,
    Clock,
    LogOut,
    ChevronRight,
    ShieldAlert,
} from "lucide-react";
import api from "@/lib/api";

interface AdminStats {
    totalUsers: number;
    totalProfiles: number;
    totalUsageData: {
        totalFills: number;
        totalFieldsFilled: number;
        totalCVParses: number;
        estimatedTimeSavedSeconds: number;
    };
    recentUsers: any[];
}

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, usersRes] = await Promise.all([
                    api.get("/admin/dashboard-stats"),
                    api.get("/admin/users")
                ]);

                setStats(statsRes.data.data);
                setUsers(usersRes.data.data || []);
            } catch (err) {
                console.error("Failed to fetch admin dashboard:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const formatNumber = (num: number): string => num.toLocaleString();

    const MetricCard = ({
        label,
        value,
        description,
        icon: Icon,
        loading,
    }: any) => (
        <div className="glassmorphic p-8 rounded-[32px] group hover:border-white/[0.1] transition-all duration-500 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity translate-x-4 -translate-y-4 group-hover:translate-x-2 group-hover:-translate-y-2 duration-700">
                <Icon className="w-24 h-24 text-blue-500" />
            </div>

            <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-6 h-6 text-blue-500 transition-colors" />
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
                    </div>
                    <p className="text-xs font-bold text-black/70 dark:text-white/90 uppercase tracking-[0.2em]">
                        {label}
                    </p>
                </div>

                <p className="text-sm text-black/80 dark:text-white/80 font-light leading-relaxed max-w-[200px]">
                    {description}
                </p>
            </div>
        </div>
    );

    return (
        <div className="space-y-12">
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-500 text-xs font-bold uppercase tracking-[0.3em] animate-pulse">
                    <ShieldAlert className="w-4 h-4" />
                    Admin Portal
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-black dark:text-white tracking-tighter leading-none">
                    System Core<span className="text-black/70 dark:text-white/90">.</span>
                </h1>
                <p className="text-xl text-black/80 dark:text-white/80 font-light max-w-4xl">
                    Global statistics, user management, and system overview.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    label="Total Users"
                    value={formatNumber(stats?.totalUsers || 0)}
                    description="Registered users across the platform."
                    icon={Users}
                    loading={loading}
                />
                <MetricCard
                    label="Forms Filled"
                    value={formatNumber(stats?.totalUsageData?.totalFills || 0)}
                    description="Total successful autofill events globally."
                    icon={Activity}
                    loading={loading}
                />
                <MetricCard
                    label="Fields Filled"
                    value={formatNumber(stats?.totalUsageData?.totalFieldsFilled || 0)}
                    description="Data points successfully populated."
                    icon={Database}
                    loading={loading}
                />
                <MetricCard
                    label="CV Parses"
                    value={formatNumber(stats?.totalUsageData?.totalCVParses || 0)}
                    description="Resumes successfully parsed into JSON."
                    icon={Settings}
                    loading={loading}
                />
            </div>

            <div className="glassmorphic p-8 rounded-[40px]">
                <h2 className="text-2xl font-bold text-black dark:text-white tracking-tight mb-8">
                    User Management
                </h2>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-black/[0.05] dark:border-white/[0.05]">
                                <th className="px-4 py-4 text-xs font-bold text-black/50 dark:text-white/90 uppercase tracking-widest">User</th>
                                <th className="px-4 py-4 text-xs font-bold text-black/50 dark:text-white/90 uppercase tracking-widest">Role</th>
                                <th className="px-4 py-4 text-xs font-bold text-black/50 dark:text-white/90 uppercase tracking-widest text-right">Forms Filled</th>
                                <th className="px-4 py-4 text-xs font-bold text-black/50 dark:text-white/90 uppercase tracking-widest text-right">Joined</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <tr key={i} className="border-b border-black/[0.05] dark:border-white/[0.05]">
                                        <td className="px-4 py-4"><div className="w-32 h-4 bg-black/10 dark:bg-white/10 animate-pulse rounded"></div></td>
                                        <td className="px-4 py-4"><div className="w-16 h-4 bg-black/10 dark:bg-white/10 animate-pulse rounded"></div></td>
                                        <td className="px-4 py-4 text-right"><div className="w-16 h-4 bg-black/10 dark:bg-white/10 animate-pulse rounded ml-auto"></div></td>
                                        <td className="px-4 py-4 text-right"><div className="w-24 h-4 bg-black/10 dark:bg-white/10 animate-pulse rounded ml-auto"></div></td>
                                    </tr>
                                ))
                            ) : users.length > 0 ? (
                                users.map((u) => (
                                    <tr key={u._id} className="border-b border-black/[0.05] dark:border-white/[0.05] hover:bg-white/[0.02] transition-colors">
                                        <td className="px-4 py-4">
                                            <div className="font-semibold text-black dark:text-white">{u.name || "N/A"}</div>
                                            <div className="text-xs text-black/50 dark:text-white/90">{u.email}</div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className={`px-2 py-1 rounded text-xs uppercase font-bold tracking-wider ${u.role === 'admin' ? 'bg-blue-500/20 text-blue-500' : 'bg-emerald-500/20 text-emerald-500'}`}>
                                                {u.role || 'user'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-right">
                                            <span className="font-semibold text-black dark:text-white">
                                                {formatNumber(u.fillStats?.totalFills || 0)}
                                            </span>
                                            {u.fillStats?.totalFills > 0 && (
                                                <div className="text-xs text-black/50 dark:text-white/50">
                                                    {u.fillStats.totalFieldsFilled} fields
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-4 py-4 text-right text-sm text-black/70 dark:text-white/90">
                                            {new Date(u.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-4 py-8 text-center text-black/50 dark:text-white/90">No users found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
