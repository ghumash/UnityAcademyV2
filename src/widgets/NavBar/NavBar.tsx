"use client";

import * as React from "react";
import { memo } from "react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import { siteConfig } from "@/shared/config/common";
import { Button } from "@/shared/ui";
import type { Locale } from "@/shared/lib/i18n";
import { ChevronRight } from "lucide-react";
import { SettingsDropdown } from "../SettingsDropdown/SettingsDropdown";

/** Pass `icon` as a ReactNode (e.g. `<Home size={18} />`) — not a component type */
export type NavItem = {
  name: string;
  url: string;
  icon?: React.ReactNode;
  /** Next.js prefetch toggle (defaults to false to avoid extra network) */
  prefetch?: boolean;
  /** Optional aria-label for better a11y on icon-only viewports */
  ariaLabel?: string;
};

export interface NavBarProps {
  items: ReadonlyArray<NavItem>;
  className?: string;
  /** Mobile: bottom; ≥sm: top (kept from your original). You can override to "top" | "bottom". */
  position?: "top" | "bottom";
  locale: Locale;
  applyButtonLabel: string;
}

/** Helpers */
const stripLocalePrefix = (path: string, locale: string): string => {
  const prefix = `/${locale}`;
  // строго обрезаем только ведущий префикс локали
  if (path === prefix || path === `${prefix}/`) return "/";
  return path.startsWith(`${prefix}/`) ? path.slice(prefix.length) : path;
};

const normalizePath = (path: string): string => {
  if (!path) return "/";
  let p = path.startsWith("/") ? path : `/${path}`;
  // убираем трейлинг слеш кроме корня
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p || "/";
};

const isMatch = (current: string, itemUrl: string): boolean => {
  const base = normalizePath(itemUrl);
  switch (base) {
    case "/":
      return current === "/";
    case "/courses":
      return current === "/courses";
    case "/events":
      return current === "/events";
    default:
      return current === base || current.startsWith(`${base}/`);
  }
};

export const NavBar = memo(
  ({ items, className, position, locale, applyButtonLabel }: NavBarProps) => {
    const reduceMotion = useReducedMotion();
    const pathname = usePathname();

    // Текущий путь без префикса локали и без трейлинг-слеша
    const currentPath = React.useMemo(() => {
      const stripped = stripLocalePrefix(pathname, locale);
      return normalizePath(stripped || "/");
    }, [pathname, locale]);

    if (!items?.length) return null;

    const wrapperPosition =
      position === "top"
        ? "top-0 pt-6"
        : position === "bottom"
          ? "bottom-0 mb-6"
          : "bottom-0 mb-6 sm:top-0 sm:pt-8 sm:mb-0";

    return (
      <nav
        aria-label="Primary"
        className={cn(
          "fixed left-1/2 z-50 -translate-x-1/2 max-h-[5rem]",
          wrapperPosition,
          className
        )}
      >
        <div className="flex items-center gap-1 sm:gap-2 rounded-full border border-border bg-background/5 px-[6px] py-[3px] shadow-lg backdrop-blur-lg">
          {items.map((item) => {
            const active = isMatch(currentPath, item.url);

            return active ? (
              <span
                key={item.name}
                aria-label={item.ariaLabel ?? item.name}
                aria-current="page"
                className={cn(
                  "relative rounded-full border px-3 py-2 md:px-6 text-sm font-semibold transition-all duration-300 outline-none whitespace-nowrap",
                  "bg-muted text-primary border-primary/50 cursor-default"
                )}
              >
                {/* Desktop ≥ md: текст; Mobile < md: иконка (если есть) */}
                <span className="hidden md:inline">{item.name}</span>
                {item.icon ? (
                  <span className="md:hidden" aria-hidden>
                    {item.icon}
                  </span>
                ) : (
                  <span className="md:hidden">{item.name}</span>
                )}

                {/* Активный элемент */}
                <motion.div
                  className="absolute inset-0 -z-10 w-full rounded-full bg-primary/5"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                          duration: 0.3,
                        }
                  }
                >
                  {/* Little "lamp" accent on top */}
                  <motion.div
                    className="absolute -top-2 left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full bg-primary"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : {
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                            delay: 0.1,
                          }
                    }
                  >
                    <div className="absolute -top-2 -left-2 h-6 w-12 rounded-full bg-primary/20 blur-md" />
                    <div className="absolute -top-1 h-6 w-8 rounded-full bg-primary/20 blur-md" />
                    <div className="absolute top-0 left-2 h-4 w-4 rounded-full bg-primary/20 blur-sm" />
                  </motion.div>
                </motion.div>
              </span>
            ) : (
              <Link
                key={item.name}
                href={`/${locale}${item.url}`}
                prefetch={item.prefetch ?? false}
                aria-label={item.ariaLabel ?? item.name}
                className={cn(
                  "relative rounded-full border px-3 py-2 md:px-6 text-sm font-semibold transition-all duration-300 outline-none whitespace-nowrap group",
                  "cursor-pointer text-foreground/80 hover:text-primary hover:bg-muted/50 hover:border-primary/30 hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary/40"
                )}
              >
                {/* Desktop ≥ md: текст; Mobile < md: иконка (если есть) */}
                <span className="hidden md:inline">{item.name}</span>
                {item.icon ? (
                  <span className="md:hidden" aria-hidden>
                    {item.icon}
                  </span>
                ) : (
                  <span className="md:hidden">{item.name}</span>
                )}
              </Link>
            );
          })}

          <div className="h-6 border-l border-border" />

          <div className="flex items-center gap-2">
            <SettingsDropdown locale={locale} />
            <Button
              asChild
              className="hidden sm:flex rounded-full h-9 w-9 p-0 md:h-10 md:w-auto md:px-4 gap-2"
            >
              <Link
                href={`/${locale}${siteConfig.routes.apply}`}
                aria-label={applyButtonLabel}
                title={applyButtonLabel}
              >
                <span className="hidden md:inline">{applyButtonLabel}</span>
                <ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0" />
              </Link>
            </Button>
          </div>
        </div>
      </nav>
    );
  }
);
