"use client";

import React from "react";
import Image from "next/image";
import {
  ArrowRight,
  Heart,
  Leaf,
  Lightbulb,
  Mail,
  MapPin,
  Star,
  Target,
  Users,
} from "lucide-react";
import Link from "next/link";
import SEOHead from "@/features/seo";
import { SITE_CONFIG } from "@/constants";
import { useLanguage } from "@/features/i18n";
import { useCounterAnimation } from "@/hooks";

const ICON_MAP: Record<string, React.ElementType> = {
  MapPin,
  Users,
  Heart,
  Target,
  Leaf,
  Star,
  Lightbulb,
};

const STAT_REVEAL_DELAYS = [
  "[animation-delay:0ms]",
  "[animation-delay:80ms]",
  "[animation-delay:160ms]",
  "[animation-delay:240ms]",
];

const MISSION_REVEAL_DELAYS = [
  "[animation-delay:0ms]",
  "[animation-delay:100ms]",
];

const VALUE_REVEAL_DELAYS = [
  "[animation-delay:0ms]",
  "[animation-delay:60ms]",
  "[animation-delay:120ms]",
  "[animation-delay:180ms]",
  "[animation-delay:240ms]",
  "[animation-delay:300ms]",
];

const TEAM_REVEAL_DELAYS = [
  "[animation-delay:0ms]",
  "[animation-delay:90ms]",
  "[animation-delay:180ms]",
  "[animation-delay:270ms]",
  "[animation-delay:360ms]",
  "[animation-delay:450ms]",
];

const getRevealDelayClass = (classes: string[], index: number) =>
  classes[index] ?? classes[0];

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  align = "center",
}) => {
  const alignment =
    align === "left" ? "text-left items-start" : "text-center items-center";

  return (
    <div className={`mb-10 flex flex-col ${alignment} animate-reveal-up`}>
      {eyebrow && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-brand-primary">
          {eyebrow}
        </p>
      )}
      <h2 className="mb-0 max-w-3xl font-heading text-3xl font-bold leading-tight text-brand-text  sm:text-4xl">
        {title}
      </h2>
      <div className="mt-5 h-1 w-20 rounded bg-gradient-to-r from-brand-text via-brand-primary to-brand-secondary" />
      {subtitle && (
        <p className="mt-5 max-w-2xl text-base leading-8 text-brand-text/75 ">
          {subtitle}
        </p>
      )}
    </div>
  );
};

const About: React.FC = () => {
  const { content } = useLanguage();
  const page = content.pages.about;
  const c0 = useCounterAnimation(page.stats[0].value, 1500);
  const c1 = useCounterAnimation(page.stats[1].value, 2000);
  const c2 = useCounterAnimation(page.stats[2].value, 2500);
  const c3 = useCounterAnimation(page.stats[3].value, 1200);
  const counters = [c0, c1, c2, c3];

  return (
    <div className="min-h-screen bg-brand-background text-brand-text  ">
      <SEOHead
        title={page.seoTitle}
        description={page.seoDescription}
        keywords={page.seoKeywords}
        url={`${SITE_CONFIG.url}/about`}
      />

      <section className="relative isolate overflow-hidden bg-brand-text text-white">
        <Image
          src="/images/fondohero.jpg"
          alt="Mural turístico de La Convención"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1813]/92 via-brand-text/76 to-[#1B4332]/38" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(11,24,19,0.72),rgba(11,24,19,0.08)_48%,rgba(11,24,19,0.2))]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-brand-text/95 to-transparent" />

        <div className="relative mx-auto flex min-h-[36rem] max-w-7xl items-end px-4 pb-12 pt-32 sm:px-6 lg:px-8 lg:pb-16">
          <div className="max-w-3xl animate-fade-in-up [animation-fill-mode:both]">
            <p className="mb-5 inline-flex items-center border border-white/16 border-l-4 border-l-brand-secondary bg-white/12 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-white shadow-[0_16px_34px_rgba(0,0,0,0.18)] backdrop-blur-md">
              {page.heroEyebrow}
            </p>
            <h1 className="mb-5 max-w-4xl font-heading text-4xl font-bold leading-[1.02] text-white drop-shadow-[0_14px_34px_rgba(0,0,0,0.28)] sm:text-6xl lg:text-7xl">
              {page.heroTitle}
            </h1>
            <p className="max-w-2xl text-base font-medium leading-8 text-white/92 drop-shadow-[0_8px_20px_rgba(0,0,0,0.24)] sm:text-xl">
              {page.heroDescription}
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-brand-text text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-white/12 px-0 sm:grid-cols-4">
          {page.stats.map((stat, i) => (
            <div
              key={stat.label}
              ref={counters[i].counterRef}
              className={`animate-reveal-up bg-brand-text px-4 py-7 text-center transition-colors duration-300 [animation-fill-mode:both] hover:bg-[#204F3D] sm:px-5 sm:py-8 ${getRevealDelayClass(STAT_REVEAL_DELAYS, i)}`}
            >
              <div className="font-heading text-4xl font-bold leading-none text-white drop-shadow-[0_12px_26px_rgba(0,0,0,0.22)] sm:text-5xl">
                {counters[i].count}
                <span className="text-brand-secondary">{stat.suffix}</span>
              </div>
              <p className="mx-auto mt-3 max-w-40 text-sm font-medium leading-5 text-white/84">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="proposito" className="scroll-mt-24 bg-white py-16  sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader title={page.missionVisionTitle} />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              {
                icon: Target,
                title: page.missionTitle,
                description: page.missionDescription,
              },
              {
                icon: Heart,
                title: page.visionTitle,
                description: page.visionDescription,
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className={`group animate-reveal-up border border-brand-text/12 bg-brand-background/45 p-6 shadow-sm transition duration-300 [animation-fill-mode:both] hover:-translate-y-1 hover:border-brand-primary/45 hover:bg-white hover:shadow-xl    sm:p-8 ${getRevealDelayClass(MISSION_REVEAL_DELAYS, index)}`}
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center border border-brand-text/15 bg-white text-brand-text transition duration-300 group-hover:border-brand-primary group-hover:text-brand-primary   ">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <h3 className="mb-3 font-heading text-2xl font-bold text-brand-text ">
                    {item.title}
                  </h3>
                  <p className="text-base leading-8 text-brand-text/76 ">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="historia"
        className="scroll-mt-24 border-y border-brand-text/10 bg-brand-background py-16   sm:py-20"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
          <SectionHeader title={page.historyTitle} align="left" />
          <article className="animate-reveal-up border-l-4 border-brand-primary bg-white p-6 shadow-lg shadow-brand-text/8  sm:p-9">
            <div className="space-y-6 text-base leading-8 text-brand-text/78  sm:text-lg">
              {page.historyParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section id="valores" className="scroll-mt-24 bg-white py-16  sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={page.valuesTitle}
            subtitle={page.valuesSubtitle}
          />
          <div className="grid grid-cols-1 gap-px overflow-hidden border border-brand-text/10 bg-brand-text/10   sm:grid-cols-2 lg:grid-cols-3">
            {page.values.map((value, index) => {
              const IconComponent = ICON_MAP[value.icon];
              return (
                <article
                  key={value.title}
                  className={`group animate-reveal-up bg-white p-6 transition duration-300 [animation-fill-mode:both] hover:bg-brand-background   sm:p-7 ${getRevealDelayClass(VALUE_REVEAL_DELAYS, index)}`}
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center border border-brand-text/15 bg-brand-background text-brand-text transition duration-300 group-hover:border-brand-primary group-hover:bg-white group-hover:text-brand-primary   ">
                    {IconComponent && (
                      <IconComponent className="h-5 w-5" strokeWidth={2} />
                    )}
                  </div>
                  <h3 className="mb-2 font-heading text-xl font-bold text-brand-text ">
                    {value.title}
                  </h3>
                  <p className="text-sm leading-7 text-brand-text/72 ">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="equipo"
        className="scroll-mt-24 bg-gradient-to-b from-brand-background via-white to-[#FFF3E3] py-16    sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader title={page.teamTitle} subtitle={page.teamSubtitle} />

          <div className="relative mx-auto max-w-6xl">
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-brand-text/16 to-transparent lg:block" />

            <div className="space-y-10 sm:space-y-12">
              {page.teamMembers.map((member, index) => {
                const isReversed = index % 2 === 1;

                return (
                  <article
                    key={member.name}
                    className={`group relative animate-reveal-up [animation-fill-mode:both] ${getRevealDelayClass(TEAM_REVEAL_DELAYS, index)}`}
                  >
                    <div
                      className={`relative grid items-center gap-6 overflow-hidden border border-brand-text/30 bg-white p-5 shadow-[0_-28px_68px_-34px_rgba(27,67,50,0.5),0_34px_82px_-32px_rgba(27,67,50,0.62),0_10px_28px_-18px_rgba(15,29,24,0.35)] backdrop-blur-sm  sm:p-7 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-10 lg:p-8 ${
                        isReversed ? "lg:grid-cols-[minmax(0,1fr)_17rem]" : ""
                      }`}
                    >
                      <div
                        className="absolute inset-x-0 top-0 h-1 bg-brand-text"
                        aria-hidden="true"
                      />
                      <div
                        className={`${isReversed ? "lg:order-2" : ""} flex justify-center lg:justify-start`}
                      >
                        <div className="relative h-56 w-56 shrink-0 sm:h-64 sm:w-64 lg:h-60 lg:w-60">
                          <div
                            className="absolute inset-0 rounded-full bg-brand-text opacity-30 blur-2xl"
                            aria-hidden="true"
                          />
                          <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-brand-text bg-brand-background p-1 shadow-[0_-16px_38px_-24px_rgba(27,67,50,0.55),0_24px_46px_-24px_rgba(27,67,50,0.65)]">
                            <Image
                              src={member.image}
                              alt={`Foto de ${member.name}`}
                              fill
                              sizes="(min-width: 1024px) 18rem, 14rem"
                              className="h-full w-full rounded-full object-cover"
                            />
                          </div>
                          <span
                            className="absolute bottom-4 right-2 flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-brand-text text-sm font-bold text-white shadow-2xl "
                            aria-hidden="true"
                          >
                            {member.initials}
                          </span>
                        </div>
                      </div>

                      <div
                        className={`${isReversed ? "lg:order-1 lg:text-right" : ""}`}
                      >
                        <div
                          className={`mb-5 flex flex-col ${isReversed ? "lg:items-end" : ""}`}
                        >
                          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-primary">
                            Equipo local
                          </p>
                          <h3 className="mb-2 max-w-2xl font-heading text-2xl font-bold leading-tight text-brand-text  sm:text-3xl">
                            {member.name}
                          </h3>
                          <p className="text-sm font-bold uppercase tracking-[0.08em] text-brand-text/80 ">
                            {member.role}
                          </p>
                        </div>

                        <p className="max-w-3xl text-[0.96rem] leading-8 text-brand-text/84  sm:text-base">
                          {member.description}
                        </p>

                        <div
                          className={`mt-6 flex flex-wrap gap-2 ${isReversed ? "lg:justify-end" : ""}`}
                        >
                          {member.skills.map((skill) => (
                            <span
                              key={skill}
                              className="border border-brand-text/35 bg-brand-text/10 px-3 py-1.5 text-xs font-semibold text-brand-text"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-12 border-l-4 border-brand-primary bg-white/80 p-5 shadow-sm  sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-primary">
                    Trabajo colaborativo
                  </p>
                  <p className="mt-2 max-w-3xl text-sm leading-7 text-brand-text/74 ">
                    Cada perfil aporta una mirada distinta: tecnología,
                    contenido, fotografía, guía local y difusión digital al
                    servicio de La Convención.
                  </p>
                </div>
                <Users
                  className="h-10 w-10 shrink-0 text-brand-text/40 "
                  strokeWidth={1.8}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-text py-16 text-white sm:py-20">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary" />
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="animate-reveal-up">
            <h2 className="mb-4 font-heading text-3xl font-bold text-white sm:text-4xl">
              {page.ctaTitle}
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-base leading-8 text-white/86 sm:text-lg">
              {page.ctaDescription}
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 bg-white px-7 py-4 text-sm font-bold text-brand-text shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:bg-brand-secondary/95 hover:text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2 focus:ring-offset-brand-text"
            >
              <Mail className="h-5 w-5" />
              {page.ctaAction}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 motion-safe:group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
