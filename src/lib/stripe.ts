import "server-only";
import Stripe from "stripe";

const secret = process.env.STRIPE_SECRET_KEY;
if (!secret) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}

export const stripe = new Stripe(secret, {
  appInfo: { name: "Istanbul Restaurant Dresden" },
  typescript: true,
});

export function stripeLocaleFor(locale: string): "tr" | "en" | "de" {
  if (locale === "tr") return "tr";
  if (locale === "en") return "en";
  return "de";
}
