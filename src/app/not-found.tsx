import Link from "next/link";
import { Button } from "@/shared/ui";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center p-6">
      <div className="w-full max-w-md rounded-lg border bg-card p-6 text-card-foreground">
        <h1 className="text-2xl font-bold tracking-tight">
          404 — Страница не найдена
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Такой страницы нет. Проверь адрес или вернись на главную.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button asChild>
            <Link href="/">На главную</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/courses">Курсы</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/apply">Подать заявку</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
