import type { PARTNER_SCHOOLS } from "@/data/organization";

export type ClassroomRequest = {
  id: string;
  title: string;
  teacher: string; // e.g. "Ms. Rivera"
  grade: string; // e.g. "3rd grade"
  school: (typeof PARTNER_SCHOOLS)[number];
  students: number;
  quote: string; // one or two sentences in the teacher's words
  items: string[];
  goal: number; // dollars
  raised: number; // dollars, updated by hand as donations come in
  photo?: string; // path under /public, e.g. "/requests/rivera.jpg"
  donateUrl?: string; // optional per-request link; falls back to GOFUNDME_URL
};

// Add classroom requests here. Newest first. A request moves to "Recently funded"
// automatically once `raised` reaches `goal`.
//
// Example:
// {
//   id: "rivera-notebooks",
//   title: "Notebooks and pencils for our writers",
//   teacher: "Ms. Rivera",
//   grade: "3rd grade",
//   school: "Bugg Magnet Elementary",
//   students: 24,
//   quote: "Half of my students start the year without a notebook. I want every one of them writing on day one.",
//   items: ["24 composition notebooks", "6 boxes of pencils", "4 packs of erasers"],
//   goal: 180,
//   raised: 60,
//   photo: "/requests/rivera.jpg",
// },
export const CLASSROOM_REQUESTS: ClassroomRequest[] = [];
