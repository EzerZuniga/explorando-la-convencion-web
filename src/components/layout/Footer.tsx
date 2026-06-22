"use client";

import { Facebook, Instagram, Youtube, Twitter, Github } from "lucide-react";
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
        className="h-5 w-full bg-[url('/images/ui/divider.png')] bg-repeat-x bg-top bg-[length:auto_20px]"
      />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 px-5 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.25fr] lg:gap-12">
        {/* Branding */}
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="mb-4 flex items-center justify-center">
            <Image
              src="/images/brand/logo-footer.png"
              alt={footer.logoAlt}
              width={1486}
              height={515}
              className="h-auto w-40 brightness-110 contrast-125 saturate-125 drop-shadow-[0_2px_5px_rgba(255,255,255,0.24)] sm:w-48 md:w-52"
            />
          </Link>
          <p className="max-w-[22rem] text-center text-sm sm:text-[15px] leading-relaxed text-white/75 md:text-left">
            {footer.description}
          </p>
        </div>

        {/* Navigation */}
        <nav aria-label={content.navbar.mainNavLabel}>
          <h3 className="mb-4 text-[15px] sm:text-base font-bold uppercase tracking-wide text-white">
            {footer.navigationTitle}
          </h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            {content.navigation.footerMain.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex items-center gap-3 py-1 font-medium text-sm sm:text-[15px] text-white/80 transition-colors hover:text-brand-primary"
                >
                  <span className="text-brand-primary transition-transform duration-300 group-hover:translate-x-1">
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
          <h3 className="mb-4 text-[15px] sm:text-base font-bold uppercase tracking-wide text-white">
            {footer.infoTitle}
          </h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            {content.navigation.footerInfo.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="group flex items-center gap-3 py-1 font-medium text-sm sm:text-[15px] text-white/80 transition-colors hover:text-brand-primary"
                >
                  <span className="text-brand-primary transition-transform duration-300 group-hover:translate-x-1">
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
          <h3 className="mb-4 text-[15px] sm:text-base font-bold uppercase tracking-wide text-white">
            {footer.followTitle}
          </h3>
          <div className="flex flex-row flex-wrap justify-center gap-4 sm:gap-4 md:justify-start">
            {[
              {
                icon: (props: { size?: number }) => (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={props.size || 24}
                    height={props.size || 24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    {...props}
                  >
                    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                  </svg>
                ),
                href: SITE_CONFIG.social.twitter,
                label: "X (Twitter)",
              },
              { icon: Youtube, href: SITE_CONFIG.social.youtube, label: "YouTube" },
              { icon: Instagram, href: SITE_CONFIG.social.instagram, label: "Instagram" },
              { icon: Facebook, href: SITE_CONFIG.social.facebook, label: "Facebook" },
              { icon: Github, href: SITE_CONFIG.social.github, label: "Github" },
            ].map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  className="group relative flex h-[3.25rem] w-[3.25rem] items-center justify-center overflow-hidden rounded-full border border-white/80 bg-transparent transition-all duration-500 hover:border-brand-primary hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 aspect-square w-[250%] origin-center scale-0 rounded-[50%] bg-brand-primary transition-transform duration-700 ease-[cubic-bezier(0.2,1,0.2,1)] group-hover:scale-100 transform-gpu" />
                  <Icon
                    size={20}
                    className="relative z-10 text-white transition-all duration-500 group-hover:scale-110 group-hover:text-white"
                  />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-5 flex flex-col items-center justify-between gap-1 border-t border-white/30 px-1 py-4 text-[13px] sm:text-sm font-semibold text-white/82 sm:mx-6 sm:flex-row lg:mx-8">
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
        className="h-5 w-full bg-[url('/images/ui/divider.png')] bg-repeat-x bg-bottom bg-[length:auto_20px]"
      />
    </footer>
  );
}
