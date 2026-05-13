import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, Facebook, Linkedin, Instagram, Twitter } from "lucide-react";
import { company } from "@/data/company";
import { services } from "@/data/services";

export default function Footer() {
  return (
    <footer className="bg-[--color-brand-900] text-slate-300 mt-20">
      <div className="container-page py-14 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Earth Logistics Inc" width={64} height={64} className="rounded-md bg-white/5 p-1" />
            <div>
              <div className="font-display font-extrabold text-white text-lg">EARTH LOGISTICS INC</div>
              <div className="text-xs text-slate-400">{company.tagline}</div>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            {company.shortDesc}
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a aria-label="Facebook" href={company.social.facebook} className="p-2 rounded-md bg-white/5 hover:bg-white/15"><Facebook className="w-4 h-4"/></a>
            <a aria-label="LinkedIn" href={company.social.linkedin} className="p-2 rounded-md bg-white/5 hover:bg-white/15"><Linkedin className="w-4 h-4"/></a>
            <a aria-label="Instagram" href={company.social.instagram} className="p-2 rounded-md bg-white/5 hover:bg-white/15"><Instagram className="w-4 h-4"/></a>
            <a aria-label="Twitter" href={company.social.twitter} className="p-2 rounded-md bg-white/5 hover:bg-white/15"><Twitter className="w-4 h-4"/></a>
          </div>
        </div>

        <div className="md:col-span-3">
          <h4 className="font-display font-bold text-white mb-4 text-sm uppercase tracking-wider">Services</h4>
          <ul className="space-y-2 text-sm">
            {services.slice(0, 8).map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-white">{s.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="font-display font-bold text-white mb-4 text-sm uppercase tracking-wider">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/industries" className="hover:text-white">Industries</Link></li>
            <li><Link href="/coverage" className="hover:text-white">Coverage</Link></li>
            <li><Link href="/reviews" className="hover:text-white">Reviews</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/shippers" className="hover:text-white">Shipper Join</Link></li>
            <li><Link href="/carriers" className="hover:text-white">Carrier Join</Link></li>
            <li><Link href="/agents" className="hover:text-white">Freight Agent</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="font-display font-bold text-white mb-4 text-sm uppercase tracking-wider">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 mt-0.5 text-[--color-brand-500]" />
              <span>{company.address}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[--color-brand-500]" />
              <a href={company.phoneHref} className="hover:text-white">{company.phone}</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[--color-brand-500]" />
              <a href={company.emailHref} className="hover:text-white">{company.email}</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[--color-brand-500]" />
              <span>Open 24 / 7 / 365</span>
            </li>
          </ul>
          <Link href="/quote" className="btn-primary mt-5 w-full text-sm">Request a Freight Quote</Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} Earth Logistics Inc. All rights reserved.</span>
          <span>DOT-Authorized • FMCSA Registered • Bonded BMC-84</span>
        </div>
      </div>
    </footer>
  );
}
