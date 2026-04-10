import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  href: string;
  className?: string;
  label?: string;
}

export default function BackButton({
  href,
  className,
  label = "Back",
}: BackButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "hover:text-readly-blue flex items-center gap-1 font-semibold text-zinc-600 transition-colors",
        className
      )}
    >
      <ChevronLeft className="h-6 w-6" />
      {label}
    </Link>
  );
}
