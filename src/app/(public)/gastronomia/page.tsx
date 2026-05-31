import Gastronomia from "@/views/Gastronomia";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata("/gastronomia");

export default function GastronomiaPage() {
  return <Gastronomia />;
}
