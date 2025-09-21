"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui";
import { Container, Section } from "@/shared/ui/custom";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/shared/ui/dialog";
import { memo } from "react";

type Direction = "left" | "right";

type ProjectConfig = {
  display: boolean;
  subtitle: string;
  titlePart1: string;
  titlePart2: string;
  button?: {
    label: string;
    href: string;
  };
  list: Array<{
    img: string;
    href?: string;
  }>;
};

export const PhotoGallery = memo(
  ({
    animationDelay = 0.5,
    config,
    className,
  }: {
    animationDelay?: number;
    /** Необязательно: свой массив ссылок. Если не задан — используются дефолтные */
    images?: string[];
    /** Конфигурация проектов с изображениями и ссылками */
    config?: ProjectConfig;
    className?: string;
  }) => {
    const reduce = useReducedMotion();

    if (config?.display === false) return null;

    const list = config?.list?.map((item) => item.img) || [];

    // Сохраняем конфигурацию проектов для ссылок
    const projectsConfig = config?.list || [];

    const containerVariants: Variants = {
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: animationDelay },
      },
    };

    const itemVariants: Variants = {
      hidden: { opacity: 0, y: 18, scale: 0.98 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 120, damping: 16, mass: 0.6 },
      },
    };

    // Лёгкая “смешанность” без наложений — маленькие сдвиги внутри плитки
    const smallOffset = (i: number) => {
      // ~[-8..8] px/deg закономерно, но “рандомно” на глаз
      const dx = ((i % 4) - 1.5) * 4; // -6, -2, 2, 6
      const dy = (i % 2 ? -1 : 1) * 4; // ±4
      const direction: Direction = i % 2 === 0 ? "left" : "right";
      const tilt = direction === "left" ? -3 : 3; // базовый наклон
      return { dx, dy, tilt, direction };
    };

    const sizes =
      list.length <= 2
        ? "(max-width: 640px) 90vw, (max-width: 1024px) 45vw, (max-width: 1280px) 40vw, 500px"
        : "(max-width: 640px) 45vw, (max-width: 768px) 30vw, (max-width: 1024px) 22vw, (max-width: 1280px) 20vw, (max-width: 1536px) 18vw, 350px";

    return (
      <Section className={cn("relative", className)}>
        <Container className="max-w-4xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[1600px]">
          <div
            aria-hidden="true"
            className="absolute inset-0 top-[200px] -z-10 hidden h-[300px] w-full bg-transparent bg-[linear-gradient(to_right,#57534e_1px,transparent_1px),linear-gradient(to_bottom,#57534e_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:bg-[linear-gradient(to_right,#a8a29e_1px,transparent_1px),linear-gradient(to_bottom,#a8a29e_1px,transparent_1px)] md:block"
          />

          <p className="my-2 text-center text-[0.7rem] font-light uppercase tracking-widest text-slate-600 dark:text-slate-400 md:text-sm">
            {config?.subtitle}
          </p>
          <h2
            className="z-20 mx-auto max-w-2xl bg-gradient-to-r from-slate-900
        via-slate-800 to-slate-900 bg-clip-text pb-8 text-center text-4xl text-transparent
        dark:bg-gradient-to-r dark:from-slate-100 dark:via-slate-200 dark:to-slate-100 md:text-7xl"
          >
            {config?.titlePart1}
            <br />
            <span className="text-rose-500">{config?.titlePart2}</span>
          </h2>

          {/* Плитка без наложений */}
          <motion.ul
            role="list"
            className={cn(
              "grid gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 mb-8 px-4",
              "grid-cols-2",
              "sm:grid-cols-3",
              "lg:grid-cols-4"
            )}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-15% 0px" }}
            variants={containerVariants}
          >
            {list.map((src, i) => {
              const { dx, dy, tilt, direction } = smallOffset(i);
              const projectConfig = projectsConfig[i];
              const hasLink =
                projectConfig?.href && projectConfig.href.length > 0;

              const photoElement = (
                <Photo
                  src={src}
                  alt={`Gallery image ${i + 1}`}
                  direction={direction}
                  sizes={sizes}
                  priority={list.length <= 2 && i === 0}
                />
              );

              return (
                <motion.li
                  key={i}
                  className="relative"
                  variants={itemVariants}
                  style={{
                    transform: `translate(${dx}px, ${dy}px) rotate(${tilt}deg)`,
                  }}
                  whileHover={
                    reduce
                      ? undefined
                      : {
                          scale: 1.05,
                          rotate: tilt + (direction === "left" ? 2 : -2),
                          zIndex: 5,
                        }
                  }
                  whileTap={reduce ? undefined : { scale: 1.08, zIndex: 10 }}
                >
                  {hasLink ? (
                    <a
                      href={projectConfig.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 rounded-3xl"
                      aria-label={`Open project ${i + 1}`}
                    >
                      {photoElement}
                    </a>
                  ) : (
                    <Dialog>
                      <DialogTrigger asChild>
                        <div
                          className="block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 rounded-3xl cursor-pointer touch-manipulation"
                          role="button"
                          tabIndex={0}
                          aria-label={`View image ${i + 1}`}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              e.currentTarget.click();
                            }
                          }}
                        >
                          {photoElement}
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-black/90 border-none shadow-2xl">
                        <DialogTitle className="sr-only">
                          Gallery image {i + 1}
                        </DialogTitle>
                        <div className="relative w-full h-[80vh] max-w-4xl mx-auto overflow-hidden rounded-xl">
                          <Image
                            fill
                            src={src}
                            alt={`Gallery image ${i + 1} - full size`}
                            className="object-contain"
                            sizes="90vw"
                            quality={95}
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </motion.li>
              );
            })}
          </motion.ul>

          {config?.button?.label && config?.button?.href && (
            <div className="flex w-full justify-center">
              <Button asChild aria-label={config.button.label}>
                <Link
                  href={config.button.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {config.button.label}
                </Link>
              </Button>
            </div>
          )}
        </Container>
      </Section>
    );
  }
);

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function Photo({
  src,
  alt,
  className,
  direction = "left",
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  direction?: Direction;
  sizes: string;
  priority?: boolean;
}) {
  const reduce = useReducedMotion();
  // Небольшой случайный наклон (как было), но стабильный на маунте
  const initialTilt =
    (direction === "left" ? -1 : 1) * Math.round(randomBetween(1, 4));

  return (
    <motion.div
      drag={reduce ? false : true}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileDrag={reduce ? undefined : { scale: 1.03, zIndex: 10 }}
      initial={{ rotate: 0 }}
      animate={{ rotate: initialTilt }}
      className={cn(
        "relative w-full select-none touch-none outline-none",
        "focus-visible:ring-2 focus-visible:ring-rose-500",
        "cursor-grab active:cursor-grabbing",
        className
      )}
      tabIndex={0}
      aria-label={alt}
    >
      <figure className="relative aspect-square overflow-hidden rounded-3xl shadow-sm">
        <Image
          fill
          src={src}
          alt={alt}
          sizes={sizes}
          className="object-cover rounded-3xl"
          decoding="async"
          draggable={false}
          priority={priority}
        />
      </figure>
    </motion.div>
  );
}
