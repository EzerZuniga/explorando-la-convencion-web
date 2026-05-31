import type { ReactNode } from "react";
import MainLayout from "@/components/layoutComponents/MainLayout";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
