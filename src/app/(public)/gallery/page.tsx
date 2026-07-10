import Gallery from "@/views/Gallery";
import { createPageMetadata, createPageJsonLd } from "@/config/metadata";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = createPageMetadata("/gallery");

export default function GalleryPage() {
  const jsonLd = createPageJsonLd("/gallery");
  return (
    <>
      <JsonLd data={jsonLd} />
      <Gallery />
    </>
  );
}
