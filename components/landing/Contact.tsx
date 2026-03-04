"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, Send, User, AlertCircle } from "lucide-react";
import Button from "../ui/Button";
import { useState } from "react";

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000/api/v1";
            const response = await fetch(`${apiUrl}/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to send message");
            }

            setSubmitted(true);
            setFormData({ name: "", email: "", message: "" });
        } catch (err: any) {
            setError(err.message || "Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="relative min-h-screen pt-32 pb-24 px-6 overflow-hidden bg-white dark:bg-onyx flex items-center">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />

            <div className="relative z-10 max-w-[700px] mx-auto w-full">
                <motion.div
                    className="text-center mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.05] rounded-full px-4 py-1.5 mb-6 md:mb-8">
                        <Mail className="w-3 h-3 text-brand-accent" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-black/80 dark:text-white/80">
                            Get in touch
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white tracking-tighter mb-4 md:mb-6">
                        Let's talk.
                    </h1>
                    <p className="text-base md:text-lg text-black/60 dark:text-white/80 mx-auto font-light leading-relaxed">
                        Have a question about AutoFill AI, need help with your account, or want to discuss enterprise features? We're here to help.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="glassmorphic p-8 md:p-12 lg:p-16 rounded-[40px] shadow-2xl relative overflow-hidden max-w-[700px] mx-auto w-full group"
                >
                    {/* Subtle Inner Glow */}
                    <div className="absolute -inset-px bg-gradient-to-b from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    {submitted ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="py-20 flex flex-col items-center text-center gap-6"
                        >
                            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center">
                                <Send className="w-10 h-10 text-emerald-500 ml-1" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold text-black dark:text-white">Message Sent!</h3>
                                <p className="text-black/60 dark:text-white/80 font-light max-w-[700px] mx-auto">
                                    Thank you for reaching out. We'll get back to you within 24 hours.
                                </p>
                            </div>
                            <Button
                                variant="primary"
                                onClick={() => setSubmitted(false)}
                                className="mt-4"
                            >
                                Send another message
                            </Button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10 w-full max-w-[700px] mx-auto">
                            {error && (
                                <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-600 dark:text-red-400">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    <p className="text-sm">{error}</p>
                                </div>
                            )}

                            <div className="flex flex-col gap-6 w-full">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-xs font-bold text-black/70 dark:text-white/90 uppercase tracking-wider pl-1">Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 dark:text-white/40" />
                                        <input
                                            type="text"
                                            id="name"
                                            required
                                            minLength={2}
                                            maxLength={100}
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.08] rounded-2xl py-4 pr-6 pl-[3.25rem] text-base text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus:outline-none focus:border-brand-accent focus:bg-black/[0.04] dark:focus:bg-white/[0.05] transition-all duration-300"
                                            placeholder="Jane Doe"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-xs font-bold text-black/70 dark:text-white/90 uppercase tracking-wider pl-1">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 dark:text-white/40" />
                                        <input
                                            type="email"
                                            id="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.08] rounded-2xl py-4 pr-6 pl-[3.25rem] text-base text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus:outline-none focus:border-brand-accent focus:bg-black/[0.04] dark:focus:bg-white/[0.05] transition-all duration-300"
                                            placeholder="jane@example.com"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-xs font-bold text-black/70 dark:text-white/90 uppercase tracking-wider pl-1">Message</label>
                                <div className="relative">
                                    <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-black/40 dark:text-white/40" />
                                    <textarea
                                        id="message"
                                        required
                                        rows={5}
                                        minLength={10}
                                        maxLength={5000}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full py-4 pr-6 pl-[3.25rem] bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.08] rounded-2xl text-base text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus:outline-none focus:border-brand-accent focus:bg-black/[0.04] dark:focus:bg-white/[0.05] transition-all duration-300 resize-none"
                                        placeholder="How can we help you today?"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                className="w-full h-14 flex items-center justify-center gap-2"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Send Message
                                        <Send className="w-4 h-4" />
                                    </>
                                )}
                            </Button>
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
