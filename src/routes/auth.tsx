import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, Lock, ShieldCheck, Users } from "lucide-react";

import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Portal Login | A² Technologies" },
      {
        name: "description",
        content:
          "Sign in to the A² Technologies portal for learners, faculty and administrators. Results, study materials and announcements in one place.",
      },
      { property: "og:title", content: "Portal Login — A² Technologies" },
      { property: "og:description", content: "Learner, faculty and administrator portal sign-in." },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: AuthPage,
});

const roles = [
  {
    icon: GraduationCap,
    title: "Learners",
    body: "Profile, enrolled courses, results, downloadable study materials and cohort announcements.",
  },
  {
    icon: Users,
    title: "Faculty",
    body: "Assigned batches, attendance, lab grading and publishing academic content.",
  },
  {
    icon: ShieldCheck,
    title: "Administrators",
    body: "Applications, learners, faculty, courses, events, news, gallery and results management.",
  },
];

function AuthPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portal"
        title="Sign in to the A² Technologies portal"
        description="Accounts are issued once your admission is confirmed. The portal is being rolled out in the next phase of this site."
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-[var(--shadow-card)]">
          <Lock aria-hidden className="mx-auto size-9 text-accent" />
          <h2 className="mt-5 font-display text-xl font-bold">Portal sign-in opens shortly</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            Learner, faculty and administrator accounts are being prepared. Until then, the admissions team
            can answer anything you need about your application or cohort.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link to="/contact">Contact admissions</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/admissions">Apply for admission</Link>
            </Button>
          </div>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {roles.map((r) => (
            <li key={r.title} className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
              <r.icon aria-hidden className="size-5 text-secondary" />
              <h3 className="mt-3 font-display text-sm font-semibold">{r.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
