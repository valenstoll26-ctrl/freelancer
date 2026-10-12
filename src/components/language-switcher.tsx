"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { alternatePath, getMessages, type Locale } from "@/lib/i18n";

function subscribe(callback: () => void) {
  window.addEventListener("hashchange", callback);
  window.addEventListener("popstate", callback);
  return () => { window.removeEventListener("hashchange", callback); window.removeEventListener("popstate", callback); };
}
function getSuffix() { return window.location.search + window.location.hash; }
export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const suffix = useSyncExternalStore(subscribe, getSuffix, () => "");
  return <nav className="language-switcher" aria-label={getMessages(locale).nav.language}>{(["en", "es"] as const).map((target, index) => <span key={target}>{index > 0 && <span className="language-divider" aria-hidden="true">/</span>}<Link href={alternatePath(pathname, target) + suffix} lang={target} hrefLang={target} aria-label={getMessages(target).nav.switchTo} aria-current={target === locale ? "page" : undefined}>{target.toUpperCase()}</Link></span>)}</nav>;
}
