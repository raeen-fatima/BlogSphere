"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

export default function CreateBlog() {
  const [post, setPost] = useState({ title: "", content: "" });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Upload image to Cloudinary
  async function uploadImage() {
    try {
      const formData = new FormData();
      formData.append("file", imageFile);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Image upload failed");

      const data = await res.json();
      return data.url; // secure Cloudinary URL
    } catch (error) {
      toast.error("Image upload failed: " + error.message);
      throw error;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!post.title || !post.content) {
      toast.error("Title and content are required");
      return;
    }

    setLoading(true);
    try {
      let imageUrl = "";
      if (imageFile) imageUrl = await uploadImage();

      // Get JWT token from localStorage (or cookie)
      const token = localStorage.getItem("token"); // ya jahan aap store kar rahe ho
      if (!token) {
        toast.error("You must be logged in");
        setLoading(false);
        return;
      }

      const finalPost = { 
        ...post, 
        coverImage: imageUrl,
      };

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(finalPost),
      });

      if (!res.ok) throw new Error("Post creation failed");

      toast.success("Blog published successfully!");
      router.push("/blog");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 pt-24 max-w-xl mx-auto">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-4">Create Blog</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="border p-2"
          placeholder="Enter Title"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />

        <textarea
          className="border p-2"
          rows={6}
          placeholder="Enter Content"
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
        />

        <input
          type="file"
          accept="image/*"
          className="border p-2"
          onChange={(e) => setImageFile(e.target.files[0])}
        />

        <button
          className={`bg-black text-white p-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          {loading ? "Publishing..." : "Publish Blog"}
        </button>
      </form>

      {imageFile && (
        <div className="mt-4">
          <h2 className="font-bold mb-2">Preview:</h2>
          <Image
            src={URL.createObjectURL(imageFile)}
            alt="Preview"
            width={500}
            height={500}
            style={{ width: "100%", height: "auto" }}
            className="rounded"
          />
        </div>
      )}
    </div>
  );
}
