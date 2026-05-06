# Changelog

## 0.2.1

- **fix:** Published `dist-lib/index.d.ts` is now the real rolled-up declaration bundle (no broken stub pointing at `../dist/lib/index`). `vite-plugin-dts` writes types to the same `outDir` as the library build (`dist-lib`).
- **fix:** Ship `dist-lib/svg-react-shim.d.ts` and a `/// <reference />` in `index.d.ts` so consumers typecheck `*.svg?react` imports from the bundle without missing-module errors (including with `skipLibCheck: false`).
