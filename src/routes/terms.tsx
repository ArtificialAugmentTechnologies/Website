import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/layout/PageHeader";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | A² Technologies" },
      {
        name: "description",
        content:
          "Terms and conditions covering admissions, fees, refunds, code of conduct and intellectual property at A² Technologies.",
      },
      { property: "og:title", content: "Terms & Conditions — A² Technologies" },
      { property: "og:description", content: "Admissions, fees, refunds, conduct and course materials." },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: TermsPage,
});

const sections = [
  {
    heading: "Admission",
    body: "Submitting an application does not guarantee a seat. Admission is confirmed only after an eligibility review, a counselling call and payment of the first fee instalment. The academy may decline an application without stating a reason.",
  },
  {
    heading: "Fees and instalments",
    body: "Published fees are per programme and exclusive of external certification exam charges. Instalment schedules are agreed in writing at the time of enrolment. Access to labs and materials may be suspended if an instalment is more than fifteen days overdue.",
  },
  {
    heading: "Refunds",
    body: "A full refund less an administrative charge is available up to seven days before a cohort begins. After the cohort begins, refunds are pro-rated against the modules delivered for the first three weeks only. No refund is available after that point.",
  },
  {
    heading: "Attendance and assessment",
    body: "Certificates require at least 80% attendance and a pass in every graded lab and the capstone. Assessment outcomes are final once the review window of five working days has closed.",
  },
  {
    heading: "Code of conduct",
    body: "Learners are expected to treat peers, faculty and staff with respect, to submit their own work, and to use lab infrastructure only for coursework. Plagiarism or misuse of shared infrastructure may result in removal from a programme without refund.",
  },
  {
    heading: "Course materials",
    body: "Slides, lab guides, datasets and recordings remain the intellectual property of the academy. They are licensed to enrolled learners for personal study and may not be redistributed, resold or used for commercial training.",
  },
  {
    heading: "Placement support",
    body: "Placement assistance includes preparation, portfolio review and introductions to partner companies. It is not a guarantee of employment, and no compensation outcome is promised.",
  },
  {
    heading: "Changes to programmes",
    body: "Curricula, faculty allocation and schedules may change to reflect industry practice or operational need. Material changes are communicated to affected cohorts in advance.",
  },
];

function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms and conditions"
        description="Last updated 1 August 2026. These terms apply to everyone who applies to or enrols in an A² Technologies programme."
      />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <ol className="space-y-10">
          {sections.map((s, i) => (
            <li key={s.heading}>
              <h2 className="font-display text-lg font-bold">
                <span className="text-accent">{i + 1}.</span> {s.heading}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
