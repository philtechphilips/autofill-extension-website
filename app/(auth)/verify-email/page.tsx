"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

function VerifyEmailContent() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
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
        setMessage(
          err.response?.data?.message ||
          "Verification failed. The link may be expired or invalid.",
        );
      }
    };

    verify();
  }, [token, setAuth, updateUser]);

  return (
    <div className="space-y-8 text-center py-10">
      {status === "loading" && (
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-12 h-12 text-black/70 dark:text-white/90 animate-spin" />
          <h2 className="text-xl font-medium text-black dark:text-white">
            Verifying your identity
          </h2>
          <p className="text-black/80 dark:text-white/80 font-light">
            Please wait while we secure your account...
          </p>
        </div>
      )}

      {status === "success" && (
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
              <CheckCircle2 className="w-8 h-8" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-black dark:text-white tracking-tight">
              Email Verified
            </h2>
            <p className="text-lg text-black/80 dark:text-white/80 font-light leading-relaxed">
              {message}
            </p>
          </div>
          <Button
            href="/dashboard"
            variant="primary"
            className="w-full h-16 rounded-2xl text-lg font-bold tracking-tight"
          >
            Go to Dashboard
          </Button>
        </div>
      )}

      {status === "error" && (
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
              <XCircle className="w-8 h-8" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-black dark:text-white tracking-tight">
              Verification Failed
            </h2>
            <p className="text-lg text-black/80 dark:text-white/80 font-light leading-relaxed">
              {message}
            </p>
          </div>
          <Button
            href="/login"
            variant="secondary"
            className="w-full h-16 rounded-2xl text-lg font-bold tracking-tight"
          >
            Back to Login
          </Button>
        </div>
      )}
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-20 text-black dark:text-white">
          <Loader2 className="w-8 h-8 animate-spin opacity-20" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
