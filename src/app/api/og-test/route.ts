import { ImageResponse } from "next/og";
import React from "react";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    console.log("[OG][api-test] start", { ts: new Date().toISOString() });
    const element = React.createElement(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0b0b10",
          color: "#fff",
          fontSize: 48,
          fontFamily:
            "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        },
      },
      "OG Test OK"
    );

    return new ImageResponse(element, {
      width: 1200,
      height: 630,
      headers: {
        "x-og-test": "1",
      },
    });
  } catch (err) {
    console.error("[OG][api-test] error", err);
    const fallback = React.createElement(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#111",
          color: "#fff",
          fontSize: 28,
        },
      },
      `OG API error: ${String((err as any)?.message || err)}`
    );
    return new ImageResponse(fallback, { width: 1200, height: 630 });
  }
}
