"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Calendar, User, Search } from "lucide-react";
import { EMAIL_REGEX } from "@/constants";
import { SectionHeader } from "@/components";
import { ScrollReveal } from "@/components/ui";
import { useLanguage } from "@/features/i18n";

const Blog: React.FC = () => {
  const { content } = useLanguage();
  const page = content.pages.blog;
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedEmail = newsletterEmail.trim();
    if (!EMAIL_REGEX.test(normalizedEmail)) {
      setNewsletterStatus({
        type: "error",
        text: page.invalidEmail,
      });
      return;
    }

    try {
      setIsSubmittingNewsletter(true);
      setNewsletterStatus(null);
      await new Promise((resolve) => setTimeout(resolve, 700));

      setNewsletterEmail("");
      setNewsletterStatus({
        type: "success",
        text: page.success,
      });
    } finally {
      setIsSubmittingNewsletter(false);
    }
  };

  const filteredPosts = page.posts.filter((post) => {
    const selectedCategoryLabel = page.categories.find(
      (category) => category.id === selectedCategory,
    )?.label;
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategoryLabel;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="wp-shell">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/destinations/andes-trekking.jpg"
          alt="Blog"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        <div className="relative z-10 text-center animate-reveal-up">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg tracking-tight">
            {page.heroTitle}
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto px-4 font-light text-white/90">
            {page.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Buscador y Filtros */}
      <section className="wp-section bg-white/80  backdrop-blur-sm border-b border-[var(--color-border)] ">
        <ScrollReveal className="wp-container">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Buscador */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-text/45  w-5 h-5" />
              <input
                type="text"
                placeholder={content.common.searchArticles}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label={content.common.searchArticles}
                autoComplete="off"
                className="wp-input pl-10"
              />
            </div>

            {/* Filtros por categoría */}
            <div className="flex flex-wrap gap-2">
              {page.categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`wp-btn px-4 py-2 text-sm ${
                    selectedCategory === category.id
                      ? "bg-brand-primary text-white "
                      : "bg-brand-background  text-brand-text  hover:bg-brand-primary/20 "
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Posts del Blog */}
      <section className="wp-section">
        <ScrollReveal className="wp-container">
          <SectionHeader
            title={page.postsTitle}
            subtitle={page.postsSubtitle}
            className="mb-10"
          />
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-brand-text/75 ">
                {content.common.noSearchResults}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="wp-card wp-card-interactive overflow-hidden border-t-4 border-brand-primary"
                >
                  <div className="relative h-48">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-4 left-4 bg-brand-text  text-white  px-3 py-1 rounded-full text-sm font-semibold">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-2xl font-bold text-brand-text  mb-3 hover:text-brand-primary  transition-colors cursor-pointer">
                      {post.title}
                    </h3>
                    <p className="text-brand-text/75  mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-brand-text/75  border-t border-brand-primary/20  pt-4">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </span>
                      </div>
                      <span className="text-brand-text  font-medium">
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </ScrollReveal>
      </section>

      {/* Newsletter */}
      <section className="wp-section bg-gradient-to-r from-brand-text via-brand-text/90 to-brand-primary text-white">
        <ScrollReveal className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            {page.newsletterTitle}
          </h2>
          <p className="text-lg mb-8 text-white/90">
            {page.newsletterDescription}
          </p>
          <form
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto"
          >
            <input
              type="email"
              placeholder={page.emailPlaceholder}
              value={newsletterEmail}
              onChange={(e) => {
                setNewsletterEmail(e.target.value);
                if (newsletterStatus) setNewsletterStatus(null);
              }}
              autoComplete="email"
              required
              className="wp-input flex-1 border-white/20 focus:ring-white/50"
            />
            <button
              type="submit"
              className="wp-btn-light"
              disabled={isSubmittingNewsletter}
              aria-busy={isSubmittingNewsletter}
            >
              {isSubmittingNewsletter ? page.subscribing : page.subscribe}
            </button>
          </form>
          <div className="min-h-[1.75rem] mt-3" aria-live="polite">
            {newsletterStatus && (
              <p
                className={`text-sm ${
                  newsletterStatus.type === "success"
                    ? "text-brand-primary/25"
                    : "text-red-200"
                }`}
                role={newsletterStatus.type === "error" ? "alert" : undefined}
              >
                {newsletterStatus.text}
              </p>
            )}
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default Blog;
