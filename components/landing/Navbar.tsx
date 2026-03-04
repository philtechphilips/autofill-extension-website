"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Button from "../ui/Button";
import { useAuthStore } from "@/store/authStore";

export default function Navbar() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-6 py-8 pointer-events-none"
    >
      <div className="max-w-6xl w-full flex items-center justify-between glassmorphic px-5 py-2 rounded-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] pointer-events-auto">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="w-8 h-8 rounded-full overflow-hidden transition-transform group-hover:scale-110 shadow-lg shadow-white/10">
            <Image
              src="/logo.png"
              alt="AutoFill AI"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-black dark:text-white font-semibold text-sm tracking-tight">
            AutoFill AI
          </span>
        </Link>

        {/* Navigation - Ultra Minimal */}
        <div className="hidden md:flex items-center gap-10 text-[12px] font-semibold tracking-[0.1em] text-black dark:text-white uppercase">
          <a href="/#features" className="hover:text-white/90 transition-colors">
            Features
          </a>
          <a href="/#security" className="hover:text-white/90 transition-colors">
            Security
          </a>
          <a href="/#pricing" className="hover:text-white/90 transition-colors">
            Pricing
          </a>
          <a href="/#faq" className="hover:text-white/90 transition-colors">
            FAQ
          </a>
          <Link href="/contact" className="hover:text-white/90 transition-colors">
            Contact
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/philtechphilips/autofill-chrome-extension"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black/80 dark:text-white/80 hover:text-white transition-colors hidden sm:block"
          >
            <Github className="w-4 h-4" />
          </a>
          <div className="w-px h-4 bg-black/10 dark:bg-white/10 hidden sm:block" />
          {isAuthenticated ? (
            <Button
              href="/dashboard"
              variant="primary"
              size="sm"
              className="text-[10px] px-5 h-8 font-bold tracking-wider uppercase"
            >
              Dashboard
            </Button>
          ) : (
            <>
              <Link
                href="/login"
                className="text-[12px] font-bold tracking-widest text-black dark:text-white hover:text-white/90 uppercase transition-colors"
              >
                Sign In
              </Link>
              <Button
                href="/register"
                variant="primary"
                size="sm"
                className="text-[10px] px-5 h-8 font-bold tracking-wider uppercase"
              >
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
