import cn from "classnames";
import { Calendar as CalendarIcon } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { Calendar as DayPicker } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn as cnTw } from "@/lib/utils";
import { FieldLabel } from "../FieldLabel/FieldLabel";
import { InputCaption } from "../InputCaption/InputCaption";
import {
  formatDdMmYyyy,
  parseYmdToLocalDay,
  startOfLocalDay,
  toYmdString,
} from "./date-utils";
import css from "./Calendar.module.scss";

export interface CalendarProps {
  label: string;
  required?: boolean;
  value?: string | null;
  onChange: (value: string | null) => void;
  /** Нижняя граница выбора (включительно), локальный календарный день */
  minDate?: Date;
  error?: string | null;
  disabled?: boolean;
  /** Подсказка по наведению на иконку «?» справа от подписи */
  tooltipContent?: ReactNode;
  tooltipPopperClassName?: string;
  className?: string;
}

export const Calendar = ({
  label,
  required,
  value,
  onChange,
  minDate,
  error,
  disabled,
  tooltipContent,
  tooltipPopperClassName,
  className,
}: CalendarProps) => {
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
            disabled={disabled}
            className={cn(
              css.trigger,
              { [css.error]: !!error },
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
                onChange(null);
              } else {
                onChange(toYmdString(startOfLocalDay(d)));
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
      {error ? <InputCaption variant="error">{error}</InputCaption> : null}
    </div>
  );
};
