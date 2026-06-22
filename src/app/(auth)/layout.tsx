import type { ReactNode } from "react";

/**
 * Auth route group layout — intentionally bare (no Navbar / Footer).
 * The login page fills the entire viewport with its own split-screen design.
 */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
