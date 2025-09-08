"use client";

import { memo, useEffect, useMemo, type JSX, type CSSProperties } from "react";
import { motion, stagger, useAnimate, useReducedMotion } from "motion/react";
import { cn } from "@/shared/lib/utils";

export type TextGenerateEffectProps = {
  /** Текст, который нужно “напечатать” с эффектом появления */
  words: string;
  /** Доп. классы Tailwind */
  className?: string;
  /** Включить размытие при появлении (дорого для GPU) */
  filter?: boolean;
  /** Длительность анимации для ОДНОГО слова (в секундах) */
  duration?: number;
  /** Тег-обёртка для семантики/SEO (p | h1 | h2 | ...). По умолчанию p */
  as?: keyof JSX.IntrinsicElements;
  /** Задержка между словами (в секундах) */
  staggerDelay?: number;
  /** ⏱️ Задержка ПЕРЕД стартом “печати” (в секундах). По умолчанию 0 */
  startDelay?: number;
};

function TextGenerateEffectImpl({
  words,
  className,
  filter = true,
  duration = 0.5,
  as: Tag = "p",
  staggerDelay = 0.12,
  startDelay = 0,
}: TextGenerateEffectProps) {
  const [scope, animate] = useAnimate();
  const shouldReduce = useReducedMotion();

  // Чистим лишние пробелы и мемоизируем массив слов
  const wordsArray = useMemo(() => {
    const trimmed = words.trim();
    return trimmed.length ? trimmed.split(/\s+/) : [];
  }, [words]);

  // Стартовые классы и стили для слова — мемоизированы, чтобы не аллоцировать на каждый рендер
  const initialWordClass = useMemo(
    () => (shouldReduce ? "opacity-100" : "opacity-0"),
    [shouldReduce]
  );

  const initialWordStyle = useMemo<CSSProperties>(() => {
    if (shouldReduce) return {};
    const style: CSSProperties = { willChange: "opacity, filter" };
    if (filter) style.filter = "blur(10px)";
    return style;
  }, [filter, shouldReduce]);

  useEffect(() => {
    if (shouldReduce || wordsArray.length === 0) return;

    // Анимируем только видимые элементы-слова. Включаем стартовую задержку перед стагером.
    animate(
      "span[data-word]",
      {
        opacity: 1,
        ...(filter ? { filter: "blur(0px)" } : {}),
      },
      {
        duration,
        delay: stagger(staggerDelay, { startDelay }),
      }
    );
  }, [
    animate,
    duration,
    filter,
    staggerDelay,
    startDelay,
    shouldReduce,
    wordsArray.length,
  ]);

  // Ничего не рендерим, если текста нет — избежим лишней обёртки и шума для AT/DOM
  if (wordsArray.length === 0) return null;

  return (
    <Tag
      className={cn(
        "font-bold text-2xl leading-snug tracking-wide",
        className
      )}
    >
      {/* Доступный для скринридеров полный текст (без разбивки по словам) */}
      <span className="sr-only">{words}</span>

      {/* Визуальная анимированная часть — скрываем от ассистивных технологий */}
      <span ref={scope} aria-hidden="true">
        {wordsArray.map((word, idx) => (
          <motion.span
            key={`${word}-${idx}`}
            data-word
            className={initialWordClass}
            style={initialWordStyle}
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
