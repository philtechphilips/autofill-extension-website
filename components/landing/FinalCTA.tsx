"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Chrome, ArrowRight, Sparkles, Globe } from "lucide-react";
import { toast } from "sonner";

export default function FinalCTA() {
  return (
    <section className="relative py-48 px-6 overflow-hidden bg-onyx">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-accent/6 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-175 h-100 bg-brand-accent/6 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-brand-accent/8 border border-brand-accent/20 rounded-full px-5 py-2 mb-10">
            <Sparkles className="w-3 h-3 text-brand-accent" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent/90">
              Ready to accelerate?
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-8 leading-[0.95]">
            Experience the future <br />
            of form filling.
          </h2>

          <p className="text-lg text-white/90 mb-14 max-w-4xl mx-auto font-light leading-relaxed">
            Join 12,000+ power users who save 10+ hours every week. Open source,
            secure, and ready for your workflow.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="https://chromewebstore.google.com/detail/Autofill.Ai/hdgpkgjdemnphbknlndiloffnocnmfhd"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-10 h-14 text-sm font-semibold tracking-tight rounded-md bg-white text-black hover:bg-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-all duration-200 active:scale-[0.98]"
            >
              <Chrome className="w-4 h-4" />
              Chrome Extension
            </Link>
            <button
              onClick={() => toast.info("Firefox support is coming soon!")}
              className="inline-flex items-center justify-center gap-2 px-10 h-14 text-sm font-semibold tracking-tight rounded-md bg-white/5 text-white/90 border border-white/10 hover:bg-white/10 transition-all duration-200 active:scale-[0.98] cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              Firefox
            </button>
            <button
              onClick={() => toast.info("Microsoft Edge support is coming soon!")}
              className="inline-flex items-center justify-center gap-2 px-10 h-14 text-sm font-semibold tracking-tight rounded-md bg-white/5 text-white/90 border border-white/10 hover:bg-white/10 transition-all duration-200 active:scale-[0.98] cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              Edge
            </button>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
            <span>More browsers coming soon</span>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-x-10 gap-y-4 text-[10px] font-mono tracking-[0.2em] text-white/90 uppercase">
            <span>No credit card required</span>
            <span className="w-1 h-1 rounded-full bg-white/40 self-center" />
            <span>500 Free credits for new users</span>
            <span className="w-1 h-1 rounded-full bg-white/40 self-center" />
            <span>Pay only for what you use</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
