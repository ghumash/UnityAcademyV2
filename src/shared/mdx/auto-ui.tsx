// src/shared/mdx/auto-ui.tsx
import dynamic from "next/dynamic";
import * as React from "react";

type AnyComp = React.ComponentType<any>;

/**
 * Авто-реестр: по имени компонента (как в MDX) достаёт экспорт из "@/shared/ui".
 * Пример: <Button> в MDX → AutoUI.Button → динамически возьмётся из "@/shared/ui".
 */
export const UI = new Proxy({} as Record<string, AnyComp>, {
  get(_target, prop: string) {
    // Один общий lazy-чанк для "@/shared/ui"
    const Dyn = dynamic(
      async () => {
        const mod = await import("@/shared/ui");
        const Comp = (mod as any)[prop];
        if (!Comp) {
          // Безопасный fallback: в dev предупредим, в prod — тихо проигнорируем.
          const Fallback = () => {
            if (process.env.NODE_ENV !== "production") {
              console.warn(
                `[MDX auto-ui] Export "${prop}" not found in "@/shared/ui".`
              );
            }
            return null;
          };
          return { default: Fallback as AnyComp };
        }
        return { default: Comp as AnyComp };
      },
      {
        // Оставляем SSR включённым — Next сам создаст клиентский boundary для shadcn-компонентов.
        // Если вдруг где-то словите ошибки рендера, можно переключить на ssr:false.
        ssr: true,
        loading: () => null,
      }
    );

    (Dyn as any).displayName = `AutoUI(${prop})`;
    return Dyn as AnyComp;
  },
});
