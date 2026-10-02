import { useCallback, useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type Tilt3DProps = {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees. */
  max?: number;
  /** Adds a moving specular sheen following the pointer. */
  glare?: boolean;
};

/**
 * Pointer-tracked 3D tilt. Purely presentational: the element rotates in
 * perspective towards the cursor and returns to rest on leave.
 */
export function Tilt3D({ children, className, max = 9, glare = true }: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const node = ref.current;
      if (!node) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const rect = node.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      node.style.setProperty("--tilt-x", `${(0.5 - py) * max * 2}deg`);
      node.style.setProperty("--tilt-y", `${(px - 0.5) * max * 2}deg`);
      node.style.setProperty("--glare-x", `${px * 100}%`);
      node.style.setProperty("--glare-y", `${py * 100}%`);
      node.style.setProperty("--glare-o", "1");
    },
    [max],
  );

  const handleLeave = useCallback(() => {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty("--tilt-x", "0deg");
    node.style.setProperty("--tilt-y", "0deg");
    node.style.setProperty("--glare-o", "0");
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={cn("tilt-3d", glare && "tilt-3d-glare", className)}
    >
      {children}
    </div>
  );
}
