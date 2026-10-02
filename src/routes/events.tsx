import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/layout/PageHeader";
import { EventCard } from "@/components/cards/EventCard";
import { pastEvents, upcomingEvents } from "@/data/content";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Open Labs, Clinics & Summits | A² Technologies" },
      {
        name: "description",
        content:
          "Upcoming and past events at A² Technologies: DevOps open labs, analytics career clinics, cloud summits and placement days.",
      },
      { property: "og:title", content: "Events at A² Technologies" },
      { property: "og:description", content: "Open labs, career clinics, summits and placement days." },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  const upcoming = upcomingEvents();
  const past = pastEvents();

  return (
    <>
      <PageHeader
        eyebrow="Events"
        title="What's happening on campus"
        description="Most sessions are free to attend for prospective learners. Register by calling the front desk or writing to the admissions office."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-xl font-bold">Upcoming events</h2>
        <span className="rule-accent mt-4" aria-hidden />
        {upcoming.length === 0 ? (
          <p className="mt-8 rounded-xl border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
            No events are scheduled right now. Check back soon or follow us on LinkedIn for announcements.
          </p>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {upcoming.map((e) => (
              <EventCard key={e.slug} event={e} />
            ))}
          </div>
        )}
      </section>

      {past.length > 0 && (
        <section className="bg-muted/50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-xl font-bold">Past events</h2>
            <span className="rule-accent mt-4" aria-hidden />
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {past.map((e) => (
                <EventCard key={e.slug} event={e} past />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
