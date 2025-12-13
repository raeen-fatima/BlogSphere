import { NextResponse } from "next/server";
import { getUserFromToken } from "@/lib/auth";

export async function GET(req) {
  const user = await getUserFromToken(req);

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
