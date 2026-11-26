"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import SiteButton from "@/components/site/SiteButton";
import { fieldClass, FieldLabel } from "@/components/site/Field";
import { AuthError, AuthHeading } from "@/components/auth/AuthUI";

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
    <div>
      <AuthHeading
        title="Create your account"
        subtitle="Start with free credits. No card needed."
      />

      <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
        {error && <AuthError>{error}</AuthError>}

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <FieldLabel>First name</FieldLabel>
            <input
              type="text"
              placeholder="Alex"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              autoComplete="given-name"
              className={fieldClass}
            />
          </label>
          <label className="block">
            <FieldLabel>Last name</FieldLabel>
            <input
              type="text"
              placeholder="Sterling"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              autoComplete="family-name"
              className={fieldClass}
            />
          </label>
        </div>

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
          <FieldLabel>Password</FieldLabel>
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

        <SiteButton type="submit" size="lg" arrow loading={isLoading} className="!mt-8 w-full justify-between">
          Create account
        </SiteButton>
        <p className="text-[13px] text-ink-soft">
          By signing up, you agree to our{" "}
          <Link href="/terms" className="text-ink underline underline-offset-4">
            terms of service
          </Link>
          .
        </p>
      </form>

      <p className="mt-8 border-t border-line pt-6 text-[14.5px] text-ink-soft">
        Already have an account?{" "}
        <Link href="/login" className="text-ink underline underline-offset-4 hover:opacity-70">
          Sign in
        </Link>
      </p>
    </div>
  );
}
