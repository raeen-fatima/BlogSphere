import { connectDB } from "@/lib/db";
import Comment from "@/models/Comment";

export async function GET(req, context) {
  const { postId } = await context.params;

  try {
    await connectDB();
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
    return Response.json({ success: true, data: comments });
  } catch (err) {
    return Response.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(req, context) {
  const { postId } = await context.params;  // ← FIXED

  try {
    await connectDB();

    const body = await req.json();
    const comment = await Comment.create({
      postId,
      author: body.author || "Anonymous",
      text: body.text,
    });

    return Response.json({ success: true, data: comment });
  } catch (err) {
    return Response.json({ success: false, message: err.message }, { status: 500 });
  }
}
