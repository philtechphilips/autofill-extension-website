'use client';

import { motion } from 'framer-motion';
import { Shield, Sparkles } from 'lucide-react';

export default function SecurityPage() {
    return (
        <div className="space-y-12">
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-brand-accent text-xs font-bold uppercase tracking-[0.3em]">
                    <Shield className="w-4 h-4" />
                    Vault Access
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tighter leading-none">
                    Security<span className="text-white/70">.</span>
                </h1>
                <p className="text-xl text-white/80 font-light max-w-xl">
                    Manage your encryption keys, multi-factor authentication, and active sessions.
                </p>
            </div>

            <div className="glassmorphic p-20 rounded-[40px] text-center space-y-6">
                <div className="w-20 h-20 bg-white/[0.03] border border-white/[0.05] rounded-3xl mx-auto flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-white/60" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white tracking-tight">Security Protocol Initialization</h2>
                    <p className="text-white/80 font-light italic max-w-xs mx-auto">
                        We are currently isolating your security environment for maximum protection.
                    </p>
                </div>
            </div>
        </div>
    );
}
