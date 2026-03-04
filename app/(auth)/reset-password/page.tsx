"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import AuthInput from "@/components/auth/AuthInput";
import Button from "@/components/ui/Button";
import api from "@/lib/api";
import { CheckCircle2 } from "lucide-react";

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!token) {
      setError("Reset token is missing from the URL");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await api.post("/auth/reset-password", { token, password });
      setIsSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="space-y-8 text-center py-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
            <CheckCircle2 className="w-8 h-8" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-black dark:text-white tracking-tight">
            Password Updated
          </h2>
          <p className="text-sm text-black/80 dark:text-white/80 font-light leading-relaxed">
            Your password has been successfully updated. You can now log in with
            your new password.
          </p>
        </div>
        <Button
          href="/login"
          variant="primary"
          className="w-full h-16 rounded-2xl text-lg font-bold tracking-tight"
        >
          Sign In Now
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-semibold text-black dark:text-white tracking-tight">
          Reset Password
        </h2>
        <p className="text-lg text-black/80 dark:text-white/80 font-light leading-relaxed">
          Please enter your new password below.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <label className="text-[11px] font-bold text-black/80 dark:text-white/80 uppercase tracking-[0.25em] px-1">
            New Password
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

        <div className="space-y-3">
          <label className="text-[11px] font-bold text-black/80 dark:text-white/80 uppercase tracking-[0.25em] px-1">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.08] rounded-2xl px-6 py-4 text-base text-black dark:text-white placeholder:text-white/80 focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all duration-300"
          />
        </div>

        <Button
          variant="primary"
          type="submit"
          className="w-full h-16 rounded-2xl text-lg font-bold tracking-tight"
          isLoading={isLoading}
        >
          Reset Password
        </Button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-black/20 dark:border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
