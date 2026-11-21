import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/BrandLogo";
import { institute } from "@/data/institute";
import { useAuth } from "@/components/auth/AuthProvider";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { NavLinks } from "@/components/layout/NavLinks";
import { cn } from "@/lib/utils";
import a2LogoLoader from "@/assets/images/A2-logo-loader-v2.gif";

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
  const { user, loading, openLogin } = useAuth();
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
        "site-navigation sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75"
          : "border-border bg-background",
      )}
    >
      <nav aria-label="Primary" className="mx-auto flex min-h-20 max-w-[90rem] items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label={`${institute.name} — home`}>
          <span className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-foreground shadow-[var(--shadow-card)] sm:size-10 lg:size-11 transition-transform duration-300 hover:rotate-3 hover:scale-105">
            <img
              src={a2LogoLoader}
              alt=""
              width={600}
              height={600}
              className="size-full object-cover"
              fetchPriority="high"
            />
          </span>
          <span className="leading-tight">
            <BrandLogo className="block text-base text-foreground" />
            <span className="hidden font-mono text-[0.62rem] font-medium uppercase tracking-[0.12em] text-muted-foreground sm:block">
              Data Analytics <span className="align-middle text-[1.4em] leading-none">·</span> Python <span className="align-middle text-[1.4em] leading-none">·</span> AI&ML
            </span>
          </span>
        </Link>

        <NavLinks links={navLinks} />

        <div className="ml-auto flex items-center gap-2 xl:ml-3 xl:border-l xl:border-border xl:pl-4">
          <ThemeToggle />
          {user ? (
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Link to="/account"><UserRound aria-hidden /> Account</Link>
            </Button>
          ) : (
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex" onClick={openLogin} disabled={loading}>
              <UserRound aria-hidden /> Login
            </Button>
          )}
          <Button asChild variant="default" size="sm" className="hidden h-10 sm:inline-flex">
            <Link to="/admissions">Apply now <ArrowUpRight aria-hidden /></Link>
          </Button>
          <Button
            variant="outline" size="icon"
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-10 items-center justify-center rounded-md border border-border text-foreground transition-all hover:border-accent hover:bg-muted xl:hidden"
          >
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </Button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-border bg-background xl:hidden">
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
              {user ? (
                <Button asChild variant="outline" className="flex-1">
                  <Link to="/account" onClick={() => setOpen(false)}>Account</Link>
                </Button>
              ) : (
                <Button variant="outline" className="flex-1" onClick={() => { setOpen(false); openLogin(); }} disabled={loading}>
                  Login
                </Button>
              )}
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
