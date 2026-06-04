import type { ValueFieldCallbacks } from "./types";

const WARN_BOTH =
  "cozy-ui: pass only onValueChange, not both onValueChange and onChange.";

export function resolveValueChangeHandler<T>(
  callbacks: ValueFieldCallbacks<T>,
): ((value: T) => void) | undefined {
  const { onValueChange, onChange } = callbacks;

  if (import.meta.env?.DEV && onValueChange && onChange) {
    console.warn(WARN_BOTH);
  }

  return onValueChange ?? onChange;
}
