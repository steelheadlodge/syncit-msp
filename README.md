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

1. **Formspree endpoint** — in `contact.html`, replace `https://formspree.io/f/your-form-id`
   with your real Formspree form ID (create a free form at formspree.io).
2. **Phone number** — placeholder `(516) 774-9700` appears in every page's topbar/footer/contact.
   Find & replace with the real number (also the `tel:+15167749700` links).
3. **Email** — placeholder `hello@syncitmsp.com`. Replace if different.
4. **Social links** — footer LinkedIn/Facebook/X `href="#"` — point to real profiles or remove.
5. **Testimonials** — home page quotes are representative placeholders; swap for real client quotes.

## Deploy (GitHub Pages)

1. Create a repo (e.g. `steelheadlodge/syncit-msp`) and push these files to `main`.
2. Repo **Settings → Pages** → Source: `main` / root.
3. Custom domain is set via the `CNAME` file (`syncitmsp.com`). In your DNS, point the
   apex/`www` at GitHub Pages (A records to GitHub's IPs + `www` CNAME to `<user>.github.io`).
4. `.nojekyll` is included so GitHub Pages serves files as-is.
5. Enable **Enforce HTTPS** in Pages settings once the cert provisions.

Point `syncitny.com` and `syncitfl.com` at the same site (301 redirect to `syncitmsp.com`)
or serve them as regional landing pages later.
