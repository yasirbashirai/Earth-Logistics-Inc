export type Testimonial = {
  name: string;
  role: string;
  company: string;
  rating: number;
  body: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Marcus Whitfield",
    role: "Logistics Director",
    company: "Heartland Steel Distributors",
    rating: 5,
    body:
      "We moved 220 flatbed loads with Earth Logistics last quarter. On-time, tarped, strapped — every load. Their dispatch team picks up the phone at 2am if I need them.",
  },
  {
    name: "Renee Castellanos",
    role: "VP Supply Chain",
    company: "Midwest Foods Co.",
    rating: 5,
    body:
      "Our reefer capacity used to disappear at harvest. Earth Logistics gave us a dedicated lane commitment and we haven't missed a delivery window in eight months.",
  },
  {
    name: "Daniel Roesler",
    role: "Operations Manager",
    company: "Bluegrass Construction",
    rating: 5,
    body:
      "Heavy-haul on the same day, every time. They permitted a 12-axle excavator move across three states in 36 hours. That's not a broker — that's an operations partner.",
  },
  {
    name: "Vanessa Park",
    role: "Director of Procurement",
    company: "PureBlend Chemicals",
    rating: 5,
    body:
      "Hazmat compliance is non-negotiable for us. Earth Logistics' carriers are MCS-90 endorsed, properly placarded, and their paperwork is clean every single time.",
  },
  {
    name: "Carl Ehrlich",
    role: "Plant Manager",
    company: "Indiana Aggregate Co.",
    rating: 5,
    body:
      "39' end dumps within four hours of calling. Their bulk side division is the most responsive group we've worked with in 20 years of paving.",
  },
  {
    name: "Sophia Aldridge",
    role: "Owner",
    company: "Aldridge Auto Group",
    rating: 5,
    body:
      "Enclosed transport for our exotic inventory and open for daily dealer transfers. Earth Logistics handles both flawlessly — and the BOL paperwork is always clean.",
  },
];
