import type { Metadata } from "next";
import { QrGenerator } from "@/components/admin/QrGenerator";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "QR-Codes",
  robots: { index: false, follow: false },
};

export default function AdminQrCodesPage() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  return (
    <div className="space-y-12">
      <header className="flex items-end justify-between gap-6 border-b border-[var(--brand-neutral)] pb-8">
        <div>
          <p className="font-body text-[11px] font-light uppercase tracking-[0.32em] text-[var(--brand-muted)]">
            Tische
          </p>
          <h1 className="mt-3 font-display text-4xl tracking-[-0.005em] text-[var(--brand-text)] md:text-5xl">
            QR-Codes
          </h1>
        </div>
        <p className="hidden font-body text-xs font-light text-[var(--brand-muted)] md:block">
          Tischnummer eingeben — QR herunterladen — drucken.
        </p>
      </header>

      <QrGenerator baseUrl={baseUrl} />
    </div>
  );
}
