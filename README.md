# Tabor’s Complete Comfort Mechanical

[![CI](https://github.com/bdocamponuvatoai/tccmechanical/actions/workflows/ci.yml/badge.svg)](https://github.com/bdocamponuvatoai/tccmechanical/actions/workflows/ci.yml)

Marketing site built with Next.js 16, React 19, TypeScript, Tailwind 4 (base layer only), and Lucide icons, exported as static HTML.

## Run

Requires Node.js 20.9+ (CI uses the version in `.nvmrc`).

| Command | What it does |
| --- | --- |
| `npm ci` | Install dependencies |
| `npm run dev` | Local dev server |
| `npm run build` | Generates responsive photo variants (`prebuild`), then static export to `out/` |
| `npm run icons` | Rebuilds `favicon.ico` and `apple-icon.png` from `public/icon.svg` (run after editing the SVG) |
| `npm run typecheck` | Generates Next route types (`next typegen`), then strict TypeScript check |
| `npm run audit:site` | Post-build checks on `out/`: links, assets, srcset variants, alt text, unique ids, one H1 per page |
| `npm run check` | All of the above. Run before every deploy. |

Copy `.env.example` to `.env.local` (or set the variables in your host):

- `NEXT_PUBLIC_SITE_URL`: public origin. Drives canonical URLs, Open Graph images, and the sitemap. Defaults to `https://tccmechanical.com`.
- `NEXT_PUBLIC_ALLOW_INDEXING`: `true` enables search indexing (robots meta, `robots.txt` with sitemap). Anything else keeps the site `noindex`.

## Where things live

- `content/site.ts`: all business facts (phone, email, address, founding year), navigation, services, trust badges, FAQs, and process steps. Change copy here, not in components.
- `app/`: routes. `[page]` serves services, about, process, contact, privacy, and terms. `services/[slug]` serves each service.
- `components/`: header (with dialog mobile menu), footer, sections, request form, trust badges, mobile action bar, JSON-LD helper.
- `app/globals.css`: all styling, written **mobile-first**. Base rules target 320px+ phones; `min-width` breakpoints at 480, 560, 768, 1024, and 1500px layer on larger layouts.
- `public/assets/photos/`: source photos (1536px). `scripts/images.mjs` writes the `-640`/`-960` variants and `image-loader.ts` maps `next/image` srcsets to them.
- `public/assets/badges/`: trust badges (see `docs/ASSET-PROVENANCE.md`).
- `public/_headers`: security and cache headers for hosts that support the `_headers` format.

## Contact behavior

The request form prepares an email in the visitor’s mail application. It does not send server-side, store inquiries, or confirm bookings. Call and email links work without JavaScript. Direct delivery requires a verified sending domain and provider configuration. Never change the form to claim success without provider acknowledgement.

## Content rules

Claims shown on the site (5-star Google rating, 24/7 emergency service, 21+ years / founded 2005, EPA, ASHRAE, NATE) are taken from the business’s own website, https://tccmechanical.com/, reviewed October 2026. Re-confirm them with the owner before launch and whenever they change. In particular, the “21+ years” badge will need updating as the years pass. Do not add ratings, review counts, pricing, or credentials that the business has not published.

## Pre-launch checklist

1. Owner approves copy, badges, and legal pages. Privacy and terms are still marked drafts and are `noindex`.
2. Set `NEXT_PUBLIC_SITE_URL` to the production domain.
3. Set `NEXT_PUBLIC_ALLOW_INDEXING=true`.
4. `npm run check`, then deploy `out/`.
5. Run Lighthouse and axe on the deployed URL, and test on a real iOS and Android device.
