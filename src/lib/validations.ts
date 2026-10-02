import { z } from "zod";

const phoneRegex = /^[+()\d\s-]{8,20}$/;

export const applicationSchema = z.object({
  full_name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().regex(phoneRegex, "Enter a valid phone number"),
  date_of_birth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((v) => {
      const d = new Date(v);
      if (Number.isNaN(d.getTime())) return false;
      const age = (Date.now() - d.getTime()) / (365.25 * 24 * 3600 * 1000);
      return age >= 15 && age <= 90;
    }, "Applicants must be at least 15 years old"),
  gender: z.enum(["female", "male", "other", "prefer_not_to_say"], {
    errorMap: () => ({ message: "Please select an option" }),
  }),
  address: z.string().trim().min(10, "Please enter your full address").max(400),
  course_slug: z.string().min(1, "Select a course"),
  qualification: z.string().trim().min(2, "Enter your highest qualification").max(150),
  previous_institution: z.string().trim().max(150).optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().regex(phoneRegex, "Enter a valid phone number").optional().or(z.literal("")),
  subject: z.string().trim().min(3, "Add a short subject").max(150),
  message: z.string().trim().min(10, "Tell us a little more (10 characters minimum)").max(1000),
  /* Honeypot field — must stay empty; bots typically fill it. */
  website: z.string().max(0, "Submission rejected").optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
