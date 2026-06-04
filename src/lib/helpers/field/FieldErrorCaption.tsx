import type { ReactNode } from "react";
import { InputCaption } from "../../components/InputCaption/InputCaption";

type FieldErrorCaptionProps = {
  id: string;
  message: string | null;
};

export function FieldErrorCaption({ id, message }: FieldErrorCaptionProps): ReactNode {
  if (!message) {
    return null;
  }

  return (
    <InputCaption id={id} variant="error" role="alert">
      {message}
    </InputCaption>
  );
}
