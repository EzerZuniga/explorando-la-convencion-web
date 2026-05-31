import About from "@/views/About";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata("/about");

export default function AboutPage() {
  return <About />;
}
