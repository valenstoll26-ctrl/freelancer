import "./globals.css";
import "@fontsource/instrument-serif/400.css";
import Link from "next/link";
export default function GlobalNotFound() {
  return <html lang="en"><body><main className="container page-intro"><p className="eyebrow">404</p><h1>Page not found.</h1><p className="lead" lang="es">No encontramos esta página.</p><div className="hero-actions"><Link href="/en" className="button button-dark">English →</Link><Link href="/es" className="button button-outline" lang="es">Español →</Link></div></main></body></html>;
}
