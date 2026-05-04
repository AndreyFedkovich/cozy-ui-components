
## Проблема

Деплой на Vercel падает с `404: NOT_FOUND` (Vercel edge), потому что:

- `npm run build` собирает проект как **Cloudflare Worker** (через `@cloudflare/vite-plugin` + TanStack Start SSR). Vercel ждёт статику в `dist/` либо адаптер под Vercel — ни того, ни другого нет.
- `package.json` сейчас сконфигурирован как npm-библиотека (`main`, `module`, `exports`, `files`, `prepublishOnly`), и `vite build` в режиме по умолчанию даёт артефакты, несовместимые с Vercel-хостингом сайта.
- Нет `vercel.json` с `outputDirectory` и SPA-fallback, поэтому даже если бы статика собралась, прямые URL отдавали бы 404.

Проект должен решать **две независимые задачи**: публиковать npm-пакет и хостить демо-витрину. Их надо явно разделить.

## Решение: две сборки из одного репо

### 1. Демо-витрина → SPA для Vercel

Демо не нуждается в SSR/server functions. Конвертируем сборку демо в чистый Vite SPA:

- Убрать из дефолтной сборки `@cloudflare/vite-plugin` и TanStack Start SSR-обвязку (оставив их доступными для локальной разработки/Lovable).
- Включить TanStack Router в режиме клиентского SPA: добавить `index.html` + `src/main.tsx`, монтирующий `RouterProvider` от существующего `getRouter()` из `src/router.tsx`. Файлы маршрутов из `src/routes/` остаются — `@tanstack/router-plugin` продолжает генерировать `routeTree.gen.ts`.
- В корневом маршруте `__root.tsx` оставить только `<Outlet/>` без `shellComponent`/`HeadContent`/`Scripts` (это SSR-API). Вынести метаданные в `index.html`.
- Скрипт `build:site` = `vite build` с режимом SPA (output → `dist-site/`). Дефолтный `build` тоже указать на SPA, чтобы Vercel брал его «из коробки».

### 2. npm-пакет → отдельная команда

- Скрипт `build:lib` остаётся (`vite build --mode library`) и собирает в `dist/`, как сейчас.
- `prepublishOnly: npm run build:lib` — публикация в npm не зависит от деплоя сайта.
- Поля `main`/`module`/`exports`/`files` в `package.json` оставляем — они влияют только на `npm publish`, а Vercel их не использует.

### 3. Конфигурация Vercel

Добавить `vercel.json` в корень:

```json
{
  "buildCommand": "npm run build:site",
  "outputDirectory": "dist-site",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

`rewrites` нужен, чтобы прямой переход на `/components/...` отдавал `index.html` и роутер уже на клиенте показывал нужную страницу — иначе Vercel будет возвращать 404 на любых URL кроме `/`.

### 4. Правки `vite.config.ts`

- Сделать конфиг условным: при `mode === "library"` — нынешняя сборка либы; иначе — SPA-сборка демо без `@cloudflare/vite-plugin` и без TanStack Start SSR-плагина (оставить только `@vitejs/plugin-react`, `@tanstack/router-plugin/vite`, `vite-plugin-svgr`, `vite-tsconfig-paths`, `@tailwindcss/vite`).
- В SPA-ветке выставить `build.outDir = "dist-site"`.

### 5. Точка входа SPA

Создать:

- `index.html` в корне с `<div id="root"></div>` и `<script type="module" src="/src/main.tsx">`.
- `src/main.tsx`: импорт `getRouter`, создание роутера, рендер `<RouterProvider router={router}/>` в `#root`. Импорт `./styles.css`.

### 6. Чистка зависимостей (без удаления)

- `react-router-dom` в `dependencies` — не используется, удалить, чтобы не попадал в bundle потребителей пакета.
- Никаких других удалений: `@tanstack/react-start`, `@cloudflare/vite-plugin`, `wrangler.jsonc` остаются для совместимости с Lovable preview.

## Что увидит пользователь после применения

- На Vercel: `npm run build:site` собирает SPA → `dist-site/` → витрина открывается по корню и по любым внутренним маршрутам.
- В Lovable preview: всё работает как раньше (TanStack Start SSR через Cloudflare-плагин при `vite dev`).
- `npm publish` (или `npm run build:lib`) собирает библиотеку независимо.

## Технические детали (файлы)

- ✏️ `package.json` — `scripts.build` = `vite build` (SPA), добавить `build:site`, удалить `react-router-dom` из `dependencies`.
- ➕ `vercel.json` — buildCommand, outputDirectory, SPA rewrites.
- ➕ `index.html` — корневой HTML для SPA.
- ➕ `src/main.tsx` — клиентский bootstrap `RouterProvider`.
- ✏️ `vite.config.ts` — условные плагины и `outDir` в зависимости от `mode`.
- ✏️ `src/routes/__root.tsx` — убрать `shellComponent`/`HeadContent`/`Scripts`, оставить `<Outlet/>` и `notFoundComponent`.
- ➖ `react-router-dom` из `dependencies`.

## Альтернатива (если хотите сохранить SSR)

Можно оставить TanStack Start с SSR и деплоить на Vercel через официальный Vercel-адаптер `@tanstack/react-start` (`target: "vercel"` в Vite-конфиге). Это сложнее в поддержке для библиотечного репо и не даёт преимуществ для статичной демо-витрины — поэтому по умолчанию предлагаю SPA-вариант.
