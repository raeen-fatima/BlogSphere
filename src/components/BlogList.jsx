"use client";
import { useEffect, useState } from "react";
import BlogCard from "@/components/BlogCard";

export default function BlogListPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("/api/blog")
      .then(res => res.json())
      .then(data => setBlogs(data));
  }, []);

  return (
    <div className="">
      {blogs.map(blog => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
}
