import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, User, ArrowRight, ChevronRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import CtaStrip from "@/components/CtaStrip";
import QuoteFormCompact from "@/components/QuoteFormCompact";
import { blogPosts } from "@/data/blog";
import { pageMeta } from "@/lib/seo";

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = blogPosts.find((x) => x.slug === slug);
  if (!p) return {};
  return pageMeta({
    title: p.title,
    description: p.excerpt,
    path: `/blog/${p.slug}`,
    image: p.image,
  });
}

export default async function BlogArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();
  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <PageHero eyebrow={post.category} title={post.title} subtitle={post.excerpt} image={post.image} />

      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container-page py-3 text-xs text-slate-500 flex items-center gap-1">
          <Link href="/" className="hover:text-brand-700">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/blog" className="hover:text-brand-700">Blog</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-700">{post.category}</span>
        </div>
      </div>

      <section className="section">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-10">
          <article className="lg:col-span-8 prose-content">
            <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500">
              <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-brand-600"/> {post.author}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-brand-600"/> {post.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-brand-600"/> {post.readTime}</span>
            </div>
            <div className="mt-8 space-y-5 text-slate-800 leading-relaxed">
              {post.body.map((para, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
              ))}
            </div>
          </article>

          <aside className="lg:col-span-4 lg:sticky lg:top-32 self-start">
            <QuoteFormCompact />
          </aside>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container-page">
          <h2 className="font-display font-extrabold text-3xl text-brand-900">Read next</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {related.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group block rounded-2xl overflow-hidden border border-slate-200 bg-white hover:shadow-xl transition">
                <div className="relative aspect-[16/9]">
                  <Image src={p.image} alt={p.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div className="p-6">
                  <span className="eyebrow">{p.category}</span>
                  <h3 className="font-display font-bold text-xl mt-2 text-brand-900">{p.title}</h3>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 group-hover:gap-2 transition-all">
                    Read article <ArrowRight className="w-4 h-4"/>
                  </span>
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
