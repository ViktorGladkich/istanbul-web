"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const links = [
  { href: "/admin/orders", label: "Bestellungen" },
  { href: "/admin/menu", label: "Speisekarte" },
  { href: "/admin/qrcodes", label: "QR-Codes" },
];

export function AdminNav() {
  const pathname = usePathname() ?? "";
  return (
    <nav className="sticky top-0 z-40 border-b border-[var(--brand-neutral)] bg-[var(--brand-bg)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-6 py-5 md:px-12">
        <Link
          href="/admin/orders"
          className="font-display text-xl tracking-[-0.005em] text-[var(--brand-text)]"
        >
          Istanbul · Admin
        </Link>

        <div className="flex items-center gap-2 md:gap-6">
          {links.map((l) => {
            const active = pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={[
                  "font-body text-[11px] font-medium uppercase tracking-[0.28em] transition-colors duration-500",
                  active
                    ? "text-[var(--brand-text)]"
                    : "text-[var(--brand-muted)] hover:text-[var(--brand-text)]",
                ].join(" ")}
              >
                {l.label}
              </Link>
            );
          })}

          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="ml-2 border border-[var(--brand-neutral)] px-4 py-2 font-body text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--brand-muted)] transition-colors duration-500 hover:border-[var(--brand-text)] hover:text-[var(--brand-text)]"
          >
            Abmelden
          </button>
        </div>
      </div>
    </nav>
  );
}
