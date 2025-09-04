"use client";

import { memo, useId } from "react";
import Link from "next/link";
import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { Container, Section } from "@/shared/ui/custom";
import { motion } from "framer-motion";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface CtaLink {
  text: string;
  url: string;
  /** Open in a new tab (adds rel="noopener noreferrer") */
  newTab?: boolean;
  /** Optional accessible label (fallbacks to text) */
  ariaLabel?: string;
}

export interface CtaBannerProps {
  heading: string;
  /** Heading tag for proper page hierarchy */
  as?: HeadingTag;
  className?: string;
  buttons?: {
    primary?: CtaLink;
    secondary?: CtaLink;
  };
}

const isExternal = (href: string) => /^https?:\/\//i.test(href);
const TRANSITION = { ease: "easeInOut" as const, delay: 0.3, duration: 0.8 };

type SmartLinkProps = Omit<React.ComponentPropsWithoutRef<"a">, "href"> & {
  href: string;
  newTab?: boolean;
};
function SmartLink({ href, newTab, ...rest }: SmartLinkProps) {
  const external = isExternal(href);
  const target = newTab || external ? "_blank" : undefined;
  const rel = target ? "noopener noreferrer" : undefined;

  // Use Next.js Link for internal routes; plain <a> for external
  if (!external) {
    return <Link href={href} {...rest} />;
  }
  return <a href={href} target={target} rel={rel} {...rest} />;
}

const CtaBanner = memo(function CtaBanner({
  heading = "Call to Action",
  as = "h3",
  className,
  buttons = {
    primary: { text: "Buy Now", url: "https://www.shadcnblocks.com" },
  },
}: CtaBannerProps) {
  const headingId = useId();
  const HeadingTag = as;

  return (
    <Section style={{ paddingBottom: "0" }}>
      <Container>
        <motion.div
          role="region"
          aria-labelledby={headingId}
          className={cn(
            "bg-[radial-gradient(35%_128px_at_50%_100%,theme(backgroundColor.white/8%),transparent)] flex w-full flex-col gap-4 lg:gap-68 overflow-hidden rounded-4xl p-8 lg:flex-row lg:items-center lg:p-12 border",
            className
          )}
          initial={{ filter: "blur(4px)", y: -8, opacity: 0 }}
          whileInView={{ filter: "blur(0px)", y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
        >
          <div className="flex-1">
            <HeadingTag id={headingId} className="text-2xl font-semibold">
              {heading}
            </HeadingTag>
          </div>

          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            {buttons?.secondary && (
              <Button variant="outline" asChild>
                <SmartLink
                  href={buttons.secondary.url}
                  newTab={buttons.secondary.newTab}
                  aria-describedby={headingId}
                  aria-label={
                    buttons.secondary.ariaLabel ?? buttons.secondary.text
                  }
                >
                  {buttons.secondary.text}
                </SmartLink>
              </Button>
            )}

            {buttons?.primary && (
              <Button asChild variant="default" size="lg">
                <SmartLink
                  href={buttons.primary.url}
                  newTab={buttons.primary.newTab}
                  aria-describedby={headingId}
                  aria-label={buttons.primary.ariaLabel ?? buttons.primary.text}
                >
                  {buttons.primary.text}
                </SmartLink>
              </Button>
            )}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
});

CtaBanner.displayName = "CtaBanner";

export { CtaBanner };
