import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useValidationRequest } from "./useValidationRequest";

describe("useValidationRequest", () => {
  it("tracks validationPending and ignores stale responses", async () => {
    let resolveFirst: (v: string) => void;
    let resolveSecond: (v: string) => void;

    const validateFn = vi
      .fn()
      .mockImplementationOnce(
        () =>
          new Promise<string>((resolve) => {
            resolveFirst = resolve;
          }),
      )
      .mockImplementationOnce(
        () =>
          new Promise<string>((resolve) => {
            resolveSecond = resolve;
          }),
      );

    const { result } = renderHook(() => useValidationRequest(validateFn));

    let p1: Promise<string>;
    let p2: Promise<string>;

    act(() => {
      p1 = result.current.validate();
      p2 = result.current.validate();
    });

    expect(result.current.validationPending).toBe(true);

    await act(async () => {
      resolveSecond!("new");
      await p2!;
    });

    expect(result.current.validationPending).toBe(false);

    await act(async () => {
      resolveFirst!("stale");
      await p1!;
    });

    expect(result.current.isStale(0)).toBe(true);
  });
});
