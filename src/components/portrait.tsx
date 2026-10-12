import Image from "next/image";
import { site } from "@/config/site";
import { getMessages, type Locale } from "@/lib/i18n";

export function Portrait({ locale, variant = "about" }: { locale: Locale; variant?: "hero" | "about" }) {
  const t = getMessages(locale);
  return <div className={`portrait-frame portrait-${variant}`}><Image src={site.images[variant]} alt={site.images.hasPortraits ? t.about.portraitAlt : ""} width={600} height={750} priority={variant === "hero"} /><span className="portrait-caption">{site.images.hasPortraits ? site.name : t.about.portrait}</span></div>;
}
