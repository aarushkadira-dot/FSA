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
