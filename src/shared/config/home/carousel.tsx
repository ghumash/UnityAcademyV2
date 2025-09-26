import type { Locale } from "@/shared/lib/i18n";

export type CarouselItem = {
  img: string;
  title?: string;
  /** Short, human description for screen readers and SEO */
  desc?: string;
};

export async function getCarouselConfig(_locale: Locale) {
  // const t = await getT(locale);

  return {
    items: [
      {
        img: "/images/carousel/1.jpg",
      },
      {
        img: "/images/carousel/2.jpg",
      },
      {
        img: "/images/carousel/3.jpg",
      },
      {
        img: "/images/carousel/4.jpg",
      },
      {
        img: "/images/carousel/5.jpg",
      },
      {
        img: "/images/carousel/6.jpg",
      },
      {
        img: "/images/carousel/7.jpg",
      },
      {
        img: "/images/carousel/8.jpg",
      },
      {
        img: "/images/carousel/9.jpg",
      },
      {
        img: "/images/carousel/10.jpg",
      },
      {
        img: "/images/carousel/11.jpg",
      },
      {
        img: "/images/carousel/12.jpg",
      },
      {
        img: "/images/carousel/13.jpg",
      },
      {
        img: "/images/carousel/14.jpg",
      },
      {
        img: "/images/carousel/15.jpg",
      },
      {
        img: "/images/carousel/16.jpg",
      },
      {
        img: "/images/carousel/17.jpg",
      },
      {
        img: "/images/carousel/18.jpg",
      },
      {
        img: "/images/carousel/19.jpg",
      },
      {
        img: "/images/carousel/20.jpg",
      },
      {
        img: "/images/carousel/21.jpg",
      },
      {
        img: "/images/carousel/22.jpg",
      },
      {
        img: "/images/carousel/23.jpg",
      },
    ] as const satisfies readonly CarouselItem[],
  } as const;
}
