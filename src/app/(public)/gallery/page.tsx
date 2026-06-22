import Gallery from "@/views/Gallery";
import { createPageMetadata, createPageJsonLd } from "@/config/metadata";
import { safeJsonLd } from "@/utils/json-ld";

export const metadata = createPageMetadata("/gallery");

export default function GalleryPage() {
  const jsonLd = createPageJsonLd("/gallery");
  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
        />
      )}
      <Gallery />
    </>
  );
}
