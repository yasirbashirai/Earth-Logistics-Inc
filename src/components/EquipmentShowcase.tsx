"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { services } from "@/data/services";

export default function EquipmentShowcase() {
  const [active, setActive] = useState(services[0].slug);
  const current = services.find((s) => s.slug === active)!;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Tab rail */}
      <div className="lg:col-span-4">
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
          {services.map((s) => {
            const isActive = s.slug === active;
            return (
              <button
                key={s.slug}
                onClick={() => setActive(s.slug)}
                className={`text-left rounded-xl px-4 py-3 transition border-2 ${
                  isActive
                    ? "bg-brand-50 border-brand-600 text-brand-900 shadow-lg"
                    : "bg-white border-slate-200 text-slate-700 hover:border-brand-300 hover:bg-slate-50"
                }`}
              >
                <div className="text-xs uppercase tracking-wider font-bold opacity-70">{s.category}</div>
                <div className="font-display font-bold text-base mt-0.5">{s.name}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active panel */}
      <div className="lg:col-span-8">
        <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xl">
          <div className="relative aspect-[16/9]">
            <Image
              key={current.slug}
              src={current.image}
              alt={current.name}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover animate-fade-up"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
              <span className="inline-block text-xs uppercase tracking-widest font-bold bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-full">
                {current.category} Freight
              </span>
              <h3 className="mt-3 font-display font-extrabold text-3xl md:text-4xl">{current.name}</h3>
              <p className="text-blue-50 mt-2 max-w-xl">{current.blurb}</p>
            </div>
          </div>

          <div className="p-6 md:p-7 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <div className="text-xs uppercase tracking-widest font-bold text-brand-700">Capabilities</div>
              <ul className="mt-3 space-y-2">
                {current.capabilities.slice(0, 4).map((c) => (
                  <li key={c} className="flex gap-2 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" /> {c}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest font-bold text-brand-700">Industries</div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {current.industries.map((i) => (
                  <span key={i} className="text-xs bg-brand-50 text-brand-700 font-semibold px-2.5 py-1 rounded-full border border-brand-100">
                    {i}
                  </span>
                ))}
              </div>
              <Link
                href={`/services/${current.slug}`}
                className="mt-5 inline-flex items-center gap-2 font-bold text-brand-700 hover:gap-3 transition-all"
              >
                View full {current.name.toLowerCase()} page <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
