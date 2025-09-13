import type { TeamSectionDict } from "../types";

export const teamSection: TeamSectionDict = {
  title: "Наша команда",
  emptyState: "Мы готовим профили членов нашей команды. Скоро здесь вы сможете познакомиться с нашими опытными преподавателями, менторами и специалистами, которые помогут вам достичь ваших целей.",
  members: [
    {
      name: "Тигран Гумашян",
      role: "Основатель и генеральный директор",
      avatarUrl: "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?w=256&h=256&fit=crop",
      socials: {
        github: "https://github.com/example",
      },
    },
    {
      name: "Сирануш Акобян",
      role: "Менеджер по контенту",
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=256&h=256&fit=crop",
      socials: {
        instagram: "https://instagram.com/sir_hakobyan_",
      },
    },
    {
      name: "Мане Овсепян",
      role: "Преподаватель графического дизайна",
      avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=256&h=256&fit=crop",
      socials: {
        instagram: "https://instagram.com/",
      },
    },
    {
      name: "Ани Тамарян",
      role: "Преподаватель детского программирования",
      avatarUrl: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=256&h=256&fit=crop",
      socials: {
        instagram: "https://instagram.com/",
      },
    },
    {
      name: "Вагаршак Гаспарян",
      role: "Преподаватель JavaScript",
      avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=256&h=256&fit=crop",
      socials: {
        instagram: "https://instagram.com/",
      },
    },
  ],
} as const;
