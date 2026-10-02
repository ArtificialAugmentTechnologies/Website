import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

import appIcon from "@/assets/images/a2-app-icon.png.asset.json";
import { BrandLogo } from "@/components/BrandLogo";
import { institute } from "@/data/institute";
import { courses } from "@/data/courses";

const quickLinks = [
  { to: "/about", label: "About us" },
  { to: "/courses", label: "Courses" },
  { to: "/admissions", label: "Admissions" },
  { to: "/faculty", label: "Faculty" },
  { to: "/events", label: "Events" },
  { to: "/news", label: "News" },
  { to: "/gallery", label: "Gallery" },
  { to: "/faq", label: "FAQ" },
] as const;

export function Footer() {
  const featured = courses.filter((c) => c.featured).slice(0, 4);

  return (
    <footer className="surface-panel mt-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 shrink-0 items-center justify-center overflow-hidden sm:size-10">
              <img src={appIcon.url} alt="A² Technologies logo" className="size-full object-contain" />
            </span>
            <BrandLogo className="text-base" />
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-surface-foreground/70">
            {institute.description}
          </p>
          <ul className="mt-5 flex flex-wrap gap-3">
            {institute.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-md border border-surface-foreground/20 px-3 py-1.5 text-xs font-medium text-surface-foreground/80 transition-colors hover:border-accent hover:text-accent"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Quick links">
          <h2 className="font-display text-sm font-semibold tracking-wide text-accent">Quick links</h2>
          <ul className="mt-4 space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-surface-foreground/75 transition-colors hover:text-accent"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Popular courses">
          <h2 className="font-display text-sm font-semibold tracking-wide text-accent">Courses</h2>
          <ul className="mt-4 space-y-2.5">
            {featured.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/courses/$slug"
                  params={{ slug: c.slug }}
                  className="text-sm text-surface-foreground/75 transition-colors hover:text-accent"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-sm font-semibold tracking-wide text-accent">Contact</h2>
          <address className="mt-4 space-y-3 text-sm not-italic text-surface-foreground/75">
            <p className="flex gap-2.5">
              <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
              <span>
                {institute.address.line1}
                <br />
                {institute.address.line2}
              </span>
            </p>
            <p className="flex gap-2.5">
              <Phone aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
              <a href={`tel:${institute.phone.replace(/\s/g, "")}`} className="hover:text-accent">
                {institute.phone}
              </a>
            </p>
            <p className="flex gap-2.5">
              <Mail aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
              <a href={`mailto:${institute.email}`} className="hover:text-accent">
                {institute.email}
              </a>
            </p>
            <p className="text-surface-foreground/60">{institute.hours}</p>
          </address>
        </div>
      </div>

      <div className="border-t border-surface-foreground/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-surface-foreground/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {institute.name}. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-accent">
              Privacy policy
            </Link>
            <Link to="/terms" className="hover:text-accent">
              Terms &amp; conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
