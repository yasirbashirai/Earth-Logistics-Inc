import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] grid place-items-center text-center">
      <div className="container-page">
        <div className="font-display text-7xl font-extrabold brand-gradient-text">404</div>
        <h1 className="font-display text-3xl md:text-4xl font-extrabold mt-4 text-brand-900">
          Page not found
        </h1>
        <p className="mt-3 text-slate-600 max-w-md mx-auto">
          The route you're looking for has been moved or never existed. Let's get you back on the road.
        </p>
        <div className="mt-7 flex justify-center gap-3">
          <Link href="/" className="btn-primary">Back to Home</Link>
          <Link href="/quote" className="btn-outline">Get a Quote</Link>
        </div>
      </div>
    </section>
  );
}
