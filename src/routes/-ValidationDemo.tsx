import { useCallback, useEffect, useRef, useState } from "react";
import {
  Button,
  Input,
  attemptWizardStep,
  useFormFields,
  useValidationRequest,
} from "../lib";

type DemoValidation = {
  name: string | null;
  step1Field: string | null;
};

function inferErrorKind(error: string | null): "required" | "semantic" | undefined {
  if (!error) return undefined;
  if (error.toLowerCase().includes("required") || error.toLowerCase().includes("enter")) {
    return "required";
  }
  return "semantic";
}

/** Demo: draftFriendly + debounced validate + wizard validate-on-click */
export function ValidationDemo() {
  const [name, setName] = useState("");
  const [step1Field, setStep1Field] = useState("");
  const [wizardStep, setWizardStep] = useState(0);
  const [liveValidation, setLiveValidation] = useState<DemoValidation>({
    name: "Enter a name.",
    step1Field: "Enter a value.",
  });

  const validateFn = useCallback(async (): Promise<DemoValidation> => {
    await new Promise((r) => setTimeout(r, 400));
    return {
      name: name.trim() ? null : "Enter a name.",
      step1Field: step1Field.trim() ? null : "Enter a value.",
    };
  }, [name, step1Field]);

  const { validate, validationPending } = useValidationRequest(validateFn);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      void validate().then(setLiveValidation);
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [name, step1Field, validate]);

  const form = useFormFields<DemoValidation>({
    showErrorPolicy: "draftFriendly",
    validation: liveValidation,
    validationPending,
    getFieldError: (v, path) => (v ? v[path as keyof DemoValidation] : null),
    getFieldErrorKind: (_v, path) => {
      const err = liveValidation[path as keyof DemoValidation];
      return inferErrorKind(err);
    },
    stepForField: (path) => (path === "step1Field" ? 1 : undefined),
  });

  const nameBind = form.bindField("name", name);
  const step1Bind = form.bindField("step1Field", step1Field);

  const handleNext = async () => {
    const { ok } = await attemptWizardStep({
      markStepSubmitted: form.markStepSubmitted,
      validate: () => liveValidation,
      step: 1,
      hasStepErrors: (v) => !!v.step1Field,
    });
    if (ok) setWizardStep(1);
  };

  return (
    <div className="grid gap-4 sm:max-w-lg">
      <p className="text-sm text-muted-foreground">
        draftFriendly + debounce 400ms: the first character doesn't flash (#2). Wizard
        "Next" without disabled.
      </p>
      <Input
        label="Name (live validate)"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          nameBind.onDirty?.();
        }}
        onBlur={nameBind.onBlur}
        fieldMeta={nameBind.fieldMeta}
        showErrorPolicy={nameBind.showErrorPolicy}
      />
      {wizardStep === 0 ? (
        <>
          <Input
            label="Step 1 — wizard field"
            value={step1Field}
            onChange={(e) => {
              setStep1Field(e.target.value);
              step1Bind.onDirty?.();
            }}
            onBlur={step1Bind.onBlur}
            fieldMeta={step1Bind.fieldMeta}
            showErrorPolicy={step1Bind.showErrorPolicy}
          />
          <Button variant="secondary" size="small" onClick={() => void handleNext()}>
            Next (validate-on-click)
          </Button>
        </>
      ) : (
        <p className="text-sm text-green-700">Step 2 — wizard passed.</p>
      )}
      <Button
        variant="text"
        size="small"
        onClick={() => {
          form.resetInteraction();
          setWizardStep(0);
        }}
      >
        Reset interaction (draft save demo)
      </Button>
    </div>
  );
}
