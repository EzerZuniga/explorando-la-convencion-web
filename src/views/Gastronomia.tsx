"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  ChevronRight,
  Utensils,
  Coffee,
  MapPin,
  Star,
  Leaf,
  ArrowRight,
  ArrowDown,
} from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui";
import { useLanguage } from "@/features/i18n";

const GASTRO_STAT_DELAYS = [
  "[animation-delay:460ms]",
  "[animation-delay:550ms]",
  "[animation-delay:640ms]",
] as const;

const GASTRO_STATS = [
  { icon: Utensils, value: "6",  label: "Platos típicos"     },
  { icon: Coffee,   value: "2",  label: "Productos estrella" },
  { icon: Star,     value: "3",  label: "Restaurantes top"   },
] as const;

const Gastronomia: React.FC = () => {
  const { content } = useLanguage();
  const page = content.pages.gastronomy;

  return (
    <div className="wp-shell">

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section
        aria-label="Hero de gastronomía"
        className="relative isolate overflow-hidden min-h-[360px] sm:min-h-[420px] md:min-h-[500px] flex flex-col justify-end"
      >
        <Image
          src="/images/hero/hero5.png"
          alt="Gastronomía de La Convención"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover object-center motion-safe:animate-hero-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111B21]/92 via-[#111B21]/40 to-[#111B21]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111B21]/35 to-transparent" />

        {/* Breadcrumb */}
        <nav
          aria-label="Navegación de migas"
          className="absolute top-5 left-0 right-0 z-20 wp-container animate-slide-down [animation-fill-mode:both]"
        >
          <ol className="flex items-center gap-1.5 text-xs text-white/75 font-medium">
            <li>
              <Link
                href="/"
                className="flex items-center gap-1 hover:text-brand-primary transition-colors duration-200"
              >
                <Home size={12} strokeWidth={2} />
                <span>Inicio</span>
              </Link>
            </li>
            <li><ChevronRight size={12} className="text-white/40" /></li>
            <li className="text-white font-semibold">{page.title}</li>
          </ol>
        </nav>

        {/* Hero content */}
        <div className="relative z-10 wp-container pb-10 pt-24 md:pb-16">
          <div className="max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/45 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-brand-primary shadow-sm backdrop-blur-sm animate-fade-in-up [animation-fill-mode:both] [animation-delay:60ms]">
              <Utensils size={11} strokeWidth={2.5} />
              Cocina · Tradición · Sabor
            </span>
            <h1 className="mb-3 font-heading text-[clamp(1.9rem,4vw,3.1rem)] font-bold leading-tight text-white drop-shadow-lg animate-fade-in-up [animation-fill-mode:both] [animation-delay:200ms]">
              {page.heroTitle}
            </h1>
            <p className="text-[15px] sm:text-base leading-relaxed text-white/85 drop-shadow max-w-xl animate-fade-in-up [animation-fill-mode:both] [animation-delay:330ms]">
              {page.heroSubtitle}
            </p>
          </div>

          {/* Stats pills — each enters independently */}
          <div
            className="mt-8 flex flex-wrap gap-3"
            aria-label="Highlights de gastronomía"
          >
            {GASTRO_STATS.map(({ icon: Icon, value, label }, i) => (
              <div
                key={label}
                className={`flex items-center gap-2 rounded-full bg-black/45 backdrop-blur-sm border border-white/15 px-4 py-2 shadow-sm animate-reveal-up [animation-fill-mode:both] ${GASTRO_STAT_DELAYS[i] ?? GASTRO_STAT_DELAYS[0]}`}
              >
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-primary/20">
                  <Icon size={12} strokeWidth={2.2} className="text-brand-primary" />
                </div>
                <span className="text-sm font-bold text-white">{value}</span>
                <span className="text-xs text-white/65">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint — delayed entry + bounce */}
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 hidden sm:flex animate-fade-in-up [animation-fill-mode:both] [animation-delay:740ms]">
          <div className="animate-bounce">
            <ArrowDown size={18} strokeWidth={1.75} className="text-white/50" />
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 z-10 leading-none overflow-hidden">
          <svg
            viewBox="0 0 1440 44"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="block w-full h-11"
          >
            <path
              d="M0,22 C240,44 480,4 720,22 C960,40 1200,6 1440,22 L1440,44 L0,44 Z"
              fill="var(--color-background)"
            />
          </svg>
        </div>
      </section>

      {/* ── Introducción ───────────────────────────────────────────────── */}
      <section className="wp-section">
        <ScrollReveal className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-[clamp(1.5rem,3vw,2rem)] font-bold text-brand-text mb-3 leading-tight">
            {page.introTitle}
          </h2>
          <div className="w-14 h-[3px] bg-brand-primary rounded-full mx-auto mb-5" />
          {page.introParagraphs.map((paragraph, i) => (
            <p
              key={i}
              className={`text-base text-brand-text/80 leading-relaxed${i === 0 ? " mb-4" : ""}`}
            >
              {paragraph}
            </p>
          ))}
        </ScrollReveal>
      </section>

      {/* ── Pilares gastronómicos ──────────────────────────────────────── */}
      <section className="py-8 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="wp-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { icon: Coffee,   label: "Café de Altura",   desc: "Reconocido mundialmente" },
              { icon: Leaf,     label: "Cacao Chuncho",    desc: "Variedad nativa única" },
              { icon: Utensils, label: "Cocina Ancestral", desc: "Recetas de generaciones" },
              { icon: Star,     label: "Calidad Premium",  desc: "Specialty Coffee Assoc." },
            ].map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="flex items-center gap-3 p-4 rounded-2xl bg-brand-background border border-[var(--color-border)] shadow-sm"
              >
                <div className="flex-none w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                  <Icon size={18} strokeWidth={1.75} className="text-brand-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-brand-text leading-tight truncate">{label}</p>
                  <p className="text-xs text-brand-text/60 mt-0.5 leading-tight">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Platos Típicos ─────────────────────────────────────────────── */}
      <section className="wp-section bg-[var(--color-surface-muted)]">
        <div className="wp-container">
          <ScrollReveal className="text-center mb-10">
            <h2 className="font-heading text-[clamp(1.4rem,2.5vw,1.9rem)] font-bold text-brand-text mb-2 leading-tight">
              {page.dishesTitle}
            </h2>
            <p className="text-sm text-brand-text/65 max-w-xl mx-auto">
              {page.dishesSubtitle}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {page.dishes.map((dish, i) => (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.28, delay: Math.min(i * 0.08, 0.28) }}
                className="wp-card overflow-hidden flex flex-col"
              >
                <div className="relative h-44 overflow-hidden bg-brand-primary/10">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 bg-black/55 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white/90 rounded-full">
                    {dish.category}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-heading text-[1.05rem] font-bold text-brand-text mb-2 leading-snug">
                    {dish.name}
                  </h3>
                  <p className="text-sm text-brand-text/80 leading-relaxed">
                    {dish.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Café y Cacao ───────────────────────────────────────────────── */}
      <section className="wp-section">
        <div className="wp-container">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

              {/* Text side */}
              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-primary/10 mb-5">
                  <Coffee className="w-6 h-6 text-brand-primary" strokeWidth={1.75} />
                </div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-primary mb-2">
                  Producto Estrella
                </p>
                <h2 className="font-heading text-[clamp(1.4rem,2.5vw,1.9rem)] font-bold text-brand-text mb-3 leading-tight">
                  {page.coffeeTitle}
                </h2>
                <div className="w-12 h-[3px] bg-brand-primary rounded-full mb-5" />
                {page.coffeeParagraphs.map((paragraph, i) => (
                  <p
                    key={i}
                    className={`text-base text-brand-text/80 leading-relaxed${i < page.coffeeParagraphs.length - 1 ? " mb-4" : " mb-7"}`}
                  >
                    {paragraph}
                  </p>
                ))}
                <button
                  type="button"
                  className="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-brand-dark text-white text-sm font-semibold rounded-full overflow-hidden shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
                >
                  <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square bg-brand-primary rounded-[50%] scale-0 group-hover:scale-100 transition-transform duration-700 ease-[cubic-bezier(0.2,1,0.2,1)] origin-center" />
                  <Leaf size={14} strokeWidth={2} className="relative z-10 group-hover:text-brand-dark transition-colors duration-500" />
                  <span className="relative z-10 group-hover:text-brand-dark transition-colors duration-500">
                    {page.coffeeAction}
                  </span>
                </button>
              </div>

              {/* Images side */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative h-44 rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06),0_6px_20px_rgba(0,0,0,0.09)]">
                  <Image src="/images/gallery/comida-asiatica.jpg" alt="Café de La Convención" fill sizes="(min-width: 1024px) 20vw, 40vw" className="object-cover" />
                </div>
                <div className="relative h-44 rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06),0_6px_20px_rgba(0,0,0,0.09)]">
                  <Image src="/images/destinations/pueblo-magico.jpg" alt="Cacao Chuncho" fill sizes="(min-width: 1024px) 20vw, 40vw" className="object-cover" />
                </div>
                <div className="relative col-span-2 h-44 rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06),0_6px_20px_rgba(0,0,0,0.09)]">
                  <Image src="/images/gallery/fotografia.jpg" alt="Plantaciones de la región" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Restaurantes Recomendados ───────────────────────────────────── */}
      <section className="wp-section bg-[var(--color-surface-muted)]">
        <div className="wp-container">
          <ScrollReveal className="text-center mb-10">
            <h2 className="font-heading text-[clamp(1.4rem,2.5vw,1.9rem)] font-bold text-brand-text mb-2 leading-tight">
              {page.restaurantsTitle}
            </h2>
            <p className="text-sm text-brand-text/65 max-w-xl mx-auto">
              {page.restaurantsSubtitle}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {page.restaurants.map((restaurant, i) => (
              <motion.article
                key={restaurant.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.28, delay: i * 0.09 }}
                className="wp-card overflow-hidden flex flex-col"
                aria-label={restaurant.name}
              >
                <div className="relative h-44 overflow-hidden bg-brand-primary/10">
                  <Image
                    src={restaurant.image}
                    alt={restaurant.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/55 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    <Star size={11} strokeWidth={0} className="fill-brand-primary text-brand-primary" />
                    <span className="text-[11px] font-bold text-white">{restaurant.rating}</span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1 gap-2">
                  <h3 className="font-heading text-[1rem] font-bold text-brand-text leading-snug">
                    {restaurant.name}
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary/80">
                    {restaurant.specialty}
                  </span>
                  <p className="text-sm text-brand-text/80 leading-relaxed flex-grow">
                    {restaurant.description}
                  </p>
                  <div className="flex items-center gap-1.5 text-brand-text/50 pt-2 border-t border-[var(--color-border-muted)]">
                    <MapPin size={12} strokeWidth={2} />
                    <span className="text-xs">{restaurant.location}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="wp-section">
        <div className="wp-container">
          <ScrollReveal>
            <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.09)] overflow-hidden">
              <div className="h-1 bg-brand-primary" />
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-7 md:p-9">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-primary mb-1">
                    Experiencia Gastronómica
                  </p>
                  <h3 className="font-heading text-[1.1rem] font-bold text-brand-text mb-1.5">
                    {page.ctaTitle}
                  </h3>
                  <p className="text-sm text-brand-text/75 leading-relaxed max-w-sm">
                    {page.ctaDescription}
                  </p>
                </div>
                <button
                  type="button"
                  className="flex-shrink-0 group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-brand-dark text-white text-sm font-semibold rounded-full overflow-hidden shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
                >
                  <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square bg-brand-primary rounded-[50%] scale-0 group-hover:scale-100 transition-transform duration-700 ease-[cubic-bezier(0.2,1,0.2,1)] origin-center" />
                  <ArrowRight size={15} strokeWidth={2} className="relative z-10 group-hover:text-brand-dark transition-colors duration-500" />
                  <span className="relative z-10 group-hover:text-brand-dark transition-colors duration-500">
                    {page.ctaAction}
                  </span>
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
};

export default Gastronomia;
