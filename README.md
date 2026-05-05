<div align="center">

# Cozy UI

**A premium, opinionated React component library for crafted product UIs.**

Typed end-to-end · SCSS-modules with design tokens · SSR-safe · Tree-shakeable ESM + CJS

[![npm version](https://img.shields.io/npm/v/@andreyfedkovich/cozy-ui.svg?style=flat-square&color=0A84FF)](https://www.npmjs.com/package/@andreyfedkovich/cozy-ui)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@andreyfedkovich/cozy-ui?style=flat-square&color=0A84FF)](https://bundlephobia.com/package/@andreyfedkovich/cozy-ui)
[![types included](https://img.shields.io/npm/types/@andreyfedkovich/cozy-ui?style=flat-square&color=0A84FF)](https://www.npmjs.com/package/@andreyfedkovich/cozy-ui)
[![license MIT](https://img.shields.io/npm/l/@andreyfedkovich/cozy-ui?style=flat-square&color=0A84FF)](./LICENSE)
[![react 18 / 19](https://img.shields.io/badge/react-18%20%7C%2019-0A84FF?style=flat-square)](https://react.dev)

```bash
npm i @andreyfedkovich/cozy-ui
```

**[Live demo →](https://cozy-ui-components.vercel.app)**

</div>

---

## Table of contents

- [Live demo](#live-demo)
- [Why Cozy UI](#why-cozy-ui)
- [Installation](#installation)
- [Quick start](#quick-start)
- [Design tokens](#design-tokens)
- [Component API](#component-api)
  - [Layout & content](#layout--content) — `BaseBlock`, `Card`, `CollapsableBlock`, `Collapse`, `Carousel`, `EmptyComponent`, `Spinner`
  - [Inputs & forms](#inputs--forms) — `Button`, `RadioGroupButton`, `Select`, `DialogSelect`, `TreeDialogSelect`, `InputCaption`, `Label`
  - [Navigation](#navigation) — `Tabs`, `TabsRounded`, `Stepper`
  - [Overlays](#overlays) — `Popover`, `TooltipDark`, `TooltipLight`
  - [Utility](#utility) — `Tag`, `CopyTextTrigger`
  - [Workflow](#workflow) — `ApprovalRoute`
- [Hooks & helpers](#hooks--helpers)
- [Icons](#icons)
- [TypeScript](#typescript)
- [SSR & framework support](#ssr--framework-support)
- [Theming](#theming)
- [Accessibility](#accessibility)
- [Local development](#local-development)
- [Publishing](#publishing)
- [Contributing](#contributing)
- [License](#license)

---

## Live demo

Explore every component in the browser: **<https://cozy-ui-components.vercel.app>**

---

## Why Cozy UI

- **Premium defaults out of the box.** Soft shadows, generous spacing, calm motion — no theming required to look polished.
- **Tokens you can trust.** Colors, radii, and surfaces are exported as both CSS custom properties and TypeScript constants.
- **Typed end-to-end.** Generics on `Select`, `DialogSelect`, `TreeDialogSelect`, `Carousel`, and `RadioGroupButton` — your data, your types.
- **Headless where it matters.** Dialogs and labels are powered by Radix primitives; positioning by `@floating-ui/react`.
- **SSR-safe.** Works in Next.js, TanStack Start, Remix, and any Vite SPA. Portals are guarded.
- **Zero global CSS leakage.** SCSS modules everywhere. One stylesheet to import, no surprises.
- **Tree-shakeable.** Ships ESM + CJS + `.d.ts`. Pay only for what you import.

---

## Installation

```bash
npm  i @andreyfedkovich/cozy-ui
pnpm add @andreyfedkovich/cozy-ui
bun  add @andreyfedkovich/cozy-ui
yarn add @andreyfedkovich/cozy-ui
```

Peer dependencies: **React ≥ 18** and **react-dom ≥ 18** (React 19 supported).

Import the stylesheet **once** at your app root:

```ts
import "@andreyfedkovich/cozy-ui/styles.css";
```

---

## Quick start

```tsx
import { Button, Card, Tag } from "@andreyfedkovich/cozy-ui";
import "@andreyfedkovich/cozy-ui/styles.css";

export default function App() {
  return (
    <div style={{ display: "grid", gap: 16, padding: 24 }}>
      <Card text="Welcome to Cozy UI" height={160} />
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Tag>New</Tag>
        <Button variant="primary" onClick={() => console.log("hi")}>
          Get started
        </Button>
      </div>
    </div>
  );
}
```

---

## Design tokens

Tokens ship two ways:

1. **CSS custom properties** — applied globally by `styles.css` and consumable from any stylesheet.
2. **TypeScript constants** — re-exported from the package root, ideal for inline styles or chart libraries.

```ts
import { colors } from "@andreyfedkovich/cozy-ui";

const accent = colors.blue03; // typed string
```

| Group       | Tokens (excerpt)                                  |
| ----------- | ------------------------------------------------- |
| Brand       | `blue01` … `blue07`                               |
| Neutrals    | `gray01` … `gray09`, `white`, `black`             |
| Status      | `green`, `red`, `yellow`                          |
| Surfaces    | `surfacePrimary`, `surfaceMuted`, `surfaceRaised` |

Override a token in your app's CSS:

```css
:root {
  --cozy-blue-03: #2563eb;
}
```

---

## Component API

Every snippet below is copy-paste runnable against the real exports.

### Layout & content

#### `BaseBlock`

A titled section wrapper with optional subtitle. Use it as the building block of dashboards and forms.

| Prop       | Type              | Default | Description                          |
| ---------- | ----------------- | ------- | ------------------------------------ |
| `id`       | `string`          | —       | Anchor id for in-page navigation.    |
| `title`    | `ReactNode`       | —       | Section title.                       |
| `subtitle` | `ReactNode`       | —       | Supporting copy under the title.     |
| `children` | `ReactNode`       | —       | Section content.                     |
| `className`| `string`          | —       | Additional class on the root.        |

```tsx
import { BaseBlock } from "@andreyfedkovich/cozy-ui";

<BaseBlock title="Profile" subtitle="Public information visible to teammates">
  {/* form content */}
</BaseBlock>;
```

#### `Card`

A premium content tile with optional background image and link behavior.

| Prop              | Type                | Default | Description                          |
| ----------------- | ------------------- | ------- | ------------------------------------ |
| `text`            | `string`            | —       | Title rendered inside the card.      |
| `width`           | `number`            | —       | Fixed width in px.                   |
| `height`          | `number`            | —       | Fixed height in px.                  |
| `backgroundColor` | `string`            | —       | CSS color for the surface.           |
| `imageUrl`        | `string`            | —       | Background image URL.                |
| `textColor`       | `string`            | —       | Title color override.                |
| `link`            | `string`            | —       | If provided, renders as a `<Link>`.  |
| `className`       | `string`            | —       | Extra class.                         |

```tsx
import { Card } from "@andreyfedkovich/cozy-ui";

<Card
  text="Q4 highlights"
  imageUrl="/covers/q4.jpg"
  height={220}
  link="/reports/q4"
/>;
```

#### `CollapsableBlock`

A block with a header that expands and collapses its content.

```tsx
import { CollapsableBlock } from "@andreyfedkovich/cozy-ui";

<CollapsableBlock title="Advanced settings">
  {/* hidden by default */}
</CollapsableBlock>;
```

#### `Collapse`

Low-level animated open/close primitive — give it `isOpen` and children.

| Prop      | Type      | Default | Description                       |
| --------- | --------- | ------- | --------------------------------- |
| `isOpen`  | `boolean` | `false` | Controls expansion.               |
| `children`| `ReactNode` | —     | Collapsible content.              |

```tsx
import { Collapse } from "@andreyfedkovich/cozy-ui";
import { useState } from "react";

const [open, setOpen] = useState(false);

<>
  <button onClick={() => setOpen((v) => !v)}>Toggle</button>
  <Collapse isOpen={open}>Hidden content</Collapse>
</>;
```

#### `Carousel`

Generic, typed carousel with captions. Items must have an `id`.

```tsx
import { Carousel } from "@andreyfedkovich/cozy-ui";

const slides = [
  { id: 1, src: "/a.jpg", caption: "Atlas" },
  { id: 2, src: "/b.jpg", caption: "Borealis" },
];

<Carousel
  items={slides}
  renderItem={(s) => <img src={s.src} alt={s.caption} />}
/>;
```

#### `EmptyComponent`

Friendly empty state with illustration, title, and description.

```tsx
import { EmptyComponent } from "@andreyfedkovich/cozy-ui";

<EmptyComponent title="Nothing here yet" description="Create your first item to get started." />;
```

#### `Spinner`

Loading indicator with sizes `extraSmall | small | medium | large`.

```tsx
import { Spinner } from "@andreyfedkovich/cozy-ui";

<Spinner size="medium" />;
```

---

### Inputs & forms

#### `Button`

| Prop      | Type                                                                    | Default     | Description              |
| --------- | ----------------------------------------------------------------------- | ----------- | ------------------------ |
| `variant` | `"default" \| "primary" \| "secondary" \| "text" \| "link" \| "danger"` | `"default"` | Visual style.            |
| `size`    | `"small" \| "medium" \| "large"`                                        | `"medium"`  | Control size.            |
| `loading` | `boolean`                                                               | `false`     | Shows inline spinner.    |
| `disabled`| `boolean`                                                               | `false`     | Disabled state.          |
| `...rest` | `ButtonHTMLAttributes<HTMLButtonElement>`                               | —           | All native button props. |

```tsx
import { Button } from "@andreyfedkovich/cozy-ui";

<Button variant="primary" size="large" loading>
  Saving…
</Button>;
```

#### `RadioGroupButton`

Segmented radio group, generic over its option value.

```tsx
import { RadioGroupButton } from "@andreyfedkovich/cozy-ui";
import { useState } from "react";

const [view, setView] = useState<"grid" | "list">("grid");

<RadioGroupButton
  value={view}
  onChange={setView}
  options={[
    { value: "grid", label: "Grid" },
    { value: "list", label: "List" },
  ]}
/>;
```

#### `Select`

Powerful, virtualized-friendly select with `single` and `multiple` modes, search, custom rendering, and table layout.

| Prop          | Type                                  | Default    | Description                          |
| ------------- | ------------------------------------- | ---------- | ------------------------------------ |
| `mode`        | `"single" \| "multiple"`              | —          | Selection mode.                      |
| `value`       | `CustomOption \| CustomOption[]`      | —          | Current value.                       |
| `options`     | `CustomOption[]`                      | —          | Available options.                   |
| `onChange`    | `(option) => void`                    | —          | Selection callback.                  |
| `onSearch`    | `(value: string) => void`             | —          | Async search hook.                   |
| `template`    | `"list" \| "table"`                   | `"list"`   | Dropdown layout.                     |
| `columns`     | `SelectColumn[]`                      | —          | Required when `template="table"`.    |
| `isLoading`   | `boolean`                             | `false`    | Show loading state in dropdown.      |
| `error`       | `string \| null`                      | —          | Validation message.                  |
| `label`       | `ReactNode`                           | —          | Field label.                         |

```tsx
import { Select, type CustomOption } from "@andreyfedkovich/cozy-ui";
import { useState } from "react";

const options: CustomOption<unknown, string>[] = [
  { value: "design", label: "Design" },
  { value: "engineering", label: "Engineering" },
];

const [value, setValue] = useState<CustomOption<unknown, string> | null>(null);

<Select
  mode="single"
  label="Department"
  placeholder="Pick one"
  value={value}
  options={options}
  onChange={setValue}
/>;
```

#### `DialogSelect`

Dialog-based picker for large datasets — search + paginated loading + multi-select.

```tsx
import { DialogSelect } from "@andreyfedkovich/cozy-ui";

<DialogSelect
  title="Add reviewer"
  placeholder="Choose a person"
  loadOptions={async ({ search, page, pageSize }) => {
    const res = await fetch(`/api/people?q=${search}&page=${page}&size=${pageSize}`);
    const { items, total } = await res.json();
    return { options: items.map((p) => ({ value: p.id, label: p.name })), total };
  }}
  onSelect={(opt) => console.log(opt)}
/>;
```

#### `TreeDialogSelect`

Hierarchical picker with lazy-loaded branches and search.

```tsx
import { TreeDialogSelect } from "@andreyfedkovich/cozy-ui";

<TreeDialogSelect
  title="Pick a department"
  loadNodes={async ({ parentId }) => ({ nodes: await fetchChildren(parentId) })}
  searchNodes={async ({ search }) => ({ nodes: await searchTree(search) })}
  onSelect={(node) => console.log(node)}
/>;
```

#### `InputCaption`

Small caption row under an input — supports neutral, error, and success tones.

```tsx
import { InputCaption } from "@andreyfedkovich/cozy-ui";

<InputCaption type="error">Email is required.</InputCaption>;
```

#### `Label`

Accessible label, pairs with any input via `htmlFor`.

```tsx
import { Label } from "@andreyfedkovich/cozy-ui";

<Label htmlFor="email">Email</Label>;
```

---

### Navigation

#### `Tabs`

Classic underlined tabs.

```tsx
import { Tabs } from "@andreyfedkovich/cozy-ui";
import { useState } from "react";

const [tab, setTab] = useState("overview");

<Tabs
  value={tab}
  onChange={setTab}
  items={[
    { value: "overview", label: "Overview" },
    { value: "activity", label: "Activity" },
  ]}
/>;
```

#### `TabsRounded`

Pill-shaped variant — great for filter bars.

```tsx
import { TabsRounded } from "@andreyfedkovich/cozy-ui";

<TabsRounded
  value="all"
  onChange={(v) => console.log(v)}
  items={[
    { value: "all", label: "All" },
    { value: "open", label: "Open" },
    { value: "closed", label: "Closed" },
  ]}
/>;
```

#### `Stepper`

Linear, numbered progress for multi-step flows.

| Prop      | Type             | Default | Description                                   |
| --------- | ---------------- | ------- | --------------------------------------------- |
| `items`   | `StepperItem[]`  | —       | Step definitions.                             |
| `current` | `number`         | `0`     | Index of the active step.                     |
| `onStepClick` | `(index) => void` | —   | Optional click handler for completed steps.   |

```tsx
import { Stepper } from "@andreyfedkovich/cozy-ui";

<Stepper
  current={1}
  items={[
    { title: "Account" },
    { title: "Profile" },
    { title: "Review" },
  ]}
/>;
```

---

### Overlays

#### `Popover`

Floating panel anchored to a trigger element. Positioning powered by `@floating-ui/react`.

```tsx
import { Popover, Button } from "@andreyfedkovich/cozy-ui";

<Popover trigger={<Button>Open</Button>} placement="bottom-start">
  <div style={{ padding: 12 }}>Anchored content</div>
</Popover>;
```

#### `TooltipDark` / `TooltipLight`

Two tonal variants of the same tooltip primitive.

| Prop        | Type                                | Default     | Description                |
| ----------- | ----------------------------------- | ----------- | -------------------------- |
| `content`   | `ReactNode`                         | —           | Tooltip body.              |
| `placement` | `TooltipPlacement`                  | `"top"`     | Floating placement.        |
| `trigger`   | `"hover" \| "click"`                | `"hover"`   | Activation trigger.        |
| `children`  | `ReactNode`                         | —           | The anchor element.        |

```tsx
import { TooltipDark } from "@andreyfedkovich/cozy-ui";

<TooltipDark content="Copy to clipboard" placement="top">
  <button aria-label="copy">⧉</button>
</TooltipDark>;
```

---

### Utility

#### `Tag`

Compact label for status, categories, counts.

```tsx
import { Tag } from "@andreyfedkovich/cozy-ui";

<Tag isSmall onClick={() => {}}>Beta</Tag>;
```

#### `CopyTextTrigger`

Wraps any element to copy a string to clipboard, with built-in feedback.

```tsx
import { CopyTextTrigger } from "@andreyfedkovich/cozy-ui";

<CopyTextTrigger text="cozy-ui">
  <button>Copy package name</button>
</CopyTextTrigger>;
```

---

### Workflow

#### `ApprovalRoute`

The flagship workflow component. Renders a premium vertical timeline of **levels → stages → approvers** with statuses, rejection reasons, current-level highlight, empty-approver hints, and an optional editing mode.

| Prop              | Type                                              | Default | Description                                              |
| ----------------- | ------------------------------------------------- | ------- | -------------------------------------------------------- |
| `levels`          | `ApprovalLevel[]`                                 | —       | Sequential levels; each contains parallel `stages`.      |
| `editable`        | `boolean`                                         | `false` | Enables add/remove controls.                             |
| `title`           | `string`                                          | —       | Header title.                                            |
| `eyebrow`         | `string`                                          | —       | Small label above the title.                             |
| `loadApprovers`   | `(params) => Promise<{ options, total? }>`        | —       | Async source for the "add approver" dialog.              |
| `onAddLevel`      | `(name) => void`                                  | —       | Edit callback.                                           |
| `onRemoveLevel`   | `(levelId) => void`                               | —       | Edit callback.                                           |
| `onAddStage`      | `(levelId, name) => void`                         | —       | Edit callback.                                           |
| `onRemoveStage`   | `(levelId, stageId) => void`                      | —       | Edit callback.                                           |
| `onAddApprover`   | `(levelId, stageId, person) => void`              | —       | Edit callback.                                           |
| `onRemoveApprover`| `(levelId, stageId, approverId) => void`          | —       | Edit callback.                                           |

View mode — covers the three approver states (rejected, current, pending):

```tsx
import { ApprovalRoute, type ApprovalLevel } from "@andreyfedkovich/cozy-ui";

const levels: ApprovalLevel[] = [
  {
    id: "l1",
    name: "Manager review",
    status: "completed",
    stages: [{
      id: "s1", name: "Direct manager",
      approvers: [{ id: "u1", fullName: "A. Ivanova", status: "approved", actedAt: "2026-04-28" }],
    }],
  },
  {
    id: "l2",
    name: "Finance",
    status: "current",
    stages: [
      { id: "s2", name: "Budget owner",
        approvers: [{ id: "u2", fullName: "M. Petrov", status: "pending" }] },
      { id: "s3", name: "Controller",
        approvers: [{ id: "u3", fullName: "S. Orlov", status: "rejected", actedAt: "2026-05-01", rejectReason: "Out of budget" }] },
    ],
  },
  {
    id: "l3", name: "Director sign-off", status: "pending",
    stages: [{ id: "s4", name: "Director", approvers: [] }], // empty → "approver not assigned"
  },
];

<ApprovalRoute title="Purchase request #4821" eyebrow="Approval" levels={levels} />;
```

Edit mode:

```tsx
<ApprovalRoute
  title="Route editor"
  editable
  levels={levels}
  loadApprovers={async ({ search, page, pageSize }) => {
    const res = await fetch(`/api/people?q=${search}&page=${page}&size=${pageSize}`);
    const { items, total } = await res.json();
    return { options: items.map((p) => ({ value: p.id, label: p.fullName })), total };
  }}
  onAddLevel={(name) => /* ... */ undefined}
  onAddStage={(levelId, name) => /* ... */ undefined}
  onAddApprover={(levelId, stageId, person) => /* ... */ undefined}
  onRemoveApprover={(levelId, stageId, approverId) => /* ... */ undefined}
/>;
```

---

## Hooks & helpers

### `useMeasureElement`

Tracks the size of a DOM element via `ResizeObserver`.

```ts
import { useMeasureElement } from "@andreyfedkovich/cozy-ui";

const { ref, width, height } = useMeasureElement<HTMLDivElement>();

<div ref={ref}>{width} × {height}</div>;
```

### `useDropdownPosition`

Calculates a flip-aware dropdown position relative to a trigger. Used internally by `Select`.

---

## Icons

The library ships its SVG icon set as React components. Tree-shaken, currentColor-aware.

```ts
import { DoneIcon, WarnIcon, CrossIcon, SearchIcon, ArrowDownIcon } from "@andreyfedkovich/cozy-ui";
```

Available icons include: `ArrowDownIcon`, `ArrowRightIcon`, `CameraIcon`, `CancelIcon`, `ChartIcon`, `ChatIcon`, `CheckGreenIcon`, `ClockIcon`, `CloseRedIcon`, `CopyIcon`, `CrossIcon`, `DoneIcon`, `DownloadIcon`, `EditIcon`, `EmptyIcon`, `EnvelopIcon`, `FeedbackIcon`, `FilterIcon`, `GridIcon`, `HeartIcon`, `HelpIcon`, `HomeIcon`, `InfoIcon`, `ListIcon`, `MarketIcon`, `MessageIcon`, `PhoneIcon`, `PlaneIcon`, `ProfileIcon`, `ReloadIcon`, `SearchIcon`, `SettingsIcon`, `WalletIcon`, `WarnIcon`, and more.

---

## TypeScript

Cozy UI is written in TypeScript and ships `.d.ts` declarations. All public types are re-exported from the package root:

```ts
import type {
  ButtonVariant, ButtonSize,
  CustomOption, SelectColumn,
  DialogSelectProps, DialogSelectColumn,
  TreeDialogSelectProps, TreeNode,
  StepperItem, StepperProps,
  TooltipProps, TooltipPlacement, TooltipTrigger,
  CarouselProps,
  CopyTextTriggerProps,
  ApprovalRouteProps, ApprovalLevel, ApprovalStage, Approver, ApprovalStatus,
} from "@andreyfedkovich/cozy-ui";
```

---

## SSR & framework support

Cozy UI runs in **Next.js (App / Pages router)**, **TanStack Start**, **Remix**, and any **Vite SPA**.

Components that use portals — `Select`, `DialogSelect`, `TreeDialogSelect`, `Popover`, `TooltipDark`, `TooltipLight` — render on the client. In Next.js App Router, mark consuming files with `"use client"` (or import them through a client boundary). In TanStack Start they work out of the box inside route components.

---

## Theming

Override CSS variables in your global stylesheet, after Cozy UI's import:

```css
@import "@andreyfedkovich/cozy-ui/styles.css";

:root {
  --cozy-blue-03: #2563eb;
  --cozy-radius-md: 14px;
  --cozy-shadow-raised: 0 12px 32px -12px rgb(15 23 42 / 0.18);
}
```

For per-component overrides, every component accepts a `className` prop and uses CSS modules — your class wins over module hashes thanks to a single trailing `className` slot.

---

## Accessibility

- Dialogs (`DialogSelect`, `TreeDialogSelect`, internal name dialogs) are built on **Radix Dialog** — focus trap, ESC to close, scroll lock.
- `Label` is built on **Radix Label** with proper `for`/`id` association.
- `Stepper` and `Tabs` are keyboard navigable.
- Focus rings respect `:focus-visible`, never blanket-suppressed.
- Color tokens meet WCAG AA contrast for text-on-surface combinations.

---

## Local development

```bash
bun install
bun run dev          # demo playground at http://localhost:5173
bun run build:lib    # produce dist/ (ESM + CJS + .d.ts + styles.css)
bun run lint
bun run format
```

The demo playground (`src/routes/index.tsx`) showcases every exported component and is the easiest place to iterate on a new variant.

---

## Publishing

```bash
npm publish --access public
```

`prepublishOnly` runs `build:lib` automatically, so you publish exactly what's in `dist/`. Bump the version in `package.json` (semver) before each release.

---

## Contributing

PRs are welcome. Please:

1. Run `bun run lint && bun run format` before pushing.
2. Add the new component to `src/lib/components/index.ts` and demo it in `src/routes/index.tsx`.
3. Document any new prop in this README.

---

## License

MIT © Andrey Fedkovich