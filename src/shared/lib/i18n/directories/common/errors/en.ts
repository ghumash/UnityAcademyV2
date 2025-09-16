import type { ErrorsDict } from "./types";

export const errors: ErrorsDict = {
  error: {
    title: "Something went wrong",
    description: "Try refreshing the page or return to home page.",
    tryAgain: "Try again",
    goHome: "Home",
    errorCode: "Error code",
  },
  notFound: {
    title: "Page not found",
    description: "Such page does not exist. Check the address or return to home.",
    goHome: "Home",
    courses: "Courses",
  },
  courseNotFound: {
    description: "Course not found or not yet published.",
    backToCourses: "Courses",
  },
};
