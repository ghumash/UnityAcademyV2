"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/shared/ui";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-dvh place-items-center p-6">
      <div className="w-full max-w-md rounded-lg border bg-card p-6 text-card-foreground">
        <div className="flex items-center gap-3">
          <AlertTriangle className="size-5 text-destructive" />
          <h1 className="text-lg font-semibold">Что-то пошло не так</h1>
        </div>

        <p className="mt-3 text-sm text-muted-foreground">
          Попробуй обновить страницу или вернись на главную.
        </p>
        {error?.digest && (
          <p className="mt-2 text-xs text-muted-foreground">
            Код ошибки: {error.digest}
          </p>
        )}

        <div className="mt-6 flex gap-2">
          <Button onClick={reset} className="gap-2">
            <RotateCcw className="size-4" />
            Попробовать снова
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link href="/">
              <Home className="size-4" />
              На главную
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
