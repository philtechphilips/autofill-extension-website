"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import api from "@/lib/api";
import SiteButton from "@/components/site/SiteButton";
import { fieldClass, FieldLabel } from "@/components/site/Field";
import { AuthError, AuthHeading, AuthStatus } from "@/components/auth/AuthUI";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await api.post("/auth/forgot-password", { email });
      setIsSubmitted(true);
    } catch (err: any) {
      const data = err.response?.data;
      setError(data?.error || data?.message || "Failed to send reset link");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <AuthStatus
        tone="success"
        title="Check your email"
        action={
          <SiteButton href="/login" variant="secondary" size="lg" className="w-full">
            Back to sign in
          </SiteButton>
        }
      >
        If an account exists for that email, you&apos;ll receive a reset link shortly.
      </AuthStatus>
    );
  }

  return (
    <div>
      <Link
        href="/login"
        className="mb-8 inline-flex items-center gap-2 text-[14px] text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowLeft className="size-4" strokeWidth={1.5} />
        Back to sign in
      </Link>
      <AuthHeading
        title="Forgot your password?"
        subtitle="Enter your email and we'll send you a link to reset it."
      />

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
        <SiteButton type="submit" size="lg" arrow loading={isLoading} className="!mt-8 w-full justify-between">
          Send reset link
        </SiteButton>
      </form>
    </div>
  );
}
