import { lazy, type ComponentType } from "react";
import { SectionChunkError } from "./shared";

export function lazyDemoSection(loader: () => Promise<{ default: ComponentType<object> }>) {
  return lazy(() =>
    loader().catch(() => ({
      default: SectionChunkError,
    })),
  );
}
