"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { submitForm, formToObject } from "@/lib/forms";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await submitForm("contact", formToObject(e.currentTarget));
    setBusy(false);
    if (res.ok) {
      setSubmitted(true);
    } else {
      setError(res.error || "Something went wrong. Please call 855-456-4424.");
    }
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
      {/* Honeypot — hidden from humans, catches bots */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        <div>
          <label className="form-label">Your name</label>
          <input name="name" required className="form-input" />
        </div>
        <div>
          <label className="form-label">Company</label>
          <input name="company" className="form-input" />
        </div>
        <div>
          <label className="form-label">Email</label>
          <input name="email" required type="email" className="form-input" />
        </div>
        <div>
          <label className="form-label">Phone</label>
          <input name="phone" required type="tel" className="form-input" />
        </div>
        <div className="md:col-span-2">
          <label className="form-label">Subject</label>
          <select name="subject" className="form-select" defaultValue="">
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
          <textarea name="message" required rows={5} className="form-textarea" />
        </div>
      </div>
      {error && (
        <div className="mt-4 flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
      <button disabled={busy} className="btn-primary mt-5 w-full md:w-auto px-10">
        {busy ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
