"use client";

import SiteShell from "@/components/site/SiteShell";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import SiteButton from "@/components/site/SiteButton";
import { TileReveal } from "@/components/site/Reveal";
import { Container } from "@/components/site/Primitives";

export default function NotFound() {
  return (
    <SiteShell>
      <Navbar />
      <main className="pt-[84px] md:pt-[92px]">
        <Container>
          <div className="grid gap-4 lg:grid-cols-[58fr_42fr] lg:gap-5">
            <TileReveal
              trigger="mount"
              className="flex min-h-[440px] flex-col justify-between gap-12 rounded-2xl bg-tile-2 p-8 sm:p-11"
            >
              <h1 className="font-serif-display text-[52px] leading-[1.02] text-ink sm:text-[76px]">
                This page didn&apos;t
                <br />
                fill in.
              </h1>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <p className="max-w-[360px] text-[16px] leading-[1.55] text-ink">
                  The page you&apos;re looking for doesn&apos;t exist or has moved.
                </p>
                <div className="flex gap-3">
                  <SiteButton variant="secondary" onClick={() => window.history.back()}>
                    Go back
                  </SiteButton>
                  <SiteButton href="/" arrow>
                    Home
                  </SiteButton>
                </div>
              </div>
            </TileReveal>
            <TileReveal
              trigger="mount"
              delay={0.15}
              className="grid min-h-[260px] place-items-center rounded-2xl bg-tile-warm"
            >
              <span className="font-serif-display text-[140px] leading-none text-ink sm:text-[180px]">
                404
              </span>
            </TileReveal>
          </div>
        </Container>
      </main>
      <Footer />
    </SiteShell>
  );
}
