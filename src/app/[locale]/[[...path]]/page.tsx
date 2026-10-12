import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, hasLocale, pathFor, resolvePage, getMessages, type Locale, type PageKey } from "@/lib/i18n";
import { projects } from "@/content/projects";
import { getSiteUrl } from "@/lib/site-url";
import { Hero, CredibilityStrip, IntroSection, WorkSection, ServiceSection, ProcessSection, AboutSection, CareerTimeline, ValuesSection, EducationSection, AudienceSection, EngagementsSection, ContactSection, FinalCTA } from "@/components/sections";
import { PageIntro } from "@/components/ui";
import { ProjectGallery } from "@/components/project-gallery";
import { CaseStudyPage } from "@/components/case-study";

type Params = { locale: string; path?: string[] };
export const dynamicParams = false;
export function generateStaticParams({ params }: { params: { locale: string } }) {
  if (!hasLocale(params.locale)) return [];
  const locale = params.locale;
  const pages: PageKey[] = ["home", "services", "work", "about", "contact"];
  return [...pages.map(page => ({ path: pathFor(locale, page).split("/").slice(2) })), ...projects.map(project => ({ path: pathFor(locale, "work", project.slug).split("/").slice(2) }))];
}
function getRoute(params: Params) {
  if (!hasLocale(params.locale)) notFound();
  const route = resolvePage(params.locale, params.path);
  if (!route) notFound();
  const project = route.slug ? projects.find(project => project.slug === route.slug) : undefined;
  if (route.slug && !project) notFound();
  return { locale: params.locale, route, project };
}
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, route, project } = getRoute(await params);
  const t = getMessages(locale);
  const title = project ? `${project.content[locale].title} | Valentina Stoll` : route.page === "home" ? t.seo.title : `${t.nav[route.page]} | Valentina Stoll`;
  const description = project ? project.content[locale].summary : route.page === "services" ? t.services.pageIntro : route.page === "work" ? t.work.pageIntro : route.page === "about" ? t.about.pageIntro : route.page === "contact" ? t.contact.description : t.seo.description;
  const url = getSiteUrl();
  const languages = url ? Object.fromEntries(locales.map(target => [target, `${url}${pathFor(target, route.page, route.slug)}`])) : undefined;
  return { title: { absolute: title }, description, ...(url ? { alternates: { canonical: `${url}${pathFor(locale, route.page, route.slug)}`, languages: { ...languages, "x-default": `${url}${pathFor("en", route.page, route.slug)}` } } } : {}), openGraph: { title, description, ...(url ? { url: `${url}${pathFor(locale, route.page, route.slug)}` } : {}) }, twitter: { title, description } };
}
function Home({ locale }: { locale: Locale }) {
  return <><Hero locale={locale} /><CredibilityStrip locale={locale} /><IntroSection locale={locale} /><WorkSection locale={locale} /><ServiceSection locale={locale} /><ProcessSection locale={locale} /><AboutSection locale={locale} /><CareerTimeline locale={locale} /><AudienceSection locale={locale} /><EngagementsSection locale={locale} /><ValuesSection locale={locale} /><FinalCTA locale={locale} /></>;
}
export default async function Page({ params }: { params: Promise<Params> }) {
  const { locale, route, project } = getRoute(await params);
  const t = getMessages(locale);
  if (project) return <CaseStudyPage project={project} locale={locale} />;
  if (route.page === "home") return <Home locale={locale} />;
  if (route.page === "services") return <><PageIntro locale={locale} eyebrow={t.nav.services} title={t.services.pageTitle} description={t.services.pageIntro} /><ServiceSection locale={locale} full /><EngagementsSection locale={locale} /><AudienceSection locale={locale} /><FinalCTA locale={locale} /></>;
  if (route.page === "work") return <><PageIntro locale={locale} eyebrow={t.nav.work} title={t.work.pageTitle} description={t.work.pageIntro} /><section className="container work-list-page"><ProjectGallery key={locale} locale={locale} filtered /></section><FinalCTA locale={locale} /></>;
  if (route.page === "about") return <><PageIntro locale={locale} eyebrow={t.nav.about} title={t.about.pageTitle} description={t.about.pageIntro} /><AboutSection locale={locale} full /><CareerTimeline locale={locale} /><EducationSection locale={locale} /><ValuesSection locale={locale} /><FinalCTA locale={locale} /></>;
  return <ContactSection locale={locale} />;
}
