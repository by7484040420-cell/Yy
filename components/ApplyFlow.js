"use client";

import { useMemo, useState } from "react";
import { useWebsiteModal } from "@/components/WebsiteModalProvider";

const FIELD_LABELS = {
  fullName: "Poora Naam",
  dob: "Janam Tithi (DD/MM/YYYY)",
  fatherName: "Pita ka Naam",
  address: "Pata",
  qualification: "Shiksha Yogyata",
  category: "Category",
  mobile: "Mobile Number",
  email: "Email",
  height: "Height (cm)",
  weight: "Weight (kg)",
};

const STEPS = ["Profile", "AI Review", "Captcha", "Payment", "Done"];

function generateCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { question: `${a} + ${b} = ?`, answer: a + b };
}

export default function ApplyFlow({ job }) {
  const { openSite } = useWebsiteModal();
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({});
  const [filled, setFilled] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [captcha, setCaptcha] = useState(generateCaptcha);
  const [captchaInput, setCaptchaInput] = useState("");

  const allFieldsGiven = useMemo(
    () => job.fields.every((f) => (profile[f] || "").trim().length > 0),
    [profile, job.fields]
  );

  async function handleAIFill() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/form-fill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId: job.id, profile }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "AI fill failed");
      setFilled(data.filled);
      setStep(1);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function handleCaptchaSubmit(e) {
    e.preventDefault();
    if (Number(captchaInput) === captcha.answer) {
      setStep(3);
      setError("");
    } else {
      setError("Captcha galat hai, dobara try karo.");
      setCaptcha(generateCaptcha());
      setCaptchaInput("");
    }
  }

  function handlePayment() {
    // Placeholder — wire up Razorpay/Paytm checkout here using
    // RAZORPAY_KEY_ID from your .env once you have merchant keys.
    setStep(4);
  }

  return (
    <div className="bg-white rounded-2xl shadow-card p-6">
      <div className="flex items-center gap-2 mb-6 text-xs font-medium">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                i <= step ? "bg-navy text-white" : "bg-slate-100 text-slate-400"
              }`}
            >
              {i + 1}
            </span>
            <span className={i <= step ? "text-navy" : "text-slate-400"}>{s}</span>
            {i < STEPS.length - 1 && <span className="w-4 h-px bg-slate-200" />}
          </div>
        ))}
      </div>

      {error && (
        <div className="bg-brandred/10 text-brandred text-sm rounded-lg px-3 py-2 mb-4">
          {error}
        </div>
      )}

      {step === 0 && (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-slate-500 mb-1">
            Ek baar apni details do — agli baar se ye sab jobs ke liye reuse hongi.
          </p>
          {job.fields.map((f) => (
            <div key={f}>
              <label className="text-xs font-medium text-slate-600">
                {FIELD_LABELS[f] || f}
              </label>
              <input
                value={profile[f] || ""}
                onChange={(e) => setProfile({ ...profile, [f]: e.target.value })}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm mt-1 outline-none focus:border-navy"
              />
            </div>
          ))}
          <button
            disabled={!allFieldsGiven || loading}
            onClick={handleAIFill}
            className="mt-3 bg-navy text-white rounded-full py-2.5 font-semibold text-sm disabled:opacity-40"
          >
            {loading ? "AI form bhar raha hai…" : "✨ AI se Form Bharo"}
          </button>
        </div>
      )}

      {step === 1 && filled && (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-slate-500 mb-1">
            AI ne ye values nikali hain — submit karne se pehle check kar lo.
          </p>
          {job.fields.map((f) => (
            <div key={f} className="flex justify-between border-b border-slate-100 py-2 text-sm">
              <span className="text-slate-500">{FIELD_LABELS[f] || f}</span>
              <span className="font-medium">{filled[f] ?? "—"}</span>
            </div>
          ))}
          <button
            onClick={() => setStep(2)}
            className="mt-3 bg-navy text-white rounded-full py-2.5 font-semibold text-sm"
          >
            Sahi hai, Aage Badho →
          </button>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleCaptchaSubmit} className="flex flex-col gap-3">
          <p className="text-sm text-slate-500">
            Security ke liye ye captcha khud solve karo:
          </p>
          <div className="bg-slate-100 rounded-lg py-4 text-center font-display font-bold text-xl tracking-widest">
            {captcha.question}
          </div>
          <input
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            placeholder="Jawab likho"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-navy"
          />
          <button className="bg-navy text-white rounded-full py-2.5 font-semibold text-sm">
            Verify &amp; Continue
          </button>
        </form>
      )}

      {step === 3 && (
        <div className="flex flex-col gap-3 text-center">
          <p className="text-sm text-slate-500">
            Application fee pay karke apna form final submit karo.
          </p>
          <div className="bg-slate-50 rounded-xl py-6 font-display font-bold text-2xl">
            ₹ 250
          </div>
          <button
            onClick={handlePayment}
            className="bg-brandgreen text-white rounded-full py-2.5 font-semibold text-sm"
          >
            💳 Pay &amp; Continue
          </button>
        </div>
      )}

      {step === 4 && (
        <div className="text-center flex flex-col items-center gap-3 py-6">
          <div className="w-14 h-14 rounded-full bg-brandgreen/10 text-brandgreen flex items-center justify-center text-2xl">
            ✅
          </div>
          <h3 className="font-display font-bold text-lg">Form Taiyaar Hai!</h3>
          <p className="text-sm text-slate-500 max-w-xs">
            {job.title} ke liye tumhara form AI ne taiyaar kar diya hai. Ye abhi
            official government portal par submit <b>nahi</b> hua hai — neeche diye
            gaye link se official website par jaake, tumhari details use karke
            khud final submit karo.
          </p>
          {job.officialUrl && (
            <button
              onClick={() => openSite(job.officialUrl, job.department || job.title)}
              className="bg-navy text-white rounded-full px-5 py-2.5 text-sm font-semibold mt-2"
            >
              Official Website Par Jaao →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
