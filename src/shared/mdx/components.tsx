import * as React from "react";
import NextLink from "next/link";
import { Callout } from "./callout";
import { YouTube } from "./youtube-lite";
import { MdxImage } from "./image";
import { cn } from "../lib";
import {
  // base
  Button,

  // accordion
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,

  // alert
  Alert,
  AlertTitle,
  AlertDescription,

  // avatar
  Avatar,
  AvatarImage,
  AvatarFallback,

  // badge
  Badge,
  badgeVariants,

  // breadcrumb
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,

  // card
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,

  // checkbox
  Checkbox,

  // dropdown-menu
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,

  // form
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,

  // input/label/textarea
  Input,
  Label,
  Textarea,

  // navigation-menu
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,

  // scroll-area
  ScrollArea,
  ScrollBar,

  // select
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,

  // sheet
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,

  // misc
  Skeleton,
  Toaster,
} from "@/shared/ui";

/** Вспомогательная утилита для объединения rel */
function mergeRel(base: string, extra?: string) {
  if (!extra) return base;
  const set = new Set(
    [...base.split(" "), ...extra.split(" ")].filter(Boolean)
  );
  return Array.from(set).join(" ");
}

/** Заголовки */
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
  <ul
    ref={ref}
    {...rest}
    className={cn("mt-4 list-disc pl-6 marker:text-foreground/70", className)}
  />
));
UL.displayName = "MDX.UL";

const OL = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...rest }, ref) => (
  <ol
    ref={ref}
    {...rest}
    className={cn(
      "mt-4 list-decimal pl-6 marker:text-foreground/70",
      className
    )}
  />
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
    className={cn(
      "mt-6 border-l-2 pl-6 italic text-muted-foreground",
      className
    )}
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

/** Ссылки: внешние → target=_blank + безопасный rel; внутренние → <Link>; hash/mail/tel → <a> */
const Link = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a">
>(({ href = "#", className, children, rel, ...rest }, ref) => {
  const cls = cn(
    "underline underline-offset-4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
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
      <NextLink
        href={href}
        className={cls}
        target="_blank"
        rel={mergeRel("noopener noreferrer", rel)}
        prefetch={false}
        ref={ref}
        {...rest}
      >
        {children}
      </NextLink>
    );
  }

  // для внутренних, hash, mailto, tel — тоже используем Link
  return (
    <NextLink
      href={href}
      className={cls}
      prefetch={isInternal ? false : undefined}
      ref={ref}
      {...rest}
    >
      {children}
    </NextLink>
  );
});
Link.displayName = "MDX.Link";

/** Markdown <img> как есть (ленивая загрузка, async-декодирование, безопасный alt по умолчанию) */
const IMG = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, alt, ...rest }, ref) => (
  <img
    ref={ref}
    loading="lazy"
    decoding="async"
    alt={alt ?? ""}
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
  Link,
  blockquote: BLOCKQUOTE,
  code: CODE,
  pre: PRE,
  hr: HR,
  img: IMG,

  // Кастомные MDX-компоненты
  Image: MdxImage,
  Callout,
  YouTube,

  // shadcn/ui
  // base
  Button,

  // accordion
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,

  // alert
  Alert,
  AlertTitle,
  AlertDescription,

  // avatar
  Avatar,
  AvatarImage,
  AvatarFallback,

  // badge
  Badge,
  badgeVariants,

  // breadcrumb
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,

  // card
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,

  // checkbox
  Checkbox,

  // dropdown-menu
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,

  // form
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,

  // input/label/textarea
  Input,
  Label,
  Textarea,

  // navigation-menu
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle, // оставляю как есть, если у тебя он типизирован как any

  // scroll-area
  ScrollArea,
  ScrollBar,

  // select
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,

  // sheet
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,

  // misc
  Skeleton,
  Toaster,
} satisfies Record<string, React.ComponentType<any>>;
