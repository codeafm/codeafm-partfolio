# CodeAFM

Portfolio and project inquiries for CodeAFM, published at https://www.codeafm.dev/. React 19 + Vite with a responsive Russian-language interface.

## Development and checks

- `npm ci`
- `npm run dev`
- `npm run build`
- `npm run test:seo`
- `npm run lint`
- `npm run preview`

`npm run build` creates the client assets, renders every public route to static HTML using React, and generates `dist/sitemap.xml`, `dist/robots.txt` and a custom `dist/404.html`. Temporary server bundles stay in ignored `.tmp/ssr/`. A Node server is not needed in production.

`npm run test:seo` checks the built output: unique metadata, canonical URLs, one H1 per page, valid structured data, real internal links and assets, all catalog entries, robots/sitemap, legacy redirects and the 404 policy. Run it after building.

## Content

Project records live in `src/data/projects.js`. Keep IDs stable: each record has a public page at `/projects/{id}`. The full catalog at `/projects` includes every project in the initial HTML, even without JavaScript. The home page retains interactive project previews.

Images from the public CodeAFM RuStore catalog are stored locally in `public/rustore/`, with provenance in its manifest. TojMarket screenshots in `public/screenshots/tojmarket/` were captured from the live desktop and mobile site. The brand mark is a lightweight SVG based on the supplied CodeAFM logo.

Service content lives in `src/data/services.js` and is published at `/services/web-development`, `/services/mobile-development` and `/services/game-development`.

## SEO and social previews

`src/data/site.js` holds the canonical production origin, brand and contact information. `src/seo.js` creates route-specific titles, descriptions, canonical links, Open Graph and Twitter metadata, plus Organization, WebSite, WebPage, BreadcrumbList, ItemList, Service and SoftwareApplication structured data where relevant. No ratings, prices or business addresses are invented.

`public/social/codeafm-og.png` is the 1200 x 630 social preview; the favicon and Apple touch icon use the current brand mark. Canonical URLs, structured data and the sitemap all use `https://www.codeafm.dev`.

After deployment, the site owner can verify the domain in Google Search Console and Yandex Webmaster and submit `https://www.codeafm.dev/sitemap.xml`. Those accounts and verification tokens are not part of this repository. Technical readiness does not guarantee indexing or a particular position in search results.

## Project inquiries

The inquiry dialog prepares a message for `https://t.me/fizbit00` or `codeafm@gmail.com`. The customer reviews and sends it in Telegram or their email application. This is not a server-side form submission; the UI does not claim a message was delivered. A copyable brief is available if the external app does not open.

Contact settings are in `src/data/site.js`, `src/App.jsx` and `src/components/ProjectRequest.jsx`.

## Hosting

Vercel builds with `npm run build` and serves `dist/` using `cleanUrls: true` and `trailingSlash: false`. Each extensionless path maps to its own generated HTML file. Do not restore a blanket SPA rewrite: nonexistent addresses must return a real 404 instead of the home page.

Legacy `/privacy` and `/support` addresses permanently redirect to the corresponding Bottle Sort pages. Bubble Pop support and privacy pages are available at `/bubble-pop/support` and `/bubble-pop/privacy`, with the developer contact from `src/data/site.js`. Pull & Rescue 3D support and privacy pages are available in Russian at `/pull-rescue/support` and `/pull-rescue/privacy`; the privacy text mirrors the bundled game policy dated October 8, 2026. Bottle Sort and Crowd Clash support/privacy content is retained; English legal pages have English document language and their own metadata. Existing `app-ads.txt` and other public files remain available.

Vite's development/preview server is for local inspection and does not implement Vercel redirects or HTTP 404 behavior. Check those response codes on the deployed host.

The interface respects reduced-motion preferences and supports keyboard navigation, native modal dialogs, search and category filtering.
