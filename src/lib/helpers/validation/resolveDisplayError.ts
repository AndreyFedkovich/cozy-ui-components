import type { FieldErrorKind, FieldMeta } from "./types";

/**
 * Suppresses stale or in-flight errors before display.
 * WHY: API may still return "required" while the value is already non-empty.
 */
export function resolveDisplayError(options: {
  errorMessage?: string | null;
  errorKind?: FieldErrorKind;
  hasValue?: boolean;
  validationPending?: boolean;
}): string | null {
  const { errorMessage, errorKind, hasValue, validationPending } = options;

  if (!errorMessage) {
    return null;
  }

  if (validationPending) {
    return null;
  }

  if (hasValue && errorKind === "required") {
    return null;
  }

  return errorMessage;
}

export function resolveDisplayErrorFromMeta(meta: FieldMeta): string | null {
  return resolveDisplayError({
    errorMessage: meta.errorMessage,
    errorKind: meta.errorKind,
    hasValue: meta.hasValue,
    validationPending: meta.validationPending,
  });
}
