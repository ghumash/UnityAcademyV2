"use client";

import * as React from "react";
import Link from "next/link";
import type { TocItem } from "./toc";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { cn } from "../lib";

export function MdxTocNav({ items }: { items: TocItem[] }) {
  if (!items || items.length === 0) return null;

  return (
    <aside aria-label="Table of contents" className="lg:sticky lg:top-24">
      <div className="rounded-lg border p-3">
        <div className="px-1 pb-2 text-xs font-semibold tracking-wide text-muted-foreground">
          On this page
        </div>
        <ScrollArea className="max-h-[60vh] pr-2">
          <nav className="grid gap-1">
            {items.map((it) => (
              <Link
                key={it.id}
                href={`#${it.id}`}
                className={cn(
                  "block rounded px-2 py-1 text-sm text-foreground/80 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
                  it.level === 2 && "ml-2",
                  it.level === 3 && "ml-4"
                )}
              >
                {it.title}
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </div>
    </aside>
  );
}
