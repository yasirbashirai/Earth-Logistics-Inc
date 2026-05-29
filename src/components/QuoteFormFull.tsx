"use client";

import { useState } from "react";
import { CheckCircle2, Search, Ruler, FileText, AlertCircle } from "lucide-react";
import { services } from "@/data/services";
import { submitForm, formToObject } from "@/lib/forms";

type TabId = "lookup" | "dimensions" | "description";

const tabs: { id: TabId; title: string; description: string; icon: typeof Search }[] = [
  {
    id: "lookup",
    title: "Look up equipment shipping specs",
    description:
      "Enter pickup, delivery, make, model, and equipment type to get a freight price fast.",
    icon: Search,
  },
  {
    id: "dimensions",
    title: "Input load dimensions and weight",
    description:
      "Enter pickup, delivery, description, dimensions, and weight for freight that cannot be looked up in the equipment catalog.",
    icon: Ruler,
  },
  {
    id: "description",
    title: "Start with load description",
    description:
      "Describe the shipment first and get to a quote faster. We'll fill in machines, loads, and stops where we can.",
    icon: FileText,
  },
];

const MAKES = ["Caterpillar", "John Deere", "Komatsu", "Volvo", "Liebherr", "Bobcat", "Kubota", "JCB", "Hitachi", "Case"];
const EQUIPMENT_TYPES = ["Excavator", "Bulldozer", "Wheel Loader", "Skid Steer", "Crane", "Backhoe", "Forklift", "Telehandler", "Grader", "Dump Truck"];

export default function QuoteFormFull() {
  const [active, setActive] = useState<TabId>("lookup");
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Tab 2 unit toggles
  const [lengthUnit, setLengthUnit] = useState<"ft+in" | "in" | "ft" | "m" | "mm">("ft+in");
  const [weightUnit, setWeightUnit] = useState<"lb" | "kg">("lb");

  // Char counters for textareas
  const [desc, setDesc] = useState("");
  const [pieces, setPieces] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await submitForm("quote", {
      formType: `Full quote calculator — ${active}`,
      lengthUnit,
      weightUnit,
      ...formToObject(e.currentTarget),
    });
    setBusy(false);
    if (res.ok) {
      setSubmitted(true);
    } else {
      setError(res.error || "Something went wrong. Please call 855-456-4424.");
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-white p-10 shadow-xl border border-slate-200 text-center">
        <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
        <h3 className="mt-3 font-display text-2xl font-extrabold">Quote request received</h3>
        <p className="mt-2 text-slate-600 max-w-md mx-auto">
          A senior freight operations specialist will follow up within 30 minutes (24/7). For
          immediate dispatch call <strong>855-456-4424</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="text-center">
        <h2 className="font-display font-extrabold text-3xl md:text-4xl text-brand-900">
          Get a Freight Quote
        </h2>
        <p className="mt-2 text-slate-600">Get an instant quote for heavy equipment transport.</p>
      </div>

      {/* Three step / tab cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {tabs.map((t) => {
          const selected = active === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActive(t.id)}
              className={`text-left rounded-2xl border-2 p-5 transition ${
                selected
                  ? "bg-brand-50 border-brand-600 shadow-md"
                  : "bg-white border-slate-200 hover:border-brand-300 hover:shadow-sm"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      selected ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <t.icon className="w-4 h-4" />
                  </div>
                  <h3
                    className={`font-display font-extrabold text-base leading-tight ${
                      selected ? "text-brand-900" : "text-slate-900"
                    }`}
                  >
                    {t.title}
                  </h3>
                </div>
                {selected && (
                  <span className="text-[10px] uppercase tracking-widest font-bold bg-brand-600 text-white px-2 py-1 rounded-full whitespace-nowrap">
                    Selected
                  </span>
                )}
              </div>
              <p className="mt-3 text-xs text-slate-600 leading-relaxed">{t.description}</p>
            </button>
          );
        })}
      </div>

      {/* Form panel */}
      <form
        onSubmit={submit}
        className="rounded-2xl bg-white shadow-xl border border-slate-200 p-6 md:p-8"
      >
        {/* Honeypot */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

        {/* Pickup + Delivery (all tabs) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="form-label">
              Pickup location <span className="text-red-500">*</span>
            </label>
            <input name="pickup" required className="form-input" placeholder="Business, city, or ZIP" />
          </div>
          <div>
            <label className="form-label">
              Delivery location <span className="text-red-500">*</span>
            </label>
            <input name="delivery" required className="form-input" placeholder="Business, city, or ZIP" />
          </div>
        </div>

        {/* TAB 1 — Lookup */}
        {active === "lookup" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
              <div>
                <label className="form-label">
                  Make <span className="text-red-500">*</span>
                </label>
                <select name="make" required className="form-select" defaultValue="">
                  <option value="" disabled>
                    Select or type...
                  </option>
                  {MAKES.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">
                  Model <span className="text-red-500">*</span>
                </label>
                <input name="model" required className="form-input" placeholder="Select or type..." />
              </div>
              <div>
                <label className="form-label">
                  Equipment Type <span className="text-red-500">*</span>
                </label>
                <select name="equipmentType" required className="form-select" defaultValue="">
                  <option value="" disabled>
                    Select or type...
                  </option>
                  {EQUIPMENT_TYPES.map((e) => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </>
        )}

        {/* TAB 2 — Dimensions */}
        {active === "dimensions" && (
          <>
            <div className="mt-5">
              <label className="form-label">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                required
                rows={4}
                maxLength={1500}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="form-textarea"
                placeholder="Describe the load so the saved quote and booking screens label it correctly."
              />
              <div className="text-right text-xs text-slate-400 mt-1">{desc.length}/1500</div>
            </div>

            <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600">Length units:</span>
                {(["ft+in", "in", "ft", "m", "mm"] as const).map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => setLengthUnit(u)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-md border ${
                      lengthUnit === u
                        ? "bg-brand-600 text-white border-brand-600"
                        : "bg-white text-slate-700 border-slate-300 hover:border-brand-400"
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600">Weight:</span>
                {(["lb", "kg"] as const).map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => setWeightUnit(u)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-md border ${
                      weightUnit === u
                        ? "bg-brand-600 text-white border-brand-600"
                        : "bg-white text-slate-700 border-slate-300 hover:border-brand-400"
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              <DimField name="length" label="Length" unit={lengthUnit} required />
              <DimField name="width" label="Width" unit={lengthUnit} required />
              <DimField name="height" label="Height" unit={lengthUnit} required />
              <div>
                <label className="form-label">
                  Weight <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input name="weight" required className="form-input pr-10" placeholder="" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
                    {weightUnit}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* TAB 3 — Description */}
        {active === "description" && (
          <>
            <div className="mt-6 rounded-xl bg-slate-50 border border-slate-200 p-4 text-sm text-slate-700">
              <p>List each item with dimensions and weight, plus any loading or handling details.</p>
              <p className="mt-1">
                For multi-stop shipments, note where each item is picked up or delivered.
              </p>
            </div>

            <div className="mt-5">
              <label className="form-label">
                Shipment description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                required
                rows={8}
                maxLength={1500}
                value={pieces}
                onChange={(e) => setPieces(e.target.value)}
                className="form-textarea"
                placeholder="Enter each piece on a new line..."
              />
              <div className="text-right text-xs text-slate-400 mt-1">{pieces.length}/1500</div>
            </div>
          </>
        )}

        {/* Contact (all tabs) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-200">
          <div>
            <label className="form-label">
              Email <span className="text-red-500">*</span>
            </label>
            <input name="email" required type="email" className="form-input" placeholder="name@company.com" />
          </div>
          <div>
            <label className="form-label">
              Phone number <span className="text-red-500">*</span>
            </label>
            <input name="phone" required type="tel" className="form-input" placeholder="(555) 555-5555" />
          </div>
          <p className="md:col-span-2 text-xs text-slate-500 -mt-2">
            Email and phone are required before generating a rate.
          </p>
        </div>

        {/* Equipment type quick chip for non-lookup tabs */}
        {active !== "lookup" && (
          <div className="mt-5">
            <label className="form-label">Equipment / Trailer Type</label>
            <select name="equipment" className="form-select" defaultValue="">
              <option value="">Select equipment (optional)</option>
              {services.map((s) => (
                <option key={s.slug} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {error && (
          <div className="mt-5 flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button disabled={busy} className="btn-primary mt-7 w-full md:w-auto px-12 py-4">
          {busy ? "Calculating..." : "Calculate"}
        </button>
        <p className="mt-3 text-xs text-slate-500">
          Need multiple pieces, extra stops, or manual specs? Call dispatch at{" "}
          <strong>855-456-4424</strong>.
        </p>
      </form>
    </div>
  );
}

function DimField({
  name,
  label,
  unit,
  required,
}: {
  name: string;
  label: string;
  unit: "ft+in" | "in" | "ft" | "m" | "mm";
  required?: boolean;
}) {
  if (unit === "ft+in") {
    return (
      <div>
        <label className="form-label">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="grid grid-cols-2 gap-2">
          <div className="relative">
            <input name={`${name}Ft`} required={required} className="form-input pr-8" placeholder="Ft" />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
              ft
            </span>
          </div>
          <div className="relative">
            <input name={`${name}In`} className="form-input pr-8" placeholder="In" />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
              in
            </span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <label className="form-label">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input name={name} required={required} className="form-input pr-10" placeholder="" />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
          {unit}
        </span>
      </div>
    </div>
  );
}
