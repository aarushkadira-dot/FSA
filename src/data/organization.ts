// Single source for org facts shown on several pages. Update here and every page follows.

export const PARTNER_SCHOOLS = [
  "Bugg Magnet Elementary",
  "Durant Road Elementary",
  "Forest Pines Drive Elementary",
  "Fuller Magnet Elementary",
  "Kingswood Elementary",
] as const;

export const CHAPTERS = [
  { name: "Charlotte", region: "North Carolina" },
  { name: "Houston", region: "Texas" },
  { name: "India", region: "International" },
  { name: "Vietnam", region: "International" },
];

// Official locations (NC DPI school code + NCES coordinates) for the map's partner pins.
export const PARTNER_SCHOOL_LOCATIONS: {
  name: (typeof PARTNER_SCHOOLS)[number];
  id: string;
  address: string;
  coordinates: [number, number]; // [longitude, latitude]
}[] = [
  { name: "Bugg Magnet Elementary", id: "920352", address: "825 Cooper Rd, Raleigh, NC 27610", coordinates: [-78.5866, 35.7659] },
  { name: "Durant Road Elementary", id: "920398", address: "9901 Durant Rd, Raleigh, NC 27614", coordinates: [-78.5804, 35.9003] },
  { name: "Forest Pines Drive Elementary", id: "920417", address: "11455 Forest Pines Drive, Raleigh, NC 27614", coordinates: [-78.54708, 35.95323] },
  { name: "Fuller Magnet Elementary", id: "920416", address: "806 Calloway Drive, Raleigh, NC 27610", coordinates: [-78.62445, 35.75466] },
  { name: "Kingswood Elementary", id: "920460", address: "200 E. Johnson Street, Cary, NC 27513", coordinates: [-78.7782, 35.7932] },
];

export const MISSION_STATEMENT =
  "The Future Scholars Association is a student-run nonprofit working to make sure every student in a Title I school has the supplies they need to learn. We partner directly with teachers to find out what their classrooms are missing, raise the money to cover it, and get those supplies into students' hands.";

export const FOUNDED = "September 13, 2025";

// Headline numbers used on Home, About and Impact. Update here.
export const IMPACT = {
  studentsReached: 294,
  dollarsRaised: 1450,
};

// Add the IRS Employer Identification Number (e.g. "12-3456789") to show it on About and Impact.
export const EIN = "";

export const EVENTS = [
  {
    name: "Support for Scholars Drive",
    date: "January 17, 2026",
    summary: "A school supply drive for Bugg Elementary.",
  },
  {
    name: "Future Innovators Expo",
    date: "January 17, 2026",
    summary:
      "Hands-on STEM stations at Cedar Fork Community Center: paper airplanes, slime chemistry, bridge building and a live robotics demo.",
  },
  {
    name: "Future Scholars Summit",
    date: "March 1, 2026",
    summary:
      "Student teams, nonprofits and researchers pitched their ideas to community and state leaders, including Mayor TJ Cawley, Rep. Maria Cervania and Councilwoman Sarika Bansal.",
  },
];

// The next event. The home page banner hides itself once `endsAt` has passed.
// After the event, move it into EVENTS above and add photos to its page.
export const PICKLEBALL_TOURNAMENT = {
  name: "Pickleball Tournament",
  path: "/events/pickleball",
  partner: { name: "The Health Literacy Project", short: "HLP" },
  date: "Sunday, October 4, 2026",
  time: "2 to 6 PM",
  location: "Pleasant Park",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Pleasant+Park+Apex+NC",
  causes: ["Supporting Title I schools", "Spreading awareness for breast cancer"],
  fees: [
    { label: "Players", amount: "$8" },
    { label: "Spectators", amount: "$5" },
  ],
  startsAt: "2026-10-04T14:00:00-04:00",
  endsAt: "2026-10-04T18:00:00-04:00",
};

export const isUpcoming = (event: { endsAt: string }) => Date.now() < new Date(event.endsAt).getTime();

// Organizations FSA partners with. `together` describes what FSA does with them; add it when ready.
export const PARTNER_ORGANIZATIONS: { name: string; about: string; url: string; together?: string }[] = [
  {
    name: "Key Club",
    about: "Kiwanis International's service leadership program for high school students.",
    url: "https://www.keyclub.org",
  },
  {
    name: "NC DECA",
    about: "North Carolina's association of DECA, which prepares students for careers in marketing, finance, hospitality and management.",
    url: "https://www.ncdeca.org",
  },
  {
    name: "NC FCCLA",
    about: "North Carolina's association of Family, Career and Community Leaders of America, a student organization for family and consumer sciences education.",
    url: "https://fcclainc.org",
  },
  {
    name: "NC FBLA",
    about: "North Carolina's association of Future Business Leaders of America, which prepares students for careers in business.",
    url: "https://www.ncfbla.org",
  },
];

// Impact page details. Each section stays hidden until it has data.
export const SUPPLIES_DELIVERED: { item: string; count: number }[] = [];
export const FUNDS_USED: { label: string; percent: number }[] = [];
export const QUOTES: { quote: string; name: string; role: string }[] = [];
