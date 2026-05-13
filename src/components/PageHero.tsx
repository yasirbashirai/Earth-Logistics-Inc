import Link from "next/link";
import Image from "next/image";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: string;
  cta1?: { label: string; href: string };
  cta2?: { label: string; href: string };
  size?: "sm" | "lg";
};

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image = "https://images.unsplash.com/photo-1601584115197-04ecc0da31d3?auto=format&fit=crop&w=1800&q=80",
  cta1,
  cta2,
  size = "sm",
}: Props) {
  return (
    <section className={`relative isolate overflow-hidden ${size === "lg" ? "min-h-[70vh]" : "min-h-[44vh]"}`}>
      <div className="absolute inset-0 -z-10">
        <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 hero-overlay" />
      </div>
      <div className="container-page py-20 md:py-28 text-white">
        {eyebrow && <span className="eyebrow text-brand-200!">{eyebrow}</span>}
        <h1 className="font-display font-extrabold text-3xl md:text-5xl lg:text-6xl leading-tight mt-3 max-w-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 text-lg md:text-xl text-slate-100/90 max-w-2xl">{subtitle}</p>
        )}
        {(cta1 || cta2) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {cta1 && <Link href={cta1.href} className="btn-primary">{cta1.label}</Link>}
            {cta2 && <Link href={cta2.href} className="btn-ghost-on-dark">{cta2.label}</Link>}
          </div>
        )}
      </div>
    </section>
  );
}
