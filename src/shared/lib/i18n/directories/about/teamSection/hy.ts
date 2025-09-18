import type { TeamSectionDict } from "../types";

export const teamSection: TeamSectionDict = {
  title: "Մեր թիմը",
  emptyState: "Մենք պատրաստում ենք մեր թիմի անդամների պրոֆիլները: Շուտով այստեղ կկարողանաք ծանոթանալ մեր փորձառու դասախոսների, մենտորների և մասնագետների հետ, ովքեր կօգնեն ձեզ հասնել ձեր նպատակներին:",
  members: [
    {
      name: "Տիգրան Ղումաշյան",
      role: "Հիմնադիր և գլխավոր տնօրեն",
      avatarUrl: "/images/users/tigran.png",
      socials: {
        github: "https://github.com/ghumash",
      },
    },
    {
      name: "Սիրանուշ Հակոբյան",
      role: "Բովանդակության մենեջեր",
      avatarUrl: "/images/users/siranush.png",
      socials: {
        instagram: "https://instagram.com/sir_hakobyan_",
      },
    },
    {
      name: "Մանե Հովսեփյան",
      role: "Գրաֆիկական դիզայնի դասախոս",
      avatarUrl: "/images/users/mane.png",
      socials: {
        instagram: "https://instagram.com/",
      },
    },
    {
      name: "Անի Թամարյան",
      role: "Մանկական ծրագրավորման դասախոս",
      avatarUrl: "/images/users/ani.png",
      socials: {
        instagram: "https://instagram.com/",
      },
    },
    {
      name: "Վաղարշակ Գասպարյան",
      role: "JavaScript դասախոս",
      avatarUrl: "/images/users/vagharshak.png",
      socials: {
        instagram: "https://instagram.com/",
      },
    },
  ],
} as const;
