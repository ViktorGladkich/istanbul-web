import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Anmelden",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/admin/orders");

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-20">
      <div className="w-full max-w-sm">
        <header className="mb-12 text-center">
          <p className="font-body text-[11px] font-light uppercase tracking-[0.32em] text-[var(--brand-muted)]">
            Istanbul · Admin
          </p>
          <h1 className="mt-4 font-display text-4xl tracking-[-0.005em] text-[var(--brand-text)]">
            Anmeldung
          </h1>
        </header>
        <LoginForm />
      </div>
    </div>
  );
}
