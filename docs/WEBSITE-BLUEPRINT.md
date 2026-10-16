# Website Blueprint — Digital-Experience Marketing Site

A reusable master prompt and build spec for premium, animated, production-ready marketing sites in
**any industry**. Proven on The Brand Powerhouse build (Next.js 16 · React 19 · Tailwind 4 ·
Vercel).

---

## How to use this file

1. Copy this whole file into the new project (for example `docs/BLUEPRINT.md`).
2. Fill in **Part 1 — Project brief** (everything in `{{double braces}}`). Leave nothing invented:
   if a fact is unknown, write `NONE`.
3. Paste the entire file into your AI coding agent with this opening line:

   > You are a senior full-stack engineer, UI/UX designer and motion designer. Build the website
   > described below exactly to this blueprint. Follow every rule in Parts 2–14. Ask me only about
   > decisions the brief leaves open. Work in phases (Part 15) and run the checks after each one.

4. Generate imagery with **Part 10** prompts, drop the files in `assets-src/`, and run
   `npm run media`.
5. Ship with **Part 13** (GitHub + Vercel) and sign off with **Part 14**.

---

## Part 1 — Project brief (fill this in)

```yaml
brand:
  name: '{{BRAND_NAME}}' # exact legal/display name
  tagline: '{{TAGLINE}}' # e.g. "Known. Trusted. Chosen."
  one_line_description: '{{DESCRIPTION}}' # also the default meta description (50–160 chars)
  industry: '{{INDUSTRY}}' # e.g. dental clinic, solar installer, law firm, SaaS
  audience: '{{WHO_BUYS}}' # who the site must convince
  location: '{{CITY_REGION_OR_NONE}}' # drives LocalBusiness schema if set
  email: '{{CONTACT_EMAIL}}'
  phone: '{{PHONE_OR_NONE}}'
  production_url: 'https://{{DOMAIN}}'

voice:
  tone: '{{e.g. confident, warm, clinical, playful}}'
  banned_words: [revolutionary, cutting-edge, synergy, game-changing, unleash, elevate]
  exclamation_marks: false

calls_to_action:
  primary: '{{e.g. Book a Consultation}}' # links to /contact or #contact
  secondary: '{{e.g. Explore Services}}'
  form_submit: '{{e.g. Send Inquiry}}'

navigation: [Home, About, Services, Process, Contact] # adjust labels, keep ≤ 6

offerings: # 3–5 pillars; each becomes /services/<id>
  - id: '{{kebab-id}}'
    name: '{{Name}}'
    promise: '{{one sentence outcome}}'
    capabilities: ['{{cap 1}}', '{{cap 2}}', '{{cap 3}}']
    connection: '{{how this pillar connects to the others}}'

process: # 3–5 steps; the "Method"
  - title: '{{Step}}'
    body: '{{one or two sentences}}'
    detail: '{{extra line shown only on /process}}'

faq: # 5–8 real questions with real answers
  - q: '{{question}}'
    a: '{{answer}}'

problem_statement: # the tension the brand resolves (Problem section)
  headline: '{{e.g. Most brands blend in.}}'
  three_beats: ['{{beat 1}}', '{{beat 2}}', '{{beat 3}}']
  consequence: '{{one paragraph}}'

proof_available: # ONLY real, verifiable items — otherwise NONE
  stats: NONE
  client_logos: NONE
  testimonials: NONE
  awards: NONE
  case_studies: NONE

palette_preference: '{{e.g. matte black + electric accent / or ask me}}'
legal_pages: '{{draft templates until counsel supplies copy | final copy attached}}'
```

---

## Part 2 — Non-negotiable rules

**Honesty**

- Use brief copy **verbatim**. Never invent statistics, clients, logos, testimonials, ratings,
  awards, press, team members, years in business or locations.
- If a template has stats rows, logo walls, testimonial or case-study blocks and the brief says
  `NONE`, **remove the section** — never fill it with placeholders.
- Imagery shows anonymous people and scenes: no real brands, logos, readable text or celebrities.
- Legal pages stay `noindex` drafts, clearly marked, until counsel supplies copy.

**Quality bar** (all must hold before anything ships)

- Zero axe WCAG 2.2 AA violations on every page, in every palette.
- No horizontal scroll from 320 px to 1920 px. Touch targets ≥ 44 px.
- Works in current Chrome, Firefox and Safari (desktop + iOS). No console errors.
- Fully usable without JavaScript (content, navigation, contact form).
- Respects `prefers-reduced-motion`: everything shows in its final state.
- Lighthouse Accessibility, Best Practices and SEO = 100; Performance ≥ 90 desktop; CLS = 0.
- Never report form success unless the email provider confirmed delivery.

**Design taste rules** (learned the hard way — clients call these "AI-looking")

- No radial glows, coloured drop-shadow glows, gradient blobs or highlighter bands behind text.
- No decorative underlines on standalone links (arrows instead); inline text links keep a plain
  underline.
- Hierarchy comes from **solid colour blocking**, type scale and whitespace — not effects.
- One accent colour, used sparingly (≈10%): primary buttons, active states, numerals, one
  full-colour section.

---

## Part 3 — Tech stack (exact)

| Layer      | Choice                                                                    | Why                                                                               |
| ---------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Framework  | **Next.js 16** (App Router, Turbopack)                                    | Static generation, server actions, metadata API, `next/image`, `<ViewTransition>` |
| UI         | **React 19**, TypeScript **strict**                                       | No `any`, no `@ts-ignore`                                                         |
| Styling    | **Tailwind CSS 4** (`@theme` tokens in `app/globals.css`)                 | Semantic tokens, no config file                                                   |
| Icons      | **lucide-react**                                                          | One consistent thin-line family                                                   |
| Fonts      | `next/font/google` (self-hosted)                                          | One display serif/sans + one body sans                                            |
| Validation | **zod**                                                                   | Shared by client step-checks and server                                           |
| Email      | **Resend**                                                                | Delivery confirmation = success signal                                            |
| Rate limit | **@upstash/ratelimit** + **@upstash/redis**                               | 5/hour/IP sliding window; accept `UPSTASH_*` or `KV_REST_API_*` env names         |
| Analytics  | **@vercel/analytics**                                                     | Production only                                                                   |
| Images     | `next/image` + **sharp** (dev)                                            | Store WebP only; Next serves AVIF/WebP                                            |
| Tests      | Node `node:test` (unit) · **Playwright** + **@axe-core/playwright** (e2e) | 3 engines + 2 phone profiles                                                      |
| Quality    | ESLint (`eslint-config-next`) · **Prettier** · `tsc`                      | Enforced in CI                                                                    |
| Hosting    | **Vercel** via GitHub integration                                         | Preview per PR, production on `main`                                              |
| Animation  | **CSS only** — no GSAP / Framer Motion                                    | Zero JS cost, nothing hidden before hydration                                     |

`package.json` scripts:

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint .",
  "typecheck": "tsc --noEmit",
  "test:unit": "node --import tsx --test tests/unit/*.test.ts",
  "test:e2e": "playwright test",
  "format": "prettier --write .",
  "format:check": "prettier --check .",
  "check": "npm run format:check && npm run lint && npm run typecheck && npm run test:unit && npm run build && npm run test:e2e",
  "media": "node scripts/media.mjs",
  "icons": "node scripts/icons.mjs"
}
```

`"engines": { "node": ">=20.9.0" }` — Node 24 recommended.

---

## Part 4 — Project structure

```
app/
  layout.tsx            Shell: head scripts, Intro, Header, <main>, Footer, BackToTop, JSON-LD, Analytics
  template.tsx          Page transitions (<ViewTransition enter/exit>)
  page.tsx              Home
  about/ services/ services/[id]/ process/ contact/ privacy/ terms/
  not-found.tsx         Real 404
  actions/inquiry.ts    Server action (thin adapter over lib/inquiry-service)
  globals.css           Tokens, palettes, themes, components, all motion
  sitemap.ts robots.ts manifest.ts llms.txt/route.ts opengraph-image.tsx
  icon.png icon1.png apple-icon.png
components/
  ui.tsx                Primitives: Eyebrow, Accent, Button, Arrow, Photo, Logo, Tags, Container, Breadcrumbs
  layout/               Header (glass pill + <dialog> menu), Footer (marquee + wordmark), Intro
  sections/             Hero, Problem, OneRoof, ServicesShowcase, Method, Feature, Faq, Inquiry, PageIntro, Legal
  BackToTop.tsx HoverPreview.tsx CapabilityIcon.tsx PaletteSwitcher.tsx
  seo/JsonLd.tsx
content/                ALL copy and data (site, offerings, process, faq, assets, palettes)
lib/                    schema.ts, inquiry-service.ts (gateway), ratelimit.ts, seo.ts, form-values.ts
public/assets/          Web images (WebP) + logo masks
assets-src/             Full-res originals + retouched masters (not served)
scripts/                media.mjs (photo/video prep), icons.mjs (favicons from logo)
tests/unit/ tests/e2e/  Unit + Playwright
docs/                   DEPLOYMENT.md, asset-prompts.md, video-prompts.md
.github/workflows/ci.yml
```

Rule: **components never contain copy that lives in `content/`.** Changing a word never means
touching a component.

---

## Part 5 — Design system

### 5.1 Semantic colour tokens

Never use raw colours in components. Define CSS variables per palette and map them to Tailwind:

| Token                    | Role                                                                     |
| ------------------------ | ------------------------------------------------------------------------ |
| `fg` / `bg`              | Primary text / page background                                           |
| `surface` / `surface-2`  | Cards / secondary panels                                                 |
| `ink` / `muted`          | Body text / secondary text (≥ 4.5:1)                                     |
| `line`                   | Hairlines                                                                |
| `accent` / `accent-soft` | Accent text on the current surface (≥ 4.5:1 small, ≥ 3:1 display)        |
| `pop` / `pop-fg`         | Signature colour for buttons/active states, and the text that sits on it |
| `deco` / `deco-bright`   | Decorative strokes only (no text)                                        |
| `block` / `on-block`     | The one full-colour section and its text                                 |
| `danger`                 | Form errors (≥ 4.5:1)                                                    |

**Themes** flip the same tokens:

- `:root` — light sections.
- `.theme-dark` — dark sections (redefines every token).
- `.theme-block` — one solid accent section per page (`bg = block`, text = `on-block`).

**Palette structure** that clients love (offer 5 for the client to choose live via
`?palette=<id>`): matte near-black + dirty white + **one electric accent**. Examples:
lime `#D4E82A`, signal orange `#FF5B1F`, cobalt `#2F5BFF`, solar yellow `#FFC21A`,
aqua `#3CF0C8`. For each accent derive a deep variant for small text on light (e.g. lime → olive
`#56660A`) and verify contrast. Remove the switcher and unused palettes before launch.

**Section rhythm**: alternate dark/light down the page and place exactly one `.theme-block`
section. Never put two sections of the same tone back-to-back.

### 5.2 Typography

- Display: a high-contrast serif (e.g. Cormorant Garamond) or a strong grotesk — pick per industry.
- Body: a clean geometric/humanist sans (e.g. Outfit, Inter).
- Display sizes fluid: `clamp(2.5rem, 7.2vw, 6.75rem)` for hero, `2.5rem → 4.1rem` for H2.
- Eyebrow: hairline + 10–11 px uppercase, tracking `0.42em`, accent colour.
- Accent phrase in headings: italic, accent colour. No background highlight.

### 5.3 Surfaces

- **Cards (Apple-style)**: radius 1.75–2 rem; hairline ring (`fg` 8%), soft neutral depth
  (`0 18px 40px -22px rgb(0 0 0/.22)`); on dark: white 8% ring + faint inset top highlight.
  Interactive cards lift 4 px and zoom their photo to 1.035 on hover (fine pointers only).
- **Photos**: always an inner 1 px hairline (`::after` inset shadow) so light photos never bleed
  into light backgrounds.
- **Glass header**: `bg` at 70% + `backdrop-filter: blur(24px) saturate(180%)`, white 10% hairline,
  inset top highlight; opaque fallback without `backdrop-filter`. Verify contrast over every
  section colour it can float over.

### 5.4 Buttons and links

- Primary: `pop` fill, `pop-fg` text, pill, ≥ 48 px tall, uppercase 11 px tracked.
- Outline: hairline, inverts on hover.
- Arrow "hop" micro-interaction on every arrow: on hover/focus the arrow slips out one side and
  back in from the other (CSS keyframes, reduced-motion off).

### 5.5 Icons

- One family (lucide), stroke 1.5. Each capability gets a **meaning-matched** glyph via a typed map
  (`Record<Capability, Icon>`) so a missing icon fails the build.
- Icons sit in ringed circles; they **draw on** (stroke-dasharray) when scrolled into view and
  redraw on hover.
- No brand logos as icons (LinkedIn → generic network glyph).

---

## Part 6 — Page architecture and section library

Reorder and rename freely per industry; keep the **behaviours**.

### Home `/`

1. **Hero** — eyebrow, 3-line display H1 with italic accent words, supporting paragraph,
   primary + secondary CTA, full-bleed art-directed photo (`getImageProps` + `<picture>` for
   desktop/mobile crops), rotating text badge with monogram, foot line + "Discover ↓" anchor.
   - Motion: CSS entrance (lines rise, staggered); headline lines drift apart with scroll; photo
     frame opens from inset to full on scroll.
2. **Discipline panels** — one panel per offering. Desktop: the hovered/focused panel widens,
   its photo wipes up under a scrim, capabilities slide in; first panel open by default.
   Phones: stacked rows with a 4:3 thumbnail and capabilities listed.
3. **Problem** (`.theme-block`) — huge headline with the accent line wiping in; three dark cards
   for the three beats, each with a line icon that draws on. Desktop only: cards drift apart and
   tilt slightly as the section scrolls (the "gaps" open). **Phones: straight stack, no drift.**
4. **Connection diagram** ("One roof") — three outlined circles converge on scroll; at the merge
   they snap into mixed surfaces (solid accent, solid dark, fine hatch) with a dark outlined core
   and UI pill labels; a slow dashed orbit ring with a travelling accent point. Sticky diagram
   beside numbered statements on desktop. Plus one wide photo at its native ratio.
5. **Services showcase** — pill filter + native `<details name="services">` accordion (exclusive,
   keyboard, no-JS). Row: outlined numeral that fills when open, name glides on hover, capability
   preview; open row shows photo (native 4:3) + content card (promise, icon chips, "Discover X").
   Cursor-following hover photo preview on closed rows (fine pointer only). Smooth open via
   `interpolate-size` + `::details-content`.
6. **Process / Method** — stacking cards: each card pins (`sticky`, top offset grows per card),
   rises and scales into place on arrival, the card beneath **recedes** as the next covers it
   (`timeline-scope` + per-card `view-timeline-name`), outlined numeral fills, four-segment
   progress bar, photo settles. Phones: plain stack.
7. **Feature** (e.g. founder / signature service) — dark section, portrait wipes up, list with
   meaning-matched icons.
8. **FAQ** — numbered native `<details>`, smooth open, FAQPage JSON-LD, answers `data-speakable`.
9. **Inquiry** — dark band; sticky heading left, form card right (Part 8).

### Inner pages

- **PageIntro**: breadcrumb (visible + BreadcrumbList JSON-LD), eyebrow, H1 with accent line
  wiping in, lead, optional CTA, hairline drawing across on load.
- **Service detail** `/services/<id>` (static, `dynamicParams = false` → real 404s): intro,
  photo + capability list with icons, "connected" cards to the other offerings, inquiry.
- **About**, **Process** (Method with detail lines), **Contact** (inquiry as H1 + FAQ),
  **Privacy/Terms** (draft templates, `noindex`), **404** with a witty line + two links.

### Global chrome

- **Opening intro**: accent field, monogram fills from the bottom, hairline loads, field wipes
  upward (~2 s, CSS only, once per session via `sessionStorage`, skipped for reduced motion,
  page renders underneath so LCP is unaffected).
- **Header**: glass pill; desktop nav with frosted active pill; primary CTA; mobile "Menu" opens a
  native `<dialog>` (focus trap, Escape, focus returns): curtain-down, staggered links with fluid
  type, current-page dot, offering quick links, full-width CTA, email + tagline, safe-area
  padding. Lock scroll on **`<html>`** (not body) and set `scrollbar-gutter: stable`.
  `<noscript>` nav fallback.
- **Reading progress** hairline (accent) driven by `scroll(root)`.
- **Back-to-top** button: appears after one viewport, ring fills with reading progress, smooth
  scroll + focus to `#main`, 44–56 px.
- **Footer**: two opposing marquee rows (offerings solid/italic, tagline outlined) with monogram
  separators, scroll-linked drift, hover pause, edge fade mask; stacked logo, tagline, email,
  link columns; giant outlined wordmark that **fills with the accent as the page ends**.

---

## Part 7 — Motion system (CSS only)

Principles

- Everything renders in its **final state by default**. Motion is layered on only inside
  `@media (prefers-reduced-motion: no-preference)` and, for scroll-driven effects,
  `@supports (animation-timeline: view())`. Firefox therefore shows the finished static design.
- **Never fade text** (no text opacity animation). Move it, clip it, or swap it in one step
  (`step-end` + `visibility`) so contrast holds on every frame.
- Use `translate`/`scale`/`rotate` **properties** for scroll effects so they compose with
  `transform` entrance animations on the same element.
- Above-the-fold entrance is time-based CSS (no waiting for JS).

Toolkit (keyframes to define once)

| Effect           | Technique                                                                                                                                                            |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Section reveal   | `[data-reveal] { animation: rise linear both; animation-timeline: view(); animation-range: entry 0% entry 60% }`                                                     |
| Accent line wipe | `clip-path: inset(0 100% 0 0)` → none on `view()`                                                                                                                    |
| Photo unveil     | `.wipe-up` clip from bottom + inner `img` settle (`scale 1.12 → 1`)                                                                                                  |
| Parallax         | `.parallax img { scale: 1.06 }` + translateY ±2.5% on `view()`                                                                                                       |
| Pinned stacking  | `position: sticky` + `timeline-scope` on the list + `view-timeline-name` per item                                                                                    |
| Page transitions | `app/template.tsx` with React `<ViewTransition enter exit default="none">`; header anchored via `view-transition-name`; `::view-transition { pointer-events: none }` |
| Icon draw-on     | `stroke-dasharray: 100` + dashoffset 100 → 0                                                                                                                         |
| Marquee          | two copies, `translateX(-50%)` loop; `animation-direction: reverse` for row 2                                                                                        |
| Accordion        | `interpolate-size: allow-keywords` + `::details-content` block-size transition                                                                                       |

Critical gotchas

- **`overflow: hidden` creates a scroll container and freezes every scroll-driven animation inside
  it.** Use `overflow: clip` (Tailwind `overflow-clip`) everywhere.
- A `view()` timeline on a **sticky** element stops progressing while it is stuck — drive covered
  cards from the _next_ card's timeline via `timeline-scope`.
- Any effect that moves cards sideways must be **desktop-only** when the layout stacks on phones.
- Test motion with `behavior: 'instant'` scrolling; smooth scroll makes screenshots lie.

---

## Part 8 — Inquiry form (production pattern)

- 3 steps with progress ("Step X of 3" announced), Continue/Back, final Submit showing
  "Sending…". Without JS: one long form, native `required`, still submits (server action).
- Render step 1 and the progress bar on the server and gate the no-JS layout with an
  `html.js` class (with a 4 s hydration fallback) → **CLS 0** on the contact page.
- Fields: name, email, company, interests (checkboxes from offerings), message (20–3000),
  honeypot `website` (off-screen, `aria-hidden`, `tabindex=-1`).
- One **zod** schema shared by client step validation and server. Errors via `aria-describedby`
  - `aria-invalid`; notice "Please check the highlighted fields."; focus the first invalid field;
    server errors return to the right step with values kept.
- **Gateway pattern** for testability:

  ```ts
  type InquiryGateway = { configured(): boolean; allowed(): Promise<boolean>; send(i: Inquiry): Promise<boolean> };
  ```

  `processInquiry(formData, gateway)` → honeypot → validate → configured? → rate-limit → send →
  success **only if the provider returned an id**. Every failure fails closed with a specific,
  honest message (not configured / too many / could not send).

- Rate key: `x-vercel-forwarded-for` on Vercel, fixed key locally.
- Unit tests (offline): success requires acknowledgment; validation blocks provider; honeypot never
  reaches provider; unconfigured fails honestly; 6th request refused; provider rejection keeps
  input; limiter outage fails closed; unknown values rejected.

---

## Part 9 — SEO, AEO and GEO

- `metadataBase`, title template `%s | {{BRAND_NAME}}`, unique title (≤ 65) and description
  (50–170) per page, canonical, Open Graph (restate the share image on every page), Twitter
  `summary_large_image`, `formatDetection` off, `lang`, `viewport-fit=cover`.
- Generated **share image** `/opengraph-image` (1200×630, static TTF fonts — the OG renderer can't
  read variable fonts).
- JSON-LD (escape `<`): Organization (+ contactPoint, knowsAbout, OfferCatalog) and WebSite on
  every page; WebPage subtype per page (AboutPage/ContactPage/CollectionPage) with
  `speakable` (`[data-speakable]`); Service per offering; BreadcrumbList on inner pages; FAQPage
  where FAQ renders; HowTo for the process. Add **LocalBusiness** if a location exists.
- `sitemap.xml` (indexable pages, lastModified), `robots.txt` (welcome Google, Bing, GPTBot,
  OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Applebot-Extended; **disallow all on
  Vercel preview deployments**), `manifest.webmanifest` (+ maskable icon), `/llms.txt` generated
  from the same content files.
- One H1 per page, ordered headings, descriptive link text, alt text on every meaningful image.

---

## Part 10 — Imagery and video

### Photo style guide (paste first into the image model)

```
You are art-directing a photo series for "{{BRAND_NAME}}", a {{INDUSTRY}} business. The website
uses {{DARK_COLOUR}}, {{LIGHT_COLOUR}} and one accent {{ACCENT_NAME}} ({{ACCENT_HEX}}). Every
image in this chat must follow these rules:

LOOK: Real documentary photography of {{REAL_SETTING, e.g. a working clinic / job site / studio}}.
Candid, mid-action, never posed. 35mm full-frame, 35 or 50mm lens, f/2.8–f/4. Natural daylight or
one direct flash. True-to-life colour, slightly muted, fine film grain. Lived-in details.

PALETTE: Mostly neutral. Exactly ONE small {{ACCENT_NAME}} object in every frame. No other
saturated colours.

PEOPLE: Diverse adults, simple modern clothing, always anonymous (from behind, cropped, hands,
faces turned away or out of focus). Natural skin texture.

STRICTLY AVOID: readable text, letters, numbers, logos, brand names, watermarks; gold/brass/velvet
luxury clichés; teal-orange grading; rim light or glows; lens flares; HDR; plastic skin; floating
objects; neon; sci-fi; stock smiles or handshakes.

OUTPUT: Photorealistic, no borders or captions. Leave negative space where asked. Reply "Ready".
```

### Shot list template (one prompt each, same chat)

| File key                   | Placement                                            | Ratio      |
| -------------------------- | ---------------------------------------------------- | ---------- |
| `h1-desktop` / `h1-mobile` | Hero (art-directed)                                  | 16:9 / 3:4 |
| `s{n}-{offering}`          | Accordion row + service page                         | 4:3        |
| `e1-feature`               | Feature section portrait                             | 4:5        |
| `m{n}-{step}`              | Method cards                                         | 1:1        |
| `w1-wide`                  | Connection section wide                              | 16:10      |
| `og`                       | Share-image background (dark, left two-thirds empty) | 1.91:1     |
| optional `p-{page}`        | Inner-page banners                                   | 21:9       |

### Pipeline rules

- Save originals as `assets-src/<name>.original.png`; retouch (remove stray logos/text) into
  `assets-src/<name>.png`; run `npm run media -- photo <name>` → WebP + size + blur placeholder;
  paste into `content/assets.ts` with **new alt text describing the actual photo**.
- **Every frame's aspect ratio must equal its photo's ratio** — audit with a script that compares
  rendered box ratio vs `naturalWidth/naturalHeight` (tolerance 2%).
- Video: generate **image-to-video from the site's own photos** (Sora / Flow "Frames to Video")
  so it matches; `npm run media -- video <name>` builds a seamless cross-dissolve loop
  (webm + mp4 + poster, no audio, ~1 MB). Player: lazy, plays only on screen, pause button,
  poster for reduced motion. Never ship a text-to-video clip that shows a different scene.

### Favicons

`scripts/icons.mjs` builds from the master logo: 512 rounded tile, 32 px tight crop, 180
apple-touch (full bleed), 512 maskable (safe zone) — monogram in the accent on the dark colour.

---

## Part 11 — Accessibility and performance

- Skip link, visible focus (`:focus-visible` outline), landmarks, `aria-current="page"`,
  `<dialog>` menu, native `<details>` accordions, decorative elements `aria-hidden`.
- Contrast verified per palette, including over glass and inside animations.
- `next/image` everywhere (hero via `getImageProps` with `fetchPriority="high"`), blur placeholders,
  explicit sizes → CLS 0.
- Fonts via `next/font` (no layout shift). Only one client-side animation-free JS island per
  interaction (header, accordion, form, back-to-top, hover preview).
- Security headers in `next.config.ts`: CSP (static-friendly), HSTS, X-Frame-Options DENY,
  nosniff, Referrer-Policy, Permissions-Policy. `poweredByHeader: false`.

---

## Part 12 — Testing and CI

- **Unit** (`tests/unit`): inquiry service with a fake gateway (Part 8 list).
- **E2E** (`tests/e2e`, Playwright projects: chromium, firefox, webkit, Pixel 7, iPhone 14):
  every route → 200, one H1, no console errors, no horizontal scroll; axe WCAG 2.2 AA (Chromium,
  desktop + phone; skip via `test.skip(({ browserName }) => …)` so other engines never open a
  page); real 404s; form steps, focus, honest failure; no-JS submission.
- Config: `timeout: 60_000`, `workers: CI ? 2 : undefined`, `retries: CI ? 1 : 0`,
  `webServer: npm run start -- -p 3210`.
- **CI** (`.github/workflows/ci.yml` on push + PR): `npm ci` → format:check → lint → typecheck →
  unit → build (with `NEXT_PUBLIC_SITE_URL`) → `npx playwright install --with-deps` → e2e →
  upload report on failure. Concurrency group cancels superseded runs.
- Extra audits worth scripting: palette × page axe matrix, 3-engine × 3-viewport overflow and
  touch-target sweep, photo-crop ratio audit, Lighthouse mobile/desktop.

---

## Part 13 — GitHub + Vercel deployment

1. `.gitignore` (node_modules, .next, .env*, !.env.example, test-results, playwright-report) and
   `.gitattributes` (`* text=auto eol=lf`, binaries marked).
2. Pre-push: clean tree, **secret scan of the full history**, only `.env.example` tracked, no file
   > 50 MB.
3. `git remote add origin <url>` → `git push -u origin main` (Git Credential Manager opens the
   browser sign-in once).
4. Vercel → Import project → Next.js auto-detected → env vars:
   `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `INQUIRY_FROM_EMAIL`, `INQUIRY_TO_EMAIL`,
   `UPSTASH_REDIS_REST_URL`/`_TOKEN` (or Marketplace `KV_REST_API_URL`/`_TOKEN`).
5. Domain + DNS; Resend domain verification (SPF/DKIM); Search Console + sitemap; Web Analytics on.
6. Branch protection/rulesets on `main` (require PR + `check` status, block force pushes) —
   **requires GitHub Pro/Team for private repos**; otherwise rely on CI + Vercel rollback.
7. Every push to `main` deploys production; every PR gets a noindexed preview. Roll back with
   "Promote to Production" on any earlier deployment.

Write `README.md` (quick start, scripts, structure, content editing, design system, motion table,
media pipeline, form, SEO, quality bar) and `docs/DEPLOYMENT.md` (the steps above + pre-launch
checklist + environment behaviour table).

---

## Part 14 — Acceptance checklist

- [ ] All brief copy verbatim; nothing invented; proof sections removed where `NONE`.
- [ ] All routes exist and are static; unknown routes return 404.
- [ ] One palette chosen; switcher and unused palettes removed; icons and OG colours match.
- [ ] Section rhythm alternates; one solid accent block; no glows/highlighters.
- [ ] Every photo uncropped at its native ratio; all alt text describes the real image.
- [ ] Motion: final state without JS, reduced-motion and Firefox; no text fades; nothing moves
      sideways on phones.
- [ ] Header glass readable over every section; mobile menu passes 320 px → tablet, landscape,
      focus trap, Escape, single scrollbar.
- [ ] Form: works with and without JS; never false success; rate-limited; tests green.
- [ ] SEO/AEO/GEO files and JSON-LD validate; previews blocked from indexing.
- [ ] `npm run check` green locally and in CI; Lighthouse A11y/BP/SEO 100, CLS 0.
- [ ] Legal pages marked draft or replaced with counsel copy.
- [ ] Deployed on Vercel with env vars; production form test email received.

---

## Part 15 — Build phases for the agent

1. **Foundation** — scaffold Next 16 + TS strict + Tailwind 4 + Prettier/ESLint; tokens, themes,
   palettes; `content/` from the brief; layout shell (header, footer, skip link).
2. **Pages & sections** — all routes and sections from Part 6 with placeholder-free copy;
   metadata + JSON-LD; sitemap/robots/manifest/llms.txt/OG.
3. **Form** — schema, gateway service + unit tests, server action, 3-step client with no-JS path.
4. **Motion** — Part 7 effects, then the reduced-motion and Firefox pass.
5. **Imagery** — generate via Part 10, run the media pipeline, crop audit.
6. **Hardening** — e2e suite, CI, Lighthouse, 3-engine responsive sweep, security headers.
7. **Ship** — README + DEPLOYMENT, push, Vercel, pre-launch checklist.

After each phase run: `npm run format:check && npm run lint && npm run typecheck && npm run build`
(and the e2e suite from phase 6 on). Report results honestly, including failures.
