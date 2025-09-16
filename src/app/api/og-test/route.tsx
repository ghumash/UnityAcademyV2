import React from "react";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#7c3aed",
          color: "white",
          fontSize: 48,
          fontWeight: "bold",
        }}
      >
        OG Test Working!
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
