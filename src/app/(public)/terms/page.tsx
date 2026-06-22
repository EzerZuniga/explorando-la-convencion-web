import { Terms } from "@/views/Legal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones | Explorando La Convención",
  description: "Términos y condiciones de uso del portal Explorando La Convención.",
};

export default function TermsPage() {
  return <Terms />;
}
