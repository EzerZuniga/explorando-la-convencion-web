import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { AppProviders } from "./providers";
import { createPageMetadata, websiteJsonLd } from "@/config/metadata";
import { safeJsonLd } from "@/utils/json-ld";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "700"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  ...createPageMetadata("/"),
  applicationName: "Explorando la Convención",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "16x16 32x32 48x48 64x64 128x128 256x256",
        type: "image/x-icon",
      },
    ],
    shortcut: "/favicon.ico",
  },
  appleWebApp: {
    title: "Explorando la Convención",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  other: {
    "geo.region": "PE",
    "geo.placename": "Perú",
    "msapplication-tooltip": "Blog de Viajes y Turismo en Perú",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1B5E20",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-PE">
      {/* Preconnect to external APIs used by widgets — reduces TTFB */}
      <head>
        <link rel="preconnect" href="https://api.open-meteo.com" />
        <link rel="dns-prefetch" href="https://api.open-meteo.com" />
        <link rel="preconnect" href="https://open.er-api.com" />
        <link rel="dns-prefetch" href="https://open.er-api.com" />
        <link rel="dns-prefetch" href="https://dummyjson.com" />
        <link rel="dns-prefetch" href="https://restcountries.com" />
      </head>
      <body className={`${inter.variable} ${plusJakartaSans.variable}`}>
        {/* Website JSON-LD: server-rendered, no hydration cost */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(websiteJsonLd()) }}
        />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
