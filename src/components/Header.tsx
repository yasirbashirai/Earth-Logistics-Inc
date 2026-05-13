"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  Mail,
  Clock,
  ArrowRight,
  Truck,
  Box,
  Snowflake,
  Mountain,
  Car,
  HardHat,
  Wind,
  Droplets,
  Wheat,
  Flame,
  Building2,
  UserRound,
  Briefcase,
} from "lucide-react";
import { company } from "@/data/company";

const serviceIcons: Record<string, any> = {
  "dry-van": Box,
  flatbed: Truck,
  refrigerated: Snowflake,
  "lowboy-heavy-haul": Mountain,
  "car-hauler": Car,
  "end-dump": HardHat,
  "pneumatic-tanker": Wind,
  tanker: Droplets,
  "hopper-bottom": Wheat,
  hazmat: Flame,
};

const services = [
  { slug: "dry-van", name: "Dry Van", desc: "53' enclosed nationwide" },
  { slug: "flatbed", name: "Flatbed", desc: "Steel, lumber, machinery" },
  { slug: "refrigerated", name: "Refrigerated", desc: "Food, pharma cold chain" },
  { slug: "lowboy-heavy-haul", name: "Heavy Haul", desc: "Lowboy, RGN, oversize" },
  { slug: "car-hauler", name: "Car Hauler", desc: "Open & enclosed auto" },
  { slug: "end-dump", name: "End Dump", desc: "Aggregates, asphalt" },
  { slug: "pneumatic-tanker", name: "Pneumatic", desc: "Dry-bulk powders" },
  { slug: "tanker", name: "Liquid Tanker", desc: "Chemical & food-grade" },
  { slug: "hopper-bottom", name: "Hopper Bottom", desc: "Grain & fertilizer" },
  { slug: "hazmat", name: "Hazmat", desc: "All DOT classes 1–9" },
];

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", mega: "services" as const },
  { label: "Industries", href: "/industries" },
  { label: "Coverage", href: "/coverage" },
  { label: "Join Us", href: "#", mega: "join" as const },
  { label: "Reviews", href: "/reviews" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMega, setOpenMega] = useState<null | "services" | "join">(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileSub, setMobileSub] = useState<null | "services" | "join">(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50">
      {/* Top utility bar */}
      <div className="brand-gradient text-white text-xs">
        <div className="container-page flex items-center justify-between py-2 gap-3">
          <div className="hidden md:flex items-center gap-4">
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> 24 / 7 / 365 Dispatch</span>
            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5"/> {company.email}</span>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <a href={company.phoneHref} className="flex items-center gap-1.5 font-bold hover:underline">
              <Phone className="w-3.5 h-3.5" /> {company.phone}
            </a>
            <Link href="/quote" className="hidden sm:flex items-center gap-1 font-bold hover:underline">
              Get Quote <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div
        className={`bg-white/95 backdrop-blur-md border-b transition-shadow ${
          scrolled ? "shadow-lg border-slate-200" : "border-slate-100"
        }`}
        onMouseLeave={() => setOpenMega(null)}
      >
        <div className="container-page flex items-center justify-between py-3 lg:py-4 relative">
          {/* Logo only */}
          <Link href="/" className="flex items-center shrink-0" aria-label="Earth Logistics Inc — Home">
            <Image
              src="/logo.png"
              alt="Earth Logistics Inc"
              width={72}
              height={72}
              className="rounded-lg shadow-md"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.mega && setOpenMega(item.mega)}
              >
                <Link
                  href={item.href}
                  className={`px-3.5 py-2.5 text-sm font-semibold rounded-lg flex items-center gap-1 transition ${
                    openMega === item.mega
                      ? "text-brand-700 bg-brand-50"
                      : "text-slate-700 hover:text-brand-700 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                  {item.mega && <ChevronDown className="w-3.5 h-3.5" />}
                </Link>
              </div>
            ))}
          </nav>

          {/* Right CTA */}
          <div className="flex items-center gap-2 shrink-0">
            <Link href="/quote" className="btn-primary hidden md:inline-flex text-sm py-2.5 px-5">
              Get Instant Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              aria-label="Toggle menu"
              className="lg:hidden p-2.5 rounded-lg border-2 border-slate-300 text-slate-700 hover:bg-slate-50"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* ============ SERVICES MEGA PANEL ============ */}
          {openMega === "services" && (
            <div className="mega-panel open">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-8 p-7">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="eyebrow">All Services</div>
                      <h3 className="font-display font-extrabold text-2xl text-brand-900 mt-1">
                        Every trailer type. Dispatched 24/7.
                      </h3>
                    </div>
                    <Link href="/services" className="text-sm font-bold text-brand-700 hover:gap-2 inline-flex items-center gap-1 transition-all">
                      View all <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-2">
                    {services.map((s) => {
                      const Icon = serviceIcons[s.slug] ?? Truck;
                      return (
                        <Link
                          key={s.slug}
                          href={`/services/${s.slug}`}
                          className="group flex items-start gap-3 p-3 rounded-xl hover:bg-brand-50 transition"
                          onClick={() => setOpenMega(null)}
                        >
                          <div className="shrink-0 w-10 h-10 rounded-lg bg-brand-50 group-hover:bg-white group-hover:shadow-md flex items-center justify-center transition">
                            <Icon className="w-5 h-5 text-brand-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 text-sm leading-tight">{s.name}</div>
                            <div className="text-xs text-slate-500 mt-0.5">{s.desc}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="lg:col-span-4 brand-gradient-strong text-white p-7 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-15 bg-grid-dark pointer-events-none" />
                  <div className="relative">
                    <div className="text-xs uppercase tracking-widest text-blue-200 font-bold">Need a quote now?</div>
                    <h4 className="font-display font-extrabold text-2xl mt-2">
                      Get a binding freight quote in under 60 seconds.
                    </h4>
                    <p className="text-sm text-blue-100 mt-3">
                      Standard or permitted heavy-haul — our calculator sizes it up live.
                    </p>
                    <Link
                      href="/quote"
                      onClick={() => setOpenMega(null)}
                      className="mt-5 inline-flex items-center gap-2 bg-white text-brand-700 font-bold px-5 py-3 rounded-lg hover:bg-blue-50 shine-on-hover"
                    >
                      Open Quote Calculator <ArrowRight className="w-4 h-4" />
                    </Link>
                    <a
                      href={company.phoneHref}
                      className="mt-3 flex items-center gap-2 text-blue-50 hover:text-white"
                    >
                      <Phone className="w-4 h-4" />
                      <span className="font-bold">{company.phone}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============ JOIN MEGA PANEL ============ */}
          {openMega === "join" && (
            <div className="mega-panel open">
              <div className="grid grid-cols-1 md:grid-cols-3 p-2">
                {[
                  {
                    icon: Building2,
                    label: "Shippers",
                    desc: "Get dedicated capacity and transparent pricing for your freight lanes.",
                    href: "/shippers",
                    cta: "Become a Shipper",
                  },
                  {
                    icon: Truck,
                    label: "Carriers",
                    desc: "Run high-paying lanes with 24/7 dispatch and quick-pay options.",
                    href: "/carriers",
                    cta: "Become a Carrier",
                  },
                  {
                    icon: Briefcase,
                    label: "Freight Agents",
                    desc: "Industry-leading commissions and full back-office support.",
                    href: "/agents",
                    cta: "Apply as Agent",
                  },
                ].map((p) => (
                  <Link
                    key={p.label}
                    href={p.href}
                    onClick={() => setOpenMega(null)}
                    className="group block p-6 rounded-xl hover:bg-brand-50 transition"
                  >
                    <div className="w-12 h-12 brand-gradient rounded-xl flex items-center justify-center text-white shadow-lg">
                      <p.icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-display font-extrabold text-lg text-brand-900 mt-4">{p.label}</h4>
                    <p className="text-sm text-slate-600 mt-1">{p.desc}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 group-hover:gap-2.5 transition-all">
                      {p.cta} <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ============ MOBILE DRAWER ============ */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-[100]" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="absolute right-0 top-0 h-full w-[88%] max-w-sm bg-white shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="brand-gradient text-white px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image src="/logo.png" alt="" width={44} height={44} className="rounded-md" />
                <div>
                  <div className="font-display font-extrabold text-sm">EARTH LOGISTICS INC</div>
                  <div className="text-[10px] uppercase tracking-widest text-blue-100">Menu</div>
                </div>
              </div>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="p-2 rounded-md hover:bg-white/10">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-2">
              {navItems.map((item) => (
                <div key={item.label} className="border-b border-slate-100">
                  {item.mega ? (
                    <>
                      <button
                        onClick={() => setMobileSub(mobileSub === item.mega ? null : (item.mega as any))}
                        className="w-full flex items-center justify-between px-5 py-3.5 font-semibold text-slate-800"
                      >
                        {item.label}
                        <ChevronDown className={`w-4 h-4 transition ${mobileSub === item.mega ? "rotate-180" : ""}`} />
                      </button>
                      {mobileSub === item.mega && (
                        <div className="bg-slate-50 px-3 py-2">
                          {item.mega === "services" &&
                            services.map((s) => (
                              <Link
                                key={s.slug}
                                href={`/services/${s.slug}`}
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-slate-700 hover:bg-white"
                              >
                                <span className="w-2 h-2 rounded-full bg-brand-500" />
                                {s.name}
                              </Link>
                            ))}
                          {item.mega === "join" && (
                            <>
                              <Link href="/shippers" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-slate-700 hover:bg-white">
                                <Building2 className="w-4 h-4 text-brand-600" /> Shippers
                              </Link>
                              <Link href="/carriers" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-slate-700 hover:bg-white">
                                <Truck className="w-4 h-4 text-brand-600" /> Carriers
                              </Link>
                              <Link href="/agents" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-slate-700 hover:bg-white">
                                <Briefcase className="w-4 h-4 text-brand-600" /> Freight Agents
                              </Link>
                            </>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-5 py-3.5 font-semibold text-slate-800 hover:bg-slate-50"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="p-5 border-t border-slate-200 space-y-3">
              <Link href="/quote" onClick={() => setMobileOpen(false)} className="btn-primary w-full">
                Get Instant Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <a href={company.phoneHref} className="btn-secondary w-full">
                <Phone className="w-4 h-4" /> {company.phone}
              </a>
              <div className="text-center text-xs text-slate-500 pt-2">24/7 dispatch · DOT authorized</div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
