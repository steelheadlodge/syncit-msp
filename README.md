# SyncIT MSP — syncitmsp.com

Marketing website for **SyncIT**, a managed IT services provider (MSP) based in
Nassau County, NY, serving Long Island, the NYC metro, and Florida.

Static HTML/CSS/JS site — no build step — deployed via **GitHub Pages** with a custom
domain (same method as `doortronix.com`).

## Brand

- **Name:** SyncIT (wordmark: `Sync` in navy + `IT` in electric blue)
- **Tagline:** *The fast, safe way to fully managed IT* / *Your technology, perfectly in sync.*
- **Colors:** deep navy `#0A1A2F`, electric blue `#2563EB`, accent cyan `#06B6D4` / `#22D3EE`
- **Fonts:** Space Grotesk (headings) + Inter (body), via Google Fonts
- **Logo:** inline SVG "sync loop" mark (animated), no image files required
- **Domains owned:** syncitmsp.com (primary), syncitny.com, syncitfl.com

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home — hero, services, process, industries, differentiators, testimonials, CTA |
| `services.html` | Full service catalog (managed IT, cybersecurity, cloud, backup, help desk, remote, networks, VoIP, compliance, vCIO) |
| `about.html` | Company story + values |
| `service-area.html` | NY (Long Island / NYC metro) + FL coverage |
| `contact.html` | Free IT assessment form (Formspree) |

Shared assets: `css/style.css`, `js/main.js`, `favicon.svg`.

## Animations / flair

- Animated hero (moving grid, glowing gradient), pulsing status dot
- Rotating logo mark
- Scroll-reveal fade-ups (`IntersectionObserver`)
- Count-up stats
- Sticky nav that shrinks/gains shadow on scroll
- Card hover lifts + gradient top-border reveal
- Auto-looping tech marquee
- Respects `prefers-reduced-motion`

## Before you publish — required edits

1. **Formspree endpoint** — in `contact.html`, `index.html`, `ny.html`, `fl.html`, replace
   `https://formspree.io/f/your-form-id` with your real Formspree form ID.
2. **Phone numbers** — live numbers are wired in:
   - NY (primary / nav): `(516) 308-1001` → `tel:+15163081001`
   - FL: `(954) 501-0072` → `tel:+19545010072`
3. **Email** — `support@syncitmsp.com` (support/tickets) and `hello@syncitmsp.com` (general).
   Confirm both aliases exist in Google Workspace.
4. **Social links** — footer LinkedIn/Facebook/X `href="#"` — point to real profiles or remove.
5. **Testimonials** — home page quotes are representative placeholders; swap for real client quotes.

## Regional landing pages

- `ny.html` — New York Tri-State landing (516 number, Long Island/NYC/Westchester/NJ/CT).
- `fl.html` — South Florida landing (954 number, Broward/Palm Beach/Miami-Dade).

Both reference shared assets via absolute `https://syncitmsp.com/...` URLs and link back to the
main site, so they work whether served at `syncitmsp.com/ny.html` **or** at their own domain root.

## Deploy (GitHub Pages)

1. Create a repo (e.g. `steelheadlodge/syncit-msp`) and push these files to `main`.
2. Repo **Settings → Pages** → Source: `main` / root.
3. Custom domain is set via the `CNAME` file (`syncitmsp.com`). In your DNS, point the
   apex/`www` at GitHub Pages (A records to GitHub's IPs + `www` CNAME to `<user>.github.io`).
4. `.nojekyll` is included so GitHub Pages serves files as-is.
5. Enable **Enforce HTTPS** in Pages settings once the cert provisions.

### Pointing syncitny.com / syncitfl.com at the landing pages

GitHub Pages serves **one** custom domain per repo (the apex in `CNAME` = `syncitmsp.com`),
so the two regional domains can't be a second CNAME on this repo. Two options:

- **Easiest — redirect (recommended):** at your DNS/registrar (or a Cloudflare redirect rule),
  301 `syncitny.com` → `https://syncitmsp.com/ny.html` and `syncitfl.com` → `https://syncitmsp.com/fl.html`.
  The pages set `<link rel="canonical">` to the regional domains so SEO stays clean.
- **Independent hosting:** create a separate GitHub Pages repo per domain (each with its own
  `CNAME`) and drop the matching landing page in as `index.html`. Assets already load from
  `syncitmsp.com`, so no copying needed.
