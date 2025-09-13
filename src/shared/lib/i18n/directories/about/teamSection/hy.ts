import type { TeamSectionDict } from "../types";

export const teamSection: TeamSectionDict = {
  title: "Մեր թիմը",
  emptyState: "Մենք պատրաստում ենք մեր թիմի անդամների պրոֆիլները: Շուտով այստեղ կկարողանաք ծանոթանալ մեր փորձառու դասախոսների, մենտորների և մասնագետների հետ, ովքեր կօգնեն ձեզ հասնել ձեր նպատակներին:",
  members: [
    {
      name: "Տիգրան Ղումաշյան",
      role: "Հիմնադիր և գլխավոր տնօրեն",
      avatarUrl: "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?w=256&h=256&fit=crop",
      socials: {
        github: "https://github.com/example",
      },
    },
    {
      name: "Սիրանուշ Հակոբյան",
      role: "Բովանդակության մենեջեր",
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=256&h=256&fit=crop",
      socials: {
        instagram: "https://instagram.com/sir_hakobyan_",
      },
    },
    {
      name: "Մանե Հովսեփյան",
      role: "Գրաֆիկական դիզայնի դասախոս",
      avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=256&h=256&fit=crop",
      socials: {
        instagram: "https://instagram.com/",
      },
    },
    {
      name: "Անի Թամարյան",
      role: "Մանկական ծրագրավորման դասախոս",
      avatarUrl: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=256&h=256&fit=crop",
      socials: {
        instagram: "https://instagram.com/",
      },
    },
    {
      name: "Վաղարշակ Գասպարյան",
      role: "JavaScript դասախոս",
      avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=256&h=256&fit=crop",
      socials: {
        instagram: "https://instagram.com/",
      },
    },
  ],
} as const;
