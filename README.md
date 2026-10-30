# CAFÉX / Vessel Archive

A complete, responsive redesign concept for [hechoencafex.com](https://www.hechoencafex.com/), created by Vessel Archive. Static HTML, CSS, and JavaScript, with locally stored photography and fonts. No runtime dependencies, API keys, accounts, or paid services required.

## Preview

The ready-to-host website is available in both the repository root and `dist/`. The root copy supports GitHub Pages' default branch publishing.

```sh
python3 -m http.server 8080 --directory dist
```

Open `http://localhost:8080`. Do not open the HTML directly with `file://` if you want to test routes consistently.

## Edit and build

```sh
python3 scripts/build.py
python3 scripts/check.py
```

- `scripts/build.py`: shared layout and page content
- `styles.css`: responsive layout, color themes, typography, and motion
- `app.js`: menu search, filters, gallery viewer, navigation, and email drafts
- `data/menu.json`: all 76 menu items, with source-listed prices
- `assets/`: local images and fonts
- `dist/`: generated website; committed for easy static hosting

Python 3.9 or newer is sufficient. `npm run build`, `npm run check`, and `npm run dev` are optional aliases if Node is installed.

## Pages and interactions

| Route | Experience |
| --- | --- |
| `/` | Brand homepage, interactive favorites, story, community, visit information |
| `/ourstory/` | Mexican heritage, coffee origins, drinks, baking, and canned offerings |
| `/menu/` | 76 items in 8 categories, instant search, accent-insensitive matching, empty state |
| `/gallery/` | 17 original photographs, keyboard-accessible lightbox |
| `/contact-10/` | Contact details, hours, directions, email draft form, catering prefill |
| `/shop/` | Coming-soon shop with email notification request |
| `/category/all-products/` | Compatible legacy shop URL |
| `/404.html` | Custom missing-page screen |

Color scheme follows the system with a persistent manual toggle. Motion respects reduced-motion preferences. Main content and links work without JavaScript.

## Hosting

Upload the contents of `dist/` to any static host. Keep the directory structure intact. Relative paths work at the domain root and under a repository subpath such as `/DEMO-CAFE-X/`.

For GitHub Pages, choose **Deploy from a branch**, **main**, and **/(root)** in repository Settings → Pages. The generated root `index.html` loads the redesigned homepage instead of the README, and `.nojekyll` keeps the site static. Once branch publishing is enabled, commits to `main` update the live demo automatically.

Alternatively, select **GitHub Actions** as the Pages source and run the included manual `Publish GitHub Pages` workflow, which publishes `dist/`. Use one publishing mode at a time. The private repository may require a GitHub plan that supports Pages.

For Netlify, use `dist` as the publish directory and leave the build command empty. For other hosts, use their static directory upload or deploy `dist` directly. Configure the host to serve `404.html` with HTTP 404 for unknown routes, rather than sending missing routes to the homepage.

## Demo boundaries

- Ordering opens Café X’s existing Toast ordering destination. No transactions are processed in this demo.
- Contact and shop notification forms prepare a message in the visitor’s email application. They do not claim to submit a message or create a mailing-list subscription. Connect a form or email service before using them as production lead capture.
- The original `/shop` says “coming soon.” The separate Wix catalog contains generic “I'm a product” template entries. These are intentionally represented by the same coming-soon shop, without invented merchandise or checkout.
- Wix member login and the unused cart are not reproduced; no account or cart backend is implied.
- Menu prices and opening hours are taken from the source website and may change. Confirm them with the business before launch. Missing source prices remain blank.
- This concept uses `noindex,nofollow` and a disallowing `robots.txt`. Remove these only when the business approves a production launch.

## Assets and credits

Original logo, food and drink photography, and event images come from the supplied Café X website. See `data/asset-sources.json`. Their rights remain with their respective owners; confirm permission before broader production use. The redesign does not claim ownership of Café X’s brand or photos.

Barlow Condensed and DM Sans are distributed under the SIL Open Font License; license texts are included in `assets/fonts/`. Images are compressed as WebP, with small menu thumbnails. Fonts are self-hosted, with no Google Fonts runtime request.

## Design direction

Mexican café identity expressed through deep green, a lively lime accent, bold condensed typography, large original photography, and clear spacing. The source routes, navigation labels, logo, and real offerings are preserved. The redesigned homepage brings menu discovery, community, and visiting information into one complete experience.

Design settings: variance 9, motion 6, visual density 4. Motion introduces the hero, reveals sections as they enter view, and acknowledges hover and control states. Native CSS and progressive enhancement keep the experience light.
