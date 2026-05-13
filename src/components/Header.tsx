"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { company } from "@/data/company";
import { services } from "@/data/services";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    submenu: services.map((s) => ({ label: s.name, href: `/services/${s.slug}` })),
  },
  { label: "Industries", href: "/industries" },
  { label: "Coverage", href: "/coverage" },
  {
    label: "Join Us",
    href: "#",
    submenu: [
      { label: "Shipper Join", href: "/shippers" },
      { label: "Carrier Join", href: "/carriers" },
      { label: "Freight Agent Join", href: "/agents" },
    ],
  },
  { label: "Reviews", href: "/reviews" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Top utility bar */}
      <div className="brand-gradient text-white text-xs">
        <div className="container-page flex items-center justify-between py-2">
          <span className="hidden sm:block tracking-wide">
            DOT-Authorized Asset-Based Freight Broker — Revolving Freight Globally 24/7
          </span>
          <div className="flex items-center gap-4">
            <a href={company.phoneHref} className="flex items-center gap-1.5 font-semibold hover:underline">
              <Phone className="w-3.5 h-3.5" />
              {company.phone}
            </a>
            <a href={company.emailHref} className="hidden md:inline hover:underline">
              {company.email}
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="container-page flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Earth Logistics Inc" width={56} height={56} className="rounded-md" />
          <div className="hidden sm:block leading-tight">
            <div className="font-display font-extrabold text-lg text-[--color-brand-900]">EARTH LOGISTICS INC</div>
            <div className="text-xs text-slate-500">Revolving Freight Globally 24/7</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setActive(item.label)}
              onMouseLeave={() => setActive(null)}
            >
              <Link
                href={item.href}
                className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-[--color-brand-600] flex items-center gap-1 rounded-md hover:bg-slate-50"
              >
                {item.label}
                {item.submenu && <ChevronDown className="w-3.5 h-3.5" />}
              </Link>
              {item.submenu && active === item.label && (
                <div className="absolute left-0 top-full pt-2 w-64">
                  <div className="bg-white rounded-lg shadow-2xl border border-slate-200 py-2">
                    {item.submenu.map((s) => (
                      <Link
                        key={s.label}
                        href={s.href}
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-[--color-brand-50] hover:text-[--color-brand-700]"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/quote" className="btn-primary hidden md:inline-flex text-sm">
            Get Instant Quote
          </Link>
          <button
            aria-label="Toggle menu"
            className="lg:hidden p-2 rounded-md border border-slate-200"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-slate-200 bg-white">
          <div className="container-page py-3 max-h-[70vh] overflow-y-auto">
            {navItems.map((item) => (
              <div key={item.label} className="py-1">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-2 py-2 font-semibold text-slate-800"
                >
                  {item.label}
                </Link>
                {item.submenu &&
                  item.submenu.map((s) => (
                    <Link
                      key={s.label}
                      href={s.href}
                      onClick={() => setOpen(false)}
                      className="block px-6 py-1.5 text-sm text-slate-600"
                    >
                      {s.label}
                    </Link>
                  ))}
              </div>
            ))}
            <Link href="/quote" className="btn-primary w-full mt-3" onClick={() => setOpen(false)}>
              Get Instant Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
