import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { stripe, stripeLocaleFor } from "@/lib/stripe";
import { orderPayloadSchema, toMinorUnits } from "@/lib/orders";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function pickName(
  item: { nameDE: string; nameTR: string; nameEN: string },
  locale: "de" | "tr" | "en",
) {
  if (locale === "tr") return item.nameTR;
  if (locale === "en") return item.nameEN;
  return item.nameDE;
}

function pickDesc(
  item: { descDE: string | null; descTR: string | null; descEN: string | null },
  locale: "de" | "tr" | "en",
) {
  if (locale === "tr") return item.descTR;
  if (locale === "en") return item.descEN;
  return item.descDE;
}

export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = orderPayloadSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;

  const ids = Array.from(new Set(data.items.map((i) => i.menuItemId)));
  const dbItems = await prisma.menuItem.findMany({
    where: { id: { in: ids }, isAvailable: true },
  });
  if (dbItems.length === 0) {
    return NextResponse.json({ error: "no_items_available" }, { status: 400 });
  }

  const byId = new Map(dbItems.map((i) => [i.id, i]));
  const lines = data.items
    .filter((i) => byId.has(i.menuItemId))
    .map((i) => ({ quantity: i.quantity, db: byId.get(i.menuItemId)! }));

  if (lines.length === 0) {
    return NextResponse.json({ error: "no_items_available" }, { status: 400 });
  }

  const totalAmount = lines.reduce(
    (sum, l) => sum + l.db.price * l.quantity,
    0,
  );

  const tableNumber =
    data.orderType === "dine_in" ? data.tableNumber || null : null;

  const order = await prisma.order.create({
    data: {
      status: "pending_payment",
      orderType: data.orderType,
      tableNumber,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerEmail: data.customerEmail || null,
      customerAddress: null,
      notes: data.notes || null,
      totalAmount,
      items: {
        create: lines.map((l) => ({
          menuItemId: l.db.id,
          quantity: l.quantity,
          price: l.db.price,
        })),
      },
    },
  });

  const hdrs = await headers();
  const origin =
    hdrs.get("origin") ||
    hdrs.get("referer")?.replace(/(https?:\/\/[^/]+).*/, "$1") ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000";
  const localePath = data.locale === "de" ? "" : `/${data.locale}`;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      locale: stripeLocaleFor(data.locale),
      customer_email: data.customerEmail || undefined,
      line_items: lines.map((l) => {
        const name = pickName(l.db, data.locale);
        const desc = pickDesc(l.db, data.locale);
        return {
          quantity: l.quantity,
          price_data: {
            currency: "eur",
            unit_amount: toMinorUnits(l.db.price),
            product_data: {
              name,
              ...(desc ? { description: desc } : {}),
              metadata: { menuItemId: l.db.id },
            },
          },
        };
      }),
      success_url: `${origin}${localePath}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}${localePath}/order?canceled=1`,
      metadata: {
        orderId: order.id,
        locale: data.locale,
        orderType: data.orderType,
      },
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });

    return NextResponse.json({
      orderId: order.id,
      sessionId: session.id,
      checkoutUrl: session.url,
    });
  } catch (err) {
    console.error("[orders] stripe session create failed", err);
    await prisma.order.update({
      where: { id: order.id },
      data: { status: "canceled" },
    });
    return NextResponse.json(
      { error: "stripe_session_failed" },
      { status: 502 },
    );
  }
}
