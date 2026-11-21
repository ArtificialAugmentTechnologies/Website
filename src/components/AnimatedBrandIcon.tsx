import { cn } from "@/lib/utils";

/** Faithful vector version of the supplied mark, with a looping frame trace. */
export function AnimatedBrandIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 768 768" role="img" aria-label="A² Technologies logo" className={cn("animated-brand-icon shrink-0", className)}>
      <rect width="768" height="768" rx="170" className="brand-icon-background" />
      <path className="brand-icon-letter" d="M260 509 384 225 508 509 469 526 444 467H324L299 526ZM339 434H429L384 331Z" fillRule="evenodd" />
      <path className="brand-icon-track" d="M422 184H240Q184 184 184 240V528Q184 584 240 584H528Q584 584 584 528V360" pathLength="100" />
      <path className="brand-icon-trace" d="M422 184H240Q184 184 184 240V528Q184 584 240 584H528Q584 584 584 528V360" pathLength="100" />
      <path className="brand-icon-arrow" d="M555 365 584 322 613 365Z" />
      <path className="brand-icon-chevron" d="M495 293 551 156 607 293 580 304 551 231 521 304Z" />
    </svg>
  );
}