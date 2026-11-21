import { createServerFn } from "@tanstack/react-start";
import { applicationSchema, contactSchema } from "@/lib/validations";

// Public form submissions, validated again on the server with the same schemas
// the browser uses, then stored in the Neon database.

export const saveApplication = createServerFn({ method: "POST" })
  .validator((input: unknown) => applicationSchema.parse(input))
  .handler(async ({ data }) => {
    const { getSql } = await import("@/lib/neon.server");
    await getSql()`
      INSERT INTO applications (full_name, email, phone, date_of_birth, gender, address, course_slug, qualification, previous_institution, message)
      VALUES (${data.full_name}, ${data.email}, ${data.phone}, ${data.date_of_birth}, ${data.gender}, ${data.address},
              ${data.course_slug}, ${data.qualification}, ${data.previous_institution || null}, ${data.message || null})`;
    return { ok: true };
  });

export const saveContactMessage = createServerFn({ method: "POST" })
  .validator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const { getSql } = await import("@/lib/neon.server");
    await getSql()`
      INSERT INTO contact_messages (name, email, phone, subject, message)
      VALUES (${data.name}, ${data.email}, ${data.phone || null}, ${data.subject}, ${data.message})`;
    return { ok: true };
  });
