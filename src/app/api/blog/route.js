import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Blog from "@/models/Blog";
import { getUserFromCookie } from "@/lib/auth";

export async function POST(req) {
  try {
    await connectDB();

    const user = await getUserFromCookie();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title, content, image, imagePublicId } = await req.json(); // ✅ image added

    if (!title || !content) {
      return NextResponse.json(
        { message: "Title and content are required" },
        { status: 400 }
      );
    }

    const blog = await Blog.create({
      title,
      content,
      image: image || "",
      imagePublicId: imagePublicId || "",
      author: user._id,
    });

    await blog.populate("author", "name avatar");

    return NextResponse.json(
      { message: "Blog created", blog },
      { status: 201 }
    );
  } catch (error) {
    console.error("BLOG CREATE ERROR 👉", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const blogs = await Blog.find()
      .populate("author", "name avatar")
      .sort({ createdAt: -1 });

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("GET BLOG ERROR 👉", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
