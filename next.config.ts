import type { NextConfig } from "next";

const STATIC_ASSET_CACHE =
  "public, max-age=31536000, stale-while-revalidate=86400, immutable";

// ── Content-Security-Policy ───────────────────────────────────────────────────
// 'unsafe-inline' en script-src es necesario para los inline scripts que
// genera Next.js (JSON-LD, hydration). Para eliminarlo en el futuro, usar
// nonces con middleware.
const isDev = process.env.NODE_ENV === "development";

const CSP = [
  "default-src 'self'",
  // In dev mode Next.js needs 'unsafe-eval' for webpack HMR
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  [
    "img-src 'self' data: blob:",
    "https://res.cloudinary.com",
    "https://avatars.githubusercontent.com",
    "https://lh3.googleusercontent.com",
  ].join(" "),
  [
    "connect-src 'self'",
    "https://api.open-meteo.com",
    "https://open.er-api.com",
    "https://dummyjson.com",
    "https://restcountries.com",
    // Dev mode HMR websocket
    ...(isDev ? ["ws://localhost:3000"] : []),
  ].join(" "),
  // Allow Google Maps embed
  "frame-src 'self' https://www.google.com https://maps.google.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  // Don't force HTTPS upgrade in dev (localhost is HTTP)
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const SECURITY_HEADERS = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self), payment=()",
  },
  // HSTS: 2 años, incluye subdominios, apto para preload list
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Previene que otras páginas abran esta en un contexto cross-origin
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "Content-Security-Policy", value: CSP },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  outputFileTracingRoot: process.cwd(),

  images: {
    formats: ["image/avif", "image/webp"],
    // Cache Next.js-optimized images for 7 days on the CDN
    minimumCacheTTL: 60 * 60 * 24 * 7,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 128, 256, 384],
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },

  async headers() {
    return [
      // Cache static assets for 1 year (content-addressed by filename)
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: STATIC_ASSET_CACHE }],
      },
      {
        source: "/video/:path*",
        headers: [{ key: "Cache-Control", value: STATIC_ASSET_CACHE }],
      },
      // Security headers for all routes
      {
        source: "/(.*)",
        headers: SECURITY_HEADERS,
      },
    ];
  },

  experimental: {
    optimizePackageImports: ["lucide-react", "react-icons"],
  },
};

export default nextConfig;
