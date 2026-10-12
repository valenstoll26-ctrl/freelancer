"use client";
import { useRef, useState } from "react";
import { services } from "@/content/services";
import { site } from "@/config/site";
import { getMessages, type Locale } from "@/lib/i18n";
import { validateContact, emailDraft, type ContactValues, type ContactErrors } from "@/lib/contact";
import { Arrow } from "./ui";

const initial: ContactValues = { name: "", email: "", company: "", country: "", service: "", message: "", website: "" };
export function ContactForm({ locale }: { locale: Locale }) {
  const t = getMessages(locale).contact;
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [state, setState] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [draft, setDraft] = useState("");
  const statusRef = useRef<HTMLDivElement>(null);
  const errorText = (code?: string) => code === "length" ? t.lengthError : code === "name" ? t.nameError : code === "email" ? t.emailError : code === "message" ? t.messageError : t.blocked;
  function update(key: keyof ContactValues, value: string) { setValues(current => ({ ...current, [key]: value })); setErrors(current => ({ ...current, [key]: undefined })); setState("idle"); setDraft(""); }
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = validateContact(values);
    setErrors(result.errors);
    if (Object.keys(result.errors).length) { setState("error"); document.getElementById(`contact-${Object.keys(result.errors)[0]}`)?.focus(); return; }
    setState("loading");
    // Yield one frame so the preparing state can be announced; no message is sent.
    await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
    const service = services.find(service => service.id === result.values.service)?.title[locale] || t.unsure;
    setDraft(emailDraft(site.email, `${t.subject} — ${service}`, [[t.name, result.values.name], [t.emailLabel, result.values.email], [t.company, result.values.company], [t.country, result.values.country], [t.service, service], [t.messageLabel, result.values.message]]));
    setState("success");
    requestAnimationFrame(() => statusRef.current?.focus());
  }
  const field = (key: "name" | "email" | "company" | "country", label: string, required = false) => <div className="form-field"><label htmlFor={`contact-${key}`}>{label}{!required && <span> ({t.optional})</span>}</label><input id={`contact-${key}`} name={key} type={key === "email" ? "email" : "text"} autoComplete={key === "company" ? "organization" : key === "country" ? "country-name" : key} maxLength={key === "email" ? 254 : key === "name" ? 100 : 150} required={required} value={values[key]} disabled={state === "loading"} onChange={event => update(key, event.target.value)} aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `error-${key}` : undefined} />{errors[key] && <p className="field-error" id={`error-${key}`}>{errorText(errors[key])}</p>}</div>;
  return <form className="contact-form" noValidate onSubmit={submit}><h2>{t.formTitle}</h2><div className="form-row">{field("name", t.name, true)}{field("email", t.emailLabel, true)}</div><div className="form-row">{field("company", t.company)}{field("country", t.country)}</div><div className="form-field"><label htmlFor="contact-service">{t.service}</label><select id="contact-service" name="service" value={values.service} onChange={event => update("service", event.target.value)}><option value="">{t.unsure}</option>{services.map(service => <option key={service.id} value={service.id}>{service.title[locale]}</option>)}</select></div><div className="form-field"><label htmlFor="contact-message">{t.messageLabel}</label><textarea id="contact-message" name="message" rows={5} required maxLength={3000} placeholder={t.placeholder} value={values.message} onChange={event => update("message", event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "error-message" : undefined} />{errors.message && <p id="error-message" className="field-error">{t.messageError}</p>}</div><div className="honeypot" aria-hidden="true"><label htmlFor="contact-website">{t.honeypot}</label><input id="contact-website" tabIndex={-1} value={values.website} autoComplete="off" onChange={event => update("website", event.target.value)} /></div><p className="form-note">{t.note}</p><button className="button button-dark" type="submit" disabled={state === "loading"}>{state === "loading" ? t.loading : t.prepare}<Arrow /></button><div ref={statusRef} tabIndex={-1} className={`form-feedback ${state}`} role="status" aria-live="polite">{state === "error" && t.error}{state === "success" && <><p>{t.success}</p><a className="text-link" href={draft}>{t.openDraft}<Arrow diagonal /></a></>}</div></form>;
}
