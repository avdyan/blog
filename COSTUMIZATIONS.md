# Customizations

This document tracks the customizations and fixes applied to the project.

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

