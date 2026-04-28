import "server-only";
import { prisma } from "@/lib/prisma";
import { MenuJsonLd } from "./StructuredData";
import type { Locale } from "@/lib/menu";

export async function MenuStructuredData({ locale }: { locale: Locale }) {
  const items = await prisma.menuItem.findMany({
    where: { isAvailable: true },
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
    select: {
      id: true,
      nameDE: true,
      nameTR: true,
      nameEN: true,
      descDE: true,
      descTR: true,
      descEN: true,
      price: true,
      category: true,
    },
  });
  return <MenuJsonLd items={items} locale={locale} />;
}
