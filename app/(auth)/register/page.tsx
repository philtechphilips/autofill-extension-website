'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import AuthInput from '@/components/auth/AuthInput';
import Button from '@/components/ui/Button';

export default function RegisterPage() {
    return (
        <div className="space-y-12">
            <div className="space-y-4 text-center">
                <h2 className="text-3xl font-semibold text-white tracking-tight">Create your account</h2>
                <p className="text-lg text-white/40 font-light">Join thousands of professionals saving time.</p>
            </div>

            <form className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                    <AuthInput
                        label="First name"
                        type="text"
                        placeholder="Alex"
                        name="firstName"
                        required
                    />
                    <AuthInput
                        label="Last name"
                        type="text"
                        placeholder="Sterling"
                        name="lastName"
                        required
                    />
                </div>
                <AuthInput
                    label="Email Address"
                    type="email"
                    placeholder="name@company.com"
                    name="email"
                    required
                />
                <AuthInput
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    name="password"
                    required
                />

                <div className="space-y-6">
                    <Button variant="primary" className="w-full h-16 rounded-2xl text-lg font-bold tracking-tight">
                        Create Account
                    </Button>
                    <p className="text-[11px] text-white/20 leading-relaxed uppercase tracking-[0.2em] text-center">
                        By signing up, you agree to our <Link href="/terms" className="underline hover:text-white transition-colors">terms of service</Link>.
                    </p>
                </div>
            </form>

            <div className="pt-8 border-t border-white/[0.05] text-center">
                <p className="text-sm text-white/30 font-light">
                    Already have an account?{' '}
                    <Link href="/login" className="text-white hover:text-brand-accent transition-colors font-medium">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
