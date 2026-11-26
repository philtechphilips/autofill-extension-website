"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, History, Keyboard, LayoutDashboard, LogOut, Mail } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import AppShell, { FullPageSpinner, type NavItem } from "@/components/app/AppShell";
import SiteButton from "@/components/site/SiteButton";
import { Container, Wordmark } from "@/components/site/Primitives";

const sidebarItems: NavItem[] = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/dashboard/history", icon: History, label: "Form history" },
  { href: "/dashboard/shortcuts", icon: Keyboard, label: "Shortcuts" },
  { href: "/dashboard/billing", icon: CreditCard, label: "Credits" },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { logout, user, isAuthenticated, hasHydrated, updateUser } = useAuthStore();
  const router = useRouter();
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
      } catch {
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

  if (!hasHydrated) return <FullPageSpinner />;
  if (!isAuthenticated) return null;

  // Show verification required screen if email is not verified
  if (user && !user.isEmailVerified) {
    return (
      <div className="site flex min-h-screen flex-col pb-6">
        <Container className="flex h-[84px] items-center">
          <Wordmark />
        </Container>
        <Container className="flex flex-1">
          <div className="grid w-full gap-4 lg:grid-cols-[45fr_55fr] lg:gap-5">
            <div className="flex flex-col justify-between gap-10 rounded-2xl bg-tile-warm p-8 sm:p-11">
              <span className="grid size-12 place-items-center rounded-xl bg-white text-ink">
                <Mail className="size-5" strokeWidth={1.5} />
              </span>
              <h1 className="font-serif-display text-[48px] leading-[1.02] text-ink sm:text-[64px]">
                Check your
                <br />
                inbox.
              </h1>
            </div>
            <div className="flex items-center rounded-2xl bg-tile-3 p-8 sm:p-12">
              <div className="w-full max-w-[440px]">
                <p className="text-[15.5px] text-ink-soft">We sent a verification link to</p>
                <p className="mt-1 text-[20px] text-ink">{user.email}</p>
                <p className="mt-5 text-[15px] leading-[1.6] text-ink-soft">
                  Click the link in that email to unlock your dashboard. Didn&apos;t get it? Check
                  your spam folder or send it again.
                </p>
                <div className="mt-9 space-y-3">
                  <SiteButton
                    size="lg"
                    className="w-full"
                    loading={resendingEmail}
                    onClick={handleResendVerification}
                    icon={<Mail />}
                  >
                    {resendingEmail ? "Sending…" : "Resend verification email"}
                  </SiteButton>
                  <SiteButton
                    size="lg"
                    variant="secondary"
                    className="w-full"
                    onClick={handleLogout}
                    icon={<LogOut />}
                  >
                    Log out
                  </SiteButton>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <AppShell items={sidebarItems} user={user} onLogout={handleLogout}>
      {children}
    </AppShell>
  );
}
