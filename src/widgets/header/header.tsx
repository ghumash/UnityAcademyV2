"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Container } from "@/shared/ui/custom";
import { siteConfig } from "@/shared/config";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  Button,
} from "@/shared/ui";
import { ModeToggle } from "@/features/theme";
import { HeaderDict, LanguageSwitcher, Locale } from "@/shared/lib/i18n";

export type HeaderProps = { locale: Locale; dict: HeaderDict };

export default function Header({ locale, dict }: HeaderProps) {
  const nav = [
    { label: dict.nav.courses, href: "/courses" },
    { label: dict.nav.about, href: "/about" },
    { label: dict.nav.contacts, href: "/contacts" },
  ];

  const href = (path: string) => `/${locale}${path}`;

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container className="flex h-14 items-center justify-between gap-3 md:h-16">
        <Link
          href={href("/")}
          className="flex items-center gap-2"
          aria-label="Unity Academy — home"
        >
          <Image
            src={siteConfig.assets.logo}
            alt=""
            width={24}
            height={24}
            priority
          />
          <span className="font-semibold tracking-tight">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden md:block" aria-label="Main navigation">
          <NavigationMenu>
            <NavigationMenuList>
              {nav.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={href(item.href)}
                      className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <Button asChild>
              <Link href={href(siteConfig.cta.href)}>{dict.nav.apply}</Link>
            </Button>
          </div>
          <LanguageSwitcher locale={locale} />
          <ModeToggle />

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 sm:w-80">
              <SheetHeader className="border-b pb-2">
                <SheetTitle>{dict.menu}</SheetTitle>
              </SheetHeader>
              <nav className="mt-4 grid gap-2" aria-label="Mobile navigation">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={href(item.href)}
                    className="rounded-md px-3 py-2 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
                <Button asChild className="mt-2">
                  <Link href={href(siteConfig.cta.href)}>{dict.nav.apply}</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
