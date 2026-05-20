# Changelog

## Unreleased

- **fix:** Published `styles.css` now includes Tailwind utilities and design tokens used by `Calendar` and other `src/components/ui` primitives. Consumers only need `import "@andreyfedkovich/cozy-ui/styles.css"` — Tailwind in the host app is not required.
- **build:** `build:lib` runs `@tailwindcss/cli` on `src/lib/tailwind.css` and merges output with SCSS module CSS.

## 0.2.1

- **fix:** Published `dist-lib/index.d.ts` is now the real rolled-up declaration bundle (no broken stub pointing at `../dist/lib/index`). `vite-plugin-dts` writes types to the same `outDir` as the library build (`dist-lib`).
- **fix:** Ship `dist-lib/svg-react-shim.d.ts` and a `/// <reference />` in `index.d.ts` so consumers typecheck `*.svg?react` imports from the bundle without missing-module errors (including with `skipLibCheck: false`).
