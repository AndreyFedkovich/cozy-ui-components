## Цель

Добавить новый компонент `TreeDialogSelect` — Select c диалогом, в котором отображается раскрываемая иерархия узлов с ленивой подгрузкой детей через сервер и поиском. Стилистика — как у существующего `DialogSelect`.

## Новый компонент: `src/lib/components/TreeDialogSelect/`

Файлы:
- `TreeDialogSelect.tsx`
- `TreeDialogSelect.module.scss`

Архитектурно повторяет `DialogSelect`: триггер-инпут с placeholder/value/clear/кнопкой "Выбрать", открывает `Dialog` (тот же `@/components/ui/dialog`) с теми же `dialogContent`, `search`, скроллируемым контейнером и футером (Закрыть / Выбрать).

### Публичный API

```ts
export type TreeNode<T, S extends string | number> = {
  value: S;
  label: string;
  hasChildren?: boolean;   // если true — у узла есть дети, подгружаются по требованию
  meta?: T;
};

export type TreeLoadParams<S> = {
  parentId: S | null;      // null для корня
  search: string;          // текущий поисковый запрос
};

export type TreeLoadResult<T, S extends string | number> = {
  nodes: TreeNode<T, S>[];
};

export type TreeSearchResult<T, S extends string | number> = {
  // плоский список найденных узлов с путём от корня (для раскрытия)
  matches: Array<{ node: TreeNode<T, S>; path: TreeNode<T, S>[] }>;
};

export interface TreeDialogSelectProps<T, S extends string | number> {
  value?: TreeNode<T, S> | null;
  placeholder: string;
  loadChildren: (params: TreeLoadParams<S>) => Promise<TreeLoadResult<T, S>>;
  searchNodes?: (search: string) => Promise<TreeSearchResult<T, S>>;
  onChange?: (node: TreeNode<T, S>) => void;
  onClear?: () => void;
  label?: ReactNode;
  title?: ReactNode;
  searchPlaceholder?: string;
  selectButtonText?: string;
  closeButtonText?: string;
  confirmButtonText?: string;          // "Выбрать" в футере
  debounceMs?: number;                 // дефолт 350
  disabled?: boolean;
  error?: string | null;
  className?: string;
  inputClassName?: string;
  selectedOptionRender?: (node: TreeNode<T, S>) => ReactNode;
  nodeRender?: (node: TreeNode<T, S>) => ReactNode;
}
```

### Поведение

1. **Открытие диалога**: при первом open вызывается `loadChildren({ parentId: null, search: "" })` для корневых узлов.
2. **Раскрытие узла**: клик по chevron (▸/▾). Если дети ещё не загружены — `loadChildren({ parentId: node.value, search: "" })`, во время загрузки рядом с узлом — `Spinner size="extraSmall"`. После загрузки результат кэшируется в `Map<S, TreeNode[]>` внутри компонента.
3. **Выбор узла**: клик по тексту узла подсвечивает строку (черновой выбор, `pendingSelection`). Подтверждение — кнопкой "Выбрать" в футере, которая вызывает `onChange(pendingSelection)` и закрывает диалог. Закрытие без подтверждения — `pendingSelection` сбрасывается.
4. **Поиск**:
   - Если передан `searchNodes` — при debounced изменении строки поиска вызывается серверный поиск; возвращённые `path[]` используются для авто-раскрытия предков, чтобы найденные узлы были видны; найденные узлы подсвечиваются (mark) в дереве.
   - Если `searchNodes` не передан — клиентская фильтрация по уже загруженным узлам (label includes, case-insensitive), без догрузки.
   - Пустая строка — обычный режим дерева.
5. **Закрытие**: сбрасываем `search`, `pendingSelection`. Кэш загруженных детей сохраняем на время жизни компонента (можно опционально сбрасывать, но дефолт — сохраняем для UX).

### Рендер дерева

Рекурсивный компонент `TreeNodeRow`:
- отступ слева = `level * 20px`;
- chevron-кнопка (только если `hasChildren`) — раскрывает/сворачивает;
- чекмарк/подсветка для `value === pendingSelection?.value` и `value === currentValue?.value`;
- ховер-фон как у строк таблицы в `DialogSelect` (`colorsNew.$blue01`).

Контейнер дерева повторяет `tableContainer` из `DialogSelect.module.scss` (рамка, скролл, max-height ~48vh).

### Стили (`TreeDialogSelect.module.scss`)

- Переиспользуем визуально те же токены: `colorsNew.$gray06`, `$blue03`, `$blue05`, `$gray01`, `$gray04`, `$gray07`, `$blue01`.
- Классы: `.wrapper`, `.input`, `.selectedOption`, `.placeholder`, `.actions`, `.clearButton`, `.selectButton`, `.dialogContent`, `.dialogHeader`, `.dialogTitle`, `.search`, `.searchInput`, `.searchIcon`, `.searchSpinner`, `.treeContainer`, `.row`, `.row_active`, `.row_match`, `.chevron`, `.chevronExpanded`, `.nodeLabel`, `.spacer`, `.dialogFooter`, `.footerActions`, `.emptyState`.
- Адаптив (≤680px) — как в `DialogSelect`.

### Экспорт

В `src/lib/components/index.ts`:

```ts
export {
  TreeDialogSelect,
  type TreeDialogSelectProps,
  type TreeNode,
  type TreeLoadParams,
  type TreeLoadResult,
  type TreeSearchResult,
} from "./TreeDialogSelect/TreeDialogSelect";
```

## Демо в `src/routes/index.tsx`

Добавить секцию "Tree dialog select" с фейковым иерархическим источником:

- Локальная мок-структура (Подразделение → Отдел → Сотрудник, 3 уровня).
- `loadChildren` возвращает Promise с `setTimeout(400ms)` для имитации сервера.
- `searchNodes` — фильтрует все узлы по label, восстанавливает `path` от корня.
- В `<DemoSection>` показать `TreeDialogSelect` с `value`, `onChange`, `onClear`, `placeholder="Выберите подразделение"`, `title="Выбор подразделения"`.

## Технические детали

- React, типизация-дженерики `<T, S extends string | number>` — как в `DialogSelect`/`Select`.
- Внутренние state-структуры:
  - `childrenCache: Map<S | "__root__", TreeNode[]>`
  - `loadingNodes: Set<S | "__root__">`
  - `expanded: Set<S>`
  - `pendingSelection: TreeNode | null`
  - `search`, `debouncedSearch`
  - `searchMatches: Set<S>` и `forcedExpanded: Set<S>` (предки матчей)
- Race-condition защита: `requestIdRef` как в `DialogSelect`.
- Без новых зависимостей. Использует уже существующие `Dialog`, `Button`, `Spinner`, `EmptyComponent`, `Label`, `InputCaption`, иконки `SearchIcon`, `CrossIcon`, `ArrowDownIcon` (chevron, поворот через CSS transform).

## Файлы к изменению/созданию

- create `src/lib/components/TreeDialogSelect/TreeDialogSelect.tsx`
- create `src/lib/components/TreeDialogSelect/TreeDialogSelect.module.scss`
- edit `src/lib/components/index.ts` — добавить экспорт
- edit `src/routes/index.tsx` — добавить демо-секцию с моком иерархии и отложенной загрузкой