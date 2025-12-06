"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateBlog() {
  const [post, setPost] = useState({ title: "", content: "" });
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(post)
    });

    router.push("/blog");
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Create Blog</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="border p-2"
          placeholder="Enter Title"
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />

        <textarea
          className="border p-2"
          rows={6}
          placeholder="Enter Content"
          onChange={(e) => setPost({ ...post, content: e.target.value })}
        />

        <button className="bg-black text-white p-2 rounded">
          Publish Blog
        </button>
      </form>
    </div>
  );
}
