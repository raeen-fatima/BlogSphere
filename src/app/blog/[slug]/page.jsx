"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function BlogDetailPage({ params }) {
  // ❌ WRONG → const { slug } = use(params)
  // ✅ Correct way:
const { slug } = params;

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [loading, setLoading] = useState(true);

  async function getBlog(slug) {
    try {
      const res = await fetch(`${API_URL}/api/posts/${slug}`, {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to load blog");

      const data = await res.json();
      return data.data || null;
    } catch (err) {
      toast.error("Failed to load blog.");
      return null;
    }
  }

  async function getComments(postId) {
    try {
      const res = await fetch(`${API_URL}/api/comments/${postId}`, {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to load comments");

      const data = await res.json();
      return data.data || [];
    } catch (err) {
      toast.error("Failed to load comments.");
      return [];
    }
  }

  useEffect(() => {
    async function fetchData() {
      const post = await getBlog(slug);
      setBlog(post);

      if (post) {
        const comms = await getComments(post._id);
        setComments(comms);
      }

      setLoading(false);
    }
    fetchData();
  }, [slug]);

  if (loading)
    return <div className="pt-24 text-center">Loading...</div>;

  if (!blog)
    return (
      <div className="max-w-3xl mx-auto p-6 pt-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Blog Not Found</h1>
        <Link href="/blog" className="text-blue-600 hover:underline">
          Back to All Blogs
        </Link>
      </div>
    );

  async function handleCommentSubmit(e) {
    e.preventDefault();
    if (!commentInput.trim()) return;

    try {
      const res = await fetch(`${API_URL}/api/comments/${blog._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: commentInput }),
      });

      if (!res.ok) throw new Error("Failed to post comment");

      const data = await res.json();

      // Add new comment in UI instantly
      setComments([data.data, ...comments]);
      setCommentInput("");

      toast.success("Comment added!");
    } catch (err) {
      toast.error("Failed to post comment.");
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 pt-24">
      {blog.coverImage && (
        <div className="relative w-full h-64 rounded overflow-hidden mb-6">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
      <p className="text-gray-500 mb-6">
        By {blog.author?.name || "Unknown"} •{" "}
        {new Date(blog.createdAt).toLocaleDateString()}
      </p>

      <div className="prose max-w-none mb-12">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {blog.content}
        </ReactMarkdown>
      </div>

      {/* Comments Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>

        <form
          onSubmit={handleCommentSubmit}
          className="flex flex-col gap-2 mb-4"
        >
          <textarea
            className="border p-2 rounded"
            placeholder="Write a comment..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            rows={3}
          />

          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Post Comment
          </button>
        </form>

        {comments.length > 0 ? (
          <ul className="space-y-3">
            {comments.map((c) => (
              <li key={c._id} className="border rounded p-3 bg-gray-50">
                <strong>{c.author?.name || "Anonymous"}:</strong> {c.text}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>

      <Link href="/blog" className="text-blue-600 hover:underline">
        ← Back to All Blogs
      </Link>
    </div>
  );
}
