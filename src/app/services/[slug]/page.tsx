import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ChevronRight, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import QuoteFormCompact from "@/components/QuoteFormCompact";
import ServiceCard from "@/components/ServiceCard";
import CtaStrip from "@/components/CtaStrip";
import TrustBar from "@/components/TrustBar";
import SectionHeader from "@/components/SectionHeader";
import { services } from "@/data/services";
import { pageMeta } from "@/lib/seo";
import { company } from "@/data/company";

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};
  return pageMeta({
    title: `${s.name} | Earth Logistics Inc`,
    description: `${s.short} ${s.blurb}`,
    path: `/services/${s.slug}`,
    image: s.image,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();

  const related = services.filter((x) => x.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={s.category + " Freight"}
        title={s.name}
        subtitle={s.blurb}
        image={s.image}
        cta1={{ label: "Get Instant Quote", href: "/quote" }}
        cta2={{ label: `Call ${company.phone}`, href: company.phoneHref }}
      />

      <TrustBar />

      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container-page py-3 text-xs text-slate-500 flex items-center gap-1">
          <Link href="/" className="hover:text-brand-700">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/services" className="hover:text-brand-700">Services</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-700">{s.name}</span>
        </div>
      </div>

      <section className="section">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <span className="eyebrow">Service overview</span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold mt-2 text-brand-900">
              {s.name} freight, dispatched 24/7.
            </h2>
            <p className="mt-4 text-slate-700 leading-relaxed text-lg">{s.long}</p>

            <div className="mt-8">
              <h3 className="font-display font-bold text-xl text-brand-900">Capabilities</h3>
              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {s.capabilities.map((c) => (
                  <li key={c} className="flex gap-2 text-slate-700 text-sm">
                    <Check className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" /> {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <h3 className="font-display font-bold text-xl text-brand-900">Industries we serve with {s.name.toLowerCase()}</h3>
              {s.industries.length > 10 ? (
                <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2 text-sm text-slate-700">
                    {s.industries.map((i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" />
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="mt-3 flex flex-wrap gap-2">
                  {s.industries.map((i) => (
                    <span key={i} className="text-xs bg-brand-50 text-brand-700 font-semibold px-3 py-1.5 rounded-full border border-brand-100">{i}</span>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-10">
              <h3 className="font-display font-bold text-2xl text-brand-900">Frequently asked questions</h3>
              <div className="mt-5 space-y-3">
                {s.faqs.map((f) => (
                  <details key={f.q} className="rounded-xl border border-slate-200 bg-white p-5 group">
                    <summary className="cursor-pointer font-display font-semibold text-slate-900 flex items-center justify-between">
                      {f.q}
                      <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition" />
                    </summary>
                    <p className="mt-3 text-sm text-slate-700">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/quote" className="btn-primary">Request Quote</Link>
              <a href={company.phoneHref} className="btn-outline"><Phone className="w-4 h-4"/> {company.phone}</a>
            </div>
          </div>

          <aside className="lg:col-span-5 lg:sticky lg:top-32">
            <QuoteFormCompact />
            <div className="mt-6 rounded-2xl brand-gradient text-white p-6">
              <div className="text-xs uppercase tracking-widest text-blue-200">Dispatch direct</div>
              <a href={company.phoneHref} className="block mt-2 font-display font-extrabold text-3xl">{company.phone}</a>
              <p className="text-sm text-blue-100 mt-2">Speak with a {s.name.toLowerCase()} specialist now.</p>
            </div>
          </aside>
        </div>
      </section>

      {/* Related services */}
      <section className="section bg-slate-50">
        <div className="container-page">
          <SectionHeader eyebrow="Related services" title="Other equipment we dispatch." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {related.map((r) => <ServiceCard key={r.slug} s={r} />)}
          </div>
          <div className="mt-8 text-center">
            <Link href="/services" className="btn-outline">All services <ArrowRight className="w-4 h-4"/></Link>
          </div>
        </div>
      </section>

      <CtaStrip
        title={`Ready to ship ${s.name.toLowerCase()}?`}
        subtitle="Get a binding quote in under 60 seconds or speak with dispatch now — 24/7."
      />
    </>
  );
}
