"use client";

import ErrorPanel from "@/components/app/ErrorPanel";

export default function AdminError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <ErrorPanel
      error={error}
      reset={reset}
      tag="AdminError"
      body="This admin page ran into an unexpected error. Try reloading, or open a different section."
      homeHref="/admin/dashboard"
      homeLabel="Admin home"
    />
  );
}
