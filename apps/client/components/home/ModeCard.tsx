import Link from "next/link";
import { cn } from "@/lib/utils";

interface ModeCardProps {
  title: string;
  href: string;
  variant: "green" | "orange";
}

export default function ModeCard({ title, href, variant }: ModeCardProps) {
  const variants = {
    green: "bg-brand-green hover:bg-brand-green-hover shadow-brand-green/20",
    orange:
      "bg-brand-orange hover:bg-brand-orange-hover shadow-brand-orange/20",
  };

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex min-w-[240px] transform items-center justify-center overflow-hidden rounded-xl px-10 py-6 text-xl font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl",
        variants[variant]
      )}
    >
      <div className="relative z-10">{title}</div>
      <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
    </Link>
  );
}
