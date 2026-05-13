import PageHero from "@/components/PageHero";
import JoinForm from "@/components/JoinForms";
import SectionHeader from "@/components/SectionHeader";
import CtaStrip from "@/components/CtaStrip";
import TrustBar from "@/components/TrustBar";
import { GaugeCircle, ShieldCheck, FileCheck2, Truck, Eye, Headphones } from "lucide-react";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Shipper Setup — Earth Logistics Inc",
  description:
    "Become an Earth Logistics shipper. Dedicated capacity, transparent pricing, real-time tracking. Setup in under 24 hours.",
  path: "/shippers",
});

const perks = [
  { icon: GaugeCircle, t: "98.6% on-time delivery", d: "Performance you can plan around." },
  { icon: ShieldCheck, t: "$1.5M cargo coverage", d: "On every load — no exclusions on commodity class." },
  { icon: FileCheck2, t: "Transparent pricing", d: "Itemized line haul, fuel, accessorials — no hidden margins." },
  { icon: Truck, t: "Every equipment type", d: "From 53' dry van to 13-axle superloads." },
  { icon: Eye, t: "Real-time visibility", d: "Live GPS, milestone notifications, direct driver contact." },
  { icon: Headphones, t: "Single point of contact", d: "Dedicated freight ops manager — same person on every call." },
];

export default function ShippersPage() {
  return (
    <>
      <PageHero
        eyebrow="Shipper setup"
        title="Reliable capacity. Transparent pricing. Real partnership."
        subtitle="Stop losing sleep over carrier no-shows and surprise accessorials. Earth Logistics builds you a capacity plan that holds — month after month."
        image="https://images.unsplash.com/photo-1605559911160-a3d95d213904?auto=format&fit=crop&w=1800&q=80"
      />

      <TrustBar />

      <section className="section">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <SectionHeader eyebrow="Why shippers choose us" title="The freight partner your supply chain deserves." />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {perks.map((p) => (
                <div key={p.t} className="flex gap-3 card">
                  <div className="shrink-0 w-10 h-10 rounded-lg brand-gradient text-white flex items-center justify-center">
                    <p.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-slate-900">{p.t}</div>
                    <div className="text-sm text-slate-600">{p.d}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl bg-slate-50 border border-slate-200 p-8">
              <h3 className="font-display font-extrabold text-2xl text-brand-900">What setup looks like</h3>
              <ol className="mt-4 space-y-3 text-slate-700 text-sm">
                <li><strong>1. Discovery call (30 min):</strong> Lanes, equipment, volume, accessorial requirements.</li>
                <li><strong>2. Custom capacity plan:</strong> We map your lanes to our carrier network and identify backup capacity.</li>
                <li><strong>3. Credit & paperwork:</strong> Mutual NDAs, credit application, signed shipper-broker agreement.</li>
                <li><strong>4. First load tendered:</strong> Live within 24 hours of paperwork closeout.</li>
              </ol>
            </div>
          </div>

          <div className="lg:col-span-5">
            <JoinForm variant="shipper" />
          </div>
        </div>
      </section>

      <CtaStrip
        title="Tell us about your freight."
        subtitle="We'll build you a capacity plan in 24 hours or less."
      />
    </>
  );
}
