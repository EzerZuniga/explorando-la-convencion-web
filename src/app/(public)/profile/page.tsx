import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/server";
import Profile from "@/views/Profile";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata("/profile");

export default async function ProfilePage() {
  const session = await auth();
  if (!session) redirect("/login");

  return <Profile />;
}
