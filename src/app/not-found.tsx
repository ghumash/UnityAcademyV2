"use client";

import Link from "next/link";
import { Button } from "@/shared/ui";
import { useDictionary } from "@/shared/lib/i18n";
import { siteConfig } from "@/shared/config/common";

export default function NotFound() {
  const { dict } = useDictionary();

  return (
    <main className="grid min-h-dvh place-items-center p-6">
      <div className="w-full max-w-md rounded-lg border bg-card p-6 text-card-foreground">
        <h1 className="text-2xl font-bold tracking-tight">
          {dict.common.errors.notFound.title}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {dict.common.errors.notFound.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button asChild>
            <Link href={siteConfig.routes.home}>{dict.common.errors.notFound.goHome}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={siteConfig.routes.courses}>{dict.common.errors.notFound.courses}</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
