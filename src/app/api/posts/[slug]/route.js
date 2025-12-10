import { connectDB } from "@/lib/db";
import Post from "@/models/post";
import { success, failure } from "@/utils/responses";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const post = await Post.findOne({ slug: params.slug }); // ✅ FIX
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

    const updated = await Post.findOneAndUpdate(
      { slug: params.slug }, // ❗ FIX
      body,
      { new: true }
    );

    if (!updated) return failure("Post not found", 404);

    return success(updated);
  } catch (err) {
    return failure(err.message, 500);
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const deleted = await Post.findOneAndDelete({ slug: params.slug }); // ❗ FIX

    if (!deleted) return failure("Post not found", 404);

    return success("Deleted successfully");
  } catch (err) {
    return failure(err.message, 500);
  }
}
