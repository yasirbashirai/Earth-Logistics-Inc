"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setSubmitted(true);
    }, 700);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow border border-slate-200 text-center">
        <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
        <h3 className="mt-3 font-display text-xl font-extrabold">Message sent</h3>
        <p className="mt-2 text-slate-600">We'll get back to you within 1 business hour, 24/7.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl bg-white p-6 md:p-8 shadow border border-slate-200">
      <h3 className="font-display text-2xl font-extrabold">Contact our team</h3>
      <p className="text-sm text-slate-500 mt-1">For dispatch emergencies call 855-456-4424 — we answer 24/7.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        <div>
          <label className="form-label">Your name</label>
          <input required className="form-input" />
        </div>
        <div>
          <label className="form-label">Company</label>
          <input className="form-input" />
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
          <label className="form-label">Subject</label>
          <select className="form-select" defaultValue="">
            <option value="" disabled>Select a topic</option>
            <option>New freight quote</option>
            <option>Carrier onboarding</option>
            <option>Shipper onboarding</option>
            <option>Freight agent program</option>
            <option>Billing / accounts payable</option>
            <option>Other</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="form-label">Message</label>
          <textarea required rows={5} className="form-textarea" />
        </div>
      </div>
      <button disabled={busy} className="btn-primary mt-5 w-full md:w-auto px-10">
        {busy ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
