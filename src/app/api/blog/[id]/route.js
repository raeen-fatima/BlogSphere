import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import Blog from "@/models/Blog";
// import User from "@/models/User";

export async function DELETE(req, context) {
  try {
    await connectDB();

    const { id } = await context.params;

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    if (blog.author.toString() !== decoded.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // 🔥 DELETE IMAGE FROM CLOUDINARY
    if (blog.imagePublicId) {
      await cloudinary.uploader.destroy(blog.imagePublicId);
    }

    // 🗑 DELETE BLOG FROM DB
    await Blog.findByIdAndDelete(id);

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const body = await req.json();

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    if (blog.author.toString() !== decoded.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    blog.title = body.title;
    blog.content = body.content;
    blog.image = body.image;

    await blog.save();

    return NextResponse.json({
      message: "Blog updated successfully",
      blog,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const blog = await Blog.findById(id).populate("author", "name email");

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
