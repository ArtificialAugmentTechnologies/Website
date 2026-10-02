import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/layout/PageHeader";
import { institute } from "@/data/institute";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | A² Technologies" },
      {
        name: "description",
        content:
          "How A² Technologies collects, uses, stores and protects personal information submitted through admissions and enquiry forms.",
      },
      { property: "og:title", content: "Privacy Policy — A² Technologies" },
      { property: "og:description", content: "How we handle applicant and enquiry data." },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: PrivacyPage,
});

const sections = [
  {
    heading: "Information we collect",
    body: "When you submit an admission application or an enquiry we collect the details you provide: name, email address, phone number, date of birth, gender, postal address, educational qualification, previous institution and any message you write. We do not collect payment details through this website.",
  },
  {
    heading: "How we use it",
    body: "Application data is used only to assess eligibility, contact you about admission and maintain academic records if you enrol. Enquiry data is used to answer your question. We do not sell personal information, and we do not share it with third parties except service providers who host our systems under contract.",
  },
  {
    heading: "Storage and security",
    body: "Submissions are stored in an access-controlled managed database. Application and enquiry records are not readable by other website visitors under any circumstances; access is restricted to authorised admissions staff through authenticated administrative tools.",
  },
  {
    heading: "Retention",
    body: "Unsuccessful or withdrawn applications are retained for 24 months and then deleted. Enrolled learner records are retained for the period required by our accreditation and audit obligations.",
  },
  {
    heading: "Your rights",
    body: "You may request a copy of the personal data we hold about you, ask us to correct it, or ask us to delete it where we are not required to retain it. Write to the address below and we will respond within 30 days.",
  },
  {
    heading: "Cookies",
    body: "This website uses only the strictly necessary storage required to deliver pages and remember a signed-in session. We do not run advertising trackers.",
  },
];

function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy policy"
        description="Last updated 1 August 2026. This policy explains what we collect through this website and what we do with it."
      />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="space-y-10">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="font-display text-lg font-bold">{s.heading}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
          <div>
            <h2 className="font-display text-lg font-bold">Contact the data officer</h2>
            <address className="mt-3 text-sm not-italic leading-relaxed text-muted-foreground">
              {institute.name}
              <br />
              {institute.address.line1}, {institute.address.line2}
              <br />
              <a href={`mailto:${institute.email}`} className="underline hover:text-foreground">
                {institute.email}
              </a>
            </address>
          </div>
        </div>
      </section>
    </>
  );
}
