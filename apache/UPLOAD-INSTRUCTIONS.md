# 🚀 Earth Logistics Inc — Upload Instructions

This `deploy/` folder is a **static, production-ready** copy of the website. Upload its contents (including `.htaccess`) to your hosting account.

---

## What's inside

```
deploy/
├── index.html           ← Home page
├── about/index.html     ← /about route
├── services/            ← Service hub + 10 detail pages
├── blog/                ← Blog index + 3 posts
├── contact/             ← Contact page
├── quote/               ← Quote form + heavy-haul calculator
├── ...                  (15+ routes total)
├── _next/               ← Compiled CSS, JS, fonts (do NOT modify)
├── images/              ← Service photography
├── trucks/              ← Hero truck imagery
├── logo.png             ← Brand logo
├── og-image.jpg         ← Social share preview image (1200×675)
├── robots.txt           ← Search-engine crawl rules
├── sitemap.xml          ← Auto-generated sitemap (16 URLs)
├── 404.html             ← Custom 404 page
└── .htaccess            ← Apache server config (REQUIRED)
```

---

## Upload steps — Hostinger / cPanel / any Apache host

### Option A — File Manager (easiest)

1. Log in to your hosting control panel (Hostinger → **File Manager**).
2. Open the `public_html` folder.
3. **Delete any default files** inside (e.g. the placeholder `index.html`, `default.php`).
4. Select **everything inside `deploy/`** (Cmd+A on Mac), zip it locally, upload the zip, then extract it inside `public_html`.
5. Make sure `.htaccess` is uploaded — it starts with a dot and is sometimes hidden. In File Manager → **Settings → Show hidden files**.

### Option B — FTP / SFTP

```
Host:   your-domain.com  (or hosting-provided FTP host)
User:   <your FTP user>
Pass:   <your FTP password>
Port:   21 (FTP) or 22 (SFTP)
Remote path: /public_html
```

Upload **the contents of `deploy/`** (not the folder itself).
Force hidden-file transfer so `.htaccess` is included.

---

## After upload — verify these URLs

- `https://earthlogistics247.com/` → home
- `https://earthlogistics247.com/services/` → service hub
- `https://earthlogistics247.com/services/refrigerated/` → reefer page
- `https://earthlogistics247.com/sitemap.xml` → sitemap
- `https://earthlogistics247.com/robots.txt` → robots
- `https://earthlogistics247.com/notarealpage` → custom 404

If any URL 404s, check the `.htaccess` uploaded correctly.

---

## SEO check after deploy

1. **Google Search Console** — submit `https://earthlogistics247.com/sitemap.xml`.
2. **Facebook Sharing Debugger** — `https://developers.facebook.com/tools/debug/?q=https://earthlogistics247.com`
3. **Twitter Card Validator** — `https://cards-dev.twitter.com/validator`
4. **LinkedIn Post Inspector** — `https://www.linkedin.com/post-inspector/`
5. **Google Rich Results Test** — `https://search.google.com/test/rich-results?url=https://earthlogistics247.com`

The site ships with:
- Organization + LocalBusiness JSON-LD on every page
- FAQPage + Service JSON-LD on each service detail page
- Per-route Open Graph + Twitter Card metadata
- Canonical URLs on every page
- 1200×675 OG image (`og-image.jpg`)

---

## Re-building after changes

If you make source-code changes, regenerate the deploy folder:

```bash
npm run build:static
```

That rebuilds the static site, copies it into `deploy/`, and re-applies `.htaccess`.

---

## Need help?

The `.htaccess` is the single most important file. If something breaks, that's the first place to check. The Apache source-of-truth lives at `apache/.htaccess` in the project root.
