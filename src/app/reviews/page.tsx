import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import CtaStrip from "@/components/CtaStrip";
import TrustBar from "@/components/TrustBar";
import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Reviews & Testimonials — Earth Logistics Inc",
  description:
    "Read what shippers, carriers and freight agents say about working with Earth Logistics Inc — an asset-based freight broker in Indiana.",
  path: "/reviews",
});

export default function ReviewsPage() {
  const avg = (testimonials.reduce((a, t) => a + t.rating, 0) / testimonials.length).toFixed(1);

  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title="What our shippers say about us."
        subtitle="Real feedback from real freight operators — manufacturers, builders, growers and chemical companies who trust us with their loads."
        image="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1800&q=80"
      />

      <TrustBar />

      <section className="section">
        <div className="container-page text-center">
          <div className="inline-flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-full px-6 py-3">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-5 h-5 fill-current"/>)}
            </div>
            <div className="font-display font-extrabold text-xl text-slate-900">{avg} / 5.0</div>
            <span className="text-sm text-slate-600">based on verified shipper reviews</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 text-left">
            {testimonials.map((t) => (
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
        </div>
      </section>

      <CtaStrip />
    </>
  );
}
