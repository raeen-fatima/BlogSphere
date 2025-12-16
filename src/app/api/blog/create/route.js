import { connectDB } from "@/lib/db";
import Blog from "@/models/post";
import { verifyToken } from "@/lib/auth";
import "@/models/user";
import slugify from "slugify";

export async function POST(req) {
  try {
    await connectDB();

    // 1. GET TOKEN FROM HEADER
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    if (!token) {
      return Response.json({ error: "No token provided" }, { status: 401 });
    }

    // 2. VERIFY USER
    const user = verifyToken(token);
    if (!user) {
      return Response.json({ error: "Invalid token" }, { status: 401 });
    }

    // 3. READ BODY
    const { title, content, coverImage } = await req.json();
    if (!title || !content) {
      return Response.json(
        { error: "Title & Content required" },
        { status: 400 }
      );
    }

    // 4. GENERATE SLUG & ENSURE UNIQUE
    let slug = slugify(title, { lower: true, strict: true });
    let existing = await Blog.findOne({ slug });
    if (existing) slug = `${slug}-${Date.now()}`;

    // 5. CREATE BLOG
    const blog = await Blog.create({
      title,
      content,
      coverImage,
      slug,
      author: user.id,
    });

    return Response.json({ success: true, blog }, { status: 201 });
  } catch (err) {
    console.error("CREATE BLOG ERROR:", err);
    return Response.json({ error: "Server Error" }, { status: 500 });
  }
}
