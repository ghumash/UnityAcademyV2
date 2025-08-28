import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/shared/config";
import { Container } from "@/shared/ui/custom";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const socials = [
  { href: siteConfig.socials.instagram, label: "Instagram", Icon: Instagram },
  { href: siteConfig.socials.facebook, label: "Facebook", Icon: Facebook },
  { href: siteConfig.socials.linkedin, label: "LinkedIn", Icon: Linkedin },
].filter((s) => !!s.href);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <Container className="grid gap-8 py-10 md:grid-cols-3">
        <div className="space-y-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2"
            aria-label="Unity Academy — на главную"
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
          {socials.length > 0 && (
            <div
              className="flex items-center gap-3 pt-1"
              aria-label="Социальные сети"
            >
              {socials.map(({ href, label, Icon }) => (
                <Link
                  key={label}
                  href={href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex size-9 items-center justify-center rounded-md border hover:bg-accent hover:text-accent-foreground"
                >
                  <Icon className="size-4" />
                </Link>
              ))}
            </div>
          )}
        </div>

        <nav aria-label="Навигация по сайту">
          <h2 className="mb-3 text-sm font-semibold tracking-wide">
            Навигация
          </h2>
          <ul className="grid gap-2">
            {siteConfig.navMain.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-foreground/80 hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-3 text-sm font-semibold tracking-wide">Контакты</h2>
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
              href={siteConfig.cta.href}
              className="inline-flex rounded-md border px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              {siteConfig.cta.label}
            </Link>
          </div>
        </div>
      </Container>

      <div className="border-t">
        <Container className="flex flex-col items-center justify-between gap-3 py-4 text-xs text-muted-foreground md:flex-row">
          <span>
            © {year} {siteConfig.name}. Все права защищены.
          </span>
          <span>Сделано в Ванадзоре</span>
        </Container>
      </div>
    </footer>
  );
}
