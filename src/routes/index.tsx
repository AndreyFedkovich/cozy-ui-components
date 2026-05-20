import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useMemo, useRef, useState } from "react";
import cardCoverUrl from "@/assets/demo/card-cover.png";
import {
  BaseBlock,
  Button,
  Card,
  Carousel,
  Collapse,
  CollapsableBlock,
  CopyTextTrigger,
  DialogSelect,
  EmptyComponent,
  Calendar,
  Checkbox,
  Input,
  InputCaption,
  todayLocalDay,
  Popover,
  RadioGroupButton,
  Select,
  Spinner,
  Stepper,
  Tabs,
  TabsRounded,
  Tag,
  TooltipDark,
  TooltipLight,
  TreeDialogSelect,
  type TreeNode,
  type CustomOption,
  ApprovalRoute,
  type ApprovalLevel,
} from "../lib";
import { DetailView } from "../lib";
import {
  CommentFeed,
  type Comment as FeedComment,
  type CommentAttachment,
  type CommentAuthor,
} from "../lib";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cozy UI — Premium React Component Library" },
      {
        name: "description",
        content:
          "Cozy UI — премиальная React-библиотека компонентов: типизированная, с SCSS-модулями, SSR-safe и tree-shakeable ESM + CJS.",
      },
      { property: "og:title", content: "Cozy UI — Premium React Component Library" },
      {
        property: "og:description",
        content:
          "Премиальные React-компоненты Cozy UI: типизированы end-to-end, готовы к npm, SSR-safe.",
      },
    ],
  }),
  component: Index,
});

const tabsItems = [
  { value: "overview", label: "Обзор" },
  { value: "data", label: "Данные" },
  { value: "settings", label: "Настройки" },
];
const tabContent: Record<string, string> = {
  overview: "Сводка по проекту: ключевые показатели и активность за последние 7 дней.",
  data: "Таблицы и графики с агрегированными данными по выбранным фильтрам.",
  settings: "Управление параметрами рабочего пространства и интеграциями.",
};

const selectOptions: CustomOption<{ group: string }>[] = [
  { value: "design", label: "Design system", meta: { group: "Library" } },
  { value: "forms", label: "Form controls", meta: { group: "Library" } },
  { value: "feedback", label: "Feedback", meta: { group: "Library" } },
];
const cfoOptions: CustomOption<{ code: string }>[] = Array.from({ length: 12 }, (_, index) => {
  const num = 907 + index;
  const codes = ["0201RP", "0201SN", "0201SP", "0203SN", "0204SN", "0205SN", "0206RP", "0207SP"];
  return {
    value: `cfo-${num}`,
    label: `ЦФО ${num}`,
    meta: { code: codes[index % codes.length] },
  };
});
const employeeSurnames = [
  "Бодряков",
  "Чайников",
  "Пельменев",
  "Снежкин",
  "Лунатиков",
  "Кнопкин",
  "Громовик",
  "Тапочкин",
  "Зефирцев",
  "Бубликов",
  "Ракетин",
  "Смайлов",
];
const employeeNamePatronymics = [
  { name: "Александр", patronymic: "Александрович" },
  { name: "Дмитрий", patronymic: "Дмитриевич" },
  { name: "Сергей", patronymic: "Сергеевич" },
  { name: "Иван", patronymic: "Иванович" },
];
const employeeOptions: CustomOption<{ birthDate: string }>[] = Array.from(
  { length: 48 },
  (_, index) => {
    const id = index + 100;
    const surname =
      employeeSurnames[
        Math.floor(index / employeeNamePatronymics.length) % employeeSurnames.length
      ];
    const { name, patronymic } = employeeNamePatronymics[index % employeeNamePatronymics.length];

    return {
      value: `employee-${id}`,
      label: `${surname} ${name} ${patronymic}`,
      meta: {
        birthDate:
          index % 4 === 0
            ? "03.02"
            : index % 4 === 1
              ? "14.06"
              : index % 4 === 2
                ? "21.09"
                : "30.11",
      },
    };
  },
);

type DeptMeta = { kind: "company" | "department" | "team" };
type DeptNode = TreeNode<DeptMeta, string> & { children?: DeptNode[] };

const deptTree: DeptNode[] = [
  {
    value: "co-1",
    label: "ООО «Лютик»",
    hasChildren: true,
    meta: { kind: "company" },
    children: [
      {
        value: "dep-1",
        label: "Департамент разработки",
        hasChildren: true,
        meta: { kind: "department" },
        children: [
          {
            value: "team-1",
            label: "Команда фронтенда",
            hasChildren: false,
            meta: { kind: "team" },
          },
          { value: "team-2", label: "Команда бэкенда", hasChildren: false, meta: { kind: "team" } },
          { value: "team-3", label: "QA", hasChildren: false, meta: { kind: "team" } },
        ],
      },
      {
        value: "dep-2",
        label: "Департамент продаж",
        hasChildren: true,
        meta: { kind: "department" },
        children: [
          { value: "team-4", label: "B2B продажи", hasChildren: false, meta: { kind: "team" } },
          { value: "team-5", label: "B2C продажи", hasChildren: false, meta: { kind: "team" } },
        ],
      },
    ],
  },
  {
    value: "co-2",
    label: "ООО «Ромашка»",
    hasChildren: true,
    meta: { kind: "company" },
    children: [
      {
        value: "dep-3",
        label: "Финансовый отдел",
        hasChildren: true,
        meta: { kind: "department" },
        children: [
          { value: "team-6", label: "Бухгалтерия", hasChildren: false, meta: { kind: "team" } },
          { value: "team-7", label: "Казначейство", hasChildren: false, meta: { kind: "team" } },
        ],
      },
    ],
  },
];

const findNode = (nodes: DeptNode[], id: string): DeptNode | null => {
  for (const n of nodes) {
    if (n.value === id) return n;
    if (n.children) {
      const found = findNode(n.children, id);
      if (found) return found;
    }
  }
  return null;
};

const stripChildren = (n: DeptNode): TreeNode<DeptMeta, string> => ({
  value: n.value,
  label: n.label,
  hasChildren: n.hasChildren,
  meta: n.meta,
});

const collectAllWithPaths = (
  nodes: DeptNode[],
  path: DeptNode[] = [],
): Array<{ node: DeptNode; path: DeptNode[] }> => {
  const result: Array<{ node: DeptNode; path: DeptNode[] }> = [];
  for (const n of nodes) {
    result.push({ node: n, path });
    if (n.children) {
      result.push(...collectAllWithPaths(n.children, [...path, n]));
    }
  }
  return result;
};

function CategoryHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6 flex flex-col gap-2 border-b border-border/60 pb-4">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
        {eyebrow}
      </span>
      <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">{title}</h2>
      {description && (
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

function DemoSection({
  title,
  description,
  className,
  stageClassName,
  children,
}: {
  title: string;
  description?: string;
  className?: string;
  stageClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={
        "rounded-2xl border border-border/60 bg-card/80 p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-18px_rgba(69,115,217,0.25)] backdrop-blur " +
        (className ?? "")
      }
    >
      <header className="mb-5">
        <h3 className="text-2xl font-semibold tracking-tight text-card-foreground">{title}</h3>
        {description && (
          <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{description}</p>
        )}
      </header>
      <div
        className={
          "rounded-xl border border-dashed border-border/70 bg-gradient-to-b from-slate-50/80 to-white p-6 " +
          (stageClassName ?? "")
        }
      >
        {children}
      </div>
    </section>
  );
}

function Index() {
  const [radio, setRadio] = useState("first");
  const [demoEmail, setDemoEmail] = useState("user@company.com");
  const [demoPassword, setDemoPassword] = useState("123");
  const [demoDate, setDemoDate] = useState<string | null>(null);
  const [demoDateError, setDemoDateError] = useState<string | null>(null);
  const [demoAgreed, setDemoAgreed] = useState(false);
  const [demoNotify, setDemoNotify] = useState(true);
  const [tab, setTab] = useState<string>("overview");
  const [roundedTab, setRoundedTab] = useState<string>("overview");
  const [copied, setCopied] = useState(false);
  const [selected, setSelected] = useState<CustomOption<{ group: string }> | null>(
    selectOptions[0],
  );
  const [multiSelected, setMultiSelected] = useState<CustomOption<{ group: string }>[]>([
    selectOptions[0],
    selectOptions[2],
  ]);
  const [cfoSelected, setCfoSelected] = useState<CustomOption<{ code: string }>[]>([]);
  const [cfoSearch, setCfoSearch] = useState("");
  const [employee, setEmployee] = useState<CustomOption<{ birthDate: string }> | null>(null);
  const [department, setDepartment] = useState<TreeNode<DeptMeta, string> | null>(null);
  const [stepperStep, setStepperStep] = useState(2);
  const [namedStep, setNamedStep] = useState(1);
  const tooltipTargetId = "tooltip-light-demo-target";

  const [routeEditable, setRouteEditable] = useState("view");
  const [approvalLevels, setApprovalLevels] = useState<ApprovalLevel[]>([
    {
      id: "lvl-1",
      name: "Согласование",
      status: "completed",
      stages: [
        {
          id: "stg-1",
          name: "УОР",
          approvers: [
            { id: "a1", fullName: "Кнопкин Т.Ю.", status: "approved", actedAt: "02.03.26 12:05" },
          ],
        },
        {
          id: "stg-2",
          name: "УМП",
          approvers: [
            { id: "a2", fullName: "Кнопкин Т.Ю.", status: "approved", actedAt: "02.03.26 12:05" },
          ],
        },
      ],
    },
    {
      id: "lvl-2",
      name: "Утверждение",
      status: "current",
      stages: [{ id: "stg-3", name: "Руководитель L1", approvers: [] }],
    },
    {
      id: "lvl-3",
      name: "Исполнение",
      status: "pending",
      stages: [
        {
          id: "stg-4",
          name: "УОР",
          approvers: [
            { id: "a3", fullName: "Чайников В.Д." },
            { id: "a4", fullName: "Зефирцева Л.П." },
            { id: "a5", fullName: "Бубликова Н.Р." },
            { id: "a6", fullName: "Снежкина М.А." },
            { id: "a7", fullName: "Тапочкина Е.С." },
            { id: "a8", fullName: "Ракетина Ю.Г." },
          ],
        },
      ],
    },
    { id: "lvl-4", name: "Завершено", status: "pending", stages: [] },
  ]);

  const loadEmployees = useCallback(
    async ({ search, page, pageSize }: { search: string; page: number; pageSize: number }) => {
      await new Promise((resolve) => window.setTimeout(resolve, 350));
      const normalizedSearch = search.toLowerCase();
      const filteredOptions = employeeOptions.filter((option) =>
        option.label.toLowerCase().includes(normalizedSearch),
      );
      const start = (page - 1) * pageSize;
      const options = filteredOptions.slice(start, start + pageSize);
      return { options, total: filteredOptions.length };
    },
    [],
  );

  const loadDeptChildren = useCallback(
    async ({ parentId }: { parentId: string | null; search: string }) => {
      await new Promise((resolve) => window.setTimeout(resolve, 400));
      if (parentId === null) {
        return { nodes: deptTree.map(stripChildren) };
      }
      const parent = findNode(deptTree, parentId);
      return { nodes: (parent?.children ?? []).map(stripChildren) };
    },
    [],
  );

  const searchDepartments = useCallback(async (search: string) => {
    await new Promise((resolve) => window.setTimeout(resolve, 300));
    const q = search.toLowerCase();
    const all = collectAllWithPaths(deptTree);
    const matches = all
      .filter(({ node }) => node.label.toLowerCase().includes(q))
      .map(({ node, path }) => ({
        node: stripChildren(node),
        path: path.map(stripChildren),
      }));
    return { matches };
  }, []);

  const handleCopy = () => {
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };
  const handleTabValueChange = useCallback((next: string | number) => {
    setTab(String(next));
  }, []);
  const handleRoundedTabValueChange = useCallback((next: string | number) => {
    setRoundedTab(String(next));
  }, []);

  const loadApproversForRoute = useCallback(
    async ({ search, page, pageSize }: { search: string; page: number; pageSize: number }) => {
      await new Promise((r) => window.setTimeout(r, 250));
      const q = search.toLowerCase();
      const filtered = employeeOptions.filter((o) => o.label.toLowerCase().includes(q));
      const start = (page - 1) * pageSize;
      return {
        options: filtered.slice(start, start + pageSize) as unknown as CustomOption<
          unknown,
          string
        >[],
        total: filtered.length,
      };
    },
    [],
  );

  /* ---------- CommentFeed demo state ---------- */
  const currentDemoUser = useMemo<CommentAuthor>(
    () => ({ id: "u-me", name: "Андрей Ф." }),
    [],
  );
  const commentsRef = useRef<FeedComment[]>([
    {
      id: "c-1",
      parentId: null,
      author: { id: "u-1", name: "Кнопкин Тимур" },
      text: "Коллеги, выкладываю первую версию документа на ваше рассмотрение. Жду фидбэк до конца недели.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
      repliesCount: 2,
      attachments: [
        { id: "f-1", name: "specification-v1.pdf", size: 184_320 },
      ],
      recipients: [
        { id: "u-2", name: "Снежкина М." },
        { id: "u-3", name: "Бубликова Н." },
      ],
    },
    {
      id: "c-2",
      parentId: null,
      author: { id: "u-2", name: "Снежкина Мария" },
      text: "Принято в работу. Вернусь с правками в течение дня.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
      repliesCount: 0,
    },
    {
      id: "c-3",
      parentId: null,
      author: { id: "u-3", name: "Бубликова Надежда" },
      text: "По разделу 3.2 есть вопросы — нужно синхронизироваться лично.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
      repliesCount: 1,
    },
    {
      id: "c-4",
      parentId: "c-1",
      author: { id: "u-me", name: "Андрей Ф." },
      text: "Спасибо! Подсветил пару моментов в разделе про API.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      repliesCount: 0,
    },
    {
      id: "c-5",
      parentId: "c-1",
      author: { id: "u-2", name: "Снежкина Мария" },
      text: "Дополню, что нужно учесть требования безопасности из соседнего проекта.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
      repliesCount: 0,
    },
    {
      id: "c-6",
      parentId: "c-3",
      author: { id: "u-me", name: "Андрей Ф." },
      text: "Окей, давай завтра в 11:00.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      repliesCount: 0,
    },
  ]);

  const loadDemoComments = useCallback(
    async ({ parentId, skip, take }: { parentId: string | null; skip: number; take: number }) => {
      await new Promise((r) => window.setTimeout(r, 300));
      const branch = commentsRef.current
        .filter((c) => c.parentId === parentId)
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      return { items: branch.slice(skip, skip + take), total: branch.length };
    },
    [],
  );

  const loadDemoRecipients = useCallback(
    async ({ search, page, pageSize }: { search: string; page: number; pageSize: number }) => {
      await new Promise((r) => window.setTimeout(r, 200));
      const q = search.toLowerCase();
      const filtered = employeeOptions.filter((o) => o.label.toLowerCase().includes(q));
      const start = (page - 1) * pageSize;
      return {
        options: filtered.slice(start, start + pageSize).map((o) => ({
          value: o.value,
          label: o.label,
          meta: { id: String(o.value), name: String(o.label) } satisfies CommentAuthor,
        })) as CustomOption<CommentAuthor, string>[],
        total: filtered.length,
      };
    },
    [],
  );

  const onCommentCreate = useCallback(
    async (input: {
      parentId: string | null;
      text: string;
      attachments: CommentAttachment[];
      recipients: CommentAuthor[];
    }) => {
      await new Promise((r) => window.setTimeout(r, 250));
      const created: FeedComment = {
        id: `c-${Date.now()}`,
        parentId: input.parentId,
        author: currentDemoUser,
        text: input.text,
        attachments: input.attachments,
        recipients: input.recipients,
        createdAt: new Date().toISOString(),
        repliesCount: 0,
      };
      commentsRef.current.push(created);
      if (input.parentId) {
        const parent = commentsRef.current.find((c) => c.id === input.parentId);
        if (parent) parent.repliesCount += 1;
      }
      return created;
    },
    [currentDemoUser],
  );

  const onCommentEdit = useCallback(
    async (input: {
      id: string;
      text: string;
      attachments: CommentAttachment[];
      recipients: CommentAuthor[];
    }) => {
      await new Promise((r) => window.setTimeout(r, 200));
      const idx = commentsRef.current.findIndex((c) => c.id === input.id);
      const updated = {
        ...commentsRef.current[idx],
        text: input.text,
        attachments: input.attachments,
        recipients: input.recipients,
        editedAt: new Date().toISOString(),
      };
      commentsRef.current[idx] = updated;
      return updated;
    },
    [],
  );

  const onCommentDelete = useCallback(async (id: string) => {
    await new Promise((r) => window.setTimeout(r, 200));
    const c = commentsRef.current.find((x) => x.id === id);
    if (!c) return;
    if (c.repliesCount > 0) {
      c.deleted = true;
      c.text = "";
    } else {
      commentsRef.current = commentsRef.current.filter((x) => x.id !== id);
      if (c.parentId) {
        const parent = commentsRef.current.find((p) => p.id === c.parentId);
        if (parent) parent.repliesCount = Math.max(0, parent.repliesCount - 1);
      }
    }
  }, []);

  const onUploadDemoAttachment = useCallback(async (file: File): Promise<CommentAttachment> => {
    await new Promise((r) => window.setTimeout(r, 400));
    return {
      id: `att-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: file.name,
      size: file.size,
      mimeType: file.type,
    };
  }, []);

  const onDeleteDemoAttachment = useCallback(async () => {
    await new Promise((r) => window.setTimeout(r, 150));
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#f4f7fa] via-white to-[#eef3fb] px-6 py-16 text-foreground md:px-10">
      {/* decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full bg-[#4573d9]/15 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 right-0 h-[420px] w-[420px] rounded-full bg-[#d3e8fa]/60 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl space-y-16">
        {/* HERO */}
        <header className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/60 px-4 py-1.5 text-sm font-medium text-foreground backdrop-blur">
            <span className="inline-block h-2 w-2 rounded-full bg-[#00a582]" />
            v1.0 · @andreyfedkovich/cozy-ui · npm-ready
          </div>
          <h1 className="bg-gradient-to-r from-[#001a3d] via-[#1f3a8a] to-[#4573d9] bg-clip-text text-5xl font-bold leading-tight tracking-tight text-transparent md:text-6xl">
            Cozy UI
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Премиальная, продуманная React-библиотека компонентов из{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-base">src/lib</code>: типизирована
            end-to-end, на SCSS-модулях с дизайн-токенами, SSR-safe и tree-shakeable (ESM + CJS).
            Проверьте внешний вид, поведение и npm-экспорты — всё в одном месте.
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href="https://www.npmjs.com/package/@andreyfedkovich/cozy-ui"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#1f3a8a] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#001a3d]"
            >
              View on npm →
            </a>
            <a
              href="https://github.com/andreyfedkovich/cozy-ui#readme"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-white/70 px-4 py-2 text-sm font-semibold text-foreground backdrop-blur transition hover:bg-white"
            >
              GitHub / README
            </a>
            <a
              href="https://cozy-ui-components.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-white/70 px-4 py-2 text-sm font-semibold text-foreground backdrop-blur transition hover:bg-white"
            >
              Live demo ↗
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 md:grid-cols-4">
            {[
              { label: "Компонентов", value: "20+" },
              { label: "TypeScript", value: "100%" },
              { label: "Дерево-шейкинг", value: "Yes" },
              { label: "Стили", value: "SCSS modules" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-border/60 bg-white/70 px-4 py-3 backdrop-blur"
              >
                <div className="text-2xl font-semibold text-foreground">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </header>

        {/* CATEGORY 1: Layout & containers */}
        <section>
          <CategoryHeader
            eyebrow="01 — Layout"
            title="Layout & containers"
            description="Базовые контейнеры для группировки и презентации контента."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <DemoSection
              title="BaseBlock"
              description="Универсальный контейнер с заголовком и подзаголовком."
              className="lg:col-span-2"
            >
              <BaseBlock title="Cozy UI v1.0" subtitle="@andreyfedkovich/cozy-ui · MIT License">
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {[
                    { v: "20+", l: "компонентов" },
                    { v: "60+", l: "иконок" },
                    { v: "≈ 38 KB", l: "gzip" },
                  ].map((m) => (
                    <div key={m.l} className="rounded-lg bg-[#f4f7fa] px-4 py-3">
                      <div className="text-xl font-semibold text-foreground">{m.v}</div>
                      <div className="text-sm text-muted-foreground">{m.l}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex gap-3">
                  <Button variant="primary">View on npm</Button>
                  <Button variant="text">Документация →</Button>
                </div>
              </BaseBlock>
            </DemoSection>

            <DemoSection
              title="DetailView"
              description="Премиальная форма просмотра: секции, поля, копирование. В одном экземпляре можно смешивать декларативный sections и composition-first children."
              className="lg:col-span-2"
            >
              <DetailView
                sections={[
                  {
                    title: "Основные данные",
                    fields: [
                      {
                        label: "Номер и дата заявки",
                        value: (
                          <span>
                            <a
                              href="#"
                              className="text-[#4573d9] underline underline-offset-2 hover:text-[#3d63c4]"
                            >
                              ekd-242512
                            </a>{" "}
                            от 08.05.2026
                          </span>
                        ),
                        copyable: true,
                        copyText: "ekd-242512",
                      },
                      { label: "Автор заявки", value: "Петрова Е. В." },
                      {
                        label: "Статус",
                        value: <Tag>На согласовании</Tag>,
                      },
                      { label: "Срок действия заявки", value: "Нет" },
                      { label: "Код ШР", value: "66" },
                      { label: "Комментарий к коду ШР", value: "Замена сотрудника" },
                      { label: "Название вакансии", value: "Frontend-разработчик" },
                      { label: "Юридическая должность", value: "Ведущий специалист" },
                    ],
                  },
                  {
                    title: "Формальные признаки должности",
                    fields: [
                      { label: "Заказчик по заявке", value: "Иванов И. И." },
                      { label: "Функциональный руководитель", value: "Руководитель отсутствует" },
                      { label: "Руководитель L1", value: "Иванов И. И." },
                      { label: "Корпоративное подразделение", value: "Корпоративное подразделение" },
                      { label: "Юридическое подразделение", value: "Юридическое подразделение" },
                    ],
                  },
                ]}
              >
                <DetailView.Section title="Контакты">
                  <DetailView.Field label="Email" value="petrova@example.com" copyable />
                  <DetailView.Field label="Телефон" value="+7 (900) 123-45-67" copyable />
                  <DetailView.Field
                    label="Адрес"
                    hint="Основное место работы"
                  >
                    г. Москва, ул. Примерная, д. 1, оф. 42
                  </DetailView.Field>
                </DetailView.Section>

                  <DetailView.Section title="Кастомный шаблон поля">
                    <DetailView.Field
                      label="Прогресс онбординга"
                      render={({ label, value: _v }) => (
                        <div
                          className="grid items-center gap-5"
                          style={{ gridTemplateColumns: "14rem 1fr" }}
                        >
                          <div className="text-[#525252]">{label}</div>
                          <div className="flex items-center gap-3">
                            <div className="h-2 flex-1 rounded-full bg-[#dde5f5]">
                              <div
                                className="h-full rounded-full bg-[#4573d9]"
                                style={{ width: "72%" }}
                              />
                            </div>
                            <span className="text-sm font-medium text-[#2a2a2a]">72%</span>
                          </div>
                        </div>
                      )}
                    />
                </DetailView.Section>
              </DetailView>
            </DemoSection>

            <DemoSection
              title="Card"
              description="Простые карточки с фоном, цветом или изображением."
              className="lg:col-span-2"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="min-w-0">
                  <Card
                    text="Cover image"
                    height={160}
                    imageUrl={cardCoverUrl}
                    textColor="#fff"
                    className="w-full drop-shadow-sm"
                  />
                </div>
                <div className="min-w-0">
                  <Card
                    text="Brand card"
                    height={160}
                    backgroundColor="#4573d9"
                    textColor="#ffffff"
                    className="w-full"
                  />
                </div>
                <div className="min-w-0">
                  <Card
                    text="Light surface"
                    height={160}
                    backgroundColor="#eef6ff"
                    textColor="#0f172a"
                    className="w-full"
                  />
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Поддерживают `link`, `imageUrl`, кастомные размеры и цвета.
              </p>
            </DemoSection>

            <DemoSection
              title="CollapsableBlock"
              description="Блок с заголовком, подсказкой и раскрывающимся контентом."
            >
              <CollapsableBlock
                header="Список изменений · v1.0.0"
                defaultOpen
                infoTooltipContent="Дата релиза: 30 апреля 2026"
                content={
                  <div className="flex flex-col gap-3 pt-1">
                    <div className="flex items-center gap-3">
                      <Tag>Feature</Tag>
                      <span className="text-base">Новый компонент Stepper</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Tag>Feature</Tag>
                      <span className="text-base">TreeDialogSelect c lazy-загрузкой</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Tag>Fix</Tag>
                      <span className="text-base">Согласованный border-radius у всех Select</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Tag>Fix</Tag>
                      <span className="text-base">Увеличены контролы внутри Select</span>
                    </div>
                  </div>
                }
              />
            </DemoSection>

            <DemoSection
              title="Collapse · FAQ"
              description="Несколько Collapse подряд формируют классический FAQ."
            >
              <div className="divide-y divide-border/60">
                <div className="py-2">
                  <Collapse
                    header="Как установить пакет?"
                    defaultOpen
                    content={
                      <code className="mt-2 block rounded-md bg-[#0f172a] px-3 py-2 text-sm text-white">
                        npm install @company/ui-kit
                      </code>
                    }
                  />
                </div>
                <div className="py-2">
                  <Collapse
                    header="Поддерживает ли библиотека SSR?"
                    content="Да. Все компоненты совместимы с TanStack Start и Next.js."
                  />
                </div>
                <div className="py-2">
                  <Collapse
                    header="Как кастомизировать темы?"
                    content="Переопределите CSS-переменные палитры в собственном scss-файле и подключите его после стилей библиотеки."
                  />
                </div>
              </div>
            </DemoSection>

            <DemoSection
              title="EmptyComponent"
              description="Состояние «нет данных» с CTA-кнопкой."
              className="lg:col-span-2"
            >
              <div className="rounded-xl border border-border/50 bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-lg font-semibold">Список задач</h4>
                  <Button variant="text">+ Создать</Button>
                </div>
                <EmptyComponent
                  title="Задач пока нет"
                  description="Создайте первую задачу — она появится здесь."
                />
              </div>
            </DemoSection>
          </div>
        </section>

        {/* CATEGORY 2: Inputs & selection */}
        <section>
          <CategoryHeader
            eyebrow="02 — Inputs"
            title="Inputs & selection"
            description="Поля ввода, селекты, переключатели и подписи к формам."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <DemoSection
              title="RadioGroupButton"
              description="Сегментированный переключатель с одним активным значением."
            >
              <RadioGroupButton
                options={[
                  { value: "first", label: "First" },
                  { value: "second", label: "Second" },
                  { value: "third", label: "Third" },
                ]}
                value={radio}
                onChange={setRadio}
              />
              <p className="mt-3 text-sm text-muted-foreground">
                Активный: <span className="font-medium text-foreground">{radio}</span>
              </p>
            </DemoSection>

            <DemoSection
              title="Input"
              description="Текстовое поле для форм с опциональной подписью и сообщением валидации."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Input
                    label="Email"
                    placeholder="you@company.com"
                    value={demoEmail}
                    onChange={(e) => setDemoEmail(e.target.value)}
                  />
                  <InputCaption variant="neutral">Используется для входа в систему.</InputCaption>
                </div>
                <Input
                  label="Пароль"
                  type="password"
                  value={demoPassword}
                  onChange={(e) => setDemoPassword(e.target.value)}
                  error="Минимум 8 символов."
                />
              </div>
              <div className="mt-4">
                <Input label="Отключённое поле" placeholder="Недоступно" disabled />
              </div>
            </DemoSection>

            <DemoSection
              title="Calendar"
              description="Выбор даты в popover. Значение — yyyy-MM-dd, отображение — dd.MM.yyyy."
            >
              <div className="grid gap-4">
                <Calendar
                  label="Дата начала"
                  required
                  value={demoDate}
                  onChange={(v) => {
                    setDemoDate(v);
                    setDemoDateError(v ? null : "Укажите дату.");
                  }}
                  minDate={todayLocalDay()}
                  error={demoDateError}
                  tooltipContent="Дата не может быть раньше сегодняшнего дня."
                />
                <p className="text-sm text-muted-foreground">
                  Значение:{" "}
                  <span className="font-medium text-foreground">
                    {demoDate ?? "не выбрано"}
                  </span>
                </p>
              </div>
            </DemoSection>

            <DemoSection
              title="Checkbox"
              description="Чекбокс с кастомным боксом, подписью и валидацией."
            >
              <div className="flex flex-col gap-4">
                <Checkbox
                  label="Согласен с условиями обработки персональных данных"
                  checked={demoAgreed}
                  onChange={(e) => setDemoAgreed(e.target.checked)}
                />
                <Checkbox
                  label="Получать уведомления о статусе заявки"
                  checked={demoNotify}
                  onChange={(e) => setDemoNotify(e.target.checked)}
                />
                <Checkbox label="Опция недоступна" defaultChecked disabled />
                <Checkbox
                  label="Обязательное согласие"
                  error={demoAgreed ? null : "Необходимо принять условия."}
                  checked={demoAgreed}
                  onChange={(e) => setDemoAgreed(e.target.checked)}
                />
              </div>
            </DemoSection>

            <DemoSection
              title="Basic selects"
              description="Однозначный и множественный выбор."
              className="lg:col-span-2"
            >
              <div className="grid gap-5">
                <Select
                  mode="single"
                  label="Single select"
                  placeholder="Выберите опцию"
                  options={selectOptions}
                  value={selected}
                  onChange={setSelected}
                  onClear={() => setSelected(null)}
                />
                <Select
                  mode="multiple"
                  label="Multiple select"
                  placeholder="Выберите опции"
                  options={selectOptions}
                  value={multiSelected}
                  onChange={(option) =>
                    setMultiSelected((current) =>
                      current.some((item) => item.value === option.value)
                        ? current
                        : [...current, option],
                    )
                  }
                  onDelete={(option) =>
                    setMultiSelected((current) =>
                      current.filter((item) => item.value !== option.value),
                    )
                  }
                  onClear={() => setMultiSelected([])}
                />
              </div>
            </DemoSection>

            <DemoSection
              title="Advanced selects"
              description="Табличный, диалоговый и иерархический выбор с lazy-загрузкой."
              className="lg:col-span-2"
            >
              <div className="grid gap-5">
                <Select
                  mode="multiple"
                  label="Table template select"
                  placeholder="Выберите ЦФО"
                  template="table"
                  options={cfoOptions.filter((option) =>
                    option.meta?.code.toLowerCase().includes(cfoSearch.toLowerCase()),
                  )}
                  value={cfoSelected}
                  total={cfoOptions.length}
                  onSearch={setCfoSearch}
                  searchPlaceholder="Поиск по управленческому коду"
                  columns={[
                    { key: "name", title: "Наименование", render: (option) => option.label },
                    {
                      key: "code",
                      title: "Управленческий код",
                      render: (option) => option.meta?.code,
                    },
                  ]}
                  onChange={(option) =>
                    setCfoSelected((current) =>
                      current.some((item) => item.value === option.value)
                        ? current
                        : [...current, option],
                    )
                  }
                  onDelete={(option) =>
                    setCfoSelected((current) =>
                      current.filter((item) => item.value !== option.value),
                    )
                  }
                  onClear={() => setCfoSelected([])}
                />
                <DialogSelect
                  label="Dialog select"
                  placeholder="Укажите или выберите ФИО кандидата"
                  value={employee}
                  loadOptions={loadEmployees}
                  onChange={setEmployee}
                  onClear={() => setEmployee(null)}
                  searchPlaceholder="Введите ФИО сотрудника"
                  columns={[
                    { key: "name", title: "ФИО сотрудника", render: (option) => option.label },
                    {
                      key: "birthDate",
                      title: "День рождения",
                      render: (option) => option.meta?.birthDate,
                    },
                  ]}
                  onManualAdd={() => undefined}
                />
                <TreeDialogSelect
                  label="Tree dialog select"
                  placeholder="Выберите подразделение"
                  title="Выбор подразделения"
                  searchPlaceholder="Поиск по названию"
                  value={department}
                  loadNodes={loadDeptChildren}
                  searchNodes={searchDepartments}
                  onChange={setDepartment}
                  onClear={() => setDepartment(null)}
                />
              </div>
            </DemoSection>
          </div>
        </section>

        {/* CATEGORY 3: Navigation & flow */}
        <section>
          <CategoryHeader
            eyebrow="03 — Navigation"
            title="Navigation & flow"
            description="Табы, шаги мастера и карусели для перехода между состояниями."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <DemoSection title="Tabs" description="Классические табы с подчёркиванием активного.">
              <Tabs
                items={tabsItems}
                value={tab}
                onValueChange={handleTabValueChange}
                changesIndex={2}
                badgeValue={3}
              />
              <p className="mt-4 text-base text-muted-foreground">{tabContent[tab]}</p>
            </DemoSection>

            <DemoSection title="TabsRounded" description="Скруглённый стиль табов.">
              <TabsRounded
                items={tabsItems}
                value={roundedTab}
                onValueChange={handleRoundedTabValueChange}
              >
                <p className="text-base text-muted-foreground">{tabContent[roundedTab]}</p>
              </TabsRounded>
            </DemoSection>

            <DemoSection
              title="Stepper"
              description="Прогресс пошагового процесса с возможностью переключения."
              className="lg:col-span-2"
            >
              <div className="flex flex-col gap-8">
                <Stepper
                  items={[{}, {}, {}, {}, {}, {}]}
                  current={stepperStep}
                  onChange={setStepperStep}
                />
                <div>
                  <Stepper
                    items={[
                      { label: "Контакты" },
                      { label: "Документы" },
                      { label: "Подтверждение" },
                      { label: "Готово" },
                    ]}
                    current={namedStep}
                    onChange={setNamedStep}
                    showCheckOnCompleted
                  />
                  <div className="mt-5 flex gap-3">
                    <Button
                      variant="secondary"
                      onClick={() => setNamedStep((s) => Math.max(0, s - 1))}
                    >
                      Назад
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => setNamedStep((s) => Math.min(3, s + 1))}
                    >
                      Далее
                    </Button>
                  </div>
                </div>
              </div>
            </DemoSection>

            <DemoSection
              title="Carousel"
              description="Слайдер с произвольной разметкой каждого слайда."
              className="lg:col-span-2"
            >
              <Carousel
                items={[
                  {
                    id: 1,
                    title: "Дизайн-система",
                    subtitle: "Единая палитра, типографика, отступы",
                    gradient: "from-[#4573d9] to-[#001a3d]",
                  },
                  {
                    id: 2,
                    title: "Form controls",
                    subtitle: "Селекты, чекбоксы, инпуты",
                    gradient: "from-[#00a582] to-[#001a3d]",
                  },
                  {
                    id: 3,
                    title: "Feedback",
                    subtitle: "Tooltip, Popover, Spinner",
                    gradient: "from-[#ff6b2c] to-[#d72d40]",
                  },
                ]}
                renderItem={(item) => (
                  <div
                    className={`flex h-56 w-full flex-col justify-end rounded-xl bg-gradient-to-br ${item.gradient} p-6 text-white`}
                  >
                    <div className="text-2xl font-semibold">{item.title}</div>
                    <div className="text-base opacity-90">{item.subtitle}</div>
                  </div>
                )}
              />
            </DemoSection>
          </div>
        </section>

        {/* CATEGORY 4: Feedback & overlays */}
        <section>
          <CategoryHeader
            eyebrow="04 — Feedback"
            title="Feedback & overlays"
            description="Кнопки, теги, тултипы, поповеры, спиннеры и копирование."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <DemoSection
              title="Button"
              description="Все варианты кнопок и состояние загрузки."
              className="lg:col-span-2"
            >
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="default">Default</Button>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="text">Text</Button>
                <Button loading>Loading</Button>
                <Button variant="primary" disabled>
                  Disabled
                </Button>
              </div>
            </DemoSection>

            <DemoSection title="Tag" description="Статусные метки разных размеров.">
              <div className="flex flex-wrap gap-3">
                <Tag>Readonly</Tag>
                <Tag isSmall onClick={() => undefined}>
                  Closable
                </Tag>
                <Tag>Active</Tag>
                <Tag isSmall onClick={() => undefined}>
                  Filter: 2026
                </Tag>
              </div>
            </DemoSection>

            <DemoSection
              title="CopyTextTrigger + TooltipDark"
              description="Копирование строки и тёмная подсказка."
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4 rounded-lg bg-[#0f172a] px-4 py-3 font-mono text-sm text-white">
                  <span className="truncate">npm install @company/ui-kit</span>
                  <CopyTextTrigger
                    copied={copied}
                    onClick={handleCopy}
                    ariaLabel="Скопировать команду"
                    className="!text-white"
                  >
                    Copy
                  </CopyTextTrigger>
                </div>
                <div>
                  <TooltipDark
                    content="Тёмный tooltip с подсказкой"
                    trigger="hover"
                    placement="top"
                  >
                    <Button variant="secondary">Hover me</Button>
                  </TooltipDark>
                </div>
              </div>
            </DemoSection>

            <DemoSection
              title="TooltipLight + Popover"
              description="Светлая подсказка и поповер для расширенного контента."
              className="lg:col-span-2"
            >
              <div className="flex flex-wrap items-center gap-4 rounded-lg border border-border/50 bg-white p-4">
                <Button id={tooltipTargetId} variant="secondary">
                  Light tooltip
                </Button>
                <TooltipLight placement="top" target={tooltipTargetId}>
                  Светлый tooltip
                </TooltipLight>
                <Popover
                  trigger={<Button variant="primary">Open popover</Button>}
                  placement="bottom"
                >
                  Контент popover-компонента.
                </Popover>
                <span className="ml-auto text-sm text-muted-foreground">
                  Используется как тулбар: подсказки + действия.
                </span>
              </div>
            </DemoSection>

            <DemoSection
              title="Spinner"
              description="Три размера индикатора загрузки в реалистичных карточках."
              className="lg:col-span-2"
            >
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  { size: "large" as const, label: "Loading data…", min: 180 },
                  { size: "medium" as const, label: "Saving…", min: 140 },
                  { size: "extraSmall" as const, label: "Synchronizing…", min: 100 },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border/50 bg-white"
                    style={{ minHeight: s.min }}
                  >
                    <div className="flex items-center justify-center">
                      <Spinner size={s.size} />
                    </div>
                    <div className="pb-4 text-sm text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </DemoSection>
          </div>
        </section>

        {/* CATEGORY 5: Workflow */}
        <section>
          <CategoryHeader
            eyebrow="05 — Workflow"
            title="Workflow & approvals"
            description="Многоуровневый маршрут с параллельными этапами и режимом редактирования."
          />
          <div className="grid gap-6">
            <DemoSection
              title="ApprovalRoute · Маршрут согласования"
              description="Уровни и параллельные этапы со статусами, согласующими, причинами отклонения и редактированием."
            >
              <div className="mb-5 flex items-center gap-4">
                <span className="text-base font-medium text-foreground">Режим:</span>
                <RadioGroupButton<string>
                  options={[
                    { value: "view", label: "Просмотр" },
                    { value: "edit", label: "Редактирование" },
                  ]}
                  value={routeEditable}
                  onChange={(v) => setRouteEditable(v)}
                />
              </div>
              <ApprovalRoute
                levels={approvalLevels}
                editable={routeEditable === "edit"}
                loadApprovers={loadApproversForRoute}
                onAddLevel={(name) =>
                  setApprovalLevels((prev) => [
                    ...prev,
                    {
                      id: `lvl-${Date.now()}`,
                      name,
                      status: "pending",
                      stages: [],
                    },
                  ])
                }
                onRemoveLevel={(levelId) =>
                  setApprovalLevels((prev) => prev.filter((l) => l.id !== levelId))
                }
                onAddStage={(levelId, name) =>
                  setApprovalLevels((prev) =>
                    prev.map((l) =>
                      l.id === levelId
                        ? {
                            ...l,
                            stages: [...l.stages, { id: `stg-${Date.now()}`, name, approvers: [] }],
                          }
                        : l,
                    ),
                  )
                }
                onRemoveStage={(levelId, stageId) =>
                  setApprovalLevels((prev) =>
                    prev.map((l) =>
                      l.id === levelId
                        ? { ...l, stages: l.stages.filter((s) => s.id !== stageId) }
                        : l,
                    ),
                  )
                }
                onAddApprover={(levelId, stageId, person) =>
                  setApprovalLevels((prev) =>
                    prev.map((l) =>
                      l.id === levelId
                        ? {
                            ...l,
                            stages: l.stages.map((s) =>
                              s.id === stageId
                                ? {
                                    ...s,
                                    approvers: [
                                      ...s.approvers,
                                      { id: `app-${Date.now()}`, fullName: person.label },
                                    ],
                                  }
                                : s,
                            ),
                          }
                        : l,
                    ),
                  )
                }
                onRemoveApprover={(levelId, stageId, approverId) =>
                  setApprovalLevels((prev) =>
                    prev.map((l) =>
                      l.id === levelId
                        ? {
                            ...l,
                            stages: l.stages.map((s) =>
                              s.id === stageId
                                ? {
                                    ...s,
                                    approvers: s.approvers.filter((a) => a.id !== approverId),
                                  }
                                : s,
                            ),
                          }
                        : l,
                    ),
                  )
                }
              />
            </DemoSection>

            <DemoSection
              title="CommentFeed · Лента комментариев"
              description="Древовидные обсуждения с ленивой постраничной загрузкой по веткам, вложениями, ознакомителями, окном редактирования 10 минут и системой прав."
            >
              <CommentFeed
                currentUser={currentDemoUser}
                loadComments={loadDemoComments}
                recipientsSource={loadDemoRecipients}
                onCreate={onCommentCreate}
                onEdit={onCommentEdit}
                onDelete={onCommentDelete}
                onUploadAttachment={onUploadDemoAttachment}
                onDeleteAttachment={onDeleteDemoAttachment}
                onDownloadAttachment={(att) =>
                  window.alert(`Скачать ${att.name} (${att.size} байт)`)
                }
                pageSize={5}
                title="Обсуждение документа"
                eyebrow="Discussion"
              />
            </DemoSection>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-8 md:flex-row md:items-center">
          <div className="text-base text-muted-foreground">© 2026 · UI Library</div>
          <nav className="flex items-center gap-6 text-base">
            <a className="text-muted-foreground transition-colors hover:text-foreground" href="#">
              GitHub
            </a>
            <a className="text-muted-foreground transition-colors hover:text-foreground" href="#">
              npm
            </a>
            <a className="text-muted-foreground transition-colors hover:text-foreground" href="#">
              Docs
            </a>
          </nav>
        </footer>
      </div>
    </main>
  );
}
