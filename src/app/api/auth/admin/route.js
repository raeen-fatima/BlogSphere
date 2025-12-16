import { NextResponse } from "next/server";
import { getUserFromCookie } from "@/lib/auth";

export async function GET() {
  const user = await getUserFromCookie(req);

  if (!user || user.role !== "admin") {
    return NextResponse.json(
      { message: "Access denied" },
      { status: 403 }
    );
  }

  return NextResponse.json({
    message: "Welcome Admin",
    user,
  });
}
