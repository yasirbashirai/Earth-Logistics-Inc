"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
  onDark?: boolean;
};

function parseNumber(v: string) {
  const m = v.replace(/,/g, "").match(/[\d.]+/);
  return m ? parseFloat(m[0]) : 0;
}

export default function CountUpStat({ value, label, prefix, suffix, onDark }: Props) {
  const target = parseNumber(value);
  const isInt = !value.includes(".");
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const duration = 1400;
            const start = performance.now();
            const tick = (t: number) => {
              const p = Math.min(1, (t - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setN(target * eased);
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [target]);

  const display = isInt ? Math.round(n).toLocaleString("en-US") : n.toFixed(1);
  const suffixText = value.includes("+") ? "+" : value.includes("%") ? "%" : "";

  return (
    <div
      ref={ref}
      className={`rounded-2xl p-6 text-center border-2 ${
        onDark
          ? "bg-white/5 border-white/15 text-white backdrop-blur-sm"
          : "bg-white border-slate-200"
      }`}
    >
      <div className={`font-display text-3xl md:text-4xl font-extrabold ${onDark ? "text-white" : "brand-gradient-text"}`}>
        {prefix}
        {value.match(/^\d/) ? display + suffixText : value}
        {suffix}
      </div>
      <div className={`text-xs uppercase tracking-widest mt-1.5 font-bold ${onDark ? "text-blue-200" : "text-slate-500"}`}>
        {label}
      </div>
    </div>
  );
}
