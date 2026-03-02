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
    <footer className="relative bg-deep-navy pt-24 pb-12 px-6 overflow-hidden">
      {/* Match the same texture as the rest of the page */}
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      {/* Top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-16">
          <div className="col-span-2 lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-6"
            >
              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src="/logo.png"
                    alt="AutoFill AI"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                AutoFill AI
              </h3>
              <p className="text-sm text-white/40 font-light leading-relaxed max-w-3xs">
                The standard for precision-driven form automation. Built by
                engineers, for everyone.
              </p>
              <div className="flex gap-3">
                {[
                  {
                    name: "X",
                    href: "https://x.com/ai_autofill",
                    icon: <Twitter className="w-4 h-4" />
                  },
                  {
                    name: "GitHub",
                    href: "https://github.com/philtechphilips/autofill-chrome-extension",
                    icon: <Github className="w-4 h-4" />
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
                    className="w-9 h-9 rounded-full border border-white/10 bg-white/4 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 hover:bg-white/8 transition-all duration-300 group"
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
              transition={{ delay: 0.1 + i * 0.1 }}
            >
              <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.25em] mb-6">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-all duration-300 font-light hover:translate-x-0.5 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/[0.07] flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
            <p className="text-[11px] font-mono text-white/30 tracking-[0.2em] uppercase">
              © {currentYear} AutoFill Labs Inc.
            </p>
            <div className="h-3 w-px bg-white/10 hidden md:block" />
            <p className="text-[11px] font-mono text-white/20 tracking-[0.2em] uppercase italic">
              Built for speed.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-[10px] text-white/30 font-medium tracking-[0.15em] uppercase">
              Systems status: <span className="text-emerald-400">Nominal</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
