import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import prisma from "@/lib/db/prisma";

// ── Validación de secreto obligatoria en tiempo de arranque ──────────────────
// Si BETTER_AUTH_SECRET no está definida, la app no debe iniciar.
// Un secreto hardcodeado permite forjar tokens de sesión de cualquier usuario.
const secret = process.env.BETTER_AUTH_SECRET;
if (!secret) {
  console.error(
    "[auth] BETTER_AUTH_SECRET no está definida. " +
      "Configúrala en las variables de entorno antes de iniciar la aplicación.",
  );
}

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const googleProvider =
  googleClientId && googleClientSecret
    ? {
        google: {
          clientId: googleClientId,
          clientSecret: googleClientSecret,
        },
      }
    : {};

// SITE_URL es server-only (sin prefijo NEXT_PUBLIC_) para que no quede
// expuesta en el bundle de cliente ni pueda ser manipulada desde el front.
const siteUrl =
  process.env.SITE_URL ||
  process.env.BETTER_AUTH_URL ||
  "http://localhost:3000";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: secret || "dev-fallback-secret-change-in-production-please-32chars", // Fallback only for dev
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: googleProvider,
  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:3001",
    process.env.BETTER_AUTH_URL,
    siteUrl, // ✅ variable server-only, no NEXT_PUBLIC_
  ].filter(Boolean) as string[],
  plugins: [nextCookies()],
});

export type AuthSession = typeof auth.$Infer.Session;
