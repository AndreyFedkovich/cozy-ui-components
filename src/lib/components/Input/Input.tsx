import cn from "classnames";
import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { FieldErrorCaption } from "../../helpers/field/FieldErrorCaption";
import { useFieldPresentation } from "../../helpers/field/useFieldPresentation";
import type { FieldValidationProps } from "../../helpers/validation/types";
import { FieldLabel } from "../FieldLabel/FieldLabel";
import css from "./Input.module.scss";

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    FieldValidationProps {
  label?: ReactNode;
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
      fieldMeta,
      showErrorPolicy,
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
    const field = useFieldPresentation({
      error,
      fieldMeta,
      showErrorPolicy,
      idPrefix: "input",
    });
    const inputId = idProp ?? field.controlId;

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
            aria-invalid={field.ariaInvalid}
            aria-describedby={field.ariaDescribedBy}
            className={cn(
              css.input,
              { [css.disabled]: disabled, [css.error]: field.showError },
              inputClassName,
            )}
            {...rest}
          />
        </div>
        <FieldErrorCaption id={field.errorId} message={field.errorMessage} />
      </div>
    );
  },
);

Input.displayName = "Input";
