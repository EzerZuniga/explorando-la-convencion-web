import Home from "@/views/Home";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata("/");

export default function HomePage() {
  return <Home />;
}
