import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { AppProviders } from "@/providers/AppProviders";
import { createPageMetadata, websiteJsonLd } from "@/config/metadata";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["600", "700", "800", "900"],
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
    google: "G9dN7hW7NumhFxjHTuvc02yFv_OoPmRBNEOQyc3Ehwg",
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
  themeColor: "#1A2F28",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-PE">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <AppProviders>{children}</AppProviders>
        <Script
          id="website-json-ld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
      </body>
    </html>
  );
}
