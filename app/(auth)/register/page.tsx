"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthInput from "@/components/auth/AuthInput";
import Button from "@/components/ui/Button";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Backend expects 'name', so we combine firstName and lastName
      const response = await api.post("/auth/register", {
        email,
        password,
        name: `${firstName} ${lastName}`.trim(),
      });
      const { user, accessToken } = response.data.data;
      setAuth(user, accessToken);
      router.push("/dashboard");
    } catch (err: any) {
      const data = err.response?.data;
      setError(data?.error || data?.message || "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-semibold text-black dark:text-white tracking-tight">
          Create your account
        </h2>
        <p className="text-lg text-black/80 dark:text-white/80 font-light">
          Join thousands of professionals saving time.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <span className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
            500 free credit
          </span>
          <span className="text-xs text-black/50 dark:text-white/90">No credit card required</span>
        </div>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit}>
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
            {error}
          </div>
        )}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-[11px] font-bold text-black/80 dark:text-white/80 uppercase tracking-[0.25em] px-1">
              First name
            </label>
            <input
              type="text"
              placeholder="Alex"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.08] rounded-2xl px-6 py-4 text-base text-black dark:text-white placeholder:text-white/80 focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all duration-300"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[11px] font-bold text-black/80 dark:text-white/80 uppercase tracking-[0.25em] px-1">
              Last name
            </label>
            <input
              type="text"
              placeholder="Sterling"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.08] rounded-2xl px-6 py-4 text-base text-black dark:text-white placeholder:text-white/80 focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all duration-300"
            />
          </div>
        </div>
        <div className="space-y-3">
          <label className="text-[11px] font-bold text-black/80 dark:text-white/80 uppercase tracking-[0.25em] px-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.08] rounded-2xl px-6 py-4 text-base text-black dark:text-white placeholder:text-white/80 focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all duration-300"
          />
        </div>
        <div className="space-y-3">
          <label className="text-[11px] font-bold text-black/80 dark:text-white/80 uppercase tracking-[0.25em] px-1">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.08] rounded-2xl px-6 py-4 text-base text-black dark:text-white placeholder:text-white/80 focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all duration-300"
          />
        </div>

        <div className="space-y-6">
          <Button
            variant="primary"
            type="submit"
            className="w-full h-16 rounded-2xl text-lg font-bold tracking-tight"
            isLoading={isLoading}
          >
            Create Account
          </Button>
          <p className="text-[11px] text-black/70 dark:text-white/90 leading-relaxed uppercase tracking-[0.2em] text-center">
            By signing up, you agree to our{" "}
            <Link
              href="/terms"
              className="underline hover:text-white transition-colors"
            >
              terms of service
            </Link>
            .
          </p>
        </div>
      </form>

      <div className="pt-8 border-t border-black/[0.05] dark:border-white/[0.05] text-center">
        <p className="text-sm text-black/80 dark:text-white/80 font-light">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-black dark:text-white hover:text-brand-accent transition-colors font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
