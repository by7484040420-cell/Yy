import { NextResponse } from "next/server";
import { askAssistant } from "@/lib/gemini";

export async function POST(req) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const reply = await askAssistant(message, history || []);
    return NextResponse.json({ reply });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "AI assistant is unavailable right now." },
      { status: 500 }
    );
  }
}
