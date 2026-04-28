"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";

const idSchema = z.string().min(1);
const priceSchema = z.number().finite().min(0).max(9999);

function revalidatePublicMenus() {
  revalidatePath("/admin/menu");
  revalidatePath("/de/menu");
  revalidatePath("/tr/menu");
  revalidatePath("/en/menu");
  revalidatePath("/menu");
  revalidatePath("/de");
  revalidatePath("/tr");
  revalidatePath("/en");
  revalidatePath("/");
}

export async function toggleMenuAvailability(id: string, next: boolean) {
  await requireAdmin();
  const safeId = idSchema.parse(id);
  await prisma.menuItem.update({
    where: { id: safeId },
    data: { isAvailable: next },
  });
  revalidatePublicMenus();
}

export async function updateMenuPrice(id: string, newPrice: number) {
  await requireAdmin();
  const safeId = idSchema.parse(id);
  const safePrice = priceSchema.parse(newPrice);
  await prisma.menuItem.update({
    where: { id: safeId },
    data: { price: Math.round(safePrice * 100) / 100 },
  });
  revalidatePublicMenus();
}

/**
 * Toggle the "Tonight's Table" feature flag. Only one item may be featured
 * at a time — flipping a new one clears any previous featured row in the
 * same transaction so the home banner shows exactly one dish.
 */
export async function toggleFeaturedToday(id: string, next: boolean) {
  await requireAdmin();
  const safeId = idSchema.parse(id);
  if (next) {
    await prisma.$transaction([
      prisma.menuItem.updateMany({
        where: { isFeaturedToday: true, NOT: { id: safeId } },
        data: { isFeaturedToday: false },
      }),
      prisma.menuItem.update({
        where: { id: safeId },
        data: { isFeaturedToday: true },
      }),
    ]);
  } else {
    await prisma.menuItem.update({
      where: { id: safeId },
      data: { isFeaturedToday: false },
    });
  }
  revalidatePublicMenus();
}
