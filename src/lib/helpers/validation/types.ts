export type FieldErrorKind = "required" | "semantic" | "custom";

/**
 * Headless field state for policy-based error display.
 *
 * - `touched` — user blurred the field
 * - `dirty` — user changed the value in the current session (any change, not only clear)
 * - `submitted` — form-level submit failed (`markFormSubmitted`)
 * - `stepSubmitted` — wizard step "Next" failed (`markStepSubmitted`)
 * - `hasValue` — non-empty value (trimmed string, number, selected option, etc.)
 * - `validationPending` — async validate in flight; optionally suppresses display
 * - `errorKind` — drives `resolveDisplayError` (stale required suppression)
 */
export type FieldMeta = {
  touched?: boolean;
  dirty?: boolean;
  submitted?: boolean;
  stepSubmitted?: boolean;
  hasValue?: boolean;
  invalid?: boolean;
  errorMessage?: string | null;
  validationPending?: boolean;
  errorKind?: FieldErrorKind;
};

export type ShowErrorPolicy =
  | "default"
  | "onBlur"
  | "onSubmit"
  | "always"
  | "draftFriendly"
  | "wizardStep"
  | "savedInvalid"
  | "onBlurOrSubmit"
  | ((meta: FieldMeta) => boolean);

/** Picker controls: canonical value callback + deprecated alias. */
export type ValueFieldCallbacks<T> = {
  onValueChange?: (value: T) => void;
  /** @deprecated Use {@link onValueChange}. Removed in next major. */
  onChange?: (value: T) => void;
};

export type FieldValidationProps = {
  /**
   * Explicit error string overrides `fieldMeta` + policy.
   * Omit to use `fieldMeta`. Do not pass `null` — use {@link suppressError} instead.
   */
  error?: string | null;
  /** Force-hide any error from `fieldMeta` or explicit `error`. */
  suppressError?: boolean;
  fieldMeta?: FieldMeta;
  showErrorPolicy?: ShowErrorPolicy;
};

export type FieldBinding = {
  fieldMeta: FieldMeta;
  showErrorPolicy?: ShowErrorPolicy;
  onBlur: () => void;
  onDirty?: () => void;
};
