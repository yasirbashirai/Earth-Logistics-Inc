"use client";

/**
 * Earth Logistics Inc — Carrier Onboarding flow
 *
 * 3-step wizard:
 *   1. New Carrier Set-up Form  (matches NewCarrierSetUpform.pdf 1:1)
 *   2. Approved Broker / Carrier Agreement — read + typed e-signature
 *   3. Review & Submit
 *
 * Submissions:
 *   - Saved to localStorage on every step (so refresh never loses progress).
 *   - Posted to NEXT_PUBLIC_CARRIER_ONBOARDING_ENDPOINT if set (Formspree-compatible).
 *   - Falls back to a pre-populated mailto: to company.email.
 *   - Always renders a printable record on the success screen.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  FileSignature,
  ShieldCheck,
  Printer,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { brokerCarrierAgreement } from "@/data/brokerCarrierAgreement";
import { company } from "@/data/company";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type TrailerKey =
  | "endDumpAluminum"
  | "endDumpSteel"
  | "hopperBottom"
  | "beltWalkingFloor"
  | "flatbed"
  | "dryVan"
  | "straightTandemTriaxleDump"
  | "straightQuadQuintDump";

interface TrailerLine {
  selected: boolean;
  qty: string;
  length: string;
  width: string;
  height: string;
}

interface OnboardingState {
  // Carrier identity
  carrierName: string;
  address: string;
  cityStateZip: string;
  mc: string;
  dot: string;
  primaryContactName: string;
  primaryPhone: string;
  primaryEmail: string;
  secondaryContact: string;
  secondaryPhone: string;
  secondaryEmail: string;

  // Equipment
  tractorCount: string;
  sleeper: "Y" | "N" | "";
  trailers: Record<TrailerKey, TrailerLine>;

  // Agreement / signature
  agreementRead: boolean;
  agreementAccepted: boolean;
  signaturePrintName: string;
  signatureTitle: string;
  signatureTyped: string;
  signatureDate: string;
}

const TRAILER_TYPES: { key: TrailerKey; label: string; hasDims: boolean }[] = [
  { key: "endDumpAluminum", label: "End Dump — Aluminum", hasDims: true },
  { key: "endDumpSteel", label: "End Dump — Steel", hasDims: true },
  { key: "hopperBottom", label: "Hopper Bottom", hasDims: true },
  { key: "beltWalkingFloor", label: "Belt / Walking Floor", hasDims: true },
  { key: "flatbed", label: "Flatbed", hasDims: true },
  { key: "dryVan", label: "Dry Van", hasDims: true },
  { key: "straightTandemTriaxleDump", label: "Straight Tandem / Triaxle Dump", hasDims: false },
  { key: "straightQuadQuintDump", label: "Straight Quad / Quint Dump", hasDims: false },
];

const emptyTrailer = (): TrailerLine => ({
  selected: false,
  qty: "",
  length: "",
  width: "",
  height: "",
});

const initialState = (): OnboardingState => ({
  carrierName: "",
  address: "",
  cityStateZip: "",
  mc: "",
  dot: "",
  primaryContactName: "",
  primaryPhone: "",
  primaryEmail: "",
  secondaryContact: "",
  secondaryPhone: "",
  secondaryEmail: "",
  tractorCount: "",
  sleeper: "",
  trailers: TRAILER_TYPES.reduce(
    (acc, t) => ({ ...acc, [t.key]: emptyTrailer() }),
    {} as Record<TrailerKey, TrailerLine>,
  ),
  agreementRead: false,
  agreementAccepted: false,
  signaturePrintName: "",
  signatureTitle: "",
  signatureTyped: "",
  signatureDate: "",
});

const STORAGE_KEY = "eli_carrier_onboarding_v1";

// Posts to the PHP mail handler shipped in /api on the production server.
// A pre-filled mailto: still fires automatically if the POST ever fails.
const SUBMIT_ENDPOINT =
  process.env.NEXT_PUBLIC_CARRIER_ONBOARDING_ENDPOINT || "/api/carrier.php";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CarrierOnboarding() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [data, setData] = useState<OnboardingState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  // Hydrate from localStorage once.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          setData({ ...initialState(), ...parsed });
        }
      }
    } catch {
      /* ignore corrupt storage */
    }
    // Default signature date to today (ISO) if blank — set after hydration.
    setData((d) =>
      d.signatureDate
        ? d
        : { ...d, signatureDate: new Date().toISOString().slice(0, 10) },
    );
  }, []);

  // Persist on every change.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* ignore quota errors */
    }
  }, [data]);

  // ---- Field helpers ------------------------------------------------------
  const update = useCallback(
    <K extends keyof OnboardingState>(key: K, value: OnboardingState[K]) => {
      setData((d) => ({ ...d, [key]: value }));
      setErrors((e) => {
        if (!(key in e)) return e;
        const { [key as string]: _omit, ...rest } = e;
        return rest;
      });
    },
    [],
  );

  const updateTrailer = useCallback(
    (k: TrailerKey, field: keyof TrailerLine, value: string | boolean) => {
      setData((d) => ({
        ...d,
        trailers: {
          ...d.trailers,
          [k]: { ...d.trailers[k], [field]: value },
        },
      }));
    },
    [],
  );

  // ---- Validation per step ------------------------------------------------
  const validateStep1 = (): boolean => {
    const e: Record<string, string> = {};
    if (!data.carrierName.trim()) e.carrierName = "Required";
    if (!data.address.trim()) e.address = "Required";
    if (!data.cityStateZip.trim()) e.cityStateZip = "Required";
    if (!data.mc.trim()) e.mc = "MC# required";
    if (!data.dot.trim()) e.dot = "DOT# required";
    if (!data.primaryContactName.trim()) e.primaryContactName = "Required";
    if (!data.primaryPhone.trim()) e.primaryPhone = "Required";
    if (!data.primaryEmail.trim()) e.primaryEmail = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.primaryEmail))
      e.primaryEmail = "Invalid email";
    if (!data.tractorCount.trim()) e.tractorCount = "Required";
    if (!data.sleeper) e.sleeper = "Select Y / N";

    const anyTrailer = Object.values(data.trailers).some((t) => t.selected);
    if (!anyTrailer) e.trailers = "Select at least one trailer type";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = (): boolean => {
    const e: Record<string, string> = {};
    if (!data.agreementRead) e.agreementRead = "Confirm you have read the agreement";
    if (!data.agreementAccepted)
      e.agreementAccepted = "You must accept the agreement to continue";
    if (!data.signaturePrintName.trim()) e.signaturePrintName = "Required";
    if (!data.signatureTitle.trim()) e.signatureTitle = "Required";
    if (!data.signatureTyped.trim()) e.signatureTyped = "Type your full name as signature";
    else if (
      data.signaturePrintName.trim().toLowerCase() !==
      data.signatureTyped.trim().toLowerCase()
    )
      e.signatureTyped = "Signature must match printed name";
    if (!data.signatureDate.trim()) e.signatureDate = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep((s) => (Math.min(4, s + 1) as 1 | 2 | 3 | 4));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setStep((s) => (Math.max(1, s - 1) as 1 | 2 | 3 | 4));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ---- Submission ---------------------------------------------------------
  const buildPayload = () => {
    const trailers = TRAILER_TYPES.filter((t) => data.trailers[t.key].selected).map(
      (t) => {
        const row = data.trailers[t.key];
        return {
          type: t.label,
          qty: row.qty,
          ...(t.hasDims
            ? { length: row.length, width: row.width, height: row.height }
            : {}),
        };
      },
    );
    return {
      submittedAt: new Date().toISOString(),
      formType: "carrier-onboarding",
      carrier: {
        carrierName: data.carrierName,
        address: data.address,
        cityStateZip: data.cityStateZip,
        mc: data.mc,
        dot: data.dot,
        primaryContactName: data.primaryContactName,
        primaryPhone: data.primaryPhone,
        primaryEmail: data.primaryEmail,
        secondaryContact: data.secondaryContact,
        secondaryPhone: data.secondaryPhone,
        secondaryEmail: data.secondaryEmail,
      },
      equipment: {
        tractorCount: data.tractorCount,
        sleeper: data.sleeper,
        trailers,
      },
      agreement: {
        version: "ELI-BCA-2026-01",
        title: brokerCarrierAgreement.title,
        accepted: data.agreementAccepted,
        readConfirmed: data.agreementRead,
        signaturePrintName: data.signaturePrintName,
        signatureTitle: data.signatureTitle,
        signatureTyped: data.signatureTyped,
        signatureDate: data.signatureDate,
      },
    };
  };

  const submit = async () => {
    setSubmitting(true);
    setSubmitError(null);

    const payload = buildPayload();
    const refId = `ELI-${Date.now().toString(36).toUpperCase()}`;

    // Always cache the completed packet client-side so the carrier (and Yasir)
    // never lose it if the network call fails.
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          `${STORAGE_KEY}_submitted_${refId}`,
          JSON.stringify(payload),
        );
      }
    } catch {
      /* ignore */
    }

    let posted = false;
    if (SUBMIT_ENDPOINT) {
      try {
        const res = await fetch(SUBMIT_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...payload, referenceId: refId }),
        });
        posted = res.ok;
        if (!res.ok) {
          setSubmitError(
            `Submission service returned ${res.status}. We've saved your packet — please call dispatch at ${company.phone} so we can pick it up manually.`,
          );
        }
      } catch (err) {
        setSubmitError(
          "Network error during submission. Your packet is saved locally — we'll capture it via the email fallback now.",
        );
      }
    }

    setReferenceId(refId);
    setSubmitting(false);
    setStep(4);

    // Always fire a mailto fallback when no endpoint is configured OR when the
    // POST failed. This guarantees the broker receives the packet even on a
    // static export hosted on plain Apache (the current deploy target).
    if (!SUBMIT_ENDPOINT || !posted) {
      try {
        const subject = `Carrier Onboarding — ${data.carrierName} (MC ${data.mc})`;
        const body = buildMailtoBody(payload, refId);
        const url = `mailto:${company.email}?subject=${encodeURIComponent(
          subject,
        )}&body=${encodeURIComponent(body)}`;
        // Open in a new tab so we don't navigate away from the success screen.
        if (typeof window !== "undefined") {
          const a = document.createElement("a");
          a.href = url;
          a.target = "_blank";
          a.rel = "noopener";
          a.click();
        }
      } catch {
        /* ignore */
      }
    }

    // Clear the in-progress draft now that it's been submitted.
    try {
      if (typeof window !== "undefined") window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  // ---- Print --------------------------------------------------------------
  const printableRef = useRef<HTMLDivElement>(null);
  const handlePrint = () => {
    if (typeof window === "undefined") return;
    window.print();
  };

  // ---- Render -------------------------------------------------------------

  return (
    <div className="w-full">
      <StepIndicator step={step} />

      {step === 1 && (
        <StepCard
          icon={ClipboardList}
          title="New Carrier Set-up Form"
          subtitle="The official Earth Logistics carrier packet. Takes about 4 minutes."
        >
          <Step1Fields data={data} errors={errors} update={update} updateTrailer={updateTrailer} />
          <Footer
            onNext={goNext}
            nextLabel="Continue to Agreement"
            disabledNext={false}
          />
        </StepCard>
      )}

      {step === 2 && (
        <StepCard
          icon={FileSignature}
          title="Approved Broker / Carrier Agreement"
          subtitle="Read in full, then provide your authorized e-signature. A copy is emailed back to you on submit."
        >
          <Step2Agreement data={data} errors={errors} update={update} />
          <Footer onBack={goBack} onNext={goNext} nextLabel="Review packet" />
        </StepCard>
      )}

      {step === 3 && (
        <StepCard
          icon={ShieldCheck}
          title="Review & Submit"
          subtitle="Confirm everything is accurate. We process onboarding within 48 hours."
        >
          <Step3Review data={data} />
          {submitError && (
            <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 flex gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <div>{submitError}</div>
            </div>
          )}
          <Footer
            onBack={goBack}
            onNext={submit}
            nextLabel={submitting ? "Submitting…" : "Submit Carrier Packet"}
            disabledNext={submitting}
            submitting={submitting}
          />
        </StepCard>
      )}

      {step === 4 && (
        <StepCard
          icon={CheckCircle2}
          title="Packet received — welcome to the network."
          subtitle={
            referenceId
              ? `Reference ${referenceId}. A senior team member will call you within one business day to finalize onboarding.`
              : "A senior team member will call you within one business day to finalize onboarding."
          }
          accent="emerald"
        >
          <Step4Success data={data} referenceId={referenceId} onPrint={handlePrint} />
          <div ref={printableRef} className="print-only">
            <PrintableAgreement data={data} referenceId={referenceId} />
          </div>
        </StepCard>
      )}

      {/* Print stylesheet — only renders the printable record on window.print(). */}
      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          .print-only, .print-only * { visibility: visible; }
          .print-only { position: absolute; left: 0; top: 0; width: 100%; }
        }
        .print-only { display: none; }
        @media print {
          .print-only { display: block; }
        }
      `}</style>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step indicator
// ---------------------------------------------------------------------------

function StepIndicator({ step }: { step: 1 | 2 | 3 | 4 }) {
  const labels = [
    { n: 1, label: "Set-up form" },
    { n: 2, label: "Agreement" },
    { n: 3, label: "Review" },
    { n: 4, label: "Done" },
  ];
  return (
    <ol className="flex items-center gap-2 sm:gap-3 mb-8">
      {labels.map((l, i) => {
        const active = step === l.n;
        const done = step > l.n;
        return (
          <li key={l.n} className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <div
              className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition ${
                done
                  ? "bg-emerald-500 text-white"
                  : active
                    ? "brand-gradient text-white shadow-lg"
                    : "bg-slate-100 text-slate-500"
              }`}
            >
              {done ? <CheckCircle2 className="w-4 h-4" /> : l.n}
            </div>
            <div
              className={`text-xs sm:text-sm font-semibold truncate ${
                active ? "text-brand-700" : done ? "text-emerald-600" : "text-slate-400"
              }`}
            >
              {l.label}
            </div>
            {i < labels.length - 1 && (
              <div
                className={`hidden sm:block flex-1 h-0.5 rounded ${
                  done ? "bg-emerald-400" : "bg-slate-200"
                }`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

// ---------------------------------------------------------------------------
// StepCard shell
// ---------------------------------------------------------------------------

function StepCard({
  icon: Icon,
  title,
  subtitle,
  children,
  accent,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  accent?: "emerald";
}) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden">
      <div
        className={`px-6 sm:px-10 py-7 ${
          accent === "emerald"
            ? "bg-gradient-to-r from-emerald-500 to-emerald-600"
            : "brand-gradient-strong"
        } text-white`}
      >
        <div className="flex items-start gap-4">
          <div className="shrink-0 w-12 h-12 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center">
            <Icon className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl leading-tight">
              {title}
            </h2>
            <p className="text-blue-100 text-sm sm:text-base mt-1">{subtitle}</p>
          </div>
        </div>
      </div>
      <div className="px-6 sm:px-10 py-8">{children}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 1 — Carrier set-up fields (1:1 with PDF)
// ---------------------------------------------------------------------------

function Step1Fields({
  data,
  errors,
  update,
  updateTrailer,
}: {
  data: OnboardingState;
  errors: Record<string, string>;
  update: <K extends keyof OnboardingState>(key: K, value: OnboardingState[K]) => void;
  updateTrailer: (k: TrailerKey, field: keyof TrailerLine, value: string | boolean) => void;
}) {
  return (
    <div className="space-y-10">
      {/* ===== Carrier identity ===== */}
      <section>
        <SectionLabel n="1" title="Carrier information" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          <Field label="Carrier Name" required error={errors.carrierName} full>
            <input
              className="form-input"
              value={data.carrierName}
              onChange={(e) => update("carrierName", e.target.value)}
              placeholder="Legal name on the operating authority"
            />
          </Field>
          <Field label="Address" required error={errors.address} full>
            <input
              className="form-input"
              value={data.address}
              onChange={(e) => update("address", e.target.value)}
              placeholder="Street address"
            />
          </Field>
          <Field label="City / State / Zip" required error={errors.cityStateZip}>
            <input
              className="form-input"
              value={data.cityStateZip}
              onChange={(e) => update("cityStateZip", e.target.value)}
              placeholder="Indianapolis, IN 46204"
            />
          </Field>
          <Field label="MC# / DOT#" required error={errors.mc || errors.dot}>
            <div className="grid grid-cols-2 gap-3">
              <input
                className="form-input"
                value={data.mc}
                onChange={(e) => update("mc", e.target.value)}
                placeholder="MC#"
                inputMode="numeric"
              />
              <input
                className="form-input"
                value={data.dot}
                onChange={(e) => update("dot", e.target.value)}
                placeholder="DOT#"
                inputMode="numeric"
              />
            </div>
          </Field>

          <Field label="Primary Contact Name" required error={errors.primaryContactName}>
            <input
              className="form-input"
              value={data.primaryContactName}
              onChange={(e) => update("primaryContactName", e.target.value)}
            />
          </Field>
          <Field label="Primary Phone #" required error={errors.primaryPhone}>
            <input
              type="tel"
              className="form-input"
              value={data.primaryPhone}
              onChange={(e) => update("primaryPhone", e.target.value)}
            />
          </Field>
          <Field label="Email Address" required error={errors.primaryEmail} full>
            <input
              type="email"
              className="form-input"
              value={data.primaryEmail}
              onChange={(e) => update("primaryEmail", e.target.value)}
              placeholder="dispatch@yourcompany.com"
            />
          </Field>

          <Field label="Secondary Contact">
            <input
              className="form-input"
              value={data.secondaryContact}
              onChange={(e) => update("secondaryContact", e.target.value)}
            />
          </Field>
          <Field label="Phone #">
            <input
              type="tel"
              className="form-input"
              value={data.secondaryPhone}
              onChange={(e) => update("secondaryPhone", e.target.value)}
            />
          </Field>
          <Field label="Email Address" full>
            <input
              type="email"
              className="form-input"
              value={data.secondaryEmail}
              onChange={(e) => update("secondaryEmail", e.target.value)}
            />
          </Field>
        </div>
      </section>

      {/* ===== Equipment ===== */}
      <section>
        <SectionLabel n="2" title="Equipment" />

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Field label="Tractor(s) — How Many?" required error={errors.tractorCount}>
            <input
              type="number"
              min={0}
              className="form-input"
              value={data.tractorCount}
              onChange={(e) => update("tractorCount", e.target.value)}
            />
          </Field>
          <div className="sm:col-span-2">
            <label className="form-label">Sleeper *</label>
            <div className="flex gap-3">
              {(["Y", "N"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => update("sleeper", v)}
                  className={`flex-1 px-4 py-3 rounded-xl border-2 font-bold transition ${
                    data.sleeper === v
                      ? "border-brand-600 bg-brand-50 text-brand-700"
                      : "border-slate-300 text-slate-600 hover:border-brand-300"
                  }`}
                >
                  {v === "Y" ? "Yes" : "No"}
                </button>
              ))}
            </div>
            {errors.sleeper && <div className="form-error">{errors.sleeper}</div>}
          </div>
        </div>

        <div className="mt-8">
          <div className="font-display font-bold text-brand-900 text-lg">Trailer(s)</div>
          <p className="text-sm text-slate-600 mt-1">
            Select all trailer types you operate, then enter quantity and (where applicable)
            length / width / height in feet.
          </p>
          {errors.trailers && <div className="form-error mt-2">{errors.trailers}</div>}

          <div className="mt-5 rounded-2xl border border-slate-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th className="text-left font-bold uppercase tracking-wider text-xs py-3 px-4 w-2/5">
                    Trailer
                  </th>
                  <th className="text-left font-bold uppercase tracking-wider text-xs py-3 px-2 w-24">
                    How many
                  </th>
                  <th className="text-left font-bold uppercase tracking-wider text-xs py-3 px-2">
                    Length / Width / Height (ft)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {TRAILER_TYPES.map((t) => {
                  const row = data.trailers[t.key];
                  return (
                    <tr key={t.key} className={row.selected ? "bg-brand-50/40" : "bg-white"}>
                      <td className="py-3 px-4">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={row.selected}
                            onChange={(e) =>
                              updateTrailer(t.key, "selected", e.target.checked)
                            }
                            className="w-4 h-4 accent-brand-600"
                          />
                          <span className="font-semibold text-slate-800">{t.label}</span>
                        </label>
                      </td>
                      <td className="py-3 px-2">
                        <input
                          type="number"
                          min={0}
                          disabled={!row.selected}
                          value={row.qty}
                          onChange={(e) => updateTrailer(t.key, "qty", e.target.value)}
                          className="form-input py-2 px-2 text-sm disabled:bg-slate-50 disabled:text-slate-400"
                        />
                      </td>
                      <td className="py-3 px-2">
                        {t.hasDims ? (
                          <div className="grid grid-cols-3 gap-2">
                            <input
                              disabled={!row.selected}
                              value={row.length}
                              onChange={(e) =>
                                updateTrailer(t.key, "length", e.target.value)
                              }
                              placeholder="L"
                              className="form-input py-2 px-2 text-sm disabled:bg-slate-50 disabled:text-slate-400"
                            />
                            <input
                              disabled={!row.selected}
                              value={row.width}
                              onChange={(e) =>
                                updateTrailer(t.key, "width", e.target.value)
                              }
                              placeholder="W"
                              className="form-input py-2 px-2 text-sm disabled:bg-slate-50 disabled:text-slate-400"
                            />
                            <input
                              disabled={!row.selected}
                              value={row.height}
                              onChange={(e) =>
                                updateTrailer(t.key, "height", e.target.value)
                              }
                              placeholder="H"
                              className="form-input py-2 px-2 text-sm disabled:bg-slate-50 disabled:text-slate-400"
                            />
                          </div>
                        ) : (
                          <span className="text-slate-400 text-xs italic">N/A</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 2 — Broker/Carrier Agreement + e-signature
// ---------------------------------------------------------------------------

function Step2Agreement({
  data,
  errors,
  update,
}: {
  data: OnboardingState;
  errors: Record<string, string>;
  update: <K extends keyof OnboardingState>(key: K, value: OnboardingState[K]) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handler = () => {
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 12) {
        setScrolledToBottom(true);
      }
    };
    el.addEventListener("scroll", handler);
    return () => el.removeEventListener("scroll", handler);
  }, []);

  const introFilled = useMemo(() => {
    return brokerCarrierAgreement.intro
      .replace("{{carrierName}}", data.carrierName || "_______________________")
      .replace("{{dot}}", data.dot || "________")
      .replace("{{mc}}", data.mc || "________");
  }, [data.carrierName, data.dot, data.mc]);

  return (
    <div className="space-y-8">
      <div>
        <div className="text-sm text-slate-600 mb-3">
          Please read the agreement in full. The scroll position is tracked — you must reach
          the bottom before confirming. Carrier name, MC# and DOT# are auto-filled from Step 1.
        </div>
        <div
          ref={scrollRef}
          className="h-[420px] sm:h-[520px] overflow-y-auto rounded-xl border-2 border-slate-200 bg-slate-50/50 p-6 text-sm leading-relaxed text-slate-800"
        >
          <div className="text-center mb-6">
            <div className="font-display font-extrabold text-brand-900 text-xl">
              EARTH LOGISTICS INC.
            </div>
            <div className="text-xs uppercase tracking-widest text-slate-500 mt-1">
              Revolving Freight Globally 24/7
            </div>
            <div className="font-display font-bold text-lg mt-3 text-slate-900">
              {brokerCarrierAgreement.title.toUpperCase()} CLAUSE
            </div>
          </div>
          <p className="mb-5 whitespace-pre-line">{introFilled}</p>
          {brokerCarrierAgreement.sections.map((s) => (
            <div key={s.n} className="mb-5">
              <div className="font-bold text-brand-900">
                {s.n}. {s.heading}.
              </div>
              <p className="mt-1 whitespace-pre-line">{s.body}</p>
            </div>
          ))}
          <div className="mt-8 pt-6 border-t border-slate-300 text-xs text-slate-500">
            Continue scrolling to the bottom to enable the acceptance checkboxes. Your typed
            signature below is a binding electronic signature pursuant to the U.S. ESIGN Act.
          </div>
        </div>
        {!scrolledToBottom && (
          <div className="mt-2 text-xs text-amber-700 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5" /> Scroll to the end of the agreement to unlock acceptance.
          </div>
        )}
      </div>

      {/* Acceptance */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
        <label
          className={`flex items-start gap-3 ${
            !scrolledToBottom ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <input
            type="checkbox"
            disabled={!scrolledToBottom}
            checked={data.agreementRead}
            onChange={(e) => update("agreementRead", e.target.checked)}
            className="mt-1 w-5 h-5 accent-brand-600"
          />
          <span className="text-sm text-slate-700">
            I confirm that I have read the Approved Broker / Carrier Agreement in full.
          </span>
        </label>
        {errors.agreementRead && <div className="form-error">{errors.agreementRead}</div>}

        <label
          className={`flex items-start gap-3 ${
            !scrolledToBottom ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <input
            type="checkbox"
            disabled={!scrolledToBottom}
            checked={data.agreementAccepted}
            onChange={(e) => update("agreementAccepted", e.target.checked)}
            className="mt-1 w-5 h-5 accent-brand-600"
          />
          <span className="text-sm text-slate-700">
            I agree to be bound by all terms and conditions of this Agreement, and I represent
            that I have the authority to enter into legally binding contracts on behalf of the
            carrier named above.
          </span>
        </label>
        {errors.agreementAccepted && (
          <div className="form-error">{errors.agreementAccepted}</div>
        )}
      </div>

      {/* Signature block */}
      <div>
        <SectionLabel n="✎" title="Authorized e-signature" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          <Field label="Printed Name" required error={errors.signaturePrintName}>
            <input
              className="form-input"
              value={data.signaturePrintName}
              onChange={(e) => update("signaturePrintName", e.target.value)}
              placeholder="Full legal name of signatory"
            />
          </Field>
          <Field label="Title / Role" required error={errors.signatureTitle}>
            <input
              className="form-input"
              value={data.signatureTitle}
              onChange={(e) => update("signatureTitle", e.target.value)}
              placeholder="Owner, President, etc."
            />
          </Field>
          <Field label="Type signature (must match printed name)" required error={errors.signatureTyped} full>
            <input
              className="form-input font-display italic text-lg"
              value={data.signatureTyped}
              onChange={(e) => update("signatureTyped", e.target.value)}
              placeholder="Type your full name to sign"
              autoComplete="off"
            />
          </Field>
          <Field label="Date" required error={errors.signatureDate}>
            <input
              type="date"
              className="form-input"
              value={data.signatureDate}
              onChange={(e) => update("signatureDate", e.target.value)}
            />
          </Field>
        </div>
        <div className="mt-3 text-xs text-slate-500">
          By typing your name and submitting this form, you are creating a legally binding
          electronic signature pursuant to the U.S. ESIGN Act (15 U.S.C. § 7001 et seq.).
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 3 — Review
// ---------------------------------------------------------------------------

function Step3Review({ data }: { data: OnboardingState }) {
  const selectedTrailers = TRAILER_TYPES.filter((t) => data.trailers[t.key].selected);
  return (
    <div className="space-y-8">
      <ReviewSection title="Carrier">
        <KV k="Carrier Name" v={data.carrierName} />
        <KV k="Address" v={data.address} />
        <KV k="City / State / Zip" v={data.cityStateZip} />
        <KV k="MC# / DOT#" v={`${data.mc} / ${data.dot}`} />
        <KV k="Primary Contact" v={`${data.primaryContactName} · ${data.primaryPhone} · ${data.primaryEmail}`} />
        {(data.secondaryContact || data.secondaryPhone || data.secondaryEmail) && (
          <KV k="Secondary Contact" v={`${data.secondaryContact} · ${data.secondaryPhone} · ${data.secondaryEmail}`} />
        )}
      </ReviewSection>

      <ReviewSection title="Equipment">
        <KV k="Tractors" v={`${data.tractorCount} (sleeper: ${data.sleeper === "Y" ? "Yes" : "No"})`} />
        <div className="pt-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Trailers
          </div>
          <ul className="mt-2 space-y-1 text-sm">
            {selectedTrailers.map((t) => {
              const r = data.trailers[t.key];
              return (
                <li key={t.key} className="flex items-baseline gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-500 shrink-0" />
                  <span className="font-semibold text-slate-800">{t.label}</span>
                  <span className="text-slate-600">— qty {r.qty || "—"}</span>
                  {t.hasDims && (r.length || r.width || r.height) && (
                    <span className="text-slate-500">
                      ({r.length || "?"} × {r.width || "?"} × {r.height || "?"} ft)
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </ReviewSection>

      <ReviewSection title="Agreement & e-signature">
        <KV k="Agreement" v={`${brokerCarrierAgreement.title} (v. ELI-BCA-2026-01)`} />
        <KV k="Accepted" v={data.agreementAccepted ? "Yes — all terms accepted" : "No"} />
        <KV k="Signed by" v={`${data.signaturePrintName}, ${data.signatureTitle}`} />
        <KV k="Signature" v={data.signatureTyped} mono />
        <KV k="Date" v={data.signatureDate} />
      </ReviewSection>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 4 — Success
// ---------------------------------------------------------------------------

function Step4Success({
  data,
  referenceId,
  onPrint,
}: {
  data: OnboardingState;
  referenceId: string | null;
  onPrint: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-5 text-sm text-emerald-900">
        <div className="font-bold mb-1">What happens next</div>
        <ul className="list-disc list-inside space-y-1">
          <li>Our team verifies MC / DOT, COI and W-9 (typical turnaround: 24–48 hours).</li>
          <li>You'll receive a confirmation email at <b>{data.primaryEmail}</b> with the signed agreement.</li>
          <li>Once cleared, dispatch will reach out with available loads on your lanes.</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button onClick={onPrint} className="btn-secondary">
          <Printer className="w-4 h-4" /> Print / Save signed packet
        </button>
        <a href={`tel:${company.phoneHref.replace("tel:", "")}`} className="btn-outline">
          Call dispatch · {company.phone}
        </a>
        <a href="/carriers" className="btn-outline">
          Back to Carrier page
        </a>
      </div>

      {referenceId && (
        <div className="text-xs text-slate-500">
          Reference ID: <span className="font-mono font-bold">{referenceId}</span> — quote
          this when speaking to our team.
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Printable agreement (rendered to the print sheet only)
// ---------------------------------------------------------------------------

function PrintableAgreement({
  data,
  referenceId,
}: {
  data: OnboardingState;
  referenceId: string | null;
}) {
  const introFilled = brokerCarrierAgreement.intro
    .replace("{{carrierName}}", data.carrierName)
    .replace("{{dot}}", data.dot)
    .replace("{{mc}}", data.mc);
  return (
    <div className="p-10 text-sm leading-relaxed text-slate-900 font-body">
      <div className="text-center mb-6">
        <div className="font-display font-extrabold text-2xl">EARTH LOGISTICS INC.</div>
        <div className="text-xs uppercase tracking-widest">Revolving Freight Globally 24/7</div>
        <div className="text-xs mt-1">
          {company.address} · {company.phone} · {company.email}
        </div>
        <div className="font-display font-bold text-lg mt-4">
          NEW CARRIER SET-UP & APPROVED BROKER / CARRIER AGREEMENT
        </div>
        {referenceId && (
          <div className="text-xs mt-1">
            Reference: <span className="font-mono">{referenceId}</span> · Submitted{" "}
            {new Date().toLocaleString()}
          </div>
        )}
      </div>

      <h3 className="font-bold border-b pb-1 mb-2">Carrier set-up</h3>
      <table className="w-full text-xs mb-6">
        <tbody>
          <PrintRow k="Carrier Name" v={data.carrierName} />
          <PrintRow k="Address" v={data.address} />
          <PrintRow k="City / State / Zip" v={data.cityStateZip} />
          <PrintRow k="MC# / DOT#" v={`${data.mc} / ${data.dot}`} />
          <PrintRow k="Primary Contact" v={`${data.primaryContactName} · ${data.primaryPhone} · ${data.primaryEmail}`} />
          <PrintRow
            k="Secondary Contact"
            v={[data.secondaryContact, data.secondaryPhone, data.secondaryEmail]
              .filter(Boolean)
              .join(" · ") || "—"}
          />
          <PrintRow k="Tractors" v={`${data.tractorCount} (Sleeper: ${data.sleeper})`} />
          <PrintRow
            k="Trailers"
            v={TRAILER_TYPES.filter((t) => data.trailers[t.key].selected)
              .map((t) => {
                const r = data.trailers[t.key];
                const dims = t.hasDims ? ` (${r.length}×${r.width}×${r.height})` : "";
                return `${t.label} ×${r.qty}${dims}`;
              })
              .join("; ") || "—"}
          />
        </tbody>
      </table>

      <h3 className="font-bold border-b pb-1 mb-2">Approved Broker / Carrier Agreement</h3>
      <p className="mb-3">{introFilled}</p>
      {brokerCarrierAgreement.sections.map((s) => (
        <div key={s.n} className="mb-3 text-xs">
          <div className="font-bold">{s.n}. {s.heading}.</div>
          <p>{s.body}</p>
        </div>
      ))}

      <div className="mt-10 grid grid-cols-2 gap-10 pt-6 border-t">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider">CARRIER</div>
          <div className="mt-3 font-display italic text-xl border-b border-slate-400 pb-1">
            {data.signatureTyped}
          </div>
          <div className="mt-2 text-xs">
            <div>By: {data.signaturePrintName}</div>
            <div>Title: {data.signatureTitle}</div>
            <div>Date: {data.signatureDate}</div>
          </div>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-wider">BROKER</div>
          <div className="mt-3 font-display italic text-xl border-b border-slate-400 pb-1">
            Earth Logistics Inc.
          </div>
          <div className="mt-2 text-xs">
            <div>By: ____________________</div>
            <div>Title: ____________________</div>
            <div>Date: ____________________</div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-[10px] text-slate-500">
        This document was signed electronically pursuant to the U.S. ESIGN Act (15 U.S.C.
        § 7001 et seq.). Reference {referenceId}. Generated by earthlogistics247.com.
      </div>
    </div>
  );
}

function PrintRow({ k, v }: { k: string; v: string }) {
  return (
    <tr>
      <td className="font-bold align-top py-1 pr-3 w-44">{k}</td>
      <td className="py-1">{v || "—"}</td>
    </tr>
  );
}

// ---------------------------------------------------------------------------
// Mailto fallback body
// ---------------------------------------------------------------------------

function buildMailtoBody(payload: ReturnType<CarrierOnboardingType["buildPayload"]>, refId: string): string {
  // Build a clean plain-text body (most email clients limit URL length, so keep it terse).
  const c = payload.carrier;
  const e = payload.equipment;
  const a = payload.agreement;
  return [
    `EARTH LOGISTICS — Carrier onboarding packet`,
    `Reference: ${refId}`,
    `Submitted: ${payload.submittedAt}`,
    ``,
    `--- CARRIER ---`,
    `Carrier: ${c.carrierName}`,
    `Address: ${c.address}`,
    `City/State/Zip: ${c.cityStateZip}`,
    `MC# / DOT#: ${c.mc} / ${c.dot}`,
    `Primary: ${c.primaryContactName} · ${c.primaryPhone} · ${c.primaryEmail}`,
    `Secondary: ${c.secondaryContact} · ${c.secondaryPhone} · ${c.secondaryEmail}`,
    ``,
    `--- EQUIPMENT ---`,
    `Tractors: ${e.tractorCount} (sleeper ${e.sleeper})`,
    `Trailers:`,
    ...e.trailers.map((t) => {
      const tt = t as { type: string; qty: string; length?: string; width?: string; height?: string };
      const dims = tt.length || tt.width || tt.height
        ? ` (${tt.length || "?"}×${tt.width || "?"}×${tt.height || "?"})`
        : "";
      return `  · ${tt.type} ×${tt.qty}${dims}`;
    }),
    ``,
    `--- AGREEMENT ---`,
    `Version: ${a.version}`,
    `Accepted: ${a.accepted ? "YES" : "NO"}`,
    `Signed by: ${a.signaturePrintName} (${a.signatureTitle})`,
    `Signature (typed): ${a.signatureTyped}`,
    `Date: ${a.signatureDate}`,
    ``,
    `Electronic signature pursuant to U.S. ESIGN Act (15 U.S.C. § 7001 et seq.).`,
  ].join("\n");
}

// Type helper so the mailto builder picks up buildPayload's return shape.
type CarrierOnboardingType = { buildPayload: () => {
  submittedAt: string;
  formType: string;
  carrier: Record<string, string>;
  equipment: { tractorCount: string; sleeper: string; trailers: unknown[] };
  agreement: {
    version: string;
    title: string;
    accepted: boolean;
    readConfirmed: boolean;
    signaturePrintName: string;
    signatureTitle: string;
    signatureTyped: string;
    signatureDate: string;
  };
}; };

// ---------------------------------------------------------------------------
// Small presentational helpers
// ---------------------------------------------------------------------------

function SectionLabel({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg brand-gradient text-white flex items-center justify-center text-sm font-bold">
        {n}
      </div>
      <div className="font-display font-extrabold text-brand-900 text-xl">{title}</div>
    </div>
  );
}

function Field({
  label,
  required,
  error,
  full,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <label className="form-label">
        {label}
        {required ? " *" : ""}
      </label>
      {children}
      {error && <div className="form-error">{error}</div>}
    </div>
  );
}

function ReviewSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5">
      <div className="text-xs font-bold uppercase tracking-widest text-brand-700 mb-3">
        {title}
      </div>
      <dl className="space-y-2">{children}</dl>
    </div>
  );
}

function KV({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-3">
      <dt className="sm:w-44 shrink-0 text-xs font-bold uppercase tracking-wider text-slate-500">
        {k}
      </dt>
      <dd className={`text-sm text-slate-800 ${mono ? "font-display italic text-lg" : ""}`}>
        {v || "—"}
      </dd>
    </div>
  );
}

function Footer({
  onBack,
  onNext,
  nextLabel,
  disabledNext,
  submitting,
}: {
  onBack?: () => void;
  onNext: () => void;
  nextLabel: string;
  disabledNext?: boolean;
  submitting?: boolean;
}) {
  return (
    <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row gap-3 justify-between">
      {onBack ? (
        <button type="button" onClick={onBack} className="btn-outline">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      ) : (
        <span />
      )}
      <button
        type="button"
        onClick={onNext}
        disabled={disabledNext}
        className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
        {nextLabel}
        {!submitting && <ArrowRight className="w-4 h-4" />}
      </button>
    </div>
  );
}
