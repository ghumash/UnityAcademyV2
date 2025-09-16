import { getT, type Locale } from "@/shared/lib/i18n";
import { createOpenGraphImage } from "@/shared/seo/createOpenGraphImage";
import { siteConfig } from "@/shared/config/common";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function OG({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  try {
    const { locale } = await params;
    console.log("[OG][home] start", {
      locale,
      siteUrl: siteConfig.url,
      ts: new Date().toISOString(),
    });

    const t = await getT(locale);
    const title = t("common.seo.home.title");
    const description = t("common.seo.home.description");

    return createOpenGraphImage({
      title,
      description,
      theme: "default",
    });
  } catch (err) {
    console.error("[OG][home] error", err);
    const { ImageResponse } = await import("next/og");
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
          {`OG home error: ${String((err as any)?.message || err)}`}
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }
}
