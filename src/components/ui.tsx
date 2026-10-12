import Link from "next/link";
import { site } from "@/config/site";
import { pathFor, getMessages, type Locale } from "@/lib/i18n";
import { whatsappHref } from "@/lib/whatsapp";

export function Arrow({ diagonal = false, className = "" }: { diagonal?: boolean; className?: string }) {
  return <svg className={`arrow ${className}`} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
export function BookingLink({ locale, className = "button button-dark", label }: { locale: Locale; className?: string; label?: string }) {
  return <a className={className} href={site.booking || pathFor(locale, "contact")} {...(site.booking ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{label || getMessages(locale).contact.book}<Arrow diagonal={Boolean(site.booking)} /></a>;
}
export function WhatsAppLink({ locale, message, label, className = "button button-dark", accessibleLabel }: { locale: Locale; message?: string; label?: string; className?: string; accessibleLabel?: string }) {
  const t = getMessages(locale);
  return <a href={whatsappHref(message || t.contact.whatsappMessage)} className={className} target="_blank" rel="noopener noreferrer" aria-label={accessibleLabel}>{label || t.contact.whatsapp}<Arrow diagonal /></a>;
}
export function SectionLabel({ children, number, light = false }: { children: React.ReactNode; number?: string; light?: boolean }) {
  return <div className={`section-label ${light ? "light" : ""}`}><span className="label-dot" />{children}{number && <span className="label-number">{number}</span>}</div>;
}
export function SectionHeading({ label, title, description }: { label: string; title: string; description?: string }) {
  return <div className="section-heading"><SectionLabel>{label}</SectionLabel><div className="heading-split"><h2>{title}</h2>{description && <p className="lead">{description}</p>}</div></div>;
}
export function PageIntro({ locale, eyebrow, title, description }: { locale: Locale; eyebrow: string; title: string; description: string }) {
  return <section className="container page-intro"><Link className="text-link back-link" href={pathFor(locale)}>← {getMessages(locale).notFound.back}</Link><SectionLabel>{eyebrow}</SectionLabel><h1>{title}</h1><p className="lead">{description}</p></section>;
}
export function CapabilityTags({ items }: { items: string[] }) { return <ul className="tag-list">{items.map(item => <li key={item}>{item}</li>)}</ul>; }
export function QuoteBlock({ children }: { children: React.ReactNode }) { return <blockquote className="quote-block">{children}</blockquote>; }
