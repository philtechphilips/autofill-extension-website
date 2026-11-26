"use client";

import { useEffect, useState } from "react";
import { Activity, Database, FileText, Users } from "lucide-react";
import api from "@/lib/api";
import { Badge, PageHeader, Panel, PanelHeader, StatTile, table } from "@/components/app/AppUI";

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

const formatNumber = (num: number): string => num.toLocaleString();

function Skeleton({ className = "" }: { className?: string }) {
  return <span className={`inline-block animate-pulse rounded-md bg-ink/[0.07] ${className}`} />;
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
          api.get("/admin/users"),
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

  const value = (n: number) => (loading ? <Skeleton className="h-10 w-20" /> : formatNumber(n));

  return (
    <div>
      <PageHeader
        tag="Admin"
        title="Platform overview"
        subtitle="Users, usage and activity across AutoFill AI."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        <StatTile tone="periwinkle" label="Total users" icon={<Users />} value={value(stats?.totalUsers || 0)} hint="Registered accounts" />
        <StatTile tone="haze" delay={0.05} label="Forms filled" icon={<Activity />} value={value(stats?.totalUsageData?.totalFills || 0)} hint="Successful fills, all users" />
        <StatTile tone="mist" delay={0.1} label="Fields filled" icon={<Database />} value={value(stats?.totalUsageData?.totalFieldsFilled || 0)} hint="Individual answers entered" />
        <StatTile tone="warm-soft" delay={0.15} label="Resumes parsed" icon={<FileText />} value={value(stats?.totalUsageData?.totalCVParses || 0)} hint="Resumes turned into profiles" />
      </div>

      <Panel delay={0.2} className="mt-4 lg:mt-5">
        <PanelHeader title="Users" subtitle={loading ? undefined : `${users.length} accounts`} />
        <div className={table.wrap}>
          <table className={table.table}>
            <thead>
              <tr>
                <th className={table.th}>User</th>
                <th className={table.th}>Role</th>
                <th className={`${table.th} text-right`}>Forms filled</th>
                <th className={`${table.th} text-right`}>Joined</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td className={table.td}><Skeleton className="h-4 w-40" /></td>
                    <td className={table.td}><Skeleton className="h-4 w-14" /></td>
                    <td className={`${table.td} text-right`}><Skeleton className="h-4 w-12" /></td>
                    <td className={`${table.td} text-right`}><Skeleton className="h-4 w-20" /></td>
                  </tr>
                ))
              ) : users.length > 0 ? (
                users.map((u) => (
                  <tr key={u._id} className={table.row}>
                    <td className={table.td}>
                      <div>{u.name || "N/A"}</div>
                      <div className="text-[13px] text-ink-mute">{u.email}</div>
                    </td>
                    <td className={table.td}>
                      <Badge tone={u.role === "admin" ? "info" : "neutral"} className="capitalize">
                        {u.role || "user"}
                      </Badge>
                    </td>
                    <td className={`${table.td} text-right`}>
                      <div className="tabular-nums">{formatNumber(u.fillStats?.totalFills || 0)}</div>
                      {u.fillStats?.totalFills > 0 && (
                        <div className="text-[12.5px] text-ink-mute">{u.fillStats.totalFieldsFilled} fields</div>
                      )}
                    </td>
                    <td className={`${table.td} text-right text-ink-soft`}>
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-7 py-12 text-center text-ink-mute">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
