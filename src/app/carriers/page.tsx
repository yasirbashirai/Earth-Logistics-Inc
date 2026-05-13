import PageHero from "@/components/PageHero";
import JoinForm from "@/components/JoinForms";
import SectionHeader from "@/components/SectionHeader";
import CtaStrip from "@/components/CtaStrip";
import TrustBar from "@/components/TrustBar";
import { DollarSign, Clock, Award, Headphones, FileCheck2, Truck } from "lucide-react";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Carrier Join — Run with Earth Logistics Inc",
  description:
    "Join the Earth Logistics carrier network. Quick pay, factoring-friendly, 24/7 dispatch, $1.5M cargo coverage. Apply in 5 minutes.",
  path: "/carriers",
});

const perks = [
  { icon: DollarSign, t: "Top market rates", d: "Premium-paying lanes across dry van, flatbed, reefer, lowboy and bulk." },
  { icon: Clock, t: "Quick pay", d: "24-48 hr quick pay available — factoring partners welcome." },
  { icon: Headphones, t: "24/7 live dispatch", d: "Real people on the phone — no after-hours voicemail." },
  { icon: FileCheck2, t: "Fast onboarding", d: "MCS-90 verification, COI matching, 48-hour activation." },
  { icon: Truck, t: "Year-round freight", d: "Steady volume from manufacturing, construction, ag and energy shippers." },
  { icon: Award, t: "No forced dispatch", d: "Take loads you want — never get penalized for a polite decline." },
];

export default function CarriersPage() {
  return (
    <>
      <PageHero
        eyebrow="Carrier program"
        title="Run with a brokerage that respects drivers."
        subtitle="Top-paying lanes. 24/7 dispatch. Quick pay. No forced dispatch. Apply in 5 minutes — onboarded in 48 hours."
        image="https://images.unsplash.com/photo-1559717207-049db4eb1c7e?auto=format&fit=crop&w=1800&q=80"
      />

      <TrustBar />

      <section className="section">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <SectionHeader eyebrow="Why carriers run with us" title="The carrier program operators actually want." />
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

            <div className="mt-10 rounded-2xl bg-brand-900 text-white p-8">
              <h3 className="font-display font-extrabold text-2xl">What you'll need to onboard</h3>
              <ul className="mt-4 space-y-2 text-slate-200 text-sm">
                <li>• Active MC and DOT numbers</li>
                <li>• $1M+ liability & $100k+ cargo insurance (COI required)</li>
                <li>• Clean FMCSA safety rating</li>
                <li>• Signed broker-carrier agreement & W-9</li>
                <li>• Factoring NOA (if applicable)</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5">
            <JoinForm variant="carrier" />
          </div>
        </div>
      </section>

      <CtaStrip
        title="Ready to run with Earth Logistics?"
        subtitle="Submit your carrier packet now or call dispatch at 855-456-4424 — we'll get you on the road."
      />
    </>
  );
}
