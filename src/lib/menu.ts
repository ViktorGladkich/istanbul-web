/**
 * Menu domain types + constants. Safe to import from client components.
 * Server-only DB access lives in `./menu-server`.
 */

export const MENU_CATEGORIES = [
  "meze",
  "ana_yemek",
  "kebab",
  "tatli",
  "icecek",
] as const;

export type MenuCategory = (typeof MENU_CATEGORIES)[number];

export type Locale = "de" | "tr" | "en";

export type LocalizedMenuItem = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: MenuCategory;
  imageUrl: string | null;
  isSpicy: boolean;
  isVegetarian: boolean;
};
