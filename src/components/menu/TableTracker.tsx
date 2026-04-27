"use client";

import { useEffect } from "react";

const STORAGE_KEY = "istanbul-table";

/**
 * Reads `?table=NN` from the URL and stashes it in sessionStorage.
 * /order's CheckoutForm reads it as a fallback so guests don't retype
 * the table number after scanning a QR code.
 */
export function TableTracker() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const table = params.get("table");
    if (!table) return;
    const cleaned = table.trim().slice(0, 10);
    if (cleaned) {
      window.sessionStorage.setItem(STORAGE_KEY, cleaned);
    }
  }, []);

  return null;
}
