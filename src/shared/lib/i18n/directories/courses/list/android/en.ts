import type { CourseDict } from "../../types";

export const android: CourseDict = {
  courseHeroSection: {
    title: "Android Programming: Java & Kotlin",
    description:
      "Learn Android app development with Java and Kotlin. Create mobile applications, work with Google Play Store, and develop your mobile development skills.",
    level: "Beginner",
    format: "Offline",
    duration: "6 Months",
    lessonsCount: "48 Lessons",
    projectsCount: "12 Projects",
    certificateIncluded: true,
    price: "40000 ֏",
    originalPrice: "50000 ֏",
    sale: "20% Discount",
    registerCourseButtonText: "Register for Course",
    registerFreeLessonButtonText: "Register for Free Lesson",
    certificate: "Certificate",
    theme: "emerald",
    formatLabel: "Format",
  },
  projects: [
    {
      img: "/images/projects/project.jpg",
      href: "https://example.com/project1"
    },
    {
      img: "/images/projects/project.jpg",
      href: "https://example.com/project2"
    },
    {
      img: "/images/projects/project.jpg",
      href: "https://example.com/project3"
    },
  ],
  instructor: {
    display: false,
    name: "Artak Grigoryan",
    role: "Senior Android Developer & Mobile Architect",
    bio: "Experienced Android developer with 8+ years of experience in mobile app development. Specializing in Java, Kotlin, Android SDK, and modern mobile architecture.",
    experience: {
      senior: {
        title: "Senior Android Developer",
        company: "MobileTech Armenia",
        period: "2020 - Present",
        summary:
          "Android app architecture and development, team leadership, code reviews, publishing 30+ applications.",
      },
      mid: {
        title: "Android Developer",
        company: "AppStudio Yerevan",
        period: "2018 - 2020",
        summary:
          "Native Android apps, Material Design implementation, REST API integration, Google Services work.",
      },
      junior: {
        title: "Junior Mobile Developer",
        company: "DevHub Armenia",
        period: "2016 - 2018",
        summary:
          "Android fundamentals, Java programming, UI/UX implementation, basic app development.",
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
      "Topic 1: Introduction to Android Development, Android Studio",
      "Topic 2: Java Fundamentals for Android",
      "Topic 3: Kotlin Language Introduction",
      "Topic 4: Android SDK and API Levels",
      "Topic 5: Activities and Lifecycle",
      "Topic 6: Fragments and Navigation",
      "Topic 7: Layouts and Views",
      "Topic 8: Material Design and UI/UX",
      "Topic 9: RecyclerView and Adapters",
      "Topic 10: Intents and Data Passing",
      "Topic 11: SharedPreferences and Data Storage",
      "Topic 12: SQLite Database",
      "Topic 13: Room Database",
      "Topic 14: Networking and HTTP Requests",
      "Topic 15: JSON Parsing and Retrofit",
      "Topic 16: Images and Picasso/Glide",
      "Topic 17: Background Tasks and AsyncTask",
      "Topic 18: Services and Broadcast Receivers",
      "Topic 19: Notifications and Push Messages",
      "Topic 20: Location Services and Maps",
      "Topic 21: Camera and Media",
      "Topic 22: Permissions and Security",
      "Topic 23: Testing and Debugging",
      "Topic 24: Publishing and Google Play Store",
    ],
  },
  conditions: {
    title: "Course Special Advantages",
    list: [
      {
        title: "Practical Projects",
        description: "Create real Android applications from simple tools to complex programs.",
      },
      {
        title: "Industry Standards",
        description: "Learn Google's best practices and Material Design principles.",
      },
      {
        title: "Career Support",
        description: "Help with CV creation and technical interview preparation.",
      },
    ],
  },
  cta: {
    title: "Android Programming: Registration Application",
    subtitle: "Start your career in mobile development",
  },
};
