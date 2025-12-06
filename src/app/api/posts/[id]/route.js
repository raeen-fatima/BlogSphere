import { connectDB } from "@/lib/db";
import Post from "@/models/post";
import { success, failure } from "@/utils/responses";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const post = await Post.findById(params.id);
    if (!post) return failure("Post not found", 404);
    return success(post);
  } catch (err) {
    return failure(err.message, 500);
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const body = await req.json();

    const updated = await Post.findByIdAndUpdate(params.id, body, {
      new: true
    });

    return success(updated);
  } catch (err) {
    return failure(err.message, 500);
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    await Post.findByIdAndDelete(params.id);
    return success("Deleted successfully");
  } catch (err) {
    return failure(err.message, 500);
  }
}
