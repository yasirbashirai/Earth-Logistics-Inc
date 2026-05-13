import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import CtaStrip from "@/components/CtaStrip";
import TrustBar from "@/components/TrustBar";
import QuoteFormCompact from "@/components/QuoteFormCompact";
import { regions } from "@/data/coverage";
import { MapPin, ChevronRight } from "lucide-react";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Coverage Map — Earth Logistics Inc Freight Lanes",
  description:
    "Earth Logistics provides 48-state freight coverage with dense lanes across the Midwest, Southeast, Texas, Northeast, West Coast and Rocky Mountain regions.",
  path: "/coverage",
});

export default function CoveragePage() {
  return (
    <>
      <PageHero
        eyebrow="Coverage"
        title="48-state freight coverage. Midwest core."
        subtitle="Headquartered at the Midwest freight crossroads in Saint John, Indiana — with deep capacity across every major US freight corridor."
        image="https://images.unsplash.com/photo-1591768793355-74d04bb6608f?auto=format&fit=crop&w=1800&q=80"
        cta1={{ label: "Quote a Lane", href: "/quote" }}
      />

      <TrustBar />

      <section className="section">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8 space-y-5">
            {regions.map((r) => (
              <article key={r.slug} id={r.slug} className="card scroll-mt-32">
                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-[--color-brand-600] mt-1" />
                  <div className="flex-1">
                    <h2 className="font-display font-extrabold text-2xl text-[--color-brand-900]">{r.name}</h2>
                    <p className="mt-2 text-slate-700">{r.blurb}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                      <div>
                        <div className="text-xs uppercase tracking-wider font-bold text-slate-500">States covered</div>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {r.states.map((s) => (
                            <span key={s} className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded">{s}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-wider font-bold text-slate-500">Primary freight hubs</div>
                        <ul className="mt-2 space-y-1 text-sm text-slate-700">
                          {r.hubs.map((h) => (
                            <li key={h} className="flex items-center gap-1.5"><ChevronRight className="w-3 h-3 text-[--color-brand-500]"/> {h}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="lg:col-span-4 lg:sticky lg:top-32 self-start space-y-6">
            <QuoteFormCompact />
            <div className="rounded-2xl overflow-hidden border border-slate-200">
              <iframe
                src="https://www.google.com/maps?q=Saint+John,+IN&output=embed"
                width="100%"
                height="280"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Earth Logistics service area map"
              />
            </div>
          </aside>
        </div>
      </section>

      <CtaStrip />
    </>
  );
}
