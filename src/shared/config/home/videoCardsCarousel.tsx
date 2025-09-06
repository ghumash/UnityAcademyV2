import { getT } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n";

export type StudentPromo = {
  student: string; // Имя студента
  group: string; // Направление/группа (JavaScript, Graphic Design и т.д.)
  srcWebm?: string; // Основной источник (webm)
  srcMp4?: string; // Фолбэк (mp4)
  posterSrc?: string; // Постер превью (jpg/png/webp)
};

export async function getVideoCardsCarouselConfig(locale: Locale) {
  const t = await getT(locale);

  return {
    title: t("home.videoCardsCarousel.title"),
    students: [
      {
        student: t("home.videoCardsCarousel.students.0.student"),
        group: t("home.videoCardsCarousel.students.0.group"),
        // srcWebm: "/media/students/ani-js.webm",
        srcMp4: "/videos/video-1.mp4",
        // posterSrc: "/media/students/ani-js.jpg",
      },
      {
        student: t("home.videoCardsCarousel.students.1.student"),
        group: t("home.videoCardsCarousel.students.1.group"),
        // srcWebm: "/media/students/guro-gd.webm",
        srcMp4: "/videos/video-1.mp4",
        // posterSrc: "/media/students/guro-gd.jpg",
      },
      {
        student: t("home.videoCardsCarousel.students.2.student"),
        group: t("home.videoCardsCarousel.students.2.group"),
        // srcWebm: "/media/students/narek-android.webm",
        srcMp4: "/videos/video-1.mp4",
        // posterSrc: "/media/students/narek-android.jpg",
      },
      {
        student: t("home.videoCardsCarousel.students.3.student"),
        group: t("home.videoCardsCarousel.students.3.group"),
        // srcWebm: "/media/students/mariam-ai.webm",
        srcMp4: "/videos/video-1.mp4",
        // posterSrc: "/media/students/mariam-ai.jpg",
      },
      {
        student: t("home.videoCardsCarousel.students.4.student"),
        group: t("home.videoCardsCarousel.students.4.group"),
        // srcWebm: "/media/students/arman-smm.webm",
        srcMp4: "/videos/video-1.mp4",
      },
      {
        student: t("home.videoCardsCarousel.students.5.student"),
        group: t("home.videoCardsCarousel.students.5.group"),
        // srcWebm: "/media/students/lilit-scratch.webm",
        srcMp4: "/videos/video-1.mp4",
        // posterSrc: "/media/students/lilit-scratch.jpg",
      },
    ] as const satisfies readonly StudentPromo[],
  } as const;
}
