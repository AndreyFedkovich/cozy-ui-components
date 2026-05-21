# Компонент `SideNav` — премиальный навигационный сайдбар

Новый компонент Cozy UI: вертикальная навигационная панель с блоком пользователя сверху, конфигурируемыми секциями (массив + composition-first API в духе `DetailView`) и переключаемым внешним видом — **Classic** (как на референсе) и **Aurora** (премиальный вариант).

## Структура файлов

```text
src/lib/components/SideNav/
  SideNav.tsx
  SideNav.module.scss
  index.ts
```

Экспорт через `src/lib/components/index.ts`. На демо-странице (`src/routes/index.tsx`) добавляется категория **Navigation → SideNav** с переключателем варианта и состояния `collapsed`.

## Публичный API

```ts
type SideNavVariant = "classic" | "aurora";

interface SideNavUser {
  name: string;
  role?: ReactNode;
  avatarUrl?: string;
  initials?: string;       // fallback при отсутствии avatarUrl
  badge?: ReactNode;       // статус online и т.п.
  onClick?: () => void;
}

interface SideNavItem {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  href?: string;
  active?: boolean;
  badge?: ReactNode;       // счётчик/тег справа
  disabled?: boolean;
  onClick?: (e) => void;
  children?: SideNavItem[]; // вложенное раскрываемое меню
}

interface SideNavSection {
  id?: string;
  title?: ReactNode;       // подпись "Для меня", "Сервисы"
  items?: SideNavItem[];
  children?: ReactNode;    // composition-first вставка
  className?: string;
}

interface SideNavProps {
  user?: SideNavUser;
  userSlot?: ReactNode;            // полностью кастомный блок пользователя
  sections?: SideNavSection[];
  children?: ReactNode;            // SideNav.Section / SideNav.Item / SideNav.Custom
  variant?: SideNavVariant;        // default "classic"
  activeId?: string;
  defaultActiveId?: string;
  onActiveChange?: (id: string) => void;
  collapsible?: boolean;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (v: boolean) => void;
  footer?: ReactNode;              // нижний слот (выйти, версия и т.п.)
  width?: number | string;         // default 280
  collapsedWidth?: number | string;// default 72
  className?: string;
}
```

Composition-first (как `DetailView`):

```tsx
<SideNav user={...} variant="aurora">
  <SideNav.Section title="Для меня">
    <SideNav.Item id="profile" icon={<ProfileIcon/>} label="Мой профиль" />
    <SideNav.Item id="time"    icon={<ClockIcon/>}   label="Моё рабочее время" badge={<Tag>3</Tag>} />
  </SideNav.Section>
  <SideNav.Divider />
  <SideNav.Section title="Сервисы">
    <SideNav.Custom>{/* любой JSX */}</SideNav.Custom>
  </SideNav.Section>
</SideNav>
```

Если переданы и `sections`, и `children` — сначала декларативные секции, затем composition.

## Варианты внешнего вида

**Classic** — близко к референсу пользователя:
- Светлый фон, мягкая правая граница.
- User-блок: круглый аватар 40px + имя/роль, без декора.
- Заголовки секций мелкие, капс. Активный пункт — мягкая подсветка с вертикальной полоской `--primary` слева.
- Hover — лёгкая заливка через `color-mix(in oklab, var(--primary) 8%, transparent)`.

**Aurora** — премиальный вариант:
- Глубокий градиентный фон (тёмно-синий → индиго), тонкий noise-overlay, декоративные glow-blob'ы в углах (в духе главной демо).
- User-блок в стеклянной карточке (`backdrop-filter: blur`, border `rgba(255,255,255,.08)`), аватар с двойным кольцом и точкой статуса.
- Активный пункт — pill-подсветка с градиентом и мягким свечением.
- Иконки в монохромном glass-chip; бейджи — мягкие pill'ы.
- Раскрываемые подпункты с плавным `max-height`.

Переключение — через `data-variant` на корне, без JS-логики стилей.

## Поведение

- Активный пункт: контролируемый/неконтролируемый (`activeId` / `defaultActiveId`).
- Сворачивание: ширина → `collapsedWidth`; подписи и заголовки секций скрываются, остаются иконки; tooltip с подписью при hover (используется существующий `TooltipDark`).
- Доступность: корень `<nav>`, `aria-current="page"` на активном, `aria-expanded` на раскрываемых, видимый focus-ring.
- Клавиатура: Tab + Enter/Space, стрелки ↑↓ внутри секции.
- SSR-safe. Без зависимости от роутера — интеграция с TanStack `Link` остаётся на стороне приложения через `userSlot` либо кастомные children пунктов.

## Демо

В категорию **Navigation** на демо-странице добавляется блок:
- Слева — рендер `SideNav` в рамке высотой ~640px.
- Сверху — `RadioGroupButton` для переключения `variant` (Classic / Aurora) и `Checkbox` "Свернуть".
- Mock-данные повторяют референс: Главная, Структура БКС, секции "Для меня" и "Сервисы", плюс пример `badge` (счётчик) и `footer` с кнопкой "Выйти".

## Обновления экспорта и README

- `src/lib/components/index.ts` — экспорт `SideNav` и его типов.
- `README.md` — раздел API с примером `sections` и composition-first использованием.

## Технические детали

- SCSS-модули, токены из `src/lib/styles/_colorsNew.scss`, существующие миксины.
- Иконки берём из `src/lib/icons` (`home`, `grid`, `profile`, `clock`, `plane`, `taskList`, `heart`, `chat`, `help`, `notebook`, `settings`, `wallet`, `feedback`).
- Анимации раскрытия и подсветки — чистый CSS (`transition` на `max-height`, `opacity`, `background`).
- Aurora использует `color-mix` и градиенты на CSS-переменных, чтобы оставаться в дизайн-системе.