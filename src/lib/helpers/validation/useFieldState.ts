import { useMemo } from "react";
import { resolveFieldMessage } from "./resolveFieldMessage";
import { resolveShowError } from "./resolveShowError";
import type { FieldMeta, ShowErrorPolicy } from "./types";

export function useFieldState(
  fieldMeta: FieldMeta | undefined,
  policy: ShowErrorPolicy = "default",
  explicitError?: string | null,
) {
  return useMemo(() => {
    const message = resolveFieldMessage({
      error: explicitError,
      fieldMeta,
      showErrorPolicy: policy,
    });
    const showError = !!message;

    return {
      showError,
      errorMessage: message,
      showErrorByPolicy: fieldMeta ? resolveShowError(fieldMeta, policy) : false,
    };
  }, [explicitError, fieldMeta, policy]);
}
