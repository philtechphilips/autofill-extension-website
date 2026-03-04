"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, hasHydrated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isVerifyPage = pathname.includes("verify-email");
    if (hasHydrated && isAuthenticated && !isVerifyPage) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, hasHydrated, router, pathname]);

  if (!hasHydrated || (isAuthenticated && !pathname.includes("verify-email"))) {
    return (
      <div className="min-h-screen bg-white dark:bg-onyx flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-black/20 dark:border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-onyx relative flex flex-col items-center py-20 px-6 overflow-y-auto overflow-x-hidden">
      {/* Background Elements - Consistent with Hero */}
      <div className="absolute inset-0 grid-pattern opacity-40 pt-20 pointer-events-none" />
      <div className="absolute inset-0 gradient-mesh opacity-100 pointer-events-none" />

      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[600px] mx-auto my-auto flex flex-col"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8 md:mb-12">
          <Link href="/" className="group mb-6 md:mb-8">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden transition-transform group-hover:scale-110 shadow-2xl shadow-white/10">
              <Image
                src="/logo.png"
                alt="AutoFill AI"
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
          <div className="text-center space-y-2 md:space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold text-black dark:text-white tracking-tighter leading-tight">
              AutoFill AI
            </h1>
            <p className="text-black/80 dark:text-white/80 text-base md:text-xl font-light tracking-tight mx-auto px-4">
              Stop filling forms. Start moving faster.
            </p>
          </div>
        </div>

        {/* Auth Card */}
        <div className="glassmorphic p-8 md:p-12 lg:p-16 rounded-[40px] shadow-2xl relative overflow-hidden group">
          {/* Subtle Inner Glow */}
          <div className="absolute -inset-px bg-gradient-to-b from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {children}
        </div>

        {/* Footer Link */}
        <div className="mt-8 md:mt-12 text-center text-[10px] font-mono tracking-[0.2em] text-black/60 dark:text-white/80 uppercase italic">
          Built for the technical elite.
        </div>
      </motion.div>
    </div>
  );
}
