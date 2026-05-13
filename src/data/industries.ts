export type Industry = {
  slug: string;
  name: string;
  short: string;
  blurb: string;
  trailerTypes: string[];
};

export const industries: Industry[] = [
  {
    slug: "manufacturing",
    name: "Manufacturing & Industrial",
    short: "Inbound raw materials, outbound finished goods.",
    blurb:
      "From inbound steel coils and resin pellets to outbound finished goods, we keep plant floors moving with dedicated capacity, drop-trailer programs and predictable transit.",
    trailerTypes: ["Dry van", "Flatbed", "Step deck", "Pneumatic tanker"],
  },
  {
    slug: "construction",
    name: "Construction & Building Materials",
    short: "Aggregates, steel, rooftop equipment and modular.",
    blurb:
      "Aggregates to jobsite, steel to fabricator, rooftop HVAC to commercial install — Earth Logistics dispatches the trailer type your trade demands.",
    trailerTypes: ["End dump", "Flatbed", "Lowboy", "Step deck"],
  },
  {
    slug: "agriculture",
    name: "Agriculture & Grain",
    short: "Harvest-season capacity for grain & fertilizer.",
    blurb:
      "Hopper bottom for corn, soy and wheat; pneumatic for fertilizer; reefer for produce. Pre-book seasonal lanes ahead of harvest to lock in capacity.",
    trailerTypes: ["Hopper bottom", "Pneumatic tanker", "Reefer", "Flatbed"],
  },
  {
    slug: "food-and-beverage",
    name: "Food & Beverage",
    short: "FSMA-compliant cold chain & dry CPG.",
    blurb:
      "Frozen, refrigerated and ambient food shipping with FSMA compliance, temperature tracking and food-grade tanker capacity.",
    trailerTypes: ["Reefer", "Food-grade tanker", "Dry van", "Hopper bottom"],
  },
  {
    slug: "energy-oil-gas",
    name: "Energy / Oil & Gas",
    short: "Frac sand, equipment, hazmat and rig-side delivery.",
    blurb:
      "Frac sand pneumatics, lowboy rig moves, DOT-407 chemical tankers and hazmat-certified capacity to wellhead, pad and refinery.",
    trailerTypes: ["Pneumatic", "Lowboy", "DOT-407", "Hazmat"],
  },
  {
    slug: "automotive",
    name: "Automotive & Auto Parts",
    short: "Tier-1 parts, finished vehicles and dealer transport.",
    blurb:
      "Just-in-time dry van for Tier-1 plant deliveries, open and enclosed auto transport for dealers, manufacturers and auctions.",
    trailerTypes: ["Dry van", "Car hauler enclosed", "Car hauler open", "Flatbed"],
  },
  {
    slug: "retail-and-ecommerce",
    name: "Retail & E-commerce",
    short: "DC-to-store and direct-to-consumer middle mile.",
    blurb:
      "Dry-van middle mile from regional DCs to retail and fulfillment networks. Drop-trailer programs available for repeat lanes.",
    trailerTypes: ["Dry van", "Reefer", "Drop trailer"],
  },
  {
    slug: "chemical-industrial",
    name: "Chemical & Industrial",
    short: "Hazmat, intermediates and packaged chemicals.",
    blurb:
      "DOT-407 chemical tanker, packaged hazmat dry van, totes, drums and bulk powders shipped under full 49 CFR compliance.",
    trailerTypes: ["DOT-407", "Hazmat dry van", "Pneumatic", "Flatbed"],
  },
];
