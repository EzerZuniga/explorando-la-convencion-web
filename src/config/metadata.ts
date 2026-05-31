import type { Metadata } from "next";
import { SITE_CONFIG, SEO_DEFAULTS } from "@/constants";
import { translations } from "@/features/i18n/translations";

const siteUrl = new URL(SITE_CONFIG.url);
const es = translations.es;

export type PublicRoute =
  | "/"
  | "/about"
  | "/destinations"
  | "/gallery"
  | "/tips"
  | "/contact"
  | "/blog"
  | "/gastronomia"
  | "/profile";

type RouteSeo = {
  title: string;
  description: string;
  keywords?: string;
  path: PublicRoute;
  noIndex?: boolean;
};

const routeSeo: Record<PublicRoute, RouteSeo> = {
  "/": {
    title: es.pages.home.seo.title,
    description: es.pages.home.seo.description,
    keywords: es.pages.home.seo.keywords,
    path: "/",
  },
  "/about": {
    title: es.pages.about.seoTitle,
    description: es.pages.about.seoDescription,
    keywords: es.pages.about.seoKeywords,
    path: "/about",
  },
  "/destinations": {
    title: es.pages.destinations.seoTitle,
    description: es.pages.destinations.seoDescription,
    keywords: es.pages.destinations.seoKeywords,
    path: "/destinations",
  },
  "/gallery": {
    title: es.pages.gallery.seoTitle,
    description: es.pages.gallery.seoDescription,
    keywords: es.pages.gallery.seoKeywords,
    path: "/gallery",
  },
  "/tips": {
    title: es.pages.tips.seoTitle,
    description: es.pages.tips.seoDescription,
    keywords: es.pages.tips.seoKeywords,
    path: "/tips",
  },
  "/contact": {
    title: es.pages.contact.seoTitle,
    description: es.pages.contact.seoDescription,
    keywords: es.pages.contact.seoKeywords,
    path: "/contact",
  },
  "/blog": {
    title: es.pages.blog.seoTitle,
    description: es.pages.blog.seoDescription,
    keywords: es.pages.blog.seoKeywords,
    path: "/blog",
  },
  "/gastronomia": {
    title: es.pages.gastronomy.seoTitle,
    description: es.pages.gastronomy.seoDescription,
    keywords: es.pages.gastronomy.seoKeywords,
    path: "/gastronomia",
  },
  "/profile": {
    title: "Mi Perfil",
    description: "Gestiona tu perfil y configuración de cuenta en Explorando la Convención.",
    path: "/profile",
    noIndex: true,
  },
};

export const publicRoutes = Object.keys(routeSeo) as PublicRoute[];

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function createPageMetadata(path: PublicRoute): Metadata {
  const seo = routeSeo[path];
  const title =
    path === "/" ? SEO_DEFAULTS.defaultTitle : `${seo.title} | ${SITE_CONFIG.name}`;
  const url = absoluteUrl(path);
  const image = absoluteUrl(SITE_CONFIG.ogImage);

  return {
    title,
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: SITE_CONFIG.author }],
    alternates: {
      canonical: url,
    },
    robots: seo.noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      title,
      description: seo.description,
      url,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      type: path === "/blog" ? "article" : "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: SITE_CONFIG.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: SITE_CONFIG.social.twitter,
      title,
      description: seo.description,
      images: [image],
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    alternateName: "Blog de Viajes La Convención",
    url: SITE_CONFIG.url,
    description:
      "Blog especializado en turismo, viajes y gastronomía de La Convención, Cusco, Perú. Guías completas para explorar destinos únicos.",
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/images/logoconven.png"),
        width: 1486,
        height: 515,
      },
      founder: {
        "@type": "Person",
        name: SITE_CONFIG.author,
      },
    },
    about: {
      "@type": "Place",
      name: "La Convención",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Cusco, Perú",
      },
    },
    inLanguage: "es-PE",
    copyrightYear: 2024,
    genre: ["Travel", "Tourism", "Food"],
    audience: {
      "@type": "Audience",
      audienceType: "travelers",
    },
  };
}

export function routeLastModified() {
  return new Date("2024-11-04T00:00:00.000Z");
}
