"use client";

import { memo, useEffect, useMemo, type JSX } from "react";
import { motion, stagger, useAnimate, useReducedMotion } from "framer-motion";
import { cn } from "@/shared/lib/utils";

type TextGenerateEffectProps = {
  /** Текст, который нужно “напечатать” с эффектом появления */
  words: string;
  /** Доп. классы Tailwind */
  className?: string;
  /** Включить размытие при появлении (дорого для GPU) */
  filter?: boolean;
  /** Длительность анимации для ОДНОГО слова */
  duration?: number;
  /** Тег-обёртка для семантики/SEO (p | h1 | h2 | ...). По умолчанию p */
  as?: keyof JSX.IntrinsicElements;
  /** Задержка между словами */
  staggerDelay?: number;
};

function TextGenerateEffectImpl({
  words,
  className,
  filter = true,
  duration = 0.5,
  as: Tag = "p",
  staggerDelay = 0.12,
}: TextGenerateEffectProps) {
  const [scope, animate] = useAnimate();
  const shouldReduce = useReducedMotion();

  // Чистим лишние пробелы и мемоизируем массив слов
  const wordsArray = useMemo(() => words.trim().split(/\s+/), [words]);

  useEffect(() => {
    if (shouldReduce) return;

    // Анимируем только видимые элементы-слова
    animate(
      "span[data-word]",
      {
        opacity: 1,
        ...(filter ? { filter: "blur(0px)" } : {}),
      },
      {
        duration,
        delay: stagger(staggerDelay),
      }
    );
  }, [animate, duration, filter, staggerDelay, shouldReduce, wordsArray]);

  return (
    <Tag
      className={cn(
        "mt-4 font-bold text-2xl leading-snug tracking-wide dark:text-white text-black",
        className
      )}
    >
      {/* Доступный для скринридеров полный текст (без разбивки по словам) */}
      <span className="sr-only">{words}</span>

      {/* Визуальная часть с анимацией — скрываем от ассистивных технологий */}
      <span ref={scope} aria-hidden="true">
        {wordsArray.map((word, idx) => (
          <motion.span
            key={`${word}-${idx}`}
            data-word
            className={cn(shouldReduce ? "opacity-100" : "opacity-0")}
            style={{
              ...(filter && !shouldReduce ? { filter: "blur(10px)" } : {}),
              ...(shouldReduce ? {} : { willChange: "opacity, filter" }),
            }}
          >
            {word}{" "}
          </motion.span>
        ))}
      </span>
    </Tag>
  );
}

export const TextGenerateEffect = memo(TextGenerateEffectImpl);
TextGenerateEffect.displayName = "TextGenerateEffect";
