import { getT } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n";
import { Rocket, Wrench } from "lucide-react";
import type { GridItemData, UserCardData } from "@/widgets";

export async function getCoursePageConfig(locale: Locale, slug: string) {
  const t = await getT(locale);

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
    badge: { text: t(`courses.single.conditions.badge`) },
    blocks: [
      {
        items: [
          {
            icon: <Wrench className="size-5" />,
            title: t(`courses.single.conditions.community.title`),
            description: t(`courses.single.conditions.community.description`),
          },
        ],
      },
      {
        items: [
          {
            icon: <Wrench className="size-5" />,
            title: t(`courses.single.conditions.community.title`),
            description: t(`courses.single.conditions.community.description`),
          },
        ],
      },
      {
        items: [
          {
            icon: <Wrench className="size-5" />,
            title: t(`courses.single.conditions.community.title`),
            description: t(`courses.single.conditions.community.description`),
          },
        ],
      },
    ],
  };

  const mockUserData: UserCardData = {
    name: t(`courses.single.instructor.name`),
    role: t(`courses.single.instructor.role`),
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    bio: t(`courses.single.instructor.bio`),
    experience: [
      {
        title: t(`courses.single.instructor.experience.senior.title`),
        company: t(`courses.single.instructor.experience.senior.company`),
        period: t(`courses.single.instructor.experience.senior.period`),
        summary: t(`courses.single.instructor.experience.senior.summary`),
      },
      {
        title: t(`courses.single.instructor.experience.mid.title`),
        company: t(`courses.single.instructor.experience.mid.company`),
        period: t(`courses.single.instructor.experience.mid.period`),
        summary: t(`courses.single.instructor.experience.mid.summary`),
      },
      {
        title: t(`courses.single.instructor.experience.junior.title`),
        company: t(`courses.single.instructor.experience.junior.company`),
        period: t(`courses.single.instructor.experience.junior.period`),
        summary: t(`courses.single.instructor.experience.junior.summary`),
      },
    ],
    socials: {
      github: "https://github.com/annapetrov",
      linkedin: "https://linkedin.com/in/annapetrov",
      x: "https://x.com/annapetrov",
      website: "https://annapetrov.dev",
    },
  };

  const courseTopicsConfig = {
    title: t("courses.single.topics.title"),
    topics: [
      "HTML5 semantic markup",
      "CSS3 advanced styling",
      "JavaScript ES6+ features",
      "React component architecture",
      "TypeScript fundamentals",
      "Node.js backend development",
      "Express.js API creation",
      "MongoDB database design",
      "Authentication & authorization",
      "Deployment strategies",
      "Testing methodologies",
      "Performance optimization",
    ],
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
    activeTagId: slug,
  };

  const ctaBannerConfig = {
    heading: t("courses.faq_banner.heading"),
    buttons: {
      primary: {
        text: t("courses.faq_banner.button_text"),
        url: "/faq",
      },
    },
  };

  return {
    contentSection: contentSectionConfig,
    instructor: mockUserData,
    courseTopics: courseTopicsConfig,
    glowingGrid: glowingGridConfig,
    callToAction: callToActionConfig,
    ctaBanner: ctaBannerConfig,
  };
}
