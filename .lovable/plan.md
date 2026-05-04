## Симптом

На `https://cozy-ui-components.vercel.app` страница зависает после блока **Stepper**. Профайлинг подтверждает проблему: `Script Duration: 73 секунды` при 986 DOM-узлах и 532 слушателях событий — JavaScript-движок занят постоянными перерисовками. CPU-профайлер не успевает запуститься (`context deadline exceeded`).

В Lovable preview та же страница работает, потому что preview рендерится в SSR-режиме и часть «тяжёлых» компонентов сначала отдаётся как HTML — клиентская сторона догоняет постепенно. SPA-сборка на Vercel запускает все эффекты синхронно при первом рендере.

## Главная причина

Демо-секция «TooltipLight + Popover» (строки 927–949 в `src/routes/index.tsx`) собирает несколько компонентов с дорогими side-эффектами в одном узле, который монтируется одновременно:

```tsx
<Button id={tooltipTargetId} variant="secondary">Light tooltip</Button>
<TooltipLight placement="top" target={tooltipTargetId}>…</TooltipLight>
<Button ref={popoverTarget} variant="primary">Open popover</Button>
<Popover target={popoverTarget} placement="bottom">…</Popover>
```

В обоих компонентах (`src/lib/components/Popover/Popover.tsx`, `src/lib/components/TooltipLight/TooltipLight.tsx`) `useEffect` имеет в зависимостях `open` (внутренний state). На каждом изменении `open`/`rect` эффект отписывается и подписывается заново на:

- `window.scroll` (с `capture: true`)
- `window.resize`
- click/mouseenter/mouseleave/focus/blur на target

Радиксовский Popover/Tooltip рендерится в портале и при открытии меняет body (атрибуты `data-state`, классы). Эти мутации повторно триггерят `setRect(getBoundingClientRect())`, что меняет state → переаттач эффекта → снова меняется DOM → цикл.

Дополнительно `useDropdownPosition` (`src/lib/helpers/hooks/useDropdownPosition.ts`) ставит `MutationObserver` на `document.body` с `subtree:true, attributes:true` и в callback вызывает `setPosition(...)`. Любая перерисовка где угодно на странице → mutation → setState → перерисовка. Этот хук экспортируется из `lib/helpers`, и хотя в проекте показа явного импорта нет, любой компонент библиотеки, который его подключит, тут же повесит браузер.

## План исправления

1. **Починить `useDropdownPosition`** (`src/lib/helpers/hooks/useDropdownPosition.ts`)
   - Убрать `MutationObserver` на `document.body` целиком — он смотрит на весь документ и вызывает `setState` при каждом изменении атрибута/класса. Это первоисточник цикла.
   - Оставить `ResizeObserver` на триггере и слушатели `scroll/resize` на window. Этого достаточно для расчёта позиции.
   - Если нужно реагировать на анимации/transitions, ограничить `transitionend`/`animationend` целевым элементом, а не window.

2. **Починить `Popover`** (`src/lib/components/Popover/Popover.tsx`)
   - Удалить `open` из массива зависимостей `useEffect`, использовать `ref` для актуального значения внутри обработчика клика. Текущая реализация переаттачит listener при каждом open/close, что само по себе вызывает перерисовку Radix-портала.
   - Снять `window.addEventListener("scroll", updateRect, true)` (capture-фаза на всём window) — слушать только тогда, когда popover открыт.

3. **Починить `TooltipLight`** (`src/lib/components/TooltipLight/TooltipLight.tsx`)
   - Аналогично Popover: вынести `open` из deps и слушать scroll/resize только при открытом тултипе.
   - Возвращать `null` до первого `rect` уже сделано — оставить.

4. **Починить `Spinner`** (`src/lib/components/Spinner/Spinner.tsx`)
   - Косметический баг: `className={(css.cssloadContainer, className)}` использует comma-operator и теряет `cssloadContainer`. Заменить на `cn(css.cssloadContainer, className)`.

5. **Проверить сборку**
   - Запустить `bun run build:site`, убедиться, что dist собирается.
   - Открыть прод-URL в браузере, измерить `Script Duration` — должен упасть до < 1 c.

## Технические детали

- Файлы под изменение: `src/lib/helpers/hooks/useDropdownPosition.ts`, `src/lib/components/Popover/Popover.tsx`, `src/lib/components/TooltipLight/TooltipLight.tsx`, `src/lib/components/Spinner/Spinner.tsx`.
- Никаких изменений в `src/routes/index.tsx` не требуется — после фикса библиотеки демо заработает как есть.
- Изменения совместимы с публичным API библиотеки, ломающих изменений нет.
- После мерджа Vercel автоматически пересоберёт сайт.
