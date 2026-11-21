import { cn } from "@/lib/utils";
import { institute } from "@/data/institute";

interface BrandLogoProps {
  className?: string;
}

/**
 * Wordmark rule (brand guide): "A" and the superscript "²" in weight 800 — the ² in orange
 * at about half size — "Technologies" in weight 400, slight negative letter-spacing.
 */
export function BrandLogo({ className }: BrandLogoProps) {
  const parts = institute.name.split("²");
  const prefix = parts[0];
  const suffix = parts[1]?.trimStart() ?? "";

  return (
    <span
      className={cn(
        "inline-flex items-baseline whitespace-nowrap font-display tracking-[-0.02em]",
        className,
      )}
    >
      <span className="font-extrabold">{prefix}</span>
      <sup className="relative -top-[0.55em] mr-[0.5em] text-[0.55em] font-extrabold leading-none text-primary">2</sup>
      <span className="font-normal">{suffix}</span>
    </span>
  );
}
