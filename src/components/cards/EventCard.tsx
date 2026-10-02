import { CalendarDays, Clock, MapPin } from "lucide-react";

import type { InstituteEvent } from "@/data/content";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/* Timezone-independent so server and browser render the same text. */
export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

export function EventCard({ event, past = false }: { event: InstituteEvent; past?: boolean }) {
  return (
    <article className="card-lift flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)]">
      <div className="aspect-[16/9] overflow-hidden bg-muted">
        <img
          src={event.image}
          alt=""
          loading="lazy"
          width={1024}
          height={576}
          className="size-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        {past && (
          <span className="mb-2 w-fit rounded-md bg-muted px-2 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wider text-muted-foreground">
            Past event
          </span>
        )}
        <h3 className="font-display text-lg font-semibold leading-snug">{event.title}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{event.description}</p>
        <ul className="mt-4 space-y-1.5 border-t border-border pt-4 text-xs text-muted-foreground">
          <li className="flex items-center gap-2">
            <CalendarDays aria-hidden className="size-3.5 text-secondary" />
            <time dateTime={event.date}>{formatDate(event.date)}</time>
          </li>
          <li className="flex items-center gap-2">
            <Clock aria-hidden className="size-3.5 text-secondary" />
            {event.time}
          </li>
          <li className="flex items-center gap-2">
            <MapPin aria-hidden className="size-3.5 text-secondary" />
            {event.location}
          </li>
        </ul>
      </div>
    </article>
  );
}
