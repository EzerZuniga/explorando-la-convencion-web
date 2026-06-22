import Contact from "@/views/Contact";
import { createPageMetadata, createPageJsonLd } from "@/config/metadata";
import { safeJsonLd } from "@/utils/json-ld";

export const metadata = createPageMetadata("/contact");

export default function ContactPage() {
  const jsonLd = createPageJsonLd("/contact");
  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
        />
      )}
      <Contact />
    </>
  );
}
