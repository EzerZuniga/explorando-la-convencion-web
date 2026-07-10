import Gastronomia from "@/views/Gastronomia";
import { createPageMetadata, createPageJsonLd } from "@/config/metadata";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = createPageMetadata("/gastronomia");

export default function GastronomiaPage() {
  const jsonLd = createPageJsonLd("/gastronomia");
  return (
    <>
      <JsonLd data={jsonLd} />
      <Gastronomia />
    </>
  );
}
