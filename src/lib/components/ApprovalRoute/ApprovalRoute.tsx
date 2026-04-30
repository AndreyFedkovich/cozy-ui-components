import cn from "classnames";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../Button/Button";
import { DialogSelect } from "../DialogSelect/DialogSelect";
import { CrossIcon, DoneIcon, WarnIcon } from "../../icons";
import type { CustomOption } from "../Select/Select";
import css from "./ApprovalRoute.module.scss";

export type ApprovalStatus = "pending" | "approved" | "rejected";

export type Approver = {
  id: string;
  fullName: string;
  status?: ApprovalStatus;
  actedAt?: string;
  rejectReason?: string;
};

export type ApprovalStage = {
  id: string;
  name: string;
  approvers: Approver[];
};

export type ApprovalLevel = {
  id: string;
  name: string;
  status: "completed" | "current" | "pending";
  stages: ApprovalStage[];
};

type LoadOptionsParams = { search: string; page: number; pageSize: number };
type LoadOptionsResult = { options: CustomOption<unknown, string>[]; total?: number };

export interface ApprovalRouteProps {
  levels: ApprovalLevel[];
  editable?: boolean;
  title?: string;
  eyebrow?: string;
  className?: string;
  loadApprovers?: (params: LoadOptionsParams) => Promise<LoadOptionsResult>;
  onAddLevel?: (name: string) => void;
  onRemoveLevel?: (levelId: string) => void;
  onAddStage?: (levelId: string, name: string) => void;
  onRemoveStage?: (levelId: string, stageId: string) => void;
  onAddApprover?: (
    levelId: string,
    stageId: string,
    person: CustomOption<unknown, string>,
  ) => void;
  onRemoveApprover?: (levelId: string, stageId: string, approverId: string) => void;
}

const PlusIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className={className} aria-hidden="true">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

function NameDialog({
  open,
  title,
  placeholder,
  onSubmit,
  onClose,
}: {
  open: boolean;
  title: string;
  placeholder: string;
  onSubmit: (name: string) => void;
  onClose: () => void;
}) {
  const [value, setValue] = useState("");

  React.useEffect(() => {
    if (!open) setValue("");
  }, [open]);

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:rounded-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className={css.dialogContent}>
          <input
            autoFocus
            className={css.dialogInput}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
              if (e.key === "Escape") onClose();
            }}
          />
          <div className={css.dialogActions}>
            <Button variant="secondary" onClick={onClose}>
              Отмена
            </Button>
            <Button variant="primary" onClick={submit} disabled={!value.trim()}>
              Добавить
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export const ApprovalRoute: React.FC<ApprovalRouteProps> = ({
  levels,
  editable = false,
  title = "Маршрут согласования",
  eyebrow = "Workflow",
  className,
  loadApprovers,
  onAddLevel,
  onRemoveLevel,
  onAddStage,
  onRemoveStage,
  onAddApprover,
  onRemoveApprover,
}) => {
  const [addLevelOpen, setAddLevelOpen] = useState(false);
  const [addStageFor, setAddStageFor] = useState<string | null>(null);

  return (
    <div className={cn(css.root, className)}>
      <div className={css.header}>
        <div className={css.headerText}>
          <span className={css.eyebrow}>{eyebrow}</span>
          <span className={css.title}>{title}</span>
        </div>
      </div>

      <div className={css.timeline}>
        {levels.map((level, index) => {
          const next = levels[index + 1];
          const railClass = cn(css.railLine, {
            [css.railLine_completed]: level.status === "completed" && next?.status === "completed",
            [css.railLine_toCurrent]:
              level.status === "completed" && next?.status === "current",
          });

          return (
            <div key={level.id} className={css.level}>
              <div className={css.rail}>
                {index < levels.length - 1 && <span className={railClass} />}
                <span
                  className={cn(css.marker, {
                    [css.marker_completed]: level.status === "completed",
                    [css.marker_current]: level.status === "current",
                  })}
                >
                  {level.status === "completed" && <DoneIcon />}
                </span>
              </div>

              <div className={css.body}>
                <div className={css.levelHeader}>
                  <span
                    className={cn(css.levelName, {
                      [css.levelName_current]: level.status === "current",
                      [css.levelName_completed]: level.status === "completed",
                    })}
                  >
                    {level.name}
                  </span>
                  {editable && (
                    <>
                      <button
                        type="button"
                        className={css.iconButton}
                        onClick={() => setAddStageFor(level.id)}
                        aria-label="Добавить этап"
                        title="Добавить этап"
                      >
                        <PlusIcon />
                      </button>
                      <button
                        type="button"
                        className={cn(css.iconButton, css.iconButton_danger)}
                        onClick={() => onRemoveLevel?.(level.id)}
                        aria-label="Удалить уровень"
                        title="Удалить уровень"
                      >
                        <CrossIcon />
                      </button>
                    </>
                  )}
                </div>

                {level.stages.length > 0 && (
                  <div className={css.stages}>
                    {level.stages.map((stage) => (
                      <div
                        key={stage.id}
                        className={cn(css.stage, {
                          [css.stage_current]: level.status === "current",
                        })}
                      >
                        <div className={css.stageHeader}>
                          <span className={css.stageName}>{stage.name}</span>
                          <div className={css.stageActions}>
                            {editable && (
                              <>
                                {loadApprovers ? (
                                  <DialogSelect<unknown, string>
                                    value={null}
                                    placeholder=""
                                    title="Добавить согласующего"
                                    searchPlaceholder="Поиск сотрудника"
                                    loadOptions={loadApprovers}
                                    onChange={(person) =>
                                      onAddApprover?.(level.id, stage.id, person)
                                    }
                                    className={css.approverPickerWrap}
                                    inputClassName={css.approverPickerInput}
                                    selectedOptionRender={() => <PlusIcon />}
                                  />
                                ) : null}
                                <button
                                  type="button"
                                  className={cn(css.iconButton, css.iconButton_danger)}
                                  onClick={() => onRemoveStage?.(level.id, stage.id)}
                                  aria-label="Удалить этап"
                                  title="Удалить этап"
                                >
                                  <CrossIcon />
                                </button>
                              </>
                            )}
                          </div>
                        </div>

                        {stage.approvers.length === 0 ? (
                          <span className={css.empty}>
                            <WarnIcon />
                            Согласующий не назначен
                          </span>
                        ) : (
                          <div className={css.approvers}>
                            {stage.approvers.map((a) => {
                              const status = a.status ?? "pending";
                              return (
                                <div key={a.id} className={css.approver}>
                                  <div className={css.approverMain}>
                                    <span
                                      className={cn(css.approverName, {
                                        [css.approverName_pending]: status === "pending",
                                        [css.approverName_approved]: status === "approved",
                                        [css.approverName_rejected]: status === "rejected",
                                      })}
                                    >
                                      {a.fullName}
                                    </span>
                                    {a.actedAt && status !== "pending" && (
                                      <span className={css.approverDate}>{a.actedAt}</span>
                                    )}
                                    {status === "rejected" && a.rejectReason && (
                                      <span className={css.rejectReason}>
                                        Причина: {a.rejectReason}
                                      </span>
                                    )}
                                  </div>
                                  {editable && (
                                    <button
                                      type="button"
                                      className={cn(css.iconButton, css.iconButton_danger)}
                                      onClick={() => onRemoveApprover?.(level.id, stage.id, a.id)}
                                      aria-label="Удалить согласующего"
                                      title="Удалить согласующего"
                                    >
                                      <CrossIcon />
                                    </button>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {editable && (
                  <button
                    type="button"
                    className={css.addStage}
                    onClick={() => setAddStageFor(level.id)}
                  >
                    <PlusIcon /> Добавить этап
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {editable && (
          <div className={css.level}>
            <div className={css.rail}>
              <span className={cn(css.marker)} aria-hidden />
            </div>
            <div className={css.body}>
              <button
                type="button"
                className={cn(css.addStage, css.addLevel)}
                onClick={() => setAddLevelOpen(true)}
              >
                <PlusIcon /> Добавить уровень
              </button>
            </div>
          </div>
        )}
      </div>

      <NameDialog
        open={addLevelOpen}
        title="Новый уровень"
        placeholder="Название уровня"
        onClose={() => setAddLevelOpen(false)}
        onSubmit={(name) => onAddLevel?.(name)}
      />

      <NameDialog
        open={addStageFor !== null}
        title="Новый этап"
        placeholder="Название этапа"
        onClose={() => setAddStageFor(null)}
        onSubmit={(name) => addStageFor && onAddStage?.(addStageFor, name)}
      />
    </div>
  );
};
