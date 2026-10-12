"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getMessages, pathFor } from "@/lib/i18n";
export default function NotFound() {
  const locale = usePathname().startsWith("/es") ? "es" : "en";
  const t = getMessages(locale).notFound;
  return <section className="container page-intro"><p className="eyebrow">404</p><h1>{t.title}</h1><p className="lead">{t.description}</p><Link href={pathFor(locale)} className="button button-dark">{t.back} →</Link></section>;
}
