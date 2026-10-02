import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatDate } from "@/components/cards/EventCard";
import { getArticle, news } from "@/data/content";

export const Route = createFileRoute("/news/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Article not found — A² Technologies" }, { name: "robots", content: "noindex" }],
      };
    }
    const { article } = loaderData;
    return {
      meta: [
        { title: `${article.title} — A² Technologies` },
        { name: "description", content: article.excerpt },
        { property: "og:title", content: article.title },
        { property: "og:description", content: article.excerpt },
        { property: "og:type", content: "article" },
      ],
    };
  },
  notFoundComponent: ArticleNotFound,
  component: ArticlePage,
});

function ArticleNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <p className="eyebrow">Article unavailable</p>
      <h1 className="mt-3 font-display text-3xl font-bold">We couldn't find that article</h1>
      <Button asChild className="mt-7">
        <Link to="/news">Back to the newsroom</Link>
      </Button>
    </div>
  );
}

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const related = news.filter((n) => n.slug !== article.slug).slice(0, 3);

  return (
    <>
      <article>
        <header className="surface-panel">
          <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-20">
            <Link
              to="/news"
              className="inline-flex items-center gap-1.5 text-sm text-surface-foreground/70 transition-colors hover:text-accent"
            >
              <ArrowLeft aria-hidden className="size-4" /> Newsroom
            </Link>
            <p className="eyebrow mt-6 text-accent">{article.category}</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">{article.title}</h1>
            <p className="mt-5 text-sm text-surface-foreground/70">
              <time dateTime={article.date}>{formatDate(article.date)}</time> · {article.author}
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <img
            src={article.image}
            alt=""
            width={1600}
            height={900}
            className="w-full rounded-2xl border border-border object-cover shadow-[var(--shadow-card)]"
          />
          <div className="mt-10 space-y-5 text-base leading-relaxed text-muted-foreground">
            {article.body.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
        </div>
      </article>

      <section className="bg-muted/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-bold">More from the newsroom</h2>
          <span className="rule-accent mt-4" aria-hidden />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((n) => (
              <article
                key={n.slug}
                className="card-lift relative rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-secondary">{n.category}</p>
                <h3 className="mt-2 font-display text-base font-semibold leading-snug">
                  <Link to="/news/$slug" params={{ slug: n.slug }} className="after:absolute after:inset-0">
                    {n.title}
                  </Link>
                </h3>
                <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{n.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
