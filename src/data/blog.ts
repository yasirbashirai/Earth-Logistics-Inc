export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-choose-a-freight-broker-2026",
    title: "How to Choose a Freight Broker in 2026 (Without Getting Burned)",
    excerpt:
      "Most freight brokers look identical on a Google search. Here's the 7-point checklist asset-based shippers actually use.",
    body: [
      "If you've ever waited on a load that 'fell through' because your broker double-booked the carrier, you already know: brokers aren't commodities. Here's how serious shippers evaluate brokers in 2026.",
      "**1. Asset-based vs pure broker.** Asset-based brokers (like Earth Logistics) have skin in the game — they understand carrier operations because they've operated trucks themselves. Pure brokers play arbitrage.",
      "**2. FMCSA standing and bonding.** Check the broker's MC number on FMCSA's SAFER website. Look for the BMC-84 surety bond, current operating authority, and zero major out-of-service flags.",
      "**3. Carrier vetting process.** Ask: what's your carrier onboarding checklist? You should hear MCS-90 verification, current insurance certificates, FMCSA safety scores, and a carrier-monitoring service like Highway, RMIS or MyCarrierPortal.",
      "**4. Modal coverage.** A broker who can only book dry van is a broker who'll struggle when your load needs flatbed, reefer, or hazmat. Earth Logistics dispatches every major equipment type in-house.",
      "**5. Transparent pricing.** Look for a broker who walks you through the rate breakdown — line haul, fuel, accessorials, detention. Hidden markups are the #1 source of broker disputes.",
      "**6. Response time.** Call the dispatch line at 2am. If no one answers, that's your answer. Earth Logistics operates 24/7/365 at 855-456-4424.",
      "**7. Industry references.** Ask for three references in your industry — not the broker's industry. A broker who excels in dry van retail may be brand new to flatbed steel.",
      "**Bottom line:** Don't pick a broker — pick an operations partner. The right broker disappears into the background of your day. The wrong one becomes your second job.",
    ],
    author: "AJ Smith",
    date: "2026-04-22",
    readTime: "6 min read",
    category: "Shipper Tips",
    image:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d3?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "heavy-haul-permitting-guide",
    title: "Heavy Haul Permitting: A Plain-English Guide for Shippers",
    excerpt:
      "Oversize moves are 80% paperwork. Here's what a turn-key heavy haul broker actually handles for you.",
    body: [
      "Heavy haul looks simple from the outside: a big trailer, a big load, a big mileage check. In reality, moving a 95-foot loaded lowboy from Indiana to Texas is a 4-state administrative ballet involving permits, route surveys, escorts, time-of-day restrictions, and superload sign-offs.",
      "**Step 1 — Dimensions and weight.** We need the loaded dimensions: length, width, height, total weight, axle weights and overhangs. These determine which states classify the move as oversize, overweight, or superload.",
      "**Step 2 — Route survey.** A heavy-haul-experienced broker will pre-survey the route for low bridges, weight-restricted overpasses, sharp turns, and active construction. We use professional route survey software combined with state DOT corridor data.",
      "**Step 3 — Permits.** Each state issues its own permit. They cost $20-$400 each and take anywhere from 30 minutes to 5 business days depending on the state and size.",
      "**Step 4 — Pilot / escort cars.** Most states require a front pilot for loads over 12' wide and rear pilots over 14'+. Police escorts may be required above certain thresholds.",
      "**Step 5 — Day & time restrictions.** Many states restrict oversize travel to daylight hours, weekdays only, and prohibit movement on holiday weekends.",
      "**Step 6 — Superload coordination.** Loads classified as superload require engineering certifications and may require utility coordination if line-clearance is tight.",
      "**Your job as the shipper:** Provide accurate dimensions and a flexible pickup window. Our job: everything else. Call 855-456-4424 or use the heavy-haul calculator on our quote page to start your move.",
    ],
    author: "AJ Smith",
    date: "2026-03-14",
    readTime: "8 min read",
    category: "Heavy Haul",
    image:
      "https://images.unsplash.com/photo-1593696954577-ab3d39317b97?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "becoming-a-freight-agent-with-earth-logistics",
    title: "Becoming a Freight Agent with Earth Logistics: What to Expect",
    excerpt:
      "Top-tier commission splits, backend support, and the tools to grow a freight book — here's our agent program explained.",
    body: [
      "If you've been brokering loads at another house but feel capped by 60/40 splits and limited modal coverage, our freight agent program might be a fit. Here's the honest breakdown.",
      "**Commission structure.** Earth Logistics offers among the most competitive splits in the industry. Specifics depend on volume and book quality — let's discuss on a call.",
      "**Modal access.** Our agents book every major equipment type — dry van, flatbed, reefer, lowboy, end dump, pneumatic, hopper bottom, hazmat. No more turning down opportunities because your house doesn't dispatch that trailer.",
      "**Operations backbone.** Earth Logistics handles the carrier onboarding, MCS-90 verification, factoring relationships, dispatch coverage and back-office. You focus on what you're best at — building shipper relationships.",
      "**TMS and tracking.** Full TMS access, real-time load tracking and shipper-portal visibility on every move.",
      "**Carrier insurance and bonding.** Our $1.5M cargo coverage program and bonded carriers protect every load — and protect your reputation.",
      "**Who fits.** Experienced agents with $1M+ annual revenue, strong shipper books, clean ethical reputation, and at least 3 years freight industry experience.",
      "**How to apply.** Submit our freight agent application or call 855-456-4424. Initial qualification call is 30 minutes; if it's a fit, we have you onboarded inside 7 business days.",
    ],
    author: "AJ Smith",
    date: "2026-02-08",
    readTime: "5 min read",
    category: "Agent Program",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80",
  },
];
