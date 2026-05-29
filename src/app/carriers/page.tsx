import Link from "next/link";
import PageHero from "@/components/PageHero";
import JoinForm from "@/components/JoinForms";
import SectionHeader from "@/components/SectionHeader";
import CtaStrip from "@/components/CtaStrip";
import TrustBar from "@/components/TrustBar";
import { DollarSign, Clock, Award, Headphones, FileCheck2, Truck, FileSignature, ArrowRight, ShieldCheck, FileDown } from "lucide-react";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Carrier Join — Run with Earth Logistics Inc",
  description:
    "Join the Earth Logistics carrier network. Quick pay, factoring-friendly, 24/7 dispatch, $1.5M cargo coverage. Apply in 5 minutes.",
  path: "/carriers",
});

const perks = [
  { icon: DollarSign, t: "Top market rates", d: "Premium-paying lanes across dry van, flatbed, reefer, lowboy and bulk." },
  { icon: Clock, t: "Quick pay", d: "24-48 hr quick pay available — factoring partners welcome." },
  { icon: Headphones, t: "24/7 live dispatch", d: "Real people on the phone — no after-hours voicemail." },
  { icon: FileCheck2, t: "Fast onboarding", d: "MCS-90 verification, COI matching, 48-hour activation." },
  { icon: Truck, t: "Year-round freight", d: "Steady volume from manufacturing, construction, ag and energy shippers." },
  { icon: Award, t: "No forced dispatch", d: "Take loads you want — never get penalized for a polite decline." },
];

export default function CarriersPage() {
  return (
    <>
      <PageHero
        eyebrow="Carrier program"
        title="Run with a brokerage that respects drivers."
        subtitle="Top-paying lanes. 24/7 dispatch. Quick pay. No forced dispatch. Apply in 5 minutes — onboarded in 48 hours."
        image="https://images.unsplash.com/photo-1592805144716-feeccccef5ac?auto=format&fit=crop&w=1800&q=80"
      />

      <TrustBar />

      {/* Online onboarding banner */}
      <section className="relative overflow-hidden brand-gradient-strong text-white">
        <div className="absolute inset-0 opacity-15 bg-grid-dark pointer-events-none" />
        <div className="container-page relative py-10 md:py-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-xs font-bold uppercase tracking-widest">
              <FileSignature className="w-3.5 h-3.5" /> New — Online onboarding
            </div>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl mt-3 leading-tight">
              Complete the full New Carrier Set-up packet & sign the Broker / Carrier Agreement online.
            </h2>
            <p className="text-blue-100 mt-2 max-w-2xl text-sm md:text-base">
              No more PDFs, fax machines or emailed scans. Fill the set-up form, e-sign the agreement,
              and we'll have you activated within 48 hours.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-blue-100">
              <span className="inline-flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Legally binding e-signature (ESIGN Act)</span>
              <span className="opacity-50">·</span>
              <span>Auto-saved as you type</span>
              <span className="opacity-50">·</span>
              <span>Printable signed copy</span>
            </div>
          </div>
          <div className="md:col-span-4 flex flex-col md:items-end gap-3">
            <Link href="/carriers/onboarding" className="btn-primary text-base px-7 py-4 shine-on-hover bg-white !text-brand-700 hover:!text-brand-800">
              Start Carrier Onboarding <ArrowRight className="w-5 h-5" />
            </Link>
            <div className="flex flex-wrap gap-2 text-xs">
              <a
                href="/forms/Earth-Logistics-New-Carrier-Setup-Form.pdf"
                download
                className="inline-flex items-center gap-1.5 text-blue-100 hover:text-white font-bold border border-white/30 hover:border-white/60 px-3 py-1.5 rounded-md transition"
              >
                <FileDown className="w-3.5 h-3.5" /> Set-up Form (PDF)
              </a>
              <a
                href="/forms/Earth-Logistics-Broker-Carrier-Agreement.pdf"
                download
                className="inline-flex items-center gap-1.5 text-blue-100 hover:text-white font-bold border border-white/30 hover:border-white/60 px-3 py-1.5 rounded-md transition"
              >
                <FileDown className="w-3.5 h-3.5" /> Agreement (PDF)
              </a>
              <a
                href="/forms/Earth-Logistics-W9-Form.pdf"
                download
                className="inline-flex items-center gap-1.5 text-blue-100 hover:text-white font-bold border border-white/30 hover:border-white/60 px-3 py-1.5 rounded-md transition"
              >
                <FileDown className="w-3.5 h-3.5" /> W-9 Form (PDF)
              </a>
              <a
                href="/forms/Earth-Logistics-Workers-Comp-Waiver.pdf"
                download
                className="inline-flex items-center gap-1.5 text-blue-100 hover:text-white font-bold border border-white/30 hover:border-white/60 px-3 py-1.5 rounded-md transition"
              >
                <FileDown className="w-3.5 h-3.5" /> Workers' Comp Waiver (PDF)
              </a>
              <a
                href="/forms/Earth-Logistics-New-Carrier-Packet.pdf"
                download
                className="inline-flex items-center gap-1.5 text-blue-100 hover:text-white font-bold border border-white/30 hover:border-white/60 px-3 py-1.5 rounded-md transition"
              >
                <FileDown className="w-3.5 h-3.5" /> Full Packet (PDF)
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <SectionHeader eyebrow="Why carriers run with us" title="The carrier program operators actually want." />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {perks.map((p) => (
                <div key={p.t} className="flex gap-3 card">
                  <div className="shrink-0 w-10 h-10 rounded-lg brand-gradient text-white flex items-center justify-center">
                    <p.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-slate-900">{p.t}</div>
                    <div className="text-sm text-slate-600">{p.d}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl bg-brand-900 text-white p-8">
              <h3 className="font-display font-extrabold text-2xl">What you'll need to onboard</h3>
              <ul className="mt-4 space-y-2 text-slate-200 text-sm">
                <li>• Active MC and DOT numbers</li>
                <li>• $1M+ liability & $100k+ cargo insurance (COI required)</li>
                <li>• Clean FMCSA safety rating</li>
                <li>• Signed broker-carrier agreement & W-9</li>
                <li>• Factoring NOA (if applicable)</li>
              </ul>
              <Link
                href="/carriers/onboarding"
                className="mt-6 inline-flex items-center gap-2 bg-white text-brand-700 font-bold px-5 py-3 rounded-lg hover:bg-blue-50 shine-on-hover"
              >
                <FileSignature className="w-4 h-4" />
                Open online onboarding packet
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <JoinForm variant="carrier" />
          </div>
        </div>
      </section>

      <CtaStrip
        title="Ready to run with Earth Logistics?"
        subtitle="Submit your carrier packet now or call dispatch at 855-456-4424 — we'll get you on the road."
      />
    </>
  );
}
