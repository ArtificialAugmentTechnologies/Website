import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay in ms before the reveal animation starts. */
  delay?: number;
  /** Direction of the 3D entrance. */
  variant?: "up" | "left" | "right" | "flip" | "zoom";
  as?: "div" | "section" | "li" | "article";
};

/**
 * Scroll-triggered 3D entrance. Elements start rotated in depth and settle
 * flat once they enter the viewport. Respects prefers-reduced-motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  variant = "up",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      data-shown={shown ? "true" : "false"}
      className={cn("reveal-3d", `reveal-3d-${variant}`, className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
