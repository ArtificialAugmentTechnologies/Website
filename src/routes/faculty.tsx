import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/layout/PageHeader";
import { FacultyCard } from "@/components/cards/FacultyCard";
import { faculty } from "@/data/people";

export const Route = createFileRoute("/faculty")({
  head: () => ({
    meta: [
      { title: "Faculty — Practitioner Mentors | A² Technologies" },
      {
        name: "description",
        content:
          "Meet the A² Technologies faculty: platform engineers, analysts, architects and career mentors who teach every DevOps, data and cloud track.",
      },
      { property: "og:title", content: "Faculty at A² Technologies" },
      {
        property: "og:description",
        content: "Meet our faculty across data, AI, Power Platform, analytics and Copilot development.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: FacultyPage,
});

function FacultyPage() {
  const byDepartment = faculty.flatMap((member) =>
    member.departments.map((dept) => ({ ...member, dept }))
  );
  const departments = Array.from(new Set(byDepartment.map((m) => m.dept)));

  return (
    <>
      <PageHeader
        eyebrow="Faculty"
        title="The people who will teach you"
        description="Meet our five industry professionals across data, AI, analytics, Power Platform and Copilot development."
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {departments.map((dept) => (
          <section key={dept} className="mb-16 last:mb-0">
            <h2 className="font-display text-xl font-bold">{dept}</h2>
            <span className="rule-accent mt-4" aria-hidden />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {byDepartment
                .filter((m) => m.dept === dept)
                .map((m) => (
                  <FacultyCard key={`${m.slug}-${dept}`} member={m} />
                ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
