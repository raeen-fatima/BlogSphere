import { connectDB } from "@/lib/db";
import Blog from "@/models/post";
import "@/models/User"; // <-- ADD THIS

export async function GET(req, context) {
  try {
    await connectDB();

    const params = await context.params;  // 👈 IMPORTANT FIX

    const slug = params.slug;

    console.log("Slug received:", slug);

    const blog = await Blog.findOne({ slug }).populate(
      "author",
      "name avatar"
    );

    if (!blog) {
      console.log("Blog NOT found");
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    console.log("Blog found:", blog.title);

    return Response.json(blog, { status: 200 });

  } catch (err) {
    console.error("GET blog error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
