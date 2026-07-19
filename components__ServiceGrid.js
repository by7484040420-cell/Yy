// Tailwind can't see colors built from template strings at build time,
// so each color variant is spelled out as a static class string here.
const COLOR_CLASSES = {
  brandblue: { icon: "bg-brandblue/10 text-brandblue", cta: "text-brandblue" },
  brandpurple: { icon: "bg-brandpurple/10 text-brandpurple", cta: "text-brandpurple" },
  brandred: { icon: "bg-brandred/10 text-brandred", cta: "text-brandred" },
  brandgreen: { icon: "bg-brandgreen/10 text-brandgreen", cta: "text-brandgreen" },
  saffron: { icon: "bg-saffron/10 text-saffron", cta: "text-saffron" },
};

const SERVICES = [
  { title: "IRCTC & Ticket", subtitle: "Train, Bus, Flight, PNR", cta: "Book Now", color: "brandblue" },
  { title: "Jobs & Exams", subtitle: "Govt & Private Jobs", cta: "View Jobs", color: "brandpurple" },
  { title: "Admit Card", subtitle: "All Admit Cards", cta: "View All", color: "brandred" },
  { title: "Results", subtitle: "All Results & Merit", cta: "View Results", color: "brandgreen" },
  { title: "Documents & Identity", subtitle: "PAN, DL, Passport", cta: "Explore", color: "brandblue" },
  { title: "Land & Property", subtitle: "Khasra, Rasid, Bhumi", cta: "View", color: "saffron" },
  { title: "Government Loan", subtitle: "Loan & Credit Services", cta: "Apply Now", color: "brandgreen" },
  { title: "Scholarship", subtitle: "Scholarship & Fee", cta: "Apply Now", color: "brandred" },
  { title: "Yojana & Benefits", subtitle: "Sarkari Yojana", cta: "View All", color: "saffron" },
  { title: "Insurance", subtitle: "Life, Health, Vehicle", cta: "View Plans", color: "brandblue" },
  { title: "Rasid & Payment", subtitle: "Online Rasid, Bill", cta: "Pay Now", color: "brandpurple" },
  { title: "More Services", subtitle: "All Online Services", cta: "Explore", color: "brandblue" },
];

export default function ServiceGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
      {SERVICES.map((s) => {
        const c = COLOR_CLASSES[s.color];
        return (
          <div
            key={s.title}
            className="bg-white rounded-2xl p-4 shadow-card flex flex-col gap-3"
          >
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center font-display font-bold ${c.icon}`}
            >
              {s.title.charAt(0)}
            </div>
            <div>
              <div className="font-semibold text-sm leading-tight">{s.title}</div>
              <div className="text-xs text-slate-500 mt-0.5">{s.subtitle}</div>
            </div>
            <button
              className={`text-xs font-medium flex items-center gap-1 mt-auto ${c.cta}`}
            >
              {s.cta} →
            </button>
          </div>
        );
      })}
    </div>
  );
}
