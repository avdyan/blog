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

