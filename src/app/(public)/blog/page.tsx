import Blog from "@/views/Blog";
import { createPageMetadata, createPageJsonLd } from "@/config/metadata";
import { safeJsonLd } from "@/utils/json-ld";

export const metadata = createPageMetadata("/blog");

export default function BlogPage() {
  const jsonLd = createPageJsonLd("/blog");
  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
        />
      )}
      <Blog />
    </>
  );
}
