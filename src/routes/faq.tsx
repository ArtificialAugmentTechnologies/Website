import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/data/content";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions | A² Technologies" },
      {
        name: "description",
        content:
          "Answers on eligibility, online classes, placement assistance, fee instalments, scholarships and certification at A² Technologies.",
      },
      { property: "og:title", content: "FAQ — A² Technologies" },
      {
        property: "og:description",
        content: "Eligibility, class modes, placement support, fees and certification questions answered.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="Support"
        title="Frequently asked questions"
        description="The questions the admissions desk answers most often. If yours isn't here, write to us and we'll reply within a working day."
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Accordion type="single" collapsible>
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left font-display text-base font-semibold">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 rounded-2xl border border-accent/30 bg-accent-soft p-8 text-center">
          <h2 className="font-display text-lg font-bold text-primary">Still have a question?</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-accent-foreground">
            The admissions team can walk you through eligibility, timings and fees for any track.
          </p>
          <Button asChild className="mt-6">
            <Link to="/contact">Contact admissions</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
