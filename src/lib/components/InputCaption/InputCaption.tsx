import cn from "classnames";
import * as React from "react";
import type { PropsWithChildren } from "react";
import css from "./InputCaption.module.scss";

export type InputCaptionVariant = "neutral" | "error" | "success";

interface InputCaptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  isFullWidth?: boolean;
  /** Visual tone. Defaults to `error` for backwards compatibility with validation messages. */
  variant?: InputCaptionVariant;
  /** @deprecated Use {@link variant} */
  type?: InputCaptionVariant;
}

export const InputCaption: React.FC<PropsWithChildren<InputCaptionProps>> = ({
  children,
  isFullWidth,
  variant: variantProp,
  type,
  className,
  ...rest
}) => {
  const variant = variantProp ?? type ?? "error";
  return (
    <p
      className={cn(css.caption, css[`caption_${variant}`], {
        [css.fullWidth]: isFullWidth,
      }, className)}
      {...rest}
    >
      {children}
    </p>
  );
};
