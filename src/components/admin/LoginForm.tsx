"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (!result || result.error) {
        setError("Falsche Zugangsdaten.");
        setSubmitting(false);
        return;
      }
      router.replace("/admin/orders");
      router.refresh();
    } catch (err) {
      console.error("[admin] sign-in failed", err);
      setError("Anmeldung fehlgeschlagen.");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8" noValidate>
      <Field label="E-Mail">
        <input
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClasses}
        />
      </Field>
      <Field label="Passwort">
        <input
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClasses}
        />
      </Field>

      {error && (
        <p className="font-body text-xs font-light text-[var(--brand-terra)]">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full border border-[var(--brand-text)] py-4 text-[11px] font-medium uppercase tracking-[0.32em] text-[var(--brand-text)] transition-colors duration-700 hover:border-[var(--brand-terra)] hover:text-[var(--brand-terra)] disabled:opacity-50"
      >
        {submitting ? "Einen Moment …" : "Anmelden"}
      </button>
    </form>
  );
}

const inputClasses =
  "w-full border-0 border-b border-[var(--brand-neutral)] bg-transparent px-0 py-3 font-body text-base font-light text-[var(--brand-text)] outline-none transition-colors duration-500 focus:border-[var(--brand-terra)]";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="block font-body text-[11px] font-light uppercase tracking-[0.28em] text-[var(--brand-muted)]">
        {label}
      </span>
      {children}
    </label>
  );
}
