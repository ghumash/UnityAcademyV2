import type { ErrorsDict } from "./types";

export const errors: ErrorsDict = {
  error: {
    title: "Something went wrong",
    description: "Try refreshing the page or go back to home.",
    tryAgain: "Try again",
    goHome: "Go home",
    errorCode: "Error code",
  },
  notFound: {
    title: "Page not found",
    description: "This page doesn't exist. Check the address or go back to home.",
    goHome: "Go home",
    courses: "Courses",
  },
  courseNotFound: {
    description: "Course not found or not yet published.",
    backToCourses: "Back to courses",
  },
};
