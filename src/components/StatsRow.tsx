import { company } from "@/data/company";

export default function StatsRow({ onDark = false }: { onDark?: boolean }) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${onDark ? "" : ""}`}>
      {company.stats.map((s) => (
        <div
          key={s.label}
          className={`rounded-xl p-5 text-center border ${
            onDark
              ? "bg-white/5 border-white/15 text-white backdrop-blur-sm"
              : "bg-white border-slate-200"
          }`}
        >
          <div className={`font-display text-2xl md:text-3xl font-extrabold ${onDark ? "text-white" : "brand-gradient-text"}`}>
            {s.value}
          </div>
          <div className={`text-xs uppercase tracking-wider mt-1 ${onDark ? "text-slate-300" : "text-slate-500"}`}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
