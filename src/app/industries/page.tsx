import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import CtaStrip from "@/components/CtaStrip";
import TrustBar from "@/components/TrustBar";
import QuoteFormCompact from "@/components/QuoteFormCompact";
import { industries } from "@/data/industries";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Industries We Serve — Earth Logistics Inc",
  description:
    "Earth Logistics serves manufacturing, construction, agriculture, food & beverage, energy, automotive, retail and chemical shippers nationwide.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Specialized freight, by industry."
        subtitle="Every industry has its own freight rhythm — production cycles, seasonal surges, regulatory demands. We've built our dispatch around them."
        image="https://images.unsplash.com/photo-1565017228812-fd3cbe6b13e6?auto=format&fit=crop&w=1800&q=80"
        cta1={{ label: "Get Industry Quote", href: "/quote" }}
      />

      <TrustBar />

      <section className="section">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-5">
            {industries.map((i) => (
              <article key={i.slug} id={i.slug} className="card scroll-mt-32">
                <span className="eyebrow">{i.short}</span>
                <h2 className="font-display font-extrabold text-2xl md:text-3xl text-brand-900 mt-2">{i.name}</h2>
                <p className="mt-3 text-slate-700">{i.blurb}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {i.trailerTypes.map((t) => (
                    <span key={t} className="text-xs bg-brand-50 text-brand-700 font-semibold px-3 py-1.5 rounded-full border border-brand-100">{t}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <aside className="lg:col-span-4 lg:sticky lg:top-32 self-start">
            <QuoteFormCompact />
          </aside>
        </div>
      </section>

      <CtaStrip />
    </>
  );
}
