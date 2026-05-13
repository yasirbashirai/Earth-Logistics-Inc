import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Phone,
  Truck,
  Clock,
  ShieldCheck,
  Star,
  BadgeCheck,
  Sparkles,
  Building2,
  Factory,
  Tractor,
  Apple,
  Fuel,
  Car,
  ShoppingBag,
  FlaskConical,
  ChevronRight,
  PlayCircle,
  MapPin,
  Briefcase,
} from "lucide-react";
import QuoteFormCompact from "@/components/QuoteFormCompact";
import StatsRow from "@/components/StatsRow";
import TrustBar from "@/components/TrustBar";
import CtaStrip from "@/components/CtaStrip";
import SectionHeader from "@/components/SectionHeader";
import LaneTicker from "@/components/LaneTicker";
import EquipmentShowcase from "@/components/EquipmentShowcase";
import FaqAccordion from "@/components/FaqAccordion";
import PartnerLogos from "@/components/PartnerLogos";
import { testimonials } from "@/data/testimonials";
import { company } from "@/data/company";
import { regions } from "@/data/coverage";
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
  { icon: Apple, label: "Food & Beverage", href: "/industries#food-and-beverage" },
  { icon: Fuel, label: "Energy / Oil & Gas", href: "/industries#energy-oil-gas" },
  { icon: Car, label: "Automotive", href: "/industries#automotive" },
  { icon: ShoppingBag, label: "Retail / Ecom", href: "/industries#retail-and-ecommerce" },
  { icon: FlaskConical, label: "Chemical", href: "/industries#chemical-industrial" },
];

const homeFaqs = [
  {
    q: "How fast can Earth Logistics quote a load?",
    a: "Under 30 minutes for standard freight, and you can use our heavy-haul calculator on the quote page for an immediate indicative estimate on permitted oversize moves.",
  },
  {
    q: "What equipment types do you dispatch?",
    a: "Dry van, flatbed, refrigerated, lowboy/heavy-haul (RGN, multi-axle), end dump, pneumatic tanker, food-grade and chemical liquid tanker, hopper bottom, car hauler, and hazmat across all DOT classes 1–9.",
  },
  {
    q: "Are you DOT-authorized and bonded?",
    a: "Yes. Earth Logistics is DOT-authorized, FMCSA-registered, BMC-84 bonded, and our carrier network is MCS-90 endorsed with $1.5M cargo coverage.",
  },
  {
    q: "Do you operate after hours and on weekends?",
    a: "Always. Our dispatch operates 24/7/365 from Saint John, Indiana. Call 855-456-4424 any hour — a real person answers.",
  },
  {
    q: "Can you handle oversize / superload permits?",
    a: "Yes — we coordinate state-by-state permits, route surveys, pilot cars and superload sign-offs as a turn-key service.",
  },
  {
    q: "How do I become a carrier / shipper / freight agent?",
    a: "Use the Join Us menu — we have a dedicated application for carriers, shippers and freight agents. Most onboardings are completed within 48 hours.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ============ HERO ============ */}
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

        <div className="container-page pt-14 md:pt-20 pb-16 md:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center text-white">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 bg-white/12 border border-white/25 text-blue-100 text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" /> DOT-Authorized • FMCSA Registered • 24/7 Operations
            </span>
            <h1 className="font-display font-extrabold text-4xl md:text-6xl lg:text-7xl leading-[1.02] mt-5 tracking-tight">
              Freight that <span className="text-brand-300">moves</span> <br className="hidden sm:block"/> on your schedule.
            </h1>
            <p className="mt-5 text-lg md:text-xl text-blue-50/95 max-w-xl">
              Asset-based freight brokerage trusted by manufacturers, builders and shippers nationwide. Dry van, flatbed, reefer, heavy haul, bulk, hazmat — dispatched in minutes, 24/7.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/quote" className="btn-primary shine-on-hover">
                Get Instant Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <a href={company.phoneHref} className="btn-ghost-on-dark">
                <Phone className="w-4 h-4" /> {company.phone}
              </a>
            </div>

            {/* Floating mini-badges */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-soft"/> Live dispatch active</div>
              <div className="flex items-center gap-2"><Star className="w-4 h-4 text-amber-400 fill-current"/> 5.0 rating from US shippers</div>
              <div className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-brand-300"/> $1.5M cargo coverage</div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <QuoteFormCompact />
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-xs flex flex-col items-center gap-1 hidden md:flex">
          <span className="uppercase tracking-widest text-[10px] font-bold">Scroll</span>
          <div className="w-px h-8 bg-white/40" />
        </div>
      </section>

      <LaneTicker />
      <TrustBar />

      {/* ============ WHY US ============ */}
      <section className="section bg-radial-fade">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <span className="eyebrow">Why Earth Logistics</span>
              <h2 className="section-title mt-2">
                Asset-based <span className="brand-gradient-text">discipline.</span><br />Broker-grade reach.
              </h2>
              <p className="mt-5 text-slate-600 text-lg leading-relaxed">
                We're not a transactional broker — we're an operations partner. Backed by a vetted network of 25,000+ carriers and a 24/7 dispatch team based in Saint John, Indiana, we move every major equipment type in the United States.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Clock, t: "30-min quote turnaround", d: "Live dispatch round the clock — no after-hours voicemail." },
                  { icon: ShieldCheck, t: "Vetted, insured carriers", d: "MCS-90 verified, MyCarrierPortal monitored, $1.5M cargo coverage." },
                  { icon: Truck, t: "Every trailer type", d: "Dry van, flatbed, reefer, lowboy, end dump, pneumatic, hopper, hazmat." },
                  { icon: BadgeCheck, t: "Transparent pricing", d: "Line haul, fuel, accessorials — itemized on every quote." },
                ].map((b) => (
                  <div key={b.t} className="card flex gap-3">
                    <div className="shrink-0 w-11 h-11 rounded-xl brand-gradient text-white flex items-center justify-center shadow-md">
                      <b.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-display font-bold text-slate-900">{b.t}</div>
                      <div className="text-sm text-slate-600 mt-0.5">{b.d}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/about" className="btn-secondary">About Earth Logistics</Link>
                <Link href="/coverage" className="btn-outline">View Coverage <MapPin className="w-4 h-4"/></Link>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=80"
                  alt="Earth Logistics aerial freight operations"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 via-transparent to-transparent" />
              </div>

              {/* Floating stat card */}
              <div className="hidden md:block absolute -left-6 bottom-8 bg-white rounded-2xl shadow-2xl p-5 w-60 animate-float">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-brand-700">
                  <PlayCircle className="w-4 h-4" /> Active right now
                </div>
                <div className="font-display font-extrabold text-3xl text-brand-900 mt-1">
                  847
                </div>
                <div className="text-xs text-slate-500 mt-0.5">Loads in transit</div>
              </div>
              <div className="hidden md:block absolute -right-6 top-12 bg-brand-900 text-white rounded-2xl shadow-2xl p-5 w-60 animate-float" style={{ animationDelay: "1.5s" }}>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-brand-300">
                  <Star className="w-4 h-4 fill-current text-amber-400" /> Shipper rating
                </div>
                <div className="font-display font-extrabold text-3xl mt-1">5.0 / 5</div>
                <div className="text-xs text-blue-200 mt-0.5">Verified US shipper reviews</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ EQUIPMENT SHOWCASE ============ */}
      <section className="section bg-slate-50">
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <SectionHeader
              eyebrow="Equipment & services"
              title="Every trailer type. One operations partner."
              subtitle="Switch between equipment types to explore capabilities, industries served and lane coverage."
            />
            <Link href="/services" className="btn-outline self-start">All services <ArrowRight className="w-4 h-4"/></Link>
          </div>
          <div className="mt-10">
            <EquipmentShowcase />
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="section relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-light opacity-40 pointer-events-none" />
        <div className="container-page relative">
          <SectionHeader
            eyebrow="How it works"
            title="From quote to delivery in 4 steps."
            subtitle="A frictionless shipper experience — engineered for speed."
            center
          />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute left-[12.5%] right-[12.5%] top-[42px] h-0.5 bg-gradient-to-r from-brand-200 via-brand-500 to-brand-200" />

            {[
              { n: "01", t: "Request a quote", d: "Submit your load online or call dispatch. 30-minute response — always." },
              { n: "02", t: "Match to carrier", d: "We source from 25,000+ MCS-90 vetted carriers in our private network." },
              { n: "03", t: "Real-time tracking", d: "Live GPS visibility, milestone updates and direct driver communication." },
              { n: "04", t: "Proof of delivery", d: "Signed BOL, photo POD, invoicing and itemized accessorial breakdown." },
            ].map((step) => (
              <div key={step.n} className="relative bg-white rounded-2xl border border-slate-200 p-6 hover:border-brand-300 hover:shadow-xl hover:-translate-y-1 transition">
                <div className="w-20 h-20 mx-auto mb-3 rounded-2xl brand-gradient text-white font-display font-extrabold text-2xl flex items-center justify-center shadow-lg shine-on-hover">
                  {step.n}
                </div>
                <h3 className="text-center font-display font-bold text-slate-900 text-lg">{step.t}</h3>
                <p className="text-center mt-2 text-sm text-slate-600">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PartnerLogos />

      {/* ============ INDUSTRIES ============ */}
      <section className="section bg-brand-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-grid-dark pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1400&q=70"
            alt=""
            fill
            sizes="50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-900/80 to-transparent" />
        </div>
        <div className="container-page relative">
          <SectionHeader
            light
            eyebrow="Industries we serve"
            title="Built for the operators who keep America moving."
            subtitle="From paving crews to pharma — we move freight every industry depends on."
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-12">
            {industryIcons.map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                className="bg-white/5 border border-white/10 hover:border-brand-400 hover:bg-white/10 rounded-2xl p-5 md:p-6 text-center transition group"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-white/5 border border-white/15 flex items-center justify-center group-hover:bg-brand-600 group-hover:border-brand-500 transition">
                  <Icon className="w-6 h-6 text-brand-300 group-hover:text-white transition"/>
                </div>
                <div className="mt-3 font-display font-bold text-sm md:text-base">{label}</div>
                <span className="mt-1.5 text-xs text-blue-200/80 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                  Learn more <ArrowRight className="w-3 h-3"/>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="section">
        <div className="container-page">
          <SectionHeader
            eyebrow="The Earth Logistics record"
            title="Numbers that reflect operational discipline."
            center
          />
          <div className="mt-12"><StatsRow /></div>
        </div>
      </section>

      {/* ============ COVERAGE TEASER ============ */}
      <section className="section bg-slate-50">
        <div className="container-page">
          <SectionHeader
            eyebrow="National coverage"
            title="48-state freight footprint. Midwest core."
            subtitle="Dense capacity through the Midwest corridor with proven volume on every major US lane."
          />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {regions.slice(0, 6).map((r) => (
              <Link
                key={r.slug}
                href={`/coverage#${r.slug}`}
                className="group block card hover:border-brand-300"
              >
                <div className="flex items-center gap-2 text-brand-700 text-xs uppercase tracking-widest font-bold">
                  <MapPin className="w-4 h-4" /> {r.states.length} states
                </div>
                <h3 className="mt-2 font-display font-extrabold text-xl text-brand-900">{r.name}</h3>
                <p className="mt-2 text-sm text-slate-600 line-clamp-3">{r.blurb}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-700 group-hover:gap-2 transition-all">
                  View region <ArrowRight className="w-4 h-4"/>
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/coverage" className="btn-secondary">View full coverage map <ArrowRight className="w-4 h-4"/></Link>
          </div>
        </div>
      </section>

      {/* ============ JOIN US ============ */}
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
              { icon: Building2, title: "I'm a Shipper", desc: "Move freight reliably with dedicated capacity and transparent pricing.", href: "/shippers", accent: "Request setup" },
              { icon: Truck, title: "I'm a Carrier", desc: "Run high-paying lanes with quick pay, factoring support and 24/7 dispatch.", href: "/carriers", accent: "Become a carrier" },
              { icon: Briefcase, title: "I'm a Freight Agent", desc: "Industry-leading commission splits, modal access and full back-office support.", href: "/agents", accent: "Apply as agent" },
            ].map((p) => (
              <Link
                key={p.title}
                href={p.href}
                className="group relative rounded-3xl p-8 border-2 border-slate-200 bg-white hover:border-brand-500 hover:shadow-2xl hover:-translate-y-1 transition overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 brand-gradient opacity-0 group-hover:opacity-10 rounded-full -translate-y-12 translate-x-12 transition" />
                <div className="w-14 h-14 brand-gradient rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <p.icon className="w-7 h-7" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-extrabold text-brand-900">{p.title}</h3>
                <p className="mt-3 text-slate-600">{p.desc}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-bold text-brand-700 group-hover:gap-3 transition-all">
                  {p.accent} <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="section bg-brand-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-15 pointer-events-none" />
        <div className="container-page relative">
          <SectionHeader
            light
            eyebrow="Trusted by US shippers"
            title="Real freight. Real shippers. Real reviews."
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
            {testimonials.slice(0, 6).map((t) => (
              <div key={t.name} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="mt-3 text-blue-50 leading-relaxed">"{t.body}"</p>
                <div className="mt-5 pt-5 border-t border-white/10">
                  <div className="font-display font-bold">{t.name}</div>
                  <div className="text-xs text-blue-200">{t.role}, {t.company}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/reviews" className="btn-ghost-on-dark">Read all reviews <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="section">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <span className="eyebrow">Frequently asked</span>
            <h2 className="section-title mt-2">Answers from the dispatch desk.</h2>
            <p className="mt-4 text-slate-600">
              The questions our shippers, carriers and freight agents ask most often. Don't see yours? Call <a href={company.phoneHref} className="font-bold text-brand-700 underline underline-offset-4">{company.phone}</a> or use the contact form.
            </p>
            <Link href="/contact" className="btn-secondary mt-6 inline-flex">Talk to a Human <ArrowRight className="w-4 h-4"/></Link>
          </div>
          <div className="lg:col-span-8">
            <FaqAccordion items={homeFaqs} />
          </div>
        </div>
      </section>

      <CtaStrip />
    </>
  );
}
