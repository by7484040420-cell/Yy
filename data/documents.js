// Verified official government portals for common documents.
// Same rule as data/states.js: only real, checked URLs go here.
export const documentServices = [
  {
    id: "aadhaar",
    name: "Aadhaar Card",
    desc: "Download, update ya correction ke liye",
    url: "https://uidai.gov.in",
  },
  {
    id: "pan-nsdl",
    name: "PAN Card (Protean/NSDL)",
    desc: "Naya PAN apply ya correction",
    url: "https://onlineservices.proteantech.in/paam/endUserRegisterContact.html",
  },
  {
    id: "pan-utiitsl",
    name: "PAN Card (UTIITSL)",
    desc: "PAN apply / e-PAN / status",
    url: "https://www.pan.utiitsl.com",
  },
  {
    id: "pan-efiling",
    name: "PAN–Aadhaar Link",
    desc: "Income Tax e-filing portal se link karo",
    url: "https://www.incometax.gov.in",
  },
  {
    id: "voter-id",
    name: "Voter ID (EPIC)",
    desc: "Naya register, correction, status",
    url: "https://voters.eci.gov.in",
  },
  {
    id: "driving-licence",
    name: "Driving Licence",
    desc: "Apply, renewal, status (Parivahan Sarathi)",
    url: "https://parivahan.gov.in",
  },
  {
    id: "passport",
    name: "Passport",
    desc: "Naya apply, renewal, appointment",
    url: "https://www.passportindia.gov.in",
  },
  {
    id: "eshram",
    name: "e-Shram Card",
    desc: "Unorganised workers ke liye UAN card",
    url: "https://eshram.gov.in",
  },
  {
    id: "ayushman-bharat",
    name: "Ayushman Bharat (PMJAY)",
    desc: "Free health insurance card check/apply",
    url: "https://www.pmjay.gov.in",
  },
  {
    id: "epfo-uan",
    name: "EPFO / UAN",
    desc: "PF balance, UAN activation, passbook",
    url: "https://www.epfindia.gov.in",
  },
];

export function getDocumentById(id) {
  return documentServices.find((d) => d.id === id);
}
