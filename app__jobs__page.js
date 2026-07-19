import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import JobCarousel from "@/components/JobCarousel";
import { jobs } from "@/data/jobs";

export const metadata = { title: "Jobs & Exams — Bipin AI" };

export default function JobsPage() {
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8 flex flex-col items-center gap-6 pb-24">
        <div className="text-center">
          <h1 className="font-display font-bold text-2xl">Latest Jobs &amp; Exams</h1>
          <p className="text-slate-500 text-sm mt-1">
            Har 3 second me naya notification — ya niche dot dabakar seedha jump karo
          </p>
        </div>

        <JobCarousel jobs={jobs} intervalMs={3000} />

        <div className="w-full grid sm:grid-cols-2 gap-3 mt-4">
          {jobs.map((job) => (
            <a
              key={job.id}
              href={`/jobs/${job.id}`}
              className="bg-white rounded-xl shadow-card p-4 flex items-center justify-between"
            >
              <div>
                <div className="font-semibold text-sm">{job.title}</div>
                <div className="text-xs text-slate-400">{job.department} · Last date {job.lastDate}</div>
              </div>
              <span className="text-brandblue text-sm font-medium">Details →</span>
            </a>
          ))}
        </div>
      </main>
      <BottomNav />
    </>
  );
}
