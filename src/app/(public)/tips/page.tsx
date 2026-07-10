import Tips from "@/views/Tips";
import { createPageMetadata, createPageJsonLd } from "@/config/metadata";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = createPageMetadata("/tips");

export default function TipsPage() {
  const jsonLd = createPageJsonLd("/tips");
  return (
    <>
      <JsonLd data={jsonLd} />
      <Tips />
    </>
  );
}
