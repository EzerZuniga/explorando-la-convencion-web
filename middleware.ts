import { NextResponse, type NextRequest } from "next/server";

// ── Rate limiter para endpoints de autenticación ──────────────────────────────
// Nota: En entornos serverless (Vercel) cada instancia tiene su propia memoria,
// por lo que este limitador actúa por instancia. Para rate limiting global
// y persistente, usar Vercel KV o Upstash Redis.
const authRateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isAuthRateLimited(ip: string): boolean {
  const WINDOW_MS = 60_000; // 60 segundos
  const MAX_REQUESTS = 15;  // máximo 15 intentos por ventana
  const now = Date.now();
  const entry = authRateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    authRateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > MAX_REQUESTS;
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

// Session cookie name used by better-auth (default)
const SESSION_COOKIE_NAME = "better-auth.session_token";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Rate limiting en endpoints de autenticación ──────────────────────────
  if (pathname.startsWith("/api/auth")) {
    const ip = getClientIp(request);
    if (isAuthRateLimited(ip)) {
      return new NextResponse("Too Many Requests", {
        status: 429,
        headers: {
          "Retry-After": "60",
          "Content-Type": "text/plain",
        },
      });
    }
    return NextResponse.next();
  }

  // ── Protección de rutas privadas ─────────────────────────────────────────
  // Verifica la existencia de la cookie de sesión como primera capa de defensa.
  // La validación criptográfica completa ocurre en el Server Component de cada
  // ruta protegida mediante auth.api.getSession().
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);

  if (!sessionCookie?.value) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/dashboard/:path*", "/api/auth/:path*"],
};
