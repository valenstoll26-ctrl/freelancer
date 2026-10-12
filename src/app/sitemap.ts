import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { projects } from "@/content/projects";
import { locales, pathFor, type PageKey } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = getSiteUrl();
  if (!url) return [];
  const pages: PageKey[] = ["home", "services", "work", "about", "contact"];
  return locales.flatMap(locale => [...pages.map(page => ({ url: `${url}${pathFor(locale, page)}`, changeFrequency: "monthly" as const, priority: page === "home" ? 1 : 0.7, alternates: { languages: Object.fromEntries(locales.map(target => [target, `${url}${pathFor(target, page)}`])) } })), ...projects.map(project => ({ url: `${url}${pathFor(locale, "work", project.slug)}`, changeFrequency: "monthly" as const, priority: 0.6, alternates: { languages: Object.fromEntries(locales.map(target => [target, `${url}${pathFor(target, "work", project.slug)}`])) } }))]);
}
