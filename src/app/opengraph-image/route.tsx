import { ImageResponse } from "next/og";
import { getMessages } from "@/lib/i18n";
import { profile } from "@/content/profile";
export function GET(request: Request) {
  const locale = new URL(request.url).searchParams.get("lang") === "es" ? "es" : "en";
  const t = getMessages(locale);
  return new ImageResponse(<div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", background: "#f8f6f0", color: "#282c26", padding: "64px 80px", justifyContent: "space-between" }}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 28 }}><span>Valentina Stoll.</span><span style={{ color: "#965239", fontSize: 15, maxWidth: 420 }}>{t.hero.eyebrow}</span></div><div style={{ display: "flex", flexDirection: "column", fontSize: 60, lineHeight: 1.15, letterSpacing: "-2px" }}><span>{t.hero.headline}</span><span style={{ color: "#965239" }}>{t.hero.emphasis}</span></div><div style={{ display: "flex", borderTop: "1px solid #d7d1c5", paddingTop: 24, fontSize: 20 }}>{profile.availability[locale]}</div></div>, { width: 1200, height: 630, headers: { "Cache-Control": "public, max-age=86400" } });
}
