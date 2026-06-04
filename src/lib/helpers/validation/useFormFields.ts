import { useCallback, useMemo, useState } from "react";
import { hasFieldValue } from "./hasFieldValue";
import type { FieldBinding, FieldErrorKind, FieldMeta, ShowErrorPolicy } from "./types";

export type UseFormFieldsOptions<TValidation> = {
  showErrorPolicy?: ShowErrorPolicy;
  validation?: TValidation;
  getFieldError?: (validation: TValidation | undefined, path: string) => string | null;
  getFieldErrorKind?: (
    validation: TValidation | undefined,
    path: string,
  ) => FieldErrorKind | undefined;
  /** Maps field path to wizard step index for stepSubmitted. */
  stepForField?: (path: string) => number | undefined;
  validationPending?: boolean;
};

type InteractionState = {
  touched: Set<string>;
  dirty: Set<string>;
};

export function useFormFields<TValidation>(options: UseFormFieldsOptions<TValidation> = {}) {
  const {
    showErrorPolicy = "draftFriendly",
    validation,
    getFieldError,
    getFieldErrorKind,
    stepForField,
    validationPending = false,
  } = options;

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submittedSteps, setSubmittedSteps] = useState<Set<number>>(() => new Set());
  const [interaction, setInteraction] = useState<InteractionState>(() => ({
    touched: new Set(),
    dirty: new Set(),
  }));

  const markFieldTouched = useCallback((path: string) => {
    setInteraction((prev) => {
      if (prev.touched.has(path)) {
        return prev;
      }
      const touched = new Set(prev.touched);
      touched.add(path);
      return { ...prev, touched };
    });
  }, []);

  const markFieldDirty = useCallback((path: string) => {
    setInteraction((prev) => {
      if (prev.dirty.has(path)) {
        return prev;
      }
      const dirty = new Set(prev.dirty);
      dirty.add(path);
      return { ...prev, dirty };
    });
  }, []);

  const markStepSubmitted = useCallback((step: number) => {
    setSubmittedSteps((prev) => {
      if (prev.has(step)) {
        return prev;
      }
      const next = new Set(prev);
      next.add(step);
      return next;
    });
  }, []);

  const markFormSubmitted = useCallback(() => {
    setFormSubmitted(true);
  }, []);

  const resetInteraction = useCallback(() => {
    setFormSubmitted(false);
    setSubmittedSteps(new Set());
    setInteraction({ touched: new Set(), dirty: new Set() });
  }, []);

  const bindField = useCallback(
    (path: string, value: unknown): FieldBinding => {
      const step = stepForField?.(path);
      const stepSubmitted = step != null && submittedSteps.has(step);
      const submitted = formSubmitted || stepSubmitted;
      const errorMessage = getFieldError?.(validation, path) ?? null;
      const errorKind = getFieldErrorKind?.(validation, path);
      const invalid = errorMessage != null && errorMessage !== "";

      const fieldMeta: FieldMeta = {
        touched: interaction.touched.has(path),
        dirty: interaction.dirty.has(path),
        submitted: formSubmitted,
        stepSubmitted,
        hasValue: hasFieldValue(value),
        invalid,
        errorMessage,
        errorKind,
        validationPending,
      };

      return {
        fieldMeta,
        showErrorPolicy,
        onBlur: () => markFieldTouched(path),
        onDirty: () => markFieldDirty(path),
      };
    },
    [
      formSubmitted,
      getFieldError,
      getFieldErrorKind,
      interaction.dirty,
      interaction.touched,
      markFieldDirty,
      markFieldTouched,
      showErrorPolicy,
      stepForField,
      submittedSteps,
      validation,
      validationPending,
    ],
  );

  return useMemo(
    () => ({
      bindField,
      markFieldTouched,
      markFieldDirty,
      markStepSubmitted,
      markFormSubmitted,
      resetInteraction,
      formSubmitted,
      submittedSteps,
      showErrorPolicy,
    }),
    [
      bindField,
      formSubmitted,
      markFieldDirty,
      markFieldTouched,
      markFormSubmitted,
      markStepSubmitted,
      resetInteraction,
      showErrorPolicy,
      submittedSteps,
    ],
  );
}

export type FormFieldsApi<TValidation> = ReturnType<typeof useFormFields<TValidation>>;
