import type { CourseDict } from "../../types";

export const python: CourseDict = {
  courseHeroSection: {
    title: "Python Programming",
    description:
      "Learn Python programming from scratch. Create web applications, data analysis, artificial intelligence, and automation tools.",
    level: "Intermediate",
    format: "Offline",
    duration: "5 Months",
    lessonsCount: "40 Lessons",
    weeklyLessonCount: "2 Lessons per Week",
    projectsCount: "10 Projects",
    certificateIncluded: true,
    price: "40 000 ֏",
    originalPrice: "50 000 ֏",
    sale: "20% OFF",
    registerCourseButtonText: "Register for Course",
    registerFreeLessonButtonText: "",
    certificate: "Certificate",
    theme: "lime",
    formatLabel: "Format",
    discountTimer: {
      title: "Discount Active",
      subtitle: "Hurry up to register!",
    },
  },
    projects: {
    display: false,
    subtitle: "CREATE YOUR UNIQUE STYLE",
    titlePart1: "Instructor's",
    titlePart2: "Works",    list: [
      {
        img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=800&fit=crop&crop=entropy",
        href: "https://example.com/project1"
      },
      {
        img: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&h=800&fit=crop&crop=entropy",
        href: "https://example.com/project2"
      },
      {
        img: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=800&fit=crop&crop=entropy",
        href: "https://example.com/project3"
      },
      {
        img: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=800&fit=crop&crop=entropy",
        href: "https://example.com/project4"
      },
    ],
  },
  instructor: {
    display: false,
    name: "David Avetisyan",
    role: "Senior Python Developer & Data Scientist",
    bio: "Experienced Python developer with 7+ years in web development, data science, and machine learning. Specializes in Django, Flask, pandas, and scikit-learn.",
    avatarUrl: "/users/david.jpg",
    socials: {
      github: "https://github.com/david-avetisyan",
      linkedin: "https://linkedin.com/in/david-avetisyan",
    },
    experience: {
      senior: {
        title: "Senior Python Developer",
        company: "DataTech Armenia",
        period: "2020 - Present",
        summary:
          "Python web application development, data analysis systems, ML model integration, team leadership.",
      },
      mid: {
        title: "Python Developer",
        company: "TechSolutions Yerevan",
        period: "2018 - 2020",
        summary:
          "Django and Flask projects, REST API development, database design, automation scripts.",
      },
      junior: {
        title: "Junior Python Developer",
        company: "CodeAcademy Armenia",
        period: "2017 - 2018",
        summary:
          "Python fundamentals, web scraping, data processing, basic web applications.",
      },
    },
    experienceLabel: "Work Experience",
    socialNetworksLabel: "Social Networks",
    showDetails: "Show Details",
    hideDetails: "Hide Details",
  },
  topics: {
    title: "Course Topics",
    list: [
      "Topic 1: Python Introduction, Installation and Setup",
      "Topic 2: Variables, Data Types, Operators",
      "Topic 3: Conditions, Loops, Functions",
      "Topic 4: Data Structures: Lists, Dictionaries",
      "Topic 5: Object-Oriented Programming",
      "Topic 6: File Handling, Exceptions",
      "Topic 7: Modules and Packages",
      "Topic 8: Standard Library and pip",
      "Topic 9: Web Scraping with BeautifulSoup",
      "Topic 10: Data Processing with pandas",
      "Topic 11: Data Visualization with matplotlib",
      "Topic 12: NumPy and Scientific Computing",
      "Topic 13: Working with Databases SQLite",
      "Topic 14: Flask Web Framework Introduction",
      "Topic 15: Creating Web Applications with Flask",
      "Topic 16: Django Framework Basics",
      "Topic 17: Django Models and Database",
      "Topic 18: Django Templates and Views",
      "Topic 19: REST API Development with Django REST Framework",
      "Topic 20: Automation Scripts",
      "Topic 21: Machine Learning Introduction",
      "Topic 22: scikit-learn and ML Models",
      "Topic 23: Deployment and Production",
      "Topic 24: Portfolio Creation and Presentation",
    ],
  },
  conditions: {
    title: "Course Special Advantages",
    list: [
      {
        title: "Comprehensive Projects",
        description: "Create real web applications, APIs, and data analysis tools.",
      },
      {
        title: "Modern Technologies",
        description: "Learn Django, Flask, pandas, numpy, and other popular Python libraries.",
      },
      {
        title: "Mentoring Support",
        description: "Individual guidance from experienced Python developers and career counseling.",
      },
    ],
  },
  cta: {
    title: "Python Programming: Registration Application",
    subtitle: "Start your career with Python",
  },
};
