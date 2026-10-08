# Build Host Status Page

A dark, responsive status page inspired by the supplied HeavyCore screenshot and branded for Build Host.

## Files
- `index.html` — page structure
- `styles.css` — dark UI and responsive layout
- `script.js` — services/status data and uptime history bars

## Put it on status.buildhost.site

### Cloudflare Pages
1. Create a new Cloudflare Pages project.
2. Upload this folder (or deploy it from a Git repository).
3. Add the custom domain `status.buildhost.site` in the Pages project.
4. In Cloudflare DNS, follow the CNAME record Cloudflare provides for the custom domain.

### Vercel
1. Upload this folder to a Git repository.
2. Import the repository into Vercel.
3. Add `status.buildhost.site` under Project Settings → Domains.
4. Add the DNS record Vercel shows at your DNS provider.

## Make the status REAL
The current page is the UI with sample operational data. To make it automatically detect outages, connect `script.js` to an uptime/monitoring API and return each service's current status, uptime history, latency, and incidents. Do not expose monitoring API keys in browser JavaScript; use a server-side endpoint or a monitoring service's public status endpoint.
