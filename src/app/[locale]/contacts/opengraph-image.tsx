import { getT, type Locale } from "@/shared/lib/i18n";
import { createOpenGraphImage } from "@/shared/seo/createOpenGraphImage";

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

  return createOpenGraphImage({
    title,
    description: t("common.seo.contacts.description"),
    theme: "contacts",
  });
}
