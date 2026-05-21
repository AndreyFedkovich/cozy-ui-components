# Changelog

Формат основан на [Keep a Changelog](https://keepachangelog.com/).
Версии соответствуют [Semantic Versioning](https://semver.org/) и git-тегам `v*`.

## 0.6.0 - 2026-05-21

- **feat:** `SideNav` — vertical navigation with `classic` and `aurora` variants, optional collapse, declarative `sections`, composition API (`SideNav.Section`, `SideNav.Item`, `SideNav.Divider`, `SideNav.Custom`), user block, and nested submenu items.
- **feat:** `Textarea` — multiline field with `label`, `error`, `hint` / `hintVariant`, optional label tooltip (`tooltipContent`), and `forwardRef`.

## 0.5.2 - 2026-05-20

- **fix:** Published `styles.css` now includes Tailwind utilities and design tokens used by `Calendar` and other `src/components/ui` primitives. Consumers only need `import "@andreyfedkovich/cozy-ui/styles.css"` — Tailwind in the host app is not required.
- **build:** `build:lib` runs `@tailwindcss/cli` on `src/lib/tailwind.css` and merges output with SCSS module CSS.

## 0.5.1 - 2026-05-20

- Republish of 0.5.0 (no code changes).

## 0.5.0 - 2026-05-20

- **feat:** `Calendar` date picker for forms (`yyyy-MM-dd` value, localized display).
- **feat:** `Label` and field labels for form components.
- **feat:** `Checkbox` with label, error state, and tooltip on the label.

## 0.4.0 - 2026-05-19

- **feat:** `CommentFeed` — workflow comment thread with composer and list layout.

## 0.3.0 - 2026-05-18

- **feat:** `DetailView` — composition-first detail page layout (`DetailView.Header`, `.Section`, `.Field`, etc.).

## 0.2.3 - 2026-05-14

- **feat:** `TreeDialogSelect` — optional confirm-only-leaf mode for tree selection.

## 0.2.2 - 2026-05-07

- **feat:** `TabsRounded` — rounded tab panels variant.

## 0.2.1 - 2026-05-06

- **fix:** Published `dist-lib/index.d.ts` is now the real rolled-up declaration bundle (no broken stub pointing at `../dist/lib/index`). `vite-plugin-dts` writes types to the same `outDir` as the library build (`dist-lib`).
- **fix:** Ship `dist-lib/svg-react-shim.d.ts` and a `/// <reference />` in `index.d.ts` so consumers typecheck `*.svg?react` imports from the bundle without missing-module errors (including with `skipLibCheck: false`).
