import Blog from "@/views/Blog";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata("/blog");

export default function BlogPage() {
  return <Blog />;
}
