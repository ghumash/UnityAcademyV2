import { getT } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n";
import { Rocket, Wrench } from "lucide-react";
import type { GridItemData, TagId, UserCardData } from "@/widgets";
import type { Theme } from "@/widgets/Courses";

export async function getCoursePageConfig(locale: Locale, slug: string) {
  const t = await getT(locale);

  const courseHeroSection = {
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
      title: (
        <>
          {t(`courses.single.benefits.hr_training.title_part1`)}{" "}
          <strong>
            {t(`courses.single.benefits.hr_training.title_part2`)}
          </strong>
        </>
      ),
      description: <>{t(`courses.single.benefits.hr_training.description`)}</>,
    },
    {
      icon: (
        <Rocket
          className="h-4 w-4 text-black dark:text-neutral-400"
          aria-hidden="true"
        />
      ),
      title: (
        <>
          {t(`courses.single.benefits.english_course.title_part1`)}{" "}
          <strong>
            {t(`courses.single.benefits.english_course.title_part2`)}
          </strong>
        </>
      ),
      description: t(`courses.single.benefits.english_course.description`),
    },
    {
      icon: (
        <Rocket
          className="h-4 w-4 text-black dark:text-neutral-400"
          aria-hidden="true"
        />
      ),
      title: t(`courses.single.benefits.portfolio.title`),
      description: t(`courses.single.benefits.portfolio.description`),
    },
  ];

  const contentSectionConfig = {
    badge: { text: t(`courses.list.${slug}.conditions.badge`) },
    blocks: [
      {
        items: [
          {
            icon: <Wrench className="size-5" />,
            title: t(`courses.list.${slug}.conditions.community.title`),
            description: t(
              `courses.list.${slug}.conditions.community.description`
            ),
          },
        ],
      },
      {
        items: [
          {
            icon: <Wrench className="size-5" />,
            title: t(`courses.list.${slug}.conditions.community.title`),
            description: t(
              `courses.list.${slug}.conditions.community.description`
            ),
          },
        ],
      },
      {
        items: [
          {
            icon: <Wrench className="size-5" />,
            title: t(`courses.list.${slug}.conditions.community.title`),
            description: t(
              `courses.list.${slug}.conditions.community.description`
            ),
          },
        ],
      },
    ],
  };

  const mockUserData: UserCardData = {
    name: t(`courses.list.${slug}.instructor.name`),
    role: t(`courses.list.${slug}.instructor.role`),
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    bio: t(`courses.list.${slug}.instructor.bio`),
    experience: [
      {
        title: t(`courses.list.${slug}.instructor.experience.senior.title`),
        company: t(`courses.list.${slug}.instructor.experience.senior.company`),
        period: t(`courses.list.${slug}.instructor.experience.senior.period`),
        summary: t(`courses.list.${slug}.instructor.experience.senior.summary`),
      },
      {
        title: t(`courses.list.${slug}.instructor.experience.mid.title`),
        company: t(`courses.list.${slug}.instructor.experience.mid.company`),
        period: t(`courses.list.${slug}.instructor.experience.mid.period`),
        summary: t(`courses.list.${slug}.instructor.experience.mid.summary`),
      },
      {
        title: t(`courses.list.${slug}.instructor.experience.junior.title`),
        company: t(`courses.list.${slug}.instructor.experience.junior.company`),
        period: t(`courses.list.${slug}.instructor.experience.junior.period`),
        summary: t(`courses.list.${slug}.instructor.experience.junior.summary`),
      },
    ],
    socials: {
      github: "https://github.com/annapetrov",
      linkedin: "https://linkedin.com/in/annapetrov",
      x: "https://x.com/annapetrov",
      website: "https://annapetrov.dev",
    },
  };

  const instructorLabels = {
    experienceLabel: t(`courses.list.${slug}.instructor.experienceLabel`),
    socialNetworksLabel: t(`courses.list.${slug}.instructor.socialNetworksLabel`),
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
    activeTagId: slug as TagId,
  };

  const ctaBannerConfig = {
    heading: t("courses.single.faq_banner.heading"),
    buttons: {
      primary: {
        text: t("courses.single.faq_banner.button_text"),
        url: "/faq",
      },
    },
  };

  return {
    courseHeroSection,
    contentSection: contentSectionConfig,
    instructor: mockUserData,
    instructorLabels,
    courseTopics: courseTopicsConfig,
    glowingGrid: glowingGridConfig,
    callToAction: callToActionConfig,
    ctaBanner: ctaBannerConfig,
  };
}
