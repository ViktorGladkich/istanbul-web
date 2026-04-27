"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations, useLocale } from "next-intl";
import { toast } from "sonner";
import { useCart } from "@/hooks/useCart";
import { ORDER_TYPES, type OrderType } from "@/lib/orders";

const formSchema = z
  .object({
    customerName: z.string().trim().min(2, "name_min").max(100),
    customerPhone: z
      .string()
      .trim()
      .min(6, "phone_min")
      .max(30)
      .regex(/^[\d\s+()\-./]+$/, "phone_format"),
    customerEmail: z
      .string()
      .trim()
      .email("email_invalid")
      .or(z.literal("")),
    orderType: z.enum(ORDER_TYPES),
    tableNumber: z.string().trim().max(10),
    notes: z.string().trim().max(500),
  })
  .superRefine((data, ctx) => {
    if (data.orderType === "dine_in" && !data.tableNumber) {
      ctx.addIssue({
        path: ["tableNumber"],
        code: "custom",
        message: "table_required",
      });
    }
  });

type FormValues = z.infer<typeof formSchema>;

const KNOWN_ERRORS = new Set([
  "name_min",
  "phone_min",
  "phone_format",
  "email_invalid",
  "table_required",
  "items_required",
  "required",
  "generic",
]);

export function CheckoutForm({
  prefilledTable = "",
}: {
  prefilledTable?: string;
}) {
  const t = useTranslations("order");
  const locale = useLocale();
  const items = useCart((s) => s.items);
  const [submitting, setSubmitting] = useState(false);

  const defaultValues = useMemo<FormValues>(
    () => ({
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      orderType: "dine_in",
      tableNumber: prefilledTable,
      notes: "",
    }),
    [prefilledTable],
  );

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onTouched",
  });

  // Keep table prefill in sync. Priority: explicit URL `?table=` → sessionStorage
  // (left there by the QR landing on /menu).
  useEffect(() => {
    if (prefilledTable) {
      setValue("tableNumber", prefilledTable);
      return;
    }
    if (typeof window === "undefined") return;
    const stored = window.sessionStorage.getItem("istanbul-table");
    if (stored) setValue("tableNumber", stored);
  }, [prefilledTable, setValue]);

  const orderType = watch("orderType");

  const onSubmit = async (values: FormValues) => {
    if (items.length === 0) {
      toast.error(t("form.errors.items_required"));
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...values,
          locale,
          items: items.map((i) => ({
            menuItemId: i.id,
            quantity: i.quantity,
          })),
        }),
      });

      if (!res.ok) {
        const detail = await res.json().catch(() => null);
        if (detail?.error === "validation") {
          toast.error(t("toasts.error_validation"));
        } else {
          toast.error(t("toasts.error_generic"));
        }
        setSubmitting(false);
        return;
      }

      const data = (await res.json()) as { checkoutUrl?: string };
      if (!data.checkoutUrl) {
        toast.error(t("toasts.error_generic"));
        setSubmitting(false);
        return;
      }
      window.location.assign(data.checkoutUrl);
    } catch (err) {
      console.error("[checkout] submit failed", err);
      toast.error(t("toasts.error_generic"));
      setSubmitting(false);
    }
  };

  const errorText = (msg?: string) => {
    if (!msg) return null;
    const key = KNOWN_ERRORS.has(msg) ? msg : "required";
    return t(`form.errors.${key}` as never);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12" noValidate>
      <header>
        <span className="font-body text-[11px] font-light uppercase tracking-[0.32em] text-[var(--brand-muted)]">
          {t("form.eyebrow")}
        </span>
      </header>

      {/* ORDER TYPE */}
      <fieldset className="space-y-5">
        <legend className="font-body text-[11px] font-light uppercase tracking-[0.28em] text-[var(--brand-muted)]">
          {t("form.type.label")}
        </legend>
        <Controller
          control={control}
          name="orderType"
          render={({ field }) => (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {ORDER_TYPES.map((value) => (
                <TypeOption
                  key={value}
                  value={value}
                  label={t(`form.type.${value}`)}
                  selected={field.value === value}
                  onChange={(v) => field.onChange(v)}
                />
              ))}
            </div>
          )}
        />
      </fieldset>

      {/* CONDITIONAL: TABLE NUMBER */}
      {orderType === "dine_in" && (
        <Field
          label={t("form.table.label")}
          error={errorText(errors.tableNumber?.message)}
          help={t("form.table.help")}
        >
          <input
            {...register("tableNumber")}
            type="text"
            inputMode="numeric"
            placeholder={t("form.table.placeholder")}
            className={inputClasses(!!errors.tableNumber)}
          />
        </Field>
      )}

      {/* NAME + PHONE */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <Field
          label={t("form.name.label")}
          error={errorText(errors.customerName?.message)}
        >
          <input
            {...register("customerName")}
            type="text"
            autoComplete="name"
            placeholder={t("form.name.placeholder")}
            className={inputClasses(!!errors.customerName)}
          />
        </Field>
        <Field
          label={t("form.phone.label")}
          error={errorText(errors.customerPhone?.message)}
        >
          <input
            {...register("customerPhone")}
            type="tel"
            autoComplete="tel"
            placeholder={t("form.phone.placeholder")}
            className={inputClasses(!!errors.customerPhone)}
          />
        </Field>
      </div>

      {/* EMAIL */}
      <Field
        label={t("form.email.label")}
        error={errorText(errors.customerEmail?.message)}
        help={t("form.email.help")}
      >
        <input
          {...register("customerEmail")}
          type="email"
          autoComplete="email"
          placeholder={t("form.email.placeholder")}
          className={inputClasses(!!errors.customerEmail)}
        />
      </Field>

      {/* NOTES */}
      <Field label={t("form.notes.label")}>
        <textarea
          {...register("notes")}
          rows={3}
          placeholder={t("form.notes.placeholder")}
          className={`${inputClasses(false)} resize-none`}
        />
      </Field>

      {/* SUBMIT */}
      <div className="border-t border-[var(--brand-neutral)] pt-10">
        <button
          type="submit"
          disabled={submitting || items.length === 0}
          className="w-full border border-[var(--brand-text)] py-5 text-center text-[11px] font-medium uppercase tracking-[0.32em] text-[var(--brand-text)] transition-colors duration-700 hover:border-[var(--brand-terra)] hover:text-[var(--brand-terra)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-[var(--brand-text)] disabled:hover:text-[var(--brand-text)]"
        >
          {submitting ? t("form.submitting") : t("form.submit")}
        </button>
      </div>
    </form>
  );
}

function inputClasses(hasError: boolean) {
  return [
    "w-full border-0 border-b bg-transparent px-0 py-3",
    "font-body text-base font-light text-[var(--brand-text)]",
    "placeholder:text-[var(--brand-muted)]/70 placeholder:font-light",
    "outline-none transition-colors duration-500",
    "focus:border-[var(--brand-terra)]",
    hasError
      ? "border-[var(--brand-terra)]"
      : "border-[var(--brand-neutral)]",
  ].join(" ");
}

function Field({
  label,
  error,
  help,
  children,
}: {
  label: string;
  error?: string | null;
  help?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="block font-body text-[11px] font-light uppercase tracking-[0.28em] text-[var(--brand-muted)]">
        {label}
      </span>
      {children}
      {error ? (
        <span className="block font-body text-xs font-light text-[var(--brand-terra)]">
          {error}
        </span>
      ) : help ? (
        <span className="block font-body text-xs font-light text-[var(--brand-muted)]/80">
          {help}
        </span>
      ) : null}
    </label>
  );
}

function TypeOption({
  value,
  label,
  selected,
  onChange,
}: {
  value: OrderType;
  label: string;
  selected: boolean;
  onChange: (v: OrderType) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      aria-pressed={selected}
      className={[
        "border px-5 py-4 text-left transition-colors duration-500",
        selected
          ? "border-[var(--brand-text)] text-[var(--brand-text)]"
          : "border-[var(--brand-neutral)] text-[var(--brand-muted)] hover:border-[var(--brand-text)] hover:text-[var(--brand-text)]",
      ].join(" ")}
    >
      <span className="font-body text-[11px] font-medium uppercase tracking-[0.28em]">
        {label}
      </span>
    </button>
  );
}
