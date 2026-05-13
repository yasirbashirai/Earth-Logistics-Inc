import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/data/services";

export default function ServiceCard({ s }: { s: Service }) {
  return (
    <Link
      href={`/services/${s.slug}`}
      className="group block rounded-2xl overflow-hidden border border-slate-200 bg-white hover:border-[--color-brand-300] hover:shadow-xl hover:-translate-y-1 transition"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={s.image}
          alt={s.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
        <span className="absolute top-3 left-3 text-[10px] uppercase tracking-widest bg-white/95 text-[--color-brand-700] font-bold px-2.5 py-1 rounded">
          {s.category}
        </span>
        <h3 className="absolute bottom-3 left-4 right-4 font-display font-bold text-white text-xl drop-shadow">
          {s.name}
        </h3>
      </div>
      <div className="p-5">
        <p className="text-sm text-slate-600 leading-relaxed">{s.short}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[--color-brand-700] group-hover:gap-2 transition-all">
          Learn more <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}
