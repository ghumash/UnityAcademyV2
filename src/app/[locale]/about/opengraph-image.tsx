import { ImageResponse } from "next/og";
import { getT, type Locale } from "@/shared/lib/i18n";
import { siteConfig } from "@/shared/config/common";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const alt = "Unity Academy — About page Open Graph image";

export default async function OG({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  try {
    const { locale } = await params;
    const t = await getT(locale);
    const title = t("common.navigation.about");
    const description = t("common.seo.about.description");

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 48,
            backgroundColor: "#151426",
            color: "white",
            fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
          }}
        >
          {/* Header with logo and site name */}
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 12,
                backgroundColor: "#7c3aed",
              }}
            />
            <div style={{ fontSize: 36, fontWeight: 800 }}>{siteConfig.name}</div>
          </div>

          {/* Main content */}
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: 12,
          }}>
            <div
              style={{
                fontSize: 54,
                fontWeight: 800,
                letterSpacing: -1,
                lineHeight: 1.05,
                maxWidth: 1000,
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: 26,
                opacity: 0.9,
                lineHeight: 1.35,
                maxWidth: 1000,
              }}
            >
              {description}
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 22,
              opacity: 0.75,
            }}
          >
            <span>{new Date().getFullYear()}</span>
            <span>{siteConfig.url.replace(/^https?:\/\//, "")}</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (err) {
    console.error("[OG][about] error", err);
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#111",
            color: "#fff",
            fontSize: 28,
            padding: 32,
          }}
        >
          {`OG about error: ${String((err as any)?.message || err)}`}
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }
}
