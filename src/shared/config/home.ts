import { HeroAction } from "@/widgets";

export const home = {
  hero: {
    display: true,
    title: "Քո ապագան ՏՏ - ում սկսվում է այստեղ",
    subtitle: "Զարգացիր ջերմ և ոգեշնչող միջավայրում",
    actions: [
      {
        label: "Մեր առաքելությունը և ուղին",
        href: "/about",
        variant: "outline",
      },
      {
        label: "Դասընթացներ",
        href: "/courses",
        variant: "default",
      },
    ] as HeroAction[],
  },
} as const;
