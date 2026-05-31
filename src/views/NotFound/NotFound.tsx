"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import SEOHead from "@/features/seo";

const NotFound: React.FC = () => {
  return (
    <div className="wp-shell flex items-center justify-center px-4">
      <SEOHead title="Página no encontrada" noIndex />
      <div className="wp-card p-8 sm:p-10 text-center max-w-md">
        <h1 className="font-heading text-8xl font-bold text-brand-text  mb-4">
          404
        </h1>
        <h2 className="font-heading text-3xl font-bold text-gray-900  mb-4">
          Página no encontrada
        </h2>
        <p className="text-brand-text/75  mb-8 leading-relaxed">
          Lo sentimos, la página que buscas no existe o fue movida a otra
          ubicación.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="wp-btn-primary">
            <Home className="w-5 h-5" />
            Ir al inicio
          </Link>
          <button
            onClick={() => window.history.back()}
            className="wp-btn-secondary"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver atrás
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
