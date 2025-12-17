import connectDB from "@/lib/db";
import Blog from "@/models/Blog";
import { notFound } from "next/navigation";
import BlogDetailClient from "@/components/BlogDetailClient";
import User from "@/models/User";

export default async function BlogDetailPage({ params }) {
  const { id } = await params;

  await connectDB();

  const blog = await Blog.findById(id)
    .populate("author", "name avatar")
    .lean();

  if (!blog) return notFound();

  return <BlogDetailClient blog={JSON.parse(JSON.stringify(blog))} />;
}
