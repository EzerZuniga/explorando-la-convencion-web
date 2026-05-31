import Destinations from "@/views/Destinations";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata("/destinations");

export default function DestinationsPage() {
  return <Destinations />;
}
