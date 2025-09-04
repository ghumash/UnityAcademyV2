"use client";

import React from "react";
import type { ComponentProps, ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "lucide-react";
import { Container, Section } from "@/shared/ui/custom";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/shared/config";

type FooterLink = {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
};

type FooterSection = {
  label: string;
  links: FooterLink[];
};

const footerLinks: ReadonlyArray<FooterSection> = [
  {
    label: "Resources",
    links: [
      { title: "Home", href: "/" },
      { title: "About", href: "/about" },
      { title: "Courses", href: "/courses" },
      { title: "Questions", href: "/questions" },
    ],
  },
  {
    label: "Social",
    links: [
      { title: "Facebook", href: "#", icon: FacebookIcon },
      { title: "Instagram", href: "#", icon: InstagramIcon },
      { title: "YouTube", href: "#", icon: YoutubeIcon },
      { title: "LinkedIn", href: "#", icon: LinkedinIcon },
    ],
  },
] as const;

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <Section as="footer" role="contentinfo" aria-labelledby="footer-heading">
      <Container>
        <div className="relative flex flex-col items-center justify-center rounded-t-4xl border-t bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] px-6 py-12 md:rounded-t-6xl lg:py-16">
          <div
            aria-hidden="true"
            className="bg-foreground/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur"
          />

          <h2 id="footer-heading" className="sr-only">
            Site footer
          </h2>

          <div className="flex w-full flex-col gap-8 md:flex-row md:justify-between md:gap-8">
            <AnimatedContainer className="space-y-4 xl:flex-1 max-w-sm md:max-w-md">
              <div className="space-y-3">
                <Link
                  href="/"
                  prefetch={false}
                  className="inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  aria-label={`${siteConfig?.name ?? "Unity Academy"} — home`}
                >
                  <Image
                    src={siteConfig.assets.logo}
                    alt="Unity Academy logo"
                    width={28}
                    height={28}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="text-base font-semibold tracking-tight">
                    {siteConfig.name}
                  </span>
                </Link>

                <p className="max-w-prose text-sm text-muted-foreground">
                  {siteConfig.description}
                </p>

                <p className="text-muted-foreground text-sm">
                  © <time dateTime={String(currentYear)}>{currentYear}</time>{" "}
                  {siteConfig.name}. All rights reserved.
                </p>
              </div>
            </AnimatedContainer>

            <div className="flex gap-8">
              {footerLinks.map((section, idx) => (
                <AnimatedContainer
                  key={section.label}
                  delay={0.08 + idx * 0.08}
                >
                  <nav
                    aria-labelledby={`footer-section-${section.label}`}
                    className="mb-10 min-w-[120px] flex-1 md:mb-0"
                  >
                    <h3
                      id={`footer-section-${section.label}`}
                      className="text-xs font-medium tracking-wide text-foreground"
                    >
                      {section.label}
                    </h3>

                    <ul
                      role="list"
                      className="mt-4 space-y-2 text-sm text-muted-foreground"
                    >
                      {section.links.map((link) => (
                        <li key={link.title}>
                          <FooterItem link={link} />
                        </li>
                      ))}
                    </ul>
                  </nav>
                </AnimatedContainer>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/** Renders a single footer link with correct component (Link vs <a>) and a11y */
function FooterItem({ link }: { link: FooterLink }) {
  const isInternal = link.href.startsWith("/");
  const isAnchor = link.href.startsWith("#");
  const Icon = link.icon;

  const className =
    "inline-flex items-center transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

  if (isInternal) {
    return (
      <Link href={link.href} prefetch={false} className={className}>
        {Icon ? <Icon className="me-1 size-4" aria-hidden /> : null}
        <span>{link.title}</span>
      </Link>
    );
  }

  // anchors or external absolute URLs
  return (
    <a
      href={link.href}
      className={className}
      {...(!isAnchor && {
        target: "_blank",
        rel: "noopener noreferrer external",
      })}
      aria-label={Icon ? link.title : undefined}
    >
      {Icon ? <Icon className="me-1 size-4" aria-hidden /> : null}
      <span className="sr-only">{Icon ? link.title : undefined}</span>
      {!Icon ? <span>{link.title}</span> : null}
    </a>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>["className"];
  children: ReactNode;
};

function AnimatedContainer({
  className,
  delay = 0.1,
  children,
}: ViewAnimationProps) {
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ filter: "blur(4px)", y: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
