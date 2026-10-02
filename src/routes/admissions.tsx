import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarCheck, CheckCircle2, FileText, Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { courses } from "@/data/courses";
import { applicationSchema, type ApplicationInput } from "@/lib/validations";
import { sendFormSubmission } from "@/lib/form-submit";

const searchSchema = z.object({
  course: z.string().optional(),
});

export const Route = createFileRoute("/admissions")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Admissions — Apply to A² Technologies" },
      {
        name: "description",
        content:
          "Apply for the next A² Technologies intake. Simple online application, rolling review and admissions support for DevOps, data analytics and cloud tracks.",
      },
      { property: "og:title", content: "Admissions — Apply to A² Technologies" },
      {
        property: "og:description",
        content: "Online application for DevOps, data analytics and cloud career tracks.",
      },
    ],
  }),
  component: AdmissionsPage,
});

const steps = [
  { icon: FileText, title: "Submit the form", body: "Tell us about your background and the track you want." },
  { icon: CalendarCheck, title: "Counselling call", body: "An advisor calls within two working days to confirm fit." },
  { icon: CheckCircle2, title: "Confirm your seat", body: "Pay the first instalment and receive your cohort details." },
];

function AdmissionsPage() {
  const { course } = Route.useSearch();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ApplicationInput>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      date_of_birth: "",
      address: "",
      course_slug: course && courses.some((c) => c.slug === course) ? course : "",
      qualification: "",
      previous_institution: "",
      message: "",
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  async function onSubmit(values: ApplicationInput) {
    if (isSubmitting) return; // guard against duplicate submissions

    const courseName =
      courses.find((c) => c.slug === values.course_slug)?.name ?? values.course_slug;

    /* 1. Email the application to the admissions inbox (FormSubmit). */
    try {
      await sendFormSubmission(`New admission application — ${values.full_name}`, {
        "Full name": values.full_name,
        Email: values.email,
        Phone: values.phone,
        "Date of birth": values.date_of_birth,
        Gender: values.gender,
        Address: values.address,
        Course: courseName,
        "Highest qualification": values.qualification,
        "Previous institution": values.previous_institution,
        Message: values.message,
      });
    } catch {
      toast.error("We couldn't submit your application. Please try again.");
      return;
    }

    /* 2. Keep a copy in the database (best effort — email already delivered). */
    const { error } = await supabase.from("applications").insert({
      full_name: values.full_name,
      email: values.email,
      phone: values.phone,
      date_of_birth: values.date_of_birth,
      gender: values.gender,
      address: values.address,
      course_slug: values.course_slug,
      qualification: values.qualification,
      previous_institution: values.previous_institution || null,
      message: values.message || null,
    });

    if (error) console.error("Application copy not stored:", error.message);

    reset();
    setSubmitted(true);
    toast.success("Application received — we'll be in touch within two working days.");
  }

  return (
    <>
      <PageHeader
        eyebrow="Admissions"
        title="Apply for the next intake"
        description="Applications are reviewed on a rolling basis and seats are capped at 30 learners per batch. The form takes about four minutes."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <ol className="grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary font-display text-sm font-bold text-accent">
                  {i + 1}
                </span>
                <s.icon aria-hidden className="size-5 text-secondary" />
              </div>
              <h2 className="mt-4 font-display text-base font-semibold">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6 lg:px-8">
        {submitted ? (
          <div className="rounded-2xl border border-accent/40 bg-accent-soft p-10 text-center">
            <CheckCircle2 aria-hidden className="mx-auto size-10 text-primary" />
            <h2 className="mt-5 font-display text-2xl font-bold text-primary">Application received</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-accent-foreground">
              Thank you. An admissions advisor will call you within two working days to discuss your track
              and confirm eligibility. A copy of your application has been logged under your email address.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild variant="outline" className="border-accent-foreground/40 bg-transparent text-accent-foreground hover:bg-primary/10 hover:text-accent-foreground">
                <Link to="/courses">Browse courses</Link>
              </Button>
              <Button onClick={() => setSubmitted(false)}>Submit another application</Button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8"
          >
            <h2 className="font-display text-xl font-bold">Application form</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              All fields marked with an asterisk are required.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <Field id="full_name" label="Full name *" error={errors.full_name?.message}>
                <Input id="full_name" autoComplete="name" {...register("full_name")} />
              </Field>

              <Field id="email" label="Email *" error={errors.email?.message}>
                <Input id="email" type="email" autoComplete="email" {...register("email")} />
              </Field>

              <Field id="phone" label="Phone *" error={errors.phone?.message}>
                <Input id="phone" type="tel" autoComplete="tel" {...register("phone")} />
              </Field>

              <Field id="date_of_birth" label="Date of birth *" error={errors.date_of_birth?.message}>
                <Input id="date_of_birth" type="date" {...register("date_of_birth")} />
              </Field>

              <Field id="gender" label="Gender *" error={errors.gender?.message}>
                <Select
                  value={watch("gender")}
                  onValueChange={(v) =>
                    setValue("gender", v as ApplicationInput["gender"], { shouldValidate: true })
                  }
                >
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field id="course_slug" label="Course *" error={errors.course_slug?.message}>
                <Select
                  value={watch("course_slug")}
                  onValueChange={(v) => setValue("course_slug", v, { shouldValidate: true })}
                >
                  <SelectTrigger id="course_slug">
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((c) => (
                      <SelectItem key={c.slug} value={c.slug}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field id="qualification" label="Highest qualification *" error={errors.qualification?.message}>
                <Input id="qualification" placeholder="e.g. B.E Computer Science" {...register("qualification")} />
              </Field>

              <Field
                id="previous_institution"
                label="Previous institution"
                error={errors.previous_institution?.message}
              >
                <Input id="previous_institution" {...register("previous_institution")} />
              </Field>

              <div className="sm:col-span-2">
                <Field id="address" label="Address *" error={errors.address?.message}>
                  <Textarea id="address" rows={3} autoComplete="street-address" {...register("address")} />
                </Field>
              </div>

              <div className="sm:col-span-2">
                <Field id="message" label="Anything else we should know?" error={errors.message?.message}>
                  <Textarea id="message" rows={4} {...register("message")} />
                </Field>
              </div>
            </div>

            <Button type="submit" size="lg" className="mt-8 w-full sm:w-auto" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 aria-hidden className="size-4 animate-spin" /> Submitting…
                </>
              ) : (
                <>
                  <Send aria-hidden className="size-4" /> Submit application
                </>
              )}
            </Button>
            <p className="mt-4 text-xs text-muted-foreground">
              By submitting you agree to our{" "}
              <Link to="/privacy" className="underline hover:text-foreground">
                privacy policy
              </Link>
              .
            </p>
          </form>
        )}
      </section>
    </>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div className="mt-1.5">{children}</div>
      {error && (
        <p role="alert" className="mt-1.5 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
