export const SITE_CONFIG = {
  name: 'Explorando la Convención',
  shortName: 'ExplorandoLC',
  description: 'Descubre los mejores destinos turísticos, consejos de viaje, gastronomía peruana y guías completas. Blog de aventuras y experiencias únicas en Perú.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://explorando-la-convencion-web-eta.vercel.app',
  author: 'Ezer B. Zuniga Chura',
  locale: 'es_PE',
  ogImage: '/images/hero/hero-main.jpg',
  social: {
    facebook: 'https://web.facebook.com/profile.php?id=61591025338423',
    instagram: 'https://www.instagram.com/explorando.laconvencion/',
    youtube: 'https://www.youtube.com/channel/UCKtQoyDMWoQkT0gjBLDTGIA',
    email: 'info@explorandolaconvencion.pe',
    twitter: 'https://x.com/ExplorandoLaCon',
    github: 'https://github.com/EzerZuniga/PortalConvencion-Web',
  },
  contact: {
    email: 'info@explorandolaconvencion.pe',
    phone: '+1 (555) 123-4567',
    address: 'Av. Principal 123, Quillabamba, La Convención, Cusco, Perú',
    location: 'La Convención, Cusco',
    purpose: 'Portal informativo turístico',
  },
} as const;

export const SEO_DEFAULTS = {
  titleTemplate: '%s | Explorando la Convención',
  defaultTitle: 'Explorando la Convención - Blog de Viajes y Turismo en Perú',
  description: SITE_CONFIG.description,
  keywords: 'blog de viajes, turismo Perú, destinos turísticos, guías de viaje, aventuras, gastronomía peruana, La Convención, Cusco',
  openGraph: {
    type: 'website',
    locale: SITE_CONFIG.locale,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    images: [{ url: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`, width: 1200, height: 630, alt: SITE_CONFIG.name }],
  },
  twitter: {
    cardType: 'summary_large_image',
    site: SITE_CONFIG.social.twitter,
  },
} as const;
