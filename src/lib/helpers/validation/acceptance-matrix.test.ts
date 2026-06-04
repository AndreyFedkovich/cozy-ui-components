import { describe, it, expect } from "vitest";
import { resolveFieldMessage, resolveShowError } from "./index";

const REQUIRED = "Required";
const INVALID_DATE = "Invalid date";

function fieldMessage(
  meta: Parameters<typeof resolveFieldMessage>[0]["fieldMeta"],
  policy: "draftFriendly" | "wizardStep" | "default" = "draftFriendly",
) {
  return resolveFieldMessage({ fieldMeta: meta, showErrorPolicy: policy });
}

function showsError(message: string | null): boolean {
  return message != null && message !== "";
}

describe("acceptance matrix (draftFriendly + resolveDisplayError)", () => {
  it("#1 open empty form — no error", () => {
    const meta = {
      invalid: true,
      errorMessage: REQUIRED,
      errorKind: "required" as const,
      touched: false,
      submitted: false,
      dirty: false,
      hasValue: false,
    };
    expect(showsError(fieldMessage(meta))).toBe(false);
  });

  it("#2 first keystroke in required (stale invalid) — no flash", () => {
    const meta = {
      invalid: true,
      errorMessage: REQUIRED,
      errorKind: "required" as const,
      dirty: true,
      hasValue: true,
      touched: false,
      submitted: false,
    };
    expect(showsError(fieldMessage(meta))).toBe(false);
  });

  it("#2 legacy default policy — resolveShowError flashes on hasValue", () => {
    const meta = {
      invalid: true,
      errorMessage: REQUIRED,
      errorKind: "required" as const,
      dirty: true,
      hasValue: true,
      touched: false,
      submitted: false,
    };
    expect(resolveShowError(meta, "default")).toBe(true);
    // resolveDisplayError still suppresses stale required in message layer
    expect(showsError(fieldMessage(meta, "default"))).toBe(false);
  });

  it("#3 blur empty required — show error", () => {
    const meta = {
      invalid: true,
      errorMessage: REQUIRED,
      errorKind: "required" as const,
      touched: true,
      hasValue: false,
      dirty: false,
    };
    expect(showsError(fieldMessage(meta))).toBe(true);
  });

  it("#4 filled then cleared without blur — show error", () => {
    const meta = {
      invalid: true,
      errorMessage: REQUIRED,
      errorKind: "required" as const,
      dirty: true,
      hasValue: false,
      touched: false,
    };
    expect(showsError(fieldMessage(meta))).toBe(true);
  });

  it("#5 loaded invalid date — show error immediately", () => {
    const meta = {
      invalid: true,
      errorMessage: INVALID_DATE,
      errorKind: "semantic" as const,
      dirty: false,
      hasValue: true,
      touched: false,
    };
    expect(showsError(fieldMessage(meta))).toBe(true);
  });

  it("#6 wizard Next on empty step — show step field errors", () => {
    const meta = {
      invalid: true,
      errorMessage: REQUIRED,
      errorKind: "required" as const,
      stepSubmitted: true,
      hasValue: false,
      touched: false,
      dirty: false,
    };
    expect(showsError(fieldMessage(meta))).toBe(true);
    expect(showsError(fieldMessage(meta, "wizardStep"))).toBe(true);
  });

  it("#7 form Submit on invalid — show all errors", () => {
    const meta = {
      invalid: true,
      errorMessage: REQUIRED,
      errorKind: "required" as const,
      submitted: true,
      hasValue: false,
    };
    expect(showsError(fieldMessage(meta))).toBe(true);
  });

  it("#8 save draft without markSubmitted — no mass highlight", () => {
    const meta = {
      invalid: true,
      errorMessage: REQUIRED,
      errorKind: "required" as const,
      submitted: false,
      stepSubmitted: false,
      touched: false,
      dirty: false,
      hasValue: false,
    };
    expect(showsError(fieldMessage(meta))).toBe(false);
  });
});

describe("acceptance matrix — validationPending", () => {
  it("suppresses error while async validate is in flight", () => {
    const meta = {
      invalid: true,
      errorMessage: REQUIRED,
      errorKind: "required" as const,
      touched: true,
      hasValue: false,
      validationPending: true,
    };
    expect(showsError(fieldMessage(meta))).toBe(false);
  });
});

describe("savedInvalid policy", () => {
  it("shows saved invalid on load", () => {
    const meta = {
      invalid: true,
      errorMessage: INVALID_DATE,
      errorKind: "semantic" as const,
      hasValue: true,
      dirty: false,
      touched: false,
    };
    expect(resolveShowError(meta, "savedInvalid")).toBe(true);
    expect(showsError(fieldMessage(meta, "default"))).toBe(true);
  });
});
