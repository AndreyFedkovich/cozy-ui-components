import type { ReactNode } from "react";
import cn from "classnames";
import css from "./ImageSegmented.module.scss";

export interface ImageSegmentedOption<T extends string = string> {
  value: T;
  label: ReactNode;
  image: ReactNode;
  disabled?: boolean;
}

export interface ImageSegmentedProps<T extends string = string> {
  value: T;
  onChange: (next: T) => void;
  options: ImageSegmentedOption<T>[];
  size?: "sm" | "md";
  ariaLabel?: string;
  className?: string;
}

export function ImageSegmented<T extends string = string>({
  value,
  onChange,
  options,
  size = "md",
  ariaLabel,
  className,
}: ImageSegmentedProps<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn(css.root, size === "sm" && css.size_sm, className)}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-disabled={opt.disabled || undefined}
            disabled={opt.disabled}
            onClick={() => !opt.disabled && onChange(opt.value)}
            className={cn(
              css.option,
              active && css.option_active,
              opt.disabled && css.option_disabled,
            )}
          >
            <span className={css.preview}>{opt.image}</span>
            <span className={css.label}>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}