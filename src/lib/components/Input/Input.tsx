import cn from "classnames";
import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";
import { FieldLabel } from "../FieldLabel/FieldLabel";
import { InputCaption } from "../InputCaption/InputCaption";
import css from "./Input.module.scss";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  error?: string | null;
  inputClassName?: string;
  /** Подсказка по наведению на иконку «?» справа от подписи */
  tooltipContent?: ReactNode;
  tooltipPopperClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      disabled,
      className,
      inputClassName,
      tooltipContent,
      tooltipPopperClassName,
      id: idProp,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = idProp ?? generatedId;

    return (
      <div className={cn(css.wrapper, className)}>
        {label && (
          <FieldLabel
            htmlFor={inputId}
            tooltipContent={tooltipContent}
            tooltipPopperClassName={tooltipPopperClassName}
          >
            {label}
          </FieldLabel>
        )}

        <div className={css.container}>
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            className={cn(
              css.input,
              { [css.disabled]: disabled, [css.error]: !!error },
              inputClassName,
            )}
            {...rest}
          />
        </div>
        {error && <InputCaption>{error}</InputCaption>}
      </div>
    );
  },
);

Input.displayName = "Input";
