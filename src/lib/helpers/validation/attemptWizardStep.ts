export type AttemptWizardStepOptions<TValidation> = {
  markStepSubmitted: (step: number) => void;
  validate: () => Promise<TValidation> | TValidation;
  step: number;
  hasStepErrors: (validation: TValidation, step: number) => boolean;
};

export type AttemptWizardStepResult<TValidation> = {
  ok: boolean;
  validation: TValidation;
};

/**
 * Validate-on-click for wizard "Next" — does not require disabled={!isValid}.
 */
export async function attemptWizardStep<TValidation>(
  options: AttemptWizardStepOptions<TValidation>,
): Promise<AttemptWizardStepResult<TValidation>> {
  const { markStepSubmitted, validate, step, hasStepErrors } = options;
  const validation = await validate();

  if (hasStepErrors(validation, step)) {
    markStepSubmitted(step);
    return { ok: false, validation };
  }

  return { ok: true, validation };
}

export type AttemptFormSubmitOptions<TValidation> = {
  markFormSubmitted: () => void;
  validate: () => Promise<TValidation> | TValidation;
  hasErrors: (validation: TValidation) => boolean;
};

export type AttemptFormSubmitResult<TValidation> = {
  ok: boolean;
  validation: TValidation;
};

/** Validate-on-click for form Submit. */
export async function attemptFormSubmit<TValidation>(
  options: AttemptFormSubmitOptions<TValidation>,
): Promise<AttemptFormSubmitResult<TValidation>> {
  const { markFormSubmitted, validate, hasErrors } = options;
  const validation = await validate();

  if (hasErrors(validation)) {
    markFormSubmitted();
    return { ok: false, validation };
  }

  return { ok: true, validation };
}
