import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, Truck, Clock, ShieldCheck, MapPin, Star, BadgeCheck, Sparkles, Building2, Factory, Tractor, Apple, Fuel, Car, ShoppingBag, FlaskConical } from "lucide-react";
import QuoteFormCompact from "@/components/QuoteFormCompact";
import StatsRow from "@/components/StatsRow";
import TrustBar from "@/components/TrustBar";
import CtaStrip from "@/components/CtaStrip";
import ServiceCard from "@/components/ServiceCard";
import SectionHeader from "@/components/SectionHeader";
import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { company } from "@/data/company";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Earth Logistics Inc | Asset-Based Freight Broker — Revolving Freight Globally 24/7",
  description:
    "Asset-based DOT-authorized freight broker in Saint John, Indiana. Instant quotes for dry van, flatbed, reefer, lowboy, end dump, pneumatic tanker, hazmat & more. 25,000+ vetted carriers, 24/7 dispatch.",
  path: "/",
});

const industryIcons = [
  { icon: Factory, label: "Manufacturing", href: "/industries#manufacturing" },
  { icon: Building2, label: "Construction", href: "/industries#construction" },
  { icon: Tractor, label: "Agriculture", href: "/industries#agriculture" },
  { icon: Apple, label: "Food & Bev", href: "/industries#food-and-beverage" },
  { icon: Fuel, label: "Energy", href: "/industries#energy-oil-gas" },
  { icon: Car, label: "Automotive", href: "/industries#automotive" },
  { icon: ShoppingBag, label: "Retail / Ecom", href: "/industries#retail-and-ecommerce" },
  { icon: FlaskConical, label: "Chemical", href: "/industries#chemical-industrial" },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d3?auto=format&fit=crop&w=2000&q=80"
            alt="American freight truck on highway"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>

        <div className="container-page py-20 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center text-white">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-blue-100 text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" /> DOT-Authorized • FMCSA Registered • 24/7 Operations
            </span>
            <h1 className="font-display font-extrabold text-4xl md:text-6xl lg:text-7xl leading-[1.05] mt-4">
              Freight that <span className="text-[--color-brand-300]">moves</span><br /> on your schedule.
            </h1>
            <p className="mt-5 text-lg md:text-xl text-slate-100/90 max-w-xl">
              Asset-based freight brokerage trusted by manufacturers, builders and shippers nationwide. Dry van, flatbed, reefer, heavy haul, bulk, hazmat — dispatched in minutes, 24/7.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/quote" className="btn-primary">
                Get Instant Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <a href={company.phoneHref} className="btn-ghost-on-dark">
                <Phone className="w-4 h-4" /> {company.phone}
              </a>
            </div>
            <div className="mt-10">
              <StatsRow onDark />
            </div>
          </div>

          <div className="lg:col-span-5">
            <QuoteFormCompact />
          </div>
        </div>
      </section>

      <TrustBar />

      {/* WHY EARTH LOGISTICS */}
      <section className="section">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6">
              <span className="eyebrow">Why Earth Logistics</span>
              <h2 className="font-display font-extrabold text-3xl md:text-5xl mt-2 text-[--color-brand-900] leading-tight">
                Asset-based discipline.<br />Broker-grade reach.
              </h2>
              <p className="mt-4 text-slate-600 text-lg">
                We're not a transactional broker — we're an operations partner. Backed by a vetted network of 25,000+ carriers and a 24/7 dispatch team based in Saint John, Indiana, we move every major equipment type in the United States.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Clock, t: "30-min quote turnaround", d: "Live dispatch round the clock — no after-hours voicemail." },
                  { icon: ShieldCheck, t: "Vetted, insured carriers", d: "MCS-90 verified, MyCarrierPortal monitored, $1.5M cargo coverage." },
                  { icon: Truck, t: "Every trailer type", d: "Dry van, flatbed, reefer, lowboy, end dump, pneumatic, hopper, hazmat." },
                  { icon: BadgeCheck, t: "Transparent pricing", d: "Line haul, fuel, accessorials — itemized on every quote." },
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

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/about" className="btn-outline">About Earth Logistics</Link>
                <Link href="/coverage" className="btn-outline">View Coverage Map</Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=80"
                  alt="Freight truck at distribution center"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-4 mt-5">
                <Image src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d3?auto=format&fit=crop&w=400&q=70" alt="" width={400} height={280} className="rounded-xl aspect-[4/3] object-cover w-full h-auto"/>
                <Image src="https://images.unsplash.com/photo-1591768793355-74d04bb6608f?auto=format&fit=crop&w=400&q=70" alt="" width={400} height={280} className="rounded-xl aspect-[4/3] object-cover w-full h-auto"/>
                <Image src="https://images.unsplash.com/photo-1568661276869-4d4b2f0d6c0a?auto=format&fit=crop&w=400&q=70" alt="" width={400} height={280} className="rounded-xl aspect-[4/3] object-cover w-full h-auto"/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section bg-slate-50">
        <div className="container-page">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <SectionHeader
              eyebrow="Our Services"
              title="Every trailer type. One operations partner."
              subtitle="From 53' dry van to 13-axle lowboy, food-grade tanker to frac-sand pneumatic — Earth Logistics dispatches every major equipment type, 24/7."
            />
            <Link href="/services" className="btn-outline">View all services <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {services.slice(0, 6).map((s) => <ServiceCard key={s.slug} s={s} />)}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section">
        <div className="container-page">
          <SectionHeader
            eyebrow="How it works"
            title="From quote to delivery in 4 steps."
            subtitle="A frictionless shipper experience — engineered for speed."
            center
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { n: "01", t: "Request a quote", d: "Submit your load online or call dispatch. We respond in 30 minutes or less." },
              { n: "02", t: "Match to carrier", d: "We source from 25,000+ MCS-90 vetted carriers in our private network." },
              { n: "03", t: "Real-time tracking", d: "Live GPS visibility, milestone updates and direct driver communication." },
              { n: "04", t: "Proof of delivery", d: "Signed BOL, photo POD, invoicing and detailed accessorial breakdown." },
            ].map((step) => (
              <div key={step.n} className="card">
                <div className="font-display text-5xl font-extrabold brand-gradient-text">{step.n}</div>
                <h3 className="mt-3 font-display font-bold text-slate-900 text-xl">{step.t}</h3>
                <p className="mt-2 text-sm text-slate-600">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="section bg-[--color-brand-900] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-grid-light pointer-events-none" />
        <div className="container-page relative">
          <SectionHeader
            light
            eyebrow="Industries we serve"
            title="Built for the operators who keep America moving."
            subtitle="From paving crews to pharma — we move freight every industry depends on."
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
            {industryIcons.map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                className="bg-white/5 border border-white/10 hover:border-[--color-brand-400] hover:bg-white/10 rounded-xl p-6 text-center transition group"
              >
                <Icon className="w-9 h-9 mx-auto text-[--color-brand-300] group-hover:scale-110 transition" />
                <div className="mt-3 font-display font-semibold">{label}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN US — 3 PATHS */}
      <section className="section">
        <div className="container-page">
          <SectionHeader
            eyebrow="Join the network"
            title="Three ways to grow with Earth Logistics."
            subtitle="Whether you're shipping freight, hauling it, or brokering it — we have a program for you."
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              {
                title: "I'm a Shipper",
                desc: "Move freight reliably with dedicated capacity and transparent pricing.",
                href: "/shippers",
                accent: "Request setup",
              },
              {
                title: "I'm a Carrier",
                desc: "Run high-paying lanes with quick pay, factoring support and 24/7 dispatch.",
                href: "/carriers",
                accent: "Become a carrier",
              },
              {
                title: "I'm a Freight Agent",
                desc: "Industry-leading commission splits, modal access and full back-office support.",
                href: "/agents",
                accent: "Apply as agent",
              },
            ].map((p) => (
              <Link
                key={p.title}
                href={p.href}
                className="group rounded-3xl p-8 border border-slate-200 bg-white hover:border-[--color-brand-300] hover:shadow-2xl hover:-translate-y-1 transition"
              >
                <h3 className="font-display text-2xl font-extrabold text-[--color-brand-900]">{p.title}</h3>
                <p className="mt-3 text-slate-600">{p.desc}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-semibold text-[--color-brand-700] group-hover:gap-3 transition-all">
                  {p.accent} <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section bg-slate-50">
        <div className="container-page">
          <SectionHeader
            eyebrow="Trusted by US shippers"
            title="What our shippers say"
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {testimonials.slice(0, 6).map((t) => (
              <div key={t.name} className="card">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="mt-3 text-slate-700 leading-relaxed">"{t.body}"</p>
                <div className="mt-5 pt-5 border-t border-slate-200">
                  <div className="font-display font-bold text-slate-900">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role}, {t.company}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/reviews" className="btn-outline">Read all reviews <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      <CtaStrip />
    </>
  );
}
