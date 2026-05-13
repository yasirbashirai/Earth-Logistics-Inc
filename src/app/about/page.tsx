import Image from "next/image";
import PageHero from "@/components/PageHero";
import StatsRow from "@/components/StatsRow";
import CtaStrip from "@/components/CtaStrip";
import SectionHeader from "@/components/SectionHeader";
import { ShieldCheck, HeartHandshake, Compass, GaugeCircle, Award, MapPin } from "lucide-react";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About Earth Logistics Inc — Asset-Based Freight Broker in Indiana",
  description:
    "Earth Logistics Inc is a DOT-authorized asset-based freight broker headquartered in Saint John, Indiana. Learn about our mission, leadership and 24/7 operations.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="An asset-based partner — not just another freight broker."
        subtitle="Headquartered in Saint John, Indiana. Dispatching freight 24 hours a day, 7 days a week — for shippers who refuse to gamble on capacity."
        image="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1800&q=80"
        cta1={{ label: "Get a Quote", href: "/quote" }}
        cta2={{ label: "Contact Us", href: "/contact" }}
      />

      <section className="section">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <span className="eyebrow">Who we are</span>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl mt-2 text-brand-900 leading-tight">
              Built by operators. <br /> Run by professionals.
            </h2>
            <div className="mt-6 space-y-5 text-slate-700 leading-relaxed">
              <p>
                Earth Logistics Inc was founded on a simple principle: shippers deserve a broker who understands trucking from the inside out. We're not a call center marking up loads — we're a hands-on freight operations company that started moving trucks before we ever quoted a load.
              </p>
              <p>
                Today, Earth Logistics dispatches every major equipment type in the US — dry van, flatbed, reefer, lowboy, end dump, pneumatic tanker, food-grade tanker, hopper bottom, hazmat and specialty hauls — from our 24/7 operations center in Saint John, Indiana.
              </p>
              <p>
                We're DOT-authorized, FMCSA-registered, BMC-84 bonded and TIA-aligned. Our carrier network of 25,000+ pre-vetted, MCS-90-endorsed motor carriers gives our shippers the capacity of a national 3PL with the responsiveness of a regional broker.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { icon: ShieldCheck, t: "DOT-Authorized & Bonded", d: "FMCSA registered, BMC-84 surety bond, $1.5M cargo coverage." },
                { icon: HeartHandshake, t: "Operator-Owned", d: "Our leadership runs ops, not Excel — we know how trucks make money." },
                { icon: Compass, t: "48-State Coverage", d: "Coast-to-coast capacity with dense Midwest, Texas and Southeast lanes." },
                { icon: GaugeCircle, t: "98.6% On-Time", d: "Performance you can plan a production schedule around." },
              ].map((b) => (
                <div key={b.t} className="flex gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-lg brand-gradient text-white flex items-center justify-center">
                    <b.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-slate-900">{b.t}</div>
                    <div className="text-sm text-slate-600">{b.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1559717207-049db4eb1c7e?auto=format&fit=crop&w=1200&q=80"
                alt="Earth Logistics dispatch operations"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container-page">
          <SectionHeader eyebrow="By the numbers" title="The Earth Logistics operating record." center />
          <div className="mt-10"><StatsRow /></div>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
            <Image src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=80" alt="Freight operations" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
          <div>
            <span className="eyebrow">Mission</span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl mt-2 text-brand-900">
              To make freight as predictable as the businesses that depend on it.
            </h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Manufacturers, builders, growers, retailers — everyone we serve runs on schedules tighter than ours. Our job is to remove freight from their list of things that go wrong. We do that with vetted carriers, 24/7 dispatch, transparent pricing, and the operator-grade reliability that built our reputation.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="tel:18554564424" className="btn-primary">Talk to Dispatch</a>
              <a href="/contact" className="btn-outline">Get in Touch</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-brand-900 text-white">
        <div className="container-page">
          <SectionHeader light eyebrow="Credentials" title="A foundation of compliance and trust." />
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {["DOT Authorized","FMCSA Registered","BMC-84 Bonded","TIA Aligned","MCS-90 Network","$1.5M Cargo"].map((c) => (
              <div key={c} className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
                <Award className="w-7 h-7 mx-auto text-brand-300" />
                <div className="mt-3 font-display font-bold text-sm">{c}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page text-center">
          <SectionHeader eyebrow="Headquarters" title="Saint John, Indiana." center />
          <div className="mt-6 inline-flex items-center gap-2 text-slate-700 text-lg">
            <MapPin className="w-5 h-5 text-brand-600" />
            9401 Iris St, Saint John, IN 46373
          </div>
          <p className="mt-3 text-slate-500 max-w-xl mx-auto">
            Strategically located at the Indiana-Illinois-Michigan freight corridor — within reach of Chicago rail, Indianapolis distribution and Detroit manufacturing.
          </p>
        </div>
      </section>

      <CtaStrip />
    </>
  );
}
