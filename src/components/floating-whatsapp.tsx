"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getMessages, type Locale } from "@/lib/i18n";
import { whatsappHref } from "@/lib/whatsapp";

export function FloatingWhatsApp({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const pathname = usePathname();
  const [alternativeVisible, setAlternativeVisible] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const visible = new Set<Element>();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setAlternativeVisible(visible.size > 0);
    }, { rootMargin: "-90px 0px 0px 0px" });
    document.querySelectorAll('a[href^="https://wa.me/"]:not(.floating-whatsapp), footer').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  return <a href={whatsappHref(t.contact.whatsappMessage)} className="floating-whatsapp" hidden={alternativeVisible && !focused} aria-label={t.cta.floating} target="_blank" rel="noopener noreferrer" onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20.5 11.5a8.5 8.5 0 0 1-12.7 7.4L3 20l1.1-4.8a8.5 8.5 0 1 1 16.4-3.7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="m8 7 2 3-1 1c1 2 2 3 4 4l1-1 3 2c-1 2-3 2-5 1-3-1-5-3-6-6-1-2-1-4 1-5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg><span>WhatsApp</span></a>;
}
