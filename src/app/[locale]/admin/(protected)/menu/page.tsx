import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { MenuEditor } from "@/components/admin/MenuEditor";
import { MENU_CATEGORIES, type MenuCategory } from "@/lib/menu";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Speisekarte",
  robots: { index: false, follow: false },
};

const CATEGORY_LABELS: Record<MenuCategory, string> = {
  meze: "Mezeler",
  ana_yemek: "Hauptgerichte",
  kebab: "Kebap",
  tatli: "Tatlı",
  icecek: "Getränke",
};

export default async function AdminMenuPage() {
  const rows = await prisma.menuItem.findMany({
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }, { createdAt: "asc" }],
  });

  const items = rows.map((r) => ({
    id: r.id,
    nameDE: r.nameDE,
    nameTR: r.nameTR,
    nameEN: r.nameEN,
    price: r.price,
    category: r.category as MenuCategory,
    isAvailable: r.isAvailable,
    isVegetarian: r.isVegetarian,
    isSpicy: r.isSpicy,
    isFeaturedToday: r.isFeaturedToday,
  }));

  return (
    <div className="space-y-12">
      <header className="flex items-end justify-between gap-6 border-b border-[var(--brand-neutral)] pb-8">
        <div>
          <p className="font-body text-[11px] font-light uppercase tracking-[0.32em] text-[var(--brand-muted)]">
            Karte
          </p>
          <h1 className="mt-3 font-display text-4xl tracking-[-0.005em] text-[var(--brand-text)] md:text-5xl">
            Speisekarte
          </h1>
        </div>
        <p className="hidden font-body text-xs font-light text-[var(--brand-muted)] md:block">
          {items.length} Gerichte ·{" "}
          {items.filter((i) => i.isAvailable).length} verfügbar
        </p>
      </header>

      <MenuEditor items={items} categories={MENU_CATEGORIES as readonly MenuCategory[]} categoryLabels={CATEGORY_LABELS} />
    </div>
  );
}
