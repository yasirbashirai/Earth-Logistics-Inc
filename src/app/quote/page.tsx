import PageHero from "@/components/PageHero";
import QuoteFormFull from "@/components/QuoteFormFull";
import TrustBar from "@/components/TrustBar";
import StatsRow from "@/components/StatsRow";
import { Clock, ShieldCheck, FileCheck2, BadgeCheck } from "lucide-react";
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
        image="https://images.unsplash.com/photo-1601584115197-04ecc0da31d3?auto=format&fit=crop&w=1800&q=80"
      />

      <TrustBar />

      <section className="section">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8">
            <QuoteFormFull />
          </div>

          <aside className="lg:col-span-4 space-y-6">
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6">
              <h3 className="font-display font-extrabold text-xl text-brand-900">Why Earth Logistics</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                <li className="flex gap-2"><Clock className="w-4 h-4 mt-0.5 text-brand-600"/> 30-minute quote turnaround, 24/7.</li>
                <li className="flex gap-2"><ShieldCheck className="w-4 h-4 mt-0.5 text-brand-600"/> $1.5M cargo coverage on every load.</li>
                <li className="flex gap-2"><FileCheck2 className="w-4 h-4 mt-0.5 text-brand-600"/> MCS-90 verified, MyCarrierPortal monitored.</li>
                <li className="flex gap-2"><BadgeCheck className="w-4 h-4 mt-0.5 text-brand-600"/> Itemized pricing — line haul, fuel, accessorials, no surprises.</li>
              </ul>
            </div>
            <div className="rounded-2xl brand-gradient text-white p-6">
              <div className="text-xs uppercase tracking-widest text-blue-200">Need to speak with dispatch</div>
              <a href="tel:18554564424" className="block mt-2 font-display font-extrabold text-3xl">855-456-4424</a>
              <div className="text-sm text-blue-100 mt-1">24 hours a day, 7 days a week.</div>
            </div>
            <StatsRow />
          </aside>
        </div>
      </section>
    </>
  );
}
