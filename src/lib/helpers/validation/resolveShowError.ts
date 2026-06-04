import type { FieldMeta, ShowErrorPolicy } from "./types";

export function isFieldInvalid(meta: FieldMeta): boolean {
  if (meta.invalid !== undefined) {
    return meta.invalid;
  }
  return !!meta.errorMessage;
}

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

const policyHandlers: Record<
  Exclude<ShowErrorPolicy, ((meta: FieldMeta) => boolean)>,
  (meta: FieldMeta) => boolean
> = {
  default: defaultPolicy,
  onBlur: onBlurPolicy,
  onSubmit: onSubmitPolicy,
  always: isFieldInvalid,
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
