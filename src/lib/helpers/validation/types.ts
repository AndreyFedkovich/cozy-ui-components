export type FieldMeta = {
  touched?: boolean;
  dirty?: boolean;
  submitted?: boolean;
  hasValue?: boolean;
  invalid?: boolean;
  errorMessage?: string | null;
};

export type ShowErrorPolicy =
  | "default"
  | "onBlur"
  | "onSubmit"
  | "always"
  | ((meta: FieldMeta) => boolean);

/** Picker controls: canonical value callback + deprecated alias. */
export type ValueFieldCallbacks<T> = {
  onValueChange?: (value: T) => void;
  /** @deprecated Use {@link onValueChange}. Removed in next major. */
  onChange?: (value: T) => void;
};

export type FieldValidationProps = {
  /** Explicit error overrides {@link fieldMeta} + policy when set. */
  error?: string | null;
  fieldMeta?: FieldMeta;
  showErrorPolicy?: ShowErrorPolicy;
};
