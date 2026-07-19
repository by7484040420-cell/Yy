"use client";

import { useState } from "react";

export default function Header() {
  const [query, setQuery] = useState("");

  return (
    <header className="bg-navy text-white sticky top-0 z-40">
      <div className="max-w-6xl mx-auto flex items-center gap-4 px-4 py-3">
        <button aria-label="Menu" className="p-1 shrink-0">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 6h18M3 12h18M3 18h18"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-brandred flex items-center justify-center font-display font-extrabold text-lg">
            B
          </div>
          <div className="leading-tight hidden sm:block">
            <div className="font-display font-bold text-lg">BIPIN AI</div>
            <div className="text-[11px] text-slate-300 -mt-1">
              Sab Kuchh, Ek Jagah
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center bg-white rounded-full px-4 py-2 gap-2 max-w-xl">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
            <circle cx="11" cy="11" r="7" stroke="#64748B" strokeWidth="2" />
            <path d="M21 21l-4-4" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Job, Admit Card, Result, Ticket, PAN, DL..."
            className="flex-1 outline-none text-sm text-slate-700 placeholder:text-slate-400"
          />
        </div>

        <button
          aria-label="Notifications"
          className="relative p-2 shrink-0"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"
              stroke="white"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path d="M13.7 21a2 2 0 01-3.4 0" stroke="white" strokeWidth="2" />
          </svg>
          <span className="absolute -top-0.5 -right-0.5 bg-brandred text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
            8
          </span>
        </button>

        <div className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-full bg-slate-300 overflow-hidden" />
          <div className="hidden md:block leading-tight text-sm">
            <div>Hi, Bipin 👋</div>
            <div className="text-saffron text-xs font-medium">
              Premium Member
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
