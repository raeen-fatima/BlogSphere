"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    const res = await fetch("/api/blog");
    const data = await res.json();
    setBlogs(data);
    setLoading(false);
  }

  async function deleteBlog(id) {
    if (!confirm("Delete this blog?")) return;

    const res = await fetch(`/api//blog/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success("Blog deleted");
      setBlogs(blogs.filter((b) => b._id !== id));
    }
  }

  if (loading) return <p>Loading blogs...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Blogs</h1>

      <table className="w-full border">
        <thead className="bg-black text-white">
          <tr>
            <th className="p-2">Title</th>
            <th className="p-2">Author</th>
            <th className="p-2">Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id} className="border-t">
              <td className="p-2">{blog.title}</td>
              <td className="p-2">{blog.author?.name}</td>
              <td className="p-2">
                {new Date(blog.createdAt).toLocaleDateString()}
              </td>
              <td className="p-2 flex gap-3">
                <a
                  href={`/dashboard/update/${blog._id}`}
                  className="bg-black py-2 px-4 rounded-full text-white"
                >
                  Edit
                </a>
                <button
                  onClick={() => deleteBlog(blog._id)}
                  className="bg-red-600 py-2 px-4 rounded-full text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
