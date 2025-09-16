"use client";

import React, { memo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import { Container, Section } from "@/shared/ui/custom";
import { Button } from "@/shared/ui";

type Action = { label: string; href: string; external?: boolean } | null;

type TileBase = {
  title: string;
  description: string;
  icon: React.ReactNode;
  action: Action;
  className?: string;
};

export type ContactTile = TileBase & {
  variant?: "social" | "info";
};

export type LongInfoItem = {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
};

export interface ContactTilesSectionProps {
  items: ReadonlyArray<ContactTile>;
  /** Элементы длинного нижнего блока (занимает всю ширину сетки) */
  longItems?: ReadonlyArray<LongInfoItem>;
  className?: string;
}

const Tile = React.memo(({
  title,
  description,
  icon,
  action,
  variant = "social",
  className,
}: ContactTile) => {
  return (
    <li
      className={cn(
        "relative rounded-2xl border-2 border-border/20 bg-card shadow-sm p-5 md:p-6",
        "transition-all duration-300 ease-in-out",
        "hover:border-primary/30 hover:bg-card hover:shadow-md hover:scale-[1.02]",
        "focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary/40 focus-within:scale-[1.01]",
        "dark:border-white/10 dark:bg-card dark:shadow-lg dark:shadow-black/5",
        "dark:hover:border-primary/40 dark:hover:shadow-xl dark:hover:shadow-black/10",
        "dark:focus-within:border-primary/60",
        className
      )}
    >
      <div className="min-w-0 flex-1 space-y-4">
        <div
          aria-hidden
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary border border-primary/20 dark:bg-primary/20 dark:border-primary/30 dark:text-primary"
        >
          {icon}
        </div>
        <div>
          <h3 className="text-base md:text-lg font-semibold tracking-tight text-foreground">
            {title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
            {description}
          </p>
        </div>

        {variant === "social" && action ? (
          <div className="mt-4">
            <Button
              asChild
              size="sm"
              className="rounded-full"
              variant="secondary"
            >
              {action.external ? (
                <a
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={action.label}
                >
                  {action.label}
                </a>
              ) : (
                <Link href={action.href} aria-label={action.label}>
                  {action.label}
                </Link>
              )}
            </Button>
          </div>
        ) : null}
      </div>
    </li>
  );
});

const LongInfoCard = React.memo(({ items }: { items: ReadonlyArray<LongInfoItem> }) => {
  return (
    <li className="md:col-span-2">
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border-2 border-border/20 bg-card shadow-sm p-5 md:p-7",
          "transition-all duration-300 ease-in-out",
          "hover:border-primary/30 hover:bg-card hover:shadow-md hover:scale-[1.02]",
          "focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary/40 focus-within:scale-[1.01]",
          "dark:border-white/10 dark:bg-card dark:shadow-lg dark:shadow-black/5",
          "dark:hover:border-primary/40 dark:hover:shadow-xl dark:hover:shadow-black/10",
          "dark:focus-within:border-primary/60"
        )}
      >
        <ul role="list" className="grid grid-cols-1 gap-6">
          {items.map(({ icon, label, value, href, external }, i) => (
            <li key={`${label}-${i}`} className="flex items-center gap-4">
              <div
                aria-hidden
                className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary border border-primary/20 dark:bg-primary/20 dark:border-primary/30 dark:text-primary"
              >
                {icon}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium text-muted-foreground">
                  {label}
                </div>
                {href ? (
                  external ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-0.5 inline-flex items-center text-base font-semibold text-foreground hover:text-primary transition-colors break-words"
                    >
                      {value}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className="mt-0.5 inline-flex items-center text-base font-semibold text-foreground hover:text-primary transition-colors break-words"
                    >
                      {value}
                    </Link>
                  )
                ) : (
                  <div className="mt-0.5 text-base font-semibold text-foreground break-words">
                    {value}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
});

const ContactTilesSectionComponent = memo(({
  items,
  longItems,
  className,
}: ContactTilesSectionProps) => {
  if (!items?.length && !longItems?.length) return null;

  return (
    <Section aria-labelledby="contact-tiles-heading" className={className}>
      <Container>
        <h2 id="contact-tiles-heading" className="sr-only">
          Contact information
        </h2>
        <ul
          role="list"
          className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6"
        >
          {items.map((item, i) => (
            <Tile key={`${item.title}-${i}`} {...item} />
          ))}
          {longItems?.length ? <LongInfoCard items={longItems} /> : null}
        </ul>
      </Container>
    </Section>
  );
});

export const ContactTilesSection = dynamic(() => 
  Promise.resolve(ContactTilesSectionComponent), 
  { ssr: false }
);