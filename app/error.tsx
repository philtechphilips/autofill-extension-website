"use client";

import ErrorPanel from "@/components/app/ErrorPanel";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="site min-h-screen px-5">
      <ErrorPanel
        error={error}
        reset={reset}
        tag="GlobalError"
        body="An unexpected error occurred. You can try again or return to the home page."
        homeHref="/"
        homeLabel="Go home"
      />
    </div>
  );
}
