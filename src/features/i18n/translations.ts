import type {
  BlogPost,
  Dish,
  GalleryImage,
  Post,
  Restaurant,
  TipCategory,
} from "@/types";
import type { StatItem, TeamMember, ValueItem } from "@/data/about";

export const LANGUAGES = [
  {
    code: "es",
    label: "Español",
    nativeName: "Español",
    shortLabel: "ES",
    locale: "es-PE",
  },
  {
    code: "en",
    label: "English",
    nativeName: "English",
    shortLabel: "EN",
    locale: "en-US",
  },
  {
    code: "pt",
    label: "Portugués",
    nativeName: "Português",
    shortLabel: "PT",
    locale: "pt-BR",
  },
  {
    code: "fr",
    label: "Francés",
    nativeName: "Français",
    shortLabel: "FR",
    locale: "fr-FR",
  },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

type NavigationItem = {
  name: string;
  href: string;
};

type DeepPartial<T> = {
  [Key in keyof T]?: T[Key] extends Array<unknown>
  ? T[Key]
  : T[Key] extends object
  ? DeepPartial<T[Key]>
  : T[Key];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function mergeContent<T>(base: T, overrides: DeepPartial<T>): T {
  if (!isRecord(base) || !isRecord(overrides)) {
    return (overrides ?? base) as T;
  }

  const merged: Record<string, unknown> = { ...base };

  Object.entries(overrides).forEach(([key, value]) => {
    if (value === undefined) return;

    const baseValue = merged[key];
    merged[key] =
      isRecord(baseValue) && isRecord(value)
        ? mergeContent(baseValue, value)
        : value;
  });

  return merged as T;
}

function createEnglishTranslations(base: TranslationContent) {
  return mergeContent(base, {
    languageSelector: {
      ariaLabel: "Change language",
      currentLanguage: "Current language",
      changeTo: "Switch to",
    },
    navigation: {
      main: [
        { name: "Home", href: "/" },
        { name: "Our Team", href: "/about" },
        { name: "Destinations", href: "/destinations" },
        { name: "Gastronomy", href: "/gastronomia" },
        { name: "Blog", href: "/blog" },
        { name: "Gallery", href: "/gallery" },
        { name: "Tips", href: "/tips" },
        { name: "Contact", href: "/contact" },
      ],
      footerMain: [
        { name: "Home", href: "/" },
        { name: "Destinations", href: "/destinations" },
        { name: "Gallery", href: "/gallery" },
        { name: "Travel tips", href: "/tips" },
        { name: "Contact", href: "/contact" },
      ],
      footerInfo: [
        { name: "Our Team", href: "/about" },
        { name: "Privacy policy", href: "/privacy" },
        { name: "Terms and conditions", href: "/terms" },
      ],
    },
    navbar: {
      locationShort: "Quillabamba",
      purpose: "Tourism and culture portal for La Convención",
      followUs: "Follow us:",
      mainNavLabel: "Main navigation",
      mobileMenuLabel: "Mobile navigation menu",
      menuTitle: "Menu",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      login: "Sign in",
      profile: "My profile",
      notifications: "My notifications",
      logout: "Sign out",
      socialLabels: {
        facebook: "Follow us on Facebook",
        instagram: "Follow us on Instagram",
        youtube: "Follow us on YouTube",
      },
    },
    footer: {
      logoAlt: "Explorando La Convención logo",
      description:
        "An information portal dedicated to showcasing the natural, cultural and tourism richness of La Convención, Cusco. Explore destinations, tips and unique experiences for travelers and curious visitors.",
      navigationTitle: "Navigation",
      infoTitle: "Information",
      followTitle: "Follow us",
      rights: "All rights reserved.",
      developedBy: "Developed by",
    },
    common: {
      all: "All",
      viewMore: "View more",
      readArticle: "Read article",
      article: "Article",
      noCategoryArticles: "There are no articles in this category.",
      noSearchResults: "No articles matched your search.",
      searchArticles: "Search articles...",
      posts: "Posts",
      role: "Role:",
    },
    pages: {
      home: {
        seo: {
          title:
            "Exploring La Convención - Travel and Tourism Blog in Peru | Complete Guides",
          description:
            "Discover the best tourism destinations in La Convención, Cusco and Peru. Travel guides, practical tips, gastronomy and unique adventure experiences.",
          keywords:
            "La Convención, Cusco tourism, Peru travel, tourist destinations, travel blog, travel guides, adventures, Peruvian gastronomy",
        },
        hero: {
          titlePrefix: "Discover the magic of",
          titleHighlight: "La Convención",
          description:
            "Clear information to discover nature, culture and local flavors in the warm heart of Cusco.",
          primaryCta: "Explore",
          secondaryCta: "View Gallery",
        },
        sections: {
          portal: {
            title: "Explore the portal",
            description:
              "Quickly find the main sections to learn, plan and consult useful information about La Convención.",
          },
          planningInfo: {
            title: "Information for planning",
            description:
              "Helpful data to review weather, exchange rates and useful messages before organizing your visit.",
          },
          highlights: {
            title: "Highlights of La Convención",
            description:
              "A visual summary with key topics to start exploring the portal with better context.",
          },
          stats: {
            title: "The province at a glance",
            description:
              "Reference figures presented as an initial guide to understand the natural and cultural scale of the territory.",
          },
          posts: {
            title: "Latest posts",
            description:
              "Selected guides and articles to expand your information before your visit.",
            action: "View blog",
          },
          visit: {
            title: "Prepare your visit",
            description:
              "Three simple steps to move from inspiration to a well-organized route.",
          },
          faq: {
            title: "Frequently asked questions",
            description:
              "Quick answers to common questions before exploring the portal sections.",
          },
          location: {
            title: "Find us",
            description:
              "Main reference to locate Quillabamba and plan access to the province.",
          },
        },
        portalLinks: [
          {
            to: "/destinations",
            title: "Destinations",
            description:
              "Nature routes, viewpoints, waterfalls and points of interest.",
          },
          {
            to: "/gastronomia",
            title: "Gastronomy",
            description:
              "Coffee, cacao, local products and high-jungle flavors.",
          },
          {
            to: "/tips",
            title: "Tips",
            description:
              "Weather, transport, safety and practical recommendations.",
          },
          {
            to: "/blog",
            title: "Blog",
            description: "Guides, stories and updates to plan better.",
          },
          {
            to: "/gallery",
            title: "Gallery",
            description:
              "Images of landscapes, culture, routes and experiences.",
          },
          {
            to: "/about",
            title: "Culture",
            description: "History, identity, festivities and local memory.",
          },
        ],
        highlights: [
          {
            title: "Quillabamba as a starting point",
            description:
              "An ideal base to organize routes through the province, connect with local services and approach natural paths.",
            image: "/images/destinations/pueblo-magico.jpg",
            to: "/destinations",
            label: "View destinations",
            meta: "Routes and guidance",
          },
          {
            title: "Coffee, cacao and local flavors",
            description:
              "Emblematic products that help explain the agricultural and gastronomic identity of La Convención.",
            image: "/images/gallery/comida-asiatica.jpg",
            to: "/gastronomia",
            label: "Explore gastronomy",
            meta: "Regional flavors",
          },
          {
            title: "Nature to visit calmly",
            description:
              "Forests, viewpoints and green spaces best explored with previous information and respect for the environment.",
            image: "/images/gallery/fotografia.jpg",
            to: "/gallery",
            label: "View gallery",
            meta: "Landscapes and culture",
          },
        ],
        stats: [
          {
            value: "30+",
            label: "districts and sectors",
            description:
              "Territories with their own identity and routes to discover.",
          },
          {
            value: "50+",
            label: "reference attractions",
            description:
              "Waterfalls, viewpoints, cultural spaces and green routes.",
          },
          {
            value: "365",
            label: "days to plan",
            description: "Warm weather during much of the year.",
          },
        ],
        planningSteps: [
          {
            to: "/tips",
            title: "Before traveling",
            description:
              "Check weather, travel times, budget and available services.",
          },
          {
            to: "/destinations",
            title: "During the route",
            description:
              "Prioritize marked routes, ask for local guidance and care for natural spaces.",
          },
          {
            to: "/contact",
            title: "Need help",
            description:
              "Find location references and channels to keep exploring the portal.",
          },
        ],
        portalPillars: [
          {
            to: "/",
            title: "Organized information",
            description:
              "Sections designed for quick consultation without losing context.",
          },
          {
            to: "/",
            title: "Responsible tourism",
            description:
              "Recommendations to care for routes, communities and natural spaces.",
          },
          {
            to: "/",
            title: "Clear planning",
            description:
              "Practical data to review before choosing a route or activity.",
          },
        ],
        identity: {
          eyebrow: "Information portal",
          title:
            "Clear information to explore La Convención with more context.",
          description:
            "We bring together routes, tips, culture, posts and useful data in an organized experience for visitors, locals and anyone who wants to know the province better.",
        },
        faqs: [
          {
            question: "What is the best time to visit La Convención?",
            answer:
              "You can visit during much of the year. For nature routes, check the weather and plan more carefully during the rainy season.",
          },
          {
            question: "Where do visitors usually start?",
            answer:
              "Quillabamba works as the main reference point because of its road connections, services and proximity to several attractions.",
          },
          {
            question: "What should I check before leaving?",
            answer:
              "Weather, distances, transport schedules, budget, route conditions and basic safety recommendations.",
          },
          {
            question: "Does the portal only show tourism destinations?",
            answer:
              "No. It also brings together gastronomy, culture, practical tips, posts and useful data to better understand the province.",
          },
        ],
        locationCards: [
          {
            to: "/destinations",
            title: "Location",
            description:
              "Quillabamba, capital of La Convención province, Cusco region, Peru.",
          },
          {
            to: "/tips",
            title: "Access",
            description:
              "About 4 to 5 hours by road from Cusco city, depending on route and weather.",
          },
          {
            to: "/contact",
            title: "Useful reference",
            description:
              "Use the map as a starting point to organize routes, times and services.",
          },
        ],
        ui: {
          explore: "Explore",
          step: "Step",
          viewDetail: "View detail",
          previous: "Previous item",
          next: "Next item",
          viewHighlight: "View highlight",
          readPosts: "Read posts",
          featuredPosts: "Featured posts",
          mapTitle: "Quillabamba location",
        },
      },
      destinations: {
        seoTitle: "Tourism Destinations in La Convención - Complete Guide",
        seoDescription:
          "Explore tourism destinations in La Convención: nature, adventure, culture and gastronomy in the heart of Cusco.",
        seoKeywords:
          "La Convención destinations, Cusco tourism, tourist places Peru, what to visit in Quillabamba",
        title: "All Destinations",
        subtitle:
          "Explore our complete collection of articles about travel, destinations and experiences in La Convención.",
      },
      gallery: {
        seoTitle: "Photo Gallery - La Convención in Images",
        seoDescription:
          "Explore our photo gallery with striking landscapes from La Convención, Cusco and Peru.",
        seoKeywords:
          "La Convención photo gallery, Peru landscape photography, Cusco images, travel photos",
        title: "Photo Gallery",
        subtitle:
          "A visual look at the most incredible destinations in La Convención.",
        ctaText: "Want to see more photos from our trips?",
        ctaAction: "Follow us on Instagram",
      },
      tips: {
        seoTitle: "Travel Tips - Practical Guide for Travelers",
        seoDescription:
          "Practical travel tips: budget, luggage, culture, safety, photography and gastronomy for your next adventure in La Convención.",
        seoKeywords:
          "travel tips, traveler tips, travel budget, travel luggage, travel safety, travel photography",
        title: "Travel Tips",
        subtitle:
          "Learn from our experiences and avoid common mistakes with these practical traveler tips.",
        moreHelpTitle: "Need more help?",
        moreHelpDescription:
          "Subscribe to our weekly newsletter and receive exclusive tips, travel deals and detailed guides directly in your inbox.",
        emailPlaceholder: "Your email address",
        subscribe: "Subscribe",
      },
      contact: {
        seoTitle: "Contact Us - Explorando la Convención",
        seoDescription:
          "Have questions or want to collaborate? Contact us by email, phone or visit us in Quillabamba, La Convención.",
        seoKeywords:
          "contact explorando la convención, contact, email, phone, Quillabamba",
        title: "Contact Us",
        subtitle:
          "Have questions, suggestions or want to collaborate with us? We are here to help.",
        infoTitle: "Contact Information",
        formTitle: "Send Us a Message",
        requiredNote: "Fields marked with * are required.",
        submit: "Send Message",
        submitting: "Sending...",
      },
      blog: {
        seoTitle:
          "Travel Blog - Explorando la Convención | Tourism Articles and Tips",
        seoDescription:
          "Read our latest articles about travel, destinations in La Convención and Cusco, practical tips and travel experiences in Peru.",
        seoKeywords:
          "travel blog, tourism articles, travel tips, Peru destinations, La Convención, tourism blog",
        title: "Blog",
        subtitle: "Stories, tips and discoveries from La Convención",
        heroTitle: "Blog",
        heroSubtitle: "Stories, tips and discoveries from La Convención",
        postsTitle: "Posts",
        postsSubtitle:
          "Recent articles about culture, travel and authentic experiences in La Convención.",
        newsletterTitle: "Subscribe to Our Newsletter",
        newsletterDescription:
          "Receive the latest news, tips and articles directly in your inbox",
        emailPlaceholder: "Your email address",
        subscribe: "Subscribe",
        subscribing: "Subscribing...",
        invalidEmail: "Enter a valid email to subscribe.",
        success: "Done! You subscribed to the newsletter.",
      },
      gastronomy: {
        seoTitle: "Gastronomy of La Convención - Authentic Flavors of Peru",
        seoDescription:
          "Discover La Convención gastronomy: high-altitude coffee, premium cacao, typical dishes and top restaurants in Quillabamba.",
        seoKeywords:
          "La Convención gastronomy, Quillabamba coffee, Peru cacao, typical Cusco food, Quillabamba restaurants",
        title: "Gastronomy",
        subtitle: "Authentic flavors of La Convención",
        heroTitle: "Gastronomy",
        heroSubtitle: "Authentic flavors of La Convención",
        introTitle: "A Journey of Flavors",
        dishesTitle: "Typical Dishes",
        dishesSubtitle: "Discover the flavors that make our region unique.",
        coffeeTitle: "High-Altitude Coffee and Cacao",
        coffeeAction: "Coffee and Cacao Tour",
        restaurantsTitle: "Recommended Restaurants",
        restaurantsSubtitle: "The best places to enjoy local gastronomy.",
        ctaTitle: "Ready to taste our flavors?",
        ctaDescription:
          "Book a gastronomic tour and discover the culinary secrets of La Convención",
        ctaAction: "Book Gastronomic Tour",
      },
      about: {
        seoTitle: "Our Team - Explorando la Convención",
        seoDescription:
          "Meet the team behind Explorando la Convención: five people from Quillabamba passionate about their land, culture and responsible tourism.",
        seoKeywords:
          "explorando la convención team, Quillabamba, La Convención tourism, mission, vision, about us",
        title: "Our Team",
        subtitle:
          "We are locals who love our land and work every day so the world can discover the natural and cultural essence of La Convención.",
        heroEyebrow: "Who we are",
        heroTitle: "Our Team",
        heroDescription:
          "We are locals who love our land and work every day so the world can discover the natural and cultural essence of La Convención.",
        missionVisionTitle: "What moves us every day",
        missionTitle: "Our Mission",
        visionTitle: "Our Vision",
        historyTitle: "Our Story",
        valuesTitle: "Our Values",
        valuesSubtitle:
          "The principles that guide every decision, every post and every experience we share.",
        teamTitle: "The people behind the portal",
        teamSubtitle:
          "Five people from Quillabamba with different skills and one goal: put La Convención on the map.",
        ctaTitle: "Want to be part of the team?",
        ctaAction: "Contact us",
      },
    },
  });
}

function createPortugueseTranslations(base: TranslationContent) {
  return mergeContent(base, {
    languageSelector: {
      ariaLabel: "Alterar idioma",
      currentLanguage: "Idioma atual",
      changeTo: "Mudar para",
    },
    navigation: {
      main: [
        { name: "Início", href: "/" },
        { name: "Nossa Equipe", href: "/about" },
        { name: "Destinos", href: "/destinations" },
        { name: "Gastronomia", href: "/gastronomia" },
        { name: "Blog", href: "/blog" },
        { name: "Galeria", href: "/gallery" },
        { name: "Dicas", href: "/tips" },
        { name: "Contato", href: "/contact" },
      ],
      footerMain: [
        { name: "Início", href: "/" },
        { name: "Destinos", href: "/destinations" },
        { name: "Galeria", href: "/gallery" },
        { name: "Dicas de viagem", href: "/tips" },
        { name: "Contato", href: "/contact" },
      ],
      footerInfo: [
        { name: "Nossa Equipe", href: "/about" },
        { name: "Política de privacidade", href: "/privacy" },
        { name: "Termos e condições", href: "/terms" },
      ],
    },
    navbar: {
      purpose: "Portal turístico e cultural de La Convención",
      followUs: "Siga-nos:",
      mainNavLabel: "Navegação principal",
      mobileMenuLabel: "Menu de navegação móvel",
      menuTitle: "Menu",
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
      login: "Entrar",
      profile: "Meu perfil",
      notifications: "Minhas notificações",
      logout: "Sair",
      socialLabels: {
        facebook: "Siga-nos no Facebook",
        instagram: "Siga-nos no Instagram",
        youtube: "Siga-nos no YouTube",
      },
    },
    footer: {
      description:
        "Portal informativo dedicado a mostrar a riqueza natural, cultural e turística da província de La Convención, Cusco. Explore destinos, dicas e experiências únicas para viajantes e curiosos.",
      navigationTitle: "Navegação",
      infoTitle: "Informação",
      followTitle: "Siga-nos",
      rights: "Todos os direitos reservados.",
      developedBy: "Desenvolvido por",
    },
    common: {
      all: "Todos",
      viewMore: "Ver mais",
      readArticle: "Ler artigo",
      article: "Artigo",
      noCategoryArticles: "Não há artigos nesta categoria.",
      noSearchResults: "Nenhum artigo corresponde à sua busca.",
      searchArticles: "Buscar artigos...",
      posts: "Publicações",
      role: "Função:",
    },
    pages: {
      home: {
        hero: {
          titlePrefix: "Descubra a magia de",
          description:
            "Informação clara para descobrir natureza, cultura e sabores locais no coração acolhedor de Cusco.",
          primaryCta: "Explorar",
          secondaryCta: "Ver Galeria",
        },
        sections: {
          portal: { title: "Explore o portal" },
          planningInfo: { title: "Informações para planejar" },
          highlights: { title: "Destaques de La Convención" },
          stats: { title: "A província em resumo" },
          posts: { title: "Últimas publicações", action: "Ver blog" },
          visit: { title: "Prepare sua visita" },
          faq: { title: "Perguntas frequentes" },
          location: { title: "Encontre-nos" },
        },
        ui: {
          explore: "Explorar",
          step: "Passo",
          viewDetail: "Ver detalhe",
          previous: "Item anterior",
          next: "Próximo item",
          viewHighlight: "Ver destaque",
          readPosts: "Ler publicações",
          featuredPosts: "Publicações em destaque",
          mapTitle: "Localização de Quillabamba",
        },
      },
      destinations: { title: "Todos os Destinos" },
      gallery: {
        title: "Galeria de Fotos",
        ctaAction: "Siga-nos no Instagram",
      },
      tips: {
        title: "Dicas de Viagem",
        moreHelpTitle: "Precisa de mais ajuda?",
        subscribe: "Inscrever-se",
      },
      contact: {
        title: "Contato",
        infoTitle: "Informações de Contato",
        formTitle: "Envie uma Mensagem",
        submit: "Enviar Mensagem",
        submitting: "Enviando...",
      },
      blog: {
        postsTitle: "Publicações",
        newsletterTitle: "Inscreva-se no Nosso Newsletter",
        subscribe: "Inscrever-me",
        subscribing: "Inscrevendo...",
      },
      gastronomy: {
        title: "Gastronomia",
        heroTitle: "Gastronomia",
        dishesTitle: "Pratos Típicos",
        restaurantsTitle: "Restaurantes Recomendados",
      },
      about: {
        title: "Nossa Equipe",
        heroEyebrow: "Quem somos",
        heroTitle: "Nossa Equipe",
        missionTitle: "Nossa Missão",
        visionTitle: "Nossa Visão",
        historyTitle: "Nossa História",
        valuesTitle: "Nossos Valores",
        ctaAction: "Contate-nos",
      },
    },
  });
}

function createFrenchTranslations(base: TranslationContent) {
  return mergeContent(base, {
    languageSelector: {
      ariaLabel: "Changer de langue",
      currentLanguage: "Langue actuelle",
      changeTo: "Passer en",
    },
    navigation: {
      main: [
        { name: "Accueil", href: "/" },
        { name: "Notre Équipe", href: "/about" },
        { name: "Destinations", href: "/destinations" },
        { name: "Gastronomie", href: "/gastronomia" },
        { name: "Blog", href: "/blog" },
        { name: "Galerie", href: "/gallery" },
        { name: "Conseils", href: "/tips" },
        { name: "Contact", href: "/contact" },
      ],
      footerMain: [
        { name: "Accueil", href: "/" },
        { name: "Destinations", href: "/destinations" },
        { name: "Galerie", href: "/gallery" },
        { name: "Conseils de voyage", href: "/tips" },
        { name: "Contact", href: "/contact" },
      ],
      footerInfo: [
        { name: "Notre Équipe", href: "/about" },
        { name: "Politique de confidentialité", href: "/privacy" },
        { name: "Conditions générales", href: "/terms" },
      ],
    },
    navbar: {
      purpose: "Portail touristique et culturel de La Convención",
      followUs: "Suivez-nous :",
      mainNavLabel: "Navigation principale",
      mobileMenuLabel: "Menu de navigation mobile",
      menuTitle: "Menu",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
      login: "Se connecter",
      profile: "Mon profil",
      notifications: "Mes notifications",
      logout: "Se déconnecter",
      socialLabels: {
        facebook: "Suivez-nous sur Facebook",
        instagram: "Suivez-nous sur Instagram",
        youtube: "Suivez-nous sur YouTube",
      },
    },
    footer: {
      description:
        "Portail informatif dédié à la richesse naturelle, culturelle et touristique de la province de La Convención, Cusco. Explorez des destinations, des conseils et des expériences uniques.",
      navigationTitle: "Navigation",
      infoTitle: "Information",
      followTitle: "Suivez-nous",
      rights: "Tous droits réservés.",
      developedBy: "Développé par",
    },
    common: {
      all: "Tous",
      viewMore: "Voir plus",
      readArticle: "Lire l’article",
      article: "Article",
      noCategoryArticles: "Il n’y a pas d’articles dans cette catégorie.",
      noSearchResults: "Aucun article ne correspond à votre recherche.",
      searchArticles: "Rechercher des articles...",
      posts: "Publications",
      role: "Rôle :",
    },
    pages: {
      home: {
        hero: {
          titlePrefix: "Découvrez la magie de",
          description:
            "Des informations claires pour découvrir la nature, la culture et les saveurs locales au coeur chaleureux de Cusco.",
          primaryCta: "Explorer les destinations",
          secondaryCta: "Voir la galerie",
        },
        sections: {
          portal: { title: "Explorer le portail" },
          planningInfo: { title: "Informations pour planifier" },
          highlights: { title: "Temps forts de La Convención" },
          stats: { title: "La province en bref" },
          posts: { title: "Dernières publications", action: "Voir le blog" },
          visit: { title: "Préparez votre visite" },
          faq: { title: "Questions fréquentes" },
          location: { title: "Nous trouver" },
        },
        ui: {
          explore: "Explorer",
          step: "Étape",
          viewDetail: "Voir le détail",
          previous: "Élément précédent",
          next: "Élément suivant",
          viewHighlight: "Voir le temps fort",
          readPosts: "Lire les publications",
          featuredPosts: "Publications à la une",
          mapTitle: "Localisation de Quillabamba",
        },
      },
      destinations: { title: "Toutes les Destinations" },
      gallery: {
        title: "Galerie Photo",
        ctaAction: "Suivez-nous sur Instagram",
      },
      tips: {
        title: "Conseils de Voyage",
        moreHelpTitle: "Besoin de plus d’aide ?",
        subscribe: "S’abonner",
      },
      contact: {
        title: "Contact",
        infoTitle: "Informations de Contact",
        formTitle: "Envoyez-nous un Message",
        submit: "Envoyer le Message",
        submitting: "Envoi...",
      },
      blog: {
        postsTitle: "Publications",
        newsletterTitle: "Abonnez-vous à Notre Newsletter",
        subscribe: "M’abonner",
        subscribing: "Inscription...",
      },
      gastronomy: {
        title: "Gastronomie",
        heroTitle: "Gastronomie",
        dishesTitle: "Plats Typiques",
        restaurantsTitle: "Restaurants Recommandés",
      },
      about: {
        title: "Notre Équipe",
        heroEyebrow: "Qui sommes-nous",
        heroTitle: "Notre Équipe",
        missionTitle: "Notre Mission",
        visionTitle: "Notre Vision",
        historyTitle: "Notre Histoire",
        valuesTitle: "Nos Valeurs",
        ctaAction: "Contactez-nous",
      },
    },
  });
}

type CategoryOption = {
  id: string;
  label: string;
};

type HomeLink = {
  to: string;
  title: string;
  description: string;
};

type HomeHighlight = HomeLink & {
  image: string;
  label: string;
  meta: string;
};

type HomeStat = {
  value: string;
  label: string;
  description: string;
};

type HomeFaq = {
  question: string;
  answer: string;
};

type HomeContent = {
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  hero: {
    titlePrefix: string;
    titleHighlight: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  sections: {
    portal: { title: string; description: string };
    planningInfo: { title: string; description: string };
    highlights: { title: string; description: string };
    stats: { title: string; description: string };
    posts: { title: string; description: string; action: string };
    visit: { title: string; description: string };
    faq: { title: string; description: string };
    location: { title: string; description: string };
  };
  portalLinks: HomeLink[];
  highlights: HomeHighlight[];
  stats: HomeStat[];
  planningSteps: HomeLink[];
  portalPillars: HomeLink[];
  identity: {
    eyebrow: string;
    title: string;
    description: string;
  };
  faqs: HomeFaq[];
  locationCards: HomeLink[];
  ui: {
    explore: string;
    step: string;
    viewDetail: string;
    previous: string;
    next: string;
    viewHighlight: string;
    readPosts: string;
    featuredPosts: string;
    mapTitle: string;
  };
};

type PageBasics = {
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  title: string;
  subtitle: string;
};

export type TranslationContent = {
  languageSelector: {
    ariaLabel: string;
    currentLanguage: string;
    changeTo: string;
  };
  navigation: {
    main: NavigationItem[];
    footerMain: NavigationItem[];
    footerInfo: NavigationItem[];
  };
  navbar: {
    locationShort: string;
    purpose: string;
    followUs: string;
    mainNavLabel: string;
    mobileMenuLabel: string;
    menuTitle: string;
    openMenu: string;
    closeMenu: string;
    login: string;
    profile: string;
    notifications: string;
    logout: string;
    socialLabels: {
      facebook: string;
      instagram: string;
      youtube: string;
    };
  };
  footer: {
    logoAlt: string;
    description: string;
    navigationTitle: string;
    infoTitle: string;
    followTitle: string;
    rights: string;
    developedBy: string;
  };
  common: {
    all: string;
    viewMore: string;
    readArticle: string;
    article: string;
    noCategoryArticles: string;
    noSearchResults: string;
    searchArticles: string;
    posts: string;
    role: string;
  };
  pages: {
    home: HomeContent;
    destinations: PageBasics & {
      categories: CategoryOption[];
      posts: Post[];
    };
    gallery: PageBasics & {
      images: GalleryImage[];
      ctaText: string;
      ctaAction: string;
    };
    tips: PageBasics & {
      items: TipCategory[];
      moreHelpTitle: string;
      moreHelpDescription: string;
      emailPlaceholder: string;
      subscribe: string;
    };
    contact: PageBasics & {
      infoTitle: string;
      formTitle: string;
      requiredNote: string;
      labels: {
        name: string;
        email: string;
        phone: string;
        office: string;
        social: string;
        subject: string;
        message: string;
      };
      placeholders: {
        name: string;
        email: string;
        subject: string;
        message: string;
      };
      subjects: CategoryOption[];
      validation: {
        name: string;
        email: string;
        subject: string;
        message: string;
        review: string;
        success: string;
        failure: string;
      };
      helper: string;
      submit: string;
      submitting: string;
      socialLabels: {
        facebook: string;
        instagram: string;
        youtube: string;
      };
    };
    blog: PageBasics & {
      heroTitle: string;
      heroSubtitle: string;
      categories: CategoryOption[];
      posts: BlogPost[];
      postsTitle: string;
      postsSubtitle: string;
      newsletterTitle: string;
      newsletterDescription: string;
      emailPlaceholder: string;
      subscribe: string;
      subscribing: string;
      invalidEmail: string;
      success: string;
    };
    gastronomy: PageBasics & {
      heroTitle: string;
      heroSubtitle: string;
      introTitle: string;
      introParagraphs: string[];
      dishesTitle: string;
      dishesSubtitle: string;
      dishes: Dish[];
      coffeeTitle: string;
      coffeeParagraphs: string[];
      coffeeAction: string;
      restaurantsTitle: string;
      restaurantsSubtitle: string;
      restaurants: Restaurant[];
      ctaTitle: string;
      ctaDescription: string;
      ctaAction: string;
    };
    about: PageBasics & {
      heroEyebrow: string;
      heroTitle: string;
      heroDescription: string;
      stats: StatItem[];
      missionVisionTitle: string;
      missionTitle: string;
      missionDescription: string;
      visionTitle: string;
      visionDescription: string;
      historyTitle: string;
      historyParagraphs: string[];
      valuesTitle: string;
      valuesSubtitle: string;
      values: ValueItem[];
      teamTitle: string;
      teamSubtitle: string;
      teamMembers: TeamMember[];
      ctaTitle: string;
      ctaDescription: string;
      ctaAction: string;
    };
  };
};



const blogPostsMeta = [
  {
    id: 1,
    image: "/images/destinations/pueblo-magico.jpg",
    author: "María Rodríguez",
  },
  {
    id: 2,
    image: "/images/destinations/andes-trekking.jpg",
    author: "Carlos Mendoza",
  },
  { id: 3, image: "/images/gallery/fotografia.jpg", author: "Ana Silva" },
  {
    id: 4,
    image: "/images/gallery/comida-asiatica.jpg",
    author: "María Rodríguez",
  },
  {
    id: 5,
    image: "/images/destinations/pueblo-magico.jpg",
    author: "Carlos Mendoza",
  },
  { id: 6, image: "/images/trips/presupuesto.jpg", author: "Ana Silva" },
] as const;

const dishMeta = [
  { id: 1, image: "/images/gallery/comida-asiatica.jpg" },
  { id: 2, image: "/images/gallery/fotografia.jpg" },
  { id: 3, image: "/images/destinations/pueblo-magico.jpg" },
  { id: 4, image: "/images/trips/presupuesto.jpg" },
  { id: 5, image: "/images/gallery/comida-asiatica.jpg" },
  { id: 6, image: "/images/destinations/andes-trekking.jpg" },
] as const;

const restaurantMeta = [
  { id: 1, image: "/images/destinations/pueblo-magico.jpg", rating: 4.8 },
  { id: 2, image: "/images/gallery/fotografia.jpg", rating: 4.9 },
  { id: 3, image: "/images/gallery/comida-asiatica.jpg", rating: 4.7 },
] as const;

const galleryMeta = [
  { id: 1, src: "/images/gallery/fotografia.jpg" },
  { id: 2, src: "/images/gallery/playa.jpg" },
  { id: 3, src: "/images/gallery/ciudad.jpg" },
  { id: 4, src: "/images/gallery/desierto.jpg" },
  { id: 5, src: "/images/gallery/bosque.jpg" },
  { id: 6, src: "/images/gallery/aurora.jpg" },
] as const;

// ── Destinations-specific posts (50 items: 15 Destinos, 5 Consejos, 10 Gastronomía, 10 Aventura, 10 Fotografía) ──
const destinationsPostsMeta = [
  { id: 1,  image: "/images/destinations/pueblo-magico.jpg", author: "Mariela Ramos",     date: "2024-04-01", featured: true },
  { id: 2,  image: "/images/destinations/andes-trekking.jpg", author: "Carlos Huamán",    date: "2024-04-03" },
  { id: 3,  image: "/images/gallery/fotografia.jpg",          author: "Ana Paredes",      date: "2024-04-05" },
  { id: 4,  image: "/images/gallery/comida-asiatica.jpg",     author: "Luis Fernández",   date: "2024-04-07" },
  { id: 5,  image: "/images/trips/presupuesto.jpg",           author: "Equipo Editorial", date: "2024-04-09" },
  { id: 6,  image: "/images/destinations/pueblo-magico.jpg",  author: "Mariela Ramos",    date: "2024-04-11" },
  { id: 7,  image: "/images/destinations/andes-trekking.jpg", author: "Carlos Huamán",    date: "2024-04-13" },
  { id: 8,  image: "/images/gallery/fotografia.jpg",          author: "Ana Paredes",      date: "2024-04-15" },
  { id: 9,  image: "/images/gallery/comida-asiatica.jpg",     author: "Luis Fernández",   date: "2024-04-17" },
  { id: 10, image: "/images/destinations/pueblo-magico.jpg",  author: "Equipo Editorial", date: "2024-04-19" },
  { id: 11, image: "/images/destinations/andes-trekking.jpg", author: "Mariela Ramos",    date: "2024-04-21" },
  { id: 12, image: "/images/gallery/fotografia.jpg",          author: "Carlos Huamán",    date: "2024-04-23" },
  { id: 13, image: "/images/gallery/comida-asiatica.jpg",     author: "Ana Paredes",      date: "2024-04-25" },
  { id: 14, image: "/images/destinations/pueblo-magico.jpg",  author: "Luis Fernández",   date: "2024-04-27" },
  { id: 15, image: "/images/destinations/andes-trekking.jpg", author: "Equipo Editorial", date: "2024-04-29" },
  { id: 16, image: "/images/trips/presupuesto.jpg",           author: "Mariela Ramos",    date: "2024-05-01" },
  { id: 17, image: "/images/gallery/comida-asiatica.jpg",     author: "Carlos Huamán",    date: "2024-05-03" },
  { id: 18, image: "/images/trips/presupuesto.jpg",           author: "Ana Paredes",      date: "2024-05-05" },
  { id: 19, image: "/images/destinations/pueblo-magico.jpg",  author: "Luis Fernández",   date: "2024-05-07" },
  { id: 20, image: "/images/destinations/andes-trekking.jpg", author: "Equipo Editorial", date: "2024-05-09" },
  { id: 21, image: "/images/gallery/comida-asiatica.jpg",     author: "Ana Paredes",      date: "2024-05-11" },
  { id: 22, image: "/images/destinations/pueblo-magico.jpg",  author: "Mariela Ramos",    date: "2024-05-13" },
  { id: 23, image: "/images/gallery/comida-asiatica.jpg",     author: "Carlos Huamán",    date: "2024-05-15" },
  { id: 24, image: "/images/gallery/fotografia.jpg",          author: "Ana Paredes",      date: "2024-05-17" },
  { id: 25, image: "/images/trips/presupuesto.jpg",           author: "Luis Fernández",   date: "2024-05-19" },
  { id: 26, image: "/images/gallery/comida-asiatica.jpg",     author: "Equipo Editorial", date: "2024-05-21" },
  { id: 27, image: "/images/gallery/fotografia.jpg",          author: "Mariela Ramos",    date: "2024-05-23" },
  { id: 28, image: "/images/gallery/comida-asiatica.jpg",     author: "Carlos Huamán",    date: "2024-05-25" },
  { id: 29, image: "/images/destinations/pueblo-magico.jpg",  author: "Ana Paredes",      date: "2024-05-27" },
  { id: 30, image: "/images/gallery/comida-asiatica.jpg",     author: "Luis Fernández",   date: "2024-05-29" },
  { id: 31, image: "/images/destinations/andes-trekking.jpg", author: "Carlos Huamán",    date: "2024-06-01" },
  { id: 32, image: "/images/destinations/andes-trekking.jpg", author: "Mariela Ramos",    date: "2024-06-03" },
  { id: 33, image: "/images/destinations/andes-trekking.jpg", author: "Luis Fernández",   date: "2024-06-05" },
  { id: 34, image: "/images/gallery/fotografia.jpg",          author: "Equipo Editorial", date: "2024-06-07" },
  { id: 35, image: "/images/destinations/andes-trekking.jpg", author: "Carlos Huamán",    date: "2024-06-09" },
  { id: 36, image: "/images/destinations/pueblo-magico.jpg",  author: "Mariela Ramos",    date: "2024-06-11" },
  { id: 37, image: "/images/destinations/andes-trekking.jpg", author: "Ana Paredes",      date: "2024-06-13" },
  { id: 38, image: "/images/gallery/fotografia.jpg",          author: "Luis Fernández",   date: "2024-06-15" },
  { id: 39, image: "/images/trips/presupuesto.jpg",           author: "Equipo Editorial", date: "2024-06-17" },
  { id: 40, image: "/images/destinations/andes-trekking.jpg", author: "Carlos Huamán",    date: "2024-06-19" },
  { id: 41, image: "/images/gallery/fotografia.jpg",          author: "Ana Paredes",      date: "2024-06-21" },
  { id: 42, image: "/images/gallery/comida-asiatica.jpg",     author: "Mariela Ramos",    date: "2024-06-23" },
  { id: 43, image: "/images/gallery/fotografia.jpg",          author: "Carlos Huamán",    date: "2024-06-25" },
  { id: 44, image: "/images/destinations/pueblo-magico.jpg",  author: "Luis Fernández",   date: "2024-06-27" },
  { id: 45, image: "/images/destinations/andes-trekking.jpg", author: "Equipo Editorial", date: "2024-06-29" },
  { id: 46, image: "/images/gallery/fotografia.jpg",          author: "Mariela Ramos",    date: "2024-07-01" },
  { id: 47, image: "/images/gallery/fotografia.jpg",          author: "Carlos Huamán",    date: "2024-07-03" },
  { id: 48, image: "/images/destinations/pueblo-magico.jpg",  author: "Ana Paredes",      date: "2024-07-05" },
  { id: 49, image: "/images/gallery/fotografia.jpg",          author: "Luis Fernández",   date: "2024-07-07" },
  { id: 50, image: "/images/destinations/andes-trekking.jpg", author: "Equipo Editorial", date: "2024-07-09" },
] as const;

const es: TranslationContent = {
  languageSelector: {
    ariaLabel: "Cambiar idioma",
    currentLanguage: "Idioma actual",
    changeTo: "Cambiar a",
  },
  navigation: {
    main: [
      { name: "Inicio", href: "/" },
      { name: "Nuestro Equipo", href: "/about" },
      { name: "Destinos", href: "/destinations" },
      { name: "Gastronomía", href: "/gastronomia" },
      { name: "Blog", href: "/blog" },
      { name: "Galería", href: "/gallery" },
      { name: "Tips", href: "/tips" },
      { name: "Contacto", href: "/contact" },
    ],
    footerMain: [
      { name: "Inicio", href: "/" },
      { name: "Destinos", href: "/destinations" },
      { name: "Galería", href: "/gallery" },
      { name: "Consejos de viaje", href: "/tips" },
      { name: "Contacto", href: "/contact" },
    ],
    footerInfo: [
      { name: "Nuestro Equipo", href: "/about" },
      { name: "Política de privacidad", href: "/privacy" },
      { name: "Términos y condiciones", href: "/terms" },
    ],
  },
  navbar: {
    locationShort: "Quillabamba",
    purpose: "Portal turístico y cultural de La Convención",
    followUs: "Síguenos:",
    mainNavLabel: "Navegación principal",
    mobileMenuLabel: "Menú de navegación móvil",
    menuTitle: "Menú",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    login: "Iniciar sesión",
    profile: "Mi perfil",
    notifications: "Mis notificaciones",
    logout: "Cerrar sesión",
    socialLabels: {
      facebook: "Síguenos en Facebook",
      instagram: "Síguenos en Instagram",
      youtube: "Síguenos en YouTube",
    },
  },
  footer: {
    logoAlt: "Logo Explorando La Convención",
    description:
      "Portal informativo dedicado a mostrar la riqueza natural, cultural y turística de la provincia de La Convención, Cusco. Explora destinos, consejos y experiencias únicas para viajeros y curiosos.",
    navigationTitle: "Navegación",
    infoTitle: "Información",
    followTitle: "Síguenos",
    rights: "Todos los derechos reservados.",
    developedBy: "Desarrollado por",
  },
  common: {
    all: "Todos",
    viewMore: "Ver más",
    readArticle: "Leer artículo",
    article: "Artículo",
    noCategoryArticles: "No hay artículos en esta categoría.",
    noSearchResults:
      "No se encontraron artículos que coincidan con tu búsqueda.",
    searchArticles: "Buscar artículos...",
    posts: "Publicaciones",
    role: "Rol:",
  },
  pages: {
    home: {
      seo: {
        title:
          "Explorando la Convención - Blog de Viajes y Turismo en Perú | Guías Completas",
        description:
          "Descubre los mejores destinos turísticos de La Convención, Cusco y Perú. Guías de viaje, consejos prácticos, gastronomía y experiencias únicas de aventura.",
        keywords:
          "La Convención, turismo Cusco, viajes Perú, destinos turísticos, blog de viajes, guías de viaje, aventuras, gastronomía peruana",
      },
      hero: {
        titlePrefix: "Descubre la magia de",
        titleHighlight: "La Convención",
        description:
          "Información clara para descubrir naturaleza, cultura y sabores locales en el corazón cálido de Cusco.",
        primaryCta: "Explorar",
        secondaryCta: "Ver Galería",
      },
      sections: {
        portal: {
          title: "Explora el portal",
          description:
            "Encuentra rápido las secciones principales para conocer, planificar y consultar información útil de La Convención.",
        },
        planningInfo: {
          title: "Información para planificar",
          description:
            "Datos de apoyo para revisar clima, referencia de cambio y mensajes útiles antes de organizar tu visita.",
        },
        highlights: {
          title: "Destacados de La Convención",
          description:
            "Un resumen visual con temas clave para empezar a recorrer el portal con mejor contexto.",
        },
        stats: {
          title: "La provincia en breve",
          description:
            "Cifras referenciales presentadas como guía inicial para entender la escala natural y cultural del territorio.",
        },
        posts: {
          title: "Últimas publicaciones",
          description:
            "Guías y artículos seleccionados para ampliar la información antes de tu visita.",
          action: "Ver blog",
        },
        visit: {
          title: "Prepara tu visita",
          description:
            "Tres pasos simples para pasar de la inspiración a una ruta bien organizada.",
        },
        faq: {
          title: "Preguntas frecuentes",
          description:
            "Respuestas rápidas para resolver dudas comunes antes de explorar las secciones del portal.",
        },
        location: {
          title: "Encuéntranos",
          description:
            "Referencia principal para ubicar Quillabamba y planificar el acceso a la provincia.",
        },
      },
      portalLinks: [
        {
          to: "/destinations",
          title: "Destinos",
          description:
            "Rutas naturales, miradores, cascadas, caminos escénicos y puntos de interés para organizar tu próxima visita.",
        },
        {
          to: "/gastronomia",
          title: "Gastronomía",
          description:
            "Café, cacao, productos locales y sabores de selva alta para descubrir la identidad culinaria de la provincia.",
        },
        {
          to: "/tips",
          title: "Consejos",
          description:
            "Clima, transporte, seguridad, presupuesto y recomendaciones prácticas para viajar con más confianza.",
        },
        {
          to: "/blog",
          title: "Blog",
          description:
            "Guías, historias, novedades y experiencias locales para planificar mejor cada recorrido por La Convención.",
        },
        {
          to: "/gallery",
          title: "Galería",
          description:
            "Imágenes de paisajes, cultura, rutas y experiencias para inspirar tu próxima visita con más contexto.",
        },
        {
          to: "/about",
          title: "Cultura",
          description:
            "Historia, identidad, festividades, memoria local y valores que dan forma a la vida de la provincia.",
        },
      ],
      highlights: [
        {
          title: "Quillabamba como punto de partida",
          description:
            "Una base ideal para organizar recorridos por la provincia, conectar con servicios locales y acercarse a rutas naturales.",
          image: "/images/destinations/pueblo-magico.jpg",
          to: "/destinations",
          label: "Ver destinos",
          meta: "Rutas y orientación",
        },
        {
          title: "Café, cacao y sabores locales",
          description:
            "Productos emblemáticos que ayudan a entender la identidad agrícola y gastronómica de La Convención.",
          image: "/images/gallery/comida-asiatica.jpg",
          to: "/gastronomia",
          label: "Explorar gastronomía",
          meta: "Sabores regionales",
        },
        {
          title: "Naturaleza para visitar con calma",
          description:
            "Bosques, miradores y espacios verdes que conviene recorrer con información previa y respeto por el entorno.",
          image: "/images/gallery/fotografia.jpg",
          to: "/gallery",
          label: "Ver galería",
          meta: "Paisajes y cultura",
        },
      ],
      stats: [
        {
          value: "30+",
          label: "distritos y sectores",
          description:
            "Territorios con identidad propia y rutas por descubrir.",
        },
        {
          value: "50+",
          label: "atractivos referenciales",
          description:
            "Cascadas, miradores, espacios culturales y rutas verdes.",
        },
        {
          value: "365",
          label: "días para planificar",
          description: "Clima cálido durante buena parte del año.",
        },
      ],
      planningSteps: [
        {
          to: "/tips",
          title: "Antes de viajar",
          description:
            "Revisa clima, tiempos de traslado, presupuesto y servicios disponibles.",
        },
        {
          to: "/destinations",
          title: "Durante el recorrido",
          description:
            "Prioriza rutas señalizadas, consulta orientación local y cuida los espacios naturales.",
        },
        {
          to: "/contact",
          title: "Necesitas ayuda",
          description:
            "Encuentra referencias de ubicación y canales para seguir explorando el portal.",
        },
      ],
      portalPillars: [
        {
          to: "/",
          title: "Información organizada",
          description:
            "Secciones pensadas para consultar rápido sin perder contexto.",
        },
        {
          to: "/",
          title: "Turismo responsable",
          description:
            "Recomendaciones para cuidar rutas, comunidades y espacios naturales.",
        },
        {
          to: "/",
          title: "Planificación clara",
          description:
            "Datos prácticos para revisar antes de decidir una ruta o actividad.",
        },
      ],
      identity: {
        eyebrow: "Portal informativo",
        title:
          "Información clara para recorrer La Convención con más contexto.",
        description:
          "Reunimos rutas, consejos, cultura, publicaciones y datos útiles en una experiencia ordenada para visitantes, vecinos y personas que quieren conocer mejor la provincia.",
      },
      faqs: [
        {
          question: "¿Cuál es la mejor época para visitar La Convención?",
          answer:
            "La Convención se puede visitar durante gran parte del año gracias a su clima cálido y a la variedad de actividades disponibles. Para caminatas, miradores, cataratas y rutas de naturaleza, conviene revisar el pronóstico antes de salir y planificar con mayor cuidado entre los meses de lluvia. Si buscas recorridos más tranquilos, prioriza días secos, salidas temprano y siempre confirma el estado de las vías locales.",
        },
        {
          question: "¿Desde dónde se suele iniciar el recorrido?",
          answer:
            "Quillabamba suele funcionar como punto principal de referencia porque concentra servicios, transporte, hospedajes, alimentación y conexión hacia distintos atractivos de la provincia. Desde allí es más sencillo organizar visitas cercanas, consultar rutas locales y ajustar tiempos según el clima, el presupuesto y el tipo de experiencia que quieras realizar.",
        },
        {
          question: "¿Qué información debería revisar antes de salir?",
          answer:
            "Antes de salir revisa clima, distancias reales, horarios de transporte, presupuesto disponible, estado de rutas y recomendaciones básicas de seguridad. También es útil confirmar si el destino requiere guía, entrada, reserva previa o movilidad especial. Llevar agua, efectivo, batería suficiente y datos de contacto locales mejora mucho la experiencia, especialmente en recorridos fuera de la zona urbana.",
        },
        {
          question: "¿El portal solo muestra destinos turísticos?",
          answer:
            "No. El portal también reúne gastronomía, cultura, consejos prácticos, publicaciones, referencias de ubicación y datos útiles para entender mejor la provincia. La idea es que no solo encuentres lugares para visitar, sino también contexto para valorar la identidad local, planificar con criterio y descubrir experiencias vinculadas a la vida cotidiana de La Convención.",
        },
      ],
      locationCards: [
        {
          to: "/destinations",
          title: "Ubicación",
          description:
            "Quillabamba, capital de la provincia de La Convención, región Cusco, Perú.",
        },
        {
          to: "/tips",
          title: "Acceso",
          description:
            "Aproximadamente 4 a 5 horas por vía terrestre desde la ciudad del Cusco, según ruta y clima.",
        },
        {
          to: "/contact",
          title: "Referencia útil",
          description:
            "Usa el mapa como punto inicial para organizar rutas, tiempos y servicios.",
        },
      ],
      ui: {
        explore: "Explorar",
        step: "Paso",
        viewDetail: "Ver detalle",
        previous: "Elemento anterior",
        next: "Elemento siguiente",
        viewHighlight: "Ver destacado",
        readPosts: "Leer publicaciones",
        featuredPosts: "Publicaciones destacadas",
        mapTitle: "Ubicación Quillabamba",
      },
    },
    destinations: {
      seoTitle: "Destinos Turísticos de La Convención - Guía Completa",
      seoDescription:
        "Explora todos los destinos turísticos de La Convención: naturaleza, aventura, cultura y gastronomía en el corazón de Cusco.",
      seoKeywords:
        "destinos La Convención, turismo Cusco, lugares turísticos Perú, qué visitar Quillabamba",
      title: "Todos los Destinos",
      subtitle:
        "Explora nuestra colección completa de artículos sobre viajes, destinos y experiencias en La Convención.",
      categories: [
        { id: "all", label: "Todos" },
        { id: "destinations", label: "Destinos" },
        { id: "tips", label: "Consejos" },
        { id: "gastronomy", label: "Gastronomía" },
        { id: "adventure", label: "Aventura" },
        { id: "photography", label: "Fotografía" },
      ],
      posts: destinationsPostsMeta.map((post, index) => ({
        ...post,
        title: [
          // Destinos (0-14)
          "Siete Tinajas",
          "Pongo de Mainique",
          "Balneario de Samboray",
          "Catarata de Illapani",
          "Baños Termales de Cocalmayo",
          "Echarati: Valle del Café",
          "Complejo Arqueológico de Vilcabamba",
          "Santuario Nacional Megantoni",
          "Ivochote: Puerta a la Selva",
          "Maranura: Haciendas Productoras",
          "Catarata de Yanay",
          "Plaza de Armas de Quillabamba",
          "Kiteni: Grutas y Amazonía",
          "Yanatile: Entre Andes y Amazonía",
          "Miradores de Quillabamba",
          // Consejos (15-19)
          "Protección contra Insectos y Sol",
          "Equipamiento Estratégico para la Selva",
          "Gestión de Efectivo en la Región",
          "Mejor Temporada para Visitar",
          "Prevención de Salud en la Selva",
          // Gastronomía (20-29)
          "Chicharrón Quillabambino",
          "Café de Especialidad de Altura",
          "Cacao y Chocolate Chuncho",
          "Pescado de Río: Paco y Doncella",
          "Jugo de Caña y Cañazo",
          "Frutas Tropicales Frescas",
          "Helados Artesanales de la Plaza",
          "Caldo de Gallina Andino",
          "Empanadas Dulces y Saladas",
          "Humitas de Choclo",
          // Aventura (30-39)
          "Canotaje y Rafting en el Urubamba",
          "Trekking a Vilcabamba",
          "Navegación en el Pongo de Mainique",
          "Zipline y Tirolesa en Santa Teresa",
          "Ciclismo de Montaña Downhill",
          "Senderismo a las Siete Tinajas",
          "Canyoning: Barranquismo en Cascadas",
          "Exploración de Selva Virgen en Megantoni",
          "Rutas en Cuatrimoto por los Cafetales",
          "Camping Nocturno en Cocalmayo",
          // Fotografía (40-49)
          "Larga Exposición en Cataratas",
          "Documental de la Ruta del Café",
          "Aves y Fauna en Megantoni",
          "Miradores al Atardecer del Urubamba",
          "Arquitectura Inca en Espíritu Pampa",
          "Street Photography en los Mercados",
          "Astrofotografía en Vilcabamba",
          "Retratos Culturales Machiguengas",
          "Fotografía Macro de Orquídeas",
          "Acción en los Rápidos del Pongo",
        ][index],
        excerpt: [
          // Destinos (0-14)
          "Formaciones rocosas naturales creadas por el flujo del agua, ideales para nadar en piscinas naturales de acceso libre.",
          "El cañón más peligroso y espectacular del río Urubamba, rico en biodiversidad endémica y majestuosidad natural.",
          "Zona de recreación a orillas del río, muy popular entre los locales para el descanso y la vida familiar.",
          "Impresionante caída de agua rodeada de exuberante vegetación tropical en el corazón de la selva alta.",
          "Aguas cristalinas y cálidas al aire libre cerca de Machu Picchu. Perfectas para relajarse tras el trekking.",
          "Distrito famoso por su producción cafetalera de especialidad y miradores naturales de gran belleza escénica.",
          "El último refugio de los Incas contra la conquista española, con impresionantes vestigios arqueológicos en la selva.",
          "Área natural protegida con bosques vírgenes, biodiversidad única y comunidades nativas ancestrales intactas.",
          "Puerto fluvial estratégico y punto de partida esencial para adentrarse en la selva profunda amazónica.",
          "Zona agrícola histórica destacada por sus haciendas productoras de té, café de altura y cacao fino de aroma.",
          "Hermosa cascada accesible tras una caminata moderada por senderos selváticos con flora y fauna endémica.",
          "El corazón cultural y comercial de Quillabamba, rodeado de palmeras tropicales y vibrante vida cotidiana.",
          "Poblado exótico con acceso a grutas subterráneas y ecosistemas amazónicos prácticamente intactos.",
          "Valle de paisajes impresionantes que actúa como puente natural entre los paisajes andinos y la Amazonía.",
          "Puntos elevados en la periferia urbana con vistas panorámicas del espectacular valle del río Urubamba.",
          // Consejos (15-19)
          "Lleva repelente con alto porcentaje de DEET y bloqueador solar. El clima tropical y húmedo lo hace indispensable.",
          "Ropa ligera de manga larga para el día y chaqueta impermeable: las lluvias en la ceja de selva son impredecibles.",
          "Lleva efectivo en soles en distritos alejados como Ivochote o Megantoni, donde cajeros y cobertura son nulos.",
          "Prioriza viajar entre mayo y octubre (temporada seca) para evitar deslizamientos y crecidas de ríos.",
          "Consume solo agua embotellada y vacúnate contra fiebre amarilla antes de ingresar a zonas más remotas.",
          // Gastronomía (20-29)
          "Carne de cerdo frita en su propia manteca, servida con yuca cocida y sarsa criolla. Un clásico irresistible.",
          "Reconocido mundialmente, cultivado en altura. Su degustación directa en origen es una experiencia única.",
          "Variedad nativa de cacao fino de aroma, famosa por sus notas frutales y florales excepcionales en el mundo.",
          "Frito o en sudado, pescado fresco extraído del río Urubamba o criaderos locales. Sabor puro de selva alta.",
          "Bebidas tradicionales extraídas de los vastos cañaverales de la provincia. Dulce, refrescante y artesanal.",
          "Degustación de pacay, piña, cítricos, papaya y plátanos directamente de las chacras locales de la zona.",
          "Elaborados con frutas exóticas de la región, muy populares en la Plaza de Armas de Quillabamba.",
          "Plato contundente de herencia andina, consumido habitualmente en los mercados de abastos de la ciudad.",
          "Horneadas artesanalmente con recetas familiares, son un clásico para el desayuno y la merienda local.",
          "Masa de maíz tierno envuelta en su propia hoja y cocinada al vapor. Dulce o salada, siempre deliciosa.",
          // Aventura (30-39)
          "Navegación de rápidos de nivel III y IV en los tramos cercanos a Santa Teresa y Quillabamba. Adrenalina pura.",
          "Rutas de senderismo de varios días explorando los vestigios del último bastión inca en la selva profunda.",
          "Travesía extrema en bote a motor atravesando rápidos peligrosos entre cañones estrechos y verticales.",
          "Descenso por cables de gran altitud cruzando el espectacular valle del río Urubamba en Santa Teresa.",
          "Descenso desde el abra Málaga hasta la ceja de selva, con paisajes que cambian radicalmente a cada kilómetro.",
          "Caminatas cortas pero exigentes con recompensa de nado en piscinas naturales de aguas cristalinas y puras.",
          "Descenso con cuerdas por cascadas y farallones cercanos a Illapani. Adrenalina y naturaleza en estado puro.",
          "Expedición guiada para observación de flora y fauna endémica en uno de los bosques más vírgenes del Perú.",
          "Alquiler de ATVs para recorrer trochas rurales e impresionantes campos cafetaleros de la provincia.",
          "Acampada nocturna al lado de las fuentes termales de Cocalmayo. Una noche de aventura y relajación natural.",
          // Fotografía (40-49)
          "Usa filtros ND en Siete Tinajas o Illapani para lograr el efecto seda en el agua con larga exposición.",
          "Retrata el proceso artesanal del café, enfocándote en las manos de los agricultores y el secado del grano.",
          "Fotografía de fauna con teleobjetivos: guacamayos, gallitos de las rocas y mariposas exóticas de Megantoni.",
          "Captura la Golden Hour sobre el valle del Urubamba desde las partes más altas de la ciudad de Quillabamba.",
          "Fotografía de contrastes entre la piedra inca y la selva devoradora en las ruinas de Espíritu Pampa.",
          "Captura el vibrante color de las frutas tropicales y el movimiento diario de los comerciantes en mercados.",
          "Aprovecha la nula contaminación lumínica en Vilcabamba para capturar la Vía Láctea con total nitidez.",
          "Fotografías de las comunidades nativas Machiguengas cerca del Pongo, siempre con respeto y permiso previo.",
          "Enfócate en la rica variedad de orquídeas e insectos endémicos en los senderos de la ceja de selva.",
          "Usa velocidades de obturación rápidas para congelar el movimiento de los botes en los rápidos del Pongo.",
        ][index],
        content: [
          "Siete Tinajas son formaciones rocosas naturales esculpidas por el flujo constante del río. Sus pozas de agua cristalina permiten el baño natural y son uno de los atractivos más visitados de la zona.",
          "El Pongo de Mainique es un cañón sagrado para las comunidades nativas Machiguengas. Sus rápidos extremos y biodiversidad lo convierten en uno de los lugares más impresionantes del Perú.",
          "El Balneario de Samboray es un espacio recreativo a orillas del río Urubamba, frecuentado por familias locales especialmente en fines de semana y temporada seca.",
          "La Catarata de Illapani cae desde gran altura entre paredes de vegetación tropical. El acceso requiere una caminata moderada pero la recompensa visual es extraordinaria.",
          "Los Baños Termales de Cocalmayo, ubicados en Santa Teresa, ofrecen pozas de agua caliente natural en plena selva. Son ideales para relajarse después del trekking a Machu Picchu.",
          "Echarati es el distrito más extenso de La Convención y uno de los mayores productores de café de especialidad del Perú. Sus haciendas y miradores ofrecen experiencias únicas.",
          "Espíritu Pampa, conocido también como Vilcabamba la Grande, fue el último refugio del Inca Túpac Amaru. Sus ruinas se encuentran cubiertas por la selva en un entorno misterioso.",
          "El Santuario Nacional Megantoni protege una de las zonas de mayor biodiversidad del mundo. Es hogar de comunidades nativas en aislamiento voluntario y especies únicas de flora y fauna.",
          "Ivochote es el principal puerto fluvial desde el que parten las embarcaciones hacia el interior de la selva, incluyendo el Pongo de Mainique y comunidades amazónicas remotas.",
          "Maranura destaca por sus haciendas históricas dedicadas al cultivo de té, café y cacao. Es un destino ideal para el turismo agrícola y la experiencia directa con los productores locales.",
          "La Catarata de Yanay es una hermosa cascada accesible mediante un sendero bien señalizado en la selva alta. Su entorno de vegetación densa y sonidos de la naturaleza es inigualable.",
          "La Plaza de Armas de Quillabamba es el punto de encuentro social de la ciudad. Rodeada de palmeras tropicales, comercios y arquitectura local, representa la vida cotidiana de la capital provincial.",
          "Kiteni es un poblado con acceso a grutas naturales y ecosistemas amazónicos de gran valor. Es punto de partida para expediciones hacia comunidades nativas y áreas remotas de la selva.",
          "Yanatile es un valle que conecta los ecosistemas andinos con la Amazonía. Sus paisajes cambiantes, desde niebla y frío hasta calor selvático, lo convierten en un destino fotográfico único.",
          "Los miradores de Quillabamba, ubicados en las laderas que rodean la ciudad, ofrecen vistas panorámicas del valle del Urubamba y los nevados distantes. El amanecer y el atardecer son espectaculares.",
          "La protección solar e insecticida es fundamental para visitar La Convención. El clima tropical aumenta el riesgo de picaduras y quemaduras. El DEET al 30-50% es el estándar recomendado para la zona.",
          "El equipamiento adecuado garantiza comodidad y seguridad en el clima variable de la ceja de selva. La ropa de manga larga protege de insectos y el sol, mientras que el impermeable es esencial.",
          "La gestión de efectivo es crucial en La Convención. Aunque Quillabamba tiene cajeros y bancos, los distritos más alejados como Ivochote, Megantoni o Echarati no tienen acceso a servicios bancarios.",
          "La temporada seca entre mayo y octubre ofrece las mejores condiciones climáticas para visitar La Convención. Las carreteras están más transitables y el nivel de los ríos permite acceder a más destinos.",
          "La prevención de salud es indispensable antes de visitar áreas remotas de La Convención. La vacuna contra la fiebre amarilla es obligatoria para ingresar a zonas de selva baja y profunda.",
          "El chicharrón quillabambino es el plato estrella de la gastronomía local. Se prepara friendo carne de cerdo en su propia manteca hasta lograr una textura crujiente por fuera y jugosa por dentro.",
          "El café de La Convención es producido en altitudes entre 1200 y 1800 metros sobre el nivel del mar. Sus condiciones únicas de suelo y clima generan tazas de alta complejidad aromática.",
          "El cacao Chuncho es una variedad nativa del Perú que crece en La Convención. Reconocido internacionalmente por su sabor fino y notas frutales y florales, es uno de los mejores cacaos del mundo.",
          "El pescado de río es ingrediente fundamental de la cocina amazónica local. El paco y la doncella se preparan fritos, asados o en sudados con hierbas y vegetales de la zona.",
          "El jugo de caña fresco y el aguardiente (cañazo) son bebidas tradicionales de La Convención. La provincia cuenta con extensos cañaverales que abastecen tanto el consumo local como la producción artesanal.",
          "Las frutas tropicales de La Convención se caracterizan por su frescura y variedad. El pacay, la piña, los cítricos y los plátanos se pueden adquirir directamente de los productores en chacras locales.",
          "Los helados artesanales de la Plaza de Armas son elaborados con frutas de la zona como aguaje, cocona y piña. Son una experiencia gastronómica única que refleja la biodiversidad local.",
          "El caldo de gallina es un plato de herencia andina arraigado en la región. Se prepara con gallina criolla, papas, hierbas aromáticas y ají, siendo muy popular en mercados y restaurantes locales.",
          "Las empanadas quillabambinas se hornean con recetas familiares de generaciones. Las hay de queso, pollo y de dulce con manjar blanco. Son ideales para el desayuno o como merienda cotidiana.",
          "Las humitas de choclo son un plato tradicional andino que se prepara rallando maíz tierno, mezclando con queso y especias, y cociendo al vapor envuelto en las propias hojas del maíz.",
          "El canotaje en el río Urubamba ofrece recorridos de rápidos clasificados entre nivel II y IV según el tramo. Las operadoras certificadas en Santa Teresa y Quillabamba garantizan equipamiento y guías expertos.",
          "El trekking a Vilcabamba es una aventura de tres a cinco días que combina rutas andinas con descenso a la selva. Es uno de los destinos históricos más impresionantes del Perú para los amantes del senderismo.",
          "La navegación por el Pongo de Mainique es una de las experiencias más extremas del Perú. Las embarcaciones locales se abren paso entre rápidos y paredes de roca de hasta 300 metros de altura.",
          "El zipline en Santa Teresa ofrece cables de hasta 700 metros que cruzan el valle del río Urubamba. Es una de las actividades de aventura más populares de la región, con vistas espectaculares.",
          "El ciclismo de montaña desde el abra Málaga combina el frío andino con el calor de la selva en un solo recorrido. El descenso de más de 3000 metros de desnivel es una experiencia única.",
          "El senderismo a las Siete Tinajas es una excursión corta ideal para todos los niveles. El sendero bien señalizado conduce a las formaciones rocosas y piscinas naturales en menos de dos horas.",
          "El canyoning en las cascadas cercanas a Illapani permite descender verticalmente por farallones con cuerdas y arnés. Es una actividad para personas con buena condición física y sin vértigo.",
          "La exploración de Megantoni requiere organización previa, guías locales certificados y equipamiento de selva completo. Es una expedición para aventureros experimentados con respeto por el ecosistema.",
          "Los cuatrimotos recorren caminos rurales entre cafetales, comunidades nativas y miradores naturales. Es una forma activa de conocer el paisaje agrícola y cultural de La Convención.",
          "El camping en Cocalmayo combina la aventura del campamento nocturno con el relax de las termas naturales. La zona cuenta con áreas habilitadas y acceso a servicios básicos para los visitantes.",
          "La técnica de larga exposición captura el movimiento del agua creando un efecto seda visual. Con un trípode estable, filtros ND y apertura pequeña, las cataratas de La Convención ofrecen resultados espectaculares.",
          "El proceso del café de especialidad, desde la cosecha selectiva hasta el tostado artesanal, ofrece un relato visual y humano único. Los agricultores locales son los protagonistas de esta historia.",
          "Megantoni alberga algunas de las especies de aves más raras del mundo. Con paciencia y equipamiento adecuado, es posible fotografiar guacamayos, gallitos de las rocas y más de 400 especies registradas.",
          "Los miradores de Quillabamba ofrecen las condiciones ideales para la fotografía de paisajes. La luz dorada del atardecer sobre el valle del Urubamba crea composiciones de color y profundidad extraordinarias.",
          "Las ruinas de Espíritu Pampa ofrecen contrastes fotográficos únicos entre la arquitectura de piedra inca y la selva que avanza. Las condiciones de luz filtrada entre el dosel arbóreo son especialmente evocadoras.",
          "Los mercados de Quillabamba son escenarios de fotografía documental de alta riqueza visual. Los colores de las frutas tropicales, las expresiones de los comerciantes y el movimiento crean composiciones naturales.",
          "La altitud y el alejamiento de las zonas urbanas convierten a Vilcabamba en uno de los mejores lugares del Perú para la astrofotografía. El cielo austral despejado permite capturar la Vía Láctea completa.",
          "Las comunidades nativas Machiguengas del entorno del Pongo de Mainique preservan tradiciones culturales milenarias. Su fotografía requiere un proceso de acercamiento basado en el respeto y el consentimiento informado.",
          "La biodiversidad de la ceja de selva ofrece oportunidades únicas para la fotografía macro. Las orquídeas silvestres, los insectos y los helechos del sotobosque son sujetos de una belleza extraordinaria.",
          "Fotografiar el canotaje extremo en el Pongo de Mainique requiere velocidades de obturación superiores a 1/1000s. La combinación de agua, adrenalina y el encuadre de los cañones crea imágenes impactantes.",
        ][index],
        category: [
          "Destinos", "Destinos", "Destinos", "Destinos", "Destinos",
          "Destinos", "Destinos", "Destinos", "Destinos", "Destinos",
          "Destinos", "Destinos", "Destinos", "Destinos", "Destinos",
          "Consejos", "Consejos", "Consejos", "Consejos", "Consejos",
          "Gastronomía", "Gastronomía", "Gastronomía", "Gastronomía", "Gastronomía",
          "Gastronomía", "Gastronomía", "Gastronomía", "Gastronomía", "Gastronomía",
          "Aventura", "Aventura", "Aventura", "Aventura", "Aventura",
          "Aventura", "Aventura", "Aventura", "Aventura", "Aventura",
          "Fotografía", "Fotografía", "Fotografía", "Fotografía", "Fotografía",
          "Fotografía", "Fotografía", "Fotografía", "Fotografía", "Fotografía",
        ][index],
        readTime: [
          "5 min", "6 min", "4 min", "5 min", "5 min",
          "4 min", "7 min", "6 min", "4 min", "5 min",
          "4 min", "3 min", "4 min", "5 min", "3 min",
          "3 min", "3 min", "3 min", "4 min", "4 min",
          "4 min", "4 min", "4 min", "5 min", "3 min",
          "3 min", "3 min", "4 min", "3 min", "4 min",
          "6 min", "7 min", "6 min", "5 min", "6 min",
          "5 min", "5 min", "8 min", "4 min", "5 min",
          "5 min", "6 min", "5 min", "5 min", "6 min",
          "5 min", "7 min", "5 min", "5 min", "6 min",
        ][index],
      })),
    },
    gallery: {
      seoTitle: "Galería de Fotos - La Convención en Imágenes",
      seoDescription:
        "Explora nuestra galería fotográfica con los paisajes más impresionantes de La Convención, Cusco y Perú.",
      seoKeywords:
        "galería fotos La Convención, fotografía paisajes Perú, imágenes Cusco, fotos viaje",
      title: "Galería de Fotos",
      subtitle:
        "Un vistazo visual a los destinos más increíbles de La Convención.",
      images: galleryMeta.map((image, index) => ({
        ...image,
        title: [
          "Montañas Majestuosas",
          "Playas Tropicales",
          "Ciudades Antiguas",
          "Desiertos Infinitos",
          "Bosques Mágicos",
          "Auroras Boreales",
        ][index],
        location: [
          "Andes, La Convención",
          "Caribe, México",
          "Europa",
          "Sahara, África",
          "Amazonas, Brasil",
          "Noruega",
        ][index],
      })),
      ctaText: "¿Quieres ver más fotos de nuestros viajes?",
      ctaAction: "Síguenos en Instagram",
    },
    tips: {
      seoTitle: "Consejos de Viaje - Guía Práctica para Viajeros",
      seoDescription:
        "Consejos prácticos de viaje: presupuesto, equipaje, cultura, seguridad, fotografía y gastronomía para tu próxima aventura en La Convención.",
      seoKeywords:
        "consejos de viaje, tips viajeros, presupuesto viaje, equipaje viaje, seguridad viaje, fotografía viaje",
      title: "Consejos de Viaje",
      subtitle:
        "Aprende de nuestras experiencias y evita errores comunes con estos consejos prácticos para viajeros.",
      items: [
        {
          category: "Presupuesto",
          tips: [
            "Viaja en temporada baja para ahorrar en vuelos y alojamiento",
            "Usa aplicaciones de comparación de precios",
            "Cocina algunas comidas en lugar de comer siempre fuera",
          ],
        },
        {
          category: "Equipaje",
          tips: [
            "Haz una lista de empaque una semana antes",
            "Lleva ropa versátil que puedas combinar",
            "No olvides adaptadores de corriente internacionales",
          ],
        },
        {
          category: "Cultura",
          tips: [
            "Aprende frases básicas en el idioma local",
            "Investiga costumbres y tradiciones antes de viajar",
            "Respeta las normas de vestimenta local",
          ],
        },
        {
          category: "Seguridad",
          tips: [
            "Guarda copias digitales de tus documentos importantes",
            "Investiga las zonas seguras de tu destino",
            "Ten siempre un plan de emergencia",
          ],
        },
        {
          category: "Fotografía",
          tips: [
            "Lleva baterías y tarjetas de memoria de repuesto",
            "Toma fotos durante la hora dorada (amanecer/atardecer)",
            "No solo fotografíes lugares, captura también momentos",
          ],
        },
        {
          category: "Gastronomía",
          tips: [
            "Prueba la comida callejera local (con precaución)",
            "Visita mercados locales para experiencias auténticas",
            "Aprende sobre los platos típicos antes de viajar",
          ],
        },
      ],
      moreHelpTitle: "¿Necesitas más ayuda?",
      moreHelpDescription:
        "Suscríbete a nuestro newsletter semanal y recibe consejos exclusivos, ofertas de viaje y guías detalladas directamente en tu correo.",
      emailPlaceholder: "Tu correo electrónico",
      subscribe: "Suscribirse",
    },
    contact: {
      seoTitle: "Contáctanos - Explorando la Convención",
      seoDescription:
        "¿Tienes preguntas o quieres colaborar? Contáctanos por email, teléfono o visítanos en Quillabamba, La Convención.",
      seoKeywords:
        "contacto explorando la convención, contactar, email, teléfono, Quillabamba",
      title: "Contáctanos",
      subtitle:
        "¿Tienes preguntas, sugerencias o quieres colaborar con nosotros? Estamos aquí para ayudarte.",
      infoTitle: "Información de Contacto",
      formTitle: "Envíanos un Mensaje",
      requiredNote: "Los campos marcados con * son obligatorios.",
      labels: {
        name: "Nombre Completo *",
        email: "Email *",
        phone: "Teléfono",
        office: "Oficina",
        social: "Redes Sociales",
        subject: "Asunto *",
        message: "Mensaje *",
      },
      placeholders: {
        name: "Tu nombre",
        email: "tu@email.com",
        subject: "Selecciona un asunto",
        message: "Escribe tu mensaje aquí...",
      },
      subjects: [
        { id: "colaboracion", label: "Colaboración" },
        { id: "pregunta", label: "Pregunta General" },
        { id: "sugerencia", label: "Sugerencia" },
        { id: "publicidad", label: "Publicidad" },
        { id: "otro", label: "Otro" },
      ],
      validation: {
        name: "Ingresa un nombre válido (mínimo 2 caracteres).",
        email: "Ingresa un correo electrónico válido.",
        subject: "Selecciona un asunto.",
        message: "El mensaje debe tener al menos 20 caracteres.",
        review: "Revisa los campos marcados antes de enviar.",
        success:
          "¡Mensaje enviado! Gracias por contactarnos. Te responderemos pronto.",
        failure:
          "No pudimos enviar tu mensaje en este momento. Inténtalo nuevamente.",
      },
      helper: "Cuéntanos el contexto para ayudarte mejor.",
      submit: "Enviar Mensaje",
      submitting: "Enviando...",
      socialLabels: {
        facebook: "Visitar Facebook de Explorando la Convención",
        instagram: "Visitar Instagram de Explorando la Convención",
        youtube: "Visitar YouTube de Explorando la Convención",
      },
    },
    blog: {
      seoTitle:
        "Blog de Viajes - Explorando la Convención | Artículos y Consejos de Turismo",
      seoDescription:
        "Lee nuestros últimos artículos sobre viajes, destinos turísticos de La Convención y Cusco, consejos prácticos y experiencias de viaje en Perú.",
      seoKeywords:
        "blog de viajes, artículos de turismo, consejos de viaje, destinos Perú, La Convención, blog turismo",
      title: "Blog",
      subtitle: "Historias, consejos y descubrimientos de La Convención",
      heroTitle: "Blog",
      heroSubtitle: "Historias, consejos y descubrimientos de La Convención",
      categories: [
        { id: "all", label: "Todos" },
        { id: "destinations", label: "Destinos" },
        { id: "adventure", label: "Aventura" },
        { id: "culture", label: "Cultura" },
        { id: "gastronomy", label: "Gastronomía" },
        { id: "tips", label: "Tips" },
      ],
      posts: blogPostsMeta.map((post, index) => ({
        ...post,
        title: [
          "Los 10 Mejores Destinos de La Convención para 2025",
          "Guía Completa de Trekking en los Andes de La Convención",
          "Festivales y Tradiciones: El Calendario Cultural de La Convención",
          "Café de Altura: El Oro Verde de La Convención",
          "Turismo Comunitario: Experiencias Auténticas",
          "Consejos para Viajar en Temporada de Lluvias",
        ][index],
        excerpt: [
          "Descubre los lugares imperdibles que debes visitar este año en nuestra hermosa provincia.",
          "Todo lo que necesitas saber para preparar tu aventura de trekking en las montañas.",
          "Conoce las festividades más importantes y cuándo celebrarlas en nuestra región.",
          "Explora las plantaciones de café y aprende sobre el proceso que hace único a nuestro café.",
          "Vive con las comunidades locales y conoce sus costumbres de primera mano.",
          "Prepárate adecuadamente y disfruta al máximo tu visita en cualquier época del año.",
        ][index],
        date: [
          "15 de Enero, 2025",
          "10 de Enero, 2025",
          "5 de Enero, 2025",
          "28 de Diciembre, 2024",
          "20 de Diciembre, 2024",
          "15 de Diciembre, 2024",
        ][index],
        category: [
          "Destinos",
          "Aventura",
          "Cultura",
          "Gastronomía",
          "Cultura",
          "Tips",
        ][index],
        readTime: ["8 min", "10 min", "6 min", "7 min", "9 min", "5 min"][
          index
        ],
      })),
      postsTitle: "Publicaciones",
      postsSubtitle:
        "Artículos recientes sobre cultura, viajes y experiencias auténticas en La Convención.",
      newsletterTitle: "Suscríbete a Nuestro Newsletter",
      newsletterDescription:
        "Recibe las últimas noticias, consejos y artículos directamente en tu correo",
      emailPlaceholder: "Tu correo electrónico",
      subscribe: "Suscribirme",
      subscribing: "Suscribiendo...",
      invalidEmail: "Ingresa un correo válido para suscribirte.",
      success: "¡Listo! Te suscribiste al newsletter.",
    },
    gastronomy: {
      seoTitle: "Gastronomía de La Convención - Sabores Auténticos del Perú",
      seoDescription:
        "Descubre la gastronomía de La Convención: café de altura, cacao premium, platos típicos y los mejores restaurantes de Quillabamba.",
      seoKeywords:
        "gastronomía La Convención, café Quillabamba, cacao perú, comida típica cusco, restaurantes Quillabamba",
      title: "Gastronomía",
      subtitle: "Sabores auténticos de La Convención",
      heroTitle: "Gastronomía",
      heroSubtitle: "Sabores auténticos de La Convención",
      introTitle: "Un Viaje de Sabores",
      introParagraphs: [
        "La gastronomía de La Convención nace de la confluencia de dos mundos: los Andes y la Amazonía. En esta tierra privilegiada el café de altura comparte protagonismo con el cacao Chuncho, las truchas del río Urubamba con el juane selvático, y la pachamanca andina con las humitas de choclo recién cocidas.",
        "Cada plato es el resultado de generaciones de saberes transmitidos en familia. Aquí no existe la cocina inventada: existe la cocina verdadera, la que sabe a leña, a hojas de bijao y a fruta recién cosechada de las chacras locales.",
      ],
      dishesTitle: "Platos Típicos",
      dishesSubtitle: "Descubre los sabores que hacen única a nuestra región.",
      dishes: dishMeta.map((dish, index) => ({
        ...dish,
        name: [
          "Chicharrón Quillabambino",
          "Juane de la Selva",
          "Trucha a la Parrilla",
          "Café de Especialidad",
          "Pachamanca Regional",
          "Humitas de Choclo",
        ][index],
        description: [
          "Cerdo frito lentamente en su propia manteca hasta lograr piel crujiente y carne jugosa. Servido con yuca sancochada, zarsa criolla y ají amarillo. El plato más emblemático de la ciudad.",
          "Arroz con gallina, aceitunas, huevo y especias, envuelto en hoja de bijao y cocido al vapor. Un clásico amazónico que se prepara en todo festejo familiar de La Convención.",
          "Trucha fresca de los ríos andinos, marinada con hierbas locales y asada sobre brasas de leña. Sabor limpio, textura firme y el aroma inconfundible de la sierra alta.",
          "Cultivado entre 1,200 y 2,000 m.s.n.m. en las laderas andinas. Notas florales y frutales que le dan el reconocimiento de uno de los mejores cafés del Perú.",
          "Cocción subterránea con piedras calientes, carnes de cerdo y pollo, papas nativas y hierbas aromáticas. Técnica ancestral que transforma ingredientes simples en algo extraordinario.",
          "Masa de maíz tierno rallado, mezclada con queso fresco y especias, envuelta en sus propias hojas verdes y cocida al vapor. Dulce o salada, artesanal siempre.",
        ][index],
        category: [
          "Platos Principales",
          "Platos Principales",
          "Platos Principales",
          "Bebidas",
          "Platos Principales",
          "Entradas",
        ][index],
      })),
      coffeeTitle: "Café y Cacao de Altura",
      coffeeParagraphs: [
        "La Convención produce uno de los cafés más premiados del Perú. Sus granos se cultivan en las laderas andinas entre 1,200 y 2,000 metros sobre el nivel del mar, en suelos volánicos y bajo una temperatura de neblina permanente que desarrolla notas florales y frutales de excepción.",
        "El cacao Chuncho —variedad nativa de sabor fino y aroma complejo— completa el dúo de productos estrella de la región. Visita las haciendas de Echarati o Maranura, aprende el proceso de fermentación y secado, y descubre por qué el mundo mira a La Convención cuando busca cacao de calidad suprema.",
      ],
      coffeeAction: "Tour de Café y Cacao",
      restaurantsTitle: "Restaurantes Recomendados",
      restaurantsSubtitle:
        "Los mejores lugares para disfrutar de la gastronomía local.",
      restaurants: restaurantMeta.map((restaurant, index) => ({
        ...restaurant,
        name: [
          "El Mirador de Quillabamba",
          "Café Orgánico Montaña",
          "Sabor Selvático",
        ][index],
        description: [
          "Restaurante con vista panorámica al valle del Urubamba. Cocina de fusión andino-selvática con ingredientes frescos de productores locales. Ideal para celebraciones y veladas especiales.",
          "Cafetería de especialidad dedicada a los mejores cafés de altura de La Convención. Ambiente acogedor con remastería artesanal, catas guiadas y vista al jardín.",
          "Restaurante de tradición amazónica que preserva recetas ancestrales. Juanes, chicharrón quillabambino y pescados del río Urubamba preparados al momento con ingredientes de la zona.",
        ][index],
        location: ["Quillabamba Centro", "Av. 28 de Julio", "Plaza de Armas"][
          index
        ],
        specialty: ["Cocina Andino-Selvática", "Café de Especialidad", "Cocina Amazónica Tradicional"][
          index
        ],
      })),
      ctaTitle: "¿Listo para probar nuestros sabores?",
      ctaDescription:
        "Reserva un tour gastronómico y descubre los secretos culinarios de La Convención",
      ctaAction: "Reservar Tour Gastronómico",
    },
    about: {
      seoTitle: "Nuestro Equipo - Explorando la Convención",
      seoDescription:
        "Conoce al equipo detrás de Explorando la Convención: cinco quillabambinos apasionados por su tierra, su cultura y el turismo responsable.",
      seoKeywords:
        "equipo explorando la convención, Quillabamba, turismo La Convención, misión, visión, sobre nosotros",
      title: "Nuestro Equipo",
      subtitle:
        "Somos locales que aman su tierra y trabajan cada día para que el mundo descubra la esencia natural y cultural de La Convención.",
      heroEyebrow: "Quiénes somos",
      heroTitle: "Nuestro Equipo",
      heroDescription:
        "Somos locales que aman su tierra y trabajan cada día para que el mundo descubra la esencia natural y cultural de La Convención.",
      stats: [
        { value: 3, suffix: "+", label: "Años compartiendo nuestra cultura" },
        { value: 50, suffix: "+", label: "Destinos documentados" },
        { value: 30, suffix: "K+", label: "Visitantes al año" },
        { value: 5, suffix: "", label: "Personas en el equipo" },
      ],
      missionVisionTitle: "Lo que nos mueve cada día",
      missionTitle: "Nuestra Misión",
      missionDescription:
        "Impulsar el turismo sostenible y la difusión cultural en la provincia de La Convención, brindando información auténtica, actualizada y de calidad para que cada viajero descubra la riqueza natural, histórica y gastronómica de nuestra región.",
      visionTitle: "Nuestra Visión",
      visionDescription:
        "Ser el referente principal de turismo y cultura en La Convención, reconocidos por nuestro contenido auténtico, nuestro compromiso con la comunidad local y la promoción responsable del patrimonio natural y cultural de Quillabamba y sus alrededores.",
      historyTitle: "Nuestra Historia",
      historyParagraphs: [
        "Explorando la Convención nació de una pregunta simple: ¿por qué tan pocas personas conocen la maravilla que es Quillabamba? Nuestra provincia tiene selva, montañas, ríos cristalinos, una gastronomía única y una historia rica, pero muy poca presencia digital.",
        "En 2022, un grupo de jóvenes quillabambinos decidió cambiar eso. Armados de cámaras, libretas y mucho amor por su tierra, comenzaron a documentar cada rincón de La Convención: sus sabores, sus paisajes, sus festividades y su gente.",
        "Hoy somos cinco personas comprometidas con mostrarle al mundo que La Convención no es solo un destino más en el mapa, sino un lugar donde la naturaleza y la cultura se funden en una experiencia verdaderamente inolvidable.",
      ],
      valuesTitle: "Nuestros Valores",
      valuesSubtitle:
        "Los principios que guían cada decisión, cada publicación y cada experiencia que compartimos.",
      values: [
        {
          icon: "Leaf",
          title: "Sostenibilidad",
          description:
            "Promovemos un turismo responsable que respeta y preserva el ecosistema único de la selva alta de La Convención.",
        },
        {
          icon: "Users",
          title: "Comunidad",
          description:
            "Trabajamos junto a la comunidad local para que el desarrollo turístico beneficie directamente a las familias quillabambinas.",
        },
        {
          icon: "Heart",
          title: "Pasión",
          description:
            "Cada artículo, fotografía y guía refleja el profundo amor que sentimos por nuestra tierra, cultura y tradiciones.",
        },
        {
          icon: "MapPin",
          title: "Autenticidad",
          description:
            "Todo nuestro contenido es generado por locales, garantizando información real, verificada y de primera mano.",
        },
        {
          icon: "Star",
          title: "Identidad Cultural",
          description:
            "Somos guardianes del patrimonio histórico, gastronómico y cultural de La Convención para las generaciones futuras.",
        },
        {
          icon: "Lightbulb",
          title: "Innovación",
          description:
            "Usamos tecnología moderna para hacer que la experiencia de descubrir La Convención sea accesible y enriquecedora.",
        },
      ],
      teamTitle: "Las personas detrás del portal",
      teamSubtitle:
        "Cinco quillabambinos con distintas habilidades y un solo objetivo: poner a La Convención en el mapa.",
      teamMembers: [
        {
          name: "Ezer Benito Zúñiga Chura",
          role: "Fundador & Desarrollador Web",
          description:
            "Estudiante de Ingeniería Informática y apasionado por la tecnología aplicada al turismo local. Creó esta plataforma para mostrar al mundo la riqueza cultural y natural de La Convención a través de soluciones digitales innovadoras. Quillabambino de nacimiento y corazón.",
          initials: "EZ",
          color: "#1B4332",
          image: "/images/team/EzerB.jpg",
          skills: [
            "Desarrollo Web",
            "Diseño UI/UX",
            "SEO",
            "Soluciones Digitales",
          ],
        },
        {
          name: "Keyla Milagros Mendoza Marín",
          role: "Directora de Contenido",
          description:
            "Estudiante de Administración y Negocios Internacionales. Lidera la gestión estratégica y creación de guías que dan vida al portal, aplicando su visión empresarial para posicionar nuestra cultura en el mercado global. Orgullosamente quillabambina.",
          initials: "KM",
          color: "#4BB543",
          image: "/images/team/keyla.jpg",
          skills: [
            "Gestión Estratégica",
            "Redacción",
            "Negocios Internacionales",
          ],
        },
        {
          name: "Diego Toribio Torres Quispe",
          role: "Fotógrafo & Videógrafo",
          description:
            "Estudiante de Arquitectura con un ojo artístico único. Captura la esencia de La Convención a través de imágenes que resaltan la armonía entre el paisaje natural y la identidad urbana de nuestra región. Quillabambino de raíces y pasión.",
          initials: "DT",
          color: "#4BB543",
          image: "/images/team/diego.jpg",
          skills: ["Fotografía", "Edición de Video", "Arquitectura"],
        },
        {
          name: "Lucía Quena Quispe Valer",
          role: "Guía Turística Local",
          description:
            "Estudiante de Derecho y guía oficial certificada. Combina su formación legal con su amor por la tierra para promover un turismo responsable, seguro y profundamente respetuoso con nuestro patrimonio. Natural de Quillabamba.",
          initials: "LQ",
          color: "#4BB543",
          image: "/images/team/lucia.jpg",
          skills: ["Guiado Turístico", "Derecho", "Turismo Responsable"],
        },
        {
          name: "Rodrigo Augusto Apaza Villavicencio",
          role: "Gestor de Redes Sociales",
          description:
            "Estudiante de Ingeniería de Sistemas. Se encarga de la conectividad y el crecimiento digital del proyecto, optimizando nuestras plataformas para que la voz de La Convención llegue a cada rincón del mundo. Quillabambino digital.",
          initials: "RA",
          color: "#35594D",
          image: "/images/team/rodrigo.jpg",
          skills: [
            "Ingeniería de Sistemas",
            "Redes Sociales",
            "Optimización Digital",
          ],
        },
      ],
      ctaTitle: "¿Quieres ser parte del equipo?",
      ctaDescription:
        "Si amas La Convención y tienes algo que aportar, ya sea redactando, fotografiando, guiando o difundiendo, siempre estamos buscando personas apasionadas por nuestra región.",
      ctaAction: "Contáctanos",
    },
  },
};

const en = createEnglishTranslations(es);
const pt = createPortugueseTranslations(en);
const fr = createFrenchTranslations(en);

export const translations: Record<LanguageCode, TranslationContent> = {
  es,
  en,
  pt,
  fr,
};
