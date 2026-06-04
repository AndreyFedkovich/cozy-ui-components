import { describe, it, expect, vi } from "vitest";
import { attemptWizardStep, attemptFormSubmit } from "./attemptWizardStep";

describe("attemptWizardStep", () => {
  it("marks step submitted when validation has step errors", async () => {
    const markStepSubmitted = vi.fn();
    const result = await attemptWizardStep({
      markStepSubmitted,
      step: 1,
      validate: async () => ({ errors: ["cfo"] }),
      hasStepErrors: (v) => v.errors.length > 0,
    });

    expect(result.ok).toBe(false);
    expect(markStepSubmitted).toHaveBeenCalledWith(1);
  });

  it("returns ok when step is valid", async () => {
    const markStepSubmitted = vi.fn();
    const result = await attemptWizardStep({
      markStepSubmitted,
      step: 1,
      validate: async () => ({ errors: [] }),
      hasStepErrors: (v) => v.errors.length > 0,
    });

    expect(result.ok).toBe(true);
    expect(markStepSubmitted).not.toHaveBeenCalled();
  });
});

describe("attemptFormSubmit", () => {
  it("marks form submitted when invalid", async () => {
    const markFormSubmitted = vi.fn();
    const result = await attemptFormSubmit({
      markFormSubmitted,
      validate: async () => ({ valid: false }),
      hasErrors: (v) => !v.valid,
    });

    expect(result.ok).toBe(false);
    expect(markFormSubmitted).toHaveBeenCalled();
  });
});
