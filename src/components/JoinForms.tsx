"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

type Variant = "carrier" | "shipper" | "agent";

const fields: Record<Variant, { label: string; name: string; type?: string; required?: boolean; options?: string[]; full?: boolean }[]> = {
  carrier: [
    { label: "Company Name", name: "company", required: true },
    { label: "MC Number", name: "mc", required: true },
    { label: "DOT Number", name: "dot", required: true },
    { label: "Contact Name", name: "name", required: true },
    { label: "Phone", name: "phone", type: "tel", required: true },
    { label: "Email", name: "email", type: "email", required: true },
    { label: "Fleet Size", name: "fleet", type: "number" },
    {
      label: "Primary Equipment",
      name: "equipment",
      options: ["Dry Van", "Flatbed", "Reefer", "Lowboy / Heavy Haul", "Car Hauler", "End Dump", "Pneumatic Tanker", "Tanker", "Hopper Bottom", "Hazmat"],
    },
    { label: "Operating States", name: "states", full: true },
    { label: "Notes", name: "notes", full: true },
  ],
  shipper: [
    { label: "Company Name", name: "company", required: true },
    { label: "Industry", name: "industry", options: ["Manufacturing", "Construction", "Agriculture", "Food & Beverage", "Energy / Oil & Gas", "Automotive", "Retail / E-commerce", "Chemical / Industrial", "Other"] },
    { label: "Contact Name", name: "name", required: true },
    { label: "Title / Role", name: "role" },
    { label: "Phone", name: "phone", type: "tel", required: true },
    { label: "Email", name: "email", type: "email", required: true },
    { label: "Monthly Load Volume", name: "volume", options: ["1-10", "11-50", "51-200", "200+"] },
    { label: "Primary Equipment Used", name: "equipment", options: ["Dry Van", "Flatbed", "Reefer", "Lowboy / Heavy Haul", "End Dump", "Pneumatic", "Hopper Bottom", "Hazmat", "Mixed"] },
    { label: "Top Origin States", name: "origin", full: true },
    { label: "Top Destination States", name: "dest", full: true },
    { label: "What are you looking for in a broker?", name: "notes", full: true },
  ],
  agent: [
    { label: "Full Name", name: "name", required: true },
    { label: "Phone", name: "phone", type: "tel", required: true },
    { label: "Email", name: "email", type: "email", required: true },
    { label: "Current Brokerage", name: "current" },
    { label: "Years in Freight", name: "years", type: "number" },
    { label: "Annual Book Revenue ($)", name: "revenue" },
    { label: "Current Commission Split", name: "split" },
    { label: "Primary Modes / Equipment", name: "modes" },
    { label: "Why are you considering a move?", name: "why", full: true },
    { label: "When could you be onboarded?", name: "onboard", options: ["Immediately", "1-2 weeks", "30 days", "60 days", "Just exploring"] },
  ],
};

const headlines: Record<Variant, { title: string; subtitle: string }> = {
  carrier: {
    title: "Carrier Application",
    subtitle: "Get onboarded with Earth Logistics in 48 hours. Quick pay, factoring-friendly, $1.5M cargo coverage.",
  },
  shipper: {
    title: "Shipper Setup",
    subtitle: "Tell us about your freight and we'll build you a custom capacity plan within 24 hours.",
  },
  agent: {
    title: "Freight Agent Application",
    subtitle: "Industry-leading commission splits + full back-office support. 100% confidential.",
  },
};

export default function JoinForm({ variant }: { variant: Variant }) {
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const cfg = fields[variant];
  const head = headlines[variant];

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setSubmitted(true);
    }, 800);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-white p-10 shadow-xl border border-slate-200 text-center">
        <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
        <h3 className="mt-3 font-display text-2xl font-extrabold">Application received</h3>
        <p className="mt-2 text-slate-600 max-w-md mx-auto">
          A senior team member will personally review your submission and call you within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl bg-white p-6 md:p-8 shadow-xl border border-slate-200">
      <h3 className="font-display text-2xl md:text-3xl font-extrabold text-[--color-brand-900]">{head.title}</h3>
      <p className="text-slate-600 mt-1">{head.subtitle}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {cfg.map((f) => (
          <div key={f.name} className={f.full ? "md:col-span-2" : ""}>
            <label className="form-label">{f.label}{f.required ? " *" : ""}</label>
            {f.options ? (
              <select required={f.required} className="form-select" defaultValue="">
                <option value="" disabled>Select</option>
                {f.options.map((o) => <option key={o}>{o}</option>)}
              </select>
            ) : f.full ? (
              <textarea required={f.required} className="form-textarea" rows={3} />
            ) : (
              <input required={f.required} type={f.type || "text"} className="form-input" />
            )}
          </div>
        ))}
      </div>
      <button disabled={busy} className="btn-primary mt-6 w-full md:w-auto px-10">
        {busy ? "Submitting..." : "Submit Application"}
      </button>
      <p className="mt-3 text-xs text-slate-500">
        Submissions are reviewed Monday-Sunday by a real human at Earth Logistics Inc — never an outsourced call center.
      </p>
    </form>
  );
}
