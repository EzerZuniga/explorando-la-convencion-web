import Profile from "@/views/Profile";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata("/profile");

export default function ProfilePage() {
  return <Profile />;
}
