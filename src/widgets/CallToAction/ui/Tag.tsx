/**
 * Tag компонент для CallToAction
 * Отображает отдельный тег с позиционированием
 */

import { memo } from "react";
import { cn } from "@/shared/lib/utils";
import type { TagProps } from "../model/types";

export const Tag = memo(({ id, label, style }: TagProps) => {
  return (
    <div
      id={id}
      style={{ ...style, opacity: 0.4 }}
      className={cn(
        "absolute -translate-x-1/2 -translate-y-1/2 transform rounded-3xl border px-2 py-1.5 text-xs w-full max-w-[140px] text-center",
        "border-foreground-400 bg-foreground-200 dark:border-foreground-600 dark:bg-foreground-800"
      )}
    >
      {label}
    </div>
  );
});
