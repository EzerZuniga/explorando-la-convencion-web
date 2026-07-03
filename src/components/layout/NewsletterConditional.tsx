"use client";

import { usePathname } from "next/navigation";
import NewsletterSignup from "./NewsletterSignup";

/**
 * Rutas donde el newsletter es relevante para la audiencia.
 * Set para lookup O(1).
 */
const NEWSLETTER_ROUTES = new Set([
  "/",
  "/destinations",
  "/blog",
  "/tips",
  "/gastronomia",
]);

export default function NewsletterConditional() {
  const pathname = usePathname();
  if (!NEWSLETTER_ROUTES.has(pathname)) return null;
  return <NewsletterSignup />;
}
