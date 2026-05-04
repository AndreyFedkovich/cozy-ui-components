## Problem

`src/routes/index.tsx` (~1100 lines) eagerly mounts 20+ interactive components from `src/lib` on a single page: 2x Tabs, 2x Stepper, Carousel, 3 advanced Selects (one with 12 CFO options, one with 48 employees, TreeDialogSelect), Popover, Tooltips, ApprovalRoute (4 уровня + DialogSelect внутри в режиме «Редактирование»), 3 Spinner cards, etc. Каждый такой компонент тянет SCSS-модуль, ResizeObserver и эффекты. На первый рендер браузер делает огромную синхронную работу — отсюда «зависание» и долгий отклик при клике.

Попутно есть лишняя работа на каждый кадр в нескольких компонентах:
- `Popover.tsx` — `useEffect` зависит от `open`, поэтому при каждом тогле listener click + scroll + resize пересоздаётся.
- `RadioGroupButton.tsx` — `useMeasureElement(buttonRefs.current.get(...))` читает ref в render-фазе; элемент в первом рендере отсутствует, измерение не запускается до следующего ре-рендера, а каждый scroll/resize страницы дёргает `setRect` без сравнения значений.
- На странице `index.tsx` массивы `cfoOptions`/`employeeOptions` и `deptTree` создаются на верхнем уровне модуля — это норм, но `cfoOptions.filter(...)` и `collectAllWithPaths(...)` пересчитываются на каждый рендер.

## Plan

### 1. Разбить страницу на секции с ленивой подгрузкой
- Вынести каждую категорию (Layout, Inputs, Navigation, Feedback, Workflow) в отдельный компонент `src/routes/_sections/<Name>Section.tsx`.
- В `src/routes/index.tsx` импортировать секции через `React.lazy` + `Suspense` с лёгким fallback (Spinner / skeleton).
- Hero и первая секция (Layout) остаются eager, остальные грузятся по мере прокрутки через `IntersectionObserver` (компонент-обёртка `<LazySection>`), чтобы первый paint был быстрым и страница не «вешалась».

### 2. Убрать лишние ре-рендеры в lib-компонентах
- `Popover.tsx`: разделить эффекты — отдельно `click` listener (deps: `[target, open, setOpen, toggle]` без переподписки на каждый toggle, использовать ref на `open`), отдельно `scroll`/`resize` (deps: `[target, updateRect]`). Сравнивать `rect` перед `setRect`, чтобы не плодить ре-рендеры.
- `useMeasureElement.ts`: добавить equality-check перед `setHeight`/`setWidth`.
- `RadioGroupButton.tsx`: хранить активный элемент в state через `useEffect`, чтобы `useMeasureElement` стабильно получал HTMLElement.

### 3. Снизить вес демо-данных
- В `src/routes/index.tsx` обернуть тяжёлые вычисления в `useMemo` (`cfoOptions.filter`, `collectAllWithPaths`).
- Сократить `employeeOptions` с 48 до 24 (для демо достаточно, lazy-load в `loadEmployees` остаётся).
- ApprovalRoute: «Редактирование» инициализировать выключенным (как сейчас) и не монтировать `DialogSelect` внутри стадий, пока режим = «Просмотр» — это срежет десятки компонентов в первичном рендере.

### 4. Проверка
- Локальная сборка `bun run build` + ручной прогон страницы.
- Profile через `browser--performance_profile` до/после.
- Убедиться, что все интерактивные компоненты по-прежнему работают (табы, степпер, селекты, попап, аппрувы).

## Файлы, которые изменятся

- `src/routes/index.tsx` — разбить на секции, lazy-импорты, useMemo.
- `src/routes/_sections/LayoutSection.tsx` (new)
- `src/routes/_sections/InputsSection.tsx` (new)
- `src/routes/_sections/NavigationSection.tsx` (new)
- `src/routes/_sections/FeedbackSection.tsx` (new)
- `src/routes/_sections/WorkflowSection.tsx` (new)
- `src/routes/_sections/LazySection.tsx` (new — IntersectionObserver wrapper)
- `src/lib/components/Popover/Popover.tsx` — раздельные эффекты, equality check для rect.
- `src/lib/components/TooltipLight/TooltipLight.tsx` — equality check для rect.
- `src/lib/helpers/hooks/useMeasureElement.ts` — equality check для height/width.
- `src/lib/components/RadioGroupButton/RadioGroupButton.tsx` — стабилизировать ref активной кнопки через state.

После одобрения переключусь в build-режим и сделаю изменения.