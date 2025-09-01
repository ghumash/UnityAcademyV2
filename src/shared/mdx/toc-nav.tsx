import Link from "next/link";
import type { TocItem } from "./toc";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  ScrollArea,
} from "@/shared/ui";

export function MdxTocNav({
  items,
  title = "Содержание",
}: {
  items: TocItem[];
  title?: string;
}) {
  if (!items?.length) return null;

  return (
    <Card className="sticky top-24 hidden lg:block">
      <CardHeader className="py-3">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ScrollArea className="max-h-[70svh]">
          <nav aria-label={title} className="text-sm">
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
                  <Link
                    href={`#${item.id}`}
                    className="text-foreground/80 hover:text-foreground"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
