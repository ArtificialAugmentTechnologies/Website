import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

import appIcon from "@/assets/images/A2-app-logo.png";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/BrandLogo";
import { institute } from "@/data/institute";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/courses", label: "Courses" },
  { to: "/admissions", label: "Admissions" },
  { to: "/faculty", label: "Faculty" },
  { to: "/events", label: "Events" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75"
          : "border-transparent bg-background",
      )}
    >
      <nav aria-label="Primary" className="mx-auto flex h-18 max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label={`${institute.name} — home`}>
          <span className="flex size-9 shrink-0 items-center justify-center overflow-hidden sm:size-10 lg:size-11 transition-transform duration-300 hover:rotate-3 hover:scale-105">
            <img src={appIcon} alt="A² Technologies logo" className="size-full object-contain" />
          </span>
          <span className="leading-tight">
            <BrandLogo className="block text-base text-foreground" />
            <span className="hidden text-[0.7rem] font-medium tracking-wide text-muted-foreground sm:block">
              Data Analytics <span className="align-middle text-[1.4em] leading-none">·</span> Python <span className="align-middle text-[1.4em] leading-none">·</span> AI&ML
            </span>
          </span>
        </Link>

        <ul className="ml-auto hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                activeOptions={{ exact: link.to === "/" }}
                className="interactive-link rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground bg-muted" }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
            <Link to="/auth">Login</Link>
          </Button>
          <Button asChild variant="gold" size="sm" className="hidden sm:inline-flex">
            <Link to="/admissions">Apply now</Link>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-10 items-center justify-center rounded-md border border-border text-foreground transition-all hover:border-accent hover:bg-muted lg:hidden"
          >
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-border bg-background lg:hidden">
          <ul className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  activeOptions={{ exact: link.to === "/" }}
                  className="block rounded-md px-3 py-3 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                  activeProps={{ className: "text-foreground bg-muted" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-3 flex gap-2 px-1 pb-2">
              <Button asChild variant="outline" className="flex-1">
                <Link to="/auth">Login</Link>
              </Button>
              <Button asChild variant="gold" className="flex-1">
                <Link to="/admissions">Apply now</Link>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
