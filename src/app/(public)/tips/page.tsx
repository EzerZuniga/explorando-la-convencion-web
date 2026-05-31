import Tips from "@/views/Tips";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata("/tips");

export default function TipsPage() {
  return <Tips />;
}
