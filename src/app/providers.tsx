"use client";

import type { ReactNode } from "react";
import { LanguageProvider } from "@/features/i18n";

export function AppProviders({ children }: { children: ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
