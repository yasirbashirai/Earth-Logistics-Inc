import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, Sparkles, BadgeCheck, ShieldCheck, Clock, Truck } from "lucide-react";
import QuoteFormCompact from "@/components/QuoteFormCompact";
import { company } from "@/data/company";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-900">
      {/* Background truck image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1776014303191-2f9291f76c6d?auto=format&fit=crop&w=2400&q=85"
          alt="Earth Logistics freight truck on US highway"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Heavy dark + brand gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/95 via-brand-900/85 to-brand-900/50" />
        <div className="absolute inset-0 hero-overlay opacity-60" />
        <div className="absolute inset-0 bg-grid-dark opacity-15" />
      </div>

      <div className="container-page relative pt-12 md:pt-20 pb-14 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center text-white">
          {/* LEFT — Content */}
          <div className="lg:col-span-7">
            {/* Eyebrow chip */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/25 text-blue-100 text-[11px] md:text-xs font-bold px-3.5 py-2 rounded-full backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-brand-300" />
              <span className="tracking-wider">DOT-AUTHORIZED · FMCSA REGISTERED · BMC-84 BONDED</span>
            </div>

            {/* Headline — big brand name + tagline */}
            <h1 className="font-display font-black tracking-tight mt-5 leading-[0.95]">
              <span className="block text-white text-[2.6rem] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
                EARTH LOGISTICS
              </span>
              <span className="block brand-gradient-text bg-clip-text text-[2.6rem] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
                INC
              </span>
              <span className="block mt-4 text-brand-200 font-display font-bold text-lg md:text-xl lg:text-2xl tracking-[0.18em] uppercase">
                Revolving Freight Globally 24/7
              </span>
            </h1>

            {/* Sub-headline (was the original H1) */}
            <p className="mt-7 text-xl md:text-2xl lg:text-3xl font-display font-bold text-white leading-tight max-w-2xl">
              Enterprise-grade freight, dispatched <span className="brand-gradient-text">24 / 7 / 365.</span>
            </p>

            <p className="mt-4 text-base md:text-lg text-blue-50/90 max-w-2xl leading-relaxed">
              Freight brokerage trusted by US manufacturers, builders, growers and chemical
              shippers. Every trailer type. Every state. Every hour.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
              <Link href="/quote" className="btn-primary shine-on-hover text-base">
                Get Instant Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a href={company.phoneHref} className="btn-ghost-on-dark text-base">
                <Phone className="w-5 h-5" />
                {company.phone}
              </a>
            </div>

            {/* Trust strip */}
            <div className="mt-10 pt-7 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <TrustItem icon={Truck} value="25,000+" label="Vetted carriers" />
              <TrustItem icon={ShieldCheck} value="$1.5M" label="Cargo coverage" />
              <TrustItem icon={Clock} value="24/7" label="Live dispatch" />
              <TrustItem icon={BadgeCheck} value="98.6%" label="On-time" />
            </div>
          </div>

          {/* RIGHT — Quote form card */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Soft glow behind card */}
              <div className="absolute -inset-3 bg-brand-500/20 blur-2xl rounded-3xl" />
              <div className="relative">
                <QuoteFormCompact />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustItem({
  icon: Icon,
  value,
  label,
}: {
  icon: any;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="shrink-0 w-10 h-10 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center">
        <Icon className="w-4.5 h-4.5 text-brand-300" />
      </div>
      <div className="leading-tight">
        <div className="font-display font-extrabold text-lg md:text-xl text-white">{value}</div>
        <div className="text-[11px] md:text-xs text-blue-100/80 uppercase tracking-wider font-semibold">
          {label}
        </div>
      </div>
    </div>
  );
}
