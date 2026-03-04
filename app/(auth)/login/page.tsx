"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthInput from "@/components/auth/AuthInput";
import Button from "@/components/ui/Button";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    if (searchParams.get("expired")) {
      toast.error("Session Expired", {
        description: "Please sign in again to continue.",
      });
      setError("Your session has expired. Please sign in again.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post("/auth/login", { email, password });
      const { user, accessToken } = response.data.data;
      setAuth(user, accessToken);
      if (user.role === 'admin') {
        router.push("/admin/dashboard");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-semibold text-black dark:text-white tracking-tight">
          Sign in to your account
        </h2>
        <p className="text-lg text-black/80 dark:text-white/80 font-light">
          Enter your credentials to continue.
        </p>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit}>
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
            {error}
          </div>
        )}
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <label className="text-[11px] font-bold text-black/80 dark:text-white/80 uppercase tracking-[0.25em]">
              Email Address
            </label>
          </div>
          <input
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.08] rounded-2xl px-6 py-4 text-base text-black dark:text-white placeholder:text-white/80 focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all duration-300"
          />
        </div>

        <div className="space-y-2">
          <div className="space-y-3">
            <div className="flex justify-between items-center px-1">
              <label className="text-[11px] font-bold text-black/80 dark:text-white/80 uppercase tracking-[0.25em]">
                Password
              </label>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.08] rounded-2xl px-6 py-4 text-base text-black dark:text-white placeholder:text-white/80 focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all duration-300"
            />
          </div>
          <div className="flex justify-end px-1">
            <Link
              href="/forgot-password"
              className="text-[11px] text-black/70 dark:text-white/90 hover:text-white transition-colors uppercase tracking-[0.2em] font-bold"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <Button
          variant="primary"
          type="submit"
          className="w-full h-16 rounded-2xl text-lg font-bold tracking-tight shadow-xl shadow-white/5"
          isLoading={isLoading}
        >
          Sign In
        </Button>
      </form>

      <div className="pt-8 border-t border-black/[0.05] dark:border-white/[0.05] text-center">
        <p className="text-sm text-black/80 dark:text-white/80 font-light">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-black dark:text-white hover:text-brand-accent transition-colors font-medium"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
