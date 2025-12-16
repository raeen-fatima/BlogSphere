"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

function YourBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      const res = await fetch("/api/blog/my", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      } else {
        toast.error("Failed to fetch blogs");
      }
      setLoading(false);
    }

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });

    if (res.ok) {
      toast.success("Blog deleted!");
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } else {
      const data = await res.json();
      toast.error(data.error || "Delete failed");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-center">
        Your Blogs
      </h1>

      <div className="grid gap-6">
        {blogs.map((post) => (
          <div
            key={post._id}
            className="border border-black/10 rounded p-4 bg-black/20 shadow-sm hover:shadow-md transition"
          >
            {/* Author */}
            <p className="text-sm text-gray-500 mb-2">
              ✍ {post.author?.name || "You"}
            </p>

            {/* Content + Image */}
            <div className="flex gap-4">
              {/* Text */}
              <div className="flex-1">
                <Link href={`/blog/${post._id}`}>
            <h2 className="font-bold text-lg line-clamp-2 hover:underline">
              {post.title}
            </h2>
          </Link>

                <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                  {post.content}
                </p>
              </div>

              {/* Image */}
              <div className="relative w-60 h-38 shrink-0">
                <Image
                  src={post.image || "/placeholder.jpg"}
                  alt={post.title}
                  fill
                  className="object-cover "
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
              <span>
                ⏱ {new Date(post.createdAt).toLocaleDateString()}
              </span>

              <div className="flex gap-4">
                <Link
                  href={`/dashboard/update/${post._id}`}
                  className="text-black hover:underline font-medium"
                >
                  Update
                </Link>

                <button
                  onClick={() => handleDelete(post._id)}
                  className="text-red-600 hover:underline font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default YourBlog;
