import en from "../../messages/en.json";
import es from "../../messages/es.json";
export type Locale = "en" | "es";
export type Messages = typeof en;
const dictionaries: Record<Locale, Messages> = { en, es };
export const locales: Locale[] = ["en", "es"];
export function hasLocale(value: string): value is Locale { return value === "en" || value === "es"; }
export function getMessages(locale: Locale): Messages { return dictionaries[locale]; }

export type PageKey = "home" | "services" | "work" | "about" | "contact";
const segments: Record<Locale, Record<PageKey, string>> = {
  en: { home: "", services: "services", work: "work", about: "about", contact: "contact" },
  es: { home: "", services: "servicios", work: "trabajos", about: "sobre-mi", contact: "contacto" },
};
export function pathFor(locale: Locale, page: PageKey = "home", slug?: string) {
  const segment = segments[locale][page];
  return `/${locale}${segment ? `/${segment}` : ""}${slug ? `/${slug}` : ""}`;
}
export function resolvePage(locale: Locale, path: string[] = []): { page: PageKey; slug?: string } | undefined {
  if (!path.length) return { page: "home" };
  const match = Object.entries(segments[locale]).find(([key, segment]) => key !== "home" && segment === path[0]);
  if (!match) return undefined;
  if (path.length === 1) return { page: match[0] as PageKey };
  if (match[0] === "work" && path.length === 2) return { page: "work", slug: path[1] };
  return undefined;
}
export function alternatePath(pathname: string, target: Locale) {
  const parts = pathname.split("/").filter(Boolean);
  const source = parts.shift();
  if (!source || !hasLocale(source)) return pathFor(target);
  const route = resolvePage(source, parts);
  return route ? pathFor(target, route.page, route.slug) : pathFor(target);
}
