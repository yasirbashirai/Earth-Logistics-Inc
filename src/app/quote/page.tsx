import PageHero from "@/components/PageHero";
import QuoteFormFull from "@/components/QuoteFormFull";
import TrustBar from "@/components/TrustBar";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Instant Freight Quote + Heavy-Haul Calculator",
  description:
    "Get an instant freight quote from Earth Logistics — or use our heavy-haul calculator to estimate permitted oversize moves in seconds.",
  path: "/quote",
});

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Instant Quote"
        title="Get a freight quote in under 60 seconds."
        subtitle="Standard freight or permitted heavy haul — submit your load details and we'll route it to the right capacity, fast."
        image="https://images.unsplash.com/photo-1492168732976-2676c584c675?auto=format&fit=crop&w=1800&q=80"
      />

      <TrustBar />

      <section className="section">
        <div className="container-page">
          <QuoteFormFull />
        </div>
      </section>
    </>
  );
}
