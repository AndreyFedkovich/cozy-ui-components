## Новый компонент: `ApprovalRoute` (Маршрут согласования)

Премиальный вертикальный таймлайн с двухуровневой иерархией: **Уровни → Этапы → Согласующие**. В стилях библиотеки (`colorsNew`, SCSS modules, тонкие тени, скругления как у других компонентов).

### Структура файлов

```text
src/lib/components/ApprovalRoute/
  ApprovalRoute.tsx                  // главный компонент + типы + экспорт
  ApprovalRoute.module.scss          // стили
  parts/
    LevelNode.tsx                    // кружок-маркер уровня + соединитель
    StageRow.tsx                     // строка этапа (название + кнопка добавить согласующего)
    ApproverItem.tsx                 // ФИО + дата + статус + причина отклонения
    EditNameDialog.tsx               // мини-диалог ввода названия (через ui/dialog)
```

Экспорт из `src/lib/components/index.ts`:
```ts
export { ApprovalRoute, type ApprovalRouteProps, type ApprovalLevel,
         type ApprovalStage, type Approver, type ApprovalStatus } from "./ApprovalRoute/ApprovalRoute";
```

### Модель данных

```ts
type ApprovalStatus = "pending" | "approved" | "rejected";

type Approver = {
  id: string;
  fullName: string;            // "Мелконян С.Б."
  status?: ApprovalStatus;     // undefined = ещё не действовал
  actedAt?: string;            // дата согласования/отклонения (форматированная)
  rejectReason?: string;       // показывается, если status="rejected"
};

type ApprovalStage = {
  id: string;
  name: string;                // "УОР", "УМП", "Руководитель L1"
  approvers: Approver[];       // если пустой — иконка "согласующий не назначен"
};

type ApprovalLevel = {
  id: string;
  name: string;                // "Согласование", "Утверждение", ...
  stages: ApprovalStage[];
  status: "completed" | "current" | "pending"; // текущий выделяется
};
```

### Поведение

- **Статус уровня**:
  - `completed` — зелёный закрашенный круг с галочкой (`DoneIcon` / `CheckGreen`).
  - `current` — синий контурный круг с пульсирующим кольцом (как `Stepper.step_current`), название уровня жирное + подчеркнутое.
  - `pending` — серый контурный круг.
- **Этапы текущего уровня** все одинаково активны (без выделения «активного из них»).
- **Согласующие**:
  - approved → синий/тёмный текст + дата.
  - rejected → красный текст + дата + причина курсивом.
  - pending → серый текст.
  - если `approvers` пуст — строка-плейсхолдер с `WarnIcon` оранжевого цвета и текстом «Согласующий не назначен».
- **Соединительная линия**: вертикальная 1px полоса слева, окрашенная в `blue03` для пройденных уровней, `gray07` для будущих, плавный градиент на границе текущего уровня.

### Режим редактирования (`editable?: boolean`)

Когда `editable=true`:
- У заголовка каждого уровня — кнопка-иконка `×` для удаления (с подтверждением через `window.confirm` или встроенный мини-диалог).
- В конце списка уровней — кнопка `+ Добавить уровень` (открывает `EditNameDialog` для ввода названия).
- У каждого этапа — `+` для добавления согласующего и `×` для удаления этапа.
- В конце этапов уровня — кнопка `+ Добавить этап`.
- У каждого согласующего — `×` для удаления.

Колбэки наружу (контролируемый компонент):
```ts
type ApprovalRouteProps = {
  levels: ApprovalLevel[];
  editable?: boolean;
  // приближённый список сотрудников для добавления согласующего
  loadApprovers?: DialogSelectProps<...>["loadOptions"];
  onAddLevel?: (name: string) => void;
  onRemoveLevel?: (levelId: string) => void;
  onAddStage?: (levelId: string, name: string) => void;
  onRemoveStage?: (levelId: string, stageId: string) => void;
  onAddApprover?: (levelId: string, stageId: string, person: CustomOption<...>) => void;
  onRemoveApprover?: (levelId: string, stageId: string, approverId: string) => void;
  className?: string;
  title?: string; // по умолчанию "Маршрут согласования"
};
```

Для добавления согласующего переиспользуем существующий `DialogSelect` (вызываем его в режиме «открыть и выбрать»). Чтобы не дублировать UX, добавление инициируется кнопкой `+`, которая монтирует скрытый `DialogSelect` с автооткрытием — реализуем через локальное состояние `addingTo: { levelId, stageId } | null` и один общий `<DialogSelect>` внизу компонента.

### Премиальные визуальные акценты

- Корневой контейнер: `border-radius: 16px`, `background: white`, мягкая тень `0 1px 2px rgba(15,23,42,0.04), 0 12px 32px -18px rgba(69,115,217,0.25)` — как `DemoSection` на демо-странице.
- Заголовок «Маршрут согласования» с лёгким `eyebrow`-капс-текстом сверху.
- Маркеры уровней: 20px круги, у текущего — пульсирующее кольцо `box-shadow: 0 0 0 4px rgba(blue03, 0.18)`.
- Этап: «карточка-чип» с тонкой границей `gray07`, фон `gray01` при ховере, скругление 12px.
- Имена согласующих: моноширинный отступ, дата — `gray03`, причина отклонения — `red02` курсивом в скруглённом блоке `red01`.
- Анимации: `transition: 0.2s ease` на статусные изменения и появление новых элементов (`opacity` + `translateY`).

### Демо-секция в `src/routes/index.tsx`

Добавить новую категорию **«05 — Workflow»** (после Feedback) с одним `DemoSection` шириной во всю сетку:
- Заголовок: "ApprovalRoute · Маршрут согласования".
- Описание: «Многоуровневый маршрут с параллельными этапами и режимом редактирования».
- Включает realistic данные с 4 уровнями («Согласование» — completed с двумя этапами УОР/УМП и подписантами; «Утверждение» — current с пустым согласующим; «Исполнение» — pending с шестью параллельными подписантами; «Завершено» — pending пустой).
- Под маршрутом — переключатель `Режим редактирования` (через существующий `RadioGroupButton` или `Tabs`), который переключает `editable` и показывает все кнопки `+`/`×`.
- Состояние данных хранится в `useState`, колбэки мутируют состояние локально (полноценная интерактивная демонстрация).

### Технические детали

- Использовать `cn` из `classnames` (как в Stepper).
- Цвета только из `colorsNew.scss` (без хардкода).
- Иконки: `DoneIcon`, `WarnIcon`, `CrossIcon`, `EditIcon`, `ProfileIcon`, `CloseRed`, `CheckGreen` — все уже есть.
- Для кнопки `+` — либо `Button variant="text"` с inline-svg «плюс» (SVG вставляем как inline JSX, без нового asset-файла), либо переиспользуем `Button` со слотом контента.
- `EditNameDialog`: тонкая обёртка над shadcn `Dialog` (как в `DialogSelect`) с одним `<input>` + 2 кнопки `Button` (primary/secondary).

### Что НЕ делаем

- Не вводим drag-and-drop переупорядочивания (вне ТЗ).
- Не делаем горизонтальный лейаут/мобильную перестройку (вертикальный таймлайн как на референсе).
- Не трогаем серверную часть — компонент чисто клиентский, контролируемый.
