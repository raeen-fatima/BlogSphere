"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { UploadCloud } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";

export default function UpdateBlogPage() {
  const router = useRouter();
  const params = useParams(); // { id: 'blogId' }

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Fetch existing blog
  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await fetch(`/api/blog/${params.id}`);
        if (!res.ok) throw new Error("Failed to fetch blog");
        const blog = await res.json();
        setTitle(blog.title);
        setContent(blog.content);
        if (blog.image) setPreview(blog.image);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [params.id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      let imageUrl = preview;
      let imagePublicId = null;

      if (image) {
        const formData = new FormData();
        formData.append("image", image);
        const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadData.error);
        imageUrl = uploadData.imageUrl;
        imagePublicId = uploadData.publicId;
      }

      const res = await fetch(`/api/blog/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, image: imageUrl, imagePublicId }),
      });

      if (!res.ok) throw new Error("Failed to update blog");

      toast.success("Blog updated!");
      router.push("/dashboard");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
      <Toaster position="top-right" />

      <div className="w-full max-w-3xl border border-black/20 rounded-2xl shadow-xl p-6 sm:p-8 bg-white">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-8 text-center">
          Update Blog
        </h1>

        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Title */}
          <input
            type="text"
            placeholder="Blog title"
            className="w-full px-2 py-3 border-b border-gray-300 focus:border-black focus:outline-none transition text-sm sm:text-base"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* Markdown Editor */}
          <MDEditor
            value={content}
            onChange={setContent}
            height={500}
            preview="edit"
          />

          {/* Image Upload */}
          <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-400 rounded-xl p-6 cursor-pointer hover:bg-gray-50 transition">
            <UploadCloud size={26} />
            <span className="text-sm text-gray-600">
              Click to upload cover image (optional)
            </span>

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files[0];
                setImage(file);
                setPreview(URL.createObjectURL(file));
              }}
            />
          </label>

          {/* Image Preview */}
          {preview && (
            <div className="relative w-full h-52 rounded-xl overflow-hidden border">
              <img
                src={preview}
                alt="Preview"
                className="object-cover w-full h-full"
              />
            </div>
          )}

          {/* Submit */}
          <button
            disabled={updating}
            className="w-full py-2.5 rounded-full border-2 border-black text-black font-semibold tracking-wide hover:bg-black hover:text-white transition disabled:opacity-60"
          >
            {updating ? "Updating..." : "Update Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}
