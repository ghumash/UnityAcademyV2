import * as React from "react";
import Link from "next/link";

type AnyProps = React.HTMLAttributes<HTMLElement> & { className?: string };

const H = (Tag: "h1" | "h2" | "h3", cls: string) =>
  function Heading(props: AnyProps) {
    return (
      <Tag {...props} className={`${cls} ${props.className ?? ""}`.trim()} />
    );
  };

export const MDXComponents = {
  h1: H("h1", "mt-8 scroll-m-20 text-3xl font-bold tracking-tight"),
  h2: H("h2", "mt-10 scroll-m-20 text-2xl font-semibold tracking-tight"),
  h3: H("h3", "mt-8 scroll-m-20 text-xl font-semibold tracking-tight"),
  p: (props: AnyProps) => (
    <p
      {...props}
      className={`mt-4 leading-7 text-foreground/90 ${props.className ?? ""}`.trim()}
    />
  ),
  ul: (props: AnyProps) => (
    <ul
      {...props}
      className={`mt-4 list-disc pl-6 ${props.className ?? ""}`.trim()}
    />
  ),
  ol: (props: AnyProps) => (
    <ol
      {...props}
      className={`mt-4 list-decimal pl-6 ${props.className ?? ""}`.trim()}
    />
  ),
  li: (props: AnyProps) => (
    <li {...props} className={`my-1 ${props.className ?? ""}`.trim()} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = props.href?.startsWith("http");
    if (isExternal) {
      return (
        <a
          {...props}
          className={`underline underline-offset-4 hover:text-foreground ${props.className ?? ""}`.trim()}
          rel="noopener noreferrer"
          target="_blank"
        />
      );
    }
    return (
      <Link
        href={props.href || "#"}
        className={`underline underline-offset-4 hover:text-foreground ${props.className ?? ""}`.trim()}
      >
        {props.children}
      </Link>
    );
  },
  blockquote: (props: AnyProps) => (
    <blockquote
      {...props}
      className={`mt-6 border-l-2 pl-6 italic text-foreground/80 ${props.className ?? ""}`.trim()}
    />
  ),
  code: (props: AnyProps) => (
    <code
      {...props}
      className={`rounded bg-muted px-1 py-0.5 text-[0.9em] ${props.className ?? ""}`.trim()}
    />
  ),
  pre: (props: AnyProps) => (
    <pre
      {...props}
      className={`mt-6 overflow-x-auto rounded-lg border bg-muted p-4 text-sm ${props.className ?? ""}`.trim()}
    />
  ),
  hr: (props: AnyProps) => (
    <hr
      {...props}
      className={`my-8 border-border ${props.className ?? ""}`.trim()}
    />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      {...props}
      className={`mt-6 rounded-lg border ${props.className ?? ""}`.trim()}
    />
  ),
} as const;
