import { ShieldCheck, BadgeCheck, FileCheck2, Truck, Headphones, Globe2 } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "DOT Authorized" },
  { icon: BadgeCheck, label: "FMCSA Registered" },
  { icon: FileCheck2, label: "BMC-84 Bonded" },
  { icon: Truck, label: "25,000+ Vetted Carriers" },
  { icon: Globe2, label: "48-State Coverage" },
  { icon: Headphones, label: "24/7 Live Dispatch" },
];

export default function TrustBar() {
  return (
    <div className="bg-slate-50 border-y border-slate-200">
      <div className="container-page py-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 text-slate-700 text-sm font-semibold">
            <Icon className="w-5 h-5 text-brand-600" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
