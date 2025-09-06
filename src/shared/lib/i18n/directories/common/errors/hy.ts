import type { ErrorsDict } from "./types";

export const errors: ErrorsDict = {
  error: {
    title: "Ինչ-որ բան սխալ գնաց",
    description: "Փորձեք թարմացնել էջը կամ վերադառնալ գլխավոր էջ:",
    tryAgain: "Նորից փորձել",
    goHome: "Գլխավոր",
    errorCode: "Սխալի կոդ",
  },
  notFound: {
    title: "Էջը չի գտնվել",
    description: "Այսպիսի էջ գոյություն չունի: Ստուգեք հասցեն կամ վերադառնալ գլխավոր:",
    goHome: "Գլխավոր",
    courses: "Դասընթացներ",
  },
  courseNotFound: {
    description: "Դասընթացը չի գտնվել կամ դեռ չի հրապարակվել:",
    backToCourses: "← Դասընթացներ",
  },
};
