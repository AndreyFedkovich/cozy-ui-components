# @andreyfedkovich/ui-library-placeholder

Starter React UI component library prepared for npm publishing.

## Installation

```bash
npm install @andreyfedkovich/ui-library-placeholder
```

## Usage

```tsx
import { UiLibraryPlaceholder } from "@andreyfedkovich/ui-library-placeholder";
import "@andreyfedkovich/ui-library-placeholder/styles.css";

export function App() {
  return <UiLibraryPlaceholder />;
}
```

## Available exports

- `UiLibraryPlaceholder` — temporary placeholder component for validating package installation and styling.
- `UiLibraryPlaceholderProps` — TypeScript props for the placeholder component.

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

Before publishing, replace the package name, description, and README content with the final library branding.
