"use client";

import React from "react";
import Image from "next/image";
import { Utensils, Coffee, MapPin, Star } from "lucide-react";
import SEOHead from "@/features/seo";
import { SITE_CONFIG } from "@/constants";
import { SectionHeader } from "@/components";
import { useLanguage } from "@/features/i18n";

const Gastronomia: React.FC = () => {
  const { content } = useLanguage();
  const page = content.pages.gastronomy;

  return (
    <div className="wp-shell">
      <SEOHead
        title={page.seoTitle}
        description={page.seoDescription}
        keywords={page.seoKeywords}
        url={`${SITE_CONFIG.url}/gastronomia`}
      />
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/galeria/comida-asiatica.jpg"
          alt="Gastronomía"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/65"></div>
        <div className="relative z-10 text-center animate-reveal-up">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full border-4 border-white mx-auto mb-4">
            <Utensils className="w-10 h-10 text-brand-text" strokeWidth={3} />
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg tracking-tight">
            {page.heroTitle}
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto px-4 font-light text-white/90">
            {page.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Introducción */}
      <section className="wp-section bg-white/80  backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-text  mb-6 tracking-tight">
            {page.introTitle}
          </h2>
          {page.introParagraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              className={`text-base md:text-lg text-brand-text/75  leading-relaxed font-light ${index === 0 ? "mb-6" : ""}`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Platos Típicos */}
      <section className="wp-section bg-[var(--color-surface-muted)] ">
        <div className="wp-container">
          <SectionHeader
            title={page.dishesTitle}
            subtitle={page.dishesSubtitle}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {page.dishes.map((dish) => (
              <div
                key={dish.id}
                className="wp-card wp-card-interactive overflow-hidden border-t-4 border-brand-primary"
              >
                <div className="relative h-48">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-4 right-4 bg-brand-text  text-white  px-3 py-1 rounded-full text-sm font-semibold">
                    {dish.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-2xl font-bold text-brand-text  mb-3">
                    {dish.name}
                  </h3>
                  <p className="text-brand-text/75  leading-relaxed">
                    {dish.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Café y Cacao */}
      <section className="wp-section bg-white/80  backdrop-blur-sm">
        <div className="wp-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center justify-center w-14 h-14 bg-white  rounded-full border-4 border-brand-text  mb-4">
                <Coffee className="w-7 h-7 text-brand-text " strokeWidth={3} />
              </div>
              <h2 className="font-heading text-4xl font-bold text-brand-text  mb-6">
                {page.coffeeTitle}
              </h2>
              {page.coffeeParagraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={`text-lg text-brand-text/75  leading-relaxed ${index === page.coffeeParagraphs.length - 1 ? "mb-6" : "mb-4"}`}
                >
                  {paragraph}
                </p>
              ))}
              <button className="wp-btn-primary">{page.coffeeAction}</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-48 overflow-hidden rounded-lg shadow-md">
                <Image
                  src="/images/galeria/comida-asiatica.jpg"
                  alt="Café"
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="relative h-48 overflow-hidden rounded-lg shadow-md">
                <Image
                  src="/images/destinos/pueblo-magico.jpg"
                  alt="Cacao"
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="relative col-span-2 h-48 overflow-hidden rounded-lg shadow-md">
                <Image
                  src="/images/galeria/fotografia.jpg"
                  alt="Plantación"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurantes Recomendados */}
      <section className="wp-section bg-[var(--color-surface-muted)] ">
        <div className="wp-container">
          <SectionHeader
            title={page.restaurantsTitle}
            subtitle={page.restaurantsSubtitle}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {page.restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="wp-card wp-card-interactive overflow-hidden border-t-4 border-brand-primary"
              >
                <div className="relative h-48">
                  <Image
                    src={restaurant.image}
                    alt={restaurant.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading text-2xl font-bold text-brand-text ">
                      {restaurant.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-brand-primary/80 fill-current" />
                      <span className="font-semibold text-brand-text ">
                        {restaurant.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-brand-text  font-medium mb-3">
                    {restaurant.specialty}
                  </p>
                  <p className="text-brand-text/75  mb-4 leading-relaxed">
                    {restaurant.description}
                  </p>
                  <div className="flex items-center gap-2 text-brand-text/75 ">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{restaurant.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="wp-section bg-gradient-to-r from-brand-text via-brand-text/90 to-brand-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
            {page.ctaTitle}
          </h2>
          <p className="text-lg mb-8 text-white/90">{page.ctaDescription}</p>
          <button className="wp-btn-light text-lg">{page.ctaAction}</button>
        </div>
      </section>
    </div>
  );
};

export default Gastronomia;
