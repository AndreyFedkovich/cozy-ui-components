## Новый компонент: `DetailView` (форма просмотра)

Премиальная read-only форма для отображения данных в виде секций со строками «Лейбл → Значение». Соответствует стилю `BaseBlock` / `CollapsableBlock` (фон `$white01`, скругление `1.5rem`, паддинг `2rem`, токены `colorsNew`/`mixinsNew`).

### Расположение
```
src/lib/components/DetailView/
  DetailView.tsx
  DetailView.module.scss
  index.ts
```
Экспорт добавить в `src/lib/components/index.ts`.

### API — composition-first + декларативный

Поддержать **два совместимых способа** использования.

**1. Декларативный (через props):**
```tsx
<DetailView
  sections={[
    {
      title: "Основные данные",
      fields: [
        { label: "Номер и дата заявки", value: <Link>ekd-242512</Link>, copyable: true },
        { label: "Автор заявки", value: "Петрова Е. В." },
        { label: "Статус", value: <Tag color="blue">На согласовании</Tag> },
        { label: "Срок действия заявки", value: "Нет" },
      ],
    },
    {
      title: "Формальные признаки должности",
      fields: [
        { label: "Заказчик по заявке", value: "Иванов И. И." },
        // ...
      ],
    },
  ]}
/>
```

**2. Composition (children):**
```tsx
<DetailView>
  <DetailView.Section title="Основные данные">
    <DetailView.Field label="Номер и дата заявки">
      <a href="...">ekd-242512</a> от 08.05.2026
    </DetailView.Field>
    <DetailView.Field label="Статус" value={<Tag>На согласовании</Tag>} />
    <DetailView.Field label="Автор заявки">Петрова Е. В.</DetailView.Field>
  </DetailView.Section>

  <DetailView.Divider />

  <DetailView.Section title="Формальные признаки должности">
    {/* любой кастомный JSX — multi-column grids, графики и т.п. */}
    <MyCustomRow />
  </DetailView.Section>
</DetailView>
```

### Типы
```ts
type DetailFieldRenderer = (ctx: { label: ReactNode; value: ReactNode }) => ReactNode;

interface DetailField {
  label: ReactNode;
  value: ReactNode;
  hint?: ReactNode;          // подсказка под значением
  copyable?: boolean;        // показать CopyTextTrigger
  render?: DetailFieldRenderer; // полный кастом строки
  hidden?: boolean;
  span?: 1 | 2;              // для двухколоночной сетки
}

interface DetailSection {
  id?: string;
  title?: ReactNode;
  description?: ReactNode;
  collapsible?: boolean;     // по флагу — рендерится через CollapsableBlock
  fields?: DetailField[];
  children?: ReactNode;
  columns?: 1 | 2;
}

interface DetailViewProps {
  sections?: DetailSection[];
  children?: ReactNode;
  variant?: "plain" | "card"; // card = обёртка как BaseBlock; plain = без фона
  labelWidth?: number | string; // ширина колонки лейблов, по умолч. 14rem
  size?: "md" | "lg";
  loading?: boolean;         // показать Spinner
  emptyState?: ReactNode;    // если нет данных
  className?: string;
}
```

Под капотом `DetailView.Section` и `DetailView.Field` — это статические свойства компонента (`DetailView.Section = Section`), стандартный паттерн compound-component. Если переданы и `sections`, и `children` — рендерим оба последовательно.

### Визуал (премиально, в духе библиотеки)
- Контейнер: `background: $white01`, `border-radius: 1.5rem`, `padding: 2rem` (как `BaseBlock`).
- Заголовок секции: `colorsNew.$blue03`, `text-s-m(0.875rem, 1.25rem)`, uppercase tracking `0.04em`.
- Тонкий разделитель между секциями: `1px` линия `$gray07` с верхним/нижним отступом `1.5rem`.
- Строка поля (двухколоночная сетка): лейбл `$gray04`, значение `$gray05`, `text(0.875rem, 1.5rem)`.
- На широких экранах — CSS Grid `grid-template-columns: <labelWidth> 1fr`, на мобильных (`<640px`) — стек.
- Hover-подсветка строки: лёгкий фон `$gray01` для строк с `copyable` или ссылками.
- Поддержка `loading` — заглушка через существующий `Spinner` + skeleton-плейсхолдер для строк (используем `_placeholder.scss`).
- `emptyState` — fallback через `EmptyComponent`.
- `copyable` — рендерим значение в обёртке с `CopyTextTrigger` справа.

### Демо в `src/routes/index.tsx`
Добавить новую секцию-демо «Form / DetailView» сразу после `BaseBlock`-демо: воспроизвести пример из скриншота (Основные данные / Формальные признаки должности) с использованием `DetailView` через декларативный API + рядом мини-пример composition с кастомным `render`.

### Что НЕ входит
- Без режима редактирования (это именно «просмотр»).
- Без серверной интеграции.
- Без правок `package.json` / билда — компонент попадёт в пакет автоматически через `lib/components/index.ts`.