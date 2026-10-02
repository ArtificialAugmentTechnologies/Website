import { Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";

import type { Course } from "@/data/courses";
import { formatFees } from "@/data/courses";

export function CourseCard({ course }: { course: Course }) {
  const feesLabel = course.feesDisplay ?? formatFees(course.fees);

  return (
    <article className="card-lift group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={course.image}
          alt=""
          loading="lazy"
          width={1024}
          height={640}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-md bg-primary/90 px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-primary-foreground">
          {course.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-1 flex-col">
          <h3 className="font-display text-lg font-semibold leading-snug line-clamp-2">
            <Link
              to="/courses/$slug"
              params={{ slug: course.slug }}
              className="after:absolute after:inset-0 hover:text-secondary"
            >
              {course.name}
            </Link>
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {course.summary}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
              {course.level}
            </span>
            <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
              {course.mode}
            </span>
          </div>

          <div className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
            <Clock aria-hidden className="mt-0.5 size-3.5 shrink-0 text-secondary" />
            <span className="line-clamp-2 leading-relaxed">{course.duration}</span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
          <p className="font-display text-sm font-semibold">{feesLabel}</p>
          <span className="text-sm font-medium text-secondary group-hover:underline">
            View details
          </span>
        </div>
      </div>
    </article>
  );
}
