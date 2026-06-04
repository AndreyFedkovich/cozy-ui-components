import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useFormFields } from "./useFormFields";

type Validation = Record<string, string | null>;

describe("useFormFields", () => {
  it("bindField builds fieldMeta from validation and interaction", () => {
    const validation: Validation = { email: "Required" };
    const { result } = renderHook(() =>
      useFormFields({
        validation,
        getFieldError: (v, path) => v?.[path] ?? null,
        getFieldErrorKind: () => "required",
      }),
    );

    const bind = result.current.bindField("email", "");
    expect(bind.fieldMeta.errorMessage).toBe("Required");
    expect(bind.fieldMeta.hasValue).toBe(false);
    expect(bind.fieldMeta.submitted).toBe(false);
    expect(bind.showErrorPolicy).toBe("draftFriendly");
  });

  it("markFormSubmitted sets submitted on bind", () => {
    const validation: Validation = { email: "Required" };
    const { result } = renderHook(() =>
      useFormFields({
        validation,
        getFieldError: (v, path) => v?.[path] ?? null,
      }),
    );

    act(() => result.current.markFormSubmitted());
    const bind = result.current.bindField("email", "");
    expect(bind.fieldMeta.submitted).toBe(true);
  });

  it("markStepSubmitted applies stepSubmitted for mapped fields", () => {
    const validation: Validation = { cfo: "Required" };
    const { result } = renderHook(() =>
      useFormFields({
        validation,
        getFieldError: (v, path) => v?.[path] ?? null,
        stepForField: (path) => (path === "cfo" ? 1 : undefined),
      }),
    );

    act(() => result.current.markStepSubmitted(1));
    const bind = result.current.bindField("cfo", "");
    expect(bind.fieldMeta.stepSubmitted).toBe(true);
  });

  it("markFieldDirty on bind onDirty", () => {
    const { result } = renderHook(() => useFormFields({}));

    act(() => {
      result.current.bindField("name", "a").onDirty?.();
    });
    const bind = result.current.bindField("name", "a");
    expect(bind.fieldMeta.dirty).toBe(true);
  });
});
