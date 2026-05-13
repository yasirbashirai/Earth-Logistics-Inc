"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Calculator, Truck, Ruler } from "lucide-react";
import { services } from "@/data/services";

type Tab = "standard" | "heavy";

export default function QuoteFormFull() {
  const [tab, setTab] = useState<Tab>("standard");
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);

  // Heavy haul calculator state
  const [hh, setHh] = useState({
    length: "",
    width: "",
    height: "",
    weight: "",
    miles: "",
    axles: "8",
    permitStates: "2",
    pilots: "1",
  });

  const heavyEstimate = useMemo(() => {
    const miles = parseFloat(hh.miles) || 0;
    const weight = parseFloat(hh.weight) || 0;
    const width = parseFloat(hh.width) || 0;
    const height = parseFloat(hh.height) || 0;
    const axles = parseInt(hh.axles) || 8;
    const permitStates = parseInt(hh.permitStates) || 0;
    const pilots = parseInt(hh.pilots) || 0;

    if (!miles || !weight) return null;

    // Base rate per mile scaled by axles and weight
    const baseRate = 4.25 + Math.max(0, axles - 8) * 0.65;
    const overweightMult = weight > 80000 ? 1 + (weight - 80000) / 200000 : 1;
    const overdimMult =
      (width > 8.5 ? 1.08 : 1) * (height > 13.5 ? 1.12 : 1);
    const linehaul = miles * baseRate * overweightMult * overdimMult;
    const permits = permitStates * 175;
    const pilotCost = pilots * miles * 1.85;
    const fuel = miles * 0.65;
    const total = linehaul + permits + pilotCost + fuel;
    return {
      linehaul,
      permits,
      pilotCost,
      fuel,
      total,
    };
  }, [hh]);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setSubmitted(true);
    }, 900);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-white p-10 shadow-xl border border-slate-200 text-center">
        <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
        <h3 className="mt-3 font-display text-2xl font-extrabold">Quote request received</h3>
        <p className="mt-2 text-slate-600 max-w-md mx-auto">
          A senior freight operations specialist will follow up within 30 minutes (24/7). For immediate dispatch call <strong>855-456-4424</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white shadow-xl border border-slate-200 overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setTab("standard")}
          className={`flex-1 px-5 py-4 font-semibold text-sm flex items-center justify-center gap-2 ${
            tab === "standard"
              ? "bg-[--color-brand-50] text-[--color-brand-700] border-b-2 border-[--color-brand-600]"
              : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          <Truck className="w-4 h-4" /> Standard Freight Quote
        </button>
        <button
          onClick={() => setTab("heavy")}
          className={`flex-1 px-5 py-4 font-semibold text-sm flex items-center justify-center gap-2 ${
            tab === "heavy"
              ? "bg-[--color-brand-50] text-[--color-brand-700] border-b-2 border-[--color-brand-600]"
              : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          <Calculator className="w-4 h-4" /> Heavy Haul Calculator
        </button>
      </div>

      <form onSubmit={submit} className="p-6 md:p-8">
        {tab === "standard" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Pickup City, ST or ZIP</label>
              <input required className="form-input" placeholder="Saint John, IN 46373" />
            </div>
            <div>
              <label className="form-label">Delivery City, ST or ZIP</label>
              <input required className="form-input" placeholder="Dallas, TX 75201" />
            </div>
            <div>
              <label className="form-label">Equipment Type</label>
              <select required className="form-select" defaultValue="">
                <option value="" disabled>Select equipment</option>
                {services.map((s) => (
                  <option key={s.slug} value={s.slug}>{s.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">Commodity</label>
              <input className="form-input" placeholder="Steel coils / Pallets / Frozen food" />
            </div>
            <div>
              <label className="form-label">Total Weight (lbs)</label>
              <input className="form-input" placeholder="42,000" />
            </div>
            <div>
              <label className="form-label">Pickup Date</label>
              <input type="date" className="form-input" />
            </div>
            <div>
              <label className="form-label">Company Name</label>
              <input required className="form-input" />
            </div>
            <div>
              <label className="form-label">Your Name</label>
              <input required className="form-input" />
            </div>
            <div>
              <label className="form-label">Email</label>
              <input required type="email" className="form-input" />
            </div>
            <div>
              <label className="form-label">Phone</label>
              <input required type="tel" className="form-input" />
            </div>
            <div className="md:col-span-2">
              <label className="form-label">Load Notes</label>
              <textarea rows={3} className="form-textarea" placeholder="Anything we should know — accessorials, special handling, recurring lane, etc." />
            </div>
          </div>
        )}

        {tab === "heavy" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-700 font-semibold">
                <Ruler className="w-4 h-4 text-[--color-brand-600]" />
                Load dimensions
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="form-label">Length (ft)</label>
                  <input value={hh.length} onChange={(e) => setHh({ ...hh, length: e.target.value })} className="form-input" placeholder="48" />
                </div>
                <div>
                  <label className="form-label">Width (ft)</label>
                  <input value={hh.width} onChange={(e) => setHh({ ...hh, width: e.target.value })} className="form-input" placeholder="10" />
                </div>
                <div>
                  <label className="form-label">Height (ft)</label>
                  <input value={hh.height} onChange={(e) => setHh({ ...hh, height: e.target.value })} className="form-input" placeholder="13.5" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="form-label">Total Weight (lbs)</label>
                  <input value={hh.weight} onChange={(e) => setHh({ ...hh, weight: e.target.value })} className="form-input" placeholder="85,000" />
                </div>
                <div>
                  <label className="form-label">Miles</label>
                  <input value={hh.miles} onChange={(e) => setHh({ ...hh, miles: e.target.value })} className="form-input" placeholder="850" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="form-label">Axles</label>
                  <select value={hh.axles} onChange={(e) => setHh({ ...hh, axles: e.target.value })} className="form-select">
                    {[8,9,10,11,12,13,14,15,16].map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                <div>
                  <label className="form-label">Permit States</label>
                  <input value={hh.permitStates} onChange={(e) => setHh({ ...hh, permitStates: e.target.value })} className="form-input" placeholder="2" />
                </div>
                <div>
                  <label className="form-label">Pilot Cars</label>
                  <select value={hh.pilots} onChange={(e) => setHh({ ...hh, pilots: e.target.value })} className="form-select">
                    {[0,1,2,3,4].map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="form-label">Your Name</label>
                  <input required className="form-input" />
                </div>
                <div>
                  <label className="form-label">Phone</label>
                  <input required type="tel" className="form-input" />
                </div>
                <div className="col-span-2">
                  <label className="form-label">Email</label>
                  <input required type="email" className="form-input" />
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 self-start">
              <div className="flex items-center gap-2 text-slate-700 font-semibold">
                <Calculator className="w-4 h-4 text-[--color-brand-600]" />
                Live heavy-haul estimate
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Indicative range only — final binding rate quoted after route survey and permit confirmation.
              </p>
              <div className="mt-4 space-y-2 text-sm">
                <Row label="Line haul" value={heavyEstimate?.linehaul} />
                <Row label="Fuel" value={heavyEstimate?.fuel} />
                <Row label="Permits" value={heavyEstimate?.permits} />
                <Row label="Pilot cars" value={heavyEstimate?.pilotCost} />
                <div className="border-t border-slate-200 pt-3 mt-3 flex justify-between">
                  <span className="font-bold text-slate-900">Estimated total</span>
                  <span className="font-display font-extrabold text-2xl brand-gradient-text">
                    {heavyEstimate ? formatCurrency(heavyEstimate.total) : "—"}
                  </span>
                </div>
              </div>
              <div className="mt-4 text-xs text-slate-500">
                Includes line haul, fuel, permit fees and pilot escort. Excludes detention, layover, lumper and tarp fees.
              </div>
            </div>
          </div>
        )}

        <button disabled={busy} className="btn-primary mt-6 w-full md:w-auto px-10">
          {busy ? "Sending..." : tab === "heavy" ? "Request Heavy-Haul Quote" : "Request Freight Quote"}
        </button>
      </form>
    </div>
  );
}

function Row({ label, value }: { label: string; value: number | undefined }) {
  return (
    <div className="flex justify-between text-slate-700">
      <span>{label}</span>
      <span className="font-semibold">{value ? formatCurrency(value) : "—"}</span>
    </div>
  );
}

function formatCurrency(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}
