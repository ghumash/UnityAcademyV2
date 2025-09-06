export type ErrorsDict = {
  error: {
    title: string;
    description: string;
    tryAgain: string;
    goHome: string;
    errorCode: string;
  };
  notFound: {
    title: string;
    description: string;
    goHome: string;
    courses: string;
  };
  courseNotFound: {
    description: string;
    backToCourses: string;
  };
};
