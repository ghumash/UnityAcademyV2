import { ImageResponse } from "next/og";
import { siteConfig } from "@/shared/config/common";
import { getT, type Locale } from "@/shared/lib/i18n";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getT(locale);
  const title = t("common.navigation.contacts");
  const desc = siteConfig.description;

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
          background:
            "linear-gradient(135deg, rgba(16,24,24,1) 0%, rgba(20,60,90,1) 50%, rgba(16,24,24,1) 100%)",
          color: "white",
        }}
      >
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background:
                "radial-gradient(100% 100% at 50% 0%, #22d3ee 0%, #7c3aed 100%)",
            }}
          />
          <div style={{ fontSize: 36, fontWeight: 800 }}>{siteConfig.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
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
            {desc}
          </div>
        </div>

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
    { ...size }
  );
}
