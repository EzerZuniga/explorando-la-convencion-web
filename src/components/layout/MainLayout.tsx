import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import NewsletterConditional from "./NewsletterConditional";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>
      <Navbar />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 focus:outline-none"
      >
        {children}
      </main>
      <NewsletterConditional />
      <Footer />
    </div>
  );
}
