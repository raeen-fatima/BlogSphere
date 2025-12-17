import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Blog from "@/models/Blog";
import { getUserFromCookie } from "@/lib/auth";

export async function GET() {
  await connectDB();

  const user = await getUserFromCookie();
  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const blogs = await Blog.find({
    author: user._id, // 🔥 key line
  }).populate("author", "name email avatar").sort({ createdAt: -1 });

  return NextResponse.json(blogs);
}
