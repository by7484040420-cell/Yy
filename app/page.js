"use client";

import Header from "@/components/Header";
import ServiceGrid from "@/components/ServiceGrid";
import LiveTicker from "@/components/LiveTicker";
import JobListColumn from "@/components/JobListColumn";
import AIAssistantBanner from "@/components/AIAssistantBanner";
import SecurityStrip from "@/components/SecurityStrip";
import BottomNav from "@/components/BottomNav";
import { documentServices } from "@/data/documents";
import { useWebsiteModal } from "@/components/WebsiteModalProvider";

const LATEST_JOBS = [
  { title: "Railway Group D 2026", tag: "NEW", meta: "Last Date: 23 Aug 2026" },
  { title: "SSC CGL 2026", tag: "NEW", meta: "Last Date: 04 Sep 2026" },
  { title: "Bihar Police Constable", tag: "NEW", meta: "Last Date: 18 Aug 2026" },
  { title: "UP Police Constable", tag: "NEW", meta: "Last Date: 10 Sep 2026" },
];

const ADMIT_CARDS = [
  { title: "Railway RRB Group D", tag: "NEW", meta: "Admit Card 2026" },
  { title: "SSC CGL Tier 1", tag: "NEW", meta: "Admit Card 2026" },
  { title: "Bihar Police Constable", tag: "NEW", meta: "Admit Card 2026" },
  { title: "UP Police Constable", tag: "NEW", meta: "Admit Card 2026" },
];

const RESULTS = [
  { title: "SSC GD Result 2026", tag: "NEW", meta: "Declared: 12 Jul 2026" },
  { title: "Bihar Board 12th Result", tag: "NEW", meta: "Declared: 05 Jul 2026" },
  { title: "UP Board 10th Result", tag: "NEW", meta: "Declared: 03 Jul 2026" },
  { title: "Railway NTPC Result", tag: "NEW", meta: "Declared: 01 Jul 2026" },
];

const UPDATES = [
  { title: "Railway Group D Form Start", meta: "2 min ago" },
  { title: "SSC CGL Admit Card Released", meta: "15 min ago" },
  { title: "Bihar Police Exam Date Out", meta: "30 min ago" },
  { title: "UP Police New Vacancy Soon", meta: "1 hour ago" },
];

export default function HomePage() {
  const { openSite } = useWebsiteModal();
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-5 flex flex-col gap-5 pb-24">
        <ServiceGrid />
        <LiveTicker />

        <a
          href="/states"
          className="bg-white rounded-2xl shadow-card p-4 flex items-center justify-between"
        >
          <span className="flex items-center gap-2 font-semibold text-sm">
            🏛️ Verified State Recruitment Portals
          </span>
          <span className="text-brandblue text-sm font-medium">Dekho →</span>
        </a>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <JobListColumn title="Latest Jobs" icon="🔥" accent="brandred" items={LATEST_JOBS} viewAllLabel="View All Jobs" viewAllHref="/jobs" />
          <JobListColumn title="Admit Cards" icon="🎓" accent="brandpurple" items={ADMIT_CARDS} viewAllLabel="View All Admit Cards" viewAllHref="/admit-card" />
          <JobListColumn title="Results" icon="📶" accent="brandgreen" items={RESULTS} viewAllLabel="View All Results" viewAllHref="/results" />
          <JobListColumn title="Important Updates" icon="📢" accent="saffron" items={UPDATES} viewAllLabel="View All Updates" viewAllHref="/" />
        </div>

        <AIAssistantBanner />

        <div>
          <h2 className="font-display font-bold text-lg mb-3">लोकप्रिय सेवाएँ</h2>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-3">
            {documentServices.map((d) => (
              <button
                key={d.id}
                onClick={() => openSite(d.url, d.name)}
                className="bg-white rounded-xl shadow-card p-3 flex flex-col items-center gap-2 text-center"
              >
                <span className="text-xl">📄</span>
                <span className="text-xs font-medium">{d.name}</span>
              </button>
            ))}
          </div>
        </div>

        <SecurityStrip />
      </main>
      <BottomNav />
    </>
  );
}
