import * as React from "react";
import Link from "next/link";
import { Callout } from "./callout";
import { YouTube } from "./youtube-lite";
import { MdxImage } from "./image";
import { cn } from "../lib";

/** Заголовки: строгий тип для HTMLHeadingElement без generic конфликтов */
type HeadingProps = React.HTMLAttributes<HTMLHeadingElement>;
function makeHeading(Tag: "h1" | "h2" | "h3", base: string) {
  const Comp = React.forwardRef<HTMLHeadingElement, HeadingProps>(
    ({ className, ...rest }, ref) =>
      React.createElement(Tag, { ref, className: cn(base, className), ...rest })
  );
  Comp.displayName = `MDX.${Tag.toUpperCase()}`;
  return Comp;
}

/** Базовая типографика */
const P = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<"p">
>(({ className, ...rest }, ref) => (
  <p
    ref={ref}
    {...rest}
    className={cn("mt-4 leading-7 text-foreground/90", className)}
  />
));
P.displayName = "MDX.P";

const UL = React.forwardRef<
  HTMLUListElement,
  React.ComponentPropsWithoutRef<"ul">
>(({ className, ...rest }, ref) => (
  <ul ref={ref} {...rest} className={cn("mt-4 list-disc pl-6", className)} />
));
UL.displayName = "MDX.UL";

const OL = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...rest }, ref) => (
  <ol ref={ref} {...rest} className={cn("mt-4 list-decimal pl-6", className)} />
));
OL.displayName = "MDX.OL";

const LI = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...rest }, ref) => (
  <li ref={ref} {...rest} className={cn("my-1", className)} />
));
LI.displayName = "MDX.LI";

const BLOCKQUOTE = React.forwardRef<
  HTMLQuoteElement,
  React.ComponentPropsWithoutRef<"blockquote">
>(({ className, ...rest }, ref) => (
  <blockquote
    ref={ref}
    {...rest}
    className={cn("mt-6 border-l-2 pl-6 italic text-foreground/80", className)}
  />
));
BLOCKQUOTE.displayName = "MDX.Blockquote";

const CODE = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"code">
>(({ className, ...rest }, ref) => (
  <code
    ref={ref}
    {...rest}
    className={cn("rounded bg-muted px-1 py-0.5 text-[0.9em]", className)}
  />
));
CODE.displayName = "MDX.Code";

const PRE = React.forwardRef<
  HTMLPreElement,
  React.ComponentPropsWithoutRef<"pre">
>(({ className, ...rest }, ref) => (
  <pre
    ref={ref}
    {...rest}
    className={cn(
      "mt-6 overflow-x-auto rounded-lg border bg-muted p-4 text-sm",
      className
    )}
  />
));
PRE.displayName = "MDX.Pre";

const HR = React.forwardRef<
  HTMLHRElement,
  React.ComponentPropsWithoutRef<"hr">
>(({ className, ...rest }, ref) => (
  <hr ref={ref} {...rest} className={cn("my-8 border-border", className)} />
));
HR.displayName = "MDX.HR";

/** Ссылки: http(s) → target=_blank; mailto/tel/# → <a>; внутренние → <Link> */
const A = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a">
>(({ href = "#", className, children, ...rest }, ref) => {
  const cls = cn(
    "underline underline-offset-4 hover:text-foreground",
    className
  );
  const isHttp = /^https?:\/\//i.test(href);
  const isMailTel = /^(mailto:|tel:)/i.test(href);
  const isHash = href.startsWith("#");
  const isInternal =
    !isHttp &&
    !isMailTel &&
    !isHash &&
    (href.startsWith("/") || !href.includes(":"));

  if (isHttp) {
    return (
      <a
        ref={ref}
        {...rest}
        href={href}
        className={cls}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }
  if (isInternal) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <a ref={ref} {...rest} href={href} className={cls}>
      {children}
    </a>
  );
});
A.displayName = "MDX.A";

/** Markdown <img> как есть */
const IMG = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, ...rest }, ref) => (
  <img
    ref={ref}
    loading="lazy"
    {...rest}
    className={cn("mt-6 rounded-lg border", className)}
  />
));
IMG.displayName = "MDX.Img";

/** Публичный реестр компонентов для MDX */
export const MDXComponents = {
  h1: makeHeading("h1", "mt-8 scroll-m-20 text-3xl font-bold tracking-tight"),
  h2: makeHeading(
    "h2",
    "mt-10 scroll-m-20 text-2xl font-semibold tracking-tight"
  ),
  h3: makeHeading(
    "h3",
    "mt-8 scroll-m-20 text-xl font-semibold tracking-tight"
  ),
  p: P,
  ul: UL,
  ol: OL,
  li: LI,
  a: A,
  blockquote: BLOCKQUOTE,
  code: CODE,
  pre: PRE,
  hr: HR,
  img: IMG,
  Image: MdxImage,
  Callout,
  YouTube,
} satisfies Record<string, React.ComponentType<any>>;
