import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "../globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/sections";
import { RevealObserver } from "@/components/reveal";
import { locales, hasLocale, getMessages } from "@/lib/i18n";
import { site } from "@/config/site";
import { getSiteUrl } from "@/lib/site-url";

export const dynamicParams = false;
export function generateStaticParams() { return locales.map(locale => ({ locale })); }
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const t = getMessages(locale);
  const url = getSiteUrl();
  return { ...(url ? { metadataBase: new URL(url) } : {}), title: t.seo.title, description: t.seo.description, keywords: site.keywords, authors: [{ name: site.name }], icons: { icon: "/icon.svg" }, robots: { index: true, follow: true }, openGraph: { type: "website", locale: locale === "en" ? "en_US" : "es_AR", alternateLocale: locale === "en" ? "es_AR" : "en_US", siteName: site.name, title: t.seo.title, description: t.seo.description, ...(url ? { images: [{ url: `${url}/opengraph-image?lang=${locale}`, width: 1200, height: 630 }] } : {}) }, twitter: { card: "summary_large_image", title: t.seo.title, description: t.seo.description, ...(url ? { images: [`${url}/opengraph-image?lang=${locale}`] } : {}) } };
}
export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  return <html lang={locale}><body id="top"><a href="#main" className="skip-link">{getMessages(locale).nav.skip}</a><Header locale={locale} /><main id="main">{children}</main><Footer locale={locale} /><RevealObserver /></body></html>;
}
