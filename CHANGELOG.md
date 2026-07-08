# Changelog

Формат основан на [Keep a Changelog](https://keepachangelog.com/).
Версии соответствуют [Semantic Versioning](https://semver.org/) и git-тегам `v*`.

## 0.10.1 - 2026-07-08

- **fix:** `TreeDialogSelect` — при серверном поиске (`searchNodes`) скрывать ранее загруженные ветки, не входящие в результаты и цепочки предков.

## 0.10.0 - 2026-06-04

- **feat:** New `ShowErrorPolicy` presets — `draftFriendly`, `wizardStep`, `savedInvalid`, `onBlurOrSubmit`. Recommended for draft-friendly and wizard forms; legacy `default` unchanged (shows on `hasValue` alone).
- **feat:** Extended `FieldMeta` — `stepSubmitted`, `validationPending`, `errorKind`. `resolveDisplayError` suppresses stale `required` when value is non-empty.
- **feat:** `useFormFields` + `FieldBinding` — replaces typical per-app binding glue. `markStepSubmitted`, `markFormSubmitted`, `resetInteraction`.
- **feat:** `useValidationRequest` — async validate with generation/stale guard and `validationPending`.
- **feat:** `attemptWizardStep`, `attemptFormSubmit` — validate-on-click for wizard and submit (no `disabled={!isValid}`).
- **feat:** `suppressError` prop on field components; dev warning when `error={null}` suppresses invalid `fieldMeta`.
- **feat:** Export `useFieldPresentation`, `FieldErrorCaption`, `FormField`, `hasFieldValue`.
- **docs:** `docs/validation-recipes.md` — recipes, anti-patterns, migration guide and consumer verification checklist.

## 0.9.0 - 2026-06-04

- **feat:** Единый контракт валидации полей — headless API: `FieldMeta`, `ShowErrorPolicy`, `resolveShowError`, `resolveFieldError`, `resolveFieldMessage`, `useFieldState`, `resolveValueChangeHandler`.
- **feat:** `Input`, `Textarea`, `Checkbox`, `Select`, `DialogSelect`, `TreeDialogSelect`, `Calendar` — пропсы `fieldMeta` и `showErrorPolicy`; явный `error` по-прежнему переопределяет meta. Дефолтная политика: `invalid && (touched || submitted || hasValue)`.
- **feat:** Общий A11y для полей — `aria-invalid`, `aria-describedby`, стабильные `id` через `useId()`, сообщение об ошибке с `role="alert"`.
- **feat:** Value picker’ы (`Select`, `DialogSelect`, `TreeDialogSelect`, `Calendar`) — канонический колбэк `onValueChange`; `onChange` оставлен как deprecated alias. На trigger добавлены `onBlur` / `onFocus` для интеграции с формами.
- **docs:** README — раздел Field validation, две семьи колбэков (native `onChange` vs picker `onValueChange`).

## 0.8.0 - 2026-06-02

- **feat:** Split published CSS into three entry points for Tailwind v3 host compatibility: `styles.css` (full bundle), `styles.modules.css` (SCSS modules only), and `styles.tailwind.css` (Tailwind v4 utilities). Existing `import "@andreyfedkovich/cozy-ui/styles.css"` is unchanged.
- **build:** `build:lib` now publishes all three files; `verify-lib-styles.mjs` validates each file and the structural bundle concat.

## 0.7.0 - 2026-05-26

- **feat:** `SettingsView` — composition-first layout for settings pages (`SettingsView.Section`, `.Group`, `.Item`, `.Divider`), declarative `sections`, variants `classic` / `elevated`, densities `comfortable` / `compact`, collapsible sections, left icon badges, row badges (e.g. New/Beta), link rows (`href`, `external`), danger styling, and `render` for full row customization.
- **feat:** `Switch` — iOS-style toggle (green by default, white thumb with shadow), controlled / uncontrolled, sizes `sm` / `md`, optional `blue` color, optional inline `label` to the right, and label tooltip (`tooltipContent`).
- **feat:** `ImageSegmented` — premium segmented control with image previews (Agent/Editor-style); `image` accepts any `ReactNode`.
- **feat:** `SideNav` — `transparent` variant (seamless panel, compact rows, no chrome).

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
