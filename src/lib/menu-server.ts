import "server-only";
import { prisma } from "@/lib/prisma";
import type { Locale, LocalizedMenuItem, MenuCategory } from "./menu";

export async function getMenuItems(
  locale: Locale,
): Promise<LocalizedMenuItem[]> {
  const items = await prisma.menuItem.findMany({
    where: { isAvailable: true },
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }, { createdAt: "asc" }],
  });

  return items.map((item) => ({
    id: item.id,
    name:
      locale === "tr"
        ? item.nameTR
        : locale === "en"
          ? item.nameEN
          : item.nameDE,
    description:
      locale === "tr"
        ? item.descTR
        : locale === "en"
          ? item.descEN
          : item.descDE,
    price: item.price,
    category: item.category as MenuCategory,
    imageUrl: item.imageUrl,
    isSpicy: item.isSpicy,
    isVegetarian: item.isVegetarian,
  }));
}
