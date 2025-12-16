"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { UploadCloud } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";
import { useEffect } from "react";

export default function CreateBlogPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please select an image");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", image);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.error);

      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          image: uploadData.imageUrl,
          imagePublicId: uploadData.publicId,
        }),
      });

      if (!res.ok) throw new Error("Failed to create blog");

      toast.success("Blog published!");
      router.push("/dashboard");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <Toaster position="top-right" />

      <div className="w-full max-w-3xl border border-black/40 rounded-2xl shadow-xl p-6 sm:p-8 bg-white">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-8 text-center">
          Create New Blog
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <input
            type="text"
            placeholder="Blog title"
            className="w-full px-2 py-3 border-b border-gray-300 focus:border-black focus:outline-none transition text-sm sm:text-base"
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

          {/* Image Upload */}
          <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-400 rounded-xl p-6 cursor-pointer hover:bg-gray-50 transition">
            <UploadCloud size={26} />
            <span className="text-sm text-gray-600">
              Click to upload cover image
            </span>

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files[0];

                if (!file.type.startsWith("image/")) {
                  toast.error("Only image files allowed");
                  return;
                }

                setImage(file);
                setPreview(URL.createObjectURL(file));
              }}
              required
            />
          </label>

          {/* Image Preview */}
          {preview && (
            <div className="relative rounded-xl overflow-hidden border">
              <img
                src={preview}
                alt="Preview"
                className="object-cover w-full h-full max-h-[400px]"
              />
            </div>
          )}

          {/* Submit */}
          <button
            disabled={loading}
            className="w-full py-2.5 rounded-full border-2 border-black text-black font-semibold tracking-wide hover:bg-black hover:text-white transition disabled:opacity-60"
          >
            {loading ? "Publishing..." : "Publish Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}
