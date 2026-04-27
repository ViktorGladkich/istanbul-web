import "server-only";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

/** Throws a redirect to /admin/login if there is no active admin session. */
export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}
