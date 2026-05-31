"use client";

import { Facebook, Instagram, Youtube, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SITE_CONFIG } from "@/constants";
import { useLanguage } from "@/features/i18n";

export default function Footer() {
  const { content } = useLanguage();
  const { footer } = content;

  return (
    <footer className="bg-[#303136] text-brand-background text-sm">
      <div
        aria-hidden="true"
        className="h-5 w-full bg-[url('/raya.png')] bg-repeat-x bg-top bg-[length:auto_20px]"
      />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 px-5 py-9 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.25fr_0.85fr_0.95fr_0.9fr] lg:gap-12">
        {/* Branding */}
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="mb-4 flex items-center justify-center">
            <Image
              src="/images/logofoo.png"
              alt={footer.logoAlt}
              width={1486}
              height={515}
              className="h-auto w-40 brightness-110 contrast-125 saturate-125 drop-shadow-[0_2px_5px_rgba(255,255,255,0.24)] sm:w-48 md:w-52"
            />
          </Link>
          <p className="max-w-sm text-center text-sm font-medium leading-relaxed text-white/88 md:text-left">
            {footer.description}
          </p>
        </div>

        {/* Navigation */}
        <nav aria-label={content.navbar.mainNavLabel}>
          <h3 className="mb-4 text-base font-bold uppercase tracking-wide text-white">
            {footer.navigationTitle}
          </h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            {content.navigation.footerMain.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-2 py-0.5 font-medium text-white/82 transition-colors hover:text-brand-primary"
                >
                  <span className="text-base leading-none text-brand-primary">
                    ›
                  </span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Info */}
        <nav aria-label={footer.infoTitle}>
          <h3 className="mb-4 text-base font-bold uppercase tracking-wide text-white">
            {footer.infoTitle}
          </h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            {content.navigation.footerInfo.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="flex items-center gap-2 py-0.5 font-medium text-white/82 transition-colors hover:text-brand-primary"
                >
                  <span className="text-base leading-none text-brand-primary">
                    ›
                  </span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="mb-4 text-base font-bold uppercase tracking-wide text-white">
            {footer.followTitle}
          </h3>
          <div className="flex flex-row flex-wrap justify-center gap-3 md:justify-start">
            <a
              href={SITE_CONFIG.social.facebook}
              className="group rounded-md border border-white/20 bg-white/10 p-2.5 transition-colors duration-200 hover:border-brand-primary/80 hover:bg-brand-primary"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook
                size={19}
                className="text-white group-hover:text-brand-text transition-colors duration-200"
              />
            </a>
            <a
              href={SITE_CONFIG.social.instagram}
              className="group rounded-md border border-white/20 bg-white/10 p-2.5 transition-colors duration-200 hover:border-brand-primary/80 hover:bg-brand-primary"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram
                size={19}
                className="text-white group-hover:text-brand-text transition-colors duration-200"
              />
            </a>
            <a
              href={SITE_CONFIG.social.youtube}
              className="group rounded-md border border-white/20 bg-white/10 p-2.5 transition-colors duration-200 hover:border-brand-primary/80 hover:bg-brand-primary"
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube
                size={19}
                className="text-white group-hover:text-brand-text transition-colors duration-200"
              />
            </a>
            <a
              href={`mailto:${SITE_CONFIG.social.email}`}
              className="group rounded-md border border-white/20 bg-white/10 p-2.5 transition-colors duration-200 hover:border-brand-primary/80 hover:bg-brand-primary"
              aria-label="Email"
            >
              <Mail
                size={19}
                className="text-white group-hover:text-brand-text transition-colors duration-200"
              />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-5 flex flex-col items-center justify-between gap-1 border-t border-white/30 px-1 py-4 text-sm font-semibold text-white/82 sm:mx-6 sm:flex-row lg:mx-8">
        <span className="w-full text-center sm:text-left">
          © {new Date().getFullYear()} {SITE_CONFIG.name}. {footer.rights}
        </span>
        <span className="w-full text-center sm:w-auto sm:text-right mt-1 sm:mt-0 whitespace-nowrap">
          {footer.developedBy}{" "}
          <a
            href="https://www.instagram.com/ezerzuniga.oficial16/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-primary/80 relative transition-colors duration-200 hover:text-brand-primary/70 after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-brand-primary/80 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
          >
            Ezer Zuniga
          </a>
        </span>
      </div>
      <div
        aria-hidden="true"
        className="h-5 w-full bg-[url('/raya.png')] bg-repeat-x bg-bottom bg-[length:auto_20px]"
      />
    </footer>
  );
}
