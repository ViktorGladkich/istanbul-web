import { requireAdmin } from "@/lib/admin-guard";
import { AdminNav } from "@/components/admin/AdminNav";

export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();
  return (
    <>
      <AdminNav />
      <main className="mx-auto max-w-[1600px] px-6 py-12 md:px-12">
        {children}
      </main>
    </>
  );
}
