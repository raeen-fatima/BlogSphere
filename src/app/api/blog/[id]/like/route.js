import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Blog from "@/models/Blog";
import { getUserFromCookie } from "@/lib/auth";

export async function POST(req, context) {
  try {
    await connectDB();

    
    const { id } = await context.params;

    const user = await getUserFromCookie(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = user.userId; // already string

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const index = blog.likes.indexOf(userId);
    let liked;

    if (index === -1) {
      blog.likes.push(userId);
      liked = true;
    } else {
      blog.likes.splice(index, 1);
      liked = false;
    }

    // if (!blog.likes.includes(userId)) {
    //   blog.likes.push(userId);
    // } else {
    //   blog.likes.pull(userId);
    // }

    await blog.save();

    return NextResponse.json({
      liked,
      likesCount: blog.likes.length,
    });
  } catch (err) {
    console.error("LIKE ERROR 👉", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
