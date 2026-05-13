"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { services } from "@/data/services";

export default function QuoteFormCompact() {
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);

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
      <div className="rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 text-center">
        <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
        <h3 className="mt-3 font-display text-xl font-bold">Quote request received</h3>
        <p className="mt-2 text-sm text-slate-600">Our dispatch team will reach out within 30 minutes during business hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl bg-white p-5 md:p-6 shadow-2xl border border-slate-200">
      <h3 className="font-display text-xl font-extrabold text-brand-900">Instant Freight Quote</h3>
      <p className="text-xs text-slate-500 mt-1">Reply in under 30 minutes. No spam, ever.</p>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="form-label">Pickup ZIP</label>
          <input required className="form-input" placeholder="46373" />
        </div>
        <div>
          <label className="form-label">Delivery ZIP</label>
          <input required className="form-input" placeholder="75201" />
        </div>
        <div className="sm:col-span-2">
          <label className="form-label">Equipment Type</label>
          <select required className="form-select" defaultValue="">
            <option value="" disabled>Select equipment</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>{s.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="form-label">Weight (lbs)</label>
          <input className="form-input" placeholder="42,000" />
        </div>
        <div>
          <label className="form-label">Pickup Date</label>
          <input type="date" className="form-input" />
        </div>
        <div className="sm:col-span-2">
          <label className="form-label">Email</label>
          <input required type="email" className="form-input" placeholder="you@company.com" />
        </div>
        <div className="sm:col-span-2">
          <label className="form-label">Phone</label>
          <input required type="tel" className="form-input" placeholder="(555) 555-1234" />
        </div>
      </div>
      <button disabled={busy} className="btn-primary mt-5 w-full">
        {busy ? "Sending..." : "Get My Quote"}
      </button>
      <p className="mt-3 text-[11px] text-slate-500 text-center">
        By submitting you agree to receive freight-related contact from Earth Logistics Inc.
      </p>
    </form>
  );
}
