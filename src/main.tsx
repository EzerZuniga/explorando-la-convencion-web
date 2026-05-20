import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import { LanguageProvider } from "@/features/i18n";
import "@/styles/globals.css";

const GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID || "CONFIGURA_TU_CLIENT_ID";

const appTree = (
  <React.StrictMode>
    <HelmetProvider>
      <LanguageProvider>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <App />
        </GoogleOAuthProvider>
      </LanguageProvider>
    </HelmetProvider>
  </React.StrictMode>
);

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    "No se encontró el elemento root para inicializar la aplicación.",
  );
}

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, appTree);
} else {
  createRoot(rootElement).render(appTree);
}
