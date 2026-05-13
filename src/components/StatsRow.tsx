import { company } from "@/data/company";
import CountUpStat from "./CountUpStat";

export default function StatsRow({ onDark = false }: { onDark?: boolean }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {company.stats.map((s) => (
        <CountUpStat key={s.label} value={s.value} label={s.label} onDark={onDark} />
      ))}
    </div>
  );
}
