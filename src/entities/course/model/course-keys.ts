/**
 * Централизованные ключи курсов
 * Используется во всем проекте для обеспечения консистентности
 */
export const COURSE_KEYS = [
  "web_development",
  "graphic_design",
  "scratch",
  "smm",
  "python",
  "android",
  "ui_ux",
  "hr",
  "soft_skills",
] as const;

export type CourseKey = (typeof COURSE_KEYS)[number];

/**
 * Данные курсов с их отображаемыми названиями и позициями для CallToAction
 */
export const COURSE_DATA = {
  web_development: {
    key: "web_development" as const,
    displayName: "Web Development",
    value: "Վեբ ծրագրավորում",
    position: { top: "10%", left: "10%" },
  },
  graphic_design: {
    key: "graphic_design" as const,
    displayName: "Graphic Design",
    value: "Գրաֆիկ դիզայն",
    position: { top: "20%", left: "70%" },
  },
  scratch: {
    key: "scratch" as const,
    displayName: "Scratch Programming",
    value: "Ծրագրավորում երեխաների համար",
    position: { top: "-3%", left: "40%" },
  },
  smm: {
    key: "smm" as const,
    displayName: "SMM & Digital Marketing",
    value: "SMM և Digital Marketing",
    position: { top: "30%", left: "20%" },
  },
  python: {
    key: "python" as const,
    displayName: "Python Programming",
    value: "Python ծրագրավորում",
    position: { top: "40%", left: "80%" },
  },
  android: {
    key: "android" as const,
    displayName: "Java & Android",
    value: "Android ծրագրավորում",
    position: { top: "50%", left: "30%" },
  },
  ui_ux: {
    key: "ui_ux" as const,
    displayName: "UI/UX Design",
    value: "UI/UX դիզայն",
    position: { top: "60%", left: "60%" },
  },
  hr: {
    key: "hr" as const,
    displayName: "HR Management",
    value: "HR",
    position: { top: "70%", left: "15%" },
  },
  soft_skills: {
    key: "soft_skills" as const,
    displayName: "Soft Skills",
    value: "Soft Skills",
    position: { top: "80%", left: "50%" },
  },
} as const;

export type CourseData = (typeof COURSE_DATA)[CourseKey];
