"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Send, UserCheck, Users, X } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";
import { PageHeader, Panel } from "@/components/app/AppUI";
import SiteButton from "@/components/site/SiteButton";
import { fieldClass, FieldLabel } from "@/components/site/Field";

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

  const modes = [
    { value: "all" as const, icon: Users, title: "All users", body: "Send to every verified user" },
    { value: "specific" as const, icon: UserCheck, title: "Specific users", body: "Choose individual emails" },
  ];

  return (
    <div>
      <PageHeader tag="Admin" title="Send an email" subtitle="Write to all users or a few specific people." />

      <Panel>
        <form onSubmit={handleSend} className="space-y-8 p-6 sm:p-8">
          <div>
            <FieldLabel>Recipients</FieldLabel>
            <div className="grid gap-3 sm:grid-cols-2">
              {modes.map(({ value, icon: Icon, title, body: hint }) => {
                const active = recipientMode === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRecipientMode(value)}
                    className={`flex items-center gap-4 rounded-xl p-4 text-left transition-colors duration-300 ${
                      active ? "bg-tile-2 ring-2 ring-inset ring-ink" : "bg-paper ring-1 ring-inset ring-line hover:ring-line-strong"
                    }`}
                  >
                    <span className="grid size-10 place-items-center rounded-[10px] bg-white text-ink">
                      <Icon className="size-[18px]" strokeWidth={1.5} />
                    </span>
                    <span>
                      <span className="block text-[15px] text-ink">{title}</span>
                      <span className="block text-[13px] text-ink-mute">{hint}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {recipientMode === "specific" && (
              <div className="mt-4 space-y-3">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="user@example.com"
                    className={`${fieldClass} flex-1`}
                  />
                  <SiteButton variant="secondary" onClick={addEmail}>
                    Add
                  </SiteButton>
                </div>
                {specificEmails.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {specificEmails.map((email) => (
                      <span
                        key={email}
                        className="inline-flex items-center gap-1.5 rounded-md bg-tile-3 py-1 pl-2.5 pr-1.5 text-[13px] text-ink"
                      >
                        {email}
                        <button
                          type="button"
                          aria-label={`Remove ${email}`}
                          onClick={() => removeEmail(email)}
                          className="grid size-5 place-items-center rounded text-ink-mute hover:bg-white hover:text-ink"
                        >
                          <X className="size-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-[13px] text-ink-mute">Press Enter or comma to add an email.</p>
                )}
              </div>
            )}
          </div>

          <label className="block">
            <FieldLabel>Subject</FieldLabel>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Important update from AutoFill"
              maxLength={200}
              className={fieldClass}
            />
          </label>

          <label className="block">
            <FieldLabel>Message</FieldLabel>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your message here. Use blank lines to separate paragraphs."
              rows={10}
              className={`${fieldClass} h-auto resize-y py-3.5 leading-relaxed`}
            />
            <span className="mt-2 block text-[13px] text-ink-mute">
              Plain text. Blank lines become paragraphs; single line breaks are kept.
            </span>
          </label>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            {result ? (
              <div className={`flex items-center gap-2.5 text-[14px] ${result.failed === 0 ? "text-emerald-800" : "text-amber-800"}`}>
                {result.failed === 0 ? <CheckCircle2 className="size-5" strokeWidth={1.5} /> : <AlertCircle className="size-5" strokeWidth={1.5} />}
                <span>{result.failed === 0 ? "All delivered" : "Partly delivered"}</span>
                <span className="text-ink-mute">
                  {result.sent}/{result.total} sent
                  {result.failed > 0 && ` · ${result.failed} failed`}
                </span>
              </div>
            ) : (
              <div />
            )}
            <SiteButton type="submit" loading={sending} icon={<Send />}>
              {sending ? "Sending…" : "Send email"}
            </SiteButton>
          </div>
        </form>
      </Panel>
    </div>
  );
}
