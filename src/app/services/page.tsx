import PageHero from "@/components/PageHero";
import ServiceCard from "@/components/ServiceCard";
import SectionHeader from "@/components/SectionHeader";
import CtaStrip from "@/components/CtaStrip";
import TrustBar from "@/components/TrustBar";
import { services } from "@/data/services";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Freight Services — Dry Van, Flatbed, Reefer, Heavy Haul, Bulk & Hazmat",
  description:
    "Earth Logistics Inc dispatches every major freight equipment type — dry van, flatbed, refrigerated, lowboy heavy haul, end dump, pneumatic tanker, hopper bottom, tanker, hazmat and auto transport.",
  path: "/services",
});

export default function ServicesHubPage() {
  const grouped = services.reduce<Record<string, typeof services>>((acc, s) => {
    acc[s.category] = acc[s.category] || [];
    acc[s.category].push(s);
    return acc;
  }, {});

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Full-service freight brokerage across every major equipment type."
        subtitle="From standard 53' dry van to 13-axle superloads — Earth Logistics dispatches the right trailer, the right driver and the right insurance for your freight."
        image="https://images.unsplash.com/photo-1720811559371-7b0ebd219127?auto=format&fit=crop&w=1800&q=80"
        cta1={{ label: "Get Instant Quote", href: "/quote" }}
        cta2={{ label: "Talk to Dispatch", href: "tel:18554564424" }}
      />

      <TrustBar />

      {Object.entries(grouped).map(([cat, list]) => (
        <section key={cat} className="section">
          <div className="container-page">
            <SectionHeader
              eyebrow={cat}
              title={
                cat === "Van" ? "Van & Refrigerated Capacity" :
                cat === "Specialized" ? "Specialized & Open-Deck" :
                cat === "Bulk" ? "Bulk Side — Dry & Liquid" :
                cat === "Heavy" ? "Heavy Haul & Permitted Moves" :
                "Hazardous Materials"
              }
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {list.map((s) => <ServiceCard key={s.slug} s={s} />)}
            </div>
          </div>
        </section>
      ))}

      <CtaStrip
        title="Not sure which trailer fits your freight?"
        subtitle="Call our 24/7 dispatch team — we'll size it up in under five minutes."
      />
    </>
  );
}
