'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import AuthInput from '@/components/auth/AuthInput';
import Button from '@/components/ui/Button';

export default function LoginPage() {
    return (
        <div className="space-y-12">
            <div className="space-y-4 text-center">
                <h2 className="text-3xl font-semibold text-white tracking-tight">Sign in to your account</h2>
                <p className="text-lg text-white/40 font-light">Enter your credentials to continue.</p>
            </div>

            <form className="space-y-8">
                <AuthInput
                    label="Email Address"
                    type="email"
                    placeholder="name@company.com"
                    name="email"
                    required
                />
                <div className="space-y-2">
                    <AuthInput
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        name="password"
                        required
                    />
                    <div className="flex justify-end px-1">
                        <Link
                            href="/forgot-password"
                            className="text-[11px] text-white/20 hover:text-white transition-colors uppercase tracking-[0.2em] font-bold"
                        >
                            Forgot password?
                        </Link>
                    </div>
                </div>

                <Button variant="primary" className="w-full h-16 rounded-2xl text-lg font-bold tracking-tight shadow-xl shadow-white/5">
                    Sign In
                </Button>
            </form>

            <div className="pt-8 border-t border-white/[0.05] text-center">
                <p className="text-sm text-white/30 font-light">
                    Don't have an account?{' '}
                    <Link href="/register" className="text-white hover:text-brand-accent transition-colors font-medium">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    );
}
