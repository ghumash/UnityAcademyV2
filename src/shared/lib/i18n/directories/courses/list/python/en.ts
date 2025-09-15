import type { CourseDict } from "../../types";

export const python: CourseDict = {
  courseHeroSection: {
    title: "Python Programming",
    description:
      "Learn Python programming from scratch. Create web applications, data analysis, artificial intelligence, and automation tools.",
    level: "beginner",
    format: "offline",
    duration: "5 months",
    lessonsCount: "40 Lessons",
    projectsCount: "10 Projects",
    certificateIncluded: true,
    price: "100000 ֏",
    originalPrice: "125000 ֏",
    sale: "20% Discount",
    registerCourseButtonText: "Register for Course",
    registerFreeLessonButtonText: "Register for Free Lesson",
    certificate: "Certificate",
    theme: "lime",
    formatLabel: "Format",
  },
  instructor: {
    name: "David Avetisyan",
    role: "Senior Python Developer & Data Scientist",
    bio: "Experienced Python developer with 7+ years of experience in web development, data science, and machine learning. Specializing in Django, Flask, pandas, and scikit-learn.",
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
    title: "Course Conditions",
    blocks: {
      first: {
        title: "Duration",
        description: "6 months, 2 classes per week",
      },
      second: {
        title: "Beginner",
        description: "No prior experience required",
      },
      third: {
        title: "Be part of",
        description: "Python developers community",
      },
    },
  },
  cta: {
    title: "Python Programming: Registration Application",
    subtitle: "Start your career with Python",
  },
};
