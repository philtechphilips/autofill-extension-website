'use client';

import { motion } from 'framer-motion';
import { History, Sparkles } from 'lucide-react';

export default function HistoryPage() {
    return (
        <div className="space-y-12">
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-brand-accent text-xs font-bold uppercase tracking-[0.3em]">
                    <History className="w-4 h-4" />
                    Data Archives
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tighter leading-none">
                    Form History<span className="text-white/70">.</span>
                </h1>
                <p className="text-xl text-white/80 font-light max-w-xl">
                    Review your historical precision mapping and data population events.
                </p>
            </div>

            <div className="glassmorphic p-20 rounded-[40px] text-center space-y-6">
                <div className="w-20 h-20 bg-white/[0.03] border border-white/[0.05] rounded-3xl mx-auto flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-white/60" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white tracking-tight">Archival Module Loading</h2>
                    <p className="text-white/80 font-light italic max-w-xs mx-auto">
                        We are currently stabilizing the historical database connection for your account.
                    </p>
                </div>
            </div>
        </div>
    );
}
