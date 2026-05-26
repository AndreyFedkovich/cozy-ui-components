import cn from "classnames";
import { forwardRef, useCallback, useId, useState, type ReactNode } from "react";
import { FieldLabel } from "../FieldLabel/FieldLabel";
import { Label } from "../Label/Label";
import labelCss from "../Label/Label.module.scss";
import css from "./Switch.module.scss";

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (next: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md";
  color?: "green" | "blue";
  ariaLabel?: string;
  id?: string;
  className?: string;
  label?: ReactNode;
  /** Подсказка по наведению на иконку «?» справа от подписи */
  tooltipContent?: ReactNode;
  tooltipPopperClassName?: string;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  {
    checked,
    defaultChecked,
    onChange,
    disabled,
    size = "md",
    color = "green",
    ariaLabel,
    id: idProp,
    className,
    label,
    tooltipContent,
    tooltipPopperClassName,
  },
  ref,
) {
  const generatedId = useId();
  const switchId = idProp ?? generatedId;

  const [internal, setInternal] = useState<boolean>(!!defaultChecked);
  const isControlled = checked !== undefined;
  const value = isControlled ? !!checked : internal;

  const handleClick = useCallback(() => {
    if (disabled) return;
    const next = !value;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  }, [disabled, value, isControlled, onChange]);

  const control = (
    <button
      ref={ref}
      id={switchId}
      type="button"
      role="switch"
      aria-checked={value}
      aria-label={label ? undefined : ariaLabel}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        css.root,
        size === "sm" && css.size_sm,
        color === "blue" && css.color_blue,
        value && css.checked,
        disabled && css.disabled,
        !label && className,
      )}
    >
      <span className={cn(css.thumb, value && css.thumb_checked)} />
    </button>
  );

  if (!label) {
    return control;
  }

  return (
    <div className={cn(css.wrapper, className)}>
      <div className={cn(css.field, { [css.disabled]: disabled })}>
        {control}
        {tooltipContent ? (
          <FieldLabel
            htmlFor={switchId}
            tooltipContent={tooltipContent}
            tooltipPopperClassName={tooltipPopperClassName}
            className={css.labelWithTooltip}
            labelClassName={css.labelText}
          >
            {label}
          </FieldLabel>
        ) : (
          <Label htmlFor={switchId} className={cn(labelCss.label_inline, css.labelText)}>
            {label}
          </Label>
        )}
      </div>
    </div>
  );
});

Switch.displayName = "Switch";
