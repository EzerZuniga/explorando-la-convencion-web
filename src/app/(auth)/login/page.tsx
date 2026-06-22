import { Suspense } from "react";
import type { Metadata } from "next";
import AuthPage from "@/views/Auth";

export const metadata: Metadata = {
  title: "Iniciar sesión | Explorando la Convención",
  description:
    "Accede a tu cuenta para guardar destinos favoritos, crear rutas personalizadas y explorar La Convención al máximo.",
  robots: { index: false, follow: false },
};

/**
 * Suspense is required because AuthPage uses useSearchParams(),
 * which needs a Suspense boundary in Next.js App Router.
 */
export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="w-8 h-8 rounded-full border-2 border-gray-200 border-t-[#1B5E20] animate-spin" />
        </div>
      }
    >
      <AuthPage />
    </Suspense>
  );
}
