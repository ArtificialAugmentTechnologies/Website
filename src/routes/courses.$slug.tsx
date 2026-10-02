import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Briefcase, CheckCircle2, Clock, GaugeCircle, GraduationCap, IndianRupee, MonitorSmartphone, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatFees, getCourse } from "@/data/courses";

export const Route = createFileRoute("/courses/$slug")({
  loader: ({ params }) => {
    const course = getCourse(params.slug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Course not found — A² Technologies" }, { name: "robots", content: "noindex" }],
      };
    }
    const { course } = loaderData;
    return {
      meta: [
        { title: `${course.name} — A² Technologies` },
        { name: "description", content: course.summary },
        { property: "og:title", content: `${course.name} — A² Technologies` },
        { property: "og:description", content: course.summary },
      ],
    };
  },
  notFoundComponent: CourseNotFound,
  component: CourseDetailPage,
});

function CourseNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <p className="eyebrow">Course unavailable</p>
      <h1 className="mt-3 font-display text-3xl font-bold">We couldn't find that course</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        It may have been renamed or retired. Browse the current catalogue instead.
      </p>
      <Button asChild className="mt-7">
        <Link to="/courses">Back to all courses</Link>
      </Button>
    </div>
  );
}

function CourseDetailPage() {
  const { course } = Route.useLoaderData();

  const facts = [
    { icon: Clock, label: "Duration", value: course.duration },
    { icon: GaugeCircle, label: "Level", value: course.level },
    { icon: MonitorSmartphone, label: "Mode", value: course.mode },
    { icon: IndianRupee, label: "Fees", value: course.feesDisplay ?? formatFees(course.fees) },
    { icon: UserRound, label: "Instructor", value: course.instructor },
    { icon: GraduationCap, label: "Category", value: course.category },
  ];

  return (
    <>
      <section className="surface-panel">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:px-8 lg:py-20">
          <div>
            <Link
              to="/courses"
              className="inline-flex items-center gap-1.5 text-sm text-surface-foreground/70 transition-colors hover:text-accent"
            >
              <ArrowLeft aria-hidden className="size-4" /> All courses
            </Link>
            <p className="eyebrow mt-6 text-accent">{course.category}</p>
            <h1 className="mt-3 text-3xl font-bold sm:text-4xl md:text-[2.9rem] md:leading-tight">
              {course.name}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-surface-foreground/80">
              {course.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="gold" size="lg">
                <Link to="/admissions" search={{ course: course.slug }}>
                  Apply now
                </Link>
              </Button>
              <Button asChild variant="onDark" size="lg">
                <Link to="/contact">Ask a question</Link>
              </Button>
            </div>
          </div>
          <img
            src={course.image}
            alt=""
            width={1024}
            height={640}
            className="w-full rounded-2xl border border-surface-foreground/15 object-cover shadow-[var(--shadow-lift)]"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map((f) => (
            <div
              key={f.label}
              className="flex items-start gap-3 rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
            >
              <f.icon aria-hidden className="mt-0.5 size-5 shrink-0 text-accent" />
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">{f.label}</dt>
                <dd className="mt-1 font-display text-sm font-semibold">{f.value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:px-8">
        <div>
          <h2 className="font-display text-2xl font-bold">Course overview</h2>
          <span className="rule-accent mt-4" aria-hidden />
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">{course.overview}</p>

          <h2 className="mt-12 font-display text-2xl font-bold">Curriculum</h2>
          <span className="rule-accent mt-4" aria-hidden />
          <Accordion type="single" collapsible className="mt-5">
            {course.curriculum.map((m) => (
              <AccordionItem key={m.title} value={m.title}>
                <AccordionTrigger className="text-left font-display text-sm font-semibold">
                  {m.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {m.topics.map((t) => (
                      <li key={t} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 aria-hidden className="size-3.5 shrink-0 text-accent" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <h2 className="mt-12 font-display text-2xl font-bold">Learning outcomes</h2>
          <span className="rule-accent mt-4" aria-hidden />
          <ul className="mt-5 space-y-3">
            {course.outcomes.map((o) => (
              <li key={o} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
                {o}
              </li>
            ))}
          </ul>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h2 className="font-display text-base font-semibold">Eligibility</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{course.eligibility}</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h2 className="font-display text-base font-semibold">Career opportunities</h2>
            <ul className="mt-4 space-y-2.5">
              {course.careers.map((c) => (
                <li key={c} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <Briefcase aria-hidden className="size-4 shrink-0 text-secondary" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-accent/30 bg-accent-soft p-6">
            <h2 className="font-display text-base font-semibold text-primary">Ready to enrol?</h2>
            <p className="mt-2 text-sm leading-relaxed text-accent-foreground">
              Seats are capped at 30 per batch and applications are reviewed on a rolling basis.
            </p>
            <Button asChild className="mt-5 w-full">
              <Link to="/admissions" search={{ course: course.slug }}>
                Apply for this course
              </Link>
            </Button>
          </div>
        </aside>
      </section>
    </>
  );
}
