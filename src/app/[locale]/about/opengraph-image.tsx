import { getT, type Locale } from "@/shared/lib/i18n";
import { createOpenGraphImage } from "@/shared/seo/createOpenGraphImage";
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
    console.log("[OG][about] start", {
      locale,
      siteUrl: siteConfig.url,
      ts: new Date().toISOString(),
    });

    const t = await getT(locale);
    const title = t("common.navigation.about");

    return createOpenGraphImage({
      title,
      description: t("common.seo.about.description"),
      theme: "about",
    });
  } catch (err) {
    console.error("[OG][about] error", err);
    // Запасной минимальный рендер, чтобы видеть ошибку прямо в изображении
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
          {`OG about error: ${String((err as any)?.message || err)}`}
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }
}
