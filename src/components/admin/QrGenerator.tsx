"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { toast } from "sonner";

const COLOR_DARK = "#1A1410";
const COLOR_LIGHT = "#F4EFE6";

function padTable(input: string) {
  const cleaned = input.replace(/\D/g, "").slice(0, 3);
  if (!cleaned) return "";
  return cleaned.padStart(2, "0");
}

export function QrGenerator({ baseUrl }: { baseUrl: string }) {
  const [tableInput, setTableInput] = useState("");
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  const tableNumber = padTable(tableInput);
  const targetUrl = tableNumber ? `${baseUrl}/menu?table=${tableNumber}` : null;

  // Live-render preview as user types.
  useEffect(() => {
    if (!targetUrl) {
      setDataUrl(null);
      return;
    }
    let canceled = false;
    setGenerating(true);
    QRCode.toDataURL(targetUrl, {
      width: 800,
      margin: 2,
      errorCorrectionLevel: "H",
      color: { dark: COLOR_DARK, light: COLOR_LIGHT },
    })
      .then((url) => {
        if (!canceled) setDataUrl(url);
      })
      .catch((err) => {
        console.error("[qr] generation failed", err);
        if (!canceled) toast.error("QR-Code konnte nicht erstellt werden.");
      })
      .finally(() => {
        if (!canceled) setGenerating(false);
      });
    return () => {
      canceled = true;
    };
  }, [targetUrl]);

  const handleDownload = () => {
    if (!dataUrl || !tableNumber) return;
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `istanbul-table-${tableNumber}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
      <div>
        <label className="block">
          <span className="block font-body text-[11px] font-light uppercase tracking-[0.28em] text-[var(--brand-muted)]">
            Tischnummer
          </span>
          <input
            type="text"
            inputMode="numeric"
            value={tableInput}
            onChange={(e) => setTableInput(e.target.value)}
            placeholder="z. B. 4"
            className="mt-2 w-full border-0 border-b border-[var(--brand-neutral)] bg-transparent px-0 py-3 font-display text-3xl text-[var(--brand-text)] outline-none transition-colors duration-500 focus:border-[var(--brand-terra)]"
          />
        </label>

        <dl className="mt-10 space-y-4">
          <div>
            <dt className="font-body text-[10px] font-light uppercase tracking-[0.28em] text-[var(--brand-muted)]">
              Tisch
            </dt>
            <dd className="mt-1 font-accent italic text-2xl text-[var(--brand-text)]">
              {tableNumber || "—"}
            </dd>
          </div>
          <div>
            <dt className="font-body text-[10px] font-light uppercase tracking-[0.28em] text-[var(--brand-muted)]">
              Ziel-URL
            </dt>
            <dd className="mt-1 break-all font-body text-sm font-light text-[var(--brand-text)]/80">
              {targetUrl ?? "—"}
            </dd>
          </div>
        </dl>

        <button
          type="button"
          onClick={handleDownload}
          disabled={!dataUrl || generating}
          className="mt-10 inline-flex w-full items-center justify-center border border-[var(--brand-text)] py-4 font-body text-[11px] font-medium uppercase tracking-[0.32em] text-[var(--brand-text)] transition-colors duration-700 hover:border-[var(--brand-terra)] hover:text-[var(--brand-terra)] disabled:opacity-50 sm:w-auto sm:px-12"
        >
          {generating ? "…" : "PNG herunterladen"}
        </button>
      </div>

      <div className="flex items-center justify-center border border-[var(--brand-neutral)] bg-[var(--brand-card)]/50 p-10 lg:p-16">
        {dataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={dataUrl}
            alt={`QR für Tisch ${tableNumber}`}
            className="aspect-square w-full max-w-md"
          />
        ) : (
          <p className="font-body text-xs font-light uppercase tracking-[0.28em] text-[var(--brand-muted)]">
            Tischnummer eingeben →
          </p>
        )}
      </div>
    </div>
  );
}
