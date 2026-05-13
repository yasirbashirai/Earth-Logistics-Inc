import Link from "next/link";
import { company } from "@/data/company";
import { ArrowRight, Phone } from "lucide-react";

export default function CtaStrip({
  title = "Ready to move freight?",
  subtitle = "Get an instant quote in under 60 seconds — or call our 24/7 dispatch team now.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="container-page section">
        <div className="brand-gradient rounded-3xl p-8 md:p-14 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-grid-light pointer-events-none" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="font-display text-2xl md:text-4xl font-extrabold leading-tight">{title}</h2>
              <p className="mt-2 text-blue-50/90 max-w-2xl">{subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/quote" className="inline-flex items-center gap-2 bg-white text-[--color-brand-700] font-semibold px-6 py-3 rounded-lg hover:bg-blue-50">
                Get Instant Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <a href={company.phoneHref} className="btn-ghost-on-dark">
                <Phone className="w-4 h-4" />
                {company.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
