"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Github, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { name: "Features", href: "/#features" },
      { name: "Pricing", href: "/#pricing" },
      { name: "Demo", href: "/#demo" },
      { name: "FAQ", href: "/#faq" },
    ],
    Company: [
      { name: "About", href: "/#about" },
      { name: "Blog", href: "/#blog" },
      { name: "Careers", href: "/#careers" },
      { name: "Contact", href: "/contact" },
    ],
    Legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Security", href: "/#security" },
    ],
  };

  return (
    <footer className="relative bg-white dark:bg-onyx pt-32 pb-12 px-6 overflow-hidden">
      {/* Visual Separator */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-24">
          <div className="col-span-2 lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-8"
            >
              <h3 className="text-2xl font-bold text-black dark:text-white tracking-tighter flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg shadow-white/10">
                  <Image
                    src="/logo.png"
                    alt="AutoFill AI"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                AutoFill AI
              </h3>
              <p className="text-xl md:text-2xl text-black/80 dark:text-white/80 font-light leading-tight tracking-tight">
                The standard for precision-driven form automation. Built by
                engineers, for the technical elite.
              </p>
              <div className="flex gap-4">
                {[
                  {
                    name: "X",
                    href: "https://x.com/ai_autofill",
                    icon: <Twitter className="w-5 h-5" />
                  },
                  {
                    name: "GitHub",
                    href: "https://github.com/philtechphilips/autofill-chrome-extension",
                    icon: <Github className="w-5 h-5" />
                  }
                ].map((social, i) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="w-11 h-11 rounded-full border border-black/[0.05] dark:border-white/[0.05] bg-black/[0.02] dark:bg-white/[0.02] flex items-center justify-center text-black/70 dark:text-white/70 hover:text-white hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 group"
                  >
                    <span className="sr-only">{social.name}</span>
                    <div className="transition-transform group-hover:scale-110">
                      {social.icon}
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {Object.entries(footerLinks).map(([category, links], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <h4 className="text-[11px] font-bold text-black/70 dark:text-white/70 uppercase tracking-[0.25em] mb-8">
                {category}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-[15px] text-black/80 dark:text-white/80 hover:text-white transition-all duration-300 font-light hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="pt-12 border-t border-black/[0.03] dark:border-white/[0.03] flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-[11px] font-mono text-black/60 dark:text-white/60 tracking-[0.2em] uppercase">
              © {currentYear} AutoFill Labs Inc.
            </p>
            <div className="h-4 w-px bg-black/[0.05] dark:bg-white/[0.05] hidden md:block" />
            <p className="text-[11px] font-mono text-black/60 dark:text-white/60 tracking-[0.2em] uppercase italic">
              Built for speed.
            </p>
          </div>

          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-[10px] text-black/70 dark:text-white/70 font-medium tracking-[0.15em] uppercase">
                Systems status: <span className="text-black/80 dark:text-white/80">Nominal</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
