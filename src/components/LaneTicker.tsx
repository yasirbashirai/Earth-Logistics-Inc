import { ArrowRight } from "lucide-react";

const lanes = [
  "Chicago, IL → Dallas, TX",
  "Indianapolis, IN → Atlanta, GA",
  "Houston, TX → Los Angeles, CA",
  "Detroit, MI → Newark, NJ",
  "Columbus, OH → Charlotte, NC",
  "Saint John, IN → Memphis, TN",
  "Denver, CO → Phoenix, AZ",
  "Cleveland, OH → Miami, FL",
  "Pittsburgh, PA → Nashville, TN",
  "Kansas City, MO → Seattle, WA",
  "Minneapolis, MN → Salt Lake City, UT",
  "Birmingham, AL → Boston, MA",
];

export default function LaneTicker() {
  const items = [...lanes, ...lanes];
  return (
    <div className="bg-brand-900 text-white py-4 overflow-hidden fade-edges">
      <div className="flex items-center gap-3 container-page mb-3">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-soft" />
        <span className="text-xs uppercase tracking-widest font-bold text-brand-300">Live freight lanes</span>
      </div>
      <div className="flex gap-10 scroll-track whitespace-nowrap">
        {items.map((l, i) => (
          <div key={i} className="flex items-center gap-3 shrink-0 text-sm font-semibold">
            <ArrowRight className="w-3.5 h-3.5 text-brand-400" />
            <span>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
