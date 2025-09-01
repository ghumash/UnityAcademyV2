import * as React from "react";
import { Button, Card, CardContent } from "@/shared/ui";

type Props = {
  id?: string; // Google Form ID (e.g. 1FAIpQLS...)
  url?: string; // full embed url; overrides id
  title?: string;
  height?: number; // px
  openText?: string; // текст кнопки "Открыть в новой вкладке"
};

function buildEmbedUrl(id?: string, url?: string) {
  if (url) return url;
  if (!id) return undefined;
  return `https://docs.google.com/forms/d/e/${id}/viewform?embedded=true`;
}
function buildOpenUrl(id?: string, url?: string) {
  if (url) return url.replace("&embedded=true", "");
  if (!id) return undefined;
  return `https://docs.google.com/forms/d/e/${id}/viewform`;
}

export function GoogleFormEmbed({
  id,
  url,
  title = "Google Form",
  height = 1200,
  openText = "Открыть форму",
}: Props) {
  const embed = buildEmbedUrl(id, url);
  const open = buildOpenUrl(id, url);

  if (!embed) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">
            Форма временно недоступна. Обновите переменные окружения с Google
            Form ID.
          </p>
          {open && (
            <div className="mt-4">
              <Button asChild>
                <a href={open} target="_blank" rel="noopener noreferrer">
                  {openText}
                </a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-lg border">
      <iframe
        src={embed}
        title={title}
        loading="lazy"
        className="h-[1200px] w-full"
        height={height}
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="border-t p-3 text-right">
        {open && (
          <Button asChild variant="outline" size="sm">
            <a href={open} target="_blank" rel="noopener noreferrer">
              {openText}
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
