## Goal

Give the library a memorable, premium identity and a README that reads like a top-tier OSS product page, with a full API reference and copy-pasteable examples for every exported component.

## 1. Naming — propose "Cozy UI"

Rationale: short, warm, distinct, easy to pronounce, npm-friendly, and pairs well with the soft/premium visual style of the components. Alternatives considered: "Lumen UI", "Soft Stack", "Veil UI", "Atlas UI" — happy to swap if you prefer one.

Identifiers used everywhere:
- npm package: `@andreyfedkovich/cozy-ui` (keeps your scope, frees the name on npm)
- Display name: **Cozy UI**
- Tagline: *A premium, opinionated React component library for crafted product UIs.*

Touched for renaming:
- `package.json` — `name`, `description`, `keywords`, `author`, `license` (MIT), `repository` placeholder, `homepage`, `bugs`, `dist` filenames stay (`ui-library.es.js`/`ui-library.cjs.js`) to avoid touching `vite.config.ts`. If you want filenames renamed too, say the word and I'll update the Vite lib config in the same pass.
- `README.md` — full rewrite (see section 3)
- `src/lib/UiLibraryPlaceholder.tsx` — leave file, only update any visible string referencing the old name (if any).

## 2. README structure (premium, production-ready)

A single `README.md` at repo root, ~600–800 lines, structured for scanability. No emojis in headings (clean, premium tone), tasteful badges, a real Table of Contents, and one runnable example per component.

Sections:

1. **Hero**
   - Centered title `Cozy UI`, tagline, subtle ASCII divider
   - Badge row: npm version, bundle size (shields.io), license MIT, types included, React 18/19, tree-shakeable
   - One-line install + one-line import

2. **Why Cozy UI**
   - 4–6 bullets: premium defaults, SCSS-modules + design tokens, fully typed, headless-friendly (Radix under the hood for dialogs), SSR-safe, zero global CSS leakage, tree-shakeable ESM + CJS.

3. **Installation**
   ```bash
   npm i @andreyfedkovich/cozy-ui
   # or
   pnpm add @andreyfedkovich/cozy-ui
   # or
   bun add @andreyfedkovich/cozy-ui
   ```
   Peer deps note (React ≥ 18). Import the stylesheet once at app root:
   ```ts
   import "@andreyfedkovich/cozy-ui/styles.css";
   ```

4. **Quick start** — minimal `App.tsx` showing `Button`, `Card`, `Tag` together.

5. **Design tokens** — short table of the exported color tokens from `styles/colors`, plus how to reference CSS custom properties from `styles.css`.

6. **Component API** — one subsection per export. Each subsection contains:
   - 1–2 sentence description
   - Props table (name · type · default · description)
   - Minimal usage snippet (copy-paste runnable)
   - "When to use" hint where it matters

   Components covered (matches `src/lib/components/index.ts`):
   - Layout & content: `BaseBlock`, `Card`, `CollapsableBlock`, `Collapse`, `Carousel`, `EmptyComponent`, `Spinner`
   - Inputs & forms: `Button`, `RadioGroupButton`, `Select`, `DialogSelect`, `TreeDialogSelect`, `InputCaption`, `Label`
   - Navigation: `Tabs`, `TabsRounded`, `Stepper`
   - Overlays: `Popover`, `TooltipDark`, `TooltipLight`
   - Utility: `Tag`, `CopyTextTrigger`
   - Workflow: `ApprovalRoute` (highlighted as a flagship component with a fuller example showing levels/stages/approvers + edit mode)

7. **Hooks & helpers** — `useMeasureElement`, `useDropdownPosition` with signatures and a tiny example each.

8. **Icons** — note that the SVG icon set is exported from the package (`import { DoneIcon, WarnIcon, ... } from "@andreyfedkovich/cozy-ui"`), with a short list of available icons.

9. **TypeScript** — note about exported types (`ButtonVariant`, `CustomOption`, `ApprovalLevel`, etc.) and that `.d.ts` ships in the package.

10. **SSR & framework support** — works with Next.js, TanStack Start, Remix, Vite SPA. Note: client-only components (anything using portals: `Select`, `DialogSelect`, `TreeDialogSelect`, `Popover`, tooltips) — if SSR-rendering, gate or `dynamic()`-import.

11. **Theming** — how to override CSS variables in user app, brief example.

12. **Accessibility** — Radix primitives under the hood for dialogs/labels; keyboard-friendly Stepper/Tabs; focus-visible rings respected.

13. **Local development**
    ```bash
    bun install
    bun run dev          # demo playground
    bun run build:lib    # produce dist/
    bun run lint
    ```

14. **Publishing**
    ```bash
    npm publish --access public
    ```
    Note about `prepublishOnly` running the lib build automatically.

15. **Contributing** — short, pointing to PRs welcome and code style (Prettier + ESLint).

16. **License** — MIT © Andrey Fedkovich.

## 3. Example quality bar

Every snippet must:
- Compile against the actual exported API (verified against the source files I read).
- Use realistic prop values, not `foo`/`bar`.
- Be ≤ 20 lines.
- Show the most common use case, not the exhaustive one.

For `ApprovalRoute`, the example will show a 3-level route with one rejected, one current, and one pending stage to demonstrate all visual states, plus an `editable` prop variant in a second snippet.

## 4. Files to change

- `package.json` — name, description, keywords, author, license, repository, homepage, bugs.
- `README.md` — full rewrite per section 2.
- (Optional, ask after) `vite.config.ts` if you want bundle filenames renamed to `cozy-ui.es.js`.

## 5. What I will NOT do in this pass

- Won't change source code of components or their exported APIs.
- Won't rename the npm scope (`@andreyfedkovich`) — only the package suffix.
- Won't add new badges that require external CI setup; only badges that work from npm/shields.io out of the box.

Approve and I'll implement in one pass.