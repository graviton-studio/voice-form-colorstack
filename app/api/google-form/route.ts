import { NextResponse } from "next/server";
import { getFormStructure } from "@/lib/google-form";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const formID = request.nextUrl.searchParams.get("formID");
  if (!formID) {
    return new Response("Form ID is required", { status: 400 });
  }
  console.log(formID);
  const questions = await getFormStructure(formID);
  return NextResponse.json(questions);
}
