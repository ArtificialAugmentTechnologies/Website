import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type NavItem = { readonly to: string; readonly label: string };
type Box = { left: number; width: number } | null;

// useLayoutEffect warns during SSR; fall back to useEffect on the server.
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const isActive = (pathname: string, to: string) => (to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`));

/**
 * Desktop navigation with two sliding indicators:
 * - a soft pill that glides to whichever link the pointer (or keyboard focus) is on,
 * - a glowing bar under the current page that slides across when you navigate.
 */
export function NavLinks({ links }: { links: readonly NavItem[] }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [hoverBox, setHoverBox] = useState<Box>(null);
  const [activeBox, setActiveBox] = useState<Box>(null);
  const [ready, setReady] = useState(false);

  const measure = useCallback((index: number): Box => {
    const list = listRef.current;
    const el = itemRefs.current[index];
    if (!list || !el) return null;
    const a = list.getBoundingClientRect();
    const b = el.getBoundingClientRect();
    return { left: b.left - a.left, width: b.width };
  }, []);

  const activeIndex = links.findIndex((l) => isActive(pathname, l.to));

  // Place the current-page bar, and keep it right when fonts load or the window resizes.
  useIsoLayoutEffect(() => {
    const update = () => setActiveBox(activeIndex >= 0 ? measure(activeIndex) : null);
    update();
    const raf = requestAnimationFrame(() => setReady(true)); // no slide-in on first paint
    window.addEventListener("resize", update);
    void document.fonts?.ready.then(update);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", update); };
  }, [activeIndex, measure]);

  return (
    <ul
      ref={listRef}
      className={cn("navigation-links relative ml-auto hidden items-center gap-0.5 xl:flex", ready && "is-ready")}
      onMouseLeave={() => setHoverBox(null)}
    >
      <span
        aria-hidden
        className={cn("nav-hover-pill", hoverBox && "is-visible")}
        style={hoverBox ? { transform: `translateX(${hoverBox.left}px)`, width: hoverBox.width } : undefined}
      />
      <span
        aria-hidden
        className={cn("nav-active-bar", activeBox && "is-visible")}
        style={activeBox ? { transform: `translateX(${activeBox.left + activeBox.width * 0.2}px)`, width: activeBox.width * 0.6 } : undefined}
      />
      {links.map((link, i) => (
        <li key={link.to} className="relative z-[1]">
          <Link
            ref={(el) => { itemRefs.current[i] = el; }}
            to={link.to}
            activeOptions={{ exact: link.to === "/" }}
            onMouseEnter={() => setHoverBox(measure(i))}
            onFocus={() => setHoverBox(measure(i))}
            onBlur={() => setHoverBox(null)}
            className="navigation-link px-3 py-3 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
            activeProps={{ className: "text-foreground", "aria-current": "page" }}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
