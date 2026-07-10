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
import { useLanguage } from "@/features/i18n";
import { useCounterAnimation } from "@/hooks";
import { ScrollReveal } from "@/components/ui";

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
      <h2 className="mb-0 max-w-3xl font-heading text-[clamp(1.75rem,3vw,2.25rem)] font-bold leading-tight text-brand-text">
        {title}
      </h2>
      <div className="mt-5 h-[2px] w-20 rounded bg-brand-primary" />
      {subtitle && (
        <p className="mt-5 max-w-2xl text-[18px] leading-8 text-brand-text/75 ">
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

      {/* Hero Section */}
      <section className="relative isolate flex min-h-[85vh] flex-col justify-end overflow-hidden bg-brand-text text-white">
        <Image
          src="/images/hero/hero-main.jpg"
          alt="Mural turístico de La Convención"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Soft, lighter overlays to make the image clearly visible */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111B21]/90 via-[#111B21]/20 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-32 pt-32 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl animate-fade-in-up [animation-fill-mode:both]">
            <span className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-black/40 px-5 py-2 text-xs font-bold uppercase tracking-widest text-brand-secondary shadow-sm backdrop-blur-md">
              {page.heroEyebrow}
            </span>
            <h1 className="mb-6 font-heading text-[clamp(2rem,4vw,3.25rem)] font-bold leading-tight text-white drop-shadow-lg">
              {page.heroTitle}
            </h1>
            <p className="mx-auto max-w-3xl text-[18px] font-medium leading-relaxed text-white/95 drop-shadow">
              {page.heroDescription}
            </p>
          </div>
        </div>

        {/* Decorative Wave Divider */}
        <div className="pointer-events-none absolute bottom-0 left-0 z-10 w-full translate-y-[1px] overflow-hidden leading-none">
          <svg
            className="relative block h-[20px] w-full sm:h-[35px] lg:h-[50px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,120 C400,0 800,0 1200,120 Z"
              className="fill-white"
            />
          </svg>
        </div>
      </section>

      {/* Wrapper to extend white background behind stats to connect with the curve */}
      <div className="bg-white">

      {/* Floating Stats Section */}
      <section className="relative z-20 -mt-20 sm:-mt-24 lg:-mt-28">
        <ScrollReveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 lg:gap-8">
            {page.stats.map((stat, i) => (
              <div
                key={stat.label}
                ref={counters[i].counterRef}
                className={`group flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#111B21]/95 p-6 text-center shadow-xl backdrop-blur-lg transition-transform duration-300 hover:-translate-y-1 hover:border-brand-secondary/30 hover:bg-[#1a2535]/95 animate-reveal-up [animation-fill-mode:both] ${getRevealDelayClass(STAT_REVEAL_DELAYS, i)}`}
              >
                <div className="relative mb-2 flex items-baseline gap-1 font-heading text-[clamp(2.5rem,5vw,3.5rem)] font-bold text-white">
                  <span>{counters[i].count}</span>
                  <span className="text-[clamp(1.5rem,3vw,2rem)] text-brand-secondary">{stat.suffix}</span>
                </div>
                <p className="mt-2 text-[clamp(0.65rem,1vw,0.75rem)] font-bold tracking-widest text-white/70 uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <section id="proposito" className="scroll-mt-24 pb-20 pt-12 sm:pb-28 sm:pt-16">
        <ScrollReveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12">
            <SectionHeader title={page.missionVisionTitle} />
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
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
                  className={`group relative flex flex-col justify-start overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-brand-primary/20 hover:shadow-[0_12px_30px_rgba(0,0,0,0.1)] sm:p-12 animate-reveal-up [animation-fill-mode:both] ${getRevealDelayClass(MISSION_REVEAL_DELAYS, index)}`}
                >
                  {/* Primary color accent on hover */}
                  <div className="absolute inset-x-0 top-0 h-1 w-full bg-brand-primary opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  
                  <div className="relative z-10">
                    <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary transition-colors duration-500 group-hover:bg-brand-primary group-hover:text-white">
                      <Icon className="h-8 w-8" strokeWidth={1.5} />
                    </div>
                    <h3 className="mb-4 font-heading text-[clamp(1.25rem,2vw,1.5rem)] font-bold tracking-tight text-brand-text">
                      {item.title}
                    </h3>
                    <p className="text-[18px] leading-relaxed text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </ScrollReveal>
      </section>
      </div>

      <section
        id="historia"
        className="scroll-mt-24 relative bg-brand-dark-green pb-32 pt-28 sm:pb-48 sm:pt-40"
      >
        {/* Top Decorative Cloud/Wave Transition */}
        <div className="pointer-events-none absolute top-0 left-0 z-0 w-full -translate-y-[1px] overflow-hidden leading-none">
          <svg
            className="relative block h-[70px] w-full sm:h-[120px] lg:h-[160px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              className="fill-white opacity-20"
            />
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              className="fill-white"
            />
          </svg>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Intro */}
            <div className="text-white animate-reveal-up">
              <h2 className="mb-6 font-heading text-[clamp(1.75rem,3vw,2.5rem)] font-bold tracking-tight text-white">
                {page.historyTitle}
              </h2>
              <div className="mb-8 text-[18px] leading-relaxed text-white/90">
                <p>{page.historyParagraphs[0]}</p>
              </div>
              <Link
                href="/contacto"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border-2 border-white px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-md transition-shadow duration-500 hover:shadow-lg"
              >
                <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square bg-white rounded-[50%] scale-0 group-hover:scale-100 transition-transform duration-1000 ease-ripple origin-center transform-gpu"></span>
                <span className="relative z-10 transition-colors duration-500 group-hover:text-brand-primary">
                  CONTÁCTENOS
                </span>
              </Link>
            </div>

            {/* Right Column: Dark Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {page.historyParagraphs.slice(1).map((paragraph, index) => {
                const Icon = index === 0 ? Target : Users;
                return (
                  <article 
                    key={index} 
                    className={`group relative overflow-hidden rounded-2xl bg-[#111B21] p-8 shadow-2xl border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:border-brand-primary/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] animate-reveal-up [animation-fill-mode:both]`}
                    style={{ animationDelay: `${(index + 1) * 150}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-brand-secondary transition-all duration-500 group-hover:bg-brand-primary group-hover:text-white group-hover:scale-110">
                        <Icon className="h-6 w-6" strokeWidth={1.5} />
                      </div>
                      <p className="text-[18px] leading-relaxed text-slate-300 group-hover:text-white transition-colors duration-300">
                        {paragraph}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Decorative Cloud/Wave Transition */}
        <div className="pointer-events-none absolute bottom-0 left-0 z-0 w-full translate-y-[1px] rotate-180 overflow-hidden leading-none">
          <svg
            className="relative block h-[70px] w-full sm:h-[120px] lg:h-[160px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              className="fill-white opacity-20"
            />
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              className="fill-white"
            />
          </svg>
        </div>
      </section>

      <section id="valores" className="scroll-mt-24 bg-white py-16  sm:py-20">
        <ScrollReveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={page.valuesTitle}
            subtitle={page.valuesSubtitle}
          />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {page.values.map((value, index) => {
              const IconComponent = ICON_MAP[value.icon];
              return (
                <article
                  key={value.title}
                  className={`group relative overflow-hidden rounded-2xl bg-white p-8 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-700 ease-out hover:-translate-y-1 hover:border-slate-200 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] sm:p-10 animate-reveal-up [animation-fill-mode:both] ${getRevealDelayClass(VALUE_REVEAL_DELAYS, index)}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100" />
                  
                  <div className="relative z-10">
                    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-slate-50 text-brand-primary transition-all duration-700 ease-out group-hover:bg-brand-primary group-hover:text-white group-hover:shadow-[0_8px_16px_rgba(34,197,94,0.2)]">
                      {IconComponent && (
                        <IconComponent className="h-6 w-6 transition-transform duration-700 ease-out group-hover:scale-110" strokeWidth={1.5} />
                      )}
                    </div>
                    <h3 className="mb-4 font-heading text-lg sm:text-xl font-bold text-slate-900 transition-colors duration-500 group-hover:text-brand-primary">
                      {value.title}
                    </h3>
                    <p className="text-[18px] leading-relaxed text-slate-600 font-medium">
                      {value.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </ScrollReveal>
      </section>

      <section
        id="equipo"
        className="scroll-mt-24 relative overflow-hidden bg-[#FAFAFA] py-20 sm:py-32"
      >
        {/* Abstract Background Blobs */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden opacity-60">
           <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-brand-primary/5 blur-3xl mix-blend-multiply" />
           <div className="absolute right-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/3 rounded-full bg-brand-secondary/5 blur-3xl mix-blend-multiply" />
           <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] translate-y-1/3 rounded-full bg-brand-primary/5 blur-3xl mix-blend-multiply" />
        </div>

        <ScrollReveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader title={page.teamTitle} subtitle={page.teamSubtitle} align="center" />

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-24 lg:gap-x-12 mt-24">
            {page.teamMembers.map((member, index) => {
              const isFirst = member.name.includes("Ezer");
              // Split description to use the first sentence as a quote
              const parts = member.description.split('. ');
              const quote = parts[0] + (parts.length > 1 ? '.' : '');
              const rest = parts.slice(1).join('. ');

              return (
                <div 
                  key={`team-card-${member.name}-${index}`} 
                  className={`w-full px-4 sm:px-8 animate-reveal-up [animation-fill-mode:both] ${getRevealDelayClass(TEAM_REVEAL_DELAYS, index)} ${isFirst ? 'w-full lg:w-full order-first' : 'lg:w-[calc(50%-1.5rem)] max-w-[36rem]'}`}
                >
                  <article className={`relative w-full max-w-[36rem] min-h-[28rem] h-full bg-white rounded-[2.5rem] px-8 pb-8 pt-28 sm:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.08)] ${isFirst ? 'mx-auto' : ''}`}>
                    
                    {/* Floating Profile Image - Left Aligned on Desktop, Centered on Mobile */}
                    <div className="absolute -top-14 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:-left-14 sm:-top-14 w-40 h-40 sm:w-48 sm:h-48 z-20">
                      <div className="absolute inset-0 scale-110 rounded-full bg-slate-200 opacity-20 blur-xl" />
                      <div className="relative h-full w-full overflow-hidden rounded-full border-[6px] sm:border-[8px] border-white shadow-xl">
                        <Image
                          src={member.image}
                          alt={`Foto de ${member.name}`}
                          fill
                          sizes="(min-width: 1024px) 12rem, 10rem"
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Header Info - Pushed right to clear image on Desktop */}
                    <div className="relative z-20 text-center sm:text-left mt-4 sm:mt-0 sm:pl-[9rem]">
                      <h3 className="font-heading text-[1.15rem] sm:text-[1.35rem] font-bold text-brand-primary leading-tight max-w-[14rem] mx-auto sm:mx-0">
                        {member.name}
                      </h3>
                      <p className="text-sm font-bold text-slate-800 mt-1">
                        {member.role}
                      </p>
                    </div>

                    {/* Quote & Body - Full width inside card */}
                    <div className="relative z-10 mt-10 sm:mt-16 text-center sm:text-left w-full !pl-0 !ml-0 clear-both block">
                      <span className="absolute left-1/2 -translate-x-1/2 sm:translate-x-0 sm:-left-5 -top-5 font-serif text-6xl sm:text-7xl text-brand-secondary opacity-20 select-none -z-10">&ldquo;</span>
                      
                      <p className="relative z-10 text-brand-secondary font-bold text-[18px] leading-relaxed text-center sm:text-left w-full">
                        {quote.replace(/^"|"$|^“|”$/g, '')}
                      </p>
                      
                      {rest && (
                        <p className="mt-4 text-[18px] leading-relaxed text-slate-500 text-center sm:text-left">
                          {rest}
                        </p>
                      )}

                      {/* Skills */}
                      <div className="mt-6 flex flex-wrap justify-center sm:justify-start gap-2">
                        {member.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-lg bg-slate-50 border border-slate-100 px-3 py-1.5 text-[11px] font-semibold text-slate-500"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </section>

      {/* Unified Curved Section: Trabajo Colaborativo & CTA */}
      <section className="relative bg-brand-text pt-32 pb-24 text-white sm:pt-40 sm:pb-32 mt-12 sm:mt-24">
        
        {/* Top Wave Divider */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-[calc(100%+1.3px)] h-[60px] sm:h-[120px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
          </svg>
        </div>

        {/* Bottom Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180 translate-y-[1px]">
          <svg className="relative block w-[calc(100%+1.3px)] h-[40px] sm:h-[80px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-[#111B21]"></path>
          </svg>
        </div>

        <ScrollReveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left Content: Trabajo Colaborativo */}
            <div className="animate-reveal-up">
              <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-2.5 mb-8 backdrop-blur-md border border-white/20">
                <Users className="h-5 w-5 text-brand-secondary" />
                <span className="text-xs font-bold uppercase tracking-widest text-white">
                  Trabajo Colaborativo
                </span>
              </div>
              <h2 className="font-heading text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-white leading-tight mb-6">
                Una mirada distinta al servicio de <span className="text-brand-secondary">La Convención</span>
              </h2>
              <p className="text-[18px] text-white/80 leading-relaxed max-w-xl">
                Cada perfil aporta su talento: tecnología, contenido, fotografía, guía local y difusión digital, unidos para mostrar lo mejor de nuestra región al mundo.
              </p>
            </div>

            {/* Right Content: CTA Join the Team */}
            <div className="animate-reveal-up [animation-delay:200ms]">
              <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-brand-primary/10 blur-3xl" />
                
                <h3 className="relative z-10 font-heading text-[clamp(1.5rem,2vw,2rem)] font-bold text-brand-primary mb-4">
                  {page.ctaTitle}
                </h3>
                <p className="relative z-10 text-slate-600 leading-relaxed mb-8 text-[18px]">
                  {page.ctaDescription}
                </p>
                <Link
                  href="/contact"
                  className="group relative inline-flex w-full sm:w-auto items-center justify-center overflow-hidden rounded-full border-2 border-brand-secondary px-8 py-4 text-sm font-bold uppercase tracking-wider text-brand-secondary shadow-md transition-shadow duration-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2"
                >
                  <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square bg-brand-secondary rounded-[50%] scale-0 group-hover:scale-100 transition-transform duration-1000 ease-ripple origin-center transform-gpu"></span>
                  <span className="relative z-10 flex items-center justify-center gap-3 transition-colors duration-500 group-hover:text-white">
                    <Mail className="h-5 w-5" />
                    {page.ctaAction}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </div>
            </div>

          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default About;
