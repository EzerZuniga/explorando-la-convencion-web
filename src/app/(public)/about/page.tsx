import About from "@/views/About";
import { createPageMetadata, createPageJsonLd } from "@/config/metadata";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = createPageMetadata("/about");

export default function AboutPage() {
  const jsonLd = createPageJsonLd("/about");
  return (
    <>
      <JsonLd data={jsonLd} />
      <About />
    </>
  );
}
