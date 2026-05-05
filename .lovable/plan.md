## Goal

Update the showcase page (`src/routes/index.tsx`) so its title, description, meta tags, and badge match the new package name **Cozy UI** (`@andreyfedkovich/cozy-ui`), and add a link to the live demo (`https://cozy-ui-components.vercel.app`) into the README.

## Changes

### 1. `src/routes/index.tsx` — hero & meta

Update the `head()` meta block:
- `title` and `og:title` → `Cozy UI — Premium React Component Library`
- `description` and `og:description` → A short Cozy UI pitch (premium, typed, SSR-safe, tree-shakeable React components).

Update the hero (`<header>`):
- Badge pill text → `v1.0 · @andreyfedkovich/cozy-ui · npm-ready`
- `<h1>` → `Cozy UI`
- Subheading paragraph → New copy describing Cozy UI as a premium, opinionated React component library (typed end-to-end, SCSS modules, SSR-safe, tree-shakeable ESM + CJS), keeping the reference to `src/lib`.
- Add a CTA row under the subheading with two links:
  - Primary: **View on npm** → `https://www.npmjs.com/package/@andreyfedkovich/cozy-ui`
  - Secondary: **GitHub / README** → `https://github.com/andreyfedkovich/cozy-ui#readme`
  - Tertiary: **Live demo** → `https://cozy-ui-components.vercel.app`

The `BaseBlock` inside "Layout & containers" currently shows `UI Library v1.0 / @company/ui-kit · MIT License` — update it to `Cozy UI v1.0` / `@andreyfedkovich/cozy-ui · MIT License` so it stays consistent.

### 2. `README.md` — Live demo link

Add a **Live demo** badge/link near the top (under the install snippet, inside the centered intro block):

```
[Live demo →](https://cozy-ui-components.vercel.app)
```

Also add a new top-level `## Live demo` section right after the centered intro (before `Table of contents`) with a one-line description and the URL, and add `- [Live demo](#live-demo)` to the table of contents.

## Out of scope

No changes to component code, build config, routing, or package metadata.
