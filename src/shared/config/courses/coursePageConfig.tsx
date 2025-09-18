import { getT } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n";
import { BadgeCheck, Rocket, Users, Award, FolderOpen } from "lucide-react";
import type { GridItemData } from "@/widgets";
import type { CourseKey } from "@/entities/course";
import type { Theme } from "@/widgets/Courses";
import { siteConfig } from "@/shared/config/common";

// Простая фильтрация - убирает элементы с пустыми полями или ключами переводов
const filterItems = (items: any[]) =>
  items.filter(
    (item) =>
      item.title &&
      item.description &&
      !item.title.startsWith("courses.list.") &&
      !item.description.startsWith("courses.list.")
  );

export async function getCoursePageConfig(locale: Locale, slug: string) {
  const t = await getT(locale);

  const courseHeroSection = {
    title: t(`courses.list.${slug}.courseHeroSection.title`),
    description: t(`courses.list.${slug}.courseHeroSection.description`),
    level: t(`courses.list.${slug}.courseHeroSection.level`),
    format: t(`courses.list.${slug}.courseHeroSection.format`),
    duration: t(`courses.list.${slug}.courseHeroSection.duration`),
    lessonsCount: t(`courses.list.${slug}.courseHeroSection.lessonsCount`),
    weeklyLessonCount: t(`courses.list.${slug}.courseHeroSection.weeklyLessonCount`),
    projectsCount: t(`courses.list.${slug}.courseHeroSection.projectsCount`),
    price: t(`courses.list.${slug}.courseHeroSection.price`),
    originalPrice: t(`courses.list.${slug}.courseHeroSection.originalPrice`),
    sale: t(`courses.list.${slug}.courseHeroSection.sale`),
    registerCourseButtonText: t(
      `courses.list.${slug}.courseHeroSection.registerCourseButtonText`
    ),
    registerFreeLessonButtonText: t(
      `courses.list.${slug}.courseHeroSection.registerFreeLessonButtonText`
    ),
    certificate: t(`courses.list.${slug}.courseHeroSection.certificate`),
    theme: t(`courses.list.${slug}.courseHeroSection.theme`) as Theme,
  } as const;

  const items: GridItemData[] = [
    {
      icon: (
        <Rocket
          className="h-4 w-4 text-black dark:text-neutral-400"
          aria-hidden="true"
        />
      ),
      title: t(`courses.single.benefits.items.0.title`),
      description: <>{t(`courses.single.benefits.items.0.description`)}</>,
    },
    {
      icon: (
        <Users
          className="h-4 w-4 text-black dark:text-neutral-400"
          aria-hidden="true"
        />
      ),
      title: t(`courses.single.benefits.items.1.title`),
      description: t(`courses.single.benefits.items.1.description`),
    },
    {
      icon: (
        <Award
          className="h-4 w-4 text-black dark:text-neutral-400"
          aria-hidden="true"
        />
      ),
      title: t(`courses.single.benefits.items.2.title`),
      description: t(`courses.single.benefits.items.2.description`),
    },
    {
      icon: (
        <FolderOpen
          className="h-4 w-4 text-black dark:text-neutral-400"
          aria-hidden="true"
        />
      ),
      title: t(`courses.single.benefits.items.3.title`),
      description: t(`courses.single.benefits.items.3.description`),
    },
  ];

  // Получаем массив условий из переводов
  const conditionsList = t(`courses.list.${slug}.conditions.list`) as Array<{
    title: string;
    description: string;
  }>;

  const allItems = conditionsList.map((_, index) => ({
    icon: <BadgeCheck className="size-5" />,
    title: t(`courses.list.${slug}.conditions.list.${index}.title`),
    description: t(`courses.list.${slug}.conditions.list.${index}.description`),
  }));

  const contentSectionConfig = {
    title: t(`courses.list.${slug}.conditions.title`),
    blocks: filterItems(allItems).map((item) => ({
      items: [item],
    })),
  };

  // Получаем данные инструктора из переводов
  const instructorData = t(`courses.list.${slug}.instructor`) as any;

  // Фильтруем опыт работы - показываем только доступные уровни
  const experienceEntries = [];

  if (instructorData.experience?.senior) {
    experienceEntries.push({
      title: t(`courses.list.${slug}.instructor.experience.senior.title`),
      company: t(`courses.list.${slug}.instructor.experience.senior.company`),
      period: t(`courses.list.${slug}.instructor.experience.senior.period`),
      summary: t(`courses.list.${slug}.instructor.experience.senior.summary`),
    });
  }

  if (instructorData.experience?.mid) {
    experienceEntries.push({
      title: t(`courses.list.${slug}.instructor.experience.mid.title`),
      company: t(`courses.list.${slug}.instructor.experience.mid.company`),
      period: t(`courses.list.${slug}.instructor.experience.mid.period`),
      summary: t(`courses.list.${slug}.instructor.experience.mid.summary`),
    });
  }

  if (instructorData.experience?.junior) {
    experienceEntries.push({
      title: t(`courses.list.${slug}.instructor.experience.junior.title`),
      company: t(`courses.list.${slug}.instructor.experience.junior.company`),
      period: t(`courses.list.${slug}.instructor.experience.junior.period`),
      summary: t(`courses.list.${slug}.instructor.experience.junior.summary`),
    });
  }

  const instructor = {
    display: instructorData.display !== false, // по умолчанию true, если не указано false
    name: t(`courses.list.${slug}.instructor.name`),
    role: t(`courses.list.${slug}.instructor.role`),
    avatarUrl: instructorData.avatarUrl,
    bio: t(`courses.list.${slug}.instructor.bio`),
    experience: experienceEntries,
    socials: instructorData.socials || {},
    experienceLabel: t(`courses.list.${slug}.instructor.experienceLabel`),
    socialNetworksLabel: t(
      `courses.list.${slug}.instructor.socialNetworksLabel`
    ),
    showDetails: t(`courses.list.${slug}.instructor.showDetails`),
    hideDetails: t(`courses.list.${slug}.instructor.hideDetails`),
  };

  const courseTopicsConfig = {
    title: t(`courses.list.${slug}.topics.title`),
    topics: t(`courses.list.${slug}.topics.list`),
  };

  const glowingGridConfig = {
    title: {
      label: (
        <>
          {t(`courses.single.benefits.title_part1`)}
          <br /> {t(`courses.single.benefits.title_part2`)}
        </>
      ),
      className: "text-center",
    },
    items: items,
  };

  const callToActionConfig = {
    title: t(`courses.list.${slug}.cta.title`),
    subtitle: t(`courses.list.${slug}.cta.subtitle`),
    activeTagId: slug as CourseKey,
  };

  const ctaBannerConfig = {
    heading: t("courses.single.faq_banner.heading"),
    buttons: {
      primary: {
        text: t("courses.single.faq_banner.button_text"),
        url: siteConfig.routes.faq,
      },
    },
  };

  // Получаем проекты из переводов
  const projects = t(`courses.list.${slug}.projects`) as {
    display: boolean;
    subtitle: string;
    titlePart1: string;
    titlePart2: string;
    buttonLabel: string;
    list: Array<{
      img: string;
      href?: string;
    }>;
  };

  return {
    courseHeroSection,
    contentSection: contentSectionConfig,
    instructor,
    courseTopics: courseTopicsConfig,
    glowingGrid: glowingGridConfig,
    callToAction: callToActionConfig,
    ctaBanner: ctaBannerConfig,
    projects,
  };
}
