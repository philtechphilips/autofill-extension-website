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
  Mail,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import api from "@/lib/api";

interface SidebarItemProps {
  href: string;
  icon: any;
  label: string;
  active: boolean;
}

const SidebarItem = ({ href, icon: Icon, label, active }: SidebarItemProps) => (
  <Link href={href}>
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group border ${active
        ? "bg-brand-accent/10 border-brand-accent/20 text-white"
        : "border-transparent text-white/80 hover:text-white hover:bg-white/[0.04]"
        }`}
    >
      <Icon
        className={`w-5 h-5 transition-colors ${active ? "text-brand-accent" : "text-white/90 group-hover:text-white/80"}`}
      />
      <span className="text-sm font-medium tracking-tight">{label}</span>
      {active && (
        <motion.div
          layoutId="active-pill"
          className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-accent shadow-[0_0_8px_rgba(59,130,246,0.7)]"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </div>
  </Link>
);

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { logout, user, isAuthenticated, hasHydrated, updateUser } = useAuthStore();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [resendingEmail, setResendingEmail] = useState(false);

  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, hasHydrated, router]);

  // Refresh user data to get latest verification status
  useEffect(() => {
    const refreshUser = async () => {
      if (!hasHydrated || !isAuthenticated) return;
      try {
        const response = await api.get("/auth/me");
        if (response.data.data?.user) {
          updateUser(response.data.data.user);
        }
      } catch (err) {
        // Silently fail - user will see verification screen
      }
    };
    refreshUser();
  }, [hasHydrated, isAuthenticated, updateUser]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleResendVerification = async () => {
    if (resendingEmail || !user?.email) return;
    setResendingEmail(true);
    try {
      await api.post("/auth/resend-verification", { email: user.email });
      toast.success("Verification email sent!", {
        description: "Please check your inbox and spam folder.",
      });
    } catch (error: any) {
      toast.error("Failed to send verification email", {
        description: error.response?.data?.error || "Please try again later.",
      });
    } finally {
      setResendingEmail(false);
    }
  };

  if (!hasHydrated) {
    return (
      <div className="min-h-screen bg-white dark:bg-onyx flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-black/20 dark:border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  // Show verification required screen if email is not verified
  if (user && !user.isEmailVerified) {
    return (
      <div className="min-h-screen bg-white dark:bg-onyx flex items-center justify-center p-6">
        <div className="max-w-4xl w-full text-center">
          <div className="w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-10 h-10 text-amber-500" />
          </div>
          <h1 className="text-3xl font-bold text-black dark:text-white tracking-tight mb-3">
            Verify Your Email
          </h1>
          <p className="text-black/60 dark:text-white/80 mb-2">
            We sent a verification link to
          </p>
          <p className="text-black dark:text-white font-medium mb-6">
            {user.email}
          </p>
          <p className="text-sm text-black/50 dark:text-white/90 mb-8">
            Please check your inbox and click the verification link to access your dashboard.
          </p>
          <div className="space-y-3 max-w-[400px] mx-auto">
            <button
              onClick={handleResendVerification}
              disabled={resendingEmail}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resendingEmail ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Mail className="w-5 h-5" />
              )}
              {resendingEmail ? "Sending..." : "Resend Verification Email"}
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-black/10 dark:border-white/10 text-black/70 dark:text-white/90 font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Log out
            </button>
          </div>
          <p className="text-xs text-black/40 dark:text-white/40 mt-8">
            Didn&apos;t receive the email? Check your spam folder or try resending.
          </p>
        </div>
      </div>
    );
  }

  const sidebarItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
    { href: "/dashboard/history", icon: History, label: "Form History" },
    { href: "/dashboard/shortcuts", icon: Keyboard, label: "Keyboard" },
    { href: "/dashboard/billing", icon: CreditCard, label: "Credits" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-onyx flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-white/6 bg-deep-navy backdrop-blur-xl fixed inset-y-0">
        <div className="px-6 py-7">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl overflow-hidden transition-transform group-hover:scale-110 shadow-lg shadow-brand-accent/10 ring-1 ring-white/10">
              <Image
                src="/logo.png"
                alt="AutoFill AI"
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-lg font-bold text-white tracking-tighter">
              AutoFill
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          <div className="text-[9px] font-bold text-white/30 uppercase tracking-[0.3em] px-4 mb-3">
            Menu
          </div>
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.href}
              {...item}
              active={pathname === item.href}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-white/6">
          <div className="flex items-center gap-3 px-2 py-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-brand-accent/15 border border-brand-accent/25 flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-brand-accent" />
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-semibold text-white truncate leading-tight">
                {user?.name || "User"}
              </div>
              <div className="text-[10px] text-white/40 truncate">
                {user?.email}
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-white/90 hover:text-white hover:bg-white/5 transition-colors group"
          >
            <LogOut className="w-4 h-4 group-hover:text-red-400 transition-colors" />
            <span className="text-sm font-medium">Log out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 w-full h-16 border-b border-white/6 bg-deep-navy/90 backdrop-blur-xl z-50 flex items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl overflow-hidden ring-1 ring-white/10">
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
          className="text-white/90 hover:text-white transition-colors"
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
            className="lg:hidden fixed inset-0 z-40 bg-deep-navy pt-20 px-6"
          >
            <div className="space-y-1">
              {sidebarItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-colors ${pathname === item.href
                    ? "bg-brand-accent/10 text-white border border-brand-accent/20"
                    : "text-white/80 hover:text-white hover:bg-white/5 border border-transparent"
                    }`}
                >
                  <item.icon className={`w-5 h-5 ${pathname === item.href ? "text-brand-accent" : ""}`} />
                  <span className="text-base font-medium">{item.label}</span>
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center gap-4 px-4 py-4 w-full text-white/90 hover:text-white hover:bg-white/5 rounded-xl border border-transparent transition-colors group"
              >
                <LogOut className="w-5 h-5 group-hover:text-red-400 transition-colors" />
                <span className="text-base font-medium">Log out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
        <div className="p-6 md:p-10 lg:px-10 lg:py-16">{children}</div>
        <div className="h-20 lg:h-0" /> {/* Mobile bottom spacer */}
      </main>
    </div>
  );
}
