# Earth Logistics Inc — Freight Brokerage Website

A conversion-focused, SEO-optimized, enterprise-grade marketing site for **Earth Logistics Inc** — a DOT-authorized asset-based freight broker headquartered in Saint John, Indiana.

> **Tagline:** Revolving Freight Globally 24/7
> **Phone:** 855-456-4424 • **Email:** info@earthlogistics247.com
> **Domain:** earthlogistics247.com

---

## Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19 + Tailwind CSS 4
- **Animation:** framer-motion
- **Icons:** lucide-react
- **Forms:** react-hook-form + zod
- **Fonts:** Montserrat (display) + Inter (body)
- **TypeScript** throughout

## Brand colors

- `#0354e1` → `#0092ff` — primary gradient
- `#bbbabd` → `#838b94` — secondary gradient
- `#0a2540` — deep ink / brand-900
- White / slate neutrals

## Sitemap (16 indexed routes)

| Route | Purpose |
| --- | --- |
| `/` | Home — full conversion funnel |
| `/about` | About / leadership / credentials |
| `/services` | Service hub |
| `/services/[slug]` | 10 service detail pages (dry van, flatbed, reefer, lowboy, car hauler, end dump, pneumatic, tanker, hopper, hazmat) |
| `/quote` | Quote form + heavy-haul calculator |
| `/carriers` | Carrier application |
| `/shippers` | Shipper setup |
| `/agents` | Freight agent application |
| `/industries` | Industry-specific freight expertise |
| `/coverage` | Regional coverage map |
| `/reviews` | Testimonials |
| `/blog` + `/blog/[slug]` | 3-post launch blog |
| `/contact` | Contact + Google Map |

## SEO

- Per-route `metadata` with title / description / canonical / OG / Twitter
- Auto-generated `sitemap.xml` at `/sitemap.xml`
- `robots.txt` at `/robots.txt`
- Keyword-rich service & industry copy
- Semantic HTML, lazy-loaded images via `next/image`

## Local development

```bash
cd "/Users/yasirbashir/Claude code 2026/earth-logistics-inc"
npm install
npm run dev
```

Open http://localhost:3000

## Production build

```bash
npm run build
npm start
```

## Folder structure

```
earth-logistics-inc/
├── public/
│   ├── logo.png            # Earth Logistics logo
│   └── images/             # drop client photography here
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── layout.tsx
│   │   ├── page.tsx        # Home
│   │   ├── globals.css     # Tailwind tokens + utilities
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── [route folders] # one per page
│   ├── components/         # Header, Footer, forms, cards, hero, CTA
│   ├── data/               # services, industries, coverage, blog, testimonials, company
│   └── lib/seo.ts          # page-meta helper
├── next.config.ts
├── tailwind.config — handled in globals.css via @theme (Tailwind 4)
├── package.json
└── README.md
```

## Image replacement

All hero/service images currently use Unsplash hotlinks for instant render. Replace with real freight photography by:

1. Drop JPG/WebP files in `public/images/`
2. Update the `image:` field in `src/data/services.ts` (and any inline `<Image src>` in pages)
3. Use local path (e.g. `/images/services/dry-van.jpg`)

See `public/images/README.md` for the full image swap-in list.

## Forms

All forms (`QuoteFormCompact`, `QuoteFormFull`, `ContactForm`, `JoinForms`) are currently front-end only with a simulated submit. To wire to a backend, replace the `setTimeout` inside each component's `submit` handler with a `fetch()` POST to your API route or 3rd-party form endpoint (Formspree, HubSpot, etc.).

## Heavy-haul calculator

Located in `src/components/QuoteFormFull.tsx`. Computes a live indicative estimate from:

- Load length / width / height / weight
- Mileage
- Axle count
- Permit-state count
- Pilot car count

The formula is intentionally conservative — final binding rates require route survey + permit confirmation.

## License

Proprietary — built for Earth Logistics Inc.
