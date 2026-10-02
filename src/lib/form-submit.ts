/**
 * FormSubmit (https://formsubmit.co) integration.
 *
 * Form Backend-as-a-Service: submissions are POSTed straight from the browser
 * to FormSubmit's AJAX endpoint, which emails them to the recipient below.
 * No server, no API key, no secret is involved — the endpoint is just the
 * recipient address, so nothing sensitive is exposed.
 *
 * Note: the very first submission triggers a one-time confirmation email to
 * the recipient. The link in it must be clicked once to activate the endpoint.
 */
export const FORM_RECIPIENT = "admin@artificialaugmenttechnologies.com";

const ENDPOINT = `https://formsubmit.co/ajax/${FORM_RECIPIENT}`;

export type FormFields = Record<string, string | null | undefined>;

export async function sendFormSubmission(
  subject: string,
  fields: FormFields,
): Promise<void> {
  const payload: Record<string, string> = {
    _subject: subject,
    _template: "table",
    _captcha: "false",
  };

  for (const [key, value] of Object.entries(fields)) {
    payload[key] = value == null || value === "" ? "—" : String(value);
  }

  let response: Response;
  try {
    response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error("Network error — please check your connection and try again.");
  }

  if (!response.ok) throw new Error("The submission service rejected the request.");

  const result = (await response.json().catch(() => null)) as { success?: string | boolean } | null;
  if (result && result.success !== undefined && String(result.success) !== "true") {
    throw new Error("The submission service could not deliver the message.");
  }
}
