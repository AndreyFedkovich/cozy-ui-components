import { resolveFieldError } from "./resolveFieldError";
import type { FieldMeta, ShowErrorPolicy } from "./types";

/**
 * Resolves the error message to display: explicit `error` wins over fieldMeta + policy.
 */
export function resolveFieldMessage(
  options: {
    error?: string | null;
    fieldMeta?: FieldMeta;
    showErrorPolicy?: ShowErrorPolicy;
  },
): string | null {
  const { error, fieldMeta, showErrorPolicy } = options;

  if (error != null && error !== "") {
    return error;
  }

  if (error === null) {
    return null;
  }

  return resolveFieldError(fieldMeta, showErrorPolicy);
}
