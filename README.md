# FarReach — Agency Website

![FarReach homepage preview](docs/preview/homepage.gif)

A static, no-build marketing site for **FarReach**, a fictional independent digital agency (Portland, OR). It's plain HTML, CSS and vanilla JavaScript, so there's nothing to install or compile.

> Brand name, client names, figures, case studies and contact details are **fictional placeholders** (see `assets/js/data.js`). Replace them before any real use.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home: video hero, manifesto, partner logos, services slider, work rail, stats |
| `work.html` | Case study grid with industry/service filters |
| `case.html` | Case study template, loaded as `case.html?c=<id>` (defaults to `vantage`) |
| `services.html` | Services (Plan / Make / Reach) |
| `about.html` | About the agency |
| `insights.html` | Articles / insights |
| `contact.html` | Contact page |
| `privacy.html` | Privacy policy |

## Project structure

```
.
├── *.html              # Page shells
└── assets/
    ├── css/
    │   ├── style.css       # Base styles, tokens, typography
    │   ├── components.css  # Shared components (header, footer, cards, rail)
    │   ├── home.css        # Home page only
    │   └── pages.css       # Inner pages
    ├── js/
    │   ├── data.js         # All editable content (window.FR_DATA)
    │   ├── site.js         # Injects header/footer, scroll and header behaviour
    │   ├── components.js   # Shared UI (cards, rails, marquees)
    │   ├── home.js         # Home page interactions
    │   └── pages.js        # Inner page behaviour (filters, case template)
    ├── fonts/              # Hanken (woff2)
    ├── img/                # Photography
    └── video/              # Hero/case videos (.mp4) with .jpg posters
```

## Running locally

No build step. Open `index.html` directly, or serve the folder for more accurate behaviour (video, fonts):

```bash
# Python
python -m http.server 8000

# or Node
npx serve .
```

Then visit <http://localhost:8000>.

## Editing content

- **Copy and data**: edit `assets/js/data.js`. It holds the brand info (name, city, email, phone, address), hero word pairs, case studies (client, industry, services, results, quote) and other site content.
- **Add a case study**: add an entry to the `cases` array in `data.js` with a unique `id`. It's then reachable at `case.html?c=<id>`.
- **Header and footer**: rendered by `assets/js/site.js` into `#site-header` and `#site-footer` on every page, so change them once there.
- **Media**: put images in `assets/img/` and videos in `assets/video/`. Give each video a same-named `.jpg` poster.

## Deployment

The site is fully static and can be hosted anywhere that serves files (Vercel, Netlify, GitHub Pages, S3, any web server). Point the host at the project root. No build command or output directory is needed.

## Notes

- The header and footer are injected by JavaScript, so the site needs JS enabled to show navigation.
- Home-page videos below the fold use `data-src` and `preload="none"` for lazy loading.
