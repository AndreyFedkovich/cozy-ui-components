import cn from "classnames";
import { Calendar as CalendarIcon } from "lucide-react";
import { useMemo, useState, type FocusEventHandler, type ReactNode } from "react";
import { Calendar as DayPicker } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn as cnTw } from "@/lib/utils";
import { FieldErrorCaption } from "../../helpers/field/FieldErrorCaption";
import { useFieldPresentation } from "../../helpers/field/useFieldPresentation";
import {
  resolveValueChangeHandler,
  type FieldValidationProps,
  type ValueFieldCallbacks,
} from "../../helpers/validation";
import { FieldLabel } from "../FieldLabel/FieldLabel";
import {
  formatDdMmYyyy,
  parseYmdToLocalDay,
  startOfLocalDay,
  toYmdString,
} from "./date-utils";
import css from "./Calendar.module.scss";

export interface CalendarProps
  extends ValueFieldCallbacks<string | null>,
    FieldValidationProps {
  label: string;
  required?: boolean;
  value?: string | null;
  /** Нижняя граница выбора (включительно), локальный календарный день */
  minDate?: Date;
  disabled?: boolean;
  onBlur?: FocusEventHandler<HTMLButtonElement>;
  onFocus?: FocusEventHandler<HTMLButtonElement>;
  /** Подсказка по наведению на иконку «?» справа от подписи */
  tooltipContent?: ReactNode;
  tooltipPopperClassName?: string;
  className?: string;
}

export const Calendar = ({
  label,
  required,
  value,
  onValueChange,
  onChange,
  minDate,
  error,
  suppressError,
  fieldMeta,
  showErrorPolicy,
  disabled,
  onBlur,
  onFocus,
  tooltipContent,
  tooltipPopperClassName,
  className,
}: CalendarProps) => {
  const field = useFieldPresentation({
    error,
    suppressError,
    fieldMeta,
    showErrorPolicy,
    idPrefix: "calendar",
  });
  const handleValueChange = resolveValueChangeHandler<string | null>({
    onValueChange,
    onChange,
  });

  const [open, setOpen] = useState(false);

  const selected = useMemo(
    () => parseYmdToLocalDay(value ?? undefined),
    [value],
  );

  const display = useMemo(() => {
    if (!selected) {
      return "";
    }
    return formatDdMmYyyy(selected);
  }, [selected]);

  const minDay = minDate ? startOfLocalDay(minDate) : undefined;

  return (
    <div className={cn(css.wrapper, className)}>
      <FieldLabel
        htmlFor={field.controlId}
        required={required}
        tooltipContent={tooltipContent}
        tooltipPopperClassName={tooltipPopperClassName}
      >
        {label}
      </FieldLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            id={field.controlId}
            disabled={disabled}
            aria-invalid={field.ariaInvalid}
            aria-describedby={field.ariaDescribedBy}
            onBlur={onBlur}
            onFocus={onFocus}
            className={cn(
              css.trigger,
              { [css.error]: field.showError },
              !display && "text-muted-foreground",
            )}
          >
            <span className={css.triggerValue}>
              {display || "Выберите дату"}
            </span>
            <CalendarIcon className={css.triggerIcon} aria-hidden />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className={cnTw(
            "w-auto border border-slate-200 bg-white p-0 text-slate-900 shadow-lg",
          )}
          align="start"
        >
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={(d) => {
              if (!d) {
                handleValueChange?.(null);
              } else {
                handleValueChange?.(toYmdString(startOfLocalDay(d)));
              }
              setOpen(false);
            }}
            disabled={
              minDay
                ? (d) => startOfLocalDay(d).getTime() < minDay.getTime()
                : undefined
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <FieldErrorCaption id={field.errorId} message={field.errorMessage} />
    </div>
  );
};
