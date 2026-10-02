import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { gallery, galleryCategories, type GalleryCategory } from "@/data/content";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Campus, Labs & Events | A² Technologies" },
      {
        name: "description",
        content:
          "Photographs of the A² Technologies campus, teaching labs and student events in Bengaluru.",
      },
      { property: "og:title", content: "Gallery — A² Technologies" },
      { property: "og:description", content: "Campus, teaching labs and student events in pictures." },
    ],
  }),
  component: GalleryPage,
});

type Filter = GalleryCategory | "All";

function GalleryPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const items = filter === "All" ? gallery : gallery.filter((g) => g.category === filter);
  const filters: Filter[] = ["All", ...galleryCategories];

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Campus, labs and events"
        description="A look at where you'll study — the campus, the teaching labs and the events that fill the academic calendar."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div role="group" aria-label="Filter gallery by category" className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}
            </Button>
          ))}
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.alt}
              className="card-lift overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)]"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  width={item.width}
                  height={item.height}
                  className="size-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between p-4">
                <p className="text-sm text-muted-foreground">{item.alt}</p>
                <span className="ml-3 shrink-0 rounded-md bg-accent-soft px-2 py-1 text-[0.7rem] font-medium text-accent-foreground">
                  {item.category}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
