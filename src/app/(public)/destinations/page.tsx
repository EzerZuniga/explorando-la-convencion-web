import Destinations from "@/views/Destinations";
import { createPageMetadata, createPageJsonLd } from "@/config/metadata";
import { safeJsonLd } from "@/utils/json-ld";

export const metadata = createPageMetadata("/destinations");

export default function DestinationsPage() {
  const jsonLd = createPageJsonLd("/destinations");
  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
        />
      )}
      <Destinations />
    </>
  );
}
