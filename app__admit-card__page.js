"use client";

import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { useWebsiteModal } from "@/components/WebsiteModalProvider";

const ADMIT_CARDS = [
  { title: "Railway RRB Group D", meta: "Admit Card 2026", url: "https://www.rrbapply.gov.in" },
  { title: "SSC CGL Tier 1", meta: "Admit Card 2026", url: "https://ssc.gov.in" },
  { title: "Bihar Police Constable", meta: "Admit Card 2026", url: "https://csbc.bihar.gov.in" },
  { title: "UP Police Constable", meta: "Admit Card 2026", url: "https://uppbpb.gov.in" },
];

export default function AdmitCardPage() {
  const { openSite } = useWebsiteModal();
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-6 pb-24">
        <h1 className="font-display font-bold text-xl mb-4">All Admit Cards</h1>
        <div className="grid sm:grid-cols-2 gap-3">
          {ADMIT_CARDS.map((a) => (
            <div key={a.title} className="bg-white rounded-xl shadow-card p-4 flex items-center justify-between">
              <div>
                <div className="font-semibold text-sm">{a.title}</div>
                <div className="text-xs text-slate-400">{a.meta}</div>
              </div>
              <button onClick={() => openSite(a.url, a.title)} className="text-brandpurple text-sm font-medium">Download →</button>
            </div>
          ))}
        </div>
      </main>
      <BottomNav />
    </>
  );
}
