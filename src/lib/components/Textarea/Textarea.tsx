import cn from "classnames";
import { forwardRef, useId, type ReactNode, type TextareaHTMLAttributes } from "react";
import { FieldErrorCaption } from "../../helpers/field/FieldErrorCaption";
import { useFieldPresentation } from "../../helpers/field/useFieldPresentation";
import type { FieldValidationProps } from "../../helpers/validation/types";
import { FieldLabel } from "../FieldLabel/FieldLabel";
import { InputCaption, type InputCaptionVariant } from "../InputCaption/InputCaption";
import css from "./Textarea.module.scss";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    FieldValidationProps {
  label?: ReactNode;
  /** Neutral helper text under the textarea (hidden when error is shown). */
  hint?: ReactNode;
  hintVariant?: InputCaptionVariant;
  textareaClassName?: string;
  /** Подсказка по наведению на иконку «?» справа от подписи */
  tooltipContent?: ReactNode;
  tooltipPopperClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      suppressError,
      fieldMeta,
      showErrorPolicy,
      hint,
      hintVariant,
      disabled,
      className,
      textareaClassName,
      tooltipContent,
      tooltipPopperClassName,
      id: idProp,
      ...rest
    },
    ref,
  ) => {
    const hintReactId = useId();
    const hintId = hint ? `hint-${hintReactId.replace(/:/g, "")}` : undefined;

    const field = useFieldPresentation({
      error,
      suppressError,
      fieldMeta,
      showErrorPolicy,
      hintId,
      idPrefix: "textarea",
    });
    const textareaId = idProp ?? field.controlId;

    return (
      <div className={cn(css.wrapper, className)}>
        {label && (
          <FieldLabel
            htmlFor={textareaId}
            tooltipContent={tooltipContent}
            tooltipPopperClassName={tooltipPopperClassName}
          >
            {label}
          </FieldLabel>
        )}

        <div className={css.container}>
          <textarea
            ref={ref}
            id={textareaId}
            disabled={disabled}
            aria-invalid={field.ariaInvalid}
            aria-describedby={field.ariaDescribedBy}
            className={cn(
              css.textarea,
              { [css.disabled]: disabled, [css.error]: field.showError },
              textareaClassName,
            )}
            {...rest}
          />
        </div>
        <FieldErrorCaption id={field.errorId} message={field.errorMessage} />
        {!field.showError && hint && (
          <InputCaption id={hintId} variant={hintVariant ?? "neutral"}>
            {hint}
          </InputCaption>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
