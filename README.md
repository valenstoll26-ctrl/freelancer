# Valentina Stoll — Business Solutions & Strategic Projects

Premium bilingual portfolio using Next.js App Router, TypeScript, React, Tailwind CSS and subtle Framer Motion animation. English is the default; both languages share layouts and components. Ivory, sand, charcoal and terracotta; locally hosted Instrument Serif / DM Sans fonts; reduced-motion support.

## Development

Requires Node.js 20.9+ and npm; verified with Node 24.19 / npm 11.9.

```bash
cd /workspace/freelancer
npm ci --no-audit --no-fund --cache /workspace/.npm
npm run dev -- --port 3000
```

Each cloud task already has an isolated checkout. Use it without creating a Git worktree. Restart processes in a new task; snapshots retain files, not running servers. The onboarding interface does not expose localhost as a browser preview.

```bash
npm run lint
npm run build
npm run typecheck
npm test
npm start -- --port 3000
```

Build before testing. The 29 integration checks start an owned production server on port 3107 and stop it afterwards. They cover both languages, all 12 localized cases, redirects, 404s, contact links, translation completeness, validation, safe email drafts, sharing images and crawler endpoints. Tests never send messages. Avoid rebuilding while an older production server is serving assets.

Browser validation exercises seven project filters, language switching with case/anchor preservation, both forms, mobile navigation and Escape focus, layouts at 320/390/768/1024 pixels, and automated WCAG A/AA checks across all 22 pages. Browser tooling lives outside this checkout.

Dependency audit: `npm audit --omit=dev` reported zero production vulnerabilities. The complete audit reports five high-severity entries in the development-only Next.js ESLint glob chain, originating from the braces stack-exhaustion advisory, with no available fix in the current registry. Keep development tools restricted to trusted local source patterns and revisit dependency updates when a supported fix is available.

## Routes and editable content

| English | Spanish |
| --- | --- |
| `/en` | `/es` |
| `/en/services` | `/es/servicios` |
| `/en/work` | `/es/trabajos` |
| `/en/work/[slug]` | `/es/trabajos/[slug]` |
| `/en/about` | `/es/sobre-mi` |
| `/en/contact` | `/es/contacto` |

`/` redirects to `/en`. Previous unlocalized links redirect to English equivalents. Language switching preserves the page, case, query and anchor. Unknown locales/routes return 404.

- `content/profile.ts`: biography, education, languages, audiences and engagement models.
- `content/services.ts`: six capabilities, deliverables and family-office scope disclaimer.
- `content/projects.ts`: six bilingual cases, categories, roles, qualitative outcomes and next-project navigation. Product concepts are explicitly identified.
- `content/timeline.ts`: eight trajectory chapters without invented dates.
- `messages/en.json`, `messages/es.json`: matching UI dictionaries.
- `config/site.ts`: public contacts, image paths and actual site origin.
- `src/lib/i18n.ts`: locale and equivalent-route helpers.
- `src/components/`: shared sections, filter gallery, case layout, navigation, portrait and form.
- `src/app/globals.css`: responsive visual system.

There are no public prices, fabricated testimonials, client logos, revenue metrics or membership-growth claims. Conceptual diagrams are labeled as illustrations, not confidential screenshots. Review supplied narratives before a public production launch.

## Contact behavior

WhatsApp uses +54 351 327 1655; email, LinkedIn and Calendly use Valentina's supplied details. The bilingual form validates required fields, includes a honeypot, shows errors/preparing state and generates an encoded **email draft**. Visitors open and send it through their email application. It does not send automatically, store enquiries or claim delivery. Direct WhatsApp is available without an email application.

Automatic delivery would require a separate server endpoint and configured email provider. No such backend or secret is currently required; never expose provider credentials in public variables.

## Real portrait photos

The hero and biography intentionally use SVG monograms, not artificial portraits. To replace them:

1. Add optimized photos at `public/images/valentina-hero.jpg` and `public/images/valentina-about.jpg`.
2. Change `site.images.hero` and `site.images.about` in `config/site.ts` to `/images/valentina-hero.jpg` and `/images/valentina-about.jpg`.
3. Set `site.images.hasPortraits` to `true`; translated captions/alternative text update accordingly.

Use portrait crops with the face visible. The SVG files remain usable until photos are supplied.

## Public configuration and SEO

Copy `.env.example` to `.env.local` only when needed, preserving existing files.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Actual HTTPS origin without trailing slash; canonical URLs, hreflang, sitemap and social metadata. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public email. |
| `NEXT_PUBLIC_BOOKING_URL` | Booking URL. |
| `NEXT_PUBLIC_LINKEDIN_URL` | LinkedIn URL. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | International digits without plus sign or spaces. |

These values are public; rebuild after changes. Update `site.whatsappDisplay` too if the phone changes. Without an actual origin, no host is invented and the sitemap is empty. `VERCEL_PROJECT_PRODUCTION_URL` is a fallback. Preview deployment explicitly supplies the stable preview origin. The sitemap contains all 22 localized pages with language alternatives. Social PNGs are at `/opengraph-image?lang=en` and `?lang=es`.

## Vercel preview

Review URL: **https://valentina-stoll-preview.vercel.app**. Project: `valentina-stoll`; authorized team: `valentina-2e4e`. Vercel Authentication protection has been disabled for this public portfolio so visitors do not need an account. GitHub automatic deployments are not connected.

`vercel.json` selects Next.js, frozen installation with `npm ci` and `npm run build`. With an authenticated CLI, an authorized preview update is:

```bash
vercel deploy --yes --project valentina-stoll --scope valentina-2e4e --build-env NEXT_PUBLIC_SITE_URL=https://valentina-stoll-preview.vercel.app
vercel alias set <returned-deployment-url> valentina-stoll-preview.vercel.app --scope valentina-2e4e
```

These upload the site; do not run during environment startup. Credentials are outside the checkout and must not be committed or copied into instructions. Later tasks may need authentication again. Vercel readiness and local application checks are distinct from remote browser verification.

## Public production deployment

The project's verified production domain is https://valentina-stoll.vercel.app. Share `/es` for Spanish or `/en` for English. Deploy an authorized production update with:

```bash
vercel deploy --prod --yes --project valentina-stoll --scope valentina-2e4e --build-env NEXT_PUBLIC_SITE_URL=https://valentina-stoll.vercel.app
```

Production must be accessible without Vercel authentication before sharing. Website source is committed to the GitHub repository; automatic GitHub deployments are not configured.

Cloud environment configuration is separate from website deployment. Saving install/start instructions does not execute or publish them.
