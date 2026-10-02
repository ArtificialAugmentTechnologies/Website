import { cn } from "@/lib/utils";
import { institute } from "@/data/institute";

interface BrandLogoProps {
  className?: string;
}

export function BrandLogo({ className }: BrandLogoProps) {
  const parts = institute.name.split("²");
  const prefix = parts[0];
  const suffix = parts[1]?.trimStart() ?? "";

  return (
    <span
      className={cn(
        "inline-flex items-baseline whitespace-nowrap font-display font-extrabold",
        className,
      )}
    >
      {prefix}
      <sup className="relative -top-[0.26em] mr-[0.18em] text-[1.12em] leading-none">2</sup>
      {suffix}
    </span>
  );
}
