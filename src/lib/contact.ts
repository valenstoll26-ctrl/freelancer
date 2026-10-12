export type ContactValues = { name: string; email: string; company: string; country: string; service: string; message: string; website: string };
export type ContactErrors = Partial<Record<keyof ContactValues, "name" | "email" | "length" | "message" | "blocked">>;
export function validateContact(input: ContactValues): { values: ContactValues; errors: ContactErrors } {
  const values = Object.fromEntries(Object.entries(input).map(([key, value]) => [key, value.trim()])) as ContactValues;
  const errors: ContactErrors = {};
  if (values.name.length < 2 || values.name.length > 100) errors.name = "name";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) || values.email.length > 254) errors.email = "email";
  if (values.company.length > 150) errors.company = "length";
  if (values.country.length > 150) errors.country = "length";
  if (values.message.length < 20 || values.message.length > 3000) errors.message = "message";
  if (values.website) errors.website = "blocked";
  return { values, errors };
}
export function emailDraft(recipient: string, subject: string, fields: [string, string][]) {
  const body = fields.map(([label, value]) => `${label}: ${value}`).join("\n\n");
  return `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
