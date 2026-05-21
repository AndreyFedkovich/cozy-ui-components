import cn from "classnames";
import { forwardRef, useId, type ReactNode, type TextareaHTMLAttributes } from "react";
import { FieldLabel } from "../FieldLabel/FieldLabel";
import { InputCaption, type InputCaptionVariant } from "../InputCaption/InputCaption";
import css from "./Textarea.module.scss";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  error?: string | null;
  /** Neutral helper text under the textarea (hidden when `error` is set). */
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
    const generatedId = useId();
    const textareaId = idProp ?? generatedId;

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
            aria-invalid={error ? true : undefined}
            className={cn(
              css.textarea,
              { [css.disabled]: disabled, [css.error]: !!error },
              textareaClassName,
            )}
            {...rest}
          />
        </div>
        {error && <InputCaption>{error}</InputCaption>}
        {!error && hint && (
          <InputCaption variant={hintVariant ?? "neutral"}>{hint}</InputCaption>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
