"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import SiteShell from "@/components/site/SiteShell";
import { TileReveal } from "@/components/site/Reveal";
import { Container, Wordmark } from "@/components/site/Primitives";
import { EASE } from "@/components/site/motion";

const perks = [
  "Free credits when you sign up",
  "Works on Chrome and Microsoft Edge",
  "Encrypted before it leaves your browser",
];

function FieldStack() {
  const widths = [78, 92, 64];
  return (
    <div className="space-y-3">
      {widths.map((w, i) => (
        <div key={i} className="h-11 rounded-lg border-[1.5px] border-ink/80 p-1.5">
          <motion.div
            className="h-full rounded-[5px] bg-white"
            initial={{ width: "0%" }}
            animate={{ width: `${w}%` }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.8 + i * 0.25 }}
          />
        </div>
      ))}
    </div>
  );
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, hasHydrated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isVerifyPage = pathname.includes("verify-email");
    if (hasHydrated && isAuthenticated && !isVerifyPage) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, hasHydrated, router, pathname]);

  const waiting = !hasHydrated || (isAuthenticated && !pathname.includes("verify-email"));

  return (
    <SiteShell>
      <div className="flex min-h-screen flex-col pb-4 lg:pb-9">
        <Container className="flex h-[72px] shrink-0 items-center justify-between md:h-[84px]">
          <Link href="/" aria-label="AutoFill AI home">
            <Wordmark />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[15px] text-ink transition-opacity hover:opacity-70"
          >
            <ArrowLeft className="size-4" strokeWidth={1.5} />
            Back to site
          </Link>
        </Container>

        <Container className="flex flex-1">
          <div className="grid w-full gap-4 lg:grid-cols-[45fr_55fr] lg:gap-5">
            <TileReveal
              trigger="mount"
              className="hidden flex-col justify-between gap-12 rounded-2xl bg-tile-1 p-11 lg:flex"
            >
              <h2 className="font-serif-display text-[56px] leading-[1] text-ink xl:text-[68px]">
                Every form,
                <br />
                filled for you.
              </h2>
              <div className="space-y-10">
                <FieldStack />
                <ul className="space-y-3">
                  {perks.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-[15px] text-ink">
                      <span className="grid size-5 place-items-center rounded-[5px] bg-ink text-white">
                        <Check className="size-3" strokeWidth={2.75} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </TileReveal>

            <TileReveal
              trigger="mount"
              delay={0.1}
              className="flex items-center justify-center rounded-2xl bg-tile-3 px-5 py-12 sm:px-12 sm:py-16"
            >
              <div className="w-full max-w-[440px]">
                {waiting ? (
                  <div className="flex justify-center py-16">
                    <span className="size-7 animate-spin rounded-full border-2 border-ink/15 border-t-ink" />
                  </div>
                ) : (
                  children
                )}
              </div>
            </TileReveal>
          </div>
        </Container>
      </div>
    </SiteShell>
  );
}
