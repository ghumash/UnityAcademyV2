"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui";
import { Container, Section } from "@/shared/ui/custom";

/** Можно заменить на свой список; поддерживается 1–10 элементов */
const PHOTOS = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=800&fit=crop&crop=entropy",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=800&fit=crop&crop=entropy",
  "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&h=800&fit=crop&crop=entropy",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=800&fit=crop&crop=entropy",
  "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=800&fit=crop&crop=entropy",
  "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=800&fit=crop&crop=entropy",
  "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=800&fit=crop&crop=entropy",
];

type Direction = "left" | "right";

export function PhotoGallery({
  animationDelay = 0.5,
  images,
  className,
}: {
  animationDelay?: number;
  /** Необязательно: свой массив ссылок (1–10). Если не задан — используются дефолтные */
  images?: string[];
  className?: string;
}) {
  const reduce = useReducedMotion();

  const list = (images?.length ? images : PHOTOS).slice(0, 10);

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
      ? "(max-width: 640px) 90vw, (max-width: 1024px) 60vw, 560px"
      : "(max-width: 640px) 44vw, (max-width: 1024px) 30vw, 220px";

  return (
    <Section className={cn("relative", className)}>
      <Container className="max-w-4xl">
        <div
          aria-hidden="true"
          className="absolute inset-0 top-[200px] -z-10 hidden h-[300px] w-full bg-transparent bg-[linear-gradient(to_right,#57534e_1px,transparent_1px),linear-gradient(to_bottom,#57534e_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:bg-[linear-gradient(to_right,#a8a29e_1px,transparent_1px),linear-gradient(to_bottom,#a8a29e_1px,transparent_1px)] md:block"
        />

        <p className="my-2 text-center text-[0.7rem] font-light uppercase tracking-widest text-slate-600 dark:text-slate-400 md:text-sm">
          ՍՏԵՂԾԻՐ ՔՈ ԱՆՁՆԱԿԱՆԸ
        </p>
        <h2
          className="z-20 mx-auto max-w-2xl bg-gradient-to-r from-slate-900
        via-slate-800 to-slate-900 bg-clip-text pb-8 text-center text-4xl text-transparent
        dark:bg-gradient-to-r dark:from-slate-100 dark:via-slate-200 dark:to-slate-100 md:text-7xl"
        >
          Դասընթացավարի
          <br />
          <span className="text-rose-500">Աշխատանքները</span>
        </h2>

        {/* Плитка без наложений */}
        <motion.ul
          role="list"
          className={cn(
            "grid gap-4 sm:gap-5 md:gap-6 mb-8",
            "grid-cols-[repeat(auto-fit,minmax(160px,1fr))]"
          )}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15% 0px" }}
          variants={containerVariants}
        >
          {list.map((src, i) => {
            const { dx, dy, tilt, direction } = smallOffset(i);

            return (
              <motion.li
                key={src + i}
                variants={itemVariants}
                className="group relative"
                // Микро-сдвиг карточки — “смешанность”, но без выхода из своей ячейки
                style={{
                  transform: `translate(${dx}px, ${dy}px)`,
                }}
                whileHover={
                  reduce
                    ? undefined
                    : {
                        scale: 1.06,
                        rotateZ: direction === "left" ? tilt - 1 : tilt + 1,
                        zIndex: 5,
                      }
                }
                whileTap={reduce ? undefined : { scale: 1.08, zIndex: 10 }}
              >
                <Photo
                  src={src}
                  alt={`Gallery image ${i + 1}`}
                  direction={direction}
                  sizes={sizes}
                  priority={list.length <= 2 && i === 0}
                />
              </motion.li>
            );
          })}
        </motion.ul>

        <div className="flex w-full justify-center">
          <Button asChild aria-label="View All Stories">
            <a href="/stories" rel="noopener noreferrer">
              View All Stories
            </a>
          </Button>
        </div>
      </Container>
    </Section>
  );
}

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

export default PhotoGallery;
