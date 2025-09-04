import { CSSProperties, forwardRef, memo } from "react";

type Track = {
  src: string;
  kind?: "captions" | "subtitles" | "descriptions" | "chapters" | "metadata";
  srclang?: string;
  label?: string;
  default?: boolean;
};

type PromoVideoProps = {
  title?: string;
  srcWebm: string;
  srcMp4?: string;
  poster?: string;
  aspect?: string; // e.g. "16 / 9"
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  preload?: "none" | "metadata" | "auto";
  style?: CSSProperties;
  className?: string;
  tracks?: Track[];
  crossOrigin?: "" | "anonymous" | "use-credentials";
};

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const PromoVideo = memo(
  forwardRef<HTMLVideoElement, PromoVideoProps>(function PromoVideo(
    {
      title = "Video",
      srcWebm,
      srcMp4,
      poster,
      aspect = "1 / 1",
      autoPlay = true,
      muted = true,
      loop = true,
      controls,
      preload = "metadata",
      style,
      className,
      tracks,
      crossOrigin,
    },
    ref
  ) {
    const captionId = `promo-video-${slug(title)}-caption`;
    const showControls = controls ?? !autoPlay;

    return (
      <figure className={className} style={style}>
        <video
          ref={ref}
          aria-labelledby={captionId}
          poster={poster}
          preload={preload}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          controls={showControls}
          playsInline
          crossOrigin={crossOrigin}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            objectFit: "cover",
            aspectRatio: aspect,
          }}
        >
          <source src={srcWebm} type="video/webm" />
          {srcMp4 ? <source src={srcMp4} type="video/mp4" /> : null}
          {tracks?.map((t, i) => (
            <track
              key={`${t.kind || "captions"}-${i}`}
              kind={t.kind}
              srcLang={t.srclang}
              label={t.label}
              src={t.src}
              default={t.default}
            />
          ))}
          Your browser does not support HTML5 video.
        </video>
        <figcaption id={captionId} className="sr-only">
          {title}
        </figcaption>
      </figure>
    );
  })
);
