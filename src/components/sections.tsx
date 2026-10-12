import Link from "next/link";
import { site } from "@/config/site";
import { profile } from "@/content/profile";
import { services, type Service } from "@/content/services";
import { timeline } from "@/content/timeline";
import { getMessages, pathFor, type Locale, type PageKey } from "@/lib/i18n";
import { Arrow, BookingLink, SectionHeading, SectionLabel, CapabilityTags, QuoteBlock } from "./ui";
import { Portrait } from "./portrait";
import { ProjectGallery } from "./project-gallery";
import { ContactForm } from "./contact-form";
import { MicroReveal } from "./micro-reveal";

export function Hero({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  return <section className="hero container portfolio-hero"><div className="hero-content"><SectionLabel>{t.hero.eyebrow}</SectionLabel><h1>{t.hero.headline}<br /><em>{t.hero.emphasis}</em></h1><p className="hero-description">{t.hero.description}</p><div className="hero-actions"><Link href={pathFor(locale, "work")} className="button button-dark">{t.hero.work}<Arrow /></Link><Link href={pathFor(locale, "contact")} className="text-link">{t.hero.collaborate}<Arrow diagonal /></Link></div><p className="hero-footnote">{t.hero.note}</p></div><div className="hero-portrait-wrap"><Portrait locale={locale} variant="hero" /><div className="portrait-context"><span className="label-dot" /><span>{profile.availability[locale]}</span></div></div></section>;
}
export function CredibilityStrip({ locale }: { locale: Locale }) {
  return <div className="credibility-strip"><div className="container">{getMessages(locale).hero.disciplines.map(item => <span key={item}>{item}</span>)}</div></div>;
}
export function IntroSection({ locale }: { locale: Locale }) {
  const t = getMessages(locale).intro;
  return <section className="section container split-section" data-reveal><div><SectionLabel>{t.label}</SectionLabel><h2>{t.title}</h2></div><div className="intro-copy">{t.paragraphs.map(text => <p className="lead" key={text}>{text}</p>)}<QuoteBlock>{t.quote}</QuoteBlock></div></section>;
}
export function ServiceDetail({ service, locale, index, full = false }: { service: Service; locale: Locale; index: number; full?: boolean }) {
  const t = getMessages(locale);
  return <article className={`service-row ${full ? "full-service" : ""}`} id={full ? service.id : undefined}><span className="row-number">{String(index + 1).padStart(2, "0")}</span><h3>{service.title[locale]}</h3><div><p>{service.description[locale]}</p>{full ? <><h4 className="service-subheading">{t.services.includes}</h4><ul className="service-includes">{service.includes[locale].map(item => <li key={item}>{item}</li>)}</ul><h4 className="service-subheading">{t.services.fit}</h4><p>{service.fit[locale]}</p></> : <CapabilityTags items={service.includes[locale].slice(0, 3)} />}{service.disclaimer && <p className="service-disclaimer">{service.disclaimer[locale]}</p>}{!full && <Link className="text-link service-detail-link" href={`${pathFor(locale, "services")}#${service.id}`}>{t.services.details}<Arrow diagonal /></Link>}</div></article>;
}
export function ServiceSection({ locale, full = false }: { locale: Locale; full?: boolean }) {
  const t = getMessages(locale).services;
  return <section id="services" className="section section-sand" data-reveal><div className="container"><SectionHeading label={t.label} title={t.title} description={t.intro} /><div className="services-list">{services.map((service, index) => <ServiceDetail key={service.id} service={service} locale={locale} index={index} full={full} />)}</div></div></section>;
}
export function WorkSection({ locale }: { locale: Locale }) {
  const t = getMessages(locale).work;
  return <section id="work" className="section section-sand" data-reveal><div className="container"><SectionHeading label={t.label} title={t.title} description={t.intro} /><ProjectGallery locale={locale} featured /><Link href={pathFor(locale, "work")} className="text-link section-bottom-link">{t.allProjects}<Arrow /></Link></div></section>;
}
export function AboutSection({ locale, full = false }: { locale: Locale; full?: boolean }) {
  const t = getMessages(locale).about;
  const bio = profile.bio[locale];
  return <section id="about" className="section container about-section" data-reveal><div className="about-visual"><Portrait locale={locale} /><div className="about-location"><span className="label-dot" />{profile.availability[locale]}</div></div><div className="about-content"><SectionLabel>{t.label}</SectionLabel><h2>{t.title}</h2>{(full ? bio.slice(0, 4) : [bio[0], bio[2]]).map(text => <p key={text}>{text}</p>)}<QuoteBlock>{profile.quote[locale]}</QuoteBlock>{full && bio.slice(4).map(text => <p key={text}>{text}</p>)}{!full && <Link href={pathFor(locale, "about")} className="text-link section-bottom-link">{t.more}<Arrow /></Link>}</div></section>;
}
export function CareerTimeline({ locale }: { locale: Locale }) {
  const t = getMessages(locale).timeline;
  return <section id="journey" className="section section-sand" data-reveal><div className="container timeline-layout"><div><SectionLabel>{t.label}</SectionLabel><h2>{t.title}</h2><p className="lead journey-intro">{t.intro}</p></div><ol className="journey-timeline">{timeline.map((item, index) => <li key={item.id}><span className="eyebrow">{item.year || `${t.chapter} ${String(index + 1).padStart(2, "0")}`}</span><h3>{item.title[locale]}</h3><p>{item.description[locale]}</p></li>)}</ol></div></section>;
}
export function EducationSection({ locale }: { locale: Locale }) {
  const t = getMessages(locale).about;
  return <section className="section container split-section" data-reveal><div><SectionLabel>{t.educationLabel}</SectionLabel><h2>{t.education}</h2><h3 className="education-languages-title">{t.languages}</h3><ul className="language-list">{profile.languages.map(language => <li key={language.en}>{language[locale]}</li>)}</ul></div><div className="education-list">{profile.education.map(item => <article key={item.title.en}><h3>{item.title[locale]}</h3><p>{item.detail[locale]}</p></article>)}</div></section>;
}
export function ProcessSection({ locale }: { locale: Locale }) {
  const t = getMessages(locale).process;
  return <section className="section container" data-reveal><SectionLabel>{t.label}</SectionLabel><h2 className="max-title">{t.title}</h2><MicroReveal><div className="approach-grid five-steps">{t.steps.map((step, index) => <article key={step.title}><span className="step-number">0{index + 1}</span><h3>{step.title}</h3><p>{step.description}</p></article>)}</div></MicroReveal></section>;
}
export function ValuesSection({ locale }: { locale: Locale }) {
  const t = getMessages(locale).values;
  return <section className="section container split-section" data-reveal><div><SectionLabel>{t.label}</SectionLabel><h2>{t.title}</h2></div><div className="strengths-grid">{t.items.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></section>;
}
export function AudienceSection({ locale }: { locale: Locale }) {
  const t = getMessages(locale).audience;
  return <section className="section section-sand" data-reveal><div className="container split-section"><div><SectionLabel>{t.label}</SectionLabel><h2>{t.title}</h2><p className="audience-location">{t.location}</p></div><ul className="audience-list">{t.items.map(item => <li key={item}>{item}<span aria-hidden="true">↗</span></li>)}</ul></div></section>;
}
export function EngagementsSection({ locale }: { locale: Locale }) {
  const t = getMessages(locale).engagements;
  return <section className="section container" data-reveal><SectionLabel>{t.label}</SectionLabel><h2>{t.title}</h2><div className="engagement-editorial">{t.items.map((item, index) => <article key={item.title}><span className="row-number">0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p><span className="engagement-format">{item.note}</span></article>)}</div><Link href={pathFor(locale, "contact")} className="text-link section-bottom-link">{t.cta}<Arrow /></Link></section>;
}
export function FinalCTA({ locale }: { locale: Locale }) {
  const t = getMessages(locale).final;
  return <section className="section section-dark final-cta" data-reveal><div className="container"><SectionLabel light>{t.label}</SectionLabel><h2>{t.title}</h2><p className="lead">{t.description}</p><div className="hero-actions"><Link href={pathFor(locale, "contact")} className="button button-cream">{t.cta}<Arrow /></Link></div><span className="cta-mark" aria-hidden="true">vs.</span></div></section>;
}
export function ContactSection({ locale }: { locale: Locale }) {
  const t = getMessages(locale).contact;
  const whatsapp = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(t.whatsappMessage)}`;
  return <section className="section container contact-page"><div className="contact-page-heading"><SectionLabel>{t.label}</SectionLabel><h1>{t.title}</h1><p className="lead">{t.description}</p><div className="hero-actions"><BookingLink locale={locale} /><a href={whatsapp} target="_blank" rel="noopener noreferrer" className="text-link">{t.message}<Arrow diagonal /></a></div></div><div className="contact-section"><aside className="contact-details"><h2>{t.direct}</h2><a href={`mailto:${site.email}`} className="contact-email text-link">{site.email}<Arrow diagonal /></a><a href={site.linkedin} className="text-link" target="_blank" rel="noopener noreferrer">LinkedIn<Arrow diagonal /></a><a href={whatsapp} className="button button-outline" target="_blank" rel="noopener noreferrer">{t.whatsapp}<Arrow diagonal /></a><span className="whatsapp-number">{site.whatsappDisplay}</span><p className="contact-note">{profile.availability[locale]}</p></aside><ContactForm key={locale} locale={locale} /></div></section>;
}
export function Footer({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  return <footer className="footer"><div className="container"><div className="footer-top"><div><Link href={pathFor(locale)} className="wordmark">{site.name}<span className="brand-dot">.</span></Link><p>{profile.role[locale]}</p></div><nav aria-label={t.footer.label}><a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <Arrow diagonal /></a><a href={`mailto:${site.email}`}>{t.contact.email} <Arrow diagonal /></a>{(["services", "work", "about", "contact"] as PageKey[]).map(page => <Link href={pathFor(locale, page)} key={page}>{t.nav[page as "services" | "work" | "about" | "contact"]}</Link>)}</nav></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {site.name}</span><span>{profile.availability[locale]}</span><a href="#top">{t.footer.top} ↑</a></div></div></footer>;
}
