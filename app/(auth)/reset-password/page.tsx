'use client';

import { useState } from 'react';
import Link from 'next/link';
import AuthInput from '@/components/auth/AuthInput';
import Button from '@/components/ui/Button';
import { CheckCircle2 } from 'lucide-react';

export default function ResetPasswordPage() {
    const [isSuccess, setIsSuccess] = useState(false);

    if (isSuccess) {
        return (
            <div className="space-y-8 text-center py-4">
                <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                        <CheckCircle2 className="w-8 h-8" />
                    </div>
                </div>
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-white tracking-tight">Password Updated</h2>
                    <p className="text-sm text-white/40 font-light leading-relaxed">
                        Your password has been successfully updated. You can now log in with your new password.
                    </p>
                </div>
                <Button
                    href="/login"
                    variant="primary"
                    className="w-full h-16 rounded-2xl text-lg font-bold tracking-tight"
                >
                    Sign In Now
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h2 className="text-3xl font-semibold text-white tracking-tight">Reset Password</h2>
                <p className="text-lg text-white/40 font-light leading-relaxed">
                    Please enter your new password below.
                </p>
            </div>

            <form
                className="space-y-6"
                onSubmit={(e) => {
                    e.preventDefault();
                    setIsSuccess(true);
                }}
            >
                <AuthInput
                    label="New Password"
                    type="password"
                    placeholder="••••••••"
                    name="password"
                    required
                />
                <AuthInput
                    label="Confirm Password"
                    type="password"
                    placeholder="••••••••"
                    name="confirmPassword"
                    required
                />

                <Button variant="primary" className="w-full h-16 rounded-2xl text-lg font-bold tracking-tight">
                    Reset Password
                </Button>
            </form>
        </div>
    );
}
