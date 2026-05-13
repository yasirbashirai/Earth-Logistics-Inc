import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, Sparkles, Star, BadgeCheck, ShieldCheck, Clock, Truck } from "lucide-react";
import QuoteFormCompact from "@/components/QuoteFormCompact";
import { company } from "@/data/company";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-900">
      {/* Background truck image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?auto=format&fit=crop&w=2400&q=85"
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

            {/* Headline */}
            <h1 className="font-display font-extrabold text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight mt-5">
              Enterprise-grade
              <br />
              freight, dispatched
              <br />
              <span className="brand-gradient-text bg-clip-text">24 / 7 / 365.</span>
            </h1>

            {/* Sub */}
            <p className="mt-5 text-base md:text-lg lg:text-xl text-blue-50/90 max-w-2xl leading-relaxed">
              Asset-based freight brokerage trusted by US manufacturers, builders, growers and chemical
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

              {/* Floating rating chip */}
              <div className="hidden sm:flex absolute -bottom-5 -left-3 bg-white text-brand-900 rounded-2xl shadow-2xl px-4 py-3 items-center gap-3 border border-slate-100">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <div className="text-xs">
                  <div className="font-display font-extrabold">5.0 / 5</div>
                  <div className="text-slate-500 text-[11px] leading-tight">Verified shipper reviews</div>
                </div>
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
