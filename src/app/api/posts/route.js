import { connectDB } from "@/lib/db";
import Post from "@/models/post";
import { verifyToken } from "@/lib/auth";
import slugify from "slugify";
import "@/models/user";  // <-- EXTRA safety

export async function GET() {
  try {
    await connectDB();
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("author", "name email"); // populate author if needed

    // Rename coverImage to image for front-end
    const formatted = posts.map((p) => ({
      ...p._doc,
      image: p.coverImage,
    }));

    return new Response(JSON.stringify({ data: formatted }), { status: 200 });
  } catch (err) {
    console.error("GET POSTS ERROR:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();

    // Token from headers
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) return new Response("Unauthorized", { status: 401 });

    const user = verifyToken(token);
    if (!user) return new Response("Invalid token", { status: 401 });

    const { title, content, coverImage } = await req.json();
    if (!title || !content) return new Response("Title & Content required", { status: 400 });

    // Slug
    let slug = slugify(title, { lower: true, strict: true });
    if (await Post.findOne({ slug })) slug += `-${Date.now()}`;

    const post = await Post.create({
      title,
      content,
      coverImage,
      slug,
      author: user.id,
    });

    // Return in same format as GET
    return new Response(JSON.stringify({ data: { ...post._doc, image: post.coverImage } }), { status: 201 });
  } catch (err) {
    console.error("POST ERROR:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
