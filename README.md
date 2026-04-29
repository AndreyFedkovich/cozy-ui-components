# @andreyfedkovich/ui-library-placeholder

React UI component library prepared for npm publishing.

## Installation

```bash
npm install @andreyfedkovich/ui-library-placeholder
```

## Usage

```tsx
import { Button, Card, Select } from "@andreyfedkovich/ui-library-placeholder";
import "@andreyfedkovich/ui-library-placeholder/styles.css";

export function App() {
  return <Button variant="primary">Save</Button>;
}
```

## Available exports

- Components: `BaseBlock`, `RadioGroupButton`, `Card`, `Button`, `Carousel`, `CopyTextTrigger`, `TooltipDark`, `TooltipLight`, `Popover`, `Spinner`, `EmptyComponent`, `CollapsableBlock`, `Collapse`, `Select`, `TabsRounded`, `Tabs`, `Tag`, `InputCaption`, `Label`.
- Icons from the package icon set.
- Helpers: `useMeasureElement`, `useDropdownPosition`.
- Styles and color tokens via `styles.css` and `styles/colors`.

## Development

```bash
bun install
bun run dev
```

## Build npm package

```bash
bun run build:lib
```

The package is built into `dist` with ESM, CommonJS, TypeScript declarations, and `styles.css`.

## Publish

```bash
npm publish --access public
```

Before publishing, replace the package name and description with the final library branding.
