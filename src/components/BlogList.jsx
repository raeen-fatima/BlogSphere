"use client";
import { useEffect, useState } from "react";
import BlogCard from "@/components/BlogCard";

export default function BlogListPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
  const fetchBlogs = async () => {
    setLoading(true);

    const res = await fetch("/api/blog");
    const data = await res.json();

    setBlogs(data);
    setLoading(false); 
  };

  fetchBlogs();
}, []);


  return (
    <div className="">
       {loading ? (
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 text-sm font-bold">Loading blogs...</p>
        </div>
      ) : (
        blogs.map(blog => (
          <BlogCard key={blog._id} blog={blog} />
      )))}
    </div>
  );
}
