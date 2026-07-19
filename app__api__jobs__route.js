import { NextResponse } from "next/server";
import { jobs } from "@/data/jobs";

export async function GET() {
  // Later: replace with a real database query
  return NextResponse.json({ jobs });
}
