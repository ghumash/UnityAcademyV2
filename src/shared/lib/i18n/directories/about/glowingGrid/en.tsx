import { siteConfig } from "@/shared/config/common";

export const glowingGrid = {
  items: [
    {
      title: "Modern In-Demand Directions",
      description:
        "AI, Kids Coding, Mobile Development, Web Development, Graphic Design, UI/UX Design, SMM, HR, during courses we also organize excursions to various organizations and more",
    },
    {
      title: "Career",
      description:
        "The best students will be included in our database and will later receive job offers from us or our partners",
    },
    {
      title: "Free HR Training",
      description:
        "The training will give graduates the opportunity to learn the important rules of CV creation and LinkedIn platform, understand how to properly prepare and present themselves for interviews and know the answers to all exciting questions:",
    },
    {
      title: "Portfolio",
      description:
        "At the end of the course, you will have professional works that you will include in your portfolio.",
    },
    {
      title: "Certification and Digital Verification",
      description:
        `After successful completion of the course, you receive a ${siteConfig.name} personalized certificate with digital verification (QR/link). You can add it to LinkedIn and attach it to your CV. The assessment is based on attendance, homework and final project.`,
    },
    {
      title: "Seminars",
      description:
        "We have guests from well-known companies who share their experience and answer your questions, improving your knowledge in the IT field and career matters",
    },
    {
      title: "Community",
      description:
        "Powerful community where students learn, create new connections, together create startups and more",
    },
    {
      title: "Dayoff",
      description: (
        <>
          <strong>«Dayoff» meetings</strong> — weekly, free and informal community gatherings.
          <br /><br />
          <strong>Community connection</strong> — uniting participants from all groups: networking, team communication.
          <br /><br />
          <strong>Internal activities</strong> — games, intellectual programs, team competitions in a warm environment.
          <br /><br />
          <strong>Thematic discussions</strong> — current topics, experience sharing, idea presentations.
          <br /><br />
          <strong>Values and self-education</strong> — we talk about values and form learning strategies.
          <br /><br />
          <strong>New initiatives</strong> — brainstorming and idea development around projects.
          <br /><br />
          <strong>External activities</strong> — trips, camps, IT events.
        </>
      ),
    },
  ],
} as const;
