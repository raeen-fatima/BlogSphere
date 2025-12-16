"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import MDEditor from "@uiw/react-md-editor";

export default function UpdateBlogPage() {
  
  const router = useRouter();
  const params = useParams(); // { id: "blogId" }
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving] = useState(false);

  // Fetch blog data
  useEffect(() => {
    async function fetchBlog() {
      const res = await fetch(`/api/blog/${params.id}`);
      if (res.ok) {
        const blog = await res.json();
        setTitle(blog.title);
        setContent(blog.content);
        // setCoverImage(blog.coverImage || "");
      } else {
        toast.error("Failed to fetch blog");
      }
      setLoading(false);
    }
    fetchBlog();
  }, [params.id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/blog/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    if (res.ok) {
      toast.success("Blog updated!");
      router.push("/dashboard");
    } else {
      const data = await res.json();
      toast.error(data.error || "Update failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <Toaster position="top-right" />

      <div className="w-full max-w-3xl backdrop-blur-xl border border-black/40 shadow-xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-6 text-center">
          Update Blog
        </h1>

        <form onSubmit={handleUpdate} className="space-y-5">
          {/* Title */}
          <input
            type="text"
            placeholder="Blog title"
            className="w-full px-4 py-3 border-b border-gray-900/20 focus:border-black focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* Content */}
          <MDEditor
            value={content}
            onChange={setContent}
            height={500}
            preview="edit"
          />

          {/* Submit */}
          <button
            disabled={saving}
            className="w-full py-2 rounded-full border-2 border-black font-semibold hover:bg-black hover:text-white transition disabled:opacity-60"
          >
            {saving ? "Updating..." : "Update Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}
