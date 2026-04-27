"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useCart } from "@/hooks/useCart";

export function SuccessClient({ orderId }: { orderId: string | null }) {
  const t = useTranslations("order.toasts");
  const fired = useRef<string | null>(null);

  useEffect(() => {
    // Run once per orderId so refreshes don't re-toast.
    if (!orderId || fired.current === orderId) return;
    fired.current = orderId;
    useCart.getState().clear();
    toast.success(t("success"));
  }, [orderId, t]);

  return null;
}
