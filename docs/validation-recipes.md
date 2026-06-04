# Validation recipes

Headless validation for forms with server-side validate, drafts, and wizards — without a custom `fieldMeta` glue layer.

## Quick start (erp-hr adapter ≤50 LOC)

```tsx
import { Input, useFormFields } from "@andreyfedkovich/cozy-ui";

const form = useFormFields({
  showErrorPolicy: "draftFriendly",
  validation: liveValidationResult,
  validationPending: request.validationPending,
  getFieldError: (v, path) => getFieldError(v, path),
  getFieldErrorKind: (v, path) => inferErrorKind(v, path),
  stepForField: getStepForFieldPath,
});

const emailBind = form.bindField("email", email);

<Input
  label="Email"
  value={email}
  onChange={(e) => {
    setEmail(e.target.value);
    emailBind.onDirty?.();
  }}
  onBlur={emailBind.onBlur}
  fieldMeta={emailBind.fieldMeta}
  showErrorPolicy={emailBind.showErrorPolicy}
/>;
```

## ShowErrorPolicy presets

| Policy | Use when |
|--------|----------|
| `draftFriendly` | ERP forms with draft save + live validate (recommended) |
| `wizardStep` | Wizard steps — highlight on «Next» |
| `savedInvalid` | Show only loaded invalid values (`hasValue && !dirty && !touched`) |
| `onBlur` / `onSubmit` | Simple forms |
| `default` | **Legacy** — shows on `hasValue` alone (flash on first keystroke) |

### draftFriendly

```typescript
invalid && (
  touched ||
  submitted ||
  stepSubmitted ||
  (dirty && !hasValue) ||
  (hasValue && !dirty)  // saved invalid on load
)
```

Plus `resolveDisplayError`: suppress `required` when `hasValue`.

## Acceptance scenarios (unit-tested)

| # | Scenario | Error visible? |
|---|----------|----------------|
| 1 | Open empty form | No |
| 2 | First keystroke in required (stale API) | No |
| 3 | Blur empty required | Yes |
| 4 | Fill → clear without blur | Yes |
| 5 | Loaded invalid date | Yes |
| 6 | Wizard «Next» on empty step | Yes (step fields) |
| 7 | Form Submit invalid | Yes (all invalid) |
| 8 | Save draft (no markSubmitted) | No mass highlight |

## Recipes

### Draft save without validate

Do **not** call `markFormSubmitted()` or `markStepSubmitted()`. Use `showErrorPolicy="draftFriendly"`.

```tsx
<Button onClick={saveDraft}>Save draft</Button>
```

### Validate-on-click for «Next» and Submit

Do **not** use `disabled={!isValid}` as primary UX.

```tsx
import { attemptWizardStep, attemptFormSubmit } from "@andreyfedkovich/cozy-ui";

async function onNext() {
  const { ok } = await attemptWizardStep({
    markStepSubmitted: form.markStepSubmitted,
    validate: () => runValidate(),
    step: currentStep,
    hasStepErrors: (v, step) => hasErrorsOnStep(v, step),
  });
  if (ok) setCurrentStep((s) => s + 1);
}

async function onSubmit() {
  const { ok } = await attemptFormSubmit({
    markFormSubmitted: form.markFormSubmitted,
    validate: () => runValidate(),
    hasErrors: (v) => !v.isValid,
  });
  if (ok) await sendForApproval();
}
```

### Server-side validate + live debounce

```tsx
import { useValidationRequest } from "@andreyfedkovich/cozy-ui";

const { validate, validationPending } = useValidationRequest(() =>
  api.validateDraft(formData),
);

useEffect(() => {
  const t = setTimeout(() => void validate(), 400);
  return () => clearTimeout(t);
}, [formData, validate]);

const form = useFormFields({
  showErrorPolicy: "draftFriendly",
  validation: liveResult,
  validationPending,
  getFieldError,
  getFieldErrorKind: inferErrorKind,
});
```

Pass `errorKind: "required"` from server errors so stale required is suppressed while typing.

## Anti-patterns (DO NOT)

```
DO NOT: show error when invalid && hasValue without touched/submitted/savedInvalid
DO NOT: use error={null} to mean "fall back to fieldMeta" — use suppressError or omit error
DO NOT: disabled={!isValid} as primary UX for Next/Submit — use validate-on-click
DO NOT: mark dirty only on clear if policy uses (hasValue && !dirty) for saved invalid
DO NOT: rely on formSubmitted if button never clickable (disabled before click)
DO NOT: ship useFormFields without resolveDisplayError (stale required flash returns)
```

## Migration: was → now

| Was (erp-hr glue) | Now (cozy-ui) |
|-------------------|---------------|
| `useFormFieldBinding` (~188 LOC) | `useFormFields` |
| `field-meta.util.ts` | `hasFieldValue` + hook internals |
| `requestFieldShowErrorPolicy` | `showErrorPolicy="draftFriendly"` |
| `getFieldErrorForDisplay` | `resolveDisplayError` + `errorKind` |
| `explicitErrorProps` / `error={null}` | omit `error` or `suppressError` |

## Consumer verification (Задание B — erp-hr)

After upgrading to cozy-ui >= 0.10.0:

1. Bump `@andreyfedkovich/cozy-ui` in app-budget
2. Replace `useFormFieldBinding` → `useFormFields` + adapter above
3. Delete `field-meta.util.ts` (+ tests if covered here)
4. Remove `*ForDisplay` helpers; pass `errorKind` from `inferErrorKind`
5. Remove `explicitErrorProps` / `requestFieldShowErrorPolicy`
6. Keep domain: `document-step-validation`, API message localization, workflow save/send

**Files to delete in erp-hr:**

- `use-form-field-binding.hook.ts`
- `field-meta.util.ts`
- `field-meta.util.test.ts`
- `*ForDisplay` blocks in `validation-field-errors.util.ts`

**UI regression checklist:**

- [ ] Empty form — no red (#1)
- [ ] First keystroke — no flash (#2)
- [ ] «Next» on empty step — step highlight (#6)
- [ ] Submit invalid — all errors (#7)
- [ ] Save draft — no mass highlight (#8)
- [ ] Loaded draft with invalid date — error immediately (#5)

**DoD:** ≥200 LOC generic glue removed; 39+ position-request unit tests green.

## Non-goals (stay in app)

- API message localization (`MESSAGE_BY_EXACT`)
- Wizard field → step mapping (domain)
- Draft save / skip validate on backend
- Workflow save + sendForApproval
