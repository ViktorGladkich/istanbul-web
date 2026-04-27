"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  toggleMenuAvailability,
  updateMenuPrice,
} from "@/app/[locale]/admin/(protected)/menu/actions";
import type { MenuCategory } from "@/lib/menu";

type AdminMenuItem = {
  id: string;
  nameDE: string;
  nameTR: string;
  nameEN: string;
  price: number;
  category: MenuCategory;
  isAvailable: boolean;
  isVegetarian: boolean;
  isSpicy: boolean;
};

export function MenuEditor({
  items,
  categories,
  categoryLabels,
}: {
  items: AdminMenuItem[];
  categories: readonly MenuCategory[];
  categoryLabels: Record<MenuCategory, string>;
}) {
  const grouped = categories
    .map((cat) => ({
      cat,
      label: categoryLabels[cat],
      list: items.filter((i) => i.category === cat),
    }))
    .filter((g) => g.list.length > 0);

  return (
    <div className="space-y-16">
      {grouped.map((group) => (
        <section key={group.cat}>
          <h2 className="mb-6 font-display text-2xl tracking-[-0.005em] text-[var(--brand-text)]">
            {group.label}
            <span className="ml-3 font-accent italic text-base text-[var(--brand-gold)]">
              {group.list.length}
            </span>
          </h2>
          <div className="border-t border-[var(--brand-neutral)]">
            {group.list.map((item) => (
              <MenuRow key={item.id} item={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function formatEUR(value: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

function MenuRow({ item }: { item: AdminMenuItem }) {
  const [available, setAvailable] = useState(item.isAvailable);
  const [priceText, setPriceText] = useState(item.price.toFixed(2));
  const [pending, startTransition] = useTransition();

  const onToggle = () => {
    const next = !available;
    setAvailable(next);
    startTransition(async () => {
      try {
        await toggleMenuAvailability(item.id, next);
        toast.success(next ? "Auf der Karte" : "Von der Karte genommen");
      } catch (err) {
        console.error(err);
        setAvailable(!next);
        toast.error("Konnte nicht gespeichert werden.");
      }
    });
  };

  const commitPrice = () => {
    const parsed = parseFloat(priceText.replace(",", "."));
    if (Number.isNaN(parsed) || parsed < 0) {
      setPriceText(item.price.toFixed(2));
      toast.error("Ungültiger Preis.");
      return;
    }
    if (Math.abs(parsed - item.price) < 0.005) {
      setPriceText(parsed.toFixed(2));
      return;
    }
    startTransition(async () => {
      try {
        await updateMenuPrice(item.id, parsed);
        toast.success(`Preis aktualisiert · ${formatEUR(parsed)}`);
        setPriceText(parsed.toFixed(2));
      } catch (err) {
        console.error(err);
        setPriceText(item.price.toFixed(2));
        toast.error("Preis konnte nicht aktualisiert werden.");
      }
    });
  };

  return (
    <div className="grid grid-cols-12 items-center gap-x-6 gap-y-2 border-b border-[var(--brand-neutral)] py-5">
      <div className="col-span-12 md:col-span-6">
        <h3 className="font-display text-lg tracking-[-0.005em] text-[var(--brand-text)]">
          {item.nameDE}
        </h3>
        <p className="mt-1 font-body text-[11px] font-light uppercase tracking-[0.22em] text-[var(--brand-muted)]">
          {item.nameTR} · {item.nameEN}
          {item.isVegetarian && " · vegetarisch"}
          {item.isSpicy && " · scharf"}
        </p>
      </div>

      <div className="col-span-6 md:col-span-3">
        <label className="block font-body text-[10px] font-light uppercase tracking-[0.28em] text-[var(--brand-muted)]">
          Preis (EUR)
        </label>
        <input
          type="text"
          inputMode="decimal"
          value={priceText}
          onChange={(e) => setPriceText(e.target.value)}
          onBlur={commitPrice}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.currentTarget.blur();
            }
          }}
          disabled={pending}
          className="mt-1 w-full border-0 border-b border-[var(--brand-neutral)] bg-transparent px-0 py-2 font-accent italic text-xl text-[var(--brand-gold)] outline-none transition-colors duration-500 focus:border-[var(--brand-terra)] disabled:opacity-50"
        />
      </div>

      <div className="col-span-6 md:col-span-3 md:text-right">
        <button
          type="button"
          onClick={onToggle}
          disabled={pending}
          aria-pressed={available}
          className={[
            "inline-flex items-center gap-3 border px-5 py-2.5 font-body text-[10px] font-medium uppercase tracking-[0.28em] transition-colors duration-500 disabled:opacity-50",
            available
              ? "border-[var(--brand-text)] text-[var(--brand-text)]"
              : "border-[var(--brand-neutral)] text-[var(--brand-muted)] hover:border-[var(--brand-text)]",
          ].join(" ")}
        >
          <span
            aria-hidden
            className={[
              "inline-block h-1.5 w-1.5 rounded-full",
              available ? "bg-[var(--brand-gold)]" : "bg-[var(--brand-muted)]",
            ].join(" ")}
          />
          {available ? "Verfügbar" : "Pausiert"}
        </button>
      </div>
    </div>
  );
}
