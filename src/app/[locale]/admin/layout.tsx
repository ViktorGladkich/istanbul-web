export default function AdminBaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-[var(--brand-bg)]">{children}</div>;
}
