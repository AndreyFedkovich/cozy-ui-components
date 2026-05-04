import { useCallback, useState } from "react";
import {
  ApprovalRoute,
  RadioGroupButton,
  type ApprovalLevel,
  type CustomOption,
} from "../../lib";
import { CategoryHeader, DemoSection } from "./shared";

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
      meta: { birthDate: "01.01" },
    };
  },
);

export default function WorkflowSection() {
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
            { id: "a1", fullName: "Мелконян С.Б.", status: "approved", actedAt: "02.03.26 12:05" },
          ],
        },
        {
          id: "stg-2",
          name: "УМП",
          approvers: [
            { id: "a2", fullName: "Мелконян С.Б.", status: "approved", actedAt: "02.03.26 12:05" },
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
            { id: "a3", fullName: "Мелконян С.Б." },
            { id: "a4", fullName: "Андрианова И.П." },
            { id: "a5", fullName: "Пашкова Т.М." },
            { id: "a6", fullName: "Атаманова Т.А." },
            { id: "a7", fullName: "Данилина А.С." },
            { id: "a8", fullName: "Середа Ю.Н." },
          ],
        },
      ],
    },
    { id: "lvl-4", name: "Завершено", status: "pending", stages: [] },
  ]);

  const loadApproversForRoute = useCallback(
    async ({ search, page, pageSize }: { search: string; page: number; pageSize: number }) => {
      await new Promise((r) => window.setTimeout(r, 250));
      const q = search.toLowerCase();
      const filtered = employeeOptions.filter((o) => o.label.toLowerCase().includes(q));
      const start = (page - 1) * pageSize;
      return {
        options: filtered.slice(start, start + pageSize) as unknown as CustomOption<unknown, string>[],
        total: filtered.length,
      };
    },
    [],
  );

  return (
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
              data={[
                { id: "view", label: "Просмотр" },
                { id: "edit", label: "Редактирование" },
              ]}
              activeButton={routeEditable}
              onChange={(v) => setRouteEditable(v)}
            />
          </div>
          <ApprovalRoute
            levels={approvalLevels}
            editable={routeEditable === "edit"}
            loadApprovers={routeEditable === "edit" ? loadApproversForRoute : undefined}
            onAddLevel={(name) =>
              setApprovalLevels((prev) => [
                ...prev,
                { id: `lvl-${Date.now()}`, name, status: "pending", stages: [] },
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
                        stages: [
                          ...l.stages,
                          { id: `stg-${Date.now()}`, name, approvers: [] },
                        ],
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
                            ? { ...s, approvers: s.approvers.filter((a) => a.id !== approverId) }
                            : s,
                        ),
                      }
                    : l,
                ),
              )
            }
          />
        </DemoSection>
      </div>
    </section>
  );
}