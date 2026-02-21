'use client';

import { useState } from 'react';
import Link from 'next/link';
import AuthInput from '@/components/auth/AuthInput';
import Button from '@/components/ui/Button';
import api from '@/lib/api';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            await api.post('/auth/forgot-password', { email });
            setIsSubmitted(true);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to send reset link');
        } finally {
            setIsLoading(false);
        }
    };

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
                    <p className="text-sm text-white/80 font-light leading-relaxed">
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
                    className="inline-flex items-center gap-2 text-[10px] text-white/70 hover:text-white transition-colors uppercase tracking-[0.2em] font-bold mb-4"
                >
                    <ArrowLeft className="w-3 h-3" />
                    Back to login
                </Link>
                <h2 className="text-3xl font-semibold text-white tracking-tight">Forgot Password</h2>
                <p className="text-lg text-white/80 font-light leading-relaxed">
                    Enter your email address to receive a password reset link.
                </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
                        {error}
                    </div>
                )}

                <div className="space-y-3">
                    <label className="text-[11px] font-bold text-white/80 uppercase tracking-[0.25em] px-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        placeholder="name@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-white/[0.02] border border-white/[0.08] rounded-2xl px-6 py-4 text-base text-white placeholder:text-white/60 focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all duration-300"
                    />
                </div>

                <Button
                    variant="primary"
                    type="submit"
                    className="w-full h-16 rounded-2xl text-lg font-bold tracking-tight"
                    isLoading={isLoading}
                >
                    Send Reset Link
                </Button>
            </form>
        </div>
    );
}

