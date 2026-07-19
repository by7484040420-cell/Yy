import { GoogleGenerativeAI } from "@google/generative-ai";

let client = null;

function getClient() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error(
      "GEMINI_API_KEY is missing. Add it to your .env.local file (see .env.example)."
    );
  }
  if (!client) {
    client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return client;
}

/**
 * Simple chat helper for the "Bipin AI Assistant" widget.
 * Keeps a small system instruction so answers stay focused on
 * jobs / admit cards / results / government-form help.
 */
export async function askAssistant(userMessage, history = []) {
  const genAI = getClient();
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
      "Tum 'Bipin AI', ek Sarkari naukri aur government-form sahayak ho. " +
      "Hindi-English mix (Hinglish) me, seedha aur helpful jawab do. " +
      "Job vacancies, admit card, result, aur documents (PAN/Aadhaar/DL) se related sawaalon me madad karo. " +
      "Kabhi bhi asli sarkari website ka login/password ya OTP mangne ko mat kaho.",
  });

  const chat = model.startChat({
    history: history.map((h) => ({
      role: h.role === "assistant" ? "model" : "user",
      parts: [{ text: h.text }],
    })),
  });

  const result = await chat.sendMessage(userMessage);
  return result.response.text();
}

/**
 * Takes the user's saved profile fields + a job's required field list,
 * and asks Gemini to map/normalize the data into the exact shape the
 * form needs (e.g. splitting a full address, formatting DOB, etc).
 *
 * NOTE: this only *prepares* the data. Actually submitting it into a
 * real government portal requires a site-specific integration (each
 * portal's form is different, and many portals' Terms of Service
 * restrict automated submission) — see README "Important limitations".
 */
export async function prepareFormData(userProfile, requiredFields) {
  const genAI = getClient();
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: { responseMimeType: "application/json" },
  });

  const prompt =
    "User profile (JSON): " +
    JSON.stringify(userProfile) +
    "\nRequired form fields: " +
    JSON.stringify(requiredFields) +
    "\nReturn ONLY a JSON object mapping each required field to a value " +
    "derived from the user profile. If a field can't be derived, set it to null.";

  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
}
