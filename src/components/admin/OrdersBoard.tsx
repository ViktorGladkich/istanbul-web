"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getSupabaseBrowser } from "@/lib/supabase-browser";
import { updateOrderStatus } from "@/app/[locale]/admin/(protected)/orders/actions";
import type { OrderStatus } from "@/lib/orders";

type AdminOrder = {
  id: string;
  status: OrderStatus;
  orderType: string;
  tableNumber: string | null;
  customerName: string | null;
  customerPhone: string | null;
  customerEmail: string | null;
  notes: string | null;
  totalAmount: number;
  createdAt: string;
  items: { id: string; name: string; quantity: number; price: number }[];
};

const COLUMNS: { status: OrderStatus; label: string }[] = [
  { status: "paid", label: "Bezahlt" },
  { status: "preparing", label: "In Zubereitung" },
  { status: "ready", label: "Bereit" },
  { status: "delivered", label: "Ausgeliefert" },
];

const NEXT_STATUS: Partial<Record<OrderStatus, OrderStatus>> = {
  paid: "preparing",
  preparing: "ready",
  ready: "delivered",
};

const NEXT_LABEL: Partial<Record<OrderStatus, string>> = {
  paid: "→ Zubereitung starten",
  preparing: "→ Bereit",
  ready: "→ Ausgeliefert",
};

const TYPE_LABEL: Record<string, string> = {
  dine_in: "Im Restaurant",
  takeaway: "Mitnehmen",
};

export function OrdersBoard({
  initialOrders,
}: {
  initialOrders: AdminOrder[];
}) {
  const router = useRouter();
  const [orders] = useState(initialOrders);

  // Realtime subscription — refresh server data on any Order change.
  useEffect(() => {
    const supabase = getSupabaseBrowser();
    if (!supabase) return;

    const channel = supabase
      .channel("admin-orders")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Order" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            toast.success("Neue Bestellung");
          }
          router.refresh();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router]);

  const grouped = useMemo(() => {
    const map = new Map<OrderStatus, AdminOrder[]>(
      COLUMNS.map((c) => [c.status, []]),
    );
    for (const o of orders) {
      const list = map.get(o.status);
      if (list) list.push(o);
    }
    return map;
  }, [orders]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
      {COLUMNS.map(({ status, label }) => {
        const list = grouped.get(status) ?? [];
        return (
          <div
            key={status}
            className="border border-[var(--brand-neutral)] bg-[var(--brand-card)]/40 p-5"
          >
            <header className="mb-5 flex items-baseline justify-between">
              <h2 className="font-body text-[11px] font-medium uppercase tracking-[0.32em] text-[var(--brand-text)]">
                {label}
              </h2>
              <span className="font-accent italic text-base text-[var(--brand-gold)]">
                {list.length}
              </span>
            </header>

            <div className="space-y-4">
              {list.length === 0 && (
                <p className="font-body text-xs font-light text-[var(--brand-muted)]/80">
                  —
                </p>
              )}
              {list.map((o) => (
                <OrderCard key={o.id} order={o} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function OrderCard({ order }: { order: AdminOrder }) {
  const [pending, startTransition] = useTransition();
  const next = NEXT_STATUS[order.status];

  const advance = () => {
    if (!next) return;
    startTransition(async () => {
      try {
        await updateOrderStatus(order.id, next);
      } catch (err) {
        console.error(err);
        toast.error("Status konnte nicht aktualisiert werden.");
      }
    });
  };

  return (
    <article className="border border-[var(--brand-neutral)] bg-[var(--brand-bg)] p-4">
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="font-accent italic text-base text-[var(--brand-text)]">
            #{order.id.slice(-6).toUpperCase()}
          </p>
          <p className="mt-0.5 font-body text-[10px] font-light uppercase tracking-[0.22em] text-[var(--brand-muted)]">
            {formatTime(order.createdAt)} ·{" "}
            {TYPE_LABEL[order.orderType] ?? order.orderType}
            {order.tableNumber ? ` · Tisch ${order.tableNumber}` : ""}
          </p>
        </div>
        <span className="font-accent italic text-base text-[var(--brand-gold)]">
          {formatPrice(order.totalAmount)}
        </span>
      </header>

      {(order.customerName || order.customerPhone) && (
        <p className="mt-3 font-body text-xs font-light text-[var(--brand-text)]/85">
          {order.customerName}
          {order.customerName && order.customerPhone ? " · " : ""}
          {order.customerPhone && (
            <a
              href={`tel:${order.customerPhone}`}
              className="text-[var(--brand-text)] underline-offset-4 hover:underline"
            >
              {order.customerPhone}
            </a>
          )}
        </p>
      )}

      <ul className="mt-3 space-y-1">
        {order.items.map((it) => (
          <li
            key={it.id}
            className="flex items-baseline justify-between gap-3 font-body text-xs font-light text-[var(--brand-text)]/80"
          >
            <span>
              <span className="font-accent italic text-[var(--brand-muted)]">
                ×{it.quantity}
              </span>{" "}
              {it.name}
            </span>
            <span className="font-accent italic text-[var(--brand-muted)]">
              {formatPrice(it.price * it.quantity)}
            </span>
          </li>
        ))}
      </ul>

      {order.notes && (
        <p className="mt-3 border-l-2 border-[var(--brand-terra)]/60 pl-3 font-body text-xs font-light italic text-[var(--brand-text)]/80">
          {order.notes}
        </p>
      )}

      {next && (
        <button
          type="button"
          onClick={advance}
          disabled={pending}
          className="mt-4 w-full border border-[var(--brand-text)] py-2.5 font-body text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--brand-text)] transition-colors duration-500 hover:border-[var(--brand-terra)] hover:text-[var(--brand-terra)] disabled:opacity-50"
        >
          {pending ? "…" : NEXT_LABEL[order.status]}
        </button>
      )}
    </article>
  );
}
