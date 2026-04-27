"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useEffect, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  category: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  add: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  remove: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (item, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i,
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity }] };
        }),
      remove: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      increment: (id) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        })),
      decrement: (id) =>
        set((state) => ({
          items: state.items.flatMap((i) => {
            if (i.id !== id) return [i];
            if (i.quantity <= 1) return [];
            return [{ ...i, quantity: i.quantity - 1 }];
          }),
        })),
      clear: () => set({ items: [] }),
    }),
    {
      name: "istanbul-cart",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);

/** Selectors — kept outside to avoid recomputing on every render. */
export const selectItemCount = (s: CartState) =>
  s.items.reduce((sum, i) => sum + i.quantity, 0);

export const selectSubtotal = (s: CartState) =>
  s.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

/**
 * Returns true once Zustand has rehydrated from localStorage on the client.
 * Use to avoid SSR/CSR badge count mismatches.
 */
export function useCartHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    const unsub = useCart.persist.onFinishHydration(() => setHydrated(true));
    setHydrated(useCart.persist.hasHydrated());
    return unsub;
  }, []);
  return hydrated;
}
