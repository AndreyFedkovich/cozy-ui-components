import React, { ButtonHTMLAttributes, forwardRef } from "react";
import classNames from "classnames";
import { Spinner } from "../Spinner/Spinner";
import css from "./Button.module.scss";

export type ButtonVariant = "default" | "primary" | "secondary" | "text" | "link" | "danger";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "default",
      size = "medium",
      className = "",
      loading = false,
      disabled = false,
      children,
      type = "button",
      ...rest
    },
    ref,
  ) => {
    const buttonClasses = classNames(
      css.button,
      css[`button--variant-${variant}`],
      css[`button--size-${size}`],
      {
        [css["button--loading"]]: loading,
        [css["button--disabled"]]: disabled,
      },
      className,
    );

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || loading}
        type={type}
        {...rest}
      >
        {children && children}

        {loading && (
          <span className={css.button__loader}>
            <Spinner size="extraSmall" />
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
