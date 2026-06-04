import type { ReactNode } from "react";
import type { FieldBinding } from "../validation/types";

export type FormFieldProps = {
  bind: FieldBinding;
  label?: ReactNode;
  required?: boolean;
  children: (props: FieldBinding) => ReactNode;
};

/**
 * Optional wrapper that spreads fieldMeta, showErrorPolicy, and onBlur into a field control.
 */
export function FormField({ bind, children }: FormFieldProps) {
  return children(bind);
}
