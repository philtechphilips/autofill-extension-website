"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Panel } from "./AppUI";
import SiteButton from "@/components/site/SiteButton";

/** Shared error boundary content for every route group. */
export default function ErrorPanel({
  error,
  reset,
  tag,
  body,
  homeHref,
  homeLabel,
}: {
  error: Error & { digest?: string };
  reset: () => void;
  tag: string;
  body: string;
  homeHref: string;
  homeLabel: string;
}) {
  useEffect(() => {
    console.error(`[${tag}]`, error);
  }, [error, tag]);

  return (
    <div className="grid min-h-[60vh] place-items-center">
      <Panel tone="warm-soft" className="w-full max-w-[560px] p-8 sm:p-10">
        <span className="grid size-11 place-items-center rounded-[10px] bg-white text-ink">
          <AlertTriangle className="size-5" strokeWidth={1.5} />
        </span>
        <h1 className="mt-7 font-serif-display text-[40px] leading-[1.05] text-ink">Something went wrong</h1>
        <p className="mt-3 text-[15.5px] leading-[1.55] text-ink-soft">{body}</p>
        {error.digest && <p className="mt-4 font-mono text-[12px] text-ink-mute">Error ID: {error.digest}</p>}
        <div className="mt-8 flex flex-wrap gap-3">
          <SiteButton onClick={reset} icon={<RefreshCw />}>
            Try again
          </SiteButton>
          <SiteButton href={homeHref} variant="secondary">
            {homeLabel}
          </SiteButton>
        </div>
      </Panel>
    </div>
  );
}
