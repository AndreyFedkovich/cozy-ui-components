
## Компонент `CommentFeed`

Премиальная лента комментариев с древовидной структурой, ленивой постраничной загрузкой по уровням, редактированием в окне 10 минут, вложениями, ознакомителями и системой прав.

---

## Архитектура данных

Плоская модель — каждый комментарий хранит ссылку на родителя через `parentId`. Дерево не передаётся снаружи: компонент строит и пагинирует его сам, вызывая `loadComments` для каждой ветки по требованию.

```ts
type Author = { id: string; name: string; avatarUrl?: string };

type Attachment = {
  id: string;
  name: string;
  size: number;
  url?: string;
  mimeType?: string;
};

type Comment = {
  id: string;
  parentId: string | null;
  author: Author;
  text: string;
  createdAt: string;          // ISO
  editedAt?: string;
  attachments?: Attachment[];
  recipients?: Author[];       // только для отображения (кому ушло уведомление)
  repliesCount: number;        // нужен, чтобы показать "Ответы (12)" без загрузки ветки
  permissions?: {              // per-comment, перекрывает глобальные
    canEdit?: boolean;
    canDelete?: boolean;
    canReply?: boolean;
  };
};
```

`recipients` — простой список, не участвует в построении дерева. Используется только для отображения "Уведомлены: …" и возвращается в callback `onCreate`/`onEdit`, чтобы фронт передал на бэк для рассылки.

---

## API компонента

```ts
type LoadParams  = { parentId: string | null; skip: number; take: number };
type LoadResult  = { items: Comment[]; total: number };

type CommentFeedProps = {
  loadComments: (p: LoadParams) => Promise<LoadResult>;
  pageSize?: number;                 // default 10
  currentUser: Author;
  recipientsSource: (query: string) => Promise<Author[]>;

  onCreate?: (input: {
    parentId: string | null;
    text: string;
    attachments: Attachment[];
    recipients: Author[];
  }) => Promise<Comment>;            // должен вернуть финальный объект

  onEdit?: (input: {
    id: string;
    text: string;
    attachments: Attachment[];
    recipients: Author[];
  }) => Promise<Comment>;

  onDelete?: (id: string) => Promise<void>;

  onUploadAttachment?:   (file: File) => Promise<Attachment>;
  onDownloadAttachment?: (a: Attachment) => void;
  onDeleteAttachment?:   (a: Attachment) => Promise<void>;

  permissions?: { canCreate?: boolean; canReply?: boolean };
  editWindowMs?: number;             // default 10 * 60_000
};
```

Imperative ref: `feedRef.refresh(parentId?: string | null)` для внешнего обновления одной ветки или всего корня.

---

## Порядок и пагинация (ключевое решение)

Сортировка внутри каждой ветки: **старые сверху, новые снизу** (хронологический фид).
Новый комментарий или ответ всегда добавляется **в конец** своей ветки.

Чтобы новые сообщения были видны сразу, ветка загружается **с последней страницы**, а не с первой. Сверху появляется кнопка "Показать предыдущие".

Алгоритм первой загрузки ветки `parentId`:
1. Дёрнуть `loadComments({ parentId, skip: 0, take: pageSize })` — нужен только `total` и первый чанк (используется как заглушка, если ветка маленькая).
2. Если `total > pageSize`, повторно дёрнуть `loadComments({ parentId, skip: total - pageSize, take: pageSize })` — последняя страница.
3. Запомнить `loadedFrom` (нижняя граница загруженного диапазона). Кнопка "Показать предыдущие N" сверху уменьшает `loadedFrom` на `pageSize` и подгружает предыдущий чанк.

Альтернатива для экономии запроса: компонент может сразу делать один вызов `loadComments({ parentId, skip: -pageSize, take: pageSize })` если бэк это поддерживает, но в API заложен только положительный `skip` — это совместимо с любым REST.

Поведение `onCreate`:
- Локально добавляем новый `Comment` в **конец** ветки `parentId`.
- Инкрементим `repliesCount` у родителя и `total` у ветки.
- Если ветка ещё не открыта (пользователь только что нажал "Ответить", не раскрывая чужие ответы), то после успеха ветка считается "открытой только с этого нового сообщения" — выше показывается "Показать предыдущие (N)". Никаких дубликатов: дедуп по `id` при подгрузке предыдущих страниц.

Это решает заданную проблему: новое сообщение в конце ленты, а ещё не подгруженные старые честно скрыты под кнопкой "Показать предыдущие".

---

## Состояние

```ts
type BranchState = {
  items: Comment[];           // отсортированы по createdAt asc
  total: number;
  loadedFrom: number;         // skip нижней границы загруженного хвоста
  loading: boolean;
  expanded: boolean;          // раскрыта ли ветка ответов
};

// Map<parentKey, BranchState>, где parentKey = parentId ?? '__root__'
```

Дедупликация при подгрузке "предыдущих": слияние по `id`, сохраняем порядок по `createdAt`.

---

## Редактирование

- Кнопка "Редактировать" показывается, если `comment.permissions?.canEdit ?? (comment.author.id === currentUser.id && now - createdAt < editWindowMs)`.
- Таймер на клиенте перерисовывает кнопку, когда окно истекает.
- Финальная проверка — на сервере: при ошибке `onEdit` показываем toast и откатываем UI.

## Удаление

- Кнопка "Удалить" по правам.
- Подтверждение через диалог.
- После успеха: если у комментария `repliesCount > 0`, заменяем текст на "Комментарий удалён" и блокируем действия (чтобы не ломать дерево). Если нет ответов — удаляем из ветки и декрементим `repliesCount` родителя.

## Вложения

- В форме создания/редактирования — drag&drop + кнопка "Прикрепить".
- При выборе файла → `onUploadAttachment(file)` → возвращает `Attachment`, показывается чип с прогрессом и кнопкой удаления.
- Удаление прикреплённого файла внутри открытой формы → подтверждение → `onDeleteAttachment`.
- В отрисованном комментарии: чипы файлов, клик → `onDownloadAttachment`, кнопка-крестик (если есть права редактирования) → подтверждение → `onDeleteAttachment` + обновление списка.

## Ознакомители

- В форме создания/ответа — кнопка "Добавить ознакомителей", открывает `DialogSelect` с асинхронным поиском через `recipientsSource(query)`.
- Выбранные показываются чипами с возможностью удаления.
- При сабмите уходят в `onCreate`/`onEdit` как `recipients: Author[]`.
- В готовом комментарии: компактная строка "Уведомлены: Иванов И.И., Петров П.П., +3" с тултипом со списком.

## Права

Глобальные `permissions.canCreate` / `canReply` управляют отображением формы корня и кнопки "Ответить".
Per-comment `permissions.{canEdit,canDelete,canReply}` перекрывают глобальные для конкретного узла.

---

## UI

- Бабблы сообщений в стиле библиотеки: аватар слева, мягкая карточка, hover-actions справа (Ответить / Редактировать / Удалить).
- Дочерние ветки с лёгким левым отступом и тонкой вертикальной линией-направляющей.
- "Показать ответы (N)" / "Скрыть ответы" — toggle на каждом узле.
- "Показать предыдущие (N)" — кнопка-ссылка сверху ветки, когда есть нераскрытый верх.
- Skeleton при первичной загрузке корня, мини-спиннер на кнопках пагинации.
- Пустое состояние корня через `EmptyComponent`.

---

## Файлы

```
src/lib/components/CommentFeed/
  CommentFeed.tsx              — корневой компонент + контекст
  CommentItem.tsx              — отрисовка одного узла + рекурсия
  CommentForm.tsx              — форма создания/ответа/редактирования
  AttachmentChip.tsx           — чип файла с действиями
  RecipientsPicker.tsx         — обёртка над DialogSelect
  useBranchLoader.ts           — хук состояния веток и пагинации
  CommentFeed.module.scss
  types.ts
  index.ts
```

Экспорт в `src/lib/components/index.ts`. Демо-секция "Workflow / Communication" на `src/routes/index.tsx` с фейковым `loadComments` (имитация задержки, дерево из 3 уровней) — показывает раскрытие, пагинацию "Показать предыдущие", добавление нового ответа в конец.

---

## Что НЕ входит

- Realtime-подписки (компонент чистый presentational + callbacks).
- Markdown/rich-text — только plain text + переводы строк.
- Лайки/реакции.
