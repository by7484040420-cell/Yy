# Bipin AI — Sarkari Result + AI Assistant (Starter App)

Ye ek **working starter app** hai — poora production system nahi. Real "400-600 file"
scale wala app banane me hafton lagte hain (naye exam boards, security, testing,
har state ka alag form, etc.). Ye jo abhi bana hai wo solid neeव (foundation) hai
jisse aap GitHub pe daal ke, feature-by-feature aage badha sakte ho.

## Isme kya hai

- Home page (categories, live ticker, jobs/admit-card/results columns, AI banner)
- Jobs page with auto-scrolling carousel (har 3 second me next job)
- Job detail page: profile form → AI se data-fill → captcha → payment (mock) → confirmation
- Bipin AI Assistant chat page (Google Gemini se connected)
- Admit Card aur Results listing pages
- API routes: `/api/gemini` (chat), `/api/form-fill` (AI data mapping), `/api/jobs`

## Local pe chalane ke liye

```bash
npm install
cp .env.example .env.local
# .env.local kholo aur GEMINI_API_KEY daal do
npm run dev
```

Browser me `http://localhost:3000` kholo.

## GitHub pe daalna

```bash
git init
git add .
git commit -m "Initial Bipin AI starter app"
git branch -M main
git remote add origin https://github.com/<aapka-username>/<repo-name>.git
git push -u origin main
```

## Hosting/Domain

- Sabse aasan: [Vercel](https://vercel.com) — GitHub repo import karo, `GEMINI_API_KEY`
  environment variable Vercel dashboard me daalo, deploy ho jayega.
- Apna khud ka domain (GoDaddy/Namecheap se) Vercel/Netlify dashboard me "Add Domain"
  se jod sakte ho.

## ⚠️ Important limitations — pehle padh lo

1. **Real government portals pe auto-submit nahi hai.** Har sarkari website
   (Railway, SSC, Bihar Police, etc.) ka form structure alag hota hai, aur
   kai portals ki Terms of Service automated/bot submission allow nahi karti.
   Isliye `/api/form-fill` sirf user ka data AI se **map/prepare** karta hai
   (jaise address split karna, DOB format karna) — asli submission user khud
   official website par karega, ya har portal ke liye alag se legal-safe
   integration banani hogi.
2. **Captcha AI se solve nahi hota** — ye jaan-boojh kar hai. Real captchas
   insaan ke liye hi bane hote hain; unhe automate karna zyada portals ke
   ToS todta hai. App me ek simple demo-captcha hai taaki flow samajh aaye.
3. **Payment abhi mock hai.** Real Razorpay/Paytm integration ke liye unki
   API keys `.env.local` me daalo aur `components/ApplyFlow.js` ke
   `handlePayment` function ko unke checkout SDK se jodo.
4. **User ka sensitive data** (Aadhaar number, address, documents) store
   karne se pehle proper encryption aur ek real database (Postgres/MongoDB)
   lagana zaroori hai — abhi data sirf browser me hai, kahin save nahi hota.

## Verified state/official links

`data/states.js` me abhi **73 verified official government links** hain — Central bodies (SSC,
Railway RRB, UPSC, IBPS, Indian Army/Navy/Air Force, BSF/CRPF/CISF/ITBP/SSB, CTET, NTA, KVS,
NVS, DSSSB, RBI, EPFO, India Post, LIC), saare 28 states + 8 UTs ke Police boards, aur 19 State
Public Service Commissions (UPPSC, BPSC, MPPSC, RPSC, TNPSC, TSPSC, GPSC, OPSC, JPSC, MPSC,
APPSC, WBPSC, HPSC, JKPSC, CGPSC, Kerala PSC, UKPSC, PPSC, KPSC, APSC).
`data/jobs.js` me **50 job/exam entries** hain — jaha exact last-date verify nahi ho paayi wahan
jaan-boojh kar `"Check official site"` likha hai, kyunki real deadlines hafte-hafte badalti hain
aur galat date dikhana users ko real form miss karwa sakta hai.
`data/documents.js` me PAN, Aadhaar, Voter ID, Driving Licence, aur Passport ke real
official portal links hain. Kuch chhote UTs (Lakshadweep, Ladakh, Dadra & Nagar Haveli) abhi
missing hain — kyunki unka alag, verified recruitment portal nahi mil paya. Galat/guess kiya
hua sarkari link daalna users ko galat jagah bhej sakta hai, isliye ye list carefully hi badhayi
gayi hai. Naya state/board add karne ke liye:

1. Us state ke police/PSC board ki asli official website search karke confirm karo
2. `data/states.js` me naya entry add karo
3. `data/jobs.js` me us state ki job entry me wahi `officialUrl` daal do

## Aage kya add karna hai (roadmap)

- [ ] Real database (Postgres via Prisma, ya MongoDB)
- [ ] User login/signup (NextAuth ya Clerk)
- [ ] Live job data — ek scraper/RSS pipeline jo official sites se real last-dates automatically
      fetch kare (abhi sab entries me date manually verify karni padti hai)
- [ ] Real payment gateway integration
- [ ] Document upload (PAN/Aadhaar/photo) with secure storage (S3/Cloudinary)
- [ ] WhatsApp alerts integration
- [ ] Admin panel naye jobs add karne ke liye

## Folder structure

```
app/                 → pages (App Router)
  jobs/[id]/         → dynamic job detail page
  api/               → backend routes (gemini, form-fill, jobs)
components/          → reusable UI pieces
data/                → mock job data (replace with DB later)
lib/                 → Gemini API helper
```
