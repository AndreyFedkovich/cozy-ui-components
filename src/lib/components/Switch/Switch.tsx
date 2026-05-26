import { forwardRef, useCallback, useState } from "react";
import cn from "classnames";
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
    id,
    className,
  },
  ref,
) {
  const [internal, setInternal] = useState<boolean>(!!defaultChecked);
  const isControlled = checked !== undefined;
  const value = isControlled ? !!checked : internal;

  const handleClick = useCallback(() => {
    if (disabled) return;
    const next = !value;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  }, [disabled, value, isControlled, onChange]);

  return (
    <button
      ref={ref}
      id={id}
      type="button"
      role="switch"
      aria-checked={value}
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        css.root,
        size === "sm" && css.size_sm,
        color === "blue" && css.color_blue,
        value && css.checked,
        disabled && css.disabled,
        className,
      )}
    >
      <span className={cn(css.thumb, value && css.thumb_checked)} />
    </button>
  );
});