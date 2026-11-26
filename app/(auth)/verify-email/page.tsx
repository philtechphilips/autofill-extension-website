"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import SiteButton from "@/components/site/SiteButton";
import { AuthHeading, AuthSpinner, AuthStatus } from "@/components/auth/AuthUI";

function VerifyEmailContent() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { setAuth, updateUser } = useAuthStore();

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Verification token is missing.");
        return;
      }

      try {
        const response = await api.post("/auth/verify-email", { token });
        const { user, message: successMsg } = response.data.data;

        if (user) {
          if (response.data.data.accessToken) {
            setAuth(user, response.data.data.accessToken);
          } else {
            // Update existing user in store with verified status
            updateUser({ isEmailVerified: true });
          }
        }

        setStatus("success");
        setMessage(successMsg || "Your email has been verified successfully.");
      } catch (err: any) {
        setStatus("error");
        const data = err.response?.data;
        setMessage(
          data?.error || data?.message || "Verification failed. The link may be expired or invalid.",
        );
      }
    };

    verify();
  }, [token, setAuth, updateUser]);

  if (status === "loading") {
    return (
      <div>
        <AuthHeading title="Verifying your email" subtitle="This only takes a moment." />
        <AuthSpinner />
      </div>
    );
  }

  if (status === "success") {
    return (
      <AuthStatus
        tone="success"
        title="Email verified"
        action={
          <SiteButton href="/dashboard" size="lg" arrow className="w-full justify-between">
            Go to dashboard
          </SiteButton>
        }
      >
        {message}
      </AuthStatus>
    );
  }

  return (
    <AuthStatus
      tone="error"
      title="Verification failed"
      action={
        <SiteButton href="/login" variant="secondary" size="lg" className="w-full">
          Back to sign in
        </SiteButton>
      }
    >
      {message}
    </AuthStatus>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<AuthSpinner />}>
      <VerifyEmailContent />
    </Suspense>
  );
}
