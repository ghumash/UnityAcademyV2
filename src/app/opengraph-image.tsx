import { ImageResponse } from "next/og";
import { siteConfig } from "@/shared/config";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  const title = siteConfig.name;
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
            "linear-gradient(135deg, rgba(16,16,20,1) 0%, rgba(32,32,40,1) 50%, rgba(16,16,20,1) 100%)",
          color: "white",
        }}
      >
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {/* кружок-логотип (если нужен реальный логотип — подставь <img src=... />) */}
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 12,
              background:
                "radial-gradient(100% 100% at 50% 0%, #7c3aed 0%, #22d3ee 100%)",
            }}
          />
          <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -0.5 }}>
            {title}
          </div>
        </div>

        <div
          style={{ fontSize: 28, opacity: 0.9, lineHeight: 1.3, maxWidth: 900 }}
        >
          {desc}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            opacity: 0.7,
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
