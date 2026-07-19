import { NextResponse } from "next/server";
import { prepareFormData } from "@/lib/gemini";
import { getJobById } from "@/data/jobs";

export async function POST(req) {
  try {
    const { jobId, profile } = await req.json();
    const job = getJobById(jobId);

    if (!job) {
      return NextResponse.json({ error: "Job not found." }, { status: 404 });
    }
    if (!profile) {
      return NextResponse.json(
        { error: "User profile is required." },
        { status: 400 }
      );
    }

    const filled = await prepareFormData(profile, job.fields);

    // At this point `filled` holds the mapped values ready to be shown
    // to the user for review before they hit "Continue to captcha".
    // Actual submission into the official portal is deliberately NOT
    // automated here — see README "Important limitations".
    return NextResponse.json({ jobId, filled });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Could not prepare form data." },
      { status: 500 }
    );
  }
}
