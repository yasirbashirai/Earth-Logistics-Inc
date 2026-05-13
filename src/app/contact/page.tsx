import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { company } from "@/data/company";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact Earth Logistics Inc — 24/7 Freight Dispatch",
  description:
    "Reach Earth Logistics dispatch 24/7 at 855-456-4424 or info@earthlogistics247.com. Headquartered in Saint John, Indiana.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's move freight."
        subtitle="Reach our team 24 hours a day, every day. We answer the phone — no voicemail loops, no overseas call center."
        image="https://images.unsplash.com/photo-1559717207-049db4eb1c7e?auto=format&fit=crop&w=1800&q=80"
      />

      <section className="section">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-5">
            <div className="rounded-2xl border border-slate-200 p-6 bg-white shadow-sm">
              <h3 className="font-display text-xl font-extrabold text-brand-900">Headquarters</h3>
              <ul className="mt-4 space-y-3 text-slate-700">
                <li className="flex items-start gap-3"><MapPin className="w-5 h-5 text-brand-600 mt-0.5"/> {company.address}</li>
                <li className="flex items-center gap-3"><Phone className="w-5 h-5 text-brand-600"/> <a href={company.phoneHref} className="font-semibold">{company.phone}</a></li>
                <li className="flex items-center gap-3"><Mail className="w-5 h-5 text-brand-600"/> <a href={company.emailHref} className="font-semibold">{company.email}</a></li>
                <li className="flex items-center gap-3"><Clock className="w-5 h-5 text-brand-600"/> Open 24 / 7 / 365</li>
              </ul>
            </div>

            <div className="rounded-2xl brand-gradient text-white p-6">
              <div className="text-xs uppercase tracking-widest text-blue-200">Emergency dispatch</div>
              <a href={company.phoneHref} className="block mt-2 font-display font-extrabold text-3xl">{company.phone}</a>
              <p className="text-sm text-blue-100 mt-2">For after-hours loads, lost-load recovery and roadside emergencies, call dispatch directly — a real person will answer.</p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200">
              <iframe
                src="https://www.google.com/maps?q=9401+Iris+St,+Saint+John,+IN+46373&output=embed"
                width="100%"
                height="280"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Earth Logistics Headquarters Map"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
