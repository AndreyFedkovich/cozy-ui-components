## Проблема

В Lovable preview стили не применяются, потому что dev-режим использует TanStack Start SSR (через `@lovable.dev/vite-tanstack-config`), а не SPA-вход `index.html` + `src/main.tsx`.

Текущая ситуация:
- SPA-сборка для Vercel (`build:site`): использует `index.html` → `src/main.tsx` → импорт `./styles.css` → **работает**.
- Lovable dev preview (TanStack Start SSR): рендерит через `src/routes/__root.tsx`, который НЕ импортирует `styles.css` и НЕ объявляет shell с `<head>`/`<body>` → **CSS не загружается**.

В TanStack Start v1 root-route обязан задавать `head` (для тегов `<link>`/`<title>`) и `shellComponent` (html/head/body), либо явно импортировать CSS как side-effect, чтобы Vite вставил его в SSR-документ.

## Решение

Привести `src/routes/__root.tsx` к канонической форме TanStack Start:

1. Импортировать `../styles.css` как side-effect — это заставит Vite/TanStack Start включить CSS в документ как при SSR (preview), так и в клиентском бандле.
2. Добавить `head()` с `<title>`, `<meta>` (description, og-теги Cozy UI) и canonical link на `https://cozy-ui-components.vercel.app` — сейчас они есть только в `index.html`, а это файл для SPA, который dev-режимом не используется.
3. Добавить `shellComponent` (html/head/body + `HeadContent`/`Scripts`) — стандартный shell TanStack Start.

Это даст единый источник истины: одни и те же стили и метаданные будут работать и в Lovable preview (SSR), и в SPA-сборке для Vercel.

## Технические детали

Файл `src/routes/__root.tsx`:

```tsx
import {
  Outlet,
  Link,
  HeadContent,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import "../styles.css";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Cozy UI — Premium React Component Library" },
      {
        name: "description",
        content:
          "Cozy UI — premium, themeable React component library. Live showcase, API reference and design tokens.",
      },
      { property: "og:title", content: "Cozy UI — Premium React Component Library" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://cozy-ui-components.vercel.app" },
    ],
    links: [
      { rel: "canonical", href: "https://cozy-ui-components.vercel.app" },
    ],
  }),
  component: RootComponent,
  shellComponent: RootShell,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() {
  return <Outlet />;
}

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function NotFoundComponent() { /* без изменений */ }
```

Важно: `import "../styles.css"` в route-файле обязателен — это единственный надёжный способ подцепить Tailwind CSS в TanStack Start dev-сервере. Сейчас CSS импортируется только из `src/main.tsx`, который не выполняется в SSR-режиме Lovable.

## Затронутые файлы

- `src/routes/__root.tsx` — добавить shellComponent, head(), импорт styles.css.

SPA-сборка для Vercel продолжит работать как раньше (там CSS дополнительно импортируется через `src/main.tsx` — двойной импорт безопасен, Vite дедуплицирует).
