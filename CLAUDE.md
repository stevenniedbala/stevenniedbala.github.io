# CLAUDE.md — vyvv.com

## Project Overview
- **Company:** Vyvv — real estate development & investment company
- **Site:** Single-page marketing and investor relations website
- **Domain:** vyvv.com (GitHub Pages via CNAME)
- **Contact:** Steven Niedbala, steven@vyvv.com, +1 (617) 299-6676
- **Goal:** Improve the existing site — keep current theme, wording, and sections intact

## Tech Stack
- **Vanilla HTML/CSS/JS** — no frameworks, no build tools, no package manager
- **Font:** Google Fonts — Inter (weights 400, 500, 600)
- **Hosting:** GitHub Pages (repo: stevenniedbala/stevenniedbala.github.io)

## File Map
```
index.html              — Single-page site with 5 sections: About, Projects, Strategy, Partner, Contact
resources/css/style.css — All styles
nav.js                  — (loaded but sidebar/hamburger removed; file can be cleaned up)
scroll.js               — Smooth scroll, FAQ accordion, carousel, project card toggle, header fade
corousel.js             — Image carousel with swipe support (NOT loaded in index.html)
loadScreen.js           — Loading screen handler (NOT loaded in index.html)
resources/images/       — All images (logos, project photos, headshot, backgrounds)
CNAME                   — Custom domain: vyvv.com
sitemap.xml             — SEO sitemap
robots.txt              — SEO robots file
optimize-images.ps1     — PowerShell script to resize/compress project images
```

## Design System
| Token            | Value                          |
|------------------|--------------------------------|
| Background (day) | `#faf7f2`                      |
| Background (night)| `#0a0f1a`                     |
| Header BG (day)  | `#2d3a2e`                      |
| Header BG (night)| `#0a0f1a`                      |
| Text (day)       | `#2d3a2e`                      |
| Text (night)     | `#ffffff`                      |
| Muted text       | `#6b7a6c`, `#b0b8c0`          |
| Card BG (day)    | `#faf7f2`                      |
| Card BG (night)  | `#161d2e`                      |
| Accent (coral)   | `#ff6f61`                      |
| Accent (blue)    | `#007BFF`                      |
| Buttons          | Pill-shaped, `border-radius: 50px` |
| Breakpoint       | `768px` (mobile), `1200px` (desktop nav) |
| Aesthetic        | Light/airy day mode, dark futuristic night mode |

## Dark Mode
- Toggled by `🌙 Night / ☀️ Day` button in the header (right side)
- Adds/removes `.dark` class on `<body>`
- Affects: `body`, `html`, `header`, `#aboutsection`, `#projectssection`, `.project-box`, windows, lamps
- Street lamp posts and light cones appear only in dark mode
- Building windows on infill glow amber (`#ffe066`) in dark mode

## Page Sections (in order)
1. **Header** — Logo (left) + desktop nav links (center, desktop only) + Night/Day toggle button (right). Fixed at top, fades out when projects section is reached.
2. **About** (`#aboutsection`) — Hero with tagline, CTAs, isometric neighborhood SVG animation
3. **Projects** (`#projectssection`) — Responsive grid of 7 development projects with image carousels
4. **Strategy** (`#strategysection`) — 6-box grid of investment principles
5. **Partner** (`#partnersection`) — FAQ accordion about partnerships
6. **Contact** (`#contactsection`) — Headshot, name, email, phone, bio area
7. **Footer** — Nav links, social links, copyright

## Isometric SVG Animation (About Section)
- ViewBox: `0 0 1200 600`, `overflow="visible"` to allow lamp cones to extend down
- **Sequence:** lot boundary traces → infill building rises (with overshoot) → park landscaping fades in → boarding removed from left house → biker crosses → retail cafe tables appear (5.5s) → infill cafe tables appear (6.0s) → store figures fade in
- **Property line:** gradient stroke (red→amber→green) with glow filter
- **Boarding:** left house starts boarded up (plywood + X crosses), fades out at 2.7s with landscaping
- **Street lamps:** appear only in dark mode with flicker animation; light cones grow downward, fade before project photos
- **Lamp cone gradients:** end at SVG y=820 to stop above project photo cards
- **Mobile:** `width: 130%` on `.neighborhood-container`; animations disabled via `prefers-reduced-motion` and `@media (max-width: 768px)`

## Projects (current order)
1. Hockanum — 12-unit development
2. Pleasant Street — 7-unit residential
3. Walnut — 4-unit condo conversion
4. Cochran — 5-unit rental rehab
5. Trumbull — 3-unit condo conversion
6. Joy Street — Condo rehab
7. NohoRooms — Short term rentals

## Key Guidelines
- **Improve, don't redesign** — the current theme, sections, and wording are intentional
- **Stay vanilla** — no frameworks, libraries, or build tools
- **Mobile-responsive** — all changes must work at 768px and below
- **No horizontal scrollbar** — `overflow-x: hidden` on `body`; `scrollbar-width: none` on html/body
- Use forward slashes in HTML/CSS paths (not backslashes)

## Known Issues
### Content
- **Empty bio** — Contact section bio area has no content
- **Copyright year** — May need updating
- **Typos** — Some may remain in strategy/partner sections

### Links
- **Dead pages** — login.html, store.html, careers.html linked in old sidebar (sidebar now removed)
- **Generic social links** — Twitter/LinkedIn point to root domains, not actual profiles

### Technical
- **Unused scripts** — `corousel.js`, `loadScreen.js`, and `nav.js` are loaded but largely unused
- **nav.js** — Sidebar/hamburger menu removed from HTML; nav.js may still reference removed elements
