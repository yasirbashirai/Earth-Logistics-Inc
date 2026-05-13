export type Region = {
  slug: string;
  name: string;
  states: string[];
  hubs: string[];
  blurb: string;
};

export const regions: Region[] = [
  {
    slug: "midwest",
    name: "Midwest Freight Lanes",
    states: ["Indiana", "Illinois", "Ohio", "Michigan", "Wisconsin", "Iowa", "Missouri", "Minnesota"],
    hubs: ["Chicago, IL", "Indianapolis, IN", "Columbus, OH", "Detroit, MI", "St. Louis, MO"],
    blurb:
      "Headquartered in Saint John, Indiana — the Midwest is our home turf. Dense dry-van, flatbed, end-dump and hopper-bottom capacity throughout the Chicago / Indianapolis / Columbus / Detroit triangle.",
  },
  {
    slug: "southeast",
    name: "Southeast Freight Lanes",
    states: ["Georgia", "Florida", "Alabama", "Tennessee", "North Carolina", "South Carolina", "Kentucky"],
    hubs: ["Atlanta, GA", "Charlotte, NC", "Nashville, TN", "Jacksonville, FL", "Memphis, TN"],
    blurb:
      "High-volume reefer and dry van capacity along I-75, I-85 and I-95 with strong Atlanta, Charlotte and Jacksonville coverage.",
  },
  {
    slug: "southwest",
    name: "Southwest & Texas Lanes",
    states: ["Texas", "Oklahoma", "New Mexico", "Arizona", "Louisiana", "Arkansas"],
    hubs: ["Dallas-Fort Worth, TX", "Houston, TX", "San Antonio, TX", "Oklahoma City, OK"],
    blurb:
      "Texas Triangle dominance plus frac-sand pneumatic and energy-sector lowboy capacity across the Permian, Eagle Ford and Bakken-adjacent corridors.",
  },
  {
    slug: "northeast",
    name: "Northeast Freight Lanes",
    states: ["Pennsylvania", "New York", "New Jersey", "Massachusetts", "Connecticut", "Maryland", "Virginia"],
    hubs: ["New York, NY", "Philadelphia, PA", "Pittsburgh, PA", "Boston, MA", "Baltimore, MD"],
    blurb:
      "Port-side reefer and dry-van capacity from Newark, Elizabeth and Philadelphia inland to Pittsburgh and Buffalo.",
  },
  {
    slug: "west-coast",
    name: "West Coast Freight Lanes",
    states: ["California", "Oregon", "Washington", "Nevada"],
    hubs: ["Los Angeles, CA", "Oakland, CA", "Portland, OR", "Seattle, WA"],
    blurb:
      "LA / Long Beach / Oakland port drayage handoff into long-haul reefer and dry van — including CARB-compliant capacity.",
  },
  {
    slug: "rocky-mountain",
    name: "Rocky Mountain Freight Lanes",
    states: ["Colorado", "Utah", "Wyoming", "Montana", "Idaho"],
    hubs: ["Denver, CO", "Salt Lake City, UT", "Boise, ID"],
    blurb:
      "Mountain corridor flatbed and lowboy capacity, plus winter-rated reefer routing through I-70, I-80 and I-15.",
  },
];
