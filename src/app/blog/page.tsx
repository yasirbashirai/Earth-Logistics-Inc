import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import CtaStrip from "@/components/CtaStrip";
import TrustBar from "@/components/TrustBar";
import { blogPosts } from "@/data/blog";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Blog — Freight Industry Insights | Earth Logistics Inc",
  description:
    "Freight industry insights from Earth Logistics — shipper guides, heavy-haul permitting, broker selection and the agent program explained.",
  path: "/blog",
});

export default function BlogIndex() {
  const [hero, ...rest] = blogPosts;
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Freight insights from the dispatch desk."
        subtitle="Plain-English guides for shippers, carriers and freight agents — written by the operators who run the loads."
        image="https://images.unsplash.com/photo-1593696954577-ab3d39317b97?auto=format&fit=crop&w=1800&q=80"
      />

      <TrustBar />

      <section className="section">
        <div className="container-page">
          <Link href={`/blog/${hero.slug}`} className="group block rounded-3xl overflow-hidden border border-slate-200 bg-white hover:shadow-2xl transition">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative aspect-[16/10] lg:aspect-auto">
                <Image src={hero.image} alt={hero.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <span className="eyebrow">{hero.category}</span>
                <h2 className="font-display font-extrabold text-2xl md:text-3xl mt-2 text-[--color-brand-900]">{hero.title}</h2>
                <p className="mt-3 text-slate-600">{hero.excerpt}</p>
                <div className="mt-5 flex items-center gap-5 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5"/> {hero.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5"/> {hero.readTime}</span>
                  <span>By {hero.author}</span>
                </div>
                <span className="mt-5 inline-flex items-center gap-2 font-semibold text-[--color-brand-700] group-hover:gap-3 transition-all">
                  Read article <ArrowRight className="w-4 h-4"/>
                </span>
              </div>
            </div>
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {rest.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group block rounded-2xl overflow-hidden border border-slate-200 bg-white hover:shadow-xl transition">
                <div className="relative aspect-[16/9]">
                  <Image src={p.image} alt={p.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition duration-500"/>
                </div>
                <div className="p-6">
                  <span className="eyebrow">{p.category}</span>
                  <h3 className="font-display font-bold text-xl mt-2 text-[--color-brand-900]">{p.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{p.excerpt}</p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5"/> {p.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5"/> {p.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaStrip />
    </>
  );
}
