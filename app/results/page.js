"use client";

import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { useWebsiteModal } from "@/components/WebsiteModalProvider";

const RESULTS = [
  { title: "SSC GD Result 2026", meta: "Declared: 12 Jul 2026", url: "https://ssc.gov.in" },
  { title: "Bihar Board 12th Result", meta: "Declared: 05 Jul 2026", url: "https://biharboardonline.bihar.gov.in" },
  { title: "UP Board 10th Result", meta: "Declared: 03 Jul 2026", url: "https://upmsp.edu.in" },
  { title: "Railway NTPC Result", meta: "Declared: 01 Jul 2026", url: "https://www.rrbapply.gov.in" },
];

export default function ResultsPage() {
  const { openSite } = useWebsiteModal();
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-6 pb-24">
        <h1 className="font-display font-bold text-xl mb-4">All Results</h1>
        <div className="grid sm:grid-cols-2 gap-3">
          {RESULTS.map((r) => (
            <div key={r.title} className="bg-white rounded-xl shadow-card p-4 flex items-center justify-between">
              <div>
                <div className="font-semibold text-sm">{r.title}</div>
                <div className="text-xs text-slate-400">{r.meta}</div>
              </div>
              <button onClick={() => openSite(r.url, r.title)} className="text-brandgreen text-sm font-medium">Check →</button>
            </div>
          ))}
        </div>
      </main>
      <BottomNav />
    </>
  );
}
