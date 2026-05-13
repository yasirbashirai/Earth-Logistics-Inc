"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export type FaqItem = { q: string; a: string };

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {items.map((f, i) => {
        const isOpen = i === open;
        return (
          <div
            key={f.q}
            className={`rounded-2xl border-2 transition ${
              isOpen ? "border-brand-300 bg-white shadow-xl" : "border-slate-200 bg-white hover:border-brand-200"
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
            >
              <span className="font-display font-bold text-slate-900 text-base md:text-lg">{f.q}</span>
              <span
                className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition ${
                  isOpen ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-700"
                }`}
              >
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-slate-700 leading-relaxed animate-fade-up">{f.a}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
