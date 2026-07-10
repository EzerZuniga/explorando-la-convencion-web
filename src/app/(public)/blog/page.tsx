import Blog from "@/views/Blog";
import { createPageMetadata, createPageJsonLd } from "@/config/metadata";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = createPageMetadata("/blog");

export default function BlogPage() {
  const jsonLd = createPageJsonLd("/blog");
  return (
    <>
      <JsonLd data={jsonLd} />
      <Blog />
    </>
  );
}
