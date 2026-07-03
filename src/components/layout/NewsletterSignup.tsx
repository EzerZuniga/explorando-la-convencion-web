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
      className="bg-brand-dark-green px-4 py-8 text-white sm:px-6 sm:py-10 lg:px-8"
      aria-labelledby="newsletter-signup-title"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/12 text-white ring-1 ring-white/20">
          <MailPlus className="h-5 w-5" aria-hidden="true" />
        </div>

        <h2
          id="newsletter-signup-title"
          className="mb-2 max-w-3xl font-heading text-[clamp(1.15rem,2.5vw,1.75rem)] font-bold leading-tight text-white"
        >
          {page.newsletterTitle}
        </h2>

        <p className="mb-4 max-w-xl text-sm font-medium leading-relaxed text-white/85">
          {page.newsletterDescription}
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-xl flex-col gap-3 sm:flex-row"
          noValidate
        >
          <div className="relative flex-1">
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
              className="w-full h-11 rounded-full border-2 border-white/20 bg-white/10 px-5 text-sm font-medium text-white placeholder:text-white/60 shadow-inner outline-none backdrop-blur-sm transition-all focus:border-white focus:bg-white/20 focus:ring-4 focus:ring-white/10"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="group relative inline-flex h-11 w-full sm:w-auto items-center justify-center overflow-hidden rounded-full border-2 border-white px-6 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all duration-500 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white/30 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square bg-white rounded-[50%] scale-0 group-hover:scale-100 transition-transform duration-1000 ease-[cubic-bezier(0.2,1,0.2,1)] origin-center transform-gpu"></span>
            <span className="relative z-10 flex items-center justify-center gap-3 transition-colors duration-500 group-hover:text-brand-primary">
              <Send className="h-4 w-4" aria-hidden="true" />
              {isSubmitting ? page.subscribing : page.subscribe}
            </span>
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
