"use client";

import { FormEvent, useState } from "react";
import { MailPlus, Send } from "lucide-react";
import { EMAIL_REGEX } from "@/constants";
import { useLanguage } from "@/features/i18n";

export default function NewsletterSignup() {
  const { content } = useLanguage();
  const page = content.pages.blog;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim();
    if (!EMAIL_REGEX.test(normalizedEmail)) {
      setStatus({ type: "error", text: page.invalidEmail });
      return;
    }

    try {
      setIsSubmitting(true);
      setStatus(null);
      await new Promise((resolve) => setTimeout(resolve, 600));
      setEmail("");
      setStatus({ type: "success", text: page.success });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="bg-[#007664] px-4 py-12 text-white sm:px-6 sm:py-14 lg:px-8"
      aria-labelledby="newsletter-signup-title"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/12 text-white ring-1 ring-white/20">
          <MailPlus className="h-6 w-6" aria-hidden="true" />
        </div>

        <h2
          id="newsletter-signup-title"
          className="mb-3 max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl"
        >
          {page.newsletterTitle}
        </h2>

        <p className="mb-7 max-w-2xl text-sm font-medium leading-relaxed text-white/88 sm:text-base">
          {page.newsletterDescription}
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-2xl flex-col gap-3 sm:flex-row"
          noValidate
        >
          <label htmlFor="newsletter-email" className="sr-only">
            {page.emailPlaceholder}
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (status) setStatus(null);
            }}
            placeholder={page.emailPlaceholder}
            autoComplete="email"
            aria-describedby={status ? "newsletter-status" : undefined}
            aria-invalid={status?.type === "error"}
            className="min-h-12 flex-1 rounded-none border border-white/25 bg-white px-4 text-sm font-medium text-brand-text shadow-sm outline-none transition focus:border-white focus:ring-2 focus:ring-white/60"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-none border border-white/20 bg-brand-primary px-6 text-sm font-bold text-brand-text shadow-sm transition hover:bg-[#58C250] focus:outline-none focus:ring-2 focus:ring-white/70 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            {isSubmitting ? page.subscribing : page.subscribe}
          </button>
        </form>

        <div
          id="newsletter-status"
          className="mt-3 min-h-6 text-sm font-medium"
          aria-live="polite"
        >
          {status && (
            <p
              className={
                status.type === "success" ? "text-white" : "text-red-100"
              }
              role={status.type === "error" ? "alert" : undefined}
            >
              {status.text}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
