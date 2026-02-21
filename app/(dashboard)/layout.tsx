"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  History,
  Keyboard,
  CreditCard,
  LogOut,
  Menu,
  X,
  User,
} from "lucide-react";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface SidebarItemProps {
  href: string;
  icon: any;
  label: string;
  active: boolean;
}

const SidebarItem = ({ href, icon: Icon, label, active }: SidebarItemProps) => (
  <Link href={href}>
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
        active
          ? "bg-white/[0.05] text-white shadow-sm"
          : "text-white/80 hover:text-white hover:bg-white/[0.02]"
      }`}
    >
      <Icon
        className={`w-5 h-5 transition-colors ${active ? "text-white" : "text-white/70 group-hover:text-white/80"}`}
      />
      <span className="text-sm font-medium tracking-tight">{label}</span>
      {active && (
        <motion.div
          layoutId="active-pill"
          className="ml-auto w-1 h-4 bg-white rounded-full"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </div>
  </Link>
);

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { logout, user, isAuthenticated, hasHydrated } = useAuthStore();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, hasHydrated, router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!hasHydrated) {
    return (
      <div className="min-h-screen bg-onyx flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const sidebarItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
    { href: "/dashboard/history", icon: History, label: "Form History" },
    { href: "/dashboard/shortcuts", icon: Keyboard, label: "Keyboard" },
    { href: "/dashboard/billing", icon: CreditCard, label: "Credits" },
  ];

  return (
    <div className="min-h-screen bg-onyx flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-72 border-r border-white/[0.05] bg-deep-navy/50 backdrop-blur-xl fixed inset-y-0">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full overflow-hidden transition-transform group-hover:scale-110 shadow-lg shadow-white/10">
              <Image
                src="/logo.png"
                alt="AutoFill AI"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xl font-bold text-white tracking-tighter">
              AutoFill
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <div className="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em] px-4 mb-4">
            Navigation
          </div>
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.href}
              {...item}
              active={pathname === item.href}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-white/[0.05]">
          <div className="bg-white/[0.02] rounded-2xl p-4 mb-4">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-full bg-white/[0.1] border border-white/[0.1] flex items-center justify-center">
                <User className="w-4 h-4 text-white/80" />
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="text-sm font-semibold text-white truncate">
                  {user?.name || "User"}
                </div>
                <div className="text-[10px] text-white/80 truncate">
                  {user?.email}
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/[0.02] transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Log out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 w-full h-16 border-b border-white/[0.05] bg-deep-navy/80 backdrop-blur-xl z-50 flex items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image
              src="/logo.png"
              alt="AutoFill AI"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-bold text-white tracking-tighter text-lg">
            AutoFill
          </span>
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white/80 hover:text-white"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="lg:hidden fixed inset-0 z-40 bg-onyx pt-20 px-6"
          >
            <div className="space-y-4">
              {sidebarItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-4 py-4 border-b border-white/[0.05] ${pathname === item.href ? "text-white" : "text-white/80"}`}
                >
                  <item.icon className="w-6 h-6" />
                  <span className="text-lg font-medium">{item.label}</span>
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center gap-4 py-4 text-white/80 w-full border-b border-white/[0.05]"
              >
                <LogOut className="w-6 h-6" />
                <span className="text-lg font-medium">Log out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 pt-16 lg:pt-0">
        <div className="p-6 md:p-10 lg:px-10 lg:py-16">{children}</div>
        <div className="h-20 lg:h-0" /> {/* Mobile bottom spacer */}
      </main>
    </div>
  );
}
