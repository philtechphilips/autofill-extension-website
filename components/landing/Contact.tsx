"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Check } from "lucide-react";
import SiteButton from "@/components/site/SiteButton";
import { TileReveal } from "@/components/site/Reveal";
import { Container } from "@/components/site/Primitives";
import { EASE } from "@/components/site/motion";
import { fieldClass, FieldLabel } from "@/components/site/Field";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000/api/v1";
      const response = await fetch(`${apiUrl}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to send message");

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pt-[84px] md:pt-[92px]">
      <Container>
        <div className="grid gap-4 lg:grid-cols-[42fr_58fr] lg:gap-5">
          <TileReveal
            trigger="mount"
            className="flex min-h-[420px] flex-col justify-between gap-12 rounded-2xl bg-tile-1 p-8 sm:p-11"
          >
            <h1 className="font-serif-display text-[56px] leading-[1] text-ink sm:text-[80px]">
              Let&apos;s talk.
            </h1>
            <div className="space-y-6">
              <p className="max-w-[400px] text-[17px] leading-[1.55] text-ink">
                Questions about AutoFill AI, help with your account, or interested in using it
                with your team? Send us a note.
              </p>
              <div className="flex flex-wrap gap-x-10 gap-y-4 text-[15px] text-ink">
                <div>
                  <div className="text-[13px] text-ink-soft">Email</div>
                  <a href="mailto:hello@autofillai.com" className="hover:opacity-70">
                    hello@autofillai.com
                  </a>
                </div>
                <div>
                  <div className="text-[13px] text-ink-soft">Response time</div>
                  Usually within 24 hours
                </div>
              </div>
            </div>
          </TileReveal>

          <TileReveal trigger="mount" delay={0.15} className="rounded-2xl bg-tile-3 p-6 sm:p-11">
            <AnimatePresence mode="wait" initial={false}>
              {submitted ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="flex h-full flex-col items-start justify-center py-16"
                >
                  <span className="grid size-10 place-items-center rounded-lg bg-ink text-white">
                    <Check className="size-5" strokeWidth={2.25} />
                  </span>
                  <h2 className="mt-6 font-serif-display text-[40px] leading-none">Message sent</h2>
                  <p className="mt-3 max-w-[360px] text-[15px] leading-relaxed text-ink">
                    Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                  <SiteButton variant="secondary" className="mt-8" onClick={() => setSubmitted(false)}>
                    Send another message
                  </SiteButton>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {error && (
                    <div className="flex items-center gap-3 rounded-lg bg-red-50 p-4 text-[14px] text-red-700">
                      <AlertCircle className="size-4 shrink-0" />
                      {error}
                    </div>
                  )}

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <FieldLabel>Name</FieldLabel>
                      <input
                        type="text"
                        required
                        minLength={2}
                        maxLength={100}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={fieldClass}
                        placeholder="Jane Doe"
                      />
                    </label>
                    <label className="block">
                      <FieldLabel>Email</FieldLabel>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={fieldClass}
                        placeholder="jane@example.com"
                      />
                    </label>
                  </div>

                  <label className="block">
                    <FieldLabel>Message</FieldLabel>
                    <textarea
                      required
                      rows={7}
                      minLength={10}
                      maxLength={5000}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`${fieldClass} h-auto resize-none py-3.5 leading-relaxed`}
                      placeholder="How can we help?"
                    />
                  </label>

                  <SiteButton
                    type="submit"
                    size="lg"
                    className="w-full justify-between"
                    loading={isSubmitting}
                    arrow
                  >
                    {isSubmitting ? "Sending…" : "Send message"}
                  </SiteButton>
                </motion.form>
              )}
            </AnimatePresence>
          </TileReveal>
        </div>
      </Container>
    </section>
  );
}
