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

