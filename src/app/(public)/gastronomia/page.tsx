import Gastronomia from "@/views/Gastronomia";
import { createPageMetadata, createPageJsonLd } from "@/config/metadata";
import { safeJsonLd } from "@/utils/json-ld";

export const metadata = createPageMetadata("/gastronomia");

export default function GastronomiaPage() {
  const jsonLd = createPageJsonLd("/gastronomia");
  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
        />
      )}
      <Gastronomia />
    </>
  );
}
