import { Helmet } from 'react-helmet-async';
import { SITE_CONFIG, SEO_DEFAULTS } from '@/constants';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  noIndex?: boolean;
}

export default function SEOHead({
  title,
  description = SEO_DEFAULTS.description,
  keywords = SEO_DEFAULTS.keywords,
  image = SITE_CONFIG.ogImage,
  url = SITE_CONFIG.url,
  type = 'website',
  noIndex = false,
}: SEOHeadProps) {
  const fullTitle = title
    ? `${title} | ${SITE_CONFIG.name}`
    : SEO_DEFAULTS.defaultTitle;

  const fullImage = image.startsWith('http') ? image : `${SITE_CONFIG.url}${image}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={SITE_CONFIG.author} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={SITE_CONFIG.locale} />
      <meta property="og:site_name" content={SITE_CONFIG.name} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SITE_CONFIG.social.twitter} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Canonical */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
