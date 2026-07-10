import { safeJsonLd } from "@/utils/json-ld";

interface JsonLdProps {
  data: object | null | undefined;
}

export function JsonLd({ data }: JsonLdProps) {
  if (!data) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      // JSON-LD must be rendered as script content; safeJsonLd escapes unsafe characters.
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }}
    />
  );
}
