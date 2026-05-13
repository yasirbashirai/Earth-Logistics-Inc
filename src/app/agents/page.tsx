import PageHero from "@/components/PageHero";
import JoinForm from "@/components/JoinForms";
import SectionHeader from "@/components/SectionHeader";
import CtaStrip from "@/components/CtaStrip";
import TrustBar from "@/components/TrustBar";
import { Percent, ShieldCheck, Layers3, Cog, Users, Headphones } from "lucide-react";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Freight Agent Program — Earth Logistics Inc",
  description:
    "Become an Earth Logistics freight agent. Industry-leading commission splits, modal access across every equipment type, full back-office support.",
  path: "/agents",
});

const perks = [
  { icon: Percent, t: "Industry-leading splits", d: "Compensation structured for top-producing agents." },
  { icon: Layers3, t: "Every modal access", d: "Van, flat, reefer, lowboy, end dump, pneumatic, hopper, tanker, hazmat." },
  { icon: Cog, t: "Full TMS & tracking", d: "Modern TMS, real-time tracking, shipper portal access." },
  { icon: ShieldCheck, t: "Bonded & insured", d: "BMC-84 bond, $1.5M cargo, $1M+ contingent cargo coverage." },
  { icon: Users, t: "Back-office included", d: "Carrier onboarding, factoring, billing, collections handled by us." },
  { icon: Headphones, t: "Dedicated agent support", d: "Senior dispatch and ops team available 24/7." },
];

export default function AgentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Freight agent program"
        title="Build your freight book. We'll handle the back-office."
        subtitle="If you're capped on splits, restricted on modes, or stuck behind antiquated tech — our agent program was built for you."
        image="https://images.unsplash.com/photo-1645736315000-6f788915923b?auto=format&fit=crop&w=1800&q=80"
      />

      <TrustBar />

      <section className="section">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <SectionHeader eyebrow="The Earth Logistics agent advantage" title="A program designed by agents, for agents." />
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
              <h3 className="font-display font-extrabold text-2xl">Who we're looking for</h3>
              <ul className="mt-4 space-y-2 text-slate-200 text-sm">
                <li>• 3+ years freight industry experience</li>
                <li>• $1M+ annual book revenue (minimum)</li>
                <li>• Strong existing shipper relationships</li>
                <li>• Clean reputation — no chargebacks, no broker hopping</li>
                <li>• Hungry to scale without back-office friction</li>
              </ul>
              <p className="mt-4 text-sm text-blue-200">All conversations are 100% confidential — your current employer will never hear from us.</p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <JoinForm variant="agent" />
          </div>
        </div>
      </section>

      <CtaStrip
        title="Ready to scale your book?"
        subtitle="Apply confidentially or call 855-456-4424 for a private conversation."
      />
    </>
  );
}
