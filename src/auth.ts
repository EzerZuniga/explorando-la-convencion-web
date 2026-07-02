import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Apple from "next-auth/providers/apple";

// ── Configuración de Auth.js v5 ───────────────────────────────────────────────
//
// Proveedores activos: Google y Apple (OAuth, sin contraseñas, sin BD).
// Se activan solo si las credenciales están definidas en las variables de entorno,
// lo que evita errores de runtime cuando se despliega sin configurarlas aún.
//
// Variables de entorno requeridas (ver .env.example):
//   AUTH_SECRET           — Secreto JWT  (openssl rand -base64 32)
//   AUTH_GOOGLE_ID        — Google Cloud Console → OAuth Client ID
//   AUTH_GOOGLE_SECRET    — Google Cloud Console → OAuth Client Secret
//   AUTH_APPLE_ID         — Apple Developer → Services ID
//   AUTH_APPLE_SECRET     — Apple Developer → Private Key (PEM)
//
// Para añadir Microsoft o GitHub: importar el proveedor de "next-auth/providers/*"
// y añadir un spread idéntico al bloque de Google.

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    ...(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
      ? [
          Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            authorization: {
              params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code",
              },
            },
          }),
        ]
      : []),
    ...(process.env.AUTH_APPLE_ID && process.env.AUTH_APPLE_SECRET
      ? [
          Apple({
            clientId: process.env.AUTH_APPLE_ID,
            clientSecret: process.env.AUTH_APPLE_SECRET,
          }),
        ]
      : []),
  ],

  // ── Sesión JWT — sin base de datos ──────────────────────────────────────────
  session: { strategy: "jwt" },

  // ── Páginas personalizadas ───────────────────────────────────────────────────
  pages: {
    signIn: "/login",
    error: "/login",
  },

  // ── Callbacks ────────────────────────────────────────────────────────────────
  callbacks: {
    // Controla el acceso a rutas en el matcher del middleware.
    // `true` → permite. `false` → redirige a pages.signIn con callbackUrl.
    authorized({ auth: session }) {
      return !!session?.user;
    },

    // Persiste el proveedor OAuth en el JWT al momento del login inicial.
    jwt({ token, account }) {
      if (account?.provider) {
        token.provider = account.provider;
      }
      return token;
    },

    // Expone id y proveedor en la sesión accesible desde el cliente.
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.provider = token.provider as string | undefined;
      }
      return session;
    },
  },
});
