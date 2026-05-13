export type Service = {
  slug: string;
  name: string;
  short: string;
  blurb: string;
  long: string;
  image: string;
  category: "Van" | "Specialized" | "Bulk" | "Heavy" | "Hazmat";
  capabilities: string[];
  industries: string[];
  faqs: { q: string; a: string }[];
  keywords: string[];
};

export const services: Service[] = [
  {
    slug: "dry-van",
    name: "Dry Van Freight",
    short: "53' enclosed dry van capacity nationwide.",
    blurb:
      "Standard 53' dry van trailers for palletized, floor-loaded and boxed freight — the workhorse of US LTL/FTL shipping.",
    long: "Earth Logistics Inc moves dry van freight every hour of every day. Our vetted carrier network operates 53' enclosed trailers across all 48 contiguous states with real-time tracking, secured load-bar service, and dedicated drop trailer programs for high-volume shippers. Whether you ship CPG, retail, industrial or e-commerce freight, we'll match your lane to a carrier we trust.",
    image:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d3?auto=format&fit=crop&w=1600&q=80",
    category: "Van",
    capabilities: [
      "53' dry van capacity nationwide",
      "Drop-and-hook + live load/unload",
      "Real-time GPS tracking",
      "Floor-load and palletized freight",
      "OS&D management",
      "Same-day expedited dry van",
    ],
    industries: ["Retail", "CPG", "Manufacturing", "E-commerce", "Paper & packaging"],
    faqs: [
      {
        q: "What is the standard dry van capacity?",
        a: "53' x 102\" trailers carry approximately 45,000 lbs and roughly 26 standard pallets.",
      },
      {
        q: "Do you offer drop trailer programs?",
        a: "Yes. We set up dedicated drop pools for high-volume shippers with predictable inbound or outbound lanes.",
      },
      {
        q: "Can you handle expedited dry van shipments?",
        a: "Yes — team drivers and same-day pickup are available 24/7 by calling 855-456-4424.",
      },
    ],
    keywords: ["dry van shipping", "53 foot dry van", "FTL dry van broker", "drop trailer program"],
  },
  {
    slug: "flatbed",
    name: "Flatbed Freight",
    short: "Steel, lumber, machinery & open-deck capacity.",
    blurb:
      "48' and 53' flatbed trailers with full tarping, strapping and chain capability for over-dimensional and industrial loads.",
    long: "When freight can't move under a roof, Earth Logistics ships it on an open deck. Our flatbed network covers standard flatbeds, step decks, stretch trailers and Conestoga curtain-side flats — fully tarped and strapped per FMCSA and shipper specs. We secure capacity for steel, lumber, construction materials, rooftop HVAC, industrial machinery and palletized building products.",
    image:
      "https://images.unsplash.com/photo-1591768793355-74d04bb6608f?auto=format&fit=crop&w=1600&q=80",
    category: "Specialized",
    capabilities: [
      "48' / 53' flatbed",
      "Step deck, stretch and double drop",
      "Conestoga curtain-side",
      "Steel-coil and tarping",
      "Permitted oversize coordination",
      "OD/OS-pilot car arrangement",
    ],
    industries: ["Construction", "Steel", "Building materials", "Industrial machinery", "Oil & gas"],
    faqs: [
      {
        q: "Do you provide tarps and straps?",
        a: "Yes — all flatbed loads include the appropriate tarping (4', 6' or full coil) and strapping at no surprise cost.",
      },
      {
        q: "Can you move oversize flatbed freight?",
        a: "Yes — we arrange permits, route surveys and pilot cars for over-dimensional flatbed shipments.",
      },
    ],
    keywords: ["flatbed trucking", "step deck shipping", "open deck broker", "steel coil flatbed"],
  },
  {
    slug: "refrigerated",
    name: "Refrigerated (Reefer)",
    short: "Temperature-controlled food, pharma & chemical freight.",
    blurb:
      "53' multi-temp reefer trailers with continuous tracking, temperature monitoring and FSMA-compliant carriers.",
    long: "Earth Logistics ships food, beverage, produce, pharma and temperature-sensitive chemicals in 53' refrigerated trailers ranging from frozen (-10°F) to climate-controlled (+70°F). All reefer carriers meet FSMA and Sanitary Transportation Rule requirements, and continuous temperature monitoring is available for high-value loads.",
    image:
      "https://images.unsplash.com/photo-1568661276869-4d4b2f0d6c0a?auto=format&fit=crop&w=1600&q=80",
    category: "Van",
    capabilities: [
      "Frozen, refrigerated and climate-controlled",
      "FSMA compliant carriers",
      "Pre-cool verification",
      "Multi-temp reefer trailers",
      "Pharma & food-grade",
      "Continuous temp tracking",
    ],
    industries: ["Food & beverage", "Produce", "Pharmaceutical", "Floral", "Specialty chemicals"],
    faqs: [
      {
        q: "What temperature ranges can you ship?",
        a: "From -10°F frozen through +70°F climate-controlled in single or multi-temp trailers.",
      },
      {
        q: "Is your reefer network FSMA compliant?",
        a: "Yes. We only book reefer freight with carriers documented under FSMA / Sanitary Transportation rules.",
      },
    ],
    keywords: ["refrigerated trucking", "reefer freight broker", "frozen food shipping", "FSMA reefer"],
  },
  {
    slug: "lowboy-heavy-haul",
    name: "Lowboy & Heavy Haul",
    short: "Permitted heavy, tall and oversize machinery moves.",
    blurb:
      "Lowboy, double-drop, RGN and multi-axle trailers for excavators, dozers, cranes, transformers and over-dimensional cargo.",
    long: "Heavy haul is where Earth Logistics shines. From 35-ton excavators to oilfield modules and wind components, we coordinate lowboy, removable-gooseneck (RGN), perimeter-frame, dual-lane and multi-axle moves — including permits, route surveys, pilot cars and superload coordination. Use our heavy-haul quote calculator on the quote page to size your move in minutes.",
    image:
      "https://images.unsplash.com/photo-1565024145557-a2f33dd0656d?auto=format&fit=crop&w=1600&q=80",
    category: "Heavy",
    capabilities: [
      "Lowboy / RGN trailers",
      "Multi-axle (8-13+ axle)",
      "Permitted oversize moves",
      "Route survey & pilot cars",
      "Crane coordination",
      "Wind & oilfield specialists",
    ],
    industries: ["Construction equipment", "Oil & gas", "Mining", "Wind energy", "Utility transformers"],
    faqs: [
      {
        q: "What is the max weight you can move?",
        a: "Standard lowboy handles ~40,000 lbs. With multi-axle and dual-lane setups we coordinate loads exceeding 200,000 lbs as superloads.",
      },
      {
        q: "Do you handle permits and pilot cars?",
        a: "Yes — fully turn-key. We obtain state-by-state permits, arrange pilot/escort vehicles and engineered route surveys.",
      },
    ],
    keywords: ["lowboy trucking", "heavy haul broker", "RGN trailer shipping", "oversize permit move"],
  },
  {
    slug: "car-hauler",
    name: "Car Hauler / Auto Transport",
    short: "Open and enclosed auto transport, single to fleet.",
    blurb:
      "Open carriers for daily auto moves; enclosed transport for exotic, classic and high-value vehicles.",
    long: "Earth Logistics handles single-unit auto transport, dealer-to-dealer multi-car runs and full enclosed transport for exotics and classics. Bonded, insured carriers with up to $250,000 cargo coverage on enclosed lanes. Door-to-door pickup, real-time updates, and a single point of contact through delivery.",
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1600&q=80",
    category: "Specialized",
    capabilities: [
      "Open 7-10 car carriers",
      "Enclosed exotic / classic",
      "Dealer-to-dealer moves",
      "Door-to-door pickup",
      "$250k cargo coverage available",
      "Inoperable vehicle handling",
    ],
    industries: ["Dealerships", "Auctions", "Manufacturers", "Private buyers", "Fleet leasing"],
    faqs: [
      {
        q: "Open vs enclosed — which should I choose?",
        a: "Open is faster and lower cost for daily drivers. Enclosed protects high-value, classic, lowered or restoration vehicles from weather and road debris.",
      },
      {
        q: "Do you transport inoperable vehicles?",
        a: "Yes — winch-equipped trailers are available; please note the condition when requesting your quote.",
      },
    ],
    keywords: ["car hauler service", "auto transport broker", "enclosed exotic transport", "dealer auto transport"],
  },
  {
    slug: "end-dump",
    name: "End Dump Trucking",
    short: "Aggregates, asphalt, sand & bulk side dump capacity.",
    blurb:
      "39'+ end dump and side dump trailers for aggregates, asphalt, demolition debris, sand and crushed stone.",
    long: "Earth Logistics' bulk division operates an active network of end dump and 39' heavy-bulk end dump trailers covering aggregates, asphalt, sand, gravel, soil and demolition debris. We coordinate sequencing for paving crews, mine haul, demolition cleanup and import/export bulk staging — with the dispatch responsiveness construction jobs demand.",
    image:
      "https://images.unsplash.com/photo-1596189181363-58dcae8a14a3?auto=format&fit=crop&w=1600&q=80",
    category: "Bulk",
    capabilities: [
      "39' heavy-bulk end dumps",
      "Side dumps",
      "Aggregate, asphalt & sand",
      "Paving crew sequencing",
      "Demolition debris",
      "Mine-to-mill bulk",
    ],
    industries: ["Construction", "Paving", "Mining", "Demolition", "Aggregates"],
    faqs: [
      {
        q: "Can you handle hot asphalt?",
        a: "Yes — insulated and tarp-equipped end dumps are dispatched specifically for hot mix and SMA loads.",
      },
      {
        q: "How fast can you deploy bulk capacity?",
        a: "Same-day in most construction markets, especially within 500 miles of the Midwest.",
      },
    ],
    keywords: ["end dump trucking", "39 foot end dump", "aggregate hauling", "asphalt trucking"],
  },
  {
    slug: "pneumatic-tanker",
    name: "Pneumatic Tanker",
    short: "Dry-bulk pneumatic capacity for powders & granules.",
    blurb:
      "Food-grade and industrial pneumatic tankers for cement, flour, sugar, plastic pellets, sand and chemical powders.",
    long: "Pneumatic transfer is its own specialty — and we book it daily. Earth Logistics dispatches food-grade and industrial pneumatic tankers (45'-50') for cement, fly ash, lime, sugar, flour, starch, plastic pellets, frac sand and dry chemicals. Carriers are vetted for blower equipment, wash-out compliance and unloading time windows.",
    image:
      "https://images.unsplash.com/photo-1565017228812-fd3cbe6b13e6?auto=format&fit=crop&w=1600&q=80",
    category: "Bulk",
    capabilities: [
      "Food-grade & industrial pneumatic",
      "Cement, fly ash, lime",
      "Sugar, flour, starch (food-grade)",
      "Plastic pellets",
      "Frac sand",
      "Dry chemicals",
    ],
    industries: ["Cement & concrete", "Food manufacturing", "Plastics", "Chemicals", "Oil & gas (frac)"],
    faqs: [
      {
        q: "Do you have food-grade pneumatic capacity?",
        a: "Yes — all food-grade pneumatic moves are routed only through carriers with documented wash records and food-grade tank certification.",
      },
      {
        q: "Can you load frac sand?",
        a: "Yes — frac sand pneumatic and bulk hopper bottom capacity is one of our specialties.",
      },
    ],
    keywords: ["pneumatic tanker", "dry bulk trucking", "cement hauling", "food grade pneumatic"],
  },
  {
    slug: "tanker",
    name: "Liquid Tanker",
    short: "Food-grade and chemical liquid bulk capacity.",
    blurb:
      "DOT-407, DOT-406 and food-grade stainless tankers for chemical, fuel, edible oil and bulk liquid freight.",
    long: "Earth Logistics dispatches DOT-407 chemical tankers, DOT-406 fuel tankers and stainless food-grade tankers for edible oil, sweetener, dairy, juice concentrate and bulk water. All hazardous tanker moves are dispatched only through hazmat-certified, placarded carriers compliant with 49 CFR.",
    image:
      "https://images.unsplash.com/photo-1601984776091-43fa12e2ce8e?auto=format&fit=crop&w=1600&q=80",
    category: "Bulk",
    capabilities: [
      "DOT-407 chemical tanker",
      "DOT-406 fuel tanker",
      "Food-grade stainless",
      "Insulated tanker",
      "Compartmented tankers",
      "Hazmat tanker (placarded)",
    ],
    industries: ["Chemical", "Petroleum", "Food & beverage", "Edible oils", "Industrial fluids"],
    faqs: [
      {
        q: "Are your tanker carriers hazmat-certified?",
        a: "Yes — every placardable load is dispatched only through carriers with current hazmat endorsements and 49 CFR compliance.",
      },
      {
        q: "Can you ship food-grade liquid?",
        a: "Yes — stainless food-grade tanker capacity is available with wash slip verification on every load.",
      },
    ],
    keywords: ["liquid tanker trucking", "DOT 407 tanker", "food grade tanker", "chemical tanker broker"],
  },
  {
    slug: "hopper-bottom",
    name: "Hopper Bottom (Grain)",
    short: "Grain, fertilizer and dry-bulk hopper bottom freight.",
    blurb:
      "Hopper bottom (grain trailer) capacity for corn, soybeans, wheat, fertilizer, salt and dry agricultural inputs.",
    long: "Earth Logistics moves grain, oilseeds, fertilizer, agricultural inputs and dry bulk in hopper bottom (grain) trailers. We operate during planting, harvest and shoulder seasons with elevator and feed-mill loading experience — including grain-grade origin documentation and pre-load tarp inspection.",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80",
    category: "Bulk",
    capabilities: [
      "Grain (corn, soy, wheat)",
      "Fertilizer & ag inputs",
      "Salt & soda ash",
      "Mine-to-mill dry bulk",
      "Elevator loading",
      "Tarped hopper",
    ],
    industries: ["Agriculture", "Grain & oilseed", "Fertilizer", "Feed milling", "Renewable fuels"],
    faqs: [
      {
        q: "Do you support harvest-season surge capacity?",
        a: "Yes — pre-book seasonal lanes and we'll commit dedicated hopper-bottom capacity 6-8 weeks ahead of harvest.",
      },
      {
        q: "Can you ship food-grade grain?",
        a: "Yes — wash-certified hopper bottoms are available for food-grade and identity-preserved grain.",
      },
    ],
    keywords: ["hopper bottom trucking", "grain trailer broker", "fertilizer hauling", "agricultural freight"],
  },
  {
    slug: "hazmat",
    name: "Hazardous Materials",
    short: "Placarded hazmat freight — all classes 1-9.",
    blurb:
      "Hazmat-certified carriers, placarded trailers, 49 CFR compliance and full hazmat manifest handling.",
    long: "Earth Logistics arranges hazardous material freight across all DOT hazard classes — including flammable liquids, corrosives, oxidizers and Class 9. Every hazmat load is dispatched only through carriers with current hazmat endorsements, valid placarding, current MCS-90 endorsements and 49 CFR compliance. Hazmat manifest and emergency response coordination is included.",
    image:
      "https://images.unsplash.com/photo-1593696954577-ab3d39317b97?auto=format&fit=crop&w=1600&q=80",
    category: "Hazmat",
    capabilities: [
      "All DOT hazard classes 1-9",
      "Hazmat tankers + dry vans",
      "Placarding & manifest",
      "MCS-90 endorsed carriers",
      "Emergency response coordination",
      "Limited quantity & bulk hazmat",
    ],
    industries: ["Chemical", "Oil & gas", "Industrial coatings", "Mining explosives", "Specialty manufacturing"],
    faqs: [
      {
        q: "Do you ship Class 1 explosives?",
        a: "Selectively — Class 1 requires named approval. Call dispatch at 855-456-4424 to discuss your origin / destination.",
      },
      {
        q: "How are emergency response contacts handled?",
        a: "We attach 24/7 ER contact numbers (Chemtrec or carrier-equivalent) to every hazmat BOL.",
      },
    ],
    keywords: ["hazmat trucking", "hazardous material broker", "placarded freight", "DOT hazmat shipping"],
  },
];
