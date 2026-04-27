import { Link } from "@/i18n/navigation";
import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Istanbul Restaurant Dresden — home"
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      <Image
        src="/logo.png"
        alt="Istanbul Restaurant Dresden Logo"
        width={140}
        height={45}
        className="object-contain"
        priority
      />
    </Link>
  );
}
