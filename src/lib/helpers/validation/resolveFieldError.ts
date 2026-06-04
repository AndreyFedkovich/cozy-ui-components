import { resolveShowError } from "./resolveShowError";
import type { FieldMeta, ShowErrorPolicy } from "./types";

export function resolveFieldError(
  meta: FieldMeta | undefined,
  policy: ShowErrorPolicy = "default",
): string | null {
  if (!meta?.errorMessage) {
    return null;
  }

  if (!resolveShowError(meta, policy)) {
    return null;
  }

  return meta.errorMessage;
}
