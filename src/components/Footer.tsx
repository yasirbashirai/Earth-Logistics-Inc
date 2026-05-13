import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Linkedin,
  Instagram,
  Twitter,
  ArrowRight,
  ShieldCheck,
  BadgeCheck,
  Truck,
} from "lucide-react";
import { company } from "@/data/company";
import { services } from "@/data/services";

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-white relative overflow-hidden mt-24">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-500/15 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-dark opacity-10 pointer-events-none" />

      {/* CTA banner overlapping the footer */}
      <div className="container-page relative">
        <div className="-mt-16 brand-gradient-strong rounded-3xl p-8 md:p-10 shadow-2xl border border-white/15 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-dark opacity-15 pointer-events-none" />
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] font-extrabold text-brand-200">
                Ready to ship?
              </div>
              <h3 className="font-display font-extrabold text-3xl md:text-4xl mt-2 leading-tight">
                Talk to a real freight dispatcher in under 30 seconds.
              </h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center gap-2 bg-white text-brand-700 font-extrabold px-6 py-4 rounded-xl hover:bg-blue-50 shadow-xl shine-on-hover text-base"
              >
                Get Instant Quote <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={company.phoneHref}
                className="inline-flex items-center justify-center gap-2 border-2 border-white/40 hover:border-white text-white font-extrabold px-6 py-4 rounded-xl hover:bg-white/10 text-base"
              >
                <Phone className="w-5 h-5" />
                {company.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page relative pt-20 pb-10 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
        {/* Brand block */}
        <div className="md:col-span-4">
          <div className="flex items-center gap-4">
            <Image
              src="/logo.png"
              alt="Earth Logistics Inc"
              width={72}
              height={72}
              className="rounded-xl shadow-lg"
            />
            <div className="leading-tight">
              <div className="font-display font-black text-white text-2xl tracking-tight">
                EARTH LOGISTICS <span className="text-brand-300">INC</span>
              </div>
              <div className="text-xs uppercase tracking-[0.18em] font-bold text-brand-200 mt-1">
                Revolving Freight Globally 24/7
              </div>
            </div>
          </div>

          <p className="mt-6 text-slate-200 leading-relaxed text-[15px]">{company.shortDesc}</p>

          {/* Trust badges */}
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              { icon: ShieldCheck, label: "DOT Authorized" },
              { icon: BadgeCheck, label: "FMCSA Registered" },
              { icon: Truck, label: "BMC-84 Bonded" },
            ].map((b) => (
              <span
                key={b.label}
                className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-bold bg-white/10 border border-white/15 rounded-full px-3 py-1.5 backdrop-blur-sm"
              >
                <b.icon className="w-3.5 h-3.5 text-brand-300" />
                {b.label}
              </span>
            ))}
          </div>

          <div className="mt-7 flex items-center gap-2">
            {[
              { icon: Facebook, href: company.social.facebook, label: "Facebook" },
              { icon: Linkedin, href: company.social.linkedin, label: "LinkedIn" },
              { icon: Instagram, href: company.social.instagram, label: "Instagram" },
              { icon: Twitter, href: company.social.twitter, label: "Twitter" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-10 h-10 rounded-xl bg-white/8 hover:bg-brand-500 hover:scale-110 border border-white/15 flex items-center justify-center transition shadow-md"
              >
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Services column */}
        <div className="md:col-span-3">
          <h4 className="font-display font-black text-white text-sm uppercase tracking-[0.16em] mb-5 relative inline-block">
            Services
            <span className="absolute -bottom-2 left-0 w-10 h-0.5 brand-gradient rounded-full" />
          </h4>
          <ul className="space-y-2.5">
            {services.slice(0, 8).map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-slate-300 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition font-semibold text-[15px]"
                >
                  <ArrowRight className="w-3 h-3 text-brand-400 opacity-0 group-hover:opacity-100" />
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company column */}
        <div className="md:col-span-2">
          <h4 className="font-display font-black text-white text-sm uppercase tracking-[0.16em] mb-5 relative inline-block">
            Company
            <span className="absolute -bottom-2 left-0 w-10 h-0.5 brand-gradient rounded-full" />
          </h4>
          <ul className="space-y-2.5">
            <li><Link href="/about" className="text-slate-300 hover:text-white font-semibold text-[15px]">About</Link></li>
            <li><Link href="/industries" className="text-slate-300 hover:text-white font-semibold text-[15px]">Industries</Link></li>
            <li><Link href="/coverage" className="text-slate-300 hover:text-white font-semibold text-[15px]">Coverage</Link></li>
            <li><Link href="/reviews" className="text-slate-300 hover:text-white font-semibold text-[15px]">Reviews</Link></li>
            <li><Link href="/blog" className="text-slate-300 hover:text-white font-semibold text-[15px]">Blog</Link></li>
            <li><Link href="/contact" className="text-slate-300 hover:text-white font-semibold text-[15px]">Contact</Link></li>
            <li className="pt-2"><Link href="/shippers" className="text-brand-300 hover:text-white font-bold text-[15px]">→ Shippers</Link></li>
            <li><Link href="/carriers" className="text-brand-300 hover:text-white font-bold text-[15px]">→ Carriers</Link></li>
            <li><Link href="/agents" className="text-brand-300 hover:text-white font-bold text-[15px]">→ Freight Agents</Link></li>
          </ul>
        </div>

        {/* Contact column */}
        <div className="md:col-span-3">
          <h4 className="font-display font-black text-white text-sm uppercase tracking-[0.16em] mb-5 relative inline-block">
            Contact Dispatch
            <span className="absolute -bottom-2 left-0 w-10 h-0.5 brand-gradient rounded-full" />
          </h4>
          <ul className="space-y-3.5">
            <li className="flex items-start gap-3">
              <div className="shrink-0 w-9 h-9 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-brand-300" />
              </div>
              <span className="text-slate-200 text-[15px] font-medium leading-snug">{company.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="shrink-0 w-9 h-9 rounded-lg brand-gradient flex items-center justify-center shadow-md">
                <Phone className="w-4 h-4 text-white" />
              </div>
              <a href={company.phoneHref} className="text-white font-display font-extrabold text-lg hover:text-brand-300">
                {company.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <div className="shrink-0 w-9 h-9 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center">
                <Mail className="w-4 h-4 text-brand-300" />
              </div>
              <a href={company.emailHref} className="text-slate-200 font-semibold text-[15px] hover:text-white">
                {company.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <div className="shrink-0 w-9 h-9 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center">
                <Clock className="w-4 h-4 text-brand-300" />
              </div>
              <span className="text-slate-200 font-semibold text-[15px]">Open 24 / 7 / 365</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/15 backdrop-blur-sm bg-black/20 relative">
        <div className="container-page py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <span className="font-semibold">
            © {new Date().getFullYear()} <span className="text-white font-bold">Earth Logistics Inc.</span> All rights reserved.
          </span>
          <span className="font-bold tracking-wider">
            DOT-AUTHORIZED · FMCSA REGISTERED · BMC-84 BONDED · TIA-ALIGNED
          </span>
        </div>
      </div>
    </footer>
  );
}
