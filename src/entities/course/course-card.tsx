import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardTitle } from "@/shared/ui";
import type { Course } from "./types";

type Props = Pick<Course, "slug" | "title" | "excerpt" | "imageUrl" | "tags">;

export default function CourseCard({
  slug,
  title,
  excerpt,
  imageUrl,
  tags,
}: Props) {
  return (
    <Card className="overflow-hidden">
      {imageUrl ? (
        <Link href={`/courses/${slug}`} className="block">
          <Image
            src={imageUrl}
            alt=""
            width={640}
            height={360}
            sizes="(min-width: 768px) 33vw, 100vw"
            className="aspect-[16/9] w-full object-cover"
            priority={false}
          />
        </Link>
      ) : null}

      <CardContent className="pt-4">
        <CardTitle className="text-base leading-tight">
          <Link href={`/courses/${slug}`} className="hover:underline">
            {title}
          </Link>
        </CardTitle>
        {excerpt ? (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
            {excerpt}
          </p>
        ) : null}
      </CardContent>

      {tags && tags.length > 0 ? (
        <CardFooter className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-md border px-2 py-0.5 text-xs text-foreground/80"
            >
              {t}
            </span>
          ))}
        </CardFooter>
      ) : null}
    </Card>
  );
}
