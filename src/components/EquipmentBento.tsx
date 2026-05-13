import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Truck, Box, Snowflake, Mountain, Car, HardHat, Wind, Droplets, Wheat, Flame } from "lucide-react";
import { services } from "@/data/services";

const iconMap: Record<string, any> = {
  "dry-van": Box,
  flatbed: Truck,
  refrigerated: Snowflake,
  "lowboy-heavy-haul": Mountain,
  "car-hauler": Car,
  "end-dump": HardHat,
  "pneumatic-tanker": Wind,
  tanker: Droplets,
  "hopper-bottom": Wheat,
  hazmat: Flame,
};

// Bento layout class per service (controls grid span)
const layoutClasses: Record<string, string> = {
  "dry-van": "lg:col-span-6 lg:row-span-2",        // hero card 6w x 2h
  "lowboy-heavy-haul": "lg:col-span-6 lg:row-span-2", // hero card 6w x 2h
  flatbed: "lg:col-span-3",
  refrigerated: "lg:col-span-3",
  "end-dump": "lg:col-span-3",
  "pneumatic-tanker": "lg:col-span-3",
  "car-hauler": "lg:col-span-3",
  tanker: "lg:col-span-3",
  "hopper-bottom": "lg:col-span-3",
  hazmat: "lg:col-span-3",
};

export default function EquipmentBento() {
  // Sort to put hero cards first
  const heroSlugs = ["dry-van", "lowboy-heavy-haul"];
  const others = services.filter((s) => !heroSlugs.includes(s.slug));
  const heroes = heroSlugs.map((slug) => services.find((s) => s.slug === slug)!);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[240px] gap-4">
      {/* Two hero cards first */}
      {heroes.map((s) => {
        const Icon = iconMap[s.slug] ?? Truck;
        return (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className={`group relative overflow-hidden rounded-2xl ${layoutClasses[s.slug]} bg-brand-900 min-h-[260px] sm:col-span-2 lg:col-span-6`}
          >
            <Image
              src={s.image}
              alt={s.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/55 to-transparent" />
            <div className="absolute inset-0 p-6 md:p-7 flex flex-col justify-end text-white">
              <div className="flex items-center gap-2">
                <div className="w-11 h-11 rounded-xl brand-gradient flex items-center justify-center shadow-lg">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-full">
                  Featured · {s.category}
                </span>
              </div>
              <h3 className="font-display font-extrabold text-2xl md:text-3xl mt-4">{s.name}</h3>
              <p className="text-blue-50/85 text-sm md:text-base mt-1.5 max-w-md">{s.short}</p>
              <div className="mt-4 flex items-center gap-2 text-brand-300 font-bold group-hover:gap-3 transition-all">
                Explore service <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        );
      })}

      {/* Other 8 services */}
      {others.map((s) => {
        const Icon = iconMap[s.slug] ?? Truck;
        return (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className={`group relative overflow-hidden rounded-2xl ${layoutClasses[s.slug]} bg-brand-900 min-h-[220px] sm:col-span-1 lg:col-span-3`}
          >
            <Image
              src={s.image}
              alt={s.name}
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/40 to-transparent" />
            <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
              <div className="w-10 h-10 rounded-lg brand-gradient flex items-center justify-center shadow-md mb-3">
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-brand-300">{s.category}</span>
              <h3 className="font-display font-extrabold text-lg mt-1 leading-tight">{s.name}</h3>
              <div className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-blue-100 group-hover:text-white group-hover:gap-2.5 transition-all">
                View <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
