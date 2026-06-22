"use client";

import { useSession, signOut as authSignOut, signIn as authSignIn } from "@/lib/auth/client";
import type { User } from "@/types";

export interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
  openSignIn: typeof authSignIn.social;
  rawSession: ReturnType<typeof useSession>["data"];
}

export function useAuth(): UseAuthReturn {
  const { data: session, isPending } = useSession();

  const user: User | null = session?.user
    ? {
        email: session.user.email,
        name: session.user.name,
        picture: session.user.image ?? undefined,
      }
    : null;

  const handleSignOut = async () => {
    await authSignOut();
  };

  return {
    user,
    isLoading: isPending,
    isAuthenticated: !!session?.user,
    signOut: handleSignOut,
    openSignIn: authSignIn.social,
    rawSession: session,
  };
}
