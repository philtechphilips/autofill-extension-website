'use client';

import { motion } from 'framer-motion';
import { Chrome, ArrowRight, Github } from 'lucide-react';
import Button from '../ui/Button';

export default function Navbar() {
    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center px-6 py-8 pointer-events-none"
        >
            <div className="max-w-6xl w-full flex items-center justify-between glassmorphic px-5 py-2 rounded-full border border-white/[0.05] shadow-2xl pointer-events-auto">
                {/* Brand */}
                <div className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
                        <Chrome className="w-3.5 h-3.5 text-black" />
                    </div>
                    <span className="text-white font-semibold text-sm tracking-tight">AutoFill AI</span>
                </div>

                {/* Navigation - Ultra Minimal */}
                <div className="hidden md:flex items-center gap-10 text-[11px] font-medium tracking-[0.1em] text-white/40 uppercase">
                    <a href="#features" className="hover:text-white transition-colors">Platform</a>
                    <a href="#security" className="hover:text-white transition-colors">Security</a>
                    <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
                    <a href="#docs" className="hover:text-white transition-colors">Changelog</a>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    <a href="https://github.com" className="text-white/40 hover:text-white transition-colors hidden sm:block">
                        <Github className="w-4 h-4" />
                    </a>
                    <div className="w-px h-4 bg-white/10 hidden sm:block" />
                    <Button variant="primary" size="sm" className="text-[10px] px-5 h-8 font-bold tracking-wider uppercase">
                        Get Project
                    </Button>
                </div>
            </div>
        </motion.nav>
    );
}
