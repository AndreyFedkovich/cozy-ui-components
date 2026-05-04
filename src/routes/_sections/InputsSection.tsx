import { useCallback, useMemo, useState } from "react";
import {
  DialogSelect,
  InputCaption,
  Label,
  RadioGroupButton,
  Select,
  TreeDialogSelect,
  type CustomOption,
  type TreeNode,
} from "../../lib";
import { CategoryHeader, DemoSection } from "./shared";

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

const employeeSurnames = [
  "Иванов",
  "Петров",
  "Смирнов",
  "Кузнецов",
  "Попов",
  "Васильев",
];
const employeeNamePatronymics = [
  { name: "Александр", patronymic: "Александрович" },
  { name: "Дмитрий", patronymic: "Дмитриевич" },
  { name: "Сергей", patronymic: "Сергеевич" },
  { name: "Иван", patronymic: "Иванович" },
];
const employeeOptions: CustomOption<{ birthDate: string }>[] = Array.from(
  { length: 24 },
  (_, index) => {
    const id = index + 100;
    const surname =
      employeeSurnames[Math.floor(index / employeeNamePatronymics.length) % employeeSurnames.length];
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

export default function InputsSection() {
  const [radio, setRadio] = useState("first");
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

  const filteredCfoOptions = useMemo(
    () =>
      cfoOptions.filter((option) =>
        option.meta?.code.toLowerCase().includes(cfoSearch.toLowerCase()),
      ),
    [cfoSearch],
  );

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

  return (
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
            data={[
              { id: "first", label: "First" },
              { id: "second", label: "Second" },
              { id: "third", label: "Third" },
            ]}
            activeButton={radio}
            onChange={setRadio}
          />
          <p className="mt-3 text-sm text-muted-foreground">
            Активный: <span className="font-medium text-foreground">{radio}</span>
          </p>
        </DemoSection>

        <DemoSection
          title="InputCaption + Label"
          description="Подпись к полю и текст валидации/подсказки."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="demo-field">Email</Label>
              <input
                id="demo-field"
                className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-base"
                defaultValue="user@company.com"
              />
              <InputCaption>Используется для входа в систему.</InputCaption>
            </div>
            <div>
              <Label htmlFor="demo-field-err">Пароль</Label>
              <input
                id="demo-field-err"
                type="password"
                className="mt-2 h-10 w-full rounded-md border border-[#d72d40] bg-background px-3 text-base"
                defaultValue="123"
              />
              <InputCaption>Минимум 8 символов.</InputCaption>
            </div>
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
              options={filteredCfoOptions}
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
      </div>
    </section>
  );
}