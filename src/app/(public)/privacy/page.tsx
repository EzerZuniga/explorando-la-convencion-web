import { Privacy } from "@/views/Legal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | Explorando La Convención",
  description: "Política de privacidad y protección de datos personales de Explorando La Convención.",
};

export default function PrivacyPage() {
  return <Privacy />;
}
