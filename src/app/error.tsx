"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // En producción, reemplazar con un servicio de monitoreo (Sentry, Datadog…)
    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
  }, [error]);

  return (
    <main className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <div className="max-w-lg text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Algo salió mal
        </h1>
        <p className="text-gray-600 mb-6">
          Ha ocurrido un error inesperado. Por favor, intenta nuevamente.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-brand-text hover:bg-brand-text/90 text-white font-semibold rounded-lg transition-colors"
        >
          Reintentar
        </button>
      </div>
    </main>
  );
}
