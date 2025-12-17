"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { FaComments, FaCommentSlash } from "react-icons/fa";
import CommentBox from "./CommentBox";
import LikeButton from "./LikeButton";
import { MoreVertical } from "lucide-react";
import ReactMarkdown from "react-markdown";

function YourBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showComments, setShowComments] = useState({});
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch("/api/blog/my", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Fetch failed");
        const data = await res.json();
        setBlogs(data);
      } catch {
        toast.error("Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Delete failed");

      toast.success("Blog deleted");
      setBlogs((prev) => prev.filter((b) => b._id !== id));
      setActiveDropdown(null);
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <p className="animate-pulse text-gray-500">Loading your blogs...</p>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-20">
        You haven&apos;t written any blogs yet ✍
      </p>
    );
  }

  return (
    <div className="px-4">
      <h1 className="text-3xl sm:text-4xl bg-black/20 font-bold mb-10 text-center">
        Your Blogs
      </h1>

      <div className="grid gap-8 max-w-5xl mx-auto">
        {blogs.map((blog) => (
          <div key={blog._id} className="border-b border-black/40 pb-6">
            {/* Author */}
            <div className="flex items-center gap-2 mb-3">
              <Image
                 src={blog.author?.avatar || "/avtar.jpg"}
                alt={blog.author?.name || "Author avatar"}
                width={36}
                height={36}
                className="rounded-full border border-gray-600"
              />
              <span className="font-medium text-gray-600">
                {blog.author?.name || "You"}
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-col-reverse sm:flex-row gap-4 sm:gap-6">
              {/* Text */}
              <div className="flex-1">
                <Link href={`/blog/${blog._id}`}>
                  <h2 className="font-bold text-2xl sm:text-3xl hover:underline line-clamp-2">
                    {blog.title}
                  </h2>
                </Link>

                <div className="text-gray-600 text-sm mt-2 line-clamp-3">
                  <ReactMarkdown>{blog.content}</ReactMarkdown>
                </div>
              </div>

              {/* Image */}
              <div className="relative w-full sm:w-56 h-48 sm:h-36 shrink-0 shadow-2xl overflow-hidden">
                <Image
                  src={blog.image || "/placeholder.jpg"}
                  alt={blog.title || "Blog cover image"}
                  fill
                  sizes="(max-width: 640px) 100vw, 224px"
                  priority
                  className="object-cover"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-4 text-sm">
              <span className="text-gray-600">
                {new Date(blog.createdAt).toLocaleDateString()}
              </span>

              <div className="flex items-center gap-4">
                <LikeButton
                  blogId={blog._id}
                  initialLikes={blog.likes?.length ?? 0}
                />

                <button
                  onClick={() =>
                    setShowComments((prev) => ({
                      ...prev,
                      [blog._id]: !prev[blog._id],
                    }))
                  }
                >
                  {showComments[blog._id] ? (
                    <FaCommentSlash size={20} />
                  ) : (
                    <FaComments size={20} />
                  )}
                </button>

                {/* Dropdown */}
                <div className="relative">
                  <button
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === blog._id ? null : blog._id
                      )
                    }
                    className="p-2 rounded hover:bg-gray-600/15"
                  >
                    <MoreVertical size={18} />
                  </button>

                  {activeDropdown === blog._id && (
                    <div className="absolute right-0 mt-2 w-36 bg-black/10 backdrop-blur-xl rounded-lg shadow-lg border border-gray-500/30 p-2 z-50">
                      <Link
                        href={`/dashboard/update/${blog._id}`}
                        className="block px-2 py-1 rounded hover:bg-white/20"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="block w-full text-left px-2 py-1 rounded text-red-600 hover:bg-white/20"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Comments */}
            {showComments[blog._id] && (
              <div className="mt-4">
                <CommentBox blogId={blog._id} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default YourBlog;
