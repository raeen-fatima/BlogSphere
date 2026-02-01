import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Comment from "@/models/Comment";
import { getUserFromCookie } from "@/lib/auth"; 

// Create a new comment for a specific blog
export async function POST(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const { text } = await req.json();

    const user = await getUserFromCookie(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!text || !text.trim()) {
      return NextResponse.json(
        { error: "Comment cannot be empty" },
        { status: 400 }
      );
    }

    const comment = await Comment.create({
      blog: id,
      user: user._id,
      text,
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (err) {
    console.error("COMMENT ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


// Get comments for a specific blog
export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const comments = await Comment.find({ blog: id })
      .populate("user", "name email image")
      .sort({ createdAt: -1 });

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error("GET COMMENTS ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}