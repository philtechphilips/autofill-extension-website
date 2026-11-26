"use client";

import ErrorPanel from "@/components/app/ErrorPanel";

export default function DashboardError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <ErrorPanel
      error={error}
      reset={reset}
      tag="DashboardError"
      body="This page ran into an unexpected error. Try reloading it. Your data is safe."
      homeHref="/dashboard"
      homeLabel="Back to dashboard"
    />
  );
}
