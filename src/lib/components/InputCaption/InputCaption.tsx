import cn from "classnames";
import * as React from "react";
import type { PropsWithChildren } from "react";
import css from "./InputCaption.module.scss";

export type InputCaptionVariant = "neutral" | "error" | "success";

interface InputCaptionProps {
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
}) => {
  const variant = variantProp ?? type ?? "error";
  return (
    <p
      className={cn(css.caption, css[`caption_${variant}`], {
        [css.fullWidth]: isFullWidth,
      })}
    >
      {children}
    </p>
  );
};
