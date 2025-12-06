import { connectDB } from "@/lib/db";
import Post from "@/models/post";
import { success, failure } from "@/utils/responses";

export async function GET() {
  try {
    await connectDB();
    const posts = await Post.find().sort({ createdAt: -1 });
    return success(posts);
  } catch (err) {
    return failure(err.message, 500);
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const post = await Post.create(body);
    return success(post, 201);
  } catch (err) {
    return failure(err.message, 500);
  }
}
