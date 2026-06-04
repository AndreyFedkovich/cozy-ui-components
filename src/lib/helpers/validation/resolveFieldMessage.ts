import { isFieldInvalid } from "./resolveShowError";
import { resolveFieldError } from "./resolveFieldError";
import type { FieldMeta, ShowErrorPolicy } from "./types";

const WARN_ERROR_NULL =
  "cozy-ui: error={null} suppresses fieldMeta. Use suppressError or omit the error prop.";

/**
 * Resolves the error message to display: explicit `error` wins over fieldMeta + policy.
 */
export function resolveFieldMessage(
  options: {
    error?: string | null;
    suppressError?: boolean;
    fieldMeta?: FieldMeta;
    showErrorPolicy?: ShowErrorPolicy;
  },
): string | null {
  const { error, suppressError, fieldMeta, showErrorPolicy } = options;

  if (suppressError) {
    return null;
  }

  if (error != null && error !== "") {
    return error;
  }

  if (error === null) {
    if (import.meta.env?.DEV && fieldMeta && isFieldInvalid(fieldMeta)) {
      console.warn(WARN_ERROR_NULL);
    }
    return null;
  }

  return resolveFieldError(fieldMeta, showErrorPolicy);
}
