// apps/web/src/widgets/contact/ContactTilesSection.tsx
"use client";

import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import { Container, Section } from "@/shared/ui/custom";
import { Button } from "@/shared/ui";
import {
  Send,
  Mail,
  Instagram,
  Facebook,
  MapPin,
  Phone,
  type LucideIcon,
} from "lucide-react";

type Action = { label: string; href: string; external?: boolean } | null;

type TileBase = {
  title: string;
  description: string;
  icon: LucideIcon;
  action: Action;
  className?: string;
};

export type ContactTile = TileBase & {
  variant?: "social" | "info";
};

export type LongInfoItem = {
  icon: LucideIcon;
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

function Tile({
  title,
  description,
  icon: Icon,
  action,
  variant = "social",
  className,
}: ContactTile) {
  return (
    <li
      className={cn(
        "relative rounded-2xl border border-border/60 bg-background/30 p-5 md:p-6 transition-colors",
        "focus-within:ring-2 focus-within:ring-primary/40",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl",
        "transition-all duration-500",
        "hover:border-border hover:bg-card hover:scale-[1.02]",
        "focus-within:scale-[1.01]",
        className
      )}
    >
      <div className="min-w-0 flex-1 space-y-4">
        <div
          aria-hidden
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary"
        >
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-base md:text-lg font-semibold tracking-tight text-foreground">
            {title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-foreground/70 line-clamp-3">
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
}

function LongInfoCard({ items }: { items: ReadonlyArray<LongInfoItem> }) {
  return (
    <li className="md:col-span-2">
      <div
        className={cn(
          "relative overflow-hidden hover:border-border rounded-2xl border border-border/60 bg-background/30 p-5 md:p-7",
          "before:pointer-events-none before:absolute before:-top-24 before:-left-24 before:h-64 before:w-64 before:rounded-full",
          "after:pointer-events-none after:absolute after:-bottom-24 after:-right-24 after:h-64 after:w-64 after:rounded-full",
          "transition-all duration-500",
          "hover:border-border hover:bg-card hover:scale-[1.02]",
          "focus-within:scale-[1.01]"
        )}
      >
        <ul role="list" className="grid grid-cols-1 gap-6">
          {items.map(({ icon: Icon, label, value, href, external }, i) => (
            <li key={`${label}-${i}`} className="flex items-center gap-4">
              <div
                aria-hidden
                className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/12 text-primary"
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium text-foreground/80">
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
}

export function ContactTilesSection({
  items,
  longItems,
  className,
}: ContactTilesSectionProps) {
  if (!items?.length && !longItems?.length) return null;

  return (
    <Section aria-labelledby="contact-tiles-heading" className={className}>
      <Container>
        <h2 id="contact-tiles-heading" className="sr-only">
          Contact & Social
        </h2>

        <ul
          role="list"
          className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2"
        >
          {items?.map((item, i) => (
            <Tile key={`${item.title}-${i}`} {...item} />
          ))}
          {longItems?.length ? <LongInfoCard items={longItems} /> : null}
        </ul>
      </Container>
    </Section>
  );
}

/* — Опциональный пример для быстрой проверки на странице — */
export function ExampleContactTiles() {
  const tiles: ContactTile[] = [
    {
      icon: Send,
      title: "Միացեք մեր համայնքին",
      description:
        "Միացեք Telegram ալիքին՝ նորություններին ու օգտակար նյութերին հետևելու համար։",
      action: {
        label: "Join Telegram",
        href: "https://t.me/unity_academy",
        external: true,
      },
      variant: "social",
    },
    {
      icon: Mail,
      title: "Ուղարկեք էլ. նամակ",
      description: "Պատասխանում ենք աշխատանքային ժամերին։",
      action: {
        label: "Send email",
        href: "mailto:unityacademyarmenia@gmail.com",
        external: true,
      },
      variant: "social",
    },
    {
      icon: Instagram,
      title: "Instagram",
      description: "Stories, reels ու թարմացումներ ամեն օր։",
      action: {
        label: "Follow us",
        href: "https://www.instagram.com/unity_academy",
        external: true,
      },
      variant: "social",
    },
    {
      icon: Facebook,
      title: "Facebook",
      description: "Միջոցառումներ, նկարներ և համայնքային նորություններ։",
      action: {
        label: "Like us",
        href: "https://www.facebook.com/UnityAcademyArmenia",
        external: true,
      },
      variant: "social",
    },
  ];

  const long: LongInfoItem[] = [
    {
      icon: MapPin,
      label: "Հասցե",
      value: "Vanadzor, Vardanants Street, 116A",
      href: "https://maps.app.goo.gl/saMHAc8tjFqtZo3H9",
      external: true,
    },
    {
      icon: Phone,
      label: "Հեռախոս",
      value: "+374 99 951 915",
      href: "tel:+37499951915",
      external: true,
    },
  ];

  return <ContactTilesSection items={tiles} longItems={long} />;
}
