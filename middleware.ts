// ── Middleware de autenticación — Auth.js v5 ──────────────────────────────────
// Exportar `auth` directamente como middleware es el patrón recomendado.
// El callback `authorized` en src/auth.ts controla el acceso:
//   - Si la sesión JWT es válida → permite el acceso.
//   - Si no hay sesión → redirige automáticamente a `pages.signIn` (/login)
//     con `callbackUrl` para retornar tras autenticarse.
//
// Notas:
//   - Sin base de datos: la validación es puramente criptográfica (JWT firmado).
//   - Para rate limiting global futuro: Vercel KV o Upstash Redis.
export { auth as default } from "@/auth";

export const config = {
  matcher: [
    "/profile/:path*",
    // Añadir rutas privadas adicionales aquí:
    // "/dashboard/:path*",
  ],
};
