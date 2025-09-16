import { ImageResponse } from "next/og";
import { siteConfig } from "@/shared/config/common";

interface OpenGraphImageProps {
  title: string;
  description?: string;
  theme?: "default" | "about" | "courses" | "contacts" | "apply";
}

const themes = {
  default: {
    bgColor: "#101014",
    iconBg: "#7c3aed",
    iconSize: 64,
    titleSize: 40,
    descSize: 28,
  },
  about: {
    bgColor: "#151426",
    iconBg: "#7c3aed",
    iconSize: 56,
    titleSize: 54,
    descSize: 26,
  },
  courses: {
    bgColor: "#171426",
    iconBg: "#7c3aed",
    iconSize: 56,
    titleSize: 60,
    descSize: 28,
  },
  contacts: {
    bgColor: "#0f1a1a",
    iconBg: "#22d3ee",
    iconSize: 56,
    titleSize: 54,
    descSize: 26,
  },
  apply: {
    bgColor: "#0f1514",
    iconBg: "#34d399",
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
    const debug = process.env.NEXT_PUBLIC_OG_DEBUG === "1" || process.env.NEXT_PUBLIC_OG_DEBUG === "true";

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
            // Сплошной фон: Satori стабильно рендерит backgroundColor
            backgroundColor: selectedTheme.bgColor,
            color: "white",
            fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
          }}
        >
          {/* Header with logo and site name */}
          <div style={{ display: "flex", gap: theme === "default" ? 16 : 14, alignItems: "center" }}>
            <div
              style={{
                width: selectedTheme.iconSize,
                height: selectedTheme.iconSize,
                borderRadius: 12,
                backgroundColor: selectedTheme.iconBg,
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
          {/* Debug overlay (включается флагом NEXT_PUBLIC_OG_DEBUG=1|true) */}
          {debug && (
            <div
              style={{
                marginTop: 8,
                fontSize: 16,
                opacity: 0.7,
              }}
            >
              {`dbg theme=${theme} url=${siteConfig.url}`}
            </div>
          )}
        </div>
      ),
      {
        width: 1200,
        height: 630,
        // Диагностические заголовки помогут в Network → Response Headers
        headers: {
          "x-og-theme": theme,
          "x-og-site": siteConfig.url,
        },
      }
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
