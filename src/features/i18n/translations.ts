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
        { name: "Privacy policy", href: "#" },
        { name: "Terms and conditions", href: "#" },
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
          primaryCta: "Explore Destinations",
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
            image: "/images/destinos/pueblo-magico.jpg",
            to: "/destinations",
            label: "View destinations",
            meta: "Routes and guidance",
          },
          {
            title: "Coffee, cacao and local flavors",
            description:
              "Emblematic products that help explain the agricultural and gastronomic identity of La Convención.",
            image: "/images/galeria/comida-asiatica.jpg",
            to: "/gastronomia",
            label: "Explore gastronomy",
            meta: "Regional flavors",
          },
          {
            title: "Nature to visit calmly",
            description:
              "Forests, viewpoints and green spaces best explored with previous information and respect for the environment.",
            image: "/images/galeria/fotografia.jpg",
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
        { name: "Política de privacidade", href: "#" },
        { name: "Termos e condições", href: "#" },
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
          primaryCta: "Explorar Destinos",
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
        { name: "Politique de confidentialité", href: "#" },
        { name: "Conditions générales", href: "#" },
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

const basePostsMeta = [
  {
    id: 1,
    image: "/images/destinos/pueblo-magico.jpg",
    author: "Mariela Ramos",
    date: "2024-01-15",
    featured: true,
  },
  {
    id: 2,
    image: "/images/viajes/presupuesto.jpg",
    author: "Carlos Huamán",
    date: "2024-01-12",
    featured: true,
  },
  {
    id: 3,
    image: "/images/galeria/comida-asiatica.jpg",
    author: "Ana Paredes",
    date: "2024-01-10",
    featured: true,
  },
  {
    id: 4,
    image: "/images/destinos/andes-trekking.jpg",
    author: "Luis Fernández",
    date: "2024-01-08",
  },
  {
    id: 5,
    image: "/images/galeria/fotografia.jpg",
    author: "Sofia Chen",
    date: "2024-01-05",
  },
  {
    id: 6,
    image: "/images/viajes/tren-europa.jpg",
    author: "David Miller",
    date: "2024-01-03",
  },
] as const;

const blogPostsMeta = [
  {
    id: 1,
    image: "/images/destinos/pueblo-magico.jpg",
    author: "María Rodríguez",
  },
  {
    id: 2,
    image: "/images/destinos/andes-trekking.jpg",
    author: "Carlos Mendoza",
  },
  { id: 3, image: "/images/galeria/fotografia.jpg", author: "Ana Silva" },
  {
    id: 4,
    image: "/images/galeria/comida-asiatica.jpg",
    author: "María Rodríguez",
  },
  {
    id: 5,
    image: "/images/destinos/pueblo-magico.jpg",
    author: "Carlos Mendoza",
  },
  { id: 6, image: "/images/viajes/presupuesto.jpg", author: "Ana Silva" },
] as const;

const dishMeta = [
  { id: 1, image: "/images/galeria/comida-asiatica.jpg" },
  { id: 2, image: "/images/galeria/fotografia.jpg" },
  { id: 3, image: "/images/destinos/pueblo-magico.jpg" },
  { id: 4, image: "/images/viajes/presupuesto.jpg" },
  { id: 5, image: "/images/galeria/comida-asiatica.jpg" },
  { id: 6, image: "/images/destinos/andes-trekking.jpg" },
] as const;

const restaurantMeta = [
  { id: 1, image: "/images/destinos/pueblo-magico.jpg", rating: 4.8 },
  { id: 2, image: "/images/galeria/fotografia.jpg", rating: 4.9 },
  { id: 3, image: "/images/galeria/comida-asiatica.jpg", rating: 4.7 },
] as const;

const galleryMeta = [
  { id: 1, src: "/images/galeria/fotografia.jpg" },
  { id: 2, src: "/images/galeria/playa.jpg" },
  { id: 3, src: "/images/galeria/ciudad.jpg" },
  { id: 4, src: "/images/galeria/desierto.jpg" },
  { id: 5, src: "/images/galeria/bosque.jpg" },
  { id: 6, src: "/images/galeria/aurora.jpg" },
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
      { name: "Política de privacidad", href: "#" },
      { name: "Términos y condiciones", href: "#" },
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
        primaryCta: "Explorar Destinos",
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
          image: "/images/destinos/pueblo-magico.jpg",
          to: "/destinations",
          label: "Ver destinos",
          meta: "Rutas y orientación",
        },
        {
          title: "Café, cacao y sabores locales",
          description:
            "Productos emblemáticos que ayudan a entender la identidad agrícola y gastronómica de La Convención.",
          image: "/images/galeria/comida-asiatica.jpg",
          to: "/gastronomia",
          label: "Explorar gastronomía",
          meta: "Sabores regionales",
        },
        {
          title: "Naturaleza para visitar con calma",
          description:
            "Bosques, miradores y espacios verdes que conviene recorrer con información previa y respeto por el entorno.",
          image: "/images/galeria/fotografia.jpg",
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
      posts: basePostsMeta.map((post, index) => ({
        ...post,
        title: [
          "Quillabamba y sus Rincones Imperdibles",
          "Cómo Visitar La Convención con Presupuesto Inteligente",
          "Sabores de La Convención: Café, Cacao y Cocina Local",
          "Trekking en los Andes: Una Aventura Inolvidable",
          "Fotografía de Viajes: Captura Momentos Únicos",
          "Europa en Tren: El Viaje Más Pintoresco",
        ][index],
        excerpt: [
          "Una ruta práctica por miradores, barrios tradicionales y espacios culturales de La Convención.",
          "Consejos claros para ahorrar en transporte, alojamiento y actividades sin perder calidad de experiencia.",
          "Descubre productos emblemáticos y platos que reflejan la identidad gastronómica de la selva cusqueña.",
          "Experiencias y recomendaciones para hacer senderismo en la cordillera de los Andes.",
          "Técnicas y consejos para mejorar tus fotografías durante tus viajes.",
          "Descubre la belleza de Europa a través de sus rutas ferroviarias más espectaculares.",
        ][index],
        content: [
          "Quillabamba combina clima cálido, historia local y naturaleza cercana. En esta guía te mostramos paradas clave para conocer su esencia...",
          "Viajar a La Convención también puede ser accesible. Aquí encontrarás recomendaciones para optimizar gastos y organizar mejor tu itinerario...",
          "La gastronomía local se construye con café de altura, cacao fino y recetas familiares. Te contamos qué probar y dónde empezar...",
          "Los Andes ofrecen algunos de los paisajes más espectaculares para el trekking...",
          "Una buena fotografía puede capturar la esencia de un lugar y preservar recuerdos...",
          "Viajar en tren por Europa es una experiencia única que combina comodidad y paisajes increíbles...",
        ][index],
        category: [
          "Destinos",
          "Consejos",
          "Gastronomía",
          "Aventura",
          "Fotografía",
          "Destinos",
        ][index],
        readTime: ["5 min", "7 min", "4 min", "6 min", "8 min", "5 min"][index],
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
        "La gastronomía de La Convención es un reflejo de su diversidad geográfica y cultural. Desde las alturas andinas hasta la selva tropical, cada plato cuenta una historia de tradición, innovación y respeto por los ingredientes locales.",
        "Nuestro café de altura y cacao fino son reconocidos internacionalmente, mientras que nuestros platos tradicionales mantienen vivas las recetas ancestrales de nuestros pueblos.",
      ],
      dishesTitle: "Platos Típicos",
      dishesSubtitle: "Descubre los sabores que hacen única a nuestra región.",
      dishes: dishMeta.map((dish, index) => ({
        ...dish,
        name: [
          "Café de Altura",
          "Pachamanca de la Selva",
          "Trucha a la Parrilla",
          "Cacao Premium",
          "Juane de La Selva",
          "Mazamorra Morada",
        ][index],
        description: [
          "El mejor café orgánico cultivado en las montañas de La Convención, reconocido mundialmente por su sabor único y aroma intenso.",
          "Plato tradicional cocinado bajo tierra con piedras calientes, combinando carnes, papas nativas y hierbas aromáticas de la región.",
          "Trucha fresca de los ríos andinos, marinada con especias locales y asada a la perfección sobre brasas de leña.",
          "Chocolate artesanal elaborado con cacao orgánico de nuestras plantaciones, perfecto para degustar o llevar como recuerdo.",
          "Arroz con pollo envuelto en hojas de bijao, uno de los platos más emblemáticos de la región selvática.",
          "Postre tradicional peruano elaborado con maíz morado, frutas y especias, servido con arroz con leche.",
        ][index],
        category: [
          "Bebidas",
          "Platos Principales",
          "Platos Principales",
          "Postres",
          "Platos Principales",
          "Postres",
        ][index],
      })),
      coffeeTitle: "Café y Cacao de Altura",
      coffeeParagraphs: [
        "La Convención es reconocida mundialmente por la calidad excepcional de su café y cacao. Cultivados en las laderas de los Andes, entre 1,200 y 2,000 metros sobre el nivel del mar, nuestros productos son el resultado de prácticas agrícolas sostenibles y el cuidado de generaciones de productores.",
        "Visita nuestras plantaciones, aprende sobre el proceso de cosecha y tostado, y degusta el verdadero sabor del oro verde y marrón de La Convención.",
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
          "Restaurante con vista panorámica que ofrece lo mejor de la gastronomía local con ingredientes frescos de la región.",
          "Cafetería especializada en café de altura y postres artesanales, ideal para una tarde relajada.",
          "Restaurante tradicional que conserva las recetas ancestrales de la cocina amazónica y andina.",
        ][index],
        location: ["Quillabamba Centro", "Av. Principal", "Plaza de Armas"][
          index
        ],
        specialty: ["Cocina Fusión", "Café y Repostería", "Cocina Tradicional"][
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
        { value: 30, suffix: "K+", label: "Visitantes al mes" },
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
          image: "/images/equipo/EzerB.jpg",
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
          image: "/images/equipo/keyla.jpg",
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
          image: "/images/equipo/diego.jpg",
          skills: ["Fotografía", "Edición de Video", "Arquitectura"],
        },
        {
          name: "Lucía Quena Quispe Valer",
          role: "Guía Turística Local",
          description:
            "Estudiante de Derecho y guía oficial certificada. Combina su formación legal con su amor por la tierra para promover un turismo responsable, seguro y profundamente respetuoso con nuestro patrimonio. Natural de Quillabamba.",
          initials: "LQ",
          color: "#4BB543",
          image: "/images/equipo/lucia.jpg",
          skills: ["Guiado Turístico", "Derecho", "Turismo Responsable"],
        },
        {
          name: "Rodrigo Augusto Apaza Villavicencio",
          role: "Gestor de Redes Sociales",
          description:
            "Estudiante de Ingeniería de Sistemas. Se encarga de la conectividad y el crecimiento digital del proyecto, optimizando nuestras plataformas para que la voz de La Convención llegue a cada rincón del mundo. Quillabambino digital.",
          initials: "RA",
          color: "#35594D",
          image: "/images/equipo/rodrigo.jpg",
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
