import type { ContactDict } from "./types";

export const contacts: ContactDict = {
  pageTitle: "Կապ",
  tiles: [
    {
      title: "Միացեք մեր համայնքին",
      description:
        "Միացեք Տելեգրամ ալիքին՝ այստեղ կգտնեք աշխատանքի հայտարարություններ, հետաքրքիր իվենթներ և այլ ծրագրերի մասին ինֆորմացիներ",
      action: {
        label: "Անցնել",
      },
    },
    {
      title: "Էլ. հասցե",
      description: "Պատասխանում ենք աշխատանքային ժամերին։",
      action: {
        label: "Անցնել",
      },
    },
    {
      title: "Ինստագրամ",
      description: "Սթրիներ, ռիլեր, դասընթացի մեկնարկներ և թարմացումներ։",
      action: {
        label: "Անցնել",
      },
    },
    {
      title: "Ֆեյսբուք",
      description: "Սթրիներ, շորթեր, դասընթացի մեկնարկներ և թարմացումներ։",
      action: {
        label: "Անցնել",
      },
    },
  ],
  longItems: [
    {
      label: "Հասցե",
      value: "Վանաձոր, Վարդանանցի փողոց, 116Ա",
    },
    {
      label: "Հեռախոս",
      value: "+374 99 951 915",
    },
  ],
} as const;
