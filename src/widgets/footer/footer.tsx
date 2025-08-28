import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/shared/config";
import { Container } from "@/shared/ui/custom";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { HeaderDict, Locale } from "@/shared/lib/i18n";

const socialsList = (dict?: typeof siteConfig.socials) =>
  [
    { href: dict?.instagram, label: "Instagram", Icon: Instagram },
    { href: dict?.facebook, label: "Facebook", Icon: Facebook },
    { href: dict?.linkedin, label: "LinkedIn", Icon: Linkedin },
  ].filter((s) => !!s.href) as { href: string; label: string; Icon: any }[];

export default function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: HeaderDict;
}) {
  const href = (path: string) => `/${locale}${path}`;
  const nav = [
    { label: dict.nav.courses, href: "/courses" },
    { label: dict.nav.about, href: "/about" },
    { label: dict.nav.contacts, href: "/contacts" },
  ];
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <Container className="grid gap-8 py-10 md:grid-cols-3">
        <div className="space-y-3">
          <Link
            href={href("/")}
            className="inline-flex items-center gap-2"
            aria-label="Unity Academy — home"
          >
            <Image
              src={siteConfig.assets.logo}
              alt="Unity Academy logo"
              width={28}
              height={28}
            />
            <span className="text-base font-semibold tracking-tight">
              {siteConfig.name}
            </span>
          </Link>
          <p className="max-w-prose text-sm text-muted-foreground">
            {siteConfig.description}
          </p>
          {socialsList(siteConfig.socials).length > 0 && (
            <div
              className="flex items-center gap-3 pt-1"
              aria-label="Social links"
            >
              {socialsList(siteConfig.socials).map(
                ({ href: h, label, Icon }) => (
                  <Link
                    key={label}
                    href={h}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex size-9 items-center justify-center rounded-md border hover:bg-accent hover:text-accent-foreground"
                  >
                    <Icon className="size-4" />
                  </Link>
                )
              )}
            </div>
          )}
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="mb-3 text-sm font-semibold tracking-wide">
            {dict.footer.navigation}
          </h2>
          <ul className="grid gap-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={href(item.href)}
                  className="text-sm text-foreground/80 hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-3 text-sm font-semibold tracking-wide">
            {dict.footer.contacts}
          </h2>
          <address className="not-italic text-sm text-foreground/80">
            <div className="mb-1">{siteConfig.contacts.location}</div>
            <div className="mb-1">
              <Link
                href={`mailto:${siteConfig.contacts.email}`}
                className="hover:underline"
              >
                {siteConfig.contacts.email}
              </Link>
            </div>
            <div>
              <Link
                href={`tel:${siteConfig.contacts.phone.replace(/\s+/g, "")}`}
                className="hover:underline"
              >
                {siteConfig.contacts.phone}
              </Link>
            </div>
          </address>
          <div className="mt-4">
            <Link
              href={href(siteConfig.cta.href)}
              className="inline-flex rounded-md border px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              {dict.nav.apply}
            </Link>
          </div>
        </div>
      </Container>

      <div className="border-t">
        <Container className="flex flex-col items-center justify-between gap-3 py-4 text-xs text-muted-foreground md:flex-row">
          <span>
            © {year} {siteConfig.name}. {dict.footer.rights}
          </span>
          <span>{dict.footer.madeIn}</span>
        </Container>
      </div>
    </footer>
  );
}
