import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useRef, useState } from "react";
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
  InputCaption,
  Label,
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
} from "../lib";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UI Components Demo" },
      {
        name: "description",
        content: "Демо-витрина React UI компонентов, подготовленных для npm-пакета.",
      },
      { property: "og:title", content: "UI Components Demo" },
      {
        property: "og:description",
        content: "Проверочная страница всех публичных компонентов UI-библиотеки.",
      },
    ],
  }),
  component: Index,
});

const tabsItems = [{ title: "Обзор" }, { title: "Данные" }, { title: "Настройки" }];
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
    label: `обзл_ЦФО${num}`,
    meta: { code: codes[index % codes.length] },
  };
});
const employeeOptions: CustomOption<{ birthDate: string }>[] = Array.from(
  { length: 48 },
  (_, index) => {
    const id = index + 100;
    const suffix = index % 3 === 0 ? "Иванович" : index % 3 === 1 ? "Петрович" : "Сергеевич";

    return {
      value: `employee-${id}`,
      label: `Иванов${id} Иван ${suffix}`,
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
          { value: "team-1", label: "Команда фронтенда", hasChildren: false, meta: { kind: "team" } },
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

const findNode = (
  nodes: DeptNode[],
  id: string,
): DeptNode | null => {
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

function DemoSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold tracking-normal text-card-foreground">{title}</h2>
      <div className="min-h-24">{children}</div>
    </section>
  );
}

function Index() {
  const [radio, setRadio] = useState("first");
  const [tab, setTab] = useState(0);
  const [roundedTab, setRoundedTab] = useState(0);
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
  const popoverTarget = useRef<HTMLButtonElement>(null);
  const tooltipTargetId = "tooltip-light-demo-target";

  const loadEmployees = useCallback(
    async ({ search, page, pageSize }: { search: string; page: number; pageSize: number }) => {
      await new Promise((resolve) => window.setTimeout(resolve, 350));

      const normalizedSearch = search.toLowerCase();
      const filteredOptions = employeeOptions.filter((option) =>
        option.label.toLowerCase().includes(normalizedSearch),
      );
      const start = (page - 1) * pageSize;
      const options = filteredOptions.slice(start, start + pageSize);

      return {
        options,
        total: filteredOptions.length,
      };
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

  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground md:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-normal text-muted-foreground">
            npm-ready React package
          </p>
          <h1 className="text-4xl font-bold tracking-normal md:text-5xl">UI Components Demo</h1>
          <p className="max-w-3xl text-base leading-7 text-muted-foreground">
            Витрина публичных компонентов библиотеки из `src/lib`: можно проверить внешний вид,
            интерактивность, сборку и npm-экспорты.
          </p>
        </header>

        <div className="grid gap-5">
          <DemoSection title="BaseBlock">
            <BaseBlock title="Базовый блок" subtitle="Подзаголовок компонента">
              <p className="text-sm text-muted-foreground">Контент внутри BaseBlock.</p>
            </BaseBlock>
          </DemoSection>

          <DemoSection title="Button">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="default">Default</Button>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="text">Text</Button>
              <Button loading>Loading</Button>
            </div>
          </DemoSection>

          <DemoSection title="RadioGroupButton">
            <RadioGroupButton
              data={[
                { id: "first", label: "First" },
                { id: "second", label: "Second" },
                { id: "third", label: "Third" },
              ]}
              activeButton={radio}
              onChange={setRadio}
            />
          </DemoSection>

          <DemoSection title="Card">
            <div className="flex flex-wrap gap-4">
              <Card text="Default card" width={180} height={110} />
              <Card
                text="Colored card"
                width={180}
                height={110}
                backgroundColor="#eef6ff"
                textColor="#0f172a"
              />
            </div>
          </DemoSection>

          <DemoSection title="Carousel">
            <Carousel
              items={[
                { id: 1, caption: "Первый слайд", color: "bg-secondary" },
                { id: 2, caption: "Второй слайд", color: "bg-muted" },
                { id: 3, caption: "Третий слайд", color: "bg-accent" },
              ]}
              renderItem={(item) => (
                <div
                  className={`flex h-40 w-full items-center justify-center rounded-md ${item.color}`}
                >
                  <span className="text-sm font-medium text-foreground">{item.caption}</span>
                </div>
              )}
            />
          </DemoSection>

          <DemoSection title="CopyTextTrigger + TooltipDark">
            <div className="flex items-center gap-4">
              <CopyTextTrigger copied={copied} onClick={handleCopy} ariaLabel="Скопировать">
                Copy package name
              </CopyTextTrigger>
              <TooltipDark title="Темный tooltip" trigger="hover" placement="top">
                <Button variant="secondary">Hover me</Button>
              </TooltipDark>
            </div>
          </DemoSection>

          <DemoSection title="TooltipLight + Popover">
            <div className="flex flex-wrap items-center gap-4">
              <Button id={tooltipTargetId} variant="secondary">
                Light tooltip target
              </Button>
              <TooltipLight placement="top" target={tooltipTargetId}>
                Светлый tooltip
              </TooltipLight>
              <Button ref={popoverTarget} variant="primary">
                Open popover
              </Button>
              <Popover target={popoverTarget} placement="bottom">
                Контент popover-компонента.
              </Popover>
            </div>
          </DemoSection>

          <DemoSection title="Spinner">
            <div className="flex items-center gap-5">
              <Spinner size="big" />
              <Spinner size="small" />
              <Spinner size="extraSmall" />
            </div>
          </DemoSection>

          <DemoSection title="EmptyComponent">
            <EmptyComponent title="Пока пусто" subtitle="Компонент состояния без данных" />
          </DemoSection>

          <DemoSection title="Collapse">
            <Collapse header="Открываемый блок" defaultOpen content="Контент внутри Collapse." />
          </DemoSection>

          <DemoSection title="CollapsableBlock">
            <CollapsableBlock
              header="CollapsableBlock"
              defaultOpen
              infoTooltipContent="Дополнительная подсказка"
              content={<p className="text-sm text-muted-foreground">Раскрываемый контент блока.</p>}
            />
          </DemoSection>

          <DemoSection title="Select">
            <div className="grid gap-4">
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
                loadChildren={loadDeptChildren}
                searchNodes={searchDepartments}
                onChange={setDepartment}
                onClear={() => setDepartment(null)}
              />
            </div>
          </DemoSection>

          <DemoSection title="Stepper">
            <div className="grid gap-6">
              <Stepper
                items={[{}, {}, {}, {}, {}, {}]}
                current={stepperStep}
                onChange={setStepperStep}
              />
              <Stepper
                items={[
                  { label: "Контакты" },
                  { label: "Документы" },
                  { label: "Подтверждение" },
                  { label: "Готово" },
                ]}
                current={stepperStep > 3 ? 3 : stepperStep}
                onChange={setStepperStep}
                showCheckOnCompleted
              />
            </div>
          </DemoSection>

          <DemoSection title="TabsRounded">
            <TabsRounded items={tabsItems} activeTab={roundedTab} onClick={setRoundedTab} />
          </DemoSection>

          <DemoSection title="Tabs">
            <Tabs items={tabsItems} activeTab={tab} changesIndex={2} onClick={setTab} />
          </DemoSection>

          <DemoSection title="Tag">
            <div className="flex flex-wrap gap-3">
              <Tag>Readonly tag</Tag>
              <Tag isSmall onClick={() => undefined}>
                Closable tag
              </Tag>
            </div>
          </DemoSection>

          <DemoSection title="InputCaption + Label">
            <Label htmlFor="demo-field">Demo label</Label>
            <input
              id="demo-field"
              className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              defaultValue="Input value"
            />
            <InputCaption>Caption or validation message</InputCaption>
          </DemoSection>
        </div>
      </div>
    </main>
  );
}
