// Form submissions are emailed to the org inbox through FormSubmit (https://formsubmit.co).
// No account or key is needed. The very first submission sends a one-time activation
// email to CONTACT_EMAIL; submissions are delivered after that link is clicked.
export const CONTACT_EMAIL = "futurescholars.contact@gmail.com";

const ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

export async function submitForm(subject: string, fields: Record<string, string>) {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ _subject: subject, _template: "table", ...fields }),
  });
  const result = await response.json().catch(() => null);
  if (!response.ok || String(result?.success) !== "true") {
    throw new Error(result?.message || `Submission failed (${response.status})`);
  }
}
