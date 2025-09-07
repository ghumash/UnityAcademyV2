"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/shared/ui";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { useDictionary } from "@/shared/lib/i18n";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { dict } = useDictionary();

  useEffect(() => {
    // Подключи Sentry по желанию:
    // Sentry.captureException?.(error);
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-dvh place-items-center p-6">
      <div className="w-full max-w-md rounded-lg border bg-card p-6 text-card-foreground">
        <div className="flex items-center gap-3">
          <AlertTriangle
            className="size-5 text-destructive"
            aria-hidden="true"
          />
          <h1 className="text-lg font-semibold">
            {dict.common.errors.error.title}
          </h1>
        </div>

        <p className="mt-3 text-sm text-muted-foreground">
          {dict.common.errors.error.description}
        </p>
        {error?.digest && (
          <p className="mt-2 text-xs text-muted-foreground">
            {dict.common.errors.error.errorCode}: {error.digest}
          </p>
        )}

        <div className="mt-6 flex gap-2">
          <Button onClick={reset} className="gap-2">
            <RotateCcw className="size-4" aria-hidden="true" />
            {dict.common.errors.error.tryAgain}
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link href="/">
              <Home className="size-4" aria-hidden="true" />
              {dict.common.errors.error.goHome}
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
