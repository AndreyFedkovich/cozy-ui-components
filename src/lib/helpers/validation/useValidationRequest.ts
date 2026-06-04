import { useCallback, useRef, useState } from "react";

export function useValidationRequest<T>(validateFn: () => Promise<T>) {
  const [validationPending, setValidationPending] = useState(false);
  const generationRef = useRef(0);

  const isStale = useCallback((generation: number) => generation !== generationRef.current, []);

  const validate = useCallback(async (): Promise<T> => {
    const generation = ++generationRef.current;
    setValidationPending(true);
    try {
      const result = await validateFn();
      if (isStale(generation)) {
        return result;
      }
      return result;
    } finally {
      if (!isStale(generation)) {
        setValidationPending(false);
      }
    }
  }, [isStale, validateFn]);

  return {
    validate,
    validationPending,
    validationGeneration: generationRef.current,
    isStale,
  };
}

export type ValidationRequestApi<T> = ReturnType<typeof useValidationRequest<T>>;
