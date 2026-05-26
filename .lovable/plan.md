## Settings (`SettingsView`) — composition-first компонент настроек

Премиальный компонент страниц настроек по референсу (Cursor settings), но в светлой теме проекта. API в духе `DetailView`: конфиг через `sections` + composition через `<SettingsView.Section/Item/Group/Divider>`. Плюс три новых готовых контрола, удобных для строк настроек: `Switch`, кнопка-ссылка `Open` (через существующий `Button`) и `ImageSegmented` (как Agent/Editor — переключатель в виде картинок).

### Файлы
- `src/lib/components/SettingsView/SettingsView.tsx` — новый
- `src/lib/components/SettingsView/SettingsView.module.scss` — новый
- `src/lib/components/SettingsView/index.ts`
- `src/lib/components/Switch/Switch.tsx` — новый (iOS-style, зелёный с кружком)
- `src/lib/components/Switch/Switch.module.scss`
- `src/lib/components/Switch/index.ts`
- `src/lib/components/ImageSegmented/ImageSegmented.tsx` — новый (segmented control с превью-картинками)
- `src/lib/components/ImageSegmented/ImageSegmented.module.scss`
- `src/lib/components/ImageSegmented/index.ts`
- `src/lib/components/index.ts` — добавить реэкспорты
- `src/routes/index.tsx` — демо-секция
- `README.md` — короткое описание

Для «Open» отдельный компонент не создаём — используем существующий `Button` (с иконкой `arrowRight` или внешней ссылкой). Для dropdown в строке настроек — существующий `Select`.

### Public API `SettingsView`

```ts
type SettingsLayout = "card" | "plain";
type SettingsDensity = "comfortable" | "compact";
type SettingsVariant = "classic" | "elevated"; // одна карточка vs мини-карточки на секцию

interface SettingsItem {
  id?: string;
  icon?: ReactNode;          // опц. круглый бейдж слева (40px)
  label: ReactNode;
  description?: ReactNode;   // подсказка под label (как в референсе)
  control?: ReactNode;       // правый слот: Switch / Select / Button "Open" / ImageSegmented / Tag…
  badge?: ReactNode;         // "New", "Beta"
  hint?: ReactNode;          // строка под всей строкой
  href?: string;             // строка-ссылка (рендерится как <a>, целая строка интерактивна)
  external?: boolean;        // target="_blank" + иконка внешней ссылки
  onClick?: () => void;      // строка-кнопка
  disabled?: boolean;
  danger?: boolean;          // акцент red02
  hidden?: boolean;
  align?: "center" | "start"; // вертикальное выравнивание control (для крупных контролов вроде ImageSegmented)
  render?: (ctx: { label: ReactNode; control: ReactNode }) => ReactNode;
}

interface SettingsGroup {     // подгруппа внутри секции (необязательная)
  id?: string;
  title?: ReactNode;
  items?: SettingsItem[];
  children?: ReactNode;
}

interface SettingsSection {
  id?: string;
  title?: ReactNode;          // например "General", "Preferences", "Layout"
  description?: ReactNode;
  items?: SettingsItem[];
  groups?: SettingsGroup[];
  children?: ReactNode;       // полностью кастомное наполнение
  collapsible?: boolean;
  defaultOpen?: boolean;
  className?: string;
}

interface SettingsViewProps {
  sections?: SettingsSection[];
  children?: ReactNode;
  layout?: SettingsLayout;    // card | plain
  density?: SettingsDensity;
  variant?: SettingsVariant;
  loading?: boolean;
  emptyState?: ReactNode;
  className?: string;
  id?: string;
}
```

Subcomponents: `SettingsView.Section`, `SettingsView.Group`, `SettingsView.Item`, `SettingsView.Divider`.
Поддержка и `sections`, и `children` одновременно — как в `DetailView`.

### Public API `Switch`
```ts
interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (next: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md";
  color?: "green" | "blue";   // по умолчанию "green" как на референсе
  ariaLabel?: string;
  id?: string;
}
```
Реализация — нативный `<button role="switch">`, плавный transition кружка, тень, focus-ring.
Цвета: on → `$green02` (#00A582), off → `$gray02`. Кружок — `$white01` с лёгкой тенью.

### Public API `ImageSegmented`
```ts
interface ImageSegmentedOption<T extends string = string> {
  value: T;
  label: ReactNode;
  image: ReactNode;     // ReactNode чтобы можно было передавать <img>, svg, или сгенерированную миниатюру
  disabled?: boolean;
}
interface ImageSegmentedProps<T extends string = string> {
  value: T;
  onChange: (next: T) => void;
  options: ImageSegmentedOption<T>[];
  size?: "sm" | "md";
  ariaLabel?: string;
}
```
Визуал: горизонтальная капсула `$gray01` с двумя/тремя «карточками-превью», у активной — белый фон, рамка `$blue02`, мягкая тень; снизу подпись (как Agent/Editor).

### Визуал `SettingsView` (на токенах `colorsNew`/`mixinsNew`)
- **classic** — единая карточка `$white01`, `radius 1.5rem`, тень как у `DetailView`. Секции разделены тонкой линией `$gray07`, заголовок секции — `$blue03` (`text-s-m`).
- **elevated** — каждая секция — мини-карточка с собственной тенью; зазор 1.25rem (ближе к референсу Cursor).
- **Item**: левая колонка — опц. круглый icon-badge 40px (`$gray01` фон, активный — `$blue01`); центр — `label` (text-s-m) + `description` (`$gray04`, text-xs); правый слот — control. Hover (для `href`/`onClick`) — `$gray01`, focus-ring `$blue02`, шеврон-стрелка.
- **danger** → текст и hover-фон в красной гамме; `disabled` → opacity 0.55, pointer-events none.
- **Density**: comfortable 64px / compact 48px.
- **Collapsible**: заголовок-кнопка с шевроном, transition по `grid-template-rows: 0fr → 1fr`.

### Демо в `routes/index.tsx`
Секция «Настройки» с двумя `SettingsView`:
- **General** — «Аккаунт» с `Button` «Open» (внешняя ссылка).
- **Preferences** — «Editor Settings», «Keyboard Shortcuts», «Import Settings» — строки-`href` с кнопкой Open справа.
- **Layout** — «Window Layout» с `ImageSegmented` (Agent/Editor, картинки-плейсхолдеры из `src/lib/icons`), «Conversation Density» — `Select` (Detailed/Compact), «Status Bar» — `Switch` (зелёный, on), «Auto-hide editor» — `Switch` (off).
- **Danger zone** — `danger` item «Удалить аккаунт» с `Button` red.
Переключатель `variant` (classic / elevated) и `density` через существующий `RadioGroupButton`.

### Вне scope
Никаких изменений в `DetailView`, `SideNav`, `Button`, `Select` и других существующих компонентах. Никаких новых npm-зависимостей.