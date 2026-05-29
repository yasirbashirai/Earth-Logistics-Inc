import PageHero from "@/components/PageHero";
import CarrierOnboarding from "@/components/CarrierOnboarding";
import { pageMeta } from "@/lib/seo";
import { ShieldCheck, FileSignature, Truck, FileDown, Mail, Printer, Sparkles } from "lucide-react";
import { company } from "@/data/company";

export const metadata = pageMeta({
  title: "Carrier Onboarding — New Carrier Set-up & Broker Agreement",
  description:
    "Complete your Earth Logistics carrier onboarding online or download the PDF forms. Fill the New Carrier Set-up form and sign the Approved Broker/Carrier Agreement in under 5 minutes.",
  path: "/carriers/onboarding",
  keywords: [
    "carrier onboarding",
    "new carrier set up form",
    "broker carrier agreement",
    "freight broker carrier signup",
    "Earth Logistics carrier",
    "carrier packet online",
    "carrier setup pdf",
    "broker carrier agreement pdf",
  ],
});

const PDF_FORMS = [
  {
    href: "/forms/Earth-Logistics-New-Carrier-Setup-Form.pdf",
    title: "New Carrier Set-up Form",
    desc: "Carrier identity, contacts, tractor & trailer details.",
    size: "2.0 MB · 1 page",
  },
  {
    href: "/forms/Earth-Logistics-Broker-Carrier-Agreement.pdf",
    title: "Approved Broker / Carrier Agreement",
    desc: "Full 12-section agreement — read, sign, and return.",
    size: "8.0 MB · 6 pages",
  },
  {
    href: "/forms/Earth-Logistics-W9-Form.pdf",
    title: "IRS Form W-9",
    desc: "Request for Taxpayer Identification Number & Certification.",
    size: "1.0 MB · 1 page",
  },
  {
    href: "/forms/Earth-Logistics-Workers-Comp-Waiver.pdf",
    title: "Worker's Compensation Waiver",
    desc: "Required where your company does not carry Workers' Comp.",
    size: "0.5 MB · 1 page",
  },
  {
    href: "/forms/Earth-Logistics-New-Carrier-Packet.pdf",
    title: "Full New Carrier Packet",
    desc: "Everything in one file — checklist, W-9 & Workers' Comp waiver.",
    size: "1.9 MB · 3 pages",
  },
];

export default function CarrierOnboardingPage() {
  return (
    <>
      <PageHero
        eyebrow="Carrier onboarding"
        title="New Carrier Set-up & Broker Agreement"
        subtitle="Two ways to onboard — complete the online packet in 5 minutes, or download the PDFs and return them by email."
        image="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1800&q=80"
      />

      {/* Three-step intro strip */}
      <section className="border-b border-slate-200 bg-white">
        <div className="container-page py-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { icon: Truck, t: "1. Set-up form", d: "Carrier identity, contacts, equipment." },
            { icon: FileSignature, t: "2. Sign the agreement", d: "Read & e-sign the Broker/Carrier Agreement." },
            { icon: ShieldCheck, t: "3. 48-hour activation", d: "We verify MC, DOT, COI & W-9 — then dispatch your first load." },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="flex items-start gap-4">
              <div className="shrink-0 w-11 h-11 rounded-xl brand-gradient text-white flex items-center justify-center shadow-md">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-display font-extrabold text-brand-900">{t}</div>
                <div className="text-sm text-slate-600 mt-0.5">{d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ Choose your path: ONLINE vs PDF ============ */}
      <section className="section bg-slate-50/50">
        <div className="container-page max-w-6xl">
          <div className="text-center mb-8">
            <div className="eyebrow">Choose your path</div>
            <h2 className="font-display font-extrabold text-brand-900 text-3xl md:text-4xl mt-2">
              Onboard online — or download the PDF forms.
            </h2>
            <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
              Both paths use the official Earth Logistics packet. The online flow is faster
              (auto-saves, e-signature, instant confirmation). The PDF path is there if you
              prefer to print and sign by hand.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* ---- Online card (primary) ---- */}
            <div className="relative rounded-2xl brand-gradient-strong text-white p-8 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 opacity-15 bg-grid-dark pointer-events-none" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-xs font-bold uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" /> Recommended
                </div>
                <h3 className="font-display font-extrabold text-2xl md:text-3xl mt-4">
                  Complete onboarding online
                </h3>
                <p className="text-blue-100 mt-2">
                  Step-by-step wizard with auto-save, scroll-tracked agreement and binding
                  ESIGN-Act electronic signature.
                </p>
                <ul className="mt-5 space-y-2 text-sm text-blue-50">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-300 shrink-0" />
                    Takes about 5 minutes — no printing, no scanning, no fax
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-300 shrink-0" />
                    Auto-saves to your browser if you get interrupted
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-300 shrink-0" />
                    Printable signed copy on completion
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-300 shrink-0" />
                    48-hour onboarding once we receive your COI &amp; W-9
                  </li>
                </ul>
                <a
                  href="#online-onboarding"
                  className="mt-6 inline-flex items-center gap-2 bg-white !text-brand-700 font-bold px-6 py-3.5 rounded-lg hover:bg-blue-50 shine-on-hover text-sm shadow-lg"
                >
                  <FileSignature className="w-4 h-4" />
                  Start online onboarding below
                </a>
              </div>
            </div>

            {/* ---- PDF card (secondary) ---- */}
            <div className="rounded-2xl bg-white border-2 border-slate-200 p-8 shadow-lg">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-widest">
                <FileDown className="w-3.5 h-3.5" /> Prefer paper?
              </div>
              <h3 className="font-display font-extrabold text-brand-900 text-2xl md:text-3xl mt-4">
                Download the PDF packet
              </h3>
              <p className="text-slate-600 mt-2">
                Print, fill in by hand, sign, and email or fax the completed packet back to us.
              </p>

              <div className="mt-5 space-y-3">
                {PDF_FORMS.map((f) => (
                  <a
                    key={f.href}
                    href={f.href}
                    download
                    className="group flex items-start gap-4 p-4 rounded-xl border-2 border-slate-200 hover:border-brand-300 hover:bg-brand-50/40 transition"
                  >
                    <div className="shrink-0 w-11 h-11 rounded-lg bg-brand-50 group-hover:bg-white group-hover:shadow-md flex items-center justify-center transition">
                      <FileDown className="w-5 h-5 text-brand-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-display font-bold text-slate-900 text-sm leading-tight">
                        {f.title}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">{f.desc}</div>
                      <div className="text-[11px] uppercase tracking-wider text-slate-400 mt-1.5 font-semibold">
                        PDF · {f.size}
                      </div>
                    </div>
                    <div className="shrink-0 text-xs font-bold text-brand-700 group-hover:underline self-center">
                      Download
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-5 pt-5 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-start gap-2.5 text-xs text-slate-600">
                  <Printer className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-800">Print &amp; sign</div>
                    Complete both forms in blue or black ink.
                  </div>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-600">
                  <Mail className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-800">Email back</div>
                    Send scanned copies + COI &amp; W-9 to{" "}
                    <a
                      href={company.emailHref}
                      className="text-brand-700 font-bold hover:underline"
                    >
                      {company.email}
                    </a>
                    .
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Online onboarding wizard ============ */}
      <section id="online-onboarding" className="section bg-slate-50/50 scroll-mt-24">
        <div className="container-page max-w-4xl">
          <CarrierOnboarding />
        </div>
      </section>
    </>
  );
}
