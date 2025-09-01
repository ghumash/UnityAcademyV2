import * as React from "react";

export function YouTube({
  id,
  title = "YouTube video",
}: {
  id: string; // только ID, не полный URL
  title?: string;
}) {
  const src = `https://www.youtube-nocookie.com/embed/${id}`;
  return (
    <div className="relative mt-6 overflow-hidden rounded-lg border">
      <div className="aspect-video">
        <iframe
          className="h-full w-full"
          src={src}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </div>
  );
}
