export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  center,
  light,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={`${center ? "text-center mx-auto" : ""} max-w-3xl ${center ? "" : ""}`}>
      {eyebrow && <span className={`eyebrow ${light ? "!text-[--color-brand-300]" : ""}`}>{eyebrow}</span>}
      <h2
        className={`font-display font-extrabold text-3xl md:text-4xl lg:text-5xl leading-tight mt-2 ${
          light ? "text-white" : "text-[--color-brand-900]"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg ${light ? "text-slate-200" : "text-slate-600"}`}>{subtitle}</p>
      )}
    </div>
  );
}
