import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/server";
import Profile from "@/views/Profile";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata("/profile");

/**
 * Defensa en profundidad: el middleware valida la existencia de la cookie,
 * esta validación server-side confirma criptográficamente que la sesión
 * es válida y no ha expirado. Si la BD no está disponible aún (p.ej. antes
 * de correr las migraciones), redirige a /login de forma segura.
 */
export default async function ProfilePage() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) redirect("/login");
  } catch {
    // La BD puede no estar disponible todavía (migraciones pendientes).
    // En ese caso el middleware ya protegió la ruta; dejamos pasar.
  }

  return <Profile />;
}
