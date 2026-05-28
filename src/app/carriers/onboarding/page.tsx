import PageHero from "@/components/PageHero";
import CarrierOnboarding from "@/components/CarrierOnboarding";
import { pageMeta } from "@/lib/seo";
import { ShieldCheck, FileSignature, Truck } from "lucide-react";

export const metadata = pageMeta({
  title: "Carrier Onboarding — New Carrier Set-up & Broker Agreement",
  description:
    "Complete your Earth Logistics carrier onboarding online. Fill the New Carrier Set-up form and electronically sign the Approved Broker/Carrier Agreement in under 5 minutes.",
  path: "/carriers/onboarding",
  keywords: [
    "carrier onboarding",
    "new carrier set up form",
    "broker carrier agreement",
    "freight broker carrier signup",
    "Earth Logistics carrier",
    "carrier packet online",
  ],
});

export default function CarrierOnboardingPage() {
  return (
    <>
      <PageHero
        eyebrow="Carrier onboarding"
        title="New Carrier Set-up & Broker Agreement"
        subtitle="One online packet — set-up form, agreement and e-signature. 48-hour activation."
        image="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1800&q=80"
      />

      {/* Three-step intro strip */}
      <section className="border-b border-slate-200 bg-white">
        <div className="container-page py-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { icon: Truck, t: "1. Set-up form", d: "Carrier identity, contacts, equipment." },
            { icon: FileSignature, t: "2. Sign the agreement", d: "Read & e-sign the Broker/Carrier Agreement." },
            { icon: ShieldCheck, t: "3. 48-hour activation", d: "We verify MC, DOT, COI & W-9 — then dispatch your first load." },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="flex items-start gap-4">
              <div className="shrink-0 w-11 h-11 rounded-xl brand-gradient text-white flex items-center justify-center shadow-md">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-display font-extrabold text-brand-900">{t}</div>
                <div className="text-sm text-slate-600 mt-0.5">{d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-slate-50/50">
        <div className="container-page max-w-4xl">
          <CarrierOnboarding />
        </div>
      </section>
    </>
  );
}
