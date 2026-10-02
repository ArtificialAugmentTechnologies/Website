import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clock, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { institute } from "@/data/institute";
import { contactSchema, type ContactInput } from "@/lib/validations";
import { sendFormSubmission } from "@/lib/form-submit";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact A² Technologies — Admissions & Enquiries" },
      {
        name: "description",
        content:
          "Get in touch with the A² Technologies admissions team in Bengaluru. Phone, email, campus address and an online enquiry form.",
      },
      { property: "og:title", content: "Contact A² Technologies" },
      { property: "og:description", content: "Phone, email, campus address and online enquiry form." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "", website: "" },
  });

  async function onSubmit(values: ContactInput) {
    if (values.website) return; // honeypot tripped
    if (isSubmitting) return; // guard against duplicate submissions

    /* 1. Email the enquiry to the admissions inbox (FormSubmit). */
    try {
      await sendFormSubmission(`New website enquiry — ${values.subject}`, {
        Name: values.name,
        Email: values.email,
        Phone: values.phone,
        Subject: values.subject,
        Message: values.message,
      });
    } catch {
      toast.error("Your message didn't send. Please try again or call the office.");
      throw new Error("Enquiry submission failed");
    }

    /* 2. Keep a copy in the database (best effort — email already delivered). */
    const { error } = await supabase.from("contact_messages").insert({
      name: values.name,
      email: values.email,
      phone: values.phone || null,
      subject: values.subject,
      message: values.message,
    });

    if (error) console.error("Enquiry copy not stored:", error.message);

    reset();
    toast.success("Message sent — we usually reply within one working day.");
  }

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to the admissions office"
        description="Questions about eligibility, fees, batch timings or corporate training? Reach us by phone, email or the form below."
      />

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.3fr] lg:px-8">
        <div className="space-y-4">
          <ContactItem icon={MapPin} title="Campus">
            {institute.address.line1}
            <br />
            {institute.address.line2}
            <br />
            {institute.address.country}
          </ContactItem>
          <ContactItem icon={Phone} title="Phone">
            <a href={`tel:${institute.phone.replace(/\s/g, "")}`} className="hover:text-foreground">
              {institute.phone}
            </a>
          </ContactItem>
          <ContactItem icon={Mail} title="Email">
            <a href={`mailto:${institute.email}`} className="hover:text-foreground">
              {institute.email}
            </a>
          </ContactItem>
          <ContactItem icon={Clock} title="Office hours">
            {institute.hours}
          </ContactItem>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8"
        >
          <h2 className="font-display text-xl font-bold">Send an enquiry</h2>

          {isSubmitSuccessful && (
            <p
              role="status"
              className="mt-5 rounded-lg border border-accent/40 bg-accent-soft px-4 py-3 text-sm text-accent-foreground"
            >
              Thanks — your message is with the admissions team. We usually reply within one working day.
            </p>
          )}

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input id="name" autoComplete="name" className="mt-1.5" {...register("name")} />
              <FieldError message={errors.name?.message} />
            </div>
            <div>
              <Label htmlFor="c-email">Email *</Label>
              <Input id="c-email" type="email" autoComplete="email" className="mt-1.5" {...register("email")} />
              <FieldError message={errors.email?.message} />
            </div>
            <div>
              <Label htmlFor="c-phone">Phone</Label>
              <Input id="c-phone" type="tel" autoComplete="tel" className="mt-1.5" {...register("phone")} />
              <FieldError message={errors.phone?.message} />
            </div>
            <div>
              <Label htmlFor="subject">Subject *</Label>
              <Input id="subject" className="mt-1.5" {...register("subject")} />
              <FieldError message={errors.subject?.message} />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="c-message">Message *</Label>
              <Textarea id="c-message" rows={5} className="mt-1.5" {...register("message")} />
              <FieldError message={errors.message?.message} />
            </div>
          </div>

          {/* Honeypot: hidden from users, catches naive bots */}
          <div aria-hidden className="hidden">
            <label htmlFor="website">Website</label>
            <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
          </div>

          <Button type="submit" size="lg" className="mt-7 w-full sm:w-auto" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 aria-hidden className="size-4 animate-spin" /> Sending…
              </>
            ) : (
              <>
                <Send aria-hidden className="size-4" /> Send message
              </>
            )}
          </Button>
        </form>
      </section>
    </>
  );
}

function ContactItem({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof MapPin;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
      <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-accent" />
      <div>
        <h2 className="font-display text-sm font-semibold">{title}</h2>
        <p className="mt-1 text-sm not-italic leading-relaxed text-muted-foreground">{children}</p>
      </div>
    </div>
  );
}

function FieldError({ message }: { message?: string | undefined }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1.5 text-xs text-destructive">
      {message}
    </p>
  );
}
