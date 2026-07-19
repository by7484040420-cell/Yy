import { getJobById, jobs } from "@/data/jobs";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import ApplyFlow from "@/components/ApplyFlow";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return jobs.map((j) => ({ id: j.id }));
}

export default function JobDetailPage({ params }) {
  const job = getJobById(params.id);
  if (!job) return notFound();

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8 pb-24">
        <div className="bg-navy rounded-2xl p-6 text-white mb-6">
          <div className="text-xs text-slate-300">{job.department}</div>
          <h1 className="font-display font-bold text-2xl mt-1">{job.title}</h1>
          <div className="text-slate-300 text-sm">{job.subtitle}</div>
          <div className="mt-3 text-sm">
            Last Date: <span className="font-semibold">{job.lastDate}</span>
          </div>
        </div>

        <ApplyFlow job={job} />
      </main>
      <BottomNav />
    </>
  );
}
