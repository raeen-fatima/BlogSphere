import { connectDB } from "@/lib/db";
import Blog from "@/models/post";

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find();
    return Response.json({ blogs }, { status: 200 });
  } catch (err) {
    console.error("GET BLOGS ERROR:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
