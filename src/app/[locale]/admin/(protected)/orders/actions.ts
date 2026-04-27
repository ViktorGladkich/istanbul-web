"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";
import { ORDER_STATUSES, type OrderStatus } from "@/lib/orders";

export async function updateOrderStatus(
  orderId: string,
  newStatus: OrderStatus,
) {
  await requireAdmin();
  if (!(ORDER_STATUSES as readonly string[]).includes(newStatus)) {
    throw new Error("invalid_status");
  }
  if (!orderId) throw new Error("missing_order_id");

  await prisma.order.update({
    where: { id: orderId },
    data: { status: newStatus },
  });
  revalidatePath("/admin/orders");
}
