Да, для этого проекта лучше положить реальные npm-компоненты в `src/lib`.

Причина: сейчас проект одновременно является демо-приложением на TanStack Start и npm-библиотекой. Если оставить компоненты в `src/components`, они смешиваются с app/demo-компонентами и shadcn/ui-заготовками. Чище сделать так:

```text
src/
  lib/                  # исходники npm-пакета
    components/
    icons/
    styles/
    helpers/
    index.ts
    styles.scss/css

  routes/               # только демо-приложение
    index.tsx

  components/ui/        # app/demo или shadcn-инфраструктура, не публичный npm API
```

Обновленный план работ:

1. Перенести исходники библиотеки в `src/lib`
   - Переместить загруженные публичные компоненты из `src/components/*` в `src/lib/components/*`.
   - Переместить `src/icons` в `src/lib/icons`.
   - Переместить `src/helpers` в `src/lib/helpers`.
   - Переместить библиотечные стили из `src/styles` в `src/lib/styles`.
   - Оставить `src/components/ui/*` на месте, потому что это инфраструктура демо-приложения, а не часть публичного npm API.

2. Настроить публичный API npm-пакета
   - Сделать `src/lib/index.ts` главным entry point библиотеки.
   - Экспортировать из него:
     - `components`
     - `icons`
     - `styles/colors`
     - `helpers`
   - Обновить все относительные импорты после переноса.
   - Убрать placeholder как основной экспорт пакета; при необходимости оставить его только на демо-странице или удалить.

3. Исправить зависимости и проблемные импорты
   - Добавить отсутствующие зависимости, которые реально используются компонентами: `classnames`, `reactstrap`, `react-router-dom`, `sass`.
   - Добавить SVGR-настройку для импортов вида `import { ReactComponent as Icon } from "./icon.svg"`.
   - Исправить несуществующий импорт в `Tag`: сейчас там `shared/icons/cross.svg`, нужно заменить на локальный импорт из `src/lib/icons`.
   - Проверить, нет ли других алиасов/импортов, которые не существуют после переноса.

4. Обновить Vite library mode
   - Оставить entry: `src/lib/index.ts`.
   - Расширить генерацию типов на весь `src/lib/**/*`.
   - Настроить обработку SCSS/CSS modules и SVG ReactComponent.
   - Проверить external/peer dependencies, чтобы React/ReactDOM не бандлились внутрь библиотеки.
   - Убедиться, что `dist` содержит корректные JS/CJS/types/CSS файлы.

5. Обновить `package.json`, README и npm-файлы
   - Проверить `main`, `module`, `types`, `exports`, `files`, `sideEffects`.
   - Обновить README под реальные компоненты, а не placeholder.
   - Проверить `.npmignore`, чтобы в npm попадал только нужный результат сборки.

6. Сделать демо-страницу всех компонентов
   - Обновить `src/routes/index.tsx`, чтобы она импортировала компоненты из `src/lib`.
   - Показать каждый публичный компонент:
     - BaseBlock
     - RadioGroupButton
     - Card
     - Button
     - Carousel
     - CopyTextTrigger
     - TooltipDark
     - TooltipLight
     - Popover
     - Spinner
     - EmptyComponent
     - CollapsableBlock
     - Collapse
     - Select
     - TabsRounded
     - Tabs
     - Tag
     - InputCaption
     - Label
   - Для интерактивных компонентов добавить локальные состояния прямо на демо-странице.

7. Проверить сборку и ссылки
   - Запустить library build и исправить ошибки.
   - Запустить demo/app build и исправить ошибки.
   - Проверить, что ссылки в `package.json` указывают на реально созданные файлы.
   - Проверить npm-содержимое через локальную упаковку/dry-run, чтобы пакет был готов к публикации.

Итоговая рекомендация: да, переносим реальные исходники библиотеки в `src/lib`, а `src/routes` используем только как демо-витрину для проверки компонентов.