"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DollarSign, LayoutDashboard, Mail, Settings, User } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import AppShell, { FullPageSpinner, type NavItem } from "@/components/app/AppShell";

const sidebarItems: NavItem[] = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/admin/payments", icon: DollarSign, label: "Payments" },
  { href: "/admin/emails", icon: Mail, label: "Send emails" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
  { href: "/dashboard", icon: User, label: "User dashboard" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { logout, user, isAuthenticated, hasHydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.push("/login");
    } else if (hasHydrated && isAuthenticated && user?.role !== "admin") {
      router.push("/dashboard");
    }
  }, [isAuthenticated, hasHydrated, user, router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!hasHydrated) return <FullPageSpinner />;
  if (!isAuthenticated || user?.role !== "admin") return null;

  return (
    <AppShell items={sidebarItems} user={user} badge="Admin" onLogout={handleLogout}>
      {children}
    </AppShell>
  );
}
