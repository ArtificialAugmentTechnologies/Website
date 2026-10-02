import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Quote } from "lucide-react";

import heroImg from "@/assets/images/hero-a2-classroom.jpg";
import campusImg from "@/assets/images/campus-a2.jpg";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import { CourseCard } from "@/components/cards/CourseCard";
import { FacultyCard } from "@/components/cards/FacultyCard";
import { EventCard, formatDate } from "@/components/cards/EventCard";
import { courses } from "@/data/courses";
import { faculty, testimonials, whyChooseUs } from "@/data/people";
import { news, upcomingEvents } from "@/data/content";
import { institute, stats } from "@/data/institute";
import { Reveal } from "@/components/motion/Reveal";
import { Tilt3D } from "@/components/motion/Tilt3D";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A² Technologies — Data Analytics, Python, AI&ML Training Institute" },
      {
        name: "description",
        content:
          "Career tracks in DevOps, data analytics and cloud engineering. Lab-first learning, industry mentors and 95% placement across 2025-26 cohorts.",
      },
      { property: "og:title", content: "A² Technologies — DevOps, Data & Cloud Training Institute" },
      {
        property: "og:description",
        content:
          "Career tracks in DevOps, data analytics and cloud engineering with industry mentors and placement support.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featuredCourses = courses.filter((c) => c.featured);
  const featuredFaculty = faculty.filter((f) => f.featured).slice(0, 4);
  const nextEvents = upcomingEvents().slice(0, 3);
  const latestNews = [...news].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="surface-panel relative overflow-hidden">
        <div className="mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-[90rem] lg:grid-cols-[3fr_2fr]">
          <div className="relative z-10 flex flex-col justify-center px-5 py-16 sm:px-10 lg:px-16 lg:py-20 xl:px-24">
            <div className="animate-reveal flex items-center gap-3">
              <span className="h-px w-12 bg-accent" aria-hidden />
              <p className="eyebrow text-accent">Bengaluru · Established {institute.founded}</p>
            </div>
            <h1 className="animate-reveal-late mt-7 max-w-3xl text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl xl:text-8xl">
              A<sup className="relative -top-[0.26em] text-[1.12em]">2</sup>{" "}
              <span className="text-accent italic">Technologies.</span>
            </h1>
            <p className="animate-reveal-late mt-7 max-w-xl text-base leading-relaxed text-surface-foreground/75 md:text-lg">
              Engineer your career through rigorous DevOps, data and cloud training—built around live labs,
              expert mentors and outcomes that hold up at work.
            </p>
            <div className="animate-reveal-late mt-9 flex flex-wrap gap-3">
              <Button asChild variant="gold" size="lg">
                <Link to="/courses">Explore courses <ArrowRight aria-hidden /></Link>
              </Button>
              <Button asChild variant="onDark" size="lg">
                <Link to="/admissions">Apply now</Link>
              </Button>
            </div>
            <dl className="animate-reveal-late mt-12 grid grid-cols-2 gap-6 border-t border-surface-foreground/10 pt-8 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="group">
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block font-display text-2xl font-semibold text-surface-foreground transition-colors group-hover:text-accent">{s.value}</span>
                    <span className="mt-1 block text-[0.68rem] font-semibold uppercase text-accent/75">{s.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <Tilt3D max={7} className="relative min-h-[28rem] overflow-hidden lg:min-h-full">
            <img
              src={heroImg}
              alt="Instructor teaching cloud engineering to learners at A² Technologies"
              width={1600}
              height={1200}
              fetchPriority="high"
              className="image-drift absolute inset-0 size-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/15" aria-hidden />
            <div className="animate-float layer-pop absolute bottom-6 left-6 border border-surface-foreground/20 bg-surface/90 px-5 py-4 shadow-[var(--shadow-lift)] backdrop-blur-md sm:bottom-10 sm:left-10">
              <p className="eyebrow text-accent">Live lab status</p>
              <p className="mt-1 font-display text-lg font-semibold">Learning in production</p>
            </div>
            <div className="animate-float-slow layer-pop absolute right-6 top-8 hidden border border-accent/40 bg-surface/85 px-4 py-3 backdrop-blur-md sm:block">
              <p className="eyebrow text-accent">Cohort 2026</p>
              <p className="mt-1 font-display text-sm font-semibold">30 seats per batch</p>
            </div>
          </Tilt3D>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal variant="left">
            <Tilt3D max={10} className="rounded-lg">
              <img
                src={campusImg}
                alt="The A² Technologies campus building at dusk"
                loading="lazy"
                width={1600}
                height={1000}
                className="w-full rounded-lg border border-border object-cover shadow-[var(--shadow-lift)]"
              />
            </Tilt3D>
          </Reveal>
          <Reveal variant="right" delay={120}>
            <SectionHeading
              eyebrow="About the institute"
              title="A technology institute built like an engineering team"
              description="Since 2014 we have trained more than 5,000 professionals. Our cohorts are small, our labs are real, and every module ends with work you can show a hiring manager."
            />
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
                <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-secondary">
                  Mission
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  To make advanced technology careers reachable through rigorous, practical and honestly
                  assessed training.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
                <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-secondary">
                  Vision
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  To be the institute Indian engineering teams trust first when they hire for platform, data
                  and cloud roles.
                </p>
              </div>
            </div>
            <Button asChild variant="outline" className="mt-8">
              <Link to="/about">
                Read more about us <ArrowRight aria-hidden className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Popular courses */}
      <section className="bg-muted/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Popular programmes"
            title="Career tracks currently enrolling"
            description="Every track runs in small cohorts with graded labs, a capstone project and a mentor panel review."
            action={
              <Button asChild variant="outline">
                <Link to="/courses">
                  All courses <ArrowRight aria-hidden className="size-4" />
                </Link>
              </Button>
            }
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCourses.map((c, i) => (
              <Reveal key={c.slug} variant="flip" delay={i * 90}>
                <CourseCard course={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why A² Technologies"
          title="What makes the training hold up at work"
          description="Six commitments we hold every cohort to, reviewed with our advisory board twice a year."
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((f, i) => (
            <Reveal
              as="li"
              key={f.title}
              variant="up"
              delay={i * 80}
              className="card-lift rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
            >
              <CheckCircle2 aria-hidden className="size-6 text-accent" />
              <h3 className="mt-4 font-display text-base font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Faculty */}
      <section className="bg-muted/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Faculty"
            title="Taught by practitioners"
            description="Our core faculty have collectively spent more than sixty years running production systems."
            action={
              <Button asChild variant="outline">
                <Link to="/faculty">
                  Meet the faculty <ArrowRight aria-hidden className="size-4" />
                </Link>
              </Button>
            }
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredFaculty.map((m, i) => (
              <Reveal key={m.slug} variant="zoom" delay={i * 90}>
                <FacultyCard member={m} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Campus life"
          title="Upcoming events"
          description="Open labs, career clinics and summits — most are free to attend for prospective learners."
          action={
            <Button asChild variant="outline">
              <Link to="/events">
                All events <ArrowRight aria-hidden className="size-4" />
              </Link>
            </Button>
          }
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {nextEvents.map((e, i) => (
            <Reveal key={e.slug} variant="up" delay={i * 110}>
              <EventCard event={e} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="surface-panel py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow text-accent">Graduate stories</p>
          <h2 className="mt-3 max-w-2xl text-2xl font-bold sm:text-3xl md:text-[2.1rem]">
            Where our learners are now
          </h2>
          <span className="rule-accent mt-5" aria-hidden />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal
                as="li"
                key={t.name}
                variant="flip"
                delay={i * 110}
                className="card-lift flex flex-col rounded-xl border border-surface-foreground/15 bg-surface-foreground/5 p-6"
              >
                <Quote aria-hidden className="size-7 text-accent" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-surface-foreground/85">
                  {t.quote}
                </blockquote>
                <footer className="mt-5 border-t border-surface-foreground/15 pt-4">
                  <p className="font-display text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-surface-foreground/65">{t.role}</p>
                  <p className="mt-1 text-xs text-accent">{t.course}</p>
                </footer>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* News */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Announcements"
          title="Latest news from campus"
          action={
            <Button asChild variant="outline">
              <Link to="/news">
                All news <ArrowRight aria-hidden className="size-4" />
              </Link>
            </Button>
          }
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {latestNews.map((n, i) => (
            <Reveal
              as="article"
              key={n.slug}
              delay={i * 100}
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
                <h3 className="mt-2 font-display text-base font-semibold leading-snug">
                  <Link to="/news/$slug" params={{ slug: n.slug }} className="after:absolute after:inset-0">
                    {n.title}
                  </Link>
                </h3>
                <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {n.excerpt}
                </p>
                <p className="mt-4 text-xs text-muted-foreground">
                  <time dateTime={n.date}>{formatDate(n.date)}</time> · {n.author}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <Reveal variant="zoom">
          <Tilt3D max={5} className="rounded-2xl border border-accent/30 bg-accent-soft px-6 py-14 text-center sm:px-12">
          <h2 className="mx-auto max-w-2xl text-2xl font-bold text-primary sm:text-3xl md:text-[2.2rem]">
            Start your learning journey today
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-accent-foreground md:text-base">
            Autumn cohorts begin in September and seats are capped at 30 learners per batch. Apply now or
            talk to the admissions team about the right track for you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/admissions">Apply for admission</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-accent-foreground/40 bg-transparent text-accent-foreground hover:bg-primary/10 hover:text-accent-foreground">
              <Link to="/contact">Talk to admissions</Link>
            </Button>
          </div>
          </Tilt3D>
        </Reveal>
      </section>
    </>
  );
}
