import { getT } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n";

export type CarouselItem = {
  img: string;
  title: string;
  /** Short, human description for screen readers and SEO */
  desc: string;
  /** Unique id for slider value & a11y hooks */
  sliderName: string;
};

export async function getCarouselConfig(locale: Locale) {
  const t = await getT(locale);

  return {
    items: [
      {
        img: "https://images.unsplash.com/photo-1709949908058-a08659bfa922?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: t("home.carousel.items.0.title"),
        desc: t("home.carousel.items.0.desc"),
        sliderName: "bridge",
      },
      {
        img: "https://images.unsplash.com/photo-1518972734183-c5b490a7c637?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: t("home.carousel.items.1.title"),
        desc: t("home.carousel.items.1.desc"),
        sliderName: "mountains",
      },
      {
        img: "https://images.unsplash.com/photo-1548192746-dd526f154ed9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: t("home.carousel.items.2.title"),
        desc: t("home.carousel.items.2.desc"),
        sliderName: "autumn",
      },
      {
        img: "https://images.unsplash.com/photo-1628965882741-570e75becd5d?q=80&w=687&auto=format&fit=crop",
        title: t("home.carousel.items.3.title"),
        desc: t("home.carousel.items.3.desc"),
        sliderName: "foggy",
      },
    ] as const satisfies readonly CarouselItem[],
  } as const;
}
