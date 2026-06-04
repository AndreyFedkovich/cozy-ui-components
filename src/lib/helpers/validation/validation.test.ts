import { describe, it, expect, vi } from "vitest";
import {
  resolveFieldError,
  resolveFieldMessage,
  resolveShowError,
  resolveDisplayError,
  isFieldInvalid,
  hasFieldValue,
} from "./index";

describe("isFieldInvalid", () => {
  it("uses explicit invalid when set", () => {
    expect(isFieldInvalid({ invalid: false, errorMessage: "x" })).toBe(false);
    expect(isFieldInvalid({ invalid: true })).toBe(true);
  });

  it("falls back to errorMessage", () => {
    expect(isFieldInvalid({ errorMessage: "err" })).toBe(true);
    expect(isFieldInvalid({})).toBe(false);
  });
});

describe("resolveShowError", () => {
  const invalidMeta = { invalid: true, errorMessage: "Required" };

  it("default: invalid && (touched || submitted || hasValue)", () => {
    expect(resolveShowError(invalidMeta, "default")).toBe(false);
    expect(resolveShowError({ ...invalidMeta, touched: true }, "default")).toBe(true);
    expect(resolveShowError({ ...invalidMeta, submitted: true }, "default")).toBe(true);
    expect(resolveShowError({ ...invalidMeta, hasValue: true }, "default")).toBe(true);
  });

  it("onBlur: touched || submitted", () => {
    expect(resolveShowError(invalidMeta, "onBlur")).toBe(false);
    expect(resolveShowError({ ...invalidMeta, touched: true }, "onBlur")).toBe(true);
    expect(resolveShowError({ ...invalidMeta, hasValue: true }, "onBlur")).toBe(false);
  });

  it("onSubmit: submitted only", () => {
    expect(resolveShowError({ ...invalidMeta, touched: true }, "onSubmit")).toBe(false);
    expect(resolveShowError({ ...invalidMeta, submitted: true }, "onSubmit")).toBe(true);
  });

  it("always when invalid", () => {
    expect(resolveShowError(invalidMeta, "always")).toBe(true);
    expect(resolveShowError({ invalid: false }, "always")).toBe(false);
  });

  it("draftFriendly: no flash on first keystroke", () => {
    expect(
      resolveShowError(
        { ...invalidMeta, dirty: true, hasValue: true },
        "draftFriendly",
      ),
    ).toBe(false);
    expect(
      resolveShowError(
        { ...invalidMeta, dirty: false, hasValue: true },
        "draftFriendly",
      ),
    ).toBe(true);
    expect(
      resolveShowError(
        { ...invalidMeta, dirty: true, hasValue: false },
        "draftFriendly",
      ),
    ).toBe(true);
  });

  it("wizardStep: stepSubmitted and dirty empty", () => {
    expect(
      resolveShowError({ ...invalidMeta, stepSubmitted: true }, "wizardStep"),
    ).toBe(true);
    expect(
      resolveShowError(
        { ...invalidMeta, dirty: true, hasValue: false },
        "wizardStep",
      ),
    ).toBe(true);
  });

  it("savedInvalid: loaded invalid value", () => {
    expect(
      resolveShowError(
        { ...invalidMeta, hasValue: true, dirty: false, touched: false },
        "savedInvalid",
      ),
    ).toBe(true);
    expect(
      resolveShowError(
        { ...invalidMeta, hasValue: true, dirty: true },
        "savedInvalid",
      ),
    ).toBe(false);
  });

  it("custom policy", () => {
    expect(resolveShowError(invalidMeta, () => true)).toBe(true);
  });

  it("undefined meta", () => {
    expect(resolveShowError(undefined, "default")).toBe(false);
  });
});

describe("resolveDisplayError", () => {
  it("suppresses stale required when hasValue", () => {
    expect(
      resolveDisplayError({
        errorMessage: "Required",
        errorKind: "required",
        hasValue: true,
      }),
    ).toBeNull();
  });

  it("shows semantic errors with value", () => {
    expect(
      resolveDisplayError({
        errorMessage: "Invalid date",
        errorKind: "semantic",
        hasValue: true,
      }),
    ).toBe("Invalid date");
  });

  it("suppresses while validationPending", () => {
    expect(
      resolveDisplayError({
        errorMessage: "Required",
        validationPending: true,
      }),
    ).toBeNull();
  });
});

describe("resolveFieldError", () => {
  it("returns message only when policy allows", () => {
    expect(
      resolveFieldError(
        { errorMessage: "Bad", invalid: true, touched: true },
        "default",
      ),
    ).toBe("Bad");
    expect(
      resolveFieldError({ errorMessage: "Bad", invalid: true }, "default"),
    ).toBeNull();
  });

  it("applies resolveDisplayError for stale required", () => {
    expect(
      resolveFieldError(
        {
          errorMessage: "Required",
          errorKind: "required",
          invalid: true,
          dirty: true,
          hasValue: true,
        },
        "draftFriendly",
      ),
    ).toBeNull();
  });
});

describe("resolveFieldMessage", () => {
  it("explicit error overrides meta", () => {
    expect(
      resolveFieldMessage({
        error: "Override",
        fieldMeta: { errorMessage: "Meta", invalid: true, touched: true },
      }),
    ).toBe("Override");
  });

  it("null error suppresses meta", () => {
    expect(
      resolveFieldMessage({
        error: null,
        fieldMeta: { errorMessage: "Meta", invalid: true, touched: true },
      }),
    ).toBeNull();
  });

  it("suppressError hides meta", () => {
    expect(
      resolveFieldMessage({
        suppressError: true,
        fieldMeta: { errorMessage: "Meta", invalid: true, touched: true },
      }),
    ).toBeNull();
  });

  it("uses meta when error undefined", () => {
    expect(
      resolveFieldMessage({
        fieldMeta: { errorMessage: "Meta", invalid: true, touched: true },
      }),
    ).toBe("Meta");
  });

  it("warns in dev when error=null and fieldMeta invalid", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    resolveFieldMessage({
      error: null,
      fieldMeta: { errorMessage: "Meta", invalid: true },
    });
    if (import.meta.env?.DEV) {
      expect(warn).toHaveBeenCalled();
    }
    warn.mockRestore();
  });
});

describe("hasFieldValue", () => {
  it("trims strings", () => {
    expect(hasFieldValue("  ")).toBe(false);
    expect(hasFieldValue("a")).toBe(true);
  });

  it("handles arrays and objects", () => {
    expect(hasFieldValue([])).toBe(false);
    expect(hasFieldValue([1])).toBe(true);
    expect(hasFieldValue({ value: "x" })).toBe(true);
  });
});
