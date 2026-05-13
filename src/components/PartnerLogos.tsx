const partners = [
  "FMCSA",
  "DOT",
  "TIA",
  "BMC-84",
  "MyCarrierPortal",
  "Highway",
  "RMIS",
  "Chemtrec",
];

export default function PartnerLogos() {
  return (
    <div className="bg-white py-8 border-y border-slate-200">
      <div className="container-page">
        <div className="text-center text-xs uppercase tracking-[0.2em] font-bold text-slate-500">
          Compliance, vetting & dispatch ecosystem
        </div>
        <div className="mt-6 grid grid-cols-4 md:grid-cols-8 gap-4">
          {partners.map((p) => (
            <div
              key={p}
              className="aspect-[3/1] flex items-center justify-center bg-slate-50 rounded-lg border border-slate-200 font-display font-extrabold text-slate-400 hover:text-brand-700 hover:border-brand-200 hover:bg-white transition text-xs md:text-sm tracking-wide"
            >
              {p}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
