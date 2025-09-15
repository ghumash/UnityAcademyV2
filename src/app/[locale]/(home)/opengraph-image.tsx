import { siteConfig } from "@/shared/config/common";
import { createOpenGraphImage } from "@/shared/seo/createOpenGraphImage";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return createOpenGraphImage({
    title: siteConfig.name,
    description: siteConfig.description,
    theme: "default",
  });
}
