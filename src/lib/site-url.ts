import { site } from "@/config/site";
export function getSiteUrl() {
  const value = site.url;
  if (!value) return undefined;
  try { const url = new URL(value); return ["https:", "http:"].includes(url.protocol) ? url.origin : undefined; } catch { return undefined; }
}
