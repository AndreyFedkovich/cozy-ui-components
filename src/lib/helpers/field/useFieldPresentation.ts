import { useId, useMemo } from "react";
import { resolveFieldMessage } from "../validation/resolveFieldMessage";
import type { FieldMeta, ShowErrorPolicy } from "../validation/types";

export type UseFieldPresentationOptions = {
  error?: string | null;
  suppressError?: boolean;
  fieldMeta?: FieldMeta;
  showErrorPolicy?: ShowErrorPolicy;
  /** When set and no error, included in aria-describedby */
  hintId?: string;
  idPrefix?: string;
};

export function useFieldPresentation(options: UseFieldPresentationOptions) {
  const {
    error,
    suppressError,
    fieldMeta,
    showErrorPolicy,
    hintId,
    idPrefix = "field",
  } = options;

  const reactId = useId();
  const baseId = `${idPrefix}-${reactId.replace(/:/g, "")}`;
  const controlId = `${baseId}-control`;
  const errorId = `${baseId}-error`;

  const errorMessage = useMemo(
    () => resolveFieldMessage({ error, suppressError, fieldMeta, showErrorPolicy }),
    [error, suppressError, fieldMeta, showErrorPolicy],
  );

  const showError = !!errorMessage;

  const ariaDescribedBy = showError ? errorId : hintId;

  return {
    controlId,
    errorId,
    hintId,
    errorMessage,
    showError,
    ariaInvalid: showError ? true : undefined,
    ariaDescribedBy,
  };
}
