# 🚀 Earth Logistics Inc — Bluehost Deployment Guide

This `deploy/` folder is the **complete, production-ready** website. Copy
**everything inside it** (including the hidden `.htaccess` and the `/api`
folder) into your Bluehost `public_html`. Nothing else is needed.

---

## 📦 What's inside `deploy/`

```
deploy/
├── index.html              ← Home page
├── about/  services/  blog/  contact/  quote/  carriers/  shippers/
│   agents/  industries/  coverage/  reviews/   ← all site routes
├── _next/                  ← compiled CSS / JS / fonts (do NOT edit)
├── api/                    ← ✉️  PHP form handlers (THE EMAIL ENGINE)
│   ├── config.php          ← EDIT THIS — your inbox + sender address
│   ├── mailer.php          ← shared mail logic
│   ├── contact.php  quote.php  apply.php  carrier.php
├── forms/                  ← downloadable carrier PDFs
├── images/  trucks/  logo.png  og-image.jpg
├── robots.txt  sitemap.xml ← SEO
├── 404.html                ← custom error page
└── .htaccess               ← Apache config (REQUIRED, hidden file)
```

---

## STEP 1 — Create the sender mailbox (do this FIRST)

The contact / quote / carrier forms email you through PHP's `mail()`. For mail
to actually arrive (and not land in spam), it must be **sent from an address on
your own domain**.

1. Bluehost → **Email → Email Accounts → Create**.
2. Create: **`no-reply@earthlogistics247.com`** (any password — you never log in to it).
3. That's the "from" address. Leads still get delivered to your real inbox (Step 2).

> Already have a different domain on the hosting account? Use that domain in the
> `no-reply@…` address instead, then mirror it in `config.php` (Step 2).

---

## STEP 2 — Set where leads are delivered

Open **`api/config.php`** and edit the top three values:

```php
const RECIPIENT_EMAIL = 'info@ajearthlogistics.com';        // where leads land (your inbox)
const FROM_EMAIL      = 'no-reply@earthlogistics247.com';   // the mailbox from Step 1
const FROM_NAME       = 'Earth Logistics Website';
```

Optional: set `BCC_EMAIL` to also copy a second person on every lead.

You can edit this file before uploading, or afterward in Bluehost **File Manager**.

---

## STEP 3 — Upload to `public_html`

### Option A — File Manager (easiest)
1. Bluehost → **Advanced → File Manager** (or **Website → File Manager**).
2. Open **`public_html`** and delete any default/placeholder files
   (`index.html`, `default.php`, the "coming soon" page, etc.).
3. Top-right **Settings → ✅ Show Hidden Files (dotfiles)** so `.htaccess` uploads.
4. Zip the **contents** of `deploy/` locally → **Upload** the zip → **Extract** it
   inside `public_html`. Confirm `.htaccess` and the `/api` folder are present.

### Option B — FTP / SFTP (FileZilla)
```
Host:        ftp.earthlogistics247.com  (or the host shown in Bluehost → FTP Accounts)
User / Pass: your FTP credentials
Port:        21 (FTP) / 22 (SFTP)
Remote dir:  /public_html
```
Upload **the contents of `deploy/`** (not the folder itself). In FileZilla enable
**Server → Force showing hidden files** so `.htaccess` transfers.

---

## STEP 4 — Verify the site

Open each URL after upload:

- `https://earthlogistics247.com/` → home
- `https://earthlogistics247.com/services/` → service hub
- `https://earthlogistics247.com/services/refrigerated/` → reefer page
- `https://earthlogistics247.com/quote/` → quote calculator
- `https://earthlogistics247.com/contact/` → contact page
- `https://earthlogistics247.com/sitemap.xml` and `/robots.txt`
- `https://earthlogistics247.com/notarealpage` → custom 404

If pages 404, the `.htaccess` didn't upload — re-check Step 3.3.

---

## STEP 5 — Test the forms (the important one ✅)

1. Go to **/contact/**, fill it in, hit **Send Message**.
2. You should see the green "Message sent" confirmation.
3. Check the **`RECIPIENT_EMAIL`** inbox (and spam folder the first time).

Repeat for the **/quote/**, **/carriers/** application, and the multi-step
**/carriers/onboarding/** packet.

**If a form shows an error or no email arrives:**
- Confirm the `no-reply@…` mailbox exists (Step 1) and matches `FROM_EMAIL`.
- Confirm `RECIPIENT_EMAIL` is spelled correctly in `api/config.php`.
- Visit `https://earthlogistics247.com/api/contact.php` directly in a browser —
  it should print `{"ok":false,"error":"Method not allowed."}`. If it instead
  shows PHP source code, PHP isn't executing — open a Bluehost ticket to enable
  PHP for the domain.
- Bluehost throttles `mail()` volume; for high traffic, switch to SMTP later.

---

## 🔁 Rebuilding after content changes

If you edit the source code, regenerate everything with:

```bash
npm run build:static
```

That rebuilds the static site **and** re-bundles `/api` + `.htaccess` into a
fresh `deploy/`. Re-upload its contents.

---

## 🔎 SEO / social checks (already built in)

The site ships with: Organization + LocalBusiness JSON-LD, per-page Open Graph +
Twitter cards, canonical URLs, a 1200×675 share image (`og-image.jpg`), sitemap
and robots. After deploy:

1. **Google Search Console** — add the property, submit `…/sitemap.xml`.
2. **Facebook Sharing Debugger** — `https://developers.facebook.com/tools/debug/?q=https://earthlogistics247.com`
3. **LinkedIn Post Inspector** — `https://www.linkedin.com/post-inspector/`
4. **Google Rich Results Test** — `https://search.google.com/test/rich-results`

---

## Need help?

The two files that matter most are **`.htaccess`** (routing) and
**`api/config.php`** (email). If something breaks, check those first. The Apache
source-of-truth lives at `apache/.htaccess` in the project root.
