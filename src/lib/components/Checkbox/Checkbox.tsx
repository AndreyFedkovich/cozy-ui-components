import cn from "classnames";
import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";
import { FieldLabel } from "../FieldLabel/FieldLabel";
import { InputCaption } from "../InputCaption/InputCaption";
import { Label } from "../Label/Label";
import labelCss from "../Label/Label.module.scss";
import css from "./Checkbox.module.scss";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
  error?: string | null;
  checkboxClassName?: string;
  /** Подсказка по наведению на иконку «?» справа от подписи */
  tooltipContent?: ReactNode;
  tooltipPopperClassName?: string;
}

const CheckIcon = () => (
  <svg
    className={css.checkIcon}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M2.5 6L5 8.5L9.5 3.5"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      error,
      disabled,
      className,
      checkboxClassName,
      tooltipContent,
      tooltipPopperClassName,
      id: idProp,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = idProp ?? generatedId;

    const field = (
      <div className={cn(css.field, { [css.disabled]: disabled })}>
        <label htmlFor={inputId} className={css.control}>
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            className={css.nativeInput}
            {...rest}
          />
          <span
            className={cn(css.box, { [css.error]: !!error }, checkboxClassName)}
          >
            <CheckIcon />
          </span>
        </label>

        {label && tooltipContent ? (
          <FieldLabel
            htmlFor={inputId}
            tooltipContent={tooltipContent}
            tooltipPopperClassName={tooltipPopperClassName}
            className={css.labelWithTooltip}
            labelClassName={css.labelText}
          >
            {label}
          </FieldLabel>
        ) : label ? (
          <Label htmlFor={inputId} className={cn(labelCss.label_inline, css.labelText)}>
            {label}
          </Label>
        ) : null}
      </div>
    );

    return (
      <div className={cn(css.wrapper, className)}>
        {field}
        {error && <InputCaption>{error}</InputCaption>}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
