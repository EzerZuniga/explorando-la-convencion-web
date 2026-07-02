"use client";

import { useSession, signOut as authSignOut, signIn as authSignIn } from "next-auth/react";
import type { User } from "@/types";

export interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
  signIn: (provider: string) => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const { data: session, status } = useSession();

  const user: User | null = session?.user
    ? {
        email: session.user.email ?? "",
        name: session.user.name ?? "",
        picture: session.user.image ?? undefined,
        provider: session.user.provider,
      }
    : null;

  const handleSignOut = async () => {
    await authSignOut({ callbackUrl: "/" });
  };

  const handleSignIn = async (provider: string) => {
    await authSignIn(provider);
  };

  return {
    user,
    isLoading: status === "loading",
    isAuthenticated: !!session?.user,
    signOut: handleSignOut,
    signIn: handleSignIn,
  };
}
