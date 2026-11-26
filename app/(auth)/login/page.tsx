"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import SiteButton from "@/components/site/SiteButton";
import { fieldClass, FieldLabel } from "@/components/site/Field";
import { AuthError, AuthHeading } from "@/components/auth/AuthUI";

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
      if (user.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      const data = err.response?.data;
      setError(data?.error || data?.message || "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <AuthHeading title="Welcome back" subtitle="Sign in to your account to continue." />

      <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
        {error && <AuthError>{error}</AuthError>}

        <label className="block">
          <FieldLabel>Email address</FieldLabel>
          <input
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className={fieldClass}
          />
        </label>

        <label className="block">
          <span className="mb-2 flex items-center justify-between text-[14px] text-ink">
            Password
            <Link href="/forgot-password" className="text-ink-soft underline-offset-4 hover:underline">
              Forgot password?
            </Link>
          </span>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className={fieldClass}
          />
        </label>

        <SiteButton type="submit" size="lg" arrow loading={isLoading} className="!mt-8 w-full justify-between">
          Sign in
        </SiteButton>
      </form>

      <p className="mt-8 border-t border-line pt-6 text-[14.5px] text-ink-soft">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-ink underline underline-offset-4 hover:opacity-70">
          Create one
        </Link>
      </p>
    </div>
  );
}
