"use client";

import Link from "next/link";

export function SkipLink({ label = "Skip to content" }: { label?: string }) {
  return (
    <Link
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:shadow focus:outline-none focus:ring-2 focus:ring-ring"
    >
      {label}
    </Link>
  );
}
