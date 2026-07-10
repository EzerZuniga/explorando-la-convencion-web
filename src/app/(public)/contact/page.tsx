import Contact from "@/views/Contact";
import { createPageMetadata, createPageJsonLd } from "@/config/metadata";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = createPageMetadata("/contact");

export default function ContactPage() {
  const jsonLd = createPageJsonLd("/contact");
  return (
    <>
      <JsonLd data={jsonLd} />
      <Contact />
    </>
  );
}
