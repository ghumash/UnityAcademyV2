import type { TeamSectionDict } from "../types";

export const teamSection: TeamSectionDict = {
  title: "Մեր թիմը",
  emptyState:
    "Մենք պատրաստում ենք մեր թիմի անդամների պրոֆիլները: Շուտով այստեղ կկարողանաք ծանոթանալ մեր փորձառու դասախոսների, մենտորների և մասնագետների հետ, ովքեր կօգնեն ձեզ հասնել ձեր նպատակներին:",
  members: [
    {
      name: "Տիգրան Ղումաշյան",
      role: "Հիմնադիր և գլխավոր տնօրեն",
      avatarUrl: "/images/users/tigran.png",
    },
    {
      name: "Սիրանուշ Հակոբյան",
      role: "Բովանդակության մենեջեր",
      avatarUrl: "/images/users/siranush.png",
    },
    {
      name: "Մանե Հովսեփյան",
      role: "Գրաֆիկական դիզայնի դասախոս",
      avatarUrl: "/images/users/mane.png",
    },
    {
      name: "Անի Թամարյան",
      role: "Մանկական ծրագրավորման դասախոս",
      avatarUrl: "/images/users/ani.png",
    },
    {
      name: "Վաղարշակ Գասպարյան",
      role: "JavaScript դասախոս",
      avatarUrl: "/images/users/vagharshak.png",
    },
  ],
} as const;
