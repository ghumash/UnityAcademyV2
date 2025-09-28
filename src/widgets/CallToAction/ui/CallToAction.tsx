"use client";

/**
 * CallToAction UI компонент
 * Основной компонент согласно FSD архитектуре
 */

import { memo } from "react";

import { HighlighterItem, HighlightGroup, Particles } from "@/shared/ui/lib";
import type { CallToActionProps } from "../model/types";
import { useCallToActionAnimation } from "../lib/useCallToActionAnimation";
import { Tag } from "./Tag";
import { Pointer } from "./Pointer";

export const CallToAction = memo(
  <T extends string>({
    title,
    subtitle,
    children,
    activeTagId,
    keys,
    data,
  }: CallToActionProps<T>) => {
    const { scope } = useCallToActionAnimation({ activeTagId, keys });

    return (
      <HighlightGroup className="group h-full">
        <div
          className="group/item h-full md:col-span-6 lg:col-span-12"
          data-aos="fade-down"
        >
          <HighlighterItem className="rounded-3xl p-6">
            <div className="relative z-20 overflow-hidden rounded-3xl border border-foreground-200 bg-white dark:border-foreground-800 dark:bg-black">
              <Particles
                className="absolute inset-0 -z-10 opacity-10 transition-opacity duration-1000 group-hover/item:opacity-100"
                quantity={200}
                color="#555555"
                vy={-0.2}
              />

              <div className="flex flex-col items-center gap-10 p-8 md:14 md:flex-row">
                {/* Левая часть с pointer-анимацией */}
                <div
                  className="relative mx-auto w-full"
                  style={{ height: "min(55vw, 360px)" }} // адаптивная высота
                  ref={scope}
                >
                  {/* Теги: позиции через style в %; центрируем translate(-50%,-50%) */}
                  {keys.map((key) => (
                    <Tag
                      key={key}
                      id={key}
                      label={data[key].displayName}
                      style={data[key].position}
                    />
                  ))}

                  {/* Курсор — центрируем, чтобы совпадал с центрами тегов */}
                  <Pointer />
                </div>

                {/* Правая часть с текстом */}
                <div className="flex w-full flex-col items-center justify-center space-y-4">
                  <div className="w-full">
                    <h3 className="pb-1 font-bold">
                      <span className="text-2xl md:text-4xl">{title}</span>
                    </h3>
                    <p className="text-foreground-400">{subtitle}</p>
                  </div>

                  {children}
                </div>
              </div>
            </div>
          </HighlighterItem>
        </div>
      </HighlightGroup>
    );
  }
);
