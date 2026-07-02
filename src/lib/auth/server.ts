// ── Server-side Auth.js v5 exports ───────────────────────────────────────────
// Uso en Server Components y Route Handlers:
//
//   import { auth } from "@/lib/auth/server"
//   const session = await auth()
//
// Para proteger rutas en middleware, ver src/middleware.ts
export { auth, signIn, signOut } from "@/auth";
export type { Session } from "next-auth";
