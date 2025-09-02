import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/shared/config";
import { Container } from "@/shared/ui/custom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Button,
} from "@/shared/ui";
import { Menu } from "lucide-react";
import type { HeaderDict, Locale } from "@/shared/lib/i18n";
import { LanguageSwitcher } from "@/features/i18n";
import { ModeToggle } from "@/features/theme";

type Props = {
  locale: Locale;
  dict: HeaderDict;
};

export default function Header({ locale, dict }: Props) {
  const nav = [
    { label: dict.nav.courses, href: `/${locale}/courses` },
    { label: dict.nav.about, href: `/${locale}/about` },
    { label: dict.nav.contacts, href: `/${locale}/contacts` },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <Container className="flex h-14 items-center justify-between gap-3">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2"
          aria-label="Unity Academy — home"
        >
          <Image
            src={siteConfig.assets.logo}
            alt="Unity Academy logo"
            width={24}
            height={24}
          />
          <span className="hidden text-sm font-semibold tracking-tight sm:inline">
            {siteConfig.name}
          </span>
        </Link>

        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              {nav.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} />
          <ModeToggle />

          <div className="hidden md:block">
            <Button asChild size="sm">
              <Link href={`/${locale}/apply`}>{dict.nav.apply}</Link>
            </Button>
          </div>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="sm" aria-label="Open menu">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px]">
              <SheetHeader>
                <SheetTitle>{siteConfig.name}</SheetTitle>
              </SheetHeader>

              <nav className="mt-4 grid gap-1">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-md px-2 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-6 flex items-center gap-2">
                <LanguageSwitcher locale={locale} />
                <ModeToggle />
                <Button asChild className="ml-auto">
                  <Link href={`/${locale}/apply`}>{dict.nav.apply}</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
