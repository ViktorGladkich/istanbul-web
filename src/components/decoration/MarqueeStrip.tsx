const DEFAULT_WORDS = [
  "İstanbul",
  "Adana",
  "1987",
  "Dresden",
  "Mezeler",
  "Künefe",
  "Pul biber",
  "Ocakbaşı",
  "Elbe",
];

const SEPARATOR = "·";

type Props = {
  words?: ReadonlyArray<string>;
  /** Animation duration in seconds. Higher = slower. */
  durationSeconds?: number;
  className?: string;
};

export function MarqueeStrip({
  words = DEFAULT_WORDS,
  durationSeconds = 80,
  className = "",
}: Props) {
  // Build one half of the loop, then duplicate it via inline so the track can
  // translate -50% and seamlessly repeat.
  const renderRow = (key: string) => (
    <span
      key={key}
      className="flex shrink-0 items-center gap-10 px-10 font-accent italic text-base text-[var(--brand-gold)] md:gap-16 md:px-16 md:text-lg"
    >
      {words.map((w, i) => (
        <span key={`${key}-${i}`} className="flex items-center gap-10 md:gap-16">
          <span>{w}</span>
          <span aria-hidden className="text-[var(--brand-gold)]/60">
            {SEPARATOR}
          </span>
        </span>
      ))}
    </span>
  );

  return (
    <section
      aria-hidden
      className={`relative overflow-hidden border-y border-[var(--brand-neutral)] bg-[var(--brand-bg)] py-5 md:py-6 ${className}`}
    >
      <div
        className="marquee-track flex w-max"
        style={{ ["--marquee-duration" as string]: `${durationSeconds}s` }}
      >
        {renderRow("a")}
        {renderRow("b")}
      </div>
    </section>
  );
}
