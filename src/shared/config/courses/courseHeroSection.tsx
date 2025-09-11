import { getT } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n";

export async function getCourseHeroConfig(locale: Locale, slug: string) {
  const t = await getT(locale);

  return {
    title: t(`courses.list.${slug}.courseHeroSection.title`),
    description: t(`courses.list.${slug}.courseHeroSection.description`),
    level: t(`courses.list.${slug}.courseHeroSection.level`),
    format: t(`courses.list.${slug}.courseHeroSection.format`),
    duration: t(`courses.list.${slug}.courseHeroSection.duration`),
    lessonsCount: t(`courses.list.${slug}.courseHeroSection.lessonsCount`),
    projectsCount: t(`courses.list.${slug}.courseHeroSection.projectsCount`),
    price: t(`courses.list.${slug}.courseHeroSection.price`),
    originalPrice: t(`courses.list.${slug}.courseHeroSection.originalPrice`),
    sale: t(`courses.list.${slug}.courseHeroSection.sale`),
    registerCourseButtonText: t(`courses.list.${slug}.courseHeroSection.registerCourseButtonText`),
    registerFreeLessonButtonText: t(`courses.list.${slug}.courseHeroSection.registerFreeLessonButtonText`),
    certificate: t(`courses.list.${slug}.courseHeroSection.certificate`),
  } as const;
}
