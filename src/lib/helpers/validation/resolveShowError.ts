import type { FieldMeta, ShowErrorPolicy } from "./types";

export function isFieldInvalid(meta: FieldMeta): boolean {
  if (meta.invalid !== undefined) {
    return meta.invalid;
  }
  return !!meta.errorMessage;
}

/** @deprecated Legacy policy — shows on hasValue alone (flash on first keystroke). Prefer `draftFriendly`. */
function defaultPolicy(meta: FieldMeta): boolean {
  if (!isFieldInvalid(meta)) {
    return false;
  }
  return !!(meta.touched || meta.submitted || meta.hasValue);
}

function onBlurPolicy(meta: FieldMeta): boolean {
  if (!isFieldInvalid(meta)) {
    return false;
  }
  return !!(meta.touched || meta.submitted);
}

function onSubmitPolicy(meta: FieldMeta): boolean {
  if (!isFieldInvalid(meta)) {
    return false;
  }
  return !!meta.submitted;
}

function onBlurOrSubmitPolicy(meta: FieldMeta): boolean {
  return onBlurPolicy(meta);
}

function draftFriendlyPolicy(meta: FieldMeta): boolean {
  if (!isFieldInvalid(meta)) {
    return false;
  }
  return !!(
    meta.touched ||
    meta.submitted ||
    meta.stepSubmitted ||
    (meta.dirty && !meta.hasValue) ||
    (meta.hasValue && !meta.dirty)
  );
}

function wizardStepPolicy(meta: FieldMeta): boolean {
  if (!isFieldInvalid(meta)) {
    return false;
  }
  return !!(
    meta.touched ||
    meta.stepSubmitted ||
    meta.submitted ||
    (meta.dirty && !meta.hasValue)
  );
}

function savedInvalidPolicy(meta: FieldMeta): boolean {
  if (!isFieldInvalid(meta)) {
    return false;
  }
  return !!(meta.hasValue && !meta.dirty && !meta.touched);
}

const policyHandlers: Record<
  Exclude<ShowErrorPolicy, ((meta: FieldMeta) => boolean)>,
  (meta: FieldMeta) => boolean
> = {
  default: defaultPolicy,
  onBlur: onBlurPolicy,
  onSubmit: onSubmitPolicy,
  always: isFieldInvalid,
  draftFriendly: draftFriendlyPolicy,
  wizardStep: wizardStepPolicy,
  savedInvalid: savedInvalidPolicy,
  onBlurOrSubmit: onBlurOrSubmitPolicy,
};

export function resolveShowError(
  meta: FieldMeta | undefined,
  policy: ShowErrorPolicy = "default",
): boolean {
  if (!meta) {
    return false;
  }

  if (typeof policy === "function") {
    return policy(meta);
  }

  return policyHandlers[policy](meta);
}
