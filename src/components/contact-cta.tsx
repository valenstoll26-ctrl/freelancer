import { getMessages, type Locale } from "@/lib/i18n";
import { BookingLink, WhatsAppLink } from "./ui";

export function ContactCTA({ locale, variant, project }: { locale: Locale; variant: "case" | "journey"; project?: string }) {
  const t = getMessages(locale).cta;
  const title = variant === "case" ? t.caseTitle : t.journeyTitle;
  const description = variant === "case" ? t.caseDescription : t.journeyDescription;
  const message = variant === "case" ? t.caseMessage.replace("{project}", project || "") : t.journeyMessage;
  return <aside className={`contextual-cta contextual-cta-${variant}`} aria-label={title}><div><h2>{title}</h2><p>{description}</p></div><div className="cta-actions"><WhatsAppLink locale={locale} message={message} /><BookingLink locale={locale} className="text-link" label={t.book} /></div></aside>;
}
