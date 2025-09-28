/**
 * Pointer компонент для CallToAction
 * Анимированный указатель, который перемещается между тегами
 */

import { memo } from "react";

export const Pointer = memo(() => {
  return (
    <div id="pointer" className="absolute">
      <svg
        width="16.8"
        height="18.2"
        viewBox="0 0 12 13"
        className="fill-red-500"
        stroke="white"
        strokeWidth="1"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 5.50676L0 0L2.83818 13L6.30623 7.86537L12 5.50676Z"
        />
      </svg>
      <span className="relative -top-1 left-3 rounded-3xl bg-red-500 px-2 py-1 text-xs text-white">
        User
      </span>
    </div>
  );
});
