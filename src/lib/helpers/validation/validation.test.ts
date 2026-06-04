import { describe, it, expect } from "vitest";
import { resolveFieldError, resolveFieldMessage, resolveShowError, isFieldInvalid } from "./index";

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

  it("custom policy", () => {
    expect(resolveShowError(invalidMeta, () => true)).toBe(true);
  });

  it("undefined meta", () => {
    expect(resolveShowError(undefined, "default")).toBe(false);
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

  it("uses meta when error undefined", () => {
    expect(
      resolveFieldMessage({
        fieldMeta: { errorMessage: "Meta", invalid: true, touched: true },
      }),
    ).toBe("Meta");
  });
});
