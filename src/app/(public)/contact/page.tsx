import Contact from "@/views/Contact";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata("/contact");

export default function ContactPage() {
  return <Contact />;
}
