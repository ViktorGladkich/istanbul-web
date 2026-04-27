import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { OrdersBoard } from "@/components/admin/OrdersBoard";
import type { OrderStatus } from "@/lib/orders";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Bestellungen",
  robots: { index: false, follow: false },
};

const VISIBLE_STATUSES: OrderStatus[] = [
  "paid",
  "preparing",
  "ready",
  "delivered",
];

export default async function AdminOrdersPage() {
  const rows = await prisma.order.findMany({
    where: { status: { in: VISIBLE_STATUSES } },
    include: {
      items: {
        include: { menuItem: { select: { nameDE: true } } },
      },
    },
    orderBy: [{ createdAt: "desc" }],
    take: 80,
  });

  const orders = rows.map((o) => ({
    id: o.id,
    status: o.status as OrderStatus,
    orderType: o.orderType,
    tableNumber: o.tableNumber,
    customerName: o.customerName,
    customerPhone: o.customerPhone,
    customerEmail: o.customerEmail,
    notes: o.notes,
    totalAmount: o.totalAmount,
    createdAt: o.createdAt.toISOString(),
    items: o.items.map((it) => ({
      id: it.id,
      quantity: it.quantity,
      price: it.price,
      name: it.menuItem.nameDE,
    })),
  }));

  return (
    <div className="space-y-12">
      <header className="flex items-end justify-between gap-6 border-b border-[var(--brand-neutral)] pb-8">
        <div>
          <p className="font-body text-[11px] font-light uppercase tracking-[0.32em] text-[var(--brand-muted)]">
            Heute
          </p>
          <h1 className="mt-3 font-display text-4xl tracking-[-0.005em] text-[var(--brand-text)] md:text-5xl">
            Bestellungen
          </h1>
        </div>
        <p className="hidden font-body text-xs font-light text-[var(--brand-muted)] md:block">
          Echtzeit · {orders.length} aktiv
        </p>
      </header>

      <OrdersBoard initialOrders={orders} />
    </div>
  );
}
