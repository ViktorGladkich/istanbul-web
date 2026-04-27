import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[webhooks/stripe] STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "missing_secret" }, { status: 500 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "missing_signature" }, { status: 400 });
  }

  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, secret);
  } catch (err) {
    console.error("[webhooks/stripe] signature verification failed", err);
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object as Stripe.Checkout.Session;
        await markOrderPaid(session);
        break;
      }
      case "checkout.session.expired":
      case "checkout.session.async_payment_failed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await markOrderCanceled(session);
        break;
      }
      default:
        // No-op for other events; respond 200 so Stripe stops retrying.
        break;
    }
  } catch (err) {
    console.error("[webhooks/stripe] handler failed", event.type, err);
    return NextResponse.json({ error: "handler_failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function markOrderPaid(session: Stripe.Checkout.Session) {
  const orderId = session.metadata?.orderId;
  if (!orderId) {
    console.warn("[webhooks/stripe] session without orderId metadata", session.id);
    return;
  }

  const paymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id;

  const updated = await prisma.order.updateMany({
    where: { id: orderId, status: "pending_payment" },
    data: {
      status: "paid",
      stripePaymentId: paymentIntentId ?? session.id,
      stripeSessionId: session.id,
    },
  });

  if (updated.count === 0) {
    // Already processed or order not in pending state — log and skip.
    console.info(
      "[webhooks/stripe] order not transitioned (already processed?)",
      orderId,
    );
  }
}

async function markOrderCanceled(session: Stripe.Checkout.Session) {
  const orderId = session.metadata?.orderId;
  if (!orderId) return;
  await prisma.order.updateMany({
    where: { id: orderId, status: "pending_payment" },
    data: { status: "canceled" },
  });
}
