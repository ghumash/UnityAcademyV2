import { ImageResponse } from "next/og";
import { siteConfig } from "@/shared/config/common";

interface OpenGraphImageProps {
  title: string;
  description?: string;
  theme?: "default" | "about" | "courses" | "contacts" | "apply";
}

const themes = {
  default: {
    background: "linear-gradient(135deg, rgba(16,16,20,1) 0%, rgba(32,32,40,1) 50%, rgba(16,16,20,1) 100%)",
    iconGradient: "radial-gradient(100% 100% at 50% 0%, #7c3aed 0%, #22d3ee 100%)",
    iconSize: 64,
    titleSize: 40,
    descSize: 28,
  },
  about: {
    background: "linear-gradient(135deg, rgba(16,16,24,1) 0%, rgba(38,25,72,1) 50%, rgba(16,16,24,1) 100%)",
    iconGradient: "radial-gradient(100% 100% at 50% 0%, #7c3aed 0%, #22d3ee 100%)",
    iconSize: 56,
    titleSize: 54,
    descSize: 26,
  },
  courses: {
    background: "linear-gradient(135deg, rgba(16,16,24,1) 0%, rgba(38,25,72,1) 55%, rgba(16,16,24,1) 100%)",
    iconGradient: "radial-gradient(100% 100% at 50% 0%, #7c3aed 0%, #22d3ee 100%)",
    iconSize: 56,
    titleSize: 60,
    descSize: 28,
  },
  contacts: {
    background: "linear-gradient(135deg, rgba(16,24,24,1) 0%, rgba(20,60,90,1) 50%, rgba(16,24,24,1) 100%)",
    iconGradient: "radial-gradient(100% 100% at 50% 0%, #22d3ee 0%, #7c3aed 100%)",
    iconSize: 56,
    titleSize: 54,
    descSize: 26,
  },
  apply: {
    background: "linear-gradient(135deg, rgba(18,18,24,1) 0%, rgba(16,80,60,1) 50%, rgba(18,18,24,1) 100%)",
    iconGradient: "radial-gradient(100% 100% at 50% 0%, #34d399 0%, #22d3ee 100%)",
    iconSize: 56,
    titleSize: 54,
    descSize: 26,
  },
};

export function createOpenGraphImage({ title, description, theme = "default" }: OpenGraphImageProps) {
  try {
    const selectedTheme = themes[theme];
    const desc = description || siteConfig.description;
    console.log("[OG][create] props", { title, hasDesc: Boolean(description), theme });
    console.log("[OG][create] site", { name: siteConfig.name, url: siteConfig.url });

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
            background: selectedTheme.background,
            color: "white",
          }}
        >
          {/* Header with logo and site name */}
          <div style={{ display: "flex", gap: theme === "default" ? 16 : 14, alignItems: "center" }}>
            <div
              style={{
                width: selectedTheme.iconSize,
                height: selectedTheme.iconSize,
                borderRadius: 12,
                background: selectedTheme.iconGradient,
              }}
            />
            <div style={{ fontSize: 36, fontWeight: 800 }}>{siteConfig.name}</div>
          </div>

          {/* Main content */}
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: theme === "courses" ? 12 : 10,
            ...(theme === "default" && { flex: 1, justifyContent: "center" })
          }}>
            <div
              style={{
                fontSize: selectedTheme.titleSize,
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
                fontSize: selectedTheme.descSize,
                opacity: 0.9,
                lineHeight: theme === "default" ? 1.3 : 1.35,
                maxWidth: theme === "default" ? 900 : 1000,
              }}
            >
              {desc}
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 22,
              opacity: theme === "default" ? 0.7 : 0.75,
            }}
          >
            <span>{new Date().getFullYear()}</span>
            <span>{siteConfig.url.replace(/^https?:\/\//, "")}</span>
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  } catch (err) {
    console.error("[OG][create] error", err);
    const message = String((err as any)?.message || err);
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
          {`OG render error: ${message}`}
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }
}
