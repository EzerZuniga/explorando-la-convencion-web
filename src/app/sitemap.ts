import type { MetadataRoute } from "next";
import { absoluteUrl, publicRoutes, routeLastModified } from "@/config/metadata";

const priorities: Record<string, number> = {
  "/": 1,
  "/blog": 0.9,
  "/destinations": 0.9,
  "/gastronomia": 0.8,
  "/tips": 0.8,
  "/gallery": 0.7,
  "/about": 0.6,
  "/contact": 0.5,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes
    .filter((route) => route !== "/profile")
    .map((route) => ({
      url: absoluteUrl(route),
      lastModified: routeLastModified(),
      changeFrequency: route === "/" ? "daily" : route === "/gallery" ? "monthly" : "weekly",
      priority: priorities[route] ?? 0.5,
    }));
}
