"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/config/site";
import { getMessages, pathFor, type Locale, type PageKey } from "@/lib/i18n";
import { LanguageSwitcher } from "./language-switcher";
import { Arrow } from "./ui";

export function Header({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const t = getMessages(locale);
  useEffect(() => { const close = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); } }; window.addEventListener("keydown", close); return () => window.removeEventListener("keydown", close); }, []);
  return <header className="header"><div className="container header-inner"><Link href={pathFor(locale)} className="wordmark" onClick={() => setOpen(false)}>{site.name}<span className="brand-dot">.</span></Link><div className="header-mobile-actions"><LanguageSwitcher locale={locale} /><button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? t.nav.closeMenu : t.nav.openMenu} onClick={() => setOpen(!open)}><span>{open ? t.nav.close : t.nav.menu}</span><span aria-hidden="true">{open ? "−" : "+"}</span></button></div><nav id="main-navigation" aria-label={t.nav.label} className={`navigation ${open ? "is-open" : ""}`}>{(["services", "work", "about", "contact"] as PageKey[]).map(page => <Link href={pathFor(locale, page)} key={page} aria-current={pathname === pathFor(locale, page) ? "page" : undefined} onClick={() => setOpen(false)}>{t.nav[page as "services" | "work" | "about" | "contact"]}</Link>)}<div className="desktop-language"><LanguageSwitcher locale={locale} /></div><Link href={pathFor(locale, "contact")} className="button button-outline nav-booking" onClick={() => setOpen(false)}>{t.nav.talk}<Arrow /></Link></nav></div></header>;
}
