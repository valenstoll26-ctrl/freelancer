import Image from "next/image";
import { site } from "@/config/site";
import { getMessages, type Locale } from "@/lib/i18n";

export function Portrait({ locale, variant = "about" }: { locale: Locale; variant?: "hero" | "about" }) {
  const t = getMessages(locale);
  return <div className={`portrait-frame portrait-${variant}${site.images.hasPortraits ? " portrait-photo" : ""}`}><Image src={site.images[variant]} alt={site.images.hasPortraits ? t.about.portraitAlt : ""} width={1066} height={1600} sizes={variant === "hero" ? "(max-width: 700px) 90vw, (max-width: 1100px) 40vw, 450px" : "(max-width: 700px) 90vw, 45vw"} priority={variant === "hero"} /><span className="portrait-caption">{site.images.hasPortraits ? site.name : t.about.portrait}</span></div>;
}
