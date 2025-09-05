"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import { LanguageSwitcher } from "@/features/i18n";
import { ModeToggle } from "@/features/theme";
import { Button } from "@/shared/ui";
import type { HeaderDict, Locale } from "@/shared/lib/i18n";
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
  dict: HeaderDict;
  locale: Locale;
}

export const NavBar = React.memo(function NavBar({
  items,
  className,
  position,
  locale,
  dict,
}: NavBarProps) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = React.useState<string>(
    () => items[0]?.name ?? ""
  );

  // Derive active from current path on mount (kept logic)
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const path = window.location.pathname + window.location.hash;
    const m =
      items.find((it) => it.url === path) ??
      items.find((it) => it.url && path.startsWith(it.url));
    if (m) setActive(m.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <div className="flex items-center gap-2 rounded-full border border-border bg-background/5 px-1 py-1 shadow-lg backdrop-blur-lg">
        {items.map((item) => {
          const isActive = active === item.name;
          return (
            <Link
              key={item.name}
              href={`/${locale + item.url}`}
              prefetch={item.prefetch ?? false}
              onClick={() => setActive(item.name)}
              aria-label={item.ariaLabel ?? item.name}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative cursor-pointer border rounded-full px-6 py-2 text-sm font-semibold transition-colors outline-none",
                "text-foreground/80 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/40",
                isActive && "bg-muted text-primary"
              )}
            >
              {/* Desktop ≥ md: text label; Mobile < md: icon (if provided) */}
              <span className="hidden md:inline">{item.name}</span>
              {item.icon ? (
                <span className="md:hidden" aria-hidden>
                  {item.icon}
                </span>
              ) : (
                <span className="md:hidden">{item.name}</span>
              )}

              {isActive && (
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
        <div className="h-6 border border-border" />
        <div className="flex items-center gap-2">
          <ModeToggle />
          <LanguageSwitcher locale={locale} />
          <Button
            asChild
            className="
              rounded-full
              h-9 w-9 p-0
              md:h-10 md:w-auto md:px-4
              gap-2
            "
          >
            <Link
              href={`/${locale}/apply`}
              aria-label={dict.nav.apply}
              title={dict.nav.apply}
            >
              <span className="hidden md:inline">{dict.nav.apply}</span>
              <ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0" />
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
});
