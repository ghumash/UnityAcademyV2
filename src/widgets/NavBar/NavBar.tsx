"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import { LanguageSwitcher } from "@/features/i18n";
import { Button } from "@/shared/ui";
import type { Locale } from "@/shared/lib/i18n";
import { ChevronRight } from "lucide-react";

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
  if (base === "/") return current === "/";
  // точное совпадение или начало нового сегмента (исключаем ложные срабатывания вроде /faq2)
  return current === base || current.startsWith(`${base}/`);
};

export const NavBar = React.memo(function NavBar({
  items,
  className,
  position,
  locale,
  applyButtonLabel,
}: NavBarProps) {
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();

  if (!items?.length) return null;

  // Текущий путь без префикса локали и без трейлинг-слеша
  const currentPath = React.useMemo(() => {
    const stripped = stripLocalePrefix(pathname, locale);
    return normalizePath(stripped || "/");
  }, [pathname, locale]);

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
      <div className="flex items-center gap-2 rounded-full border border-border bg-background/5 px-1 py-1 shadow-lg backdrop-blur-lg">
        {items.map((item) => {
          const active = isMatch(currentPath, item.url);

          return (
            <Link
              key={item.name}
              href={`/${locale}${item.url}`}
              prefetch={item.prefetch ?? false}
              aria-label={item.ariaLabel ?? item.name}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative cursor-pointer rounded-full border px-6 py-2 text-sm font-semibold transition-colors outline-none whitespace-nowrap",
                "text-foreground/80 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/40",
                active && "bg-muted text-primary"
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

              {active && (
                <motion.div
                  layoutId="nav-inkbar"
                  className="absolute inset-0 -z-10 w-full rounded-full bg-primary/5"
                  initial={false}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 300, damping: 30 }
                  }
                >
                  {/* Little “lamp” accent on top */}
                  <div className="absolute -top-2 left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full bg-primary">
                    <div className="absolute -top-2 -left-2 h-6 w-12 rounded-full bg-primary/20 blur-md" />
                    <div className="absolute -top-1 h-6 w-8 rounded-full bg-primary/20 blur-md" />
                    <div className="absolute top-0 left-2 h-4 w-4 rounded-full bg-primary/20 blur-sm" />
                  </div>
                </motion.div>
              )}
            </Link>
          );
        })}

        <div className="h-6 border-l border-border" />

        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} />
          <Button
            asChild
            className="hidden sm:flex rounded-full h-9 w-9 p-0 md:h-10 md:w-auto md:px-4 gap-2"
          >
            <Link
              href={`/${locale}/apply`}
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
});
