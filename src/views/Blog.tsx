"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  ChevronRight,
  BookOpen,
  Clock,
  ArrowDown,
  Search,
  ArrowRight,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui";
import { useLanguage } from "@/features/i18n";

const BLOG_STAT_DELAYS = [
  "[animation-delay:460ms]",
  "[animation-delay:550ms]",
  "[animation-delay:640ms]",
] as const;

const Blog: React.FC = () => {
  const { content } = useLanguage();
  const page = content.pages.blog;
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const selectedCategoryLabel = page.categories.find(
    (c) => c.id === selectedCategory,
  )?.label;

  const filteredPosts = page.posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategoryLabel;
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      !q ||
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="wp-shell">

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section
        aria-label="Hero del blog"
        className="relative isolate overflow-hidden min-h-[360px] sm:min-h-[420px] md:min-h-[500px] flex flex-col justify-end"
      >
        <Image
          src="/images/hero/hero4.png"
          alt="Blog de La Convención"
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
              <BookOpen size={11} strokeWidth={2.5} />
              Historias · Consejos · Guías
            </span>
            <h1 className="mb-3 font-heading text-[clamp(1.9rem,4vw,3.1rem)] font-bold leading-tight text-white drop-shadow-lg animate-fade-in-up [animation-fill-mode:both] [animation-delay:200ms]">
              {page.heroTitle}
            </h1>
            <p className="text-[15px] sm:text-base leading-relaxed text-white/85 drop-shadow max-w-xl animate-fade-in-up [animation-fill-mode:both] [animation-delay:330ms]">
              {page.heroSubtitle}
            </p>
          </div>

          {/* Stats pills */}
          <div
            className="mt-8 flex flex-wrap gap-3"
            aria-label="Estadísticas del blog"
          >
            {[
              { icon: BookOpen,  value: "6",      label: "Artículos",         delay: BLOG_STAT_DELAYS[0] },
              { icon: Calendar,  value: "5",       label: "Categorías",        delay: BLOG_STAT_DELAYS[1] },
              { icon: Clock,     value: "~7 min",  label: "Lectura promedio",  delay: BLOG_STAT_DELAYS[2] },
            ].map(({ icon: Icon, value, label, delay }) => (
              <div
                key={label}
                className={`flex items-center gap-2 rounded-full bg-black/45 backdrop-blur-sm border border-white/15 px-4 py-2 shadow-sm animate-reveal-up [animation-fill-mode:both] ${delay}`}
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

        {/* Scroll hint */}
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

      {/* ── Búsqueda y filtros ──────────────────────────────────────────── */}
      <section className="wp-section border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="wp-container">
          <ScrollReveal>
            <div className="flex flex-col gap-4">
              {/* Top row: search + filters */}
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                {/* Search */}
                <div className="relative w-full sm:w-80">
                  <Search
                    size={16}
                    strokeWidth={2}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-text/40"
                    aria-hidden="true"
                  />
                  <input
                    type="search"
                    placeholder={content.common.searchArticles}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label={content.common.searchArticles}
                    autoComplete="off"
                    className="wp-input pl-10 h-11 text-sm"
                  />
                </div>

                {/* Category filters — horizontal scroll on mobile */}
                <div
                  role="group"
                  aria-label="Filtro por categoría"
                  className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 pb-0.5 sm:mx-0 sm:px-0 sm:flex-wrap"
                >
                  {page.categories.map((cat) => {
                    const isActive = selectedCategory === cat.id;
                    const count =
                      cat.id === "all"
                        ? page.posts.length
                        : page.posts.filter((p) => p.category === cat.label).length;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={[
                          "flex-none inline-flex items-center gap-2 wp-btn text-sm whitespace-nowrap border transition-colors duration-150",
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
              </div>

              {/* Results count */}
              <p className="text-xs text-brand-text/45 font-medium tabular-nums">
                {filteredPosts.length}{" "}
                {filteredPosts.length === 1 ? "artículo" : "artículos"}
                {selectedCategory !== "all" && selectedCategoryLabel
                  ? ` · ${selectedCategoryLabel}`
                  : ""}
                {searchTerm
                  ? ` · "${searchTerm}"`
                  : ""}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Posts ──────────────────────────────────────────────────────── */}
      <section aria-label="Artículos del blog" className="wp-section">
        <div className="wp-container">
          {filteredPosts.length === 0 ? (
            <ScrollReveal>
              <div className="flex flex-col items-center text-center gap-5 py-20">
                <div className="w-16 h-16 rounded-full bg-brand-background border border-[var(--color-border)] flex items-center justify-center">
                  <Search size={22} strokeWidth={1.5} className="text-brand-text/35" />
                </div>
                <div className="max-w-xs">
                  <p className="font-heading font-semibold text-brand-text mb-1">
                    {content.common.noSearchResults}
                  </p>
                  <p className="text-sm text-brand-text/55">
                    Prueba con otro término o categoría.
                  </p>
                </div>
                <button
                  onClick={() => { setSelectedCategory("all"); setSearchTerm(""); }}
                  className="wp-btn-primary"
                >
                  {content.common.all}
                </button>
              </div>
            </ScrollReveal>
          ) : (
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {filteredPosts.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: Math.min(i * 0.05, 0.28) }}
                  className="wp-card overflow-hidden flex flex-col"
                  aria-label={post.title}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-brand-primary/10">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 bg-black/55 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white/90 rounded-full">
                      {post.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1 gap-3">
                    <h3 className="font-heading text-[1.05rem] font-bold text-brand-text line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-sm text-brand-text/80 line-clamp-3 leading-relaxed flex-grow">
                      {post.excerpt}
                    </p>

                    {/* Metadata */}
                    <div className="flex items-center justify-between text-[11px] text-brand-text/50 pt-2 border-t border-[var(--color-border-muted)]">
                      <span>{post.author}</span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} strokeWidth={2} />
                        {post.readTime}
                      </span>
                    </div>

                    <Link
                      href={`/post/${post.id}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:text-brand-accent transition-colors duration-200 group/link"
                      aria-label={`${content.common.readArticle}: ${post.title}`}
                    >
                      {content.common.readArticle}
                      <ArrowRight
                        size={14}
                        strokeWidth={2}
                        className="transition-transform duration-200 group-hover/link:translate-x-1"
                      />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </section>

    </div>
  );
};

export default Blog;
