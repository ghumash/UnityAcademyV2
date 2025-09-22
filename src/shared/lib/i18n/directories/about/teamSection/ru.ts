import type { TeamSectionDict } from "../types";

export const teamSection: TeamSectionDict = {
  title: "Наша команда",
  emptyState:
    "Мы готовим профили членов нашей команды. Скоро здесь вы сможете познакомиться с нашими опытными преподавателями, менторами и специалистами, которые помогут вам достичь ваших целей.",
  members: [
    {
      name: "Тигран Гумашян",
      role: "Основатель и генеральный директор",
      avatarUrl: "/images/users/tigran.png",
    },
    {
      name: "Сирануш Акобян",
      role: "Менеджер по контенту",
      avatarUrl: "/images/users/siranush.png",
    },
    {
      name: "Мане Овсепян",
      role: "Преподаватель графического дизайна",
      avatarUrl: "/images/users/mane.png",
    },
    {
      name: "Ани Тамарян",
      role: "Преподаватель детского программирования",
      avatarUrl: "/images/users/ani.png",
    },
    {
      name: "Вагаршак Гаспарян",
      role: "Преподаватель JavaScript",
      avatarUrl: "/images/users/vagharshak.png",
    },
  ],
} as const;
