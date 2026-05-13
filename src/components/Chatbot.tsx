"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  MessageCircle,
  X,
  Phone,
  Send,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { company } from "@/data/company";

type Msg = {
  from: "bot" | "user";
  text: string;
  cta?: { label: string; href: string; external?: boolean }[];
};

const quickReplies = [
  "💬 Get a freight quote",
  "🚛 Heavy-haul calculator",
  "🤝 Carrier application",
  "📦 Shipper setup",
  "📞 Talk to dispatch",
  "❓ Hours & coverage",
];

function botReply(userText: string): Msg {
  const t = userText.toLowerCase();
  if (t.includes("quote") || t.includes("freight"))
    return {
      from: "bot",
      text: "Great — let's get you a binding quote. Our instant quote form takes under 60 seconds and dispatch responds in 30 minutes or less, 24/7.",
      cta: [
        { label: "Open Quote Form", href: "/quote" },
        { label: "Call Dispatch", href: company.phoneHref, external: true },
      ],
    };
  if (t.includes("heavy") || t.includes("calculator") || t.includes("oversize") || t.includes("lowboy"))
    return {
      from: "bot",
      text: "Our heavy-haul calculator estimates permitted oversize moves live — line haul, fuel, permits and pilot cars included. Final binding rate comes after route survey.",
      cta: [{ label: "Open Heavy-Haul Calculator", href: "/quote" }],
    };
  if (t.includes("carrier"))
    return {
      from: "bot",
      text: "We onboard carriers in 48 hours — quick pay, factoring friendly, $1.5M cargo coverage. You'll need MC + DOT, current insurance COI, and a clean FMCSA rating.",
      cta: [{ label: "Carrier Application", href: "/carriers" }],
    };
  if (t.includes("shipper") || t.includes("setup"))
    return {
      from: "bot",
      text: "Shipper setup is a 30-minute discovery call. We'll map your lanes, build a capacity plan, and tender your first load within 24 hours of paperwork closeout.",
      cta: [{ label: "Shipper Setup Form", href: "/shippers" }],
    };
  if (t.includes("agent"))
    return {
      from: "bot",
      text: "Our freight agent program offers industry-leading commission splits, full modal access, and a complete back-office. 100% confidential.",
      cta: [{ label: "Freight Agent Application", href: "/agents" }],
    };
  if (t.includes("dispatch") || t.includes("call") || t.includes("phone") || t.includes("talk"))
    return {
      from: "bot",
      text: "Dispatch is live 24/7/365. Real people answer the phone — no overseas call center.",
      cta: [{ label: `Call ${company.phone}`, href: company.phoneHref, external: true }],
    };
  if (t.includes("hour") || t.includes("coverage") || t.includes("when") || t.includes("where"))
    return {
      from: "bot",
      text: "We operate 24 hours, 7 days a week, every day of the year. 48-state coverage with our headquarters in Saint John, Indiana.",
      cta: [{ label: "View Coverage Map", href: "/coverage" }],
    };
  if (t.includes("hazmat"))
    return {
      from: "bot",
      text: "Hazmat freight (all DOT classes 1–9) is dispatched only through MCS-90 endorsed, properly placarded carriers — full 49 CFR compliance.",
      cta: [{ label: "Hazmat Service Page", href: "/services/hazmat" }],
    };
  return {
    from: "bot",
    text: "Got it. The fastest way to talk through your freight needs is to either request a quote or call dispatch at 855-456-4424 — we answer 24/7.",
    cta: [
      { label: "Request a Quote", href: "/quote" },
      { label: "Call Dispatch", href: company.phoneHref, external: true },
    ],
  };
}

const initialMessages: Msg[] = [
  {
    from: "bot",
    text: "👋 Hi, I'm the Earth Logistics dispatch assistant. How can I help with your freight today?",
  },
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(initialMessages);
  const [input, setInput] = useState("");
  const [unread, setUnread] = useState(true);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) {
      setUnread(false);
      // Scroll to bottom on each message change
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [open, messages]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { from: "user", text: trimmed }]);
    setInput("");
    // Simulated typing delay
    setTimeout(() => {
      setMessages((m) => [...m, botReply(trimmed)]);
    }, 550);
  }

  return (
    <>
      {/* Floating launch button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open chat"
          className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-[80] group"
        >
          <span className="absolute inset-0 rounded-full brand-gradient opacity-60 blur-xl group-hover:opacity-90 animate-pulse-soft" />
          <span className="relative inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full brand-gradient text-white shadow-2xl hover:scale-110 transition border-2 border-white/20">
            <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
          </span>
          {unread && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[11px] font-bold flex items-center justify-center border-2 border-white">
              1
            </span>
          )}
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-brand-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg hidden md:block whitespace-nowrap">
            Chat with dispatch
          </span>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-0 right-0 md:bottom-6 md:right-6 z-[80] w-full md:w-[400px] h-[100dvh] md:h-[620px] md:max-h-[80vh] bg-white md:rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-fade-up">
          {/* Header */}
          <div className="brand-gradient text-white px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-full bg-white/15 border border-white/30 flex items-center justify-center backdrop-blur-sm">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-brand-700 animate-pulse-soft" />
              </div>
              <div className="leading-tight">
                <div className="font-display font-extrabold">Earth Logistics</div>
                <div className="text-[11px] text-blue-100">Live dispatch · usually responds in minutes</div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="p-2 rounded-lg hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Phone strip */}
          <a
            href={company.phoneHref}
            className="bg-brand-50 border-b border-brand-100 px-5 py-3 flex items-center gap-3 hover:bg-brand-100/70 transition"
          >
            <div className="w-9 h-9 rounded-lg brand-gradient flex items-center justify-center text-white shadow">
              <Phone className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="text-[10px] uppercase tracking-widest font-bold text-brand-700">
                24/7 dispatch direct
              </div>
              <div className="font-display font-extrabold text-brand-900">{company.phone}</div>
            </div>
            <ArrowRight className="w-4 h-4 text-brand-700" />
          </a>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.from === "user"
                      ? "bg-brand-600 text-white rounded-br-sm"
                      : "bg-white text-slate-800 border border-slate-200 rounded-bl-sm shadow-sm"
                  }`}
                >
                  <div>{m.text}</div>
                  {m.cta && (
                    <div className="mt-3 flex flex-col gap-1.5">
                      {m.cta.map((c) =>
                        c.external ? (
                          <a
                            key={c.label}
                            href={c.href}
                            className="block w-full text-center text-xs font-bold bg-brand-50 hover:bg-brand-100 text-brand-700 px-3 py-2 rounded-lg border border-brand-100"
                          >
                            {c.label}
                          </a>
                        ) : (
                          <Link
                            key={c.label}
                            href={c.href}
                            onClick={() => setOpen(false)}
                            className="block w-full text-center text-xs font-bold bg-brand-50 hover:bg-brand-100 text-brand-700 px-3 py-2 rounded-lg border border-brand-100"
                          >
                            {c.label}
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Quick replies */}
          {messages.length <= 2 && (
            <div className="px-3 py-2 border-t border-slate-200 bg-white flex flex-wrap gap-2">
              {quickReplies.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q.replace(/^[^a-zA-Z]+/, ""))}
                  className="text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-100 px-3 py-1.5 rounded-full"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="border-t border-slate-200 p-3 bg-white flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question…"
              className="flex-1 px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            />
            <button
              type="submit"
              className="w-10 h-10 brand-gradient text-white rounded-lg flex items-center justify-center hover:scale-105 transition shadow"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="px-4 py-2 text-center text-[10px] text-slate-400 bg-white border-t border-slate-100">
            <span className="flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Powered by Earth Logistics Dispatch · 24/7
            </span>
          </div>
        </div>
      )}
    </>
  );
}
