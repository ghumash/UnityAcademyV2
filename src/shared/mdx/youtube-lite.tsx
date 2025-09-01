"use client";

import * as React from "react";

function getId(input?: string) {
  if (!input) return undefined;
  // поддержка url/id
  const m =
    /(?:v=|\/embed\/|youtu\.be\/)([A-Za-z0-9_-]{11})/.exec(input) ??
    (/^[A-Za-z0-9_-]{11}$/.test(input) ? [null, input] : null);
  return m?.[1];
}

export function YouTube({
  id,
  url,
  title = "YouTube video",
  autoplay = true,
  poster = "hqdefault",
}: {
  id?: string;
  url?: string;
  title?: string;
  autoplay?: boolean;
  poster?:
    | "default"
    | "hqdefault"
    | "mqdefault"
    | "sddefault"
    | "maxresdefault";
}) {
  const vid = getId(id ?? url);
  const [play, setPlay] = React.useState(false);

  if (!vid) return null;

  const src = `https://www.youtube-nocookie.com/embed/${vid}?rel=0&modestbranding=1&playsinline=1${
    autoplay && play ? "&autoplay=1" : ""
  }`;

  const thumb = `https://i.ytimg.com/vi/${vid}/${poster}.jpg`;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-black">
      {play ? (
        <iframe
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
          loading="lazy"
        />
      ) : (
        <button
          type="button"
          className="group absolute inset-0 h-full w-full"
          onClick={() => setPlay(true)}
          aria-label="Play video"
        >
          <img
            src={thumb}
            alt=""
            className="h-full w-full object-cover opacity-90 transition group-hover:opacity-100"
            loading="lazy"
          />
          <span className="absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border bg-white/90 px-4 py-2 text-sm font-medium text-black backdrop-blur group-hover:bg-white">
            ▶ Play
          </span>
        </button>
      )}
    </div>
  );
}
