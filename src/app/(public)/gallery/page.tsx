import Gallery from "@/views/Gallery";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata("/gallery");

export default function GalleryPage() {
  return <Gallery />;
}
