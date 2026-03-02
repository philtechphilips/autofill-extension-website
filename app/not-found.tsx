"use client";

import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function NotFound() {
  return (
    <main className="relative w-full min-h-screen overflow-hidden">
      <Navbar />

      {/* Background */}
      <div className="absolute inset-0 gradient-mesh pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.3]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center pt-20 pb-32">
        {/* 404 number */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-2 select-none"
        >
          <span
            className="font-bold leading-none"
            style={{
              fontSize: "clamp(8rem, 22vw, 16rem)",
              background: "linear-gradient(135deg, #3b82f6 0%, #60a5fa 50%, #93c5fd 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            404
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-4xl font-semibold text-white mb-4"
        >
          Page not found
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white/50 text-base md:text-lg max-w-2sm mb-10"
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved to a
          different URL.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 items-center"
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 h-11 bg-white text-black text-sm font-semibold rounded-md hover:bg-gray-100 transition-colors"
          >
            <Home className="w-4 h-4" />
            Go home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 h-11 bg-white/[0.03] text-white/90 text-sm font-semibold rounded-md border border-white/[0.05] hover:bg-white/[0.08] backdrop-blur-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go back
          </button>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
