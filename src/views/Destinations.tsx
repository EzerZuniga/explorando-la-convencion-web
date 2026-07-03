"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  ChevronRight,
  MapPin,
  Compass,
  Calendar,
  ArrowDown,
  Star,
  Search,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui";
import { useLanguage } from "@/features/i18n";
import { motion } from "framer-motion";
import type { Post } from "@/types";

const STAT_DELAYS = [
  "[animation-delay:460ms]",
  "[animation-delay:550ms]",
  "[animation-delay:640ms]",
] as const;

const HERO_STATS = [
  { icon: MapPin, value: "50+", labelKey: "Atractivos" },
  { icon: Compass, value: "30+", labelKey: "Distritos" },
  { icon: Calendar, value: "365", labelKey: "Días ideales" },
] as const;

// ── Portal-style destination card (no blog metadata) ─────────────────
function DestinationCard({ post }: { post: Post }) {
  const { content } = useLanguage();
  return (
    <article
      className="wp-card h-full flex flex-col overflow-hidden"
      aria-label={post.title}
    >
      {/* Image with gradient overlay + category badge */}
      <Link
        href={`/post/${post.id}`}
        tabIndex={-1}
        aria-hidden="true"
        className="relative h-48 overflow-hidden block bg-brand-primary/10"
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <span className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white/90 rounded-full">
          {post.category}
        </span>
      </Link>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col gap-3">
        <Link href={`/post/${post.id}`} className="group/title">
          <h3 className="font-heading text-[1.05rem] font-bold text-brand-text line-clamp-2 leading-snug group-hover/title:text-brand-primary transition-colors duration-200">
            {post.title}
          </h3>
        </Link>
        <p className="text-sm text-brand-text/80 line-clamp-3 leading-relaxed flex-grow">
          {post.excerpt}
        </p>
        <Link
          href={`/post/${post.id}`}
          className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:text-brand-accent transition-colors duration-200 group/link"
          aria-label={`${content.common.viewMore}: ${post.title}`}
        >
          {content.common.viewMore}
          <ArrowRight
            size={14}
            strokeWidth={2}
            className="transition-transform duration-200 group-hover/link:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}

const Destinations: React.FC = () => {
  const { content } = useLanguage();
  const page = content.pages.destinations;
  const [selectedCategory, setSelectedCategory] = useState("all");

  const selectedCategoryLabel = page.categories.find(
    (c) => c.id === selectedCategory,
  )?.label;

  const filteredPosts =
    selectedCategory === "all"
      ? page.posts
      : page.posts.filter((post) => post.category === selectedCategoryLabel);

  const spotlightPost =
    selectedCategory === "all"
      ? (page.posts.find((p) => p.featured) ?? null)
      : null;

  const gridPosts = spotlightPost
    ? filteredPosts.filter((p) => p.id !== spotlightPost.id)
    : filteredPosts;

  return (
    <div className="wp-shell">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        aria-label="Hero de destinos"
        className="relative isolate overflow-hidden min-h-[360px] sm:min-h-[420px] md:min-h-[500px] flex flex-col justify-end"
      >
        {/* Background image — Ken Burns subtle zoom-out */}
        <Image
          src="/images/hero/hero2.png"
          alt="Paisaje de La Convención, Cusco"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover object-center motion-safe:animate-hero-zoom"
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111B21]/90 via-[#111B21]/35 to-[#111B21]/10" />
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
            <li>
              <ChevronRight size={12} className="text-white/40" />
            </li>
            <li className="text-white font-semibold">{page.title}</li>
          </ol>
        </nav>

        {/* Hero content */}
        <div className="relative z-10 wp-container pb-10 pt-24 md:pb-16">
          <div className="max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/45 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-brand-primary shadow-sm backdrop-blur-sm animate-fade-in-up [animation-fill-mode:both] [animation-delay:60ms]">
              <Compass size={11} strokeWidth={2.5} />
              La Convención · Cusco · Perú
            </span>
            <h1 className="mb-3 font-heading text-[clamp(1.9rem,4vw,3.1rem)] font-bold leading-tight text-white drop-shadow-lg animate-fade-in-up [animation-fill-mode:both] [animation-delay:200ms]">
              {page.title}
            </h1>
            <p className="text-[15px] sm:text-base leading-relaxed text-white/85 drop-shadow max-w-xl animate-fade-in-up [animation-fill-mode:both] [animation-delay:330ms]">
              {page.subtitle}
            </p>
          </div>

          {/* Quick stats pills — each enters independently */}
          <div
            className="mt-8 flex flex-wrap gap-3"
            aria-label="Estadísticas de destinos"
          >
            {HERO_STATS.map(({ icon: Icon, value, labelKey }, i) => (
              <div
                key={labelKey}
                className={`flex items-center gap-2 rounded-full bg-black/45 backdrop-blur-sm border border-white/15 px-4 py-2 shadow-sm animate-reveal-up [animation-fill-mode:both] ${STAT_DELAYS[i] ?? STAT_DELAYS[0]}`}
              >
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-primary/20">
                  <Icon
                    size={12}
                    strokeWidth={2.2}
                    className="text-brand-primary"
                  />
                </div>
                <span className="text-sm font-bold text-white">{value}</span>
                <span className="text-xs text-white/65">{labelKey}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint — delayed entry + continuous bounce */}
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

      {/* ── Posts section ────────────────────────────────────────────── */}
      <section aria-label="Guías y destinos" className="wp-section">
        <div className="wp-container">
          {/* Filter bar ─────────────────────────────────────────────── */}
          <ScrollReveal className="mb-10">
            <div className="flex flex-col gap-3">
              {/* Category pills — horizontal scroll on mobile */}
              <div
                role="group"
                aria-label="Filtro por categoría"
                className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 pb-0.5 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center"
              >
                {page.categories.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  const count =
                    cat.id === "all"
                      ? page.posts.length
                      : page.posts.filter((p) => p.category === cat.label)
                          .length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={[
                        "flex-none inline-flex items-center gap-2 wp-btn text-sm whitespace-nowrap border",
                        isActive
                          ? "bg-brand-primary text-white border-brand-primary"
                          : "bg-white text-brand-text border-[var(--color-border)] hover:border-brand-primary/50 hover:bg-brand-background",
                      ].join(" ")}
                    >
                      {cat.label}
                      <span
                        className={[
                          "text-[10px] font-bold leading-none px-1.5 py-0.5 rounded-full",
                          isActive
                            ? "bg-white/25 text-white"
                            : "bg-[var(--color-border)] text-brand-text/55",
                        ].join(" ")}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
              {/* Results count */}
              <p className="text-center text-xs text-brand-text/45 font-medium tabular-nums">
                {filteredPosts.length}{" "}
                {filteredPosts.length === 1 ? "guía" : "guías"}
                {selectedCategory !== "all" && selectedCategoryLabel
                  ? ` · ${selectedCategoryLabel}`
                  : ""}
              </p>
            </div>
          </ScrollReveal>

          {/* Featured spotlight ───────────────────────────────────────── */}
          {spotlightPost && (
            <motion.div
              key="spotlight"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mb-10"
            >
              <article
                className="group wp-card overflow-hidden"
                aria-label={`Guía destacada: ${spotlightPost.title}`}
              >
                <div className="grid md:grid-cols-5">
                  {/* Image */}
                  <Link
                    href={`/post/${spotlightPost.id}`}
                    tabIndex={-1}
                    aria-hidden="true"
                    className="relative md:col-span-2 h-60 md:h-auto overflow-hidden block bg-brand-primary/10"
                  >
                    <Image
                      src={spotlightPost.image}
                      alt={spotlightPost.title}
                      fill
                      sizes="(min-width: 768px) 40vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/35 to-transparent" />
                    <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-brand-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-md rounded-full">
                      <Star size={9} strokeWidth={2.5} />
                      Destacado
                    </span>
                  </Link>

                  {/* Content */}
                  <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary/80">
                      {spotlightPost.category}
                    </span>
                    <Link
                      href={`/post/${spotlightPost.id}`}
                      className="group/title"
                    >
                      <h2 className="font-heading text-[clamp(1.2rem,2.5vw,1.7rem)] font-bold text-brand-text leading-snug group-hover/title:text-brand-primary transition-colors duration-200 line-clamp-3">
                        {spotlightPost.title}
                      </h2>
                    </Link>
                    <p className="text-sm text-brand-text/65 leading-relaxed line-clamp-3">
                      {spotlightPost.excerpt}
                    </p>
                    <Link
                      href={`/post/${spotlightPost.id}`}
                      className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:text-brand-accent transition-colors duration-200 group/link w-fit"
                    >
                      {content.common.viewMore}
                      <ArrowRight
                        size={15}
                        strokeWidth={2}
                        className="transition-transform duration-200 group-hover/link:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>
              </article>
            </motion.div>
          )}

          {/* Posts grid ──────────────────────────────────────────────── */}
          {gridPosts.length > 0 && (
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {gridPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.25,
                    delay: Math.min(i * 0.04, 0.28),
                    ease: "easeOut",
                  }}
                >
                  <DestinationCard post={post} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Empty state ─────────────────────────────────────────────── */}
          {filteredPosts.length === 0 && (
            <div className="flex flex-col items-center text-center gap-5 py-20">
              <div className="w-16 h-16 rounded-full bg-brand-background border border-[var(--color-border)] flex items-center justify-center">
                <Search
                  size={22}
                  strokeWidth={1.5}
                  className="text-brand-text/35"
                />
              </div>
              <div className="max-w-xs">
                <p className="font-heading font-semibold text-brand-text mb-1">
                  {content.common.noCategoryArticles}
                </p>
                <p className="text-sm text-brand-text/50">
                  Prueba con otra categoría o explora todos los artículos.
                </p>
              </div>
              <button
                onClick={() => setSelectedCategory("all")}
                className="wp-btn-primary"
              >
                {content.common.all}
              </button>
            </div>
          )}

          {/* Explore more CTA ────────────────────────────────────────── */}
          <ScrollReveal
            delay={0.05}
            className="mt-14 pt-10 border-t border-[var(--color-border)]"
          >
            <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.09)] overflow-hidden">
              {/* Brand accent bar */}
              <div className="h-1 bg-brand-primary" />

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-7 md:p-9">
                <div className="flex items-start gap-4">
                  <div className="flex-none w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                    <BookOpen size={22} strokeWidth={1.75} className="text-brand-primary" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-primary mb-1">
                      Seguir explorando
                    </p>
                    <h3 className="font-heading text-[1.1rem] font-bold text-brand-text leading-tight">
                      ¿Quieres más contenido?
                    </h3>
                    <p className="text-sm text-brand-text/75 mt-1.5 leading-relaxed max-w-sm">
                      Guías de viaje, consejos prácticos y artículos actualizados
                      en el blog.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 flex-shrink-0">
                  {/* Ripple: dark bg → green overlay, text turns dark */}
                  <Link
                    href="/blog"
                    className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-dark text-white text-sm font-semibold rounded-full overflow-hidden shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
                  >
                    <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square bg-brand-primary rounded-[50%] scale-0 group-hover:scale-100 transition-transform duration-700 ease-[cubic-bezier(0.2,1,0.2,1)] origin-center" />
                    <span className="relative z-10 group-hover:text-brand-dark transition-colors duration-500">
                      Ver blog
                    </span>
                  </Link>
                  {/* Ripple: white bg → dark overlay, text turns white */}
                  <Link
                    href="/tips"
                    className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-brand-text text-sm font-semibold rounded-full overflow-hidden border border-[var(--color-border)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
                  >
                    <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square bg-brand-dark rounded-[50%] scale-0 group-hover:scale-100 transition-transform duration-700 ease-[cubic-bezier(0.2,1,0.2,1)] origin-center" />
                    <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                      Tips de viaje
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Destinations;
