import * as React from "react";
import Link from "next/link";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { ExternalLink } from "lucide-react";

type Props = {
  /** Google Form ID (e.g. 1FAIpQLS...) */
  id?: string;
  /** Полный URL формы; имеет приоритет над id */
  url?: string;
  /** Заголовок карточки и title для iframe */
  title?: string;
  /** Фиксированная высота контейнера в px; если не задано — адаптивные svh-значения */
  height?: number;
  /** Текст кнопки открытия формы в новой вкладке */
  openText?: string;
  /** Доп. классы на корневой карточке */
  className?: string;
  /** Показать заголовок внутри карточки */
  showHeader?: boolean;
};

/** Разрешаем только docs.google.com и принудительно управляем параметром embedded */
function buildGoogleFormsUrl(
  { id, url }: { id?: string; url?: string },
  { embedded }: { embedded: boolean }
): string | undefined {
  if (url) {
    try {
      const u = new URL(url);
      // разрешаем только Google Forms
      if (!u.hostname.endsWith("docs.google.com")) return undefined;
      if (embedded) {
        u.searchParams.set("embedded", "true");
      } else {
        u.searchParams.delete("embedded");
      }
      return u.toString();
    } catch {
      return undefined;
    }
  }
  if (!id) return undefined;
  const base = `https://docs.google.com/forms/d/e/${encodeURIComponent(
    id
  )}/viewform`;
  return embedded ? `${base}?embedded=true` : base;
}

export function GoogleFormEmbed({
  id,
  url,
  title = "Google Form",
  height,
  openText = "Открыть форму",
  className,
  showHeader = true,
}: Props) {
  const embed = buildGoogleFormsUrl({ id, url }, { embedded: true });
  const open = buildGoogleFormsUrl({ id, url }, { embedded: false });

  // Если нечего встраивать — показываем понятный фолбек
  if (!embed) {
    return (
      <Card
        className={cn(
          "overflow-hidden rounded-2xl border-border/60",
          className
        )}
      >
        {showHeader && (
          <CardHeader>
            <CardTitle className="text-lg">Форма недоступна</CardTitle>
          </CardHeader>
        )}
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">
            Укажите корректный Google Form ID или полный URL формы на{" "}
            <span className="font-medium">docs.google.com</span>.
          </p>
        </CardContent>
        {open && (
          <CardFooter className="justify-end gap-2">
            <Button asChild variant="outline">
              <Link
                href={open}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${openText}: ${title}`}
              >
                {openText} <ExternalLink className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </CardFooter>
        )}
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border/60 bg-background/40 backdrop-blur-sm",
        // мягкие декоративные подсветки (неинтерактивные)
        "before:pointer-events-none before:absolute before:-top-24 before:-left-24 before:h-64 before:w-64 before:rounded-full before:bg-[radial-gradient(closest-side,rgba(168,85,247,0.12),transparent)] before:content-['']",
        "after:pointer-events-none after:absolute after:-bottom-24 after:-right-24 after:h-64 after:w-64 after:rounded-full after:bg-[radial-gradient(closest-side,rgba(14,165,233,0.10),transparent)] after:content-['']",
        "pb-0",
        className
      )}
    >
      {showHeader && (
        <CardHeader className="relative z-10 gap-0 flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          {open && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-full"
            >
              <Link
                href={open}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${openText}: ${title}`}
              >
                {openText}
                <ExternalLink className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
          )}
        </CardHeader>
      )}

      <CardContent className="relative z-10 p-0 gap-0">
        <div
          className={cn(
            "relative w-full",
            // если высота не задана — адаптивные высоты по брейкпоинтам (svh)
            !height &&
              "min-h-[70svh] sm:min-h-[75svh] md:min-h-[80svh] lg:min-h-[90svh]"
          )}
          style={height ? { height } : undefined}
        >
          <iframe
            src={embed}
            title={title}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      </CardContent>
    </Card>
  );
}
