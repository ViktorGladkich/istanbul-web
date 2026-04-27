"use client";

import { Toaster } from "sonner";

export function BrandToaster() {
  return (
    <Toaster
      position="bottom-right"
      duration={2400}
      gap={12}
      visibleToasts={3}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "flex items-center gap-3 border border-[var(--brand-neutral)] bg-[var(--brand-bg)] px-5 py-4 shadow-[0_8px_30px_rgba(26,20,16,0.18)]",
          title:
            "font-body text-sm font-light tracking-[0.04em] text-[var(--brand-text)]",
          description:
            "font-body text-xs font-light text-[var(--brand-muted)]",
        },
      }}
    />
  );
}
