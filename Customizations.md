# Customizations

This document tracks all customizations and fixes applied to the Devosfera blog project, built on the AstroPaper theme. The changes include visual redesigns, new interactive features, performance optimizations, and bug fixes implemented since February 2026.

## Table of Contents

### Core Infrastructure
- [1. Experimental Fonts Configuration Fix](#1-experimental-fonts-configuration-fix)
- [2. Typography & Font Customizations](#2-typography--font-customizations)
- [3. Custom Utility Classes](#3-custom-utility-classes)
- [4. Code Snippet Font Customization](#4-code-snippet-font-customization)
- [5. Layout Font Loading Correction](#5-layout-font-loading-correction)
- [26. Cascadia Code Font Added](#26-cascadia-code-font-added)

### Visual Design
- [6. Open Graph Templates Redesign](#6-open-graph-templates-redesign)
- [7. Homepage Visual Redesign](#7-homepage-visual-redesign)
- [8. Card Component Redesign](#8-card-component-redesign)
- [9. Global Backdrop Effects (Grid, Glow, Cursor Glow, Noise)](#9-global-backdrop-effects-grid-glow-cursor-glow-noise)
- [10. Gradient Anti-Banding Techniques](#10-gradient-anti-banding-techniques)
- [25. Logo SVG Redesign with Cascadia Code Font & Hover Effects](#25-logo-svg-redesign-with-cascadia-code-font--hover-effects)

### Navigation & Header
- [11. Navbar Glassmorphism Redesign](#11-navbar-glassmorphism-redesign)
- [13. BackButton + Breadcrumbs Redesign](#13-backbutton--breadcrumbs-redesign)
- [24. Navbar Search Redesign — ⌘K Modal Trigger + Search Page Link](#24-navbar-search-redesign--k-modal-trigger--search-page-link)
- [28. Mobile Navigation Menu Refactoring](#28-mobile-navigation-menu-refactoring)

### Post & Content Pages
- [12. Post Detail Page — Progress Bar Z-Index Fix](#12-post-detail-page--progress-bar-z-index-fix)
- [14. Post Title Section Redesign](#14-post-title-section-redesign)
- [15. Post Footer Section Redesign](#15-post-footer-section-redesign)
- [16. Prev/Next Post Navigation Redesign](#16-prevnext-post-navigation-redesign)
- [22. Table of Contents (TOC) — Full Redesign](#22-table-of-contents-toc--full-redesign)
- [23. Scroll Offset for Sticky Navbar](#23-scroll-offset-for-sticky-navbar)

### Special Pages
- [13. Tags Page — Full Redesign with Interactive Aurora Effects](#13-tags-page--full-redesign-with-interactive-aurora-effects)
- [14. About Page — Full Redesign with Interactive Aurora Effects](#14-about-page--full-redesign-with-interactive-aurora-effects)
- [19. Archives Page — Full Redesign with Timeline & Interactive Aurora](#19-archives-page--full-redesign-with-timeline--interactive-aurora)
- [20. Search Page — Full Redesign with Interactive Aurora](#20-search-page--full-redesign-with-interactive-aurora)
- [21. Global Search Modal (Cmd+K)](#21-global-search-modal-cmdk)

### UI Components
- [17. Back To Top Button Enhancement](#17-back-to-top-button-enhancement)
- [18. Footer Redesign](#18-footer-redesign)
- [27. BackToTopButton Border Fix](#27-backtotopbutton-border-fix)

---

## 1. Experimental Fonts Configuration Fix

**File:** `astro.config.ts`

Fixed an issue where the local font provider configuration was incorrect. The `variants` property for the local font provider must be nested within an `options` object.

**Change:**
```typescript
// Before
provider: fontProviders.local(),
variants: [ ... ]

// After
provider: fontProviders.local(),
options: {
  variants: [ ... ]
}
```

## 2. Typography & Font Customizations

**File:** `astro.config.ts`
- Added **Sriracha** font specific configuration using `fontProviders.google()`.

**File:** `src/styles/global.css`
- Registered the `--font-sriracha` variable in the Tailwind theme.
- Configured a global rule to force the **Sriracha** font on all italicized text elements (`.italic`, `.prose em`, `em`, `i`).

```css
.italic, .prose em, em, i {
  font-family: var(--font-sriracha);
  font-style: italic;
}
```

**File:** `src/styles/typography.css`
- Updated the `h3` style to explicitly use the Sriracha font.

```css
h3 {
  @apply italic font-sriracha;
}
```

## 3. Custom Utility Classes

**File:** `src/styles/global.css`

Added a custom utility class `.spicy` to easily apply the Sriracha font to specific text elements within posts or pages.

```css
.spicy {
  font-family: var(--font-sriracha);
}
```

**Usage:**
```html
<span class="spicy">This text will appear in Sriracha font.</span>
```

## 4. Code Snippet Font Customization

**File:** `src/styles/typography.css`

Changed the font for Shiki code snippets and inline code to use **Cartograph CF**.

```css
.astro-code, code {
  @apply font-cartograph;
}
```

## 5. Layout Font Loading Correction

**File:** `src/layouts/Layout.astro`

Corrected the implementation of the `<Font />` component for loading multiple fonts. Previously, multiple `cssVariable` attributes were passed to a single component, which is invalid.

**Change:**
```astro
<!-- Before (Incorrect) -->
<Font
  cssVariable="--font-wotfard" ...
  cssVariable="--font-sriracha" ...
  cssVariable="--font-cartograph" ...
/>

<!-- After (Correct) -->
<Font cssVariable="--font-wotfard" ... />
<Font cssVariable="--font-sriracha" ... />
<Font cssVariable="--font-cartograph" ... />
```

## 6. Open Graph Templates Redesign

**Files:**
- `src/utils/og-templates/site.js`
- `src/utils/og-templates/post.js`

The visual design of the Open Graph (OG) images for both the site and individual posts has been completely renewed.

## 7. Homepage Visual Redesign

**File:** `src/pages/index.astro`

Complete visual overhaul of the homepage with a programming/tech blog identity:

- **Hero section:** Terminal-style prompt badge (`~/devosfera $` with animated ping dot), shimmer gradient title animation, social links, and code-comment style separators (`// posts`, `// recientes`).
- **Featured section:** Star icon header, 2-column grid layout.
- **Recent posts section:** Array counter indicator (`[n/total]`).
- **CTA button:** Rounded border with hover glow effects.

## 8. Card Component Redesign

**File:** `src/components/Card.astro`

- Entire card is now clickable (absolute link overlay, not just the title).
- Cursor-following glow effect (`.card-glow-effect`) using CSS custom properties `--mouse-x`/`--mouse-y`.
- Noise texture overlay (`.card-noise`) for anti-banding.
- Rounded corners (`rounded-2xl`), border, hover elevation, and accent shadow glow on hover.
- Title changes to accent color on card hover.

## 9. Global Backdrop Effects (Grid, Glow, Cursor Glow, Noise)

**File:** `src/layouts/Layout.astro`

A global decorative backdrop applied to **all pages** via the root layout:

- **Grid pattern:** Subtle accent-colored CSS grid lines (`50px × 50px`), fading via radial mask.
- **Ambient glow:** Large radial gradient at the top center, using `color-mix(in oklab, ...)` with 8+ color stops for smooth banding-free rendering.
- **Cursor-following glow:** 550px radial gradient that tracks the mouse position via JS (`--site-cx`/`--site-cy` CSS vars), with blur(40px) and fade-in/out transitions (`.active` class toggled by JS).
- **Noise texture:** Static tiled PNG (`/noise.png`, 64×64, ~7KB) with `mix-blend-mode: overlay` for anti-gradient-banding dithering. Zero CPU cost (replaces previous `feTurbulence` SVG filter).
- **Mask fade:** Backdrop fades out toward the bottom of the viewport via `mask-image: linear-gradient(...)`.
- `position: fixed; inset: 0; pointer-events: none` — covers entire viewport without blocking interaction.

**File:** `public/noise.png`
- Generated 64×64 RGBA noise texture (grayscale random pixels, alpha=20/255).

## 10. Gradient Anti-Banding Techniques

**Files:** `src/layouts/Layout.astro`, `src/pages/index.astro`

Multiple techniques applied to eliminate gradient banding:

- **oklab color space:** All gradients use `color-mix(in oklab, ...)` instead of sRGB for perceptually smooth transitions.
- **Many color stops:** 8–9 stops per gradient for smoother interpolation.
- **Noise texture overlay:** Static PNG dithering (see §9).
- **GPU compositing hints:** `transform: translateZ(0)`, `will-change: transform` on animated elements.

## 11. Navbar Glassmorphism Redesign

**File:** `src/components/Header.astro`

Modern navbar with:

- **Glassmorphism:** `backdrop-filter: blur(16px) saturate(180%)`, semi-transparent background.
- **Gradient logo text:** Accent-to-foreground gradient on the site name with a `<>` code icon prefix.
- **Pill-style nav links:** `.nav-link` with rounded hover backgrounds, `.nav-active` with accent background + animated bottom dot indicator.
- **Vertical separator:** Between nav links and icon buttons (theme toggle, search).
- **Gradient bottom border:** Subtle accent gradient line at the bottom of the header.
- **Fullscreen mobile menu:** Blur overlay with centered links and close animation.

**File:** `src/styles/global.css`
- `.active-nav` class simplified to `text-accent` (previously wavy underline).

## 12. Post Detail Page — Progress Bar Z-Index Fix

**File:** `src/layouts/PostDetails.astro`

Changed progress bar container z-index from `z-10` to `z-50` so it renders above the sticky navbar (`z-40`).

## 13. BackButton + Breadcrumbs Redesign

**File:** `src/components/BackButton.astro`

Redesigned back button with integrated breadcrumb navigation:

- **Back button pill:** Glassmorphism pill with border, `backdrop-filter: blur(8px)`, chevron icon with hover translation animation, label "Volver".
- **Inline breadcrumbs:** Home icon (SVG house) → chevron separators → path segments, last segment in accent color as current page (truncated at 22ch).
- **Responsive:** Breadcrumbs hidden on mobile (`sm:` breakpoint), only back button visible.

**File:** `src/components/Breadcrumb.astro`

Standalone breadcrumb component (used in `Main.astro`, `AboutLayout.astro`) redesigned with matching style:

- Home SVG icon instead of text "Home".
- Chevron SVG separators (replaces `»` characters).
- Last segment in accent with `font-medium`.
- Colors using `color-mix` for theme consistency.

## 14. Post Title Section Redesign

**File:** `src/layouts/PostDetails.astro`

Modern centered post header:

- **Title:** Centered with gradient text (`accent → foreground` via oklab), larger sizes (`3xl → 4xl → 2.75rem`).
- **Tag badges:** Below title, centered pill badges with `#tag`, accent border, glassmorphism backdrop-blur, interactive hover.
- **Metadata chips:** Author (person icon) and date (calendar icon) inside glassmorphism pills with subtle borders. EditPost also styled as a chip.
- **Code-comment separators:** `// contenido` and `// fin` decorative dividers with gradient lines.

## 15. Post Footer Section Redesign

**File:** `src/layouts/PostDetails.astro`

Tags and share links in a responsive row layout:

- **Tags:** Left-aligned on desktop, centered on mobile. Pills with `#` prefix, accent hover.
- **Share links:** Right-aligned on desktop. Square `8×8` buttons with glassmorphism, accent hover glow, under "Compartir" label in mono font.

**File:** `src/components/ShareLinks.astro`

Redesigned share buttons as compact square pills with border, `backdrop-filter: blur(4px)`, and accent hover effects within a vertical layout (label + icons).

## 16. Prev/Next Post Navigation Redesign

**File:** `src/layouts/PostDetails.astro`

New vertical card design for post navigation:

- **2-column grid** always visible (not responsive toggle).
- Cards with `rounded-2xl`, glassmorphism, inline SVG arrow icons with hover translation.
- **Aurora glow effect:** 3-layer `radial-gradient` aurora behind each card (`blur(16px)`), always visible at 50% opacity, intensifies to 100% + `blur(20px)` on hover.
- Titles with `line-clamp-2`. Labels "Anterior"/"Siguiente" in mono uppercase.
- Empty `<div />` placeholder when no previous post to keep "Siguiente" right-aligned.

## 17. Back To Top Button Enhancement

**File:** `src/components/BackToTopButton.astro`

- Enlarged from `size-14` to `size-16` (mobile) and `md:h-8` to `md:h-9` (desktop).
- Larger chevron icon (`size-6`).
- Added border with accent hover glow and transition effects.
- Moved after prev/next navigation grid to prevent float interference.

## 18. Footer Redesign

**File:** `src/components/Footer.astro`

Modern footer with consistent design language:

- **Brand column:** Logo with `<>` icon (same as navbar), gradient text, tagline "Un espacio donde la curiosidad se convierte en código".
- **Social links:** Square glassmorphism buttons under "Conectar" label in mono font, matching ShareLinks style.
- **Gradient separators:** Top border and internal divider with transparent→border→transparent gradient.
- **Copyright bar:** Mono font, "Hecho con ♥ y mucho café" message.
- **Glassmorphism:** Semi-transparent background with `backdrop-filter: blur(8px)`.

## 13. Tags Page — Full Redesign with Interactive Aurora Effects

**File:** `src/pages/tags/index.astro`

Complete visual overhaul of the tags listing page:

- **Hero section:** Floating aurora orbs (3 animated `radial-gradient` circles with `blur(60px)` drifting via keyframes) + a **mouse-following aurora** orb (350px, tracks cursor position via JS setting `--mx`/`--my` CSS vars, with `blur(50px)`). Gradient glow text title and pill-style stat badges.
- **Tag cards:** Grid layout (`auto-fill, minmax(230px, 1fr)`) where each card has:
  - **Mouse-reactive aurora** (`.tag-aurora`): 200px radial glow that follows the cursor inside the card.
  - **Mouse-reactive border glow** (`.tag-border-glow`): Concentrated 120px accent glow with `mix-blend-mode: screen`.
  - **Progress bar:** Proportional to post count, with `linear-gradient` fill and animated `box-shadow` glow on hover.
  - **Text glow:** `text-shadow` on tag name and count number on hover.
  - Hover elevation (`translateY(-3px)`) with multi-layer box-shadow including inset highlight.
- Post count per tag is calculated via `getPostsByTag` and displayed with a bold number + label.
- Replaced previous `Tag.astro` component usage with inline card rendering.

## 14. About Page — Full Redesign with Interactive Aurora Effects

**Files:**
- `src/layouts/AboutLayout.astro`
- `src/pages/about.md`

### Layout (`AboutLayout.astro`)

Complete hero redesign with interactive effects:

- **Aurora orbs:** 3 floating radial-gradient orbs with independent drift animations and `blur(60px)`.
- **Mouse-following aurora:** 400px orb that tracks cursor inside the hero via JS (`--mx`/`--my` CSS vars), `blur(50px)`, fades in/out on enter/leave.
- **Avatar ring:** `conic-gradient` ring with continuous `rotate()` animation. Inner container counter-rotates to keep emoji static. Pulsing glow halo (`radial-gradient` with `scale` animation).
- **Badges:** Each badge has a `::before` pseudo-element with a mouse-reactive radial glow (`--bx`/`--by` CSS vars set via JS), creating a spotlight effect on hover. Elevation + accent border glow + inset highlight on hover.
- **Content headings:** `h2::after` underline with `linear-gradient` accent + `box-shadow` glow.

### Content (`about.md`)

Rewritten from default AstroPaper template to personalized content as Andrés:

- Introduction as developer, student, and gamer.
- Sections: ¿Quién soy?, Lo que hago (web dev, open source, continuous learning), Gaming, Este blog (Devosfera purpose).
- Links to real social profiles (GitHub, X, LinkedIn).
- Closing quote in blockquote style.

## 19. Archives Page — Full Redesign with Timeline & Interactive Aurora

**File:** `src/pages/archives/index.astro`

Complete visual overhaul replacing the simple list layout with a timeline-based design:

- **Hero section:** Same aurora system as Tags/About — 3 floating `radial-gradient` orbs with drift animations + mouse-following aurora orb (350px, `blur(50px)`, tracks via `--mx`/`--my`). Gradient glow title, Spanish description, stat badges.
- **Timeline layout:** Vertical timeline with a gradient accent line (`linear-gradient` from accent→border→fade). Posts are visually connected via:
  - **Timeline dots** (`.post-dot`): 10px circles on the timeline line, hollow by default, fill with accent + glow `box-shadow` on hover.
  - **Year markers:** Pill-shaped badges with gradient text, positioned at the timeline origin. Mouse-reactive aurora glow inside.
  - **Month headers:** Uppercase label + count badge + fading `linear-gradient` line separator.
- **Post cards:** Each post is a rounded card with:
  - **Mouse-reactive aurora** (`.post-aurora`): 200px radial glow following cursor.
  - **Mouse-reactive border glow** (`.post-border-glow`): 120px concentrated glow with `mix-blend-mode: screen`.
  - **Day number:** Large bold accent number (with opacity + `text-shadow` glow transition on hover).
  - **Title + description:** Title glows with accent `text-shadow` on hover, description clamped to 2 lines.
  - Hover elevation (`translateY(-2px)`) with multi-layer box-shadow + inset highlight.
- Months translated to Spanish (Enero, Febrero, etc.).

## 20. Search Page — Full Redesign with Interactive Aurora

**File:** `src/pages/search.astro`

Complete visual overhaul of the search page, replacing the basic `Main` layout with a custom aurora-enhanced design:

- **Hero section:** 3 floating aurora orbs with drift animations + mouse-following aurora orb (350px, `blur(50px)`). Gradient glow title "Buscar", Spanish description.
- **Search container card:** Rounded card (`.search-container`) wrapping the Pagefind UI with:
  - **Mouse-reactive aurora** (`.search-aurora`): 300px radial glow following cursor, `blur(40px)`.
  - **Mouse-reactive border glow** (`.search-border-glow`): 150px concentrated glow, `mix-blend-mode: screen`.
  - `:has(.pagefind-ui__search-input:focus)` — card border shifts to accent with outer box-shadow glow when input is focused.
- **Pagefind UI restyling:**
  - Input: `rounded-xl`, subtle background, triple-ring focus glow (`box-shadow` with 3px spread + 20px glow), accent background tint on focus.
  - Results: clean separators (`6% foreground`), accent link with `text-shadow` glow on hover.
  - Highlighted matches (`mark`): accent background tint with rounded corners.
  - Nested results: left border accent line.
  - "Load more" button: rounded pill with accent border, hover glow.
  - Clear button: accent hover background.

## 21. Global Search Modal (Cmd+K)

**Files:**
- `src/components/SearchModal.astro` (new)
- `src/layouts/Layout.astro`
- `src/components/Header.astro`

### SearchModal Component (`SearchModal.astro`)

A full-featured search modal accessible from any page via keyboard shortcut or navbar icon:

- **Trigger:** `⌘K` / `Ctrl+K` keyboard shortcut, or clicking the search icon (lupa) in the navbar.
- **Pagefind integration:** Lazy-loads `@pagefind/default-ui` on first open. Supports `showSubResults`.
- **Aurora background:** 3 animated `radial-gradient` orbs (`blur(70px)`) with independent drift animations floating behind the modal content.
- **Cursor-following glow:** 350px radial glow (`blur(40px)`) that tracks the mouse position inside the modal via `--gx`/`--gy` CSS vars.
- **Sparkles:** 5 decorative dots with staggered `sparkle-pulse` animation (scale 0→1→0 with opacity fade) at fixed positions.
- **Animated border glow:** `conic-gradient` border that rotates continuously using `@property --border-angle` animation, masked to only show on the 1px border edge.
- **Glassmorphism:** Backdrop with `blur(20px) saturate(180%)`, header/footer with `backdrop-filter: blur(12px)` and semi-transparent backgrounds.
- **Spring animation:** Modal entrance uses `cubic-bezier(0.34, 1.56, 0.64, 1)` for a subtle bounce effect.
- **Empty state:** Floating search icon with `empty-float` animation + placeholder text when no query entered.
- **Footer bar:** Navigation hints (↵ abrir, ↑↓ navegar) and "powered by pagefind" credit.
- **Custom scrollbar:** Accent-colored thin scrollbar in the results area.
- **Result hover effects:** Each result gets accent background tint + `box-shadow` glow on hover. Mark highlights have subtle `box-shadow`.
- **Close:** `Escape` key, backdrop click, or close button. Restores `body` scroll on close.

### Layout Integration (`Layout.astro`)

- `<SearchModal />` imported and rendered inside `<body>` of the root layout, making it available on every page.

### Navbar Changes (`Header.astro`)

- **New "Search" nav link:** Added as a regular navigation entry (`<a href="/search">`) alongside Posts, Tags, About, linking to the dedicated search page.
- **Search icon (lupa) repurposed:** Changed from `<LinkButton href="/search">` to `<button data-search-trigger>`, now opens the search modal instead of navigating. Title updated to "Buscar (⌘K)".

## 22. Table of Contents (TOC) — Full Redesign

**File:** `src/styles/typography.css`

Complete visual overhaul of the `<details>/<summary>` TOC generated by `remark-toc` + `remark-collapse`:

- **Card container:** `<details>` styled as a `rounded-2xl` card with translucent border (`border-border/20`), glassmorphism background (`bg-muted/5 backdrop-blur-sm`), subtle shadow on hover/open (`shadow-accent/5`).
- **Summary header:** Flex layout with `font-cartograph`, full foreground text, two SVG icons using `mask-image` technique (hamburger icon left, chevron right). Chevron rotates 180° on `details[open]` via `cubic-bezier` transition.
- **Theme-aligned icons:** Both `summary::before` (list icon) and `summary::after` (chevron) use CSS `mask-image` instead of `background-image`, colored via `background-color: var(--foreground)`. On hover and `details[open]`, icons transition to `var(--accent)`.
- **Links:** Each TOC link has padding (`px-2.5 py-1`), rounded hover background (`bg-accent/8`), and a decorative dot (`::before` pseudo, 6px circle, `accent 50%`). Dot gains accent glow (`box-shadow`) on hover.
- **Nested sub-items:** Indented with a vertical accent line (`border-l-2 border-accent/15`), smaller font (`12px`), subtler dot (4px, `accent 35%`).
- **Compact spacing:** Reduced padding throughout — summary `px-4 py-3`, list `px-4 pb-3 pt-2`, items `py-0.5`, links `gap-1.5`.
- **High contrast text:** Main links at `foreground/85`, sub-links at `foreground/70`, summary at full `foreground`.

## 23. Scroll Offset for Sticky Navbar

**File:** `src/styles/global.css`

Increased `:target` scroll margin from `1rem` to `5rem` so that anchor-linked headings (e.g., from TOC links) land below the sticky navbar instead of being hidden behind it.

```css
:target {
  scroll-margin-block: 5rem;
}
```

## 24. Navbar Search Redesign — ⌘K Modal Trigger + Search Page Link

**File:** `src/components/Header.astro`

Split the desktop search functionality into two distinct elements:

- **Search nav link:** A regular `<a href="/search">` navigation link added alongside Posts, Tags, About. Supports active state highlighting via `isActive("/search")`.
- **⌘K search button:** A styled `<button data-search-trigger>` containing the search icon + a `<kbd>` badge displaying `⌘K`. Opens the global search modal instead of navigating. Styled with:
  - Border pill design (`.nav-search-btn`) with subtle border (`border 50%`), muted background.
  - `.nav-kbd` badge: Small `<kbd>` element with `font-size: 0.6875rem`, `font-weight: 600`, `border`, `box-shadow` bottom inset for a keyboard key appearance.
  - Hover: accent color + accent border tint on both the button and the kbd badge.
- Both elements separated by a vertical divider (`h-4 w-px bg-border/30`).

## 25. Logo SVG Redesign with Cascadia Code Font & Hover Effects

**Files:**
- `src/assets/logo/devosfera.svg`
- `src/components/Header.astro`

### SVG (`devosfera.svg`)

Replaced the previous path-based SVG logo with a text-based SVG using `<text>` elements:

- **Font:** Uses `var(--font-cascadia-code), 'Cascadia Code', monospace`.
- **Structure:** Three `<text>` elements with CSS classes:
  - `.logo-text-left`: "Dev" — dark gray (`rgb(51, 51, 51)`).
  - `.logo-sphere`: "{·}" — red-accent (`rgb(167, 90, 90)`), with `letter-spacing: -30px`.
  - `.logo-text-right`: "sfera" — dark gray, positioned via `<tspan>` with `baseline-shift: sub`.
- **Dark mode:** `dark:invert` applied via Tailwind class on the `<Logo>` component in the Header.

### Hover Effects (`Header.astro` CSS)

Interactive hover animations triggered via `.group:hover` on the parent `<a>` link:

- **Text separation:** `.logo-text-left` translates -4px left, `.logo-text-right` translates +4px right (spring easing `cubic-bezier(0.34, 1.56, 0.64, 1)`).
- **Text glow:** Both text elements get `drop-shadow(0 0 3px rgba(56, 66, 77, 0.2))` on hover.
- **Sphere wiggle:** `.logo-sphere` plays `sphere-wiggle` keyframe animation — a 6-step rotation oscillation (-8° → +5° → -3° → +1° → 0°) with scaling (1.0 → 1.15 → 1.06), using spring easing.
- **Sphere glow:** `drop-shadow(0 0 8px rgba(167, 90, 90, 0.5))` matching the red-accent fill color.
- **`:global()` selectors** used to target SVG classes from scoped Astro CSS.

## 26. Cascadia Code Font Added

**Files:**
- `astro.config.ts`
- `src/layouts/Layout.astro`
- `src/styles/global.css`
- `src/assets/fonts/cascadia-code.woff2`

Added **Cascadia Code** as a local font:

- **Config:** Registered in `astro.config.ts` with `cssVariable: "--font-cascadia-code"`, `fallbacks: ["monospace"]`, `fontProviders.local()`, source `./src/assets/fonts/cascadia-code.woff2`.
- **Layout:** `<Font cssVariable="--font-cascadia-code" preload={[...]} />` added to `Layout.astro` for preloading.
- **Theme:** `--font-cascadia-code: var(--font-cascadia-code)` registered in `@theme inline` block in `global.css`, making `font-cascadia-code` available as a Tailwind utility class.

## 27. BackToTopButton Border Fix

**File:** `src/components/BackToTopButton.astro`

Fixed a CSS class issue where the `border` utility class was missing, causing the border not to render properly:

**Change:**
```astro
<!-- Before -->
border border-border/20 hover:border-accent/40

<!-- After -->
border-border/20 hover:border-accent/40
```

The explicit `border` class was redundant since the border width is already set by `border-border/20`. This fix also slightly improves the visibility threshold for the button (now appears at 20% scroll instead of 30%).

## 28. Mobile Navigation Menu Refactoring

**Files:**
- `src/components/Header.astro`
- `src/scripts/theme.ts`

### Header Component Refactoring

Complete restructure of the mobile navigation menu for better user experience and code maintainability:

**Mobile Menu Changes:**
- **Hamburger animation:** Replaced icon swap with animated three-line hamburger using CSS transforms (`.hamburger-btn`, `.hamburger-line--1/2/3`). Lines animate to X shape on open via rotate/opacity transitions.
- **Separate mobile menu:** New `#mobile-menu` dropdown panel (`.mobile-menu`) replaces the previous fullscreen overlay approach. Uses glassmorphism backdrop blur and slide-down animation.
- **Desktop/Mobile separation:** Desktop navigation links now always visible on `sm:` breakpoint and above. Mobile menu is completely separate structure, not a transformed version of desktop nav.
- **Mobile nav links:** Each link (`.mobile-nav-link`) has staggered fade-in animation via `--i` CSS variable, active state indicator (`.mobile-nav-indicator`), and enhanced touch targets.
- **Logo integration:** Replaced the icon+text logo with the new SVG logo component (`<Logo>`), using `dark:invert` for theme compatibility.

**Desktop Navigation Improvements:**
- Added "Search" link as a regular navigation item (previously only accessible via icon).
- Improved visual consistency with better spacing and separator positioning.
- Maintained existing active state highlighting with refined `.nav-active` styles.

### Theme Toggle Script Enhancement

**File:** `src/scripts/theme.ts`

Improved theme toggle functionality to support both desktop and mobile theme buttons:

```typescript
// Before
document.querySelector("#theme-btn")?.addEventListener("click", () => {
  themeValue = themeValue === LIGHT ? DARK : LIGHT;
  window.theme?.setTheme(themeValue);
  setPreference();
});

// After  
const toggleTheme = () => {
  themeValue = themeValue === LIGHT ? DARK : LIGHT;
  window.theme?.setTheme(themeValue);
  setPreference();
};

// Support both desktop and mobile theme buttons
const themeBtn = document.querySelector("#theme-btn");
const themeBtnMobile = document.querySelector("#theme-btn-mobile");

// Clone and replace to avoid duplicate listeners on view transitions
const freshBtn = themeBtn?.cloneNode(true) as Element | null;
if (themeBtn && freshBtn) {
  themeBtn.replaceWith(freshBtn);
  freshBtn.addEventListener("click", toggleTheme);
}

const freshBtnMobile = themeBtnMobile?.cloneNode(true) as Element | null;
if (themeBtnMobile && freshBtnMobile) {
  themeBtnMobile.replaceWith(freshBtnMobile);
  freshBtnMobile.addEventListener("click", toggleTheme);
}
```

**Key improvements:**
- Supports dual theme toggle buttons (desktop `#theme-btn` and mobile `#theme-btn-mobile`).
- Prevents duplicate event listeners during Astro view transitions by cloning and replacing button elements.
- Single shared `toggleTheme` function for consistency.

