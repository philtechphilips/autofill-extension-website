'use client';

import { motion } from 'framer-motion';

interface AuthInputProps {
    label: string;
    type: string;
    placeholder: string;
    name: string;
    required?: boolean;
}

export default function AuthInput({ label, type, placeholder, name, required = false }: AuthInputProps) {
    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center px-1">
                <label htmlFor={name} className="text-[11px] font-bold text-white/80 uppercase tracking-[0.25em]">
                    {label}
                </label>
            </div>
            <div className="relative group">
                <input
                    id={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    required={required}
                    className="w-full bg-white/[0.02] border border-white/[0.08] rounded-2xl px-6 py-4 text-base text-white placeholder:text-white/60 focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all duration-300"
                />
            </div>
        </div>
    );
}
