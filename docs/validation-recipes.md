# Validation recipes

Cozy UI validation is **headless**: your app owns form state (`useState`, React Hook Form, TanStack Form, etc.). The library answers one question — **when to show an error** — via `fieldMeta` and `showErrorPolicy` on field components (`Input`, `Select`, and others).

Try it live on the [demo site](https://cozy-ui-components.vercel.app). The reference implementation is [`ValidationDemo`](../src/routes/-ValidationDemo.tsx) in this repo.

---

## Which approach to use

| Scenario | Approach |
| -------- | -------- |
| One or few fields, local validation | Build `fieldMeta` manually and pass `showErrorPolicy` |
| Draft save, wizard steps, server-side validate | `useFormFields` with `showErrorPolicy: "draftFriendly"` (recommended) |

For the full API surface (`FieldMeta`, `resolveShowError`, hooks, etc.) see the [Field validation section in README](../README.md#field-validation-headless).

---

## Recipe: simple form

Use this when validation rules live entirely in the client and you do not need draft/wizard semantics.

1. Keep the field value in state.
2. Track `touched` on blur and `submitted` on form submit.
3. Build `fieldMeta` and pass it to the field.

```tsx
import { Input } from "@andreyfedkovich/cozy-ui";
import { useState } from "react";

const [email, setEmail] = useState("");
const [touched, setTouched] = useState(false);
const [submitted, setSubmitted] = useState(false);

const invalid = !email.includes("@");
const meta = {
  touched,
  submitted,
  hasValue: email.trim().length > 0,
  invalid,
  errorMessage: invalid ? "Enter a valid email." : undefined,
};

<Input
  label="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  onBlur={() => setTouched(true)}
  fieldMeta={meta}
  showErrorPolicy="onBlur"
/>;
```

Use `showErrorPolicy="default"` only if you accept legacy behavior (`invalid && hasValue` can flash on the first keystroke).

---

## Recipe: draft-friendly form with live server validation

Use this for product forms that save drafts, validate on the server, and may include wizard steps.

### Step 1 — Field values in state

```tsx
const [name, setName] = useState("");
const [email, setEmail] = useState("");
```

### Step 2 — Debounced server validate

`useValidationRequest` guards against stale responses and exposes `validationPending`.

```tsx
import { useValidationRequest } from "@andreyfedkovich/cozy-ui";

type ValidationResult = { name: string | null; email: string | null };

const validateFn = useCallback(
  () => api.validateDraft({ name, email }),
  [name, email],
);

const { validate, validationPending } = useValidationRequest(validateFn);
const [liveValidation, setLiveValidation] = useState<ValidationResult | null>(null);

useEffect(() => {
  const t = setTimeout(() => {
    void validate().then(setLiveValidation);
  }, 400);
  return () => clearTimeout(t);
}, [name, email, validate]);
```

### Step 3 — `useFormFields` with `draftFriendly`

```tsx
import { useFormFields } from "@andreyfedkovich/cozy-ui";

function inferErrorKind(error: string | null): "required" | "semantic" | undefined {
  if (!error) return undefined;
  if (error.toLowerCase().includes("required")) return "required";
  return "semantic";
}

const form = useFormFields<ValidationResult>({
  showErrorPolicy: "draftFriendly",
  validation: liveValidation,
  validationPending,
  getFieldError: (v, path) => (v ? v[path as keyof ValidationResult] : null),
  getFieldErrorKind: (_v, path) => {
    const err = liveValidation?.[path as keyof ValidationResult] ?? null;
    return inferErrorKind(err);
  },
  stepForField: (path) => (path === "email" ? 1 : undefined), // wizard mapping — your domain
});
```

Pass `errorKind: "required"` from your validator so stale required errors are suppressed while the user types (via `resolveDisplayError` inside the hook).

### Step 4 — Bind each field

```tsx
const nameBind = form.bindField("name", name);

<Input
  label="Name"
  value={name}
  onChange={(e) => {
    setName(e.target.value);
    nameBind.onDirty?.();
  }}
  onBlur={nameBind.onBlur}
  fieldMeta={nameBind.fieldMeta}
  showErrorPolicy={nameBind.showErrorPolicy}
/>;
```

Call `onDirty` in `onChange` so the hook knows the user edited the field. Call `onBlur` from the field’s blur handler.

### Step 5 — Save draft

Save the form data as usual. **Do not** call `markFormSubmitted()` or `markStepSubmitted()` — errors should not appear on every invalid field after a draft save.

```tsx
<Button onClick={saveDraft}>Save draft</Button>
```

### Step 6 — Wizard «Next» and form Submit

Validate on click instead of disabling buttons with `disabled={!isValid}`.

```tsx
import { attemptWizardStep, attemptFormSubmit } from "@andreyfedkovich/cozy-ui";

async function onNext() {
  const { ok } = await attemptWizardStep({
    markStepSubmitted: form.markStepSubmitted,
    validate: () => validate().then(setLiveValidation),
    step: currentStep,
    hasStepErrors: (v, step) => hasErrorsOnStep(v, step),
  });
  if (ok) setCurrentStep((s) => s + 1);
}

async function onSubmit() {
  const { ok } = await attemptFormSubmit({
    markFormSubmitted: form.markFormSubmitted,
    validate: () => validate().then(setLiveValidation),
    hasErrors: (v) => hasAnyErrors(v),
  });
  if (ok) await sendForm();
}
```

API message localization, wizard field → step mapping, and save/send workflow stay in your application.

---

## ShowErrorPolicy reference

| Policy | Use when |
| ------ | -------- |
| `draftFriendly` | Draft save + live validate (recommended for product forms) |
| `wizardStep` | Wizard — highlight fields when user clicks «Next» |
| `savedInvalid` | Show only loaded invalid values (`hasValue && !dirty && !touched`) |
| `onBlur` / `onSubmit` | Simple client-only forms |
| `default` | **Legacy** — shows on `hasValue` alone (may flash on first keystroke) |

### `draftFriendly` logic

```typescript
invalid && (
  touched ||
  submitted ||
  stepSubmitted ||
  (dirty && !hasValue) ||
  (hasValue && !dirty) // saved invalid on load
)
```

`resolveDisplayError` additionally suppresses `errorKind: "required"` when the field already has a value.

---

## Common mistakes

- **Showing errors on `invalid && hasValue` without interaction** — the user sees red on the first keystroke when the API still returns a stale required error. Use `showErrorPolicy="draftFriendly"` instead.

- **Using `error={null}` to mean “fall back to fieldMeta”** — `null` is an explicit override. Omit `error` or use `suppressError` when you want policy-based display.

- **`disabled={!isValid}` on Next / Submit** — users never trigger `submitted`, so errors never appear. Use `attemptWizardStep` / `attemptFormSubmit` and validate on click.

- **Marking dirty only on clear** — if the policy uses `(hasValue && !dirty)` for saved-invalid-on-load, you must call `onDirty` on every edit, not only when clearing.

- **Skipping `resolveDisplayError` in custom glue** — if you reimplement binding without the library helpers, stale required errors can flash again while typing.

---

## Expected behavior (manual QA)

| # | Scenario | Error visible? |
| - | -------- | -------------- |
| 1 | Open empty form | No |
| 2 | First keystroke in required field (stale API error) | No |
| 3 | Blur empty required field | Yes |
| 4 | Fill field, then clear without blur | Yes |
| 5 | Load form with invalid saved value | Yes |
| 6 | Wizard «Next» on empty step | Yes (fields on that step) |
| 7 | Submit invalid form | Yes (all invalid fields) |
| 8 | Save draft (no `markSubmitted`) | No mass highlight |
