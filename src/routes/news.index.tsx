import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeader } from "@/components/layout/PageHeader";
import { formatDate } from "@/components/cards/EventCard";
import { news } from "@/data/content";

export const Route = createFileRoute("/news/")({
  head: () => ({
    meta: [
      { title: "News & Announcements | A² Technologies" },
      {
        name: "description",
        content:
          "Admissions notices, placement reports, campus updates and curriculum changes from A² Technologies.",
      },
      { property: "og:title", content: "News & Announcements — A² Technologies" },
      { property: "og:description", content: "Admissions notices, placement reports and campus updates." },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  const articles = [...news].sort((a, b) => b.date.localeCompare(a.date));
  const [lead, ...rest] = articles;

  return (
    <>
      <PageHeader
        eyebrow="Newsroom"
        title="News and announcements"
        description="Admissions notices, placement reporting and updates from the academic team."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {lead && (
          <article className="card-lift group relative grid overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] lg:grid-cols-2">
            <div className="aspect-[16/10] overflow-hidden bg-muted lg:aspect-auto">
              <img
                src={lead.image}
                alt=""
                width={1600}
                height={1000}
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center p-7 lg:p-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-secondary">{lead.category}</p>
              <h2 className="mt-3 font-display text-2xl font-bold leading-snug">
                <Link to="/news/$slug" params={{ slug: lead.slug }} className="after:absolute after:inset-0">
                  {lead.title}
                </Link>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{lead.excerpt}</p>
              <p className="mt-5 text-xs text-muted-foreground">
                <time dateTime={lead.date}>{formatDate(lead.date)}</time> · {lead.author}
              </p>
            </div>
          </article>
        )}

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((n) => (
            <article
              key={n.slug}
              className="card-lift group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)]"
            >
              <div className="aspect-[16/9] overflow-hidden bg-muted">
                <img
                  src={n.image}
                  alt=""
                  loading="lazy"
                  width={1024}
                  height={576}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-secondary">{n.category}</p>
                <h2 className="mt-2 font-display text-base font-semibold leading-snug">
                  <Link to="/news/$slug" params={{ slug: n.slug }} className="after:absolute after:inset-0">
                    {n.title}
                  </Link>
                </h2>
                <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{n.excerpt}</p>
                <p className="mt-4 text-xs text-muted-foreground">
                  <time dateTime={n.date}>{formatDate(n.date)}</time> · {n.author}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
