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
  Textarea,
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
import { SideNav, type SideNavVariant } from "../lib";
import {
  SettingsView,
  Switch,
  ImageSegmented,
  type SettingsVariant,
  type SettingsDensity,
} from "../lib";
import { ValidationDemo } from "./-ValidationDemo";
import {
  HomeIcon,
  GridIcon,
  ProfileIcon,
  ClockIcon,
  PlaneIcon,
  TaskListIcon,
  HeartIcon,
  ChatIcon,
  HelpIcon,
  NotebookIcon,
  WalletIcon,
  FeedbackIcon,
  SettingsIcon,
  CancelIcon,
  ListIcon,
  FolderEditIcon,
  EmptyIcon,
} from "../lib";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cozy UI — Premium React Component Library" },
      {
        name: "description",
        content:
          "Cozy UI — a premium React component library: fully typed, SCSS modules, SSR-safe and tree-shakeable ESM + CJS.",
      },
      { property: "og:title", content: "Cozy UI — Premium React Component Library" },
      {
        property: "og:description",
        content:
          "Premium Cozy UI React components: end-to-end typed, npm-ready, SSR-safe.",
      },
    ],
  }),
  component: Index,
});

const tabsItems = [
  { value: "overview", label: "Overview" },
  { value: "data", label: "Data" },
  { value: "settings", label: "Settings" },
];

const demoTextareaClass = "h-[7.5rem] min-h-[7.5rem] resize-none";

const tabContent: Record<string, string> = {
  overview: "Project summary: key metrics and activity for the last 7 days.",
  data: "Tables and charts with aggregated data by the selected filters.",
  settings: "Manage workspace settings and integrations.",
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
    label: `Cost center ${num}`,
    meta: { code: codes[index % codes.length] },
  };
});
const employeeSurnames = [
  "Bodryakov",
  "Chainikov",
  "Pelmenev",
  "Snezhkin",
  "Lunatikov",
  "Knopkin",
  "Gromovik",
  "Tapochkin",
  "Zefirtsev",
  "Bublikov",
  "Raketin",
  "Smailov",
];
const employeeNamePatronymics = [
  { name: "Alexander", patronymic: "A." },
  { name: "Dmitry", patronymic: "D." },
  { name: "Sergey", patronymic: "S." },
  { name: "Ivan", patronymic: "I." },
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
    label: "Buttercup LLC",
    hasChildren: true,
    meta: { kind: "company" },
    children: [
      {
        value: "dep-1",
        label: "Engineering department",
        hasChildren: true,
        meta: { kind: "department" },
        children: [
          {
            value: "team-1",
            label: "Frontend team",
            hasChildren: false,
            meta: { kind: "team" },
          },
          { value: "team-2", label: "Backend team", hasChildren: false, meta: { kind: "team" } },
          { value: "team-3", label: "QA", hasChildren: false, meta: { kind: "team" } },
        ],
      },
      {
        value: "dep-2",
        label: "Sales department",
        hasChildren: true,
        meta: { kind: "department" },
        children: [
          { value: "team-4", label: "B2B sales", hasChildren: false, meta: { kind: "team" } },
          { value: "team-5", label: "B2C sales", hasChildren: false, meta: { kind: "team" } },
        ],
      },
    ],
  },
  {
    value: "co-2",
    label: "Daisy LLC",
    hasChildren: true,
    meta: { kind: "company" },
    children: [
      {
        value: "dep-3",
        label: "Finance department",
        hasChildren: true,
        meta: { kind: "department" },
        children: [
          { value: "team-6", label: "Accounting", hasChildren: false, meta: { kind: "team" } },
          { value: "team-7", label: "Treasury", hasChildren: false, meta: { kind: "team" } },
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
  const [demoComment, setDemoComment] = useState("");
  const [demoDate, setDemoDate] = useState<string | null>(null);
  const [demoDateError, setDemoDateError] = useState<string | null>(null);
  const [demoPolicyEmail, setDemoPolicyEmail] = useState("");
  const [demoPolicyTouched, setDemoPolicyTouched] = useState(false);
  const [demoPolicySubmitted, setDemoPolicySubmitted] = useState(false);
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

  const [sideNavVariant, setSideNavVariant] = useState<SideNavVariant>("aurora");
  const [sideNavCollapsed, setSideNavCollapsed] = useState(false);
  const [sideNavActive, setSideNavActive] = useState<string>("home");

  const [settingsVariant, setSettingsVariant] = useState<SettingsVariant>("elevated");
  const [settingsDensity, setSettingsDensity] = useState<SettingsDensity>("comfortable");
  const [windowLayout, setWindowLayout] = useState<"agent" | "editor">("agent");
  const [statusBar, setStatusBar] = useState(true);
  const [autoHide, setAutoHide] = useState(false);
  const [convDensity, setConvDensity] = useState<CustomOption<unknown> | null>({
    value: "detailed",
    label: "Detailed",
  });
  const [reviewLoc, setReviewLoc] = useState<CustomOption<unknown> | null>({
    value: "breadcrumb",
    label: "Breadcrumb",
  });

  const [routeEditable, setRouteEditable] = useState("view");
  const [approvalLevels, setApprovalLevels] = useState<ApprovalLevel[]>([
    {
      id: "lvl-1",
      name: "Review",
      status: "completed",
      stages: [
        {
          id: "stg-1",
          name: "OPS",
          approvers: [
            { id: "a1", fullName: "T. Knopkin", status: "approved", actedAt: "02.03.26 12:05" },
          ],
        },
        {
          id: "stg-2",
          name: "PMO",
          approvers: [
            { id: "a2", fullName: "T. Knopkin", status: "approved", actedAt: "02.03.26 12:05" },
          ],
        },
      ],
    },
    {
      id: "lvl-2",
      name: "Approval",
      status: "current",
      stages: [{ id: "stg-3", name: "L1 manager", approvers: [] }],
    },
    {
      id: "lvl-3",
      name: "Execution",
      status: "pending",
      stages: [
        {
          id: "stg-4",
          name: "OPS",
          approvers: [
            { id: "a3", fullName: "V. Chainikov" },
            { id: "a4", fullName: "L. Zefirtseva" },
            { id: "a5", fullName: "N. Bublikova" },
            { id: "a6", fullName: "M. Snezhkina" },
            { id: "a7", fullName: "E. Tapochkina" },
            { id: "a8", fullName: "Y. Raketina" },
          ],
        },
      ],
    },
    { id: "lvl-4", name: "Completed", status: "pending", stages: [] },
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
    () => ({ id: "u-me", name: "Andrew F." }),
    [],
  );
  const commentsRef = useRef<FeedComment[]>([
    {
      id: "c-1",
      parentId: null,
      author: { id: "u-1", name: "Timur Knopkin" },
      text: "Team, sharing the first draft of the document for your review. Looking forward to feedback by end of week.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
      repliesCount: 2,
      attachments: [
        { id: "f-1", name: "specification-v1.pdf", size: 184_320 },
      ],
      recipients: [
        { id: "u-2", name: "M. Snezhkina" },
        { id: "u-3", name: "N. Bublikova" },
      ],
    },
    {
      id: "c-2",
      parentId: null,
      author: { id: "u-2", name: "Maria Snezhkina" },
      text: "Got it. I'll come back with edits later today.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
      repliesCount: 0,
    },
    {
      id: "c-3",
      parentId: null,
      author: { id: "u-3", name: "Nadezhda Bublikova" },
      text: "I have questions about section 3.2 — let's sync in person.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
      repliesCount: 1,
    },
    {
      id: "c-4",
      parentId: "c-1",
      author: { id: "u-me", name: "Andrew F." },
      text: "Thanks! I flagged a couple of things in the API section.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      repliesCount: 0,
    },
    {
      id: "c-5",
      parentId: "c-1",
      author: { id: "u-2", name: "Maria Snezhkina" },
      text: "Also — we should account for the security requirements from the sibling project.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
      repliesCount: 0,
    },
    {
      id: "c-6",
      parentId: "c-3",
      author: { id: "u-me", name: "Andrew F." },
      text: "OK, let's meet tomorrow at 11:00.",
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
            A premium, considered React component library from{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-base">src/lib</code>: end-to-end
            typed, SCSS modules with design tokens, SSR-safe and tree-shakeable (ESM + CJS).
            Check the look, behavior, and npm exports — all in one place.
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
              { label: "Components", value: "20+" },
              { label: "TypeScript", value: "100%" },
              { label: "Tree-shaking", value: "Yes" },
              { label: "Styles", value: "SCSS modules" },
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
            description="Base containers for grouping and presenting content."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <DemoSection
              title="BaseBlock"
              description="Universal container with a title and subtitle."
              className="lg:col-span-2"
            >
              <BaseBlock title="Cozy UI v1.0" subtitle="@andreyfedkovich/cozy-ui · MIT License">
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {[
                    { v: "20+", l: "components" },
                    { v: "60+", l: "icons" },
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
                  <Button variant="text">Documentation →</Button>
                </div>
              </BaseBlock>
            </DemoSection>

            <DemoSection
              title="DetailView"
              description="Premium detail view: sections, fields, copy. In one instance you can mix declarative sections with composition-first children."
              className="lg:col-span-2"
            >
              <DetailView
                sections={[
                  {
                    title: "Main data",
                    fields: [
                      {
                        label: "Request number and date",
                        value: (
                          <span>
                            <a
                              href="#"
                              className="text-[#4573d9] underline underline-offset-2 hover:text-[#3d63c4]"
                            >
                              ekd-242512
                            </a>{" "}
                            from 08.05.2026
                          </span>
                        ),
                        copyable: true,
                        copyText: "ekd-242512",
                      },
                      { label: "Request author", value: "E. Petrova" },
                      {
                        label: "Status",
                        value: <Tag>Under review</Tag>,
                      },
                      { label: "Request expiration", value: "None" },
                      { label: "SR code", value: "66" },
                      { label: "SR code comment", value: "Employee replacement" },
                      { label: "Job title", value: "Frontend developer" },
                      { label: "Legal position", value: "Senior specialist" },
                    ],
                  },
                  {
                    title: "Position formalities",
                    fields: [
                      { label: "Requester", value: "I. Ivanov" },
                      { label: "Functional manager", value: "No manager assigned" },
                      { label: "L1 manager", value: "I. Ivanov" },
                      { label: "Corporate division", value: "Corporate division" },
                      { label: "Legal division", value: "Legal division" },
                    ],
                  },
                ]}
              >
                <DetailView.Section title="Contacts">
                  <DetailView.Field label="Email" value="petrova@example.com" copyable />
                  <DetailView.Field label="Phone" value="+1 (555) 123-4567" copyable />
                  <DetailView.Field
                    label="Address"
                    hint="Primary workplace"
                  >
                    1 Sample Street, office 42, Springfield
                  </DetailView.Field>
                </DetailView.Section>

                  <DetailView.Section title="Custom field template">
                    <DetailView.Field
                      label="Onboarding progress"
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
              description="Simple cards with a background color or image."
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
                Support `link`, `imageUrl`, custom sizes and colors.
              </p>
            </DemoSection>

            <DemoSection
              title="CollapsableBlock"
              description="Block with a title, tooltip, and expandable content."
            >
              <CollapsableBlock
                header="Changelog · v1.0.0"
                defaultOpen
                infoTooltipContent="Release date: April 30, 2026"
                content={
                  <div className="flex flex-col gap-3 pt-1">
                    <div className="flex items-center gap-3">
                      <Tag>Feature</Tag>
                      <span className="text-base">New Stepper component</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Tag>Feature</Tag>
                      <span className="text-base">TreeDialogSelect with lazy loading</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Tag>Fix</Tag>
                      <span className="text-base">Consistent border-radius across all Select</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Tag>Fix</Tag>
                      <span className="text-base">Larger controls inside Select</span>
                    </div>
                  </div>
                }
              />
            </DemoSection>

            <DemoSection
              title="Collapse · FAQ"
              description="Multiple Collapse in a row form a classic FAQ."
            >
              <div className="divide-y divide-border/60">
                <div className="py-2">
                  <Collapse
                    header="How do I install the package?"
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
                    header="Does the library support SSR?"
                    content="Yes. All components are compatible with TanStack Start and Next.js."
                  />
                </div>
                <div className="py-2">
                  <Collapse
                    header="How do I customize themes?"
                    content="Override the CSS palette variables in your own scss file and load it after the library styles."
                  />
                </div>
              </div>
            </DemoSection>

            <DemoSection
              title="EmptyComponent"
              description="Empty state with a CTA button."
              className="lg:col-span-2"
            >
              <div className="rounded-xl border border-border/50 bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-lg font-semibold">Task list</h4>
                  <Button variant="text">+ Create</Button>
                </div>
                <EmptyComponent
                  title="No tasks yet"
                  description="Create your first task — it will appear here."
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
            description="Input fields, selects, toggles, and form captions."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <DemoSection
              title="RadioGroupButton"
              description="Segmented toggle with a single active value."
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
                Active: <span className="font-medium text-foreground">{radio}</span>
              </p>
            </DemoSection>

            <DemoSection
              title="Input"
              description="Text field for forms with an optional caption and validation message."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Input
                    label="Email"
                    placeholder="you@company.com"
                    value={demoEmail}
                    onChange={(e) => setDemoEmail(e.target.value)}
                  />
                  <InputCaption variant="neutral">Used to sign in.</InputCaption>
                </div>
                <Input
                  label="Password"
                  type="password"
                  value={demoPassword}
                  onChange={(e) => setDemoPassword(e.target.value)}
                  error="At least 8 characters."
                />
              </div>
              <div className="mt-4">
                <Input label="Disabled field" placeholder="Unavailable" disabled />
              </div>
              <div className="mt-6 grid gap-3 sm:max-w-md">
                <Input
                  label="Email (fieldMeta + default policy)"
                  placeholder="name@company.com"
                  value={demoPolicyEmail}
                  onChange={(e) => setDemoPolicyEmail(e.target.value)}
                  onBlur={() => setDemoPolicyTouched(true)}
                  fieldMeta={{
                    touched: demoPolicyTouched,
                    submitted: demoPolicySubmitted,
                    hasValue: demoPolicyEmail.trim().length > 0,
                    invalid: !demoPolicyEmail.includes("@"),
                    errorMessage: "Enter a valid email.",
                  }}
                />
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => setDemoPolicySubmitted(true)}
                >
                  Submit (demo)
                </Button>
              </div>
            </DemoSection>

            <DemoSection
              title="Validation UX (draftFriendly)"
              description="useFormFields + debounced validate + wizard validate-on-click — no flash on the first character."
              className="lg:col-span-2"
            >
              <ValidationDemo />
            </DemoSection>

            <DemoSection
              title="Textarea"
              description="Multi-line field for forms with an optional caption and validation message."
              className="lg:col-span-2"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <Textarea
                    label="Comment"
                    placeholder="Enter text…"
                    rows={5}
                    hint="Up to 500 characters."
                    textareaClassName={demoTextareaClass}
                    value={demoComment}
                    onChange={(e) => setDemoComment(e.target.value)}
                  />
                </div>
                <div>
                  <Textarea
                    label="Description"
                    placeholder="Short description"
                    rows={5}
                    error="Enter a description."
                    textareaClassName={demoTextareaClass}
                  />
                </div>
                <div>
                  <Textarea
                    label="Disabled field"
                    placeholder="Unavailable"
                    disabled
                    rows={5}
                    textareaClassName={demoTextareaClass}
                  />
                </div>
              </div>
            </DemoSection>

            <DemoSection
              title="Calendar"
              description="Date picker in a popover. Value is yyyy-MM-dd, display is dd.MM.yyyy."
            >
              <div className="grid gap-4">
                <Calendar
                  label="Start date"
                  required
                  value={demoDate}
                  onValueChange={(v) => {
                    setDemoDate(v);
                    setDemoDateError(v ? null : "Select a date.");
                  }}
                  minDate={todayLocalDay()}
                  error={demoDateError}
                  tooltipContent="Date cannot be earlier than today."
                />
                <p className="text-sm text-muted-foreground">
                  Value:{" "}
                  <span className="font-medium text-foreground">
                    {demoDate ?? "not selected"}
                  </span>
                </p>
              </div>
            </DemoSection>

            <DemoSection
              title="Checkbox"
              description="Checkbox with a custom box, label, and validation."
            >
              <div className="flex flex-col gap-4">
                <Checkbox
                  label="I agree to the personal data processing terms"
                  checked={demoAgreed}
                  onChange={(e) => setDemoAgreed(e.target.checked)}
                />
                <Checkbox
                  label="Receive request status notifications"
                  tooltipContent="Emails are only sent when the request status changes."
                  checked={demoNotify}
                  onChange={(e) => setDemoNotify(e.target.checked)}
                />
                <Checkbox label="Option unavailable" defaultChecked disabled />
                <Checkbox
                  label="Required consent"
                  error={demoAgreed ? null : "You must accept the terms."}
                  checked={demoAgreed}
                  onChange={(e) => setDemoAgreed(e.target.checked)}
                />
              </div>
            </DemoSection>

            <DemoSection
              title="Basic selects"
              description="Single and multiple selection."
              className="lg:col-span-2"
            >
              <div className="grid gap-5">
                <Select
                  mode="single"
                  label="Single select"
                  placeholder="Select an option"
                  options={selectOptions}
                  value={selected}
                  onValueChange={setSelected}
                  onClear={() => setSelected(null)}
                />
                <Select
                  mode="multiple"
                  label="Multiple select"
                  placeholder="Select options"
                  options={selectOptions}
                  value={multiSelected}
                  onValueChange={(option) =>
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
              description="Table, dialog, and hierarchical selection with lazy loading."
              className="lg:col-span-2"
            >
              <div className="grid gap-5">
                <Select
                  mode="multiple"
                  label="Table template select"
                  placeholder="Select cost center"
                  template="table"
                  options={cfoOptions.filter((option) =>
                    option.meta?.code.toLowerCase().includes(cfoSearch.toLowerCase()),
                  )}
                  value={cfoSelected}
                  total={cfoOptions.length}
                  onSearch={setCfoSearch}
                  searchPlaceholder="Search by management code"
                  columns={[
                    { key: "name", title: "Name", render: (option) => option.label },
                    {
                      key: "code",
                      title: "Management code",
                      render: (option) => option.meta?.code,
                    },
                  ]}
                  onValueChange={(option) =>
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
                  placeholder="Enter or pick the candidate's name"
                  value={employee}
                  loadOptions={loadEmployees}
                  onValueChange={setEmployee}
                  onClear={() => setEmployee(null)}
                  searchPlaceholder="Enter employee name"
                  columns={[
                    { key: "name", title: "Employee name", render: (option) => option.label },
                    {
                      key: "birthDate",
                      title: "Birthday",
                      render: (option) => option.meta?.birthDate,
                    },
                  ]}
                  onManualAdd={() => undefined}
                />
                <TreeDialogSelect
                  label="Tree dialog select"
                  placeholder="Select department"
                  title="Department selection"
                  searchPlaceholder="Search by name"
                  value={department}
                  loadNodes={loadDeptChildren}
                  searchNodes={searchDepartments}
                  onValueChange={setDepartment}
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
                  <p className="mb-3 text-sm text-muted-foreground">
                    Статичный пример
                  </p>
                  <Stepper
                    items={[
                      { label: "Тип изменений" },
                      { label: "Основные данные" },
                      { label: "Корпоративная должность" },
                      { label: "Юридическая должность" },
                      { label: "Бюджет" },
                      { label: "ИФ" },
                    ]}
                    current={0}
                  />
                </div>
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

            <DemoSection
              title="SideNav"
              description="Премиальная навигационная панель с блоком пользователя, секциями и переключаемым внешним видом."
              className="lg:col-span-2"
              stageClassName="!p-4"
            >
              <div className="mb-4 flex flex-wrap items-center gap-4">
                <RadioGroupButton
                  value={sideNavVariant}
                  onChange={(c) => setSideNavVariant(c)}
                  options={[
                    { value: "classic", label: "Classic" },
                    { value: "transparent", label: "Transparent" },
                    { value: "aurora", label: "Aurora" },
                  ]}
                />
                <Checkbox
                  checked={sideNavCollapsed}
                  onChange={(e) => setSideNavCollapsed(e.target.checked)}
                  label="Свернуть"
                />
              </div>
              <div className="flex gap-6">
                <div style={{ height: 640, flexShrink: 0 }}>
                  <SideNav
                    variant={sideNavVariant}
                    collapsible
                    collapsed={sideNavCollapsed}
                    onCollapsedChange={setSideNavCollapsed}
                    activeId={sideNavActive}
                    onActiveChange={setSideNavActive}
                    user={{
                      name: "Петрова Екатерина",
                      role: "Начальник управления",
                      badge: true,
                      onClick: () => {},
                    }}
                    sections={[
                      {
                        id: "main",
                        items: [
                          { id: "home", label: "Главная", icon: <HomeIcon /> },
                          { id: "structure", label: "Структура", icon: <GridIcon /> },
                        ],
                      },
                      {
                        id: "self",
                        title: "Для меня",
                        items: [
                          { id: "profile", label: "Мой профиль", icon: <ProfileIcon /> },
                          {
                            id: "time",
                            label: "Моё рабочее время",
                            icon: <ClockIcon />,
                            badge: "3",
                          },
                          { id: "vacation", label: "Мои отпуска", icon: <PlaneIcon /> },
                          { id: "tasks", label: "Мои цели и задачи", icon: <TaskListIcon /> },
                          { id: "health", label: "Моё здоровье", icon: <HeartIcon /> },
                        ],
                      },
                      {
                        id: "services",
                        title: "Сервисы",
                        items: [
                          { id: "polls", label: "Опросы", icon: <ChatIcon /> },
                          { id: "help", label: "Помощники", icon: <HelpIcon /> },
                          { id: "requests", label: "Заявки", icon: <NotebookIcon />, badge: "12" },
                          {
                            id: "positions",
                            label: "Управление должностями",
                            icon: <SettingsIcon />,
                          },
                          { id: "bank", label: "Мой Банк", icon: <WalletIcon /> },
                          { id: "reports", label: "Отчёты", icon: <FeedbackIcon /> },
                        ],
                      },
                    ]}
                    footer={
                      <Button
                        variant="text"
                        onClick={() => {}}
                        className="flex items-center gap-2"
                      >
                        <CancelIcon width={16} height={16} />
                        {!sideNavCollapsed && <span>Выйти</span>}
                      </Button>
                    }
                  />
                </div>
                <div className="flex-1 rounded-xl border border-dashed border-border/70 bg-white/60 p-6 text-sm text-muted-foreground">
                  <div className="mb-2 text-base font-semibold text-foreground">
                    Активный пункт:{" "}
                    <span className="text-primary">{sideNavActive}</span>
                  </div>
                  <p>
                    Конфигурируется через массив <code>sections</code> или composition-first
                    API: <code>SideNav.Section</code>, <code>SideNav.Item</code>,{" "}
                    <code>SideNav.Custom</code>. Переключайте Classic / Transparent / Aurora
                    и свёртывание, чтобы оценить варианты.
                  </p>
                </div>
              </div>
            </DemoSection>
          </div>
        </section>

        {/* CATEGORY 3.5: SettingsView */}
        <section>
          <CategoryHeader
            eyebrow="03.5 — Settings"
            title="SettingsView"
            description="Композиционный компонент для страниц настроек: секции, строки с описанием, контролы Switch / Select / Button / ImageSegmented, ссылки Open и опасная зона. API в духе DetailView."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <DemoSection
              title="SettingsView"
              description="Premium-страница настроек. Переключайте variant и density."
              className="lg:col-span-2"
              stageClassName="bg-gradient-to-b from-[#f4f7fa] to-white"
            >
              <div className="mb-5 flex flex-wrap items-center gap-4">
                <RadioGroupButton
                  options={[
                    { value: "classic", label: "Classic" },
                    { value: "elevated", label: "Elevated" },
                  ]}
                  value={settingsVariant}
                  onChange={(v) => setSettingsVariant(v as SettingsVariant)}
                />
                <RadioGroupButton
                  options={[
                    { value: "comfortable", label: "Comfortable" },
                    { value: "compact", label: "Compact" },
                  ]}
                  value={settingsDensity}
                  onChange={(v) => setSettingsDensity(v as SettingsDensity)}
                />
              </div>

              <div className="mx-auto max-w-3xl space-y-5">
                <SettingsView
                  variant={settingsVariant}
                  density={settingsDensity}
                  sections={[
                    {
                      id: "general",
                      title: "General",
                      items: [
                        {
                          id: "account",
                          icon: <ProfileIcon />,
                          label: "Cozy Account",
                          description: "Manage your account and billing",
                          control: (
                            <Button
                              variant="secondary"
                              size="small"
                              onClick={() => window.alert("Open account")}
                            >
                              Open
                            </Button>
                          ),
                        },
                      ],
                    },
                    {
                      id: "preferences",
                      title: "Preferences",
                      items: [
                        {
                          id: "editor",
                          icon: <SettingsIcon />,
                          label: "Editor Settings",
                          description: "Configure font, formatting, minimap and more",
                          control: (
                            <Button variant="secondary" size="small">
                              Open
                            </Button>
                          ),
                        },
                        {
                          id: "shortcuts",
                          icon: <GridIcon />,
                          label: "Keyboard Shortcuts",
                          description: "Configure keyboard shortcuts",
                          control: (
                            <Button variant="secondary" size="small">
                              Open
                            </Button>
                          ),
                        },
                        {
                          id: "import",
                          icon: <NotebookIcon />,
                          label: "Import Settings from VS Code",
                          description: "Import settings, extensions, and keybindings from VS Code",
                          badge: "New",
                          control: (
                            <Button variant="secondary" size="small">
                              Import
                            </Button>
                          ),
                        },
                        {
                          id: "reset-dialogs",
                          icon: <HelpIcon />,
                          label: 'Reset "Don\'t Ask Again" Dialogs',
                          description: "See warnings and tips that you've hidden",
                          control: (
                            <Button variant="secondary" size="small">
                              Show
                            </Button>
                          ),
                        },
                      ],
                    },
                    {
                      id: "layout",
                      title: "Layout",
                      items: [
                        {
                          id: "window-layout",
                          icon: <GridIcon />,
                          label: "Window Layout",
                          description: "Switch between Agent and Editor default layouts",
                          align: "center",
                          control: (
                            <ImageSegmented
                              ariaLabel="Window layout"
                              value={windowLayout}
                              onChange={(v) => setWindowLayout(v as "agent" | "editor")}
                              options={[
                                {
                                  value: "agent",
                                  label: "Agent",
                                  image: (
                                    <svg viewBox="0 0 48 32" aria-hidden>
                                      <rect width="48" height="32" rx="3" fill="#eef3fb" />
                                      <rect
                                        x="3"
                                        y="3"
                                        width="18"
                                        height="26"
                                        rx="2"
                                        fill="#4573d9"
                                        opacity="0.85"
                                      />
                                      <rect
                                        x="23"
                                        y="3"
                                        width="22"
                                        height="26"
                                        rx="2"
                                        fill="#fff"
                                        stroke="#dde5f5"
                                      />
                                    </svg>
                                  ),
                                },
                                {
                                  value: "editor",
                                  label: "Editor",
                                  image: (
                                    <svg viewBox="0 0 48 32" aria-hidden>
                                      <rect width="48" height="32" rx="3" fill="#eef3fb" />
                                      <rect
                                        x="3"
                                        y="3"
                                        width="42"
                                        height="26"
                                        rx="2"
                                        fill="#fff"
                                        stroke="#dde5f5"
                                      />
                                      <rect
                                        x="3"
                                        y="3"
                                        width="42"
                                        height="5"
                                        rx="2"
                                        fill="#4573d9"
                                        opacity="0.85"
                                      />
                                    </svg>
                                  ),
                                },
                              ]}
                            />
                          ),
                        },
                        {
                          id: "conv-density",
                          icon: <ChatIcon />,
                          label: "Conversation Density",
                          description: "Choose how much detail Agent tool calls show in the conversation",
                          control: (
                            <div style={{ width: 180 }}>
                              <Select
                                mode="single"
                                placeholder="Density"
                                value={convDensity}
                                onValueChange={setConvDensity}
                                onClear={() => setConvDensity(null)}
                                options={[
                                  { value: "detailed", label: "Detailed" },
                                  { value: "compact", label: "Compact" },
                                  { value: "minimal", label: "Minimal" },
                                ]}
                              />
                            </div>
                          ),
                        },
                        {
                          id: "status-bar",
                          icon: <ListIcon />,
                          label: "Status Bar",
                          description: "Show status bar at the bottom of the window",
                          control: (
                            <Switch
                              ariaLabel="Status bar"
                              checked={statusBar}
                              onChange={setStatusBar}
                            />
                          ),
                        },
                        {
                          id: "review-loc",
                          icon: <FolderEditIcon />,
                          label: "Review Control Location",
                          description:
                            "Show inline diff review controls in top level breadcrumbs or floating island",
                          control: (
                            <div style={{ width: 180 }}>
                              <Select
                                mode="single"
                                placeholder="Location"
                                value={reviewLoc}
                                onValueChange={setReviewLoc}
                                onClear={() => setReviewLoc(null)}
                                options={[
                                  { value: "breadcrumb", label: "Breadcrumb" },
                                  { value: "island", label: "Floating Island" },
                                ]}
                              />
                            </div>
                          ),
                        },
                        {
                          id: "auto-hide",
                          icon: <EmptyIcon />,
                          label: "Auto-hide editor when empty",
                          description:
                            "When all editors are closed, hide the editor area and maximize chat",
                          control: (
                            <Switch
                              ariaLabel="Auto-hide editor"
                              checked={autoHide}
                              onChange={setAutoHide}
                            />
                          ),
                        },
                      ],
                    },
                    {
                      id: "links",
                      title: "Documentation",
                      description: "Полезные ссылки — целая строка кликабельна",
                      items: [
                        {
                          id: "docs",
                          icon: <HelpIcon />,
                          label: "Read the documentation",
                          description: "Cozy UI guides, recipes, and component API",
                          href: "https://cozy-ui-components.vercel.app",
                          external: true,
                        },
                        {
                          id: "github",
                          icon: <FeedbackIcon />,
                          label: "Send feedback",
                          description: "Report issues or suggest improvements",
                          href: "https://github.com/andreyfedkovich/cozy-ui",
                          external: true,
                        },
                      ],
                    },
                    {
                      id: "danger",
                      title: "Опасная зона",
                      collapsible: true,
                      defaultOpen: false,
                      items: [
                        {
                          id: "delete",
                          icon: <CancelIcon />,
                          label: "Удалить аккаунт",
                          description: "Действие необратимо. Все данные будут удалены.",
                          danger: true,
                          control: (
                            <Button variant="danger" size="small">
                              Удалить
                            </Button>
                          ),
                        },
                      ],
                    },
                  ]}
                />

                <div className="mt-4 text-sm text-muted-foreground">
                  Composition-first: можно мешать <code>sections</code> и{" "}
                  <code>SettingsView.Section / Item / Group</code>. Switch — зелёный iOS-style,
                  ImageSegmented — переключатель с превью (как Agent/Editor), а для строк-ссылок
                  поддержаны <code>href + external</code> и кнопка Open.
                </div>
              </div>
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
