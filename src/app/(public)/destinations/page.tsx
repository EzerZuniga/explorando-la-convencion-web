import Destinations from "@/views/Destinations";
import { createPageMetadata, createPageJsonLd } from "@/config/metadata";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = createPageMetadata("/destinations");

export default function DestinationsPage() {
  const jsonLd = createPageJsonLd("/destinations");
  return (
    <>
      <JsonLd data={jsonLd} />
      <Destinations />
    </>
  );
}
