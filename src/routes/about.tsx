import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Compass, HeartHandshake, ShieldCheck } from "lucide-react";

import fullLogo from "@/assets/images/a2-technologies-full-logo.jpeg.asset.json";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Artificial Augment — Learn from Industry. Build for the Future." },
      {
        name: "description",
        content:
          "Artificial Augment is a next-generation technology training institute focused on practical, industry-ready skills through experienced faculty and hands-on learning.",
      },
      { property: "og:title", content: "Artificial Augment" },
      {
        property: "og:description",
        content: "Learn from industry. Build for the future. Practical technology training for career-ready skills.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AboutPage,
});

const loop = [
  {
    step: "01 · Learn",
    title: "AI for students",
    body: "Courses that start from zero and end with working models.",
  },
  {
    step: "02 · Practise",
    title: "Workshops",
    body: "One-day, hands-on sessions that build real, usable skills.",
  },
  {
    step: "03 · Build",
    title: "Projects & internships",
    body: "Final-year projects and internships on real problems.",
  },
  {
    step: "04 · Deliver",
    title: "Career-ready skills",
    body: "Practical, industry-ready capability for every learner.",
  },
];

const values = [
  { icon: ShieldCheck, title: "Honest assessment", body: "Grades reflect work, never attendance. Feedback is specific and it is written down." },
  { icon: BookOpen, title: "Depth over coverage", body: "We would rather teach six things properly than list sixty on a brochure." },
  { icon: HeartHandshake, title: "Learner first", body: "Small cohorts, named mentors and a support desk that answers within a working day." },
  { icon: Compass, title: "Industry alignment", body: "Curricula are reviewed with working industry professionals who hire for these roles." },
];

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Learn from Industry. Build for the Future."
        title="Artificial Augment"
        description={
          <>
            <p>
              Artificial Augment is a next-generation technology training institute focused on building
              practical, industry-ready skills. We help learners prepare for the evolving demands of the
              technology industry.
            </p>
            <p>
              As a newly established institute, our strength lies in our experienced faculty and working
              industry professionals from leading organizations. We combine their real-world expertise with
              structured, hands-on learning to help learners build strong technical foundations and
              career-ready skills.
            </p>
          </>
        }
      />

      {/* Hero statement */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow text-secondary">About us · Artificial Augment</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              We don&apos;t replace people with AI. We <span className="text-primary">augment</span> them.
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              A² Technologies teaches data analytics, Python and AI/ML to students and working
              professionals, runs hands-on workshops, guides final-year projects and internships, and
              builds practical skills that industry actually hires for.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/admissions">
                  Join a programme <ArrowRight aria-hidden className="ml-1 size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/contact">Talk to us</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center rounded-2xl border border-border bg-accent-soft p-10 shadow-[var(--shadow-card)] lg:p-14">
            <img
              src={fullLogo.url}
              alt="A² Technologies logo"
              loading="lazy"
              className="h-28 w-auto object-contain md:h-36"
            />
          </div>
        </div>
      </section>

      {/* The A² loop */}
      <section className="bg-primary/10 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">The A² loop</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            What we teach feeds what we build, and what we build feeds what we teach.
          </p>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {loop.map((item) => (
              <li
                key={item.step}
                className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-transform duration-200 hover:-translate-y-1"
              >
                <p className="eyebrow text-primary">{item.step}</p>
                <h3 className="mt-3 font-display text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why A squared */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)] sm:flex-row sm:items-center sm:gap-10 md:p-12">
          <p aria-hidden className="shrink-0 font-display text-6xl font-bold tracking-tight text-foreground md:text-7xl">
            A<sup className="text-primary">2</sup>
          </p>
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">Why &ldquo;A squared&rdquo;?</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Artificial × Augment. The arrow leaving the frame is a person stepping beyond what they
              could do alone, with AI multiplying their skill rather than taking its place.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">Four things we do not compromise on</h2>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <li key={v.title} className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <v.icon aria-hidden className="size-6 text-secondary" />
              <h3 className="mt-4 font-display text-base font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Teal CTA band */}
      <section className="bg-secondary py-14 lg:py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <h2 className="font-display text-2xl font-bold text-secondary-foreground sm:text-3xl">
            Bring practical AI skills to your career.
          </h2>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/admissions">Apply for admission</Link>
            </Button>
            <Button asChild variant="outline" className="border-secondary-foreground/40 bg-transparent text-secondary-foreground hover:bg-secondary-foreground/10 hover:text-secondary-foreground">
              <Link to="/contact">Talk to us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
