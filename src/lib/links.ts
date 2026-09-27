import { CONTACT_EMAIL } from "@/lib/forms";

export const FIND_SCHOOL_PATH = "/find-school";
// Classroom requests live on the Find a School page, below the map.
export const CLASSROOMS_PATH = `${FIND_SCHOOL_PATH}#classrooms`;
// Site-wide Donate buttons point at the classroom list until the GoFundMe link is added below.
export const DONATE_PATH = CLASSROOMS_PATH;
export const TEACHER_REQUEST_PATH = "/submit-project";
export const START_CHAPTER_PATH = "/start-a-chapter";

// Paste the organization's GoFundMe URL here. Until then, donate buttons on the
// classroom page open an email to the team instead.
export const GOFUNDME_URL = "";

export const donationHref = (note?: string) =>
  GOFUNDME_URL ||
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(note ? `Donation: ${note}` : "I'd like to donate")}`;
