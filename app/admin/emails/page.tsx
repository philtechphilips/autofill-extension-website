"use client";

import { useState } from "react";
import { Send, Users, UserCheck, X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import api from "@/lib/api";

type RecipientMode = "all" | "specific";

interface SendResult {
    total: number;
    sent: number;
    failed: number;
}

export default function AdminEmailsPage() {
    const [recipientMode, setRecipientMode] = useState<RecipientMode>("all");
    const [specificEmails, setSpecificEmails] = useState<string[]>([]);
    const [emailInput, setEmailInput] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [sending, setSending] = useState(false);
    const [result, setResult] = useState<SendResult | null>(null);

    const addEmail = () => {
        const trimmed = emailInput.trim().toLowerCase();
        if (!trimmed) return;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
            toast.error("Invalid email address.");
            return;
        }
        if (specificEmails.includes(trimmed)) {
            toast.error("Email already added.");
            return;
        }
        setSpecificEmails((prev) => [...prev, trimmed]);
        setEmailInput("");
    };

    const removeEmail = (email: string) => {
        setSpecificEmails((prev) => prev.filter((e) => e !== email));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addEmail();
        }
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!subject.trim() || !body.trim()) {
            toast.error("Subject and body are required.");
            return;
        }
        if (recipientMode === "specific" && specificEmails.length === 0) {
            toast.error("Add at least one recipient email.");
            return;
        }

        setSending(true);
        setResult(null);

        try {
            const res = await api.post("/admin/send-email", {
                recipients: recipientMode === "all" ? "all" : specificEmails,
                subject: subject.trim(),
                body: body.trim(),
            });

            if (res.data.success) {
                setResult(res.data.data);
                toast.success(`Email sent to ${res.data.data.sent} user(s).`);
                setSubject("");
                setBody("");
                setSpecificEmails([]);
                setEmailInput("");
            }
        } catch (err: any) {
            const message = err?.response?.data?.message || "Failed to send email.";
            toast.error(message);
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="space-y-12">
            {/* Page Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-500 text-xs font-bold uppercase tracking-[0.3em] animate-pulse">
                    <div className="w-4 h-4 rounded-full overflow-hidden shrink-0">
                        <Image src="/logo.png" alt="AutoFill AI" width={16} height={16} className="w-full h-full object-cover" />
                    </div>
                    Admin Portal
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-black dark:text-white tracking-tighter leading-none">
                    Send Email<span className="text-black/70 dark:text-white/90">.</span>
                </h1>
                <p className="text-xl text-black/80 dark:text-white/80 font-light max-w-4xl">
                    Compose and send emails to all users or specific recipients.
                </p>
            </div>

            {/* Compose Card */}
            <form onSubmit={handleSend} className="glassmorphic p-8 rounded-[40px] space-y-8">

                {/* Recipients */}
                <div className="space-y-4">
                    <h2 className="text-xs font-bold text-black/50 dark:text-white/50 uppercase tracking-widest">
                        Recipients
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => setRecipientMode("all")}
                            className={`flex items-center gap-3 p-4 rounded-2xl border transition-all duration-200 text-left ${
                                recipientMode === "all"
                                    ? "border-blue-500/50 bg-blue-500/10 text-blue-500"
                                    : "border-black/[0.08] dark:border-white/[0.08] text-black/70 dark:text-white/70 hover:border-black/20 dark:hover:border-white/20"
                            }`}
                        >
                            <Users className="w-5 h-5 shrink-0" />
                            <div>
                                <div className="text-sm font-semibold">All Users</div>
                                <div className="text-xs opacity-70 mt-0.5">Send to every verified user</div>
                            </div>
                        </button>

                        <button
                            type="button"
                            onClick={() => setRecipientMode("specific")}
                            className={`flex items-center gap-3 p-4 rounded-2xl border transition-all duration-200 text-left ${
                                recipientMode === "specific"
                                    ? "border-blue-500/50 bg-blue-500/10 text-blue-500"
                                    : "border-black/[0.08] dark:border-white/[0.08] text-black/70 dark:text-white/70 hover:border-black/20 dark:hover:border-white/20"
                            }`}
                        >
                            <UserCheck className="w-5 h-5 shrink-0" />
                            <div>
                                <div className="text-sm font-semibold">Specific Users</div>
                                <div className="text-xs opacity-70 mt-0.5">Select individual emails</div>
                            </div>
                        </button>
                    </div>

                    {recipientMode === "specific" && (
                        <div className="space-y-3">
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    value={emailInput}
                                    onChange={(e) => setEmailInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="user@example.com"
                                    className="flex-1 bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/[0.08] rounded-xl px-4 py-3 text-sm text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 focus:outline-none focus:border-blue-500/50"
                                />
                                <button
                                    type="button"
                                    onClick={addEmail}
                                    className="px-4 py-3 rounded-xl bg-blue-500/10 text-blue-500 text-sm font-semibold hover:bg-blue-500/20 transition-colors"
                                >
                                    Add
                                </button>
                            </div>
                            {specificEmails.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {specificEmails.map((email) => (
                                        <span
                                            key={email}
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/[0.05] dark:bg-white/[0.05] text-xs text-black/80 dark:text-white/80"
                                        >
                                            {email}
                                            <button
                                                type="button"
                                                onClick={() => removeEmail(email)}
                                                className="text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-xs text-black/40 dark:text-white/40">
                                    Press Enter or comma to add an email.
                                </p>
                            )}
                        </div>
                    )}
                </div>

                <hr className="border-black/[0.06] dark:border-white/[0.06]" />

                {/* Subject */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-black/50 dark:text-white/50 uppercase tracking-widest">
                        Subject
                    </label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. Important update from Autofill"
                        maxLength={200}
                        className="w-full bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/[0.08] rounded-xl px-4 py-3 text-sm text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 focus:outline-none focus:border-blue-500/50"
                    />
                </div>

                {/* Body */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-black/50 dark:text-white/50 uppercase tracking-widest">
                        Message
                    </label>
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Write your message here. Use blank lines to separate paragraphs."
                        rows={10}
                        className="w-full bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/[0.08] rounded-xl px-4 py-3 text-sm text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 focus:outline-none focus:border-blue-500/50 resize-y"
                    />
                    <p className="text-xs text-black/40 dark:text-white/40">
                        Plain text — blank lines become paragraphs, single line breaks are preserved.
                    </p>
                </div>

                <hr className="border-black/[0.06] dark:border-white/[0.06]" />

                {/* Footer: result + send button side by side */}
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    {result ? (
                        <div className={`flex items-center gap-3 text-sm ${result.failed === 0 ? "text-emerald-500" : "text-amber-500"}`}>
                            {result.failed === 0
                                ? <CheckCircle2 className="w-5 h-5 shrink-0" />
                                : <AlertCircle className="w-5 h-5 shrink-0" />
                            }
                            <span className="font-semibold">
                                {result.failed === 0 ? "All delivered" : "Partial delivery"}
                            </span>
                            <span className="text-black/50 dark:text-white/50 text-xs">
                                {result.sent}/{result.total} sent
                                {result.failed > 0 && ` · ${result.failed} failed`}
                            </span>
                        </div>
                    ) : (
                        <div />
                    )}

                    <button
                        type="submit"
                        disabled={sending}
                        className="flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl text-sm font-semibold hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {sending ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4" />
                                Send Email
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
