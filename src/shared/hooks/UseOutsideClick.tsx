// hooks/use-outside-click.ts
import { useEffect } from "react";

// Принимаем любой ref с current: T | null (RefObject или MutableRefObject)
type MaybeRef<T extends HTMLElement> = { current: T | null };

export function useOutsideClick<T extends HTMLElement>(
  ref: MaybeRef<T>,
  onOutsideClick: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;
      const target = event.target as Node | null;

      // Ничего не делаем, если рефа нет или клик внутри элемента
      if (!el || (target && el.contains(target))) return;

      onOutsideClick(event);
    };

    document.addEventListener("mousedown", listener, { passive: true });
    document.addEventListener("touchstart", listener, { passive: true });

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, onOutsideClick]);
}
