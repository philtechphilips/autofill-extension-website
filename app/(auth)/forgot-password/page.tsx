'use client';

import { useState } from 'react';
import Link from 'next/link';
import AuthInput from '@/components/auth/AuthInput';
import Button from '@/components/ui/Button';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    if (isSubmitted) {
        return (
            <div className="space-y-8 text-center py-4">
                <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                        <CheckCircle2 className="w-8 h-8" />
                    </div>
                </div>
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-white tracking-tight">Email Sent</h2>
                    <p className="text-sm text-white/40 font-light leading-relaxed">
                        If an account exists for that email, you will receive a reset link shortly.
                    </p>
                </div>
                <Button
                    href="/login"
                    variant="secondary"
                    className="w-full h-16 rounded-2xl text-lg font-bold tracking-tight"
                >
                    Back to Login
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-[10px] text-white/20 hover:text-white transition-colors uppercase tracking-[0.2em] font-bold mb-4"
                >
                    <ArrowLeft className="w-3 h-3" />
                    Back to login
                </Link>
                <h2 className="text-3xl font-semibold text-white tracking-tight">Forgot Password</h2>
                <p className="text-lg text-white/40 font-light leading-relaxed">
                    Enter your email address to receive a password reset link.
                </p>
            </div>

            <form
                className="space-y-6"
                onSubmit={(e) => {
                    e.preventDefault();
                    setIsSubmitted(true);
                }}
            >
                <AuthInput
                    label="Email Address"
                    type="email"
                    placeholder="name@company.com"
                    name="email"
                    required
                />

                <Button variant="primary" className="w-full h-16 rounded-2xl text-lg font-bold tracking-tight">
                    Send Reset Link
                </Button>
            </form>
        </div>
    );
}
