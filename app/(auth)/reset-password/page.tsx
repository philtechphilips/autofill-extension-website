"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import api from "@/lib/api";
import SiteButton from "@/components/site/SiteButton";
import { fieldClass, FieldLabel } from "@/components/site/Field";
import { AuthError, AuthHeading, AuthSpinner, AuthStatus } from "@/components/auth/AuthUI";

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const searchParams = useSearchParams();
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
      const data = err.response?.data;
      setError(data?.error || data?.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <AuthStatus
        tone="success"
        title="Password updated"
        action={
          <SiteButton href="/login" size="lg" arrow className="w-full justify-between">
            Sign in now
          </SiteButton>
        }
      >
        Your password has been updated. You can now sign in with your new password.
      </AuthStatus>
    );
  }

  return (
    <div>
      <AuthHeading title="Choose a new password" subtitle="Enter and confirm your new password below." />

      <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
        {error && <AuthError>{error}</AuthError>}
        <label className="block">
          <FieldLabel>New password</FieldLabel>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            className={fieldClass}
          />
        </label>
        <label className="block">
          <FieldLabel>Confirm password</FieldLabel>
          <input
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
            className={fieldClass}
          />
        </label>
        <SiteButton type="submit" size="lg" arrow loading={isLoading} className="!mt-8 w-full justify-between">
          Reset password
        </SiteButton>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<AuthSpinner />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
