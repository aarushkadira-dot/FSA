import aarushImg from "@/assets/aarush.jpg";

// Shown on the Team page and the About page.
export type TeamMember = { name: string; role: string; bio: string; image?: string };

export const STUDENT_BOARD: TeamMember[] = [
  {
    name: "Aarush Kadira",
    role: "Founder",
    bio: "Visionary leader dedicated to empowering students and creating opportunities for the next generation of scholars.",
    image: aarushImg,
  },
  {
    name: "Joshua Castelino",
    role: "Secretary",
    bio: "Organizational expert ensuring smooth operations and effective communication across all initiatives.",
    image: "/joshua.jpg",
  },
  {
    name: "Pihu Khadkad",
    role: "Partnerships Manager",
    bio: "Builds FSA's partnerships with schools and organizations.",
    image: "/pihu.jpg",
  },
  {
    name: "Anay Kamath",
    role: "Social Media Manager",
    bio: "Runs FSA's social media and shares our work with the community.",
  },
  {
    name: "Arvin Gupta",
    role: "Website Manager",
    bio: "Builds and maintains the FSA website.",
    image: "/arvin.jpg",
  },
  {
    name: "Aaron Gim",
    role: "Community Outreach Manager",
    bio: "Connects FSA with families, schools and community groups, and organizes outreach events.",
    image: "/aaron.jpg",
  },
];

export const ADVISORY_BOARD: TeamMember[] = [
  {
    name: "TJ Cawley",
    role: "Advisory Board Member",
    bio: "Bringing expertise and mentorship to guide FSA's initiatives and strategic growth.",
    image: "/tjcawley.jpg",
  },
];
