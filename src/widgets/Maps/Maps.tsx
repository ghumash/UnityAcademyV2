import React, { useMemo, type CSSProperties } from "react";
import { Button } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { ExternalLink } from "lucide-react";

type Props = {
  address?: string;
  height?: number | string;
  zoom?: number;
  className?: string;
};

const MapsComponent = React.memo(({
  height = 400,
  zoom = 19,
  address,
  className,
}: Props) => {
  const ORG_ID = "121360538380";

  const OPEN_LINK = "https://yandex.com/maps/-/CHxSQTkF";
  const OPEN_LINK_GOOGLE = "https://maps.app.goo.gl/saMHAc8tjFqtZo3H9";

  const EMBED_SRC = useMemo(
    () => `https://yandex.com/map-widget/v1/?ol=biz&oid=${ORG_ID}&z=${zoom}`,
    [zoom]
  );

  const wrapperStyle: CSSProperties = useMemo(() => ({ height }), [height]);

  const title = useMemo(
    () => `Unity Academy on Yandex Maps${address ? ` — ${address}` : ""}`,
    [address]
  );

  return (
    <div className={cn("space-y-4 w-full", className)}>
      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button asChild variant="outline" className="gap-2 rounded-full">
          <a href={OPEN_LINK} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            <span>Yandex Maps</span>
          </a>
        </Button>

        <Button asChild variant="outline" className="gap-2 rounded-full">
          <a href={OPEN_LINK_GOOGLE} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            <span>Google Maps</span>
          </a>
        </Button>
      </div>

      {/* Map */}
      <div
        className="overflow-hidden rounded-2xl border border-border bg-background/50"
        style={wrapperStyle}
      >
        <iframe
          src={EMBED_SRC}
          title={title}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    </div>
  );
});

MapsComponent.displayName = "Maps";

// Экспортируем обычную версию для внутреннего использования
export { MapsComponent };

// Lazy export для ленивой загрузки
export const Maps = React.lazy(() => 
  Promise.resolve({ default: MapsComponent })
);
