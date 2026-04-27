import { z } from "zod";

export const ORDER_TYPES = ["dine_in", "takeaway"] as const;
export type OrderType = (typeof ORDER_TYPES)[number];

export const ORDER_STATUSES = [
  "pending_payment",
  "paid",
  "preparing",
  "ready",
  "delivered",
  "canceled",
] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const ORDER_LOCALES = ["de", "tr", "en"] as const;
export type OrderLocale = (typeof ORDER_LOCALES)[number];

export const orderItemPayloadSchema = z.object({
  menuItemId: z.string().min(1),
  quantity: z.number().int().positive().max(50),
});

const baseSchema = z.object({
  items: z.array(orderItemPayloadSchema).min(1).max(40),
  orderType: z.enum(ORDER_TYPES),
  customerName: z.string().trim().min(2).max(100),
  customerPhone: z
    .string()
    .trim()
    .min(6)
    .max(30)
    .regex(/^[\d\s+()\-./]+$/, "phone_format"),
  customerEmail: z
    .string()
    .trim()
    .email()
    .optional()
    .or(z.literal("")),
  tableNumber: z.string().trim().max(10).optional().or(z.literal("")),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
  locale: z.enum(ORDER_LOCALES),
});

export const orderPayloadSchema = baseSchema.superRefine((data, ctx) => {
  if (data.orderType === "dine_in" && !data.tableNumber) {
    ctx.addIssue({
      path: ["tableNumber"],
      code: "custom",
      message: "table_required",
    });
  }
});

export type OrderPayload = z.infer<typeof orderPayloadSchema>;

/** Cents for Stripe — handles fractional pricing safely. */
export function toMinorUnits(amount: number): number {
  return Math.round(amount * 100);
}
