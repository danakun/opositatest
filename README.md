# OpositaTest — Landing Page · Technical Test

A production-ready landing page built for the OpositaTest technical test. The brief asked for modern layout techniques, vanilla JavaScript interactivity, and responsiveness as a plus. This implementation goes further: it treats the page as a real production asset, with full accessibility compliance, SEO optimisation, performance best practices, and a scalable CSS architecture.


- [Live Demo](https://opositatest.vercel.app/)

---

## Project Structure

```
├── index.html
├── src/
│   ├── main.js
│   ├── fonts/
│   │   ├── edo.woff2
│   │   └── edo.woff
│   └── css/
│       ├── index.css           # Design tokens, reset, base styles, global utilities
│       ├── vendor/
│       │   └── normalize.css
│       └── blocks/
│           ├── navbar.css
│           ├── hero.css
│           ├── features.css
│           ├── benefits.css
│           ├── video.css
│           ├── faq.css
│           └── footer.css
└── public/
    ├── images/
    └── icons/
```

---

## Design Tokens

Before writing a single line of CSS, the Figma design was analysed and translated into a structured token system defined in `index.css` as CSS custom properties. This ensures consistency across the entire codebase and makes future theming or updates trivial.

Tokens cover:

- **Typography** — two font families (`IBM Plex Sans`, `Edo`), a full fluid type scale using `clamp()` from `--text-xs` to `--text-deco`, font weights, line heights, and letter spacing
- **Colour** — a neutral palette (`--color-dark-05` through `--color-dark-100`), brand colours (`--color-primary`, `--color-primary-light`), and semantic aliases (`--color-text-primary`, `--bg-light`, etc.)
- **Spacing** — a consistent scale from `--spacing-xs` (8px) to `--spacing-4xl` (128px)
- **Layout** — `--main-container-width`, `--corner-radius`

The fluid type scale means text scales smoothly between mobile and desktop viewports without breakpoint-specific overrides.

---

## CSS Architecture

Styles are organised following **BEM methodology** and split into **CSS blocks** — one file per component. This mirrors how a real design system or Twig template structure would be organised, making it easy to maintain, extend, or hand off.

```css
/* Block */
.faq {
}

/* Element */
.faq__question {
}
.faq__answer {
}

/* Modifier */
.btn--primary {
}
.btn--disabled {
}
```

### Layout Techniques

- **CSS Grid** — used for the features card grid (`repeat(12, 1fr)` with named column spans), the benefits two-column layout, and the footer columns
- **Flexbox** — used for the navbar, card internals, social links, and all alignment patterns
- **`position: sticky`** — used for the benefits section left column, which stays fixed in view while the right column scrolls past it, matching the design requirement
- **`clamp()`** — used throughout for fluid spacing and typography

---

## Semantic HTML

Every element was chosen for its semantic meaning rather than convenience:

- `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>` used correctly throughout
- `<details>` and `<summary>` for the FAQ accordion — no JavaScript needed for the open/close behaviour, native and accessible by default
- `<time datetime="...">` for the hero date
- `<ul>` for navigation, social links, and footer columns
- Heading hierarchy (`h1` → `h2` → `h3`) is logical and unbroken across the page

---

## Accessibility (WCAG 2.1)

Accessibility was treated as a first-class requirement, not an afterthought:

- All `aria-labelledby` attributes correctly reference valid element IDs
- All `<section>` elements have accessible names via `aria-labelledby`
- Decorative images use `alt=""` to be ignored by screen readers
- Informative images have descriptive `alt` text
- External links include `(se abre en nueva pestaña)` in their `aria-label`
- The avatar dropdown uses `aria-expanded`, `aria-controls`, and `id` wired correctly — screen readers announce the state
- Disabled buttons use both `aria-disabled="true"` and `tabindex="-1"` so they are neither announced as actionable nor reachable by keyboard
- SVG icons are marked `aria-hidden="true"`
- A `.visually-hidden` utility class is used for the video section heading — present in the accessibility tree, invisible visually
- Focus styles are preserved and enhanced (`focus-visible` on interactive elements)
- `prefers-reduced-motion` media query disables card animations for users who prefer it

---

## SEO

- Descriptive `<title>` matching the page's value proposition
- `<meta name="description">` with relevant content
- Open Graph and Twitter Card meta tags for rich social sharing
- `<link rel="canonical">` to avoid duplicate content issues
- **JSON-LD structured data** (`@type: Organization`) with real URLs, social profiles, founding date, and logo — validated against schema.org
- Semantic heading hierarchy supports crawlability
- `loading="lazy"` on all below-the-fold images prevents unnecessary network requests during initial load
- `width` and `height` on all images prevent Cumulative Layout Shift (CLS)

---

## Performance

- **Vite** as the build tool — handles bundling, CSS injection, and asset hashing
- **WebP** format for all card and hero images
- `loading="lazy"` on all below-the-fold images
- `fetchpriority="high"` and `loading="eager"` on above-the-fold assets (logo, hero)
- `<link rel="preload">` for the custom Edo font (`woff2`) and hero logo in `<head>`
- `<link rel="preconnect">` for Google Fonts
- YouTube `<iframe>` is **not** in the HTML — it is injected by JavaScript only when the user clicks play, avoiding a heavy third-party embed on page load
- YouTube preconnect (`youtube-nocookie.com`) is triggered lazily via `IntersectionObserver` when the video section enters the viewport — not on page load
- `type="module"` on the script tag — deferred by default, no `defer` attribute needed
- Custom font uses `font-display: swap` to prevent invisible text during load

---

## JavaScript

Vanilla JavaScript was used throughout, with no frameworks or libraries. All code is wrapped in a single `DOMContentLoaded` listener to guarantee DOM availability.

Features implemented:

- **Navbar scroll behaviour** — on desktop (`min-width: 1024px`), the navbar becomes semitransparent with a `backdrop-filter: blur` effect when scrolled past 80px, and returns to full opacity on hover or scroll back to top
- **Dropdown menu** — the avatar button toggles a dropdown with full keyboard support: `Escape` closes it and returns focus to the trigger button, clicking outside closes it, and `aria-expanded` is kept in sync for screen readers
- **YouTube lazy embed** — clicking the play button creates and injects the iframe dynamically with `youtube-nocookie.com` for privacy, autoplay enabled, and `allowfullscreen` set via `setAttribute`
- **Scroll animations** — `IntersectionObserver` adds an `is-visible` class to feature cards as they enter the viewport, triggering a staggered fade-in animation with CSS `transition-delay`

---

## Responsive Design

Responsive design was not required by the brief but was implemented as a plus across all breakpoints:

- `1156px` — navbar collapses desktop actions, reduces gaps
- `900px` — features grid switches to 2 columns
- `768px` — benefits layout stacks, navbar menu hidden
- `600px` — features grid becomes single column
- `767px` — hero stacks vertically, mobile background image swapped in

---

## Next Steps — Twig Integration

The primary focus of this implementation was optimisation, accessibility, and pixel-perfect fidelity. The natural next step would be to migrate the HTML structure into **Twig templates**, componentising each section as a reusable partial:

```
templates/
├── layout/
│   └── base.html.twig
├── components/
│   ├── navbar.html.twig
│   ├── hero.html.twig
│   ├── features.html.twig
│   ├── benefits.html.twig
│   ├── video.html.twig
│   ├── faq.html.twig
│   └── footer.html.twig
```

Each component would accept data via Twig variables, making the templates fully data-driven and ready for CMS integration. The CSS block structure already mirrors this component split exactly.

---

## Running the Project

```bash
npm install
npm run dev
```

Built with **Vite**. No additional configuration required.
