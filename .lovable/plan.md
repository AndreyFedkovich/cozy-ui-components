## Цель

Добавить в `Select` встроенный стандартный шаблон дропдауна в виде таблицы с чекбоксами, поиском сверху и счётчиком «Всего N» снизу — как на скриншоте. Шаблон выбирается через новый prop `template="table"`, при этом старый `dropdownRender` продолжает работать для полностью кастомных случаев.

## Что меняется в API `Select`

Добавляются новые опциональные пропсы:

- `template?: "list" | "table"` — по умолчанию `"list"` (текущее поведение списка `<ul>`).
- `columns?: SelectColumn<T, S>[]` — описание колонок таблицы (используется только при `template="table"`).
- `total?: number` — общее число записей для футера «Всего N» (опционально; если не задано — берётся `options.length`).

Тип колонки:
```ts
export type SelectColumn<T, S> = {
  key: string;
  title: ReactNode;
  className?: string;
  render: (option: CustomOption<T, S>) => ReactNode;
};
```

Поведение:
- Если `template="table"` и есть `columns` — рендерится встроенная таблица вместо `<ul>`.
- Слева автоматически добавляется колонка с чекбоксом.
  - В `mode="multiple"` чекбокс отражает выбор из массива `value`; клик по строке/чекбоксу добавляет/удаляет опцию (через существующие `onChange`/`onDelete`).
  - В `mode="single"` чекбокс показывает текущий выбранный элемент (radio-подобно); клик выбирает строку и закрывает дропдаун, как сейчас.
- Сверху используется существующий блок поиска (`onSearch` + `searchPlaceholder`), как сейчас.
- Снизу — статичный футер «Всего N» (N = `total ?? options.length`).
- Если задан кастомный `dropdownRender`, он по-прежнему имеет приоритет и получает уже готовый `<TableDropdown />` как `menu`.

## Файлы

1. **`src/lib/components/Select/Select.tsx`**
   - Расширить `CustomSelectProps<T, S>` новыми пропсами `template`, `columns`, `total`.
   - Экспортировать тип `SelectColumn<T, S>`.
   - Добавить внутренний компонент `TableDropdown<T, S>` (рядом с существующим `Dropdown`), который рендерит:
     - `Search` (тот же, что и сейчас, если есть `onSearch`);
     - `<table>` с колонкой чекбокса + переданными `columns`;
     - футер «Всего N».
   - В `renderDropdown` выбирать `TableDropdown` либо `Dropdown` по `template`.
   - Обработка клика по строке/чекбоксу: использовать существующий `handleChange` для multiple (toggle через `onChange`/`onDelete`) и для single (выбор + закрытие).

2. **`src/lib/components/Select/Select.module.scss`**
   - Добавить стили для нового шаблона: `.tableContainer`, `.table` (sticky-`th`, паддинги, hover, активная строка), `.checkboxCell`, `.footerTotal`.
   - Переиспользовать палитру из `_colorsNew.scss` (как в `DialogSelect.module.scss`), чтобы визуально шаблон совпадал со скриншотом.
   - Чекбокс: использовать `<input type="checkbox">` со стандартным акцентом `accent-color: colorsNew.$blue03`, либо иконку `done.svg` в квадратной рамке — выбрать input + accent-color (минимум кода, доступность из коробки).

3. **`src/routes/index.tsx`**
   - В демо-секции `Select` добавить третий пример: `Select` в режиме `multiple` с `template="table"`, поиском, колонками «Наименование» и «Управленческий код» и `total`. Использовать новый список опций (`cfoOptions`) с полями `name` и `code`, чтобы соответствовать скриншоту.

## Технические детали

- Никаких изменений в `DialogSelect` — он остаётся отдельным компонентом для модального сценария.
- Позиционирование/портал/клик-аутсайд/`fixedHeight` существующего дропдауна работают без изменений: таблица рендерится внутри того же `.dropdownContent`-контейнера.
- При `template="table"` `fixedHeight` остаётся актуальным; внутренняя `.tableContainer` скроллится по высоте, `<thead>` — `position: sticky`.
- Чекбокс-колонка ширины ~40px, не имеет заголовка (`<th aria-label="" />`).
- Клик по `<input type="checkbox">` не должен дважды триггерить выбор: остановка `stopPropagation` на чекбоксе либо обработка только на уровне `<tr onClick>`.

## Что НЕ меняется

- Текущее поведение `template="list"` (по умолчанию) — без изменений; обратная совместимость сохраняется.
- `dropdownRender`, `optionRender`, `tagRender`, `selectedOptionRender` — без изменений.
- `DialogSelect` — без изменений.

## Демо

После реализации демо-страница будет показывать три варианта Select: single-list, multiple-list и новый multiple-table с колонками «Наименование»/«Управленческий код», поиском «Поиск по управленческому коду» и футером «Всего N» — как на референсе.
