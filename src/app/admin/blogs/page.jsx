"use client";

export default function AdminBlogs({ blogs }) {
  async function updateStatus(id, status) {
    await fetch(`/api/auth/admin/blog/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    location.reload();
  }

  return (
    <table className="w-full bg-white rounded shadow">
      <thead>
        <tr className="border-b">
          <th>Title</th>
          <th>Author</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {blogs.map(blog => (
          <tr key={blog._id} className="border-b">
            <td>{blog.title}</td>
            <td>{blog.author?.name}</td>
            <td>{blog.status}</td>
            <td className="space-x-2">
              {blog.status === "pending" && (
                <>
                  <button
                    onClick={() => updateStatus(blog._id, "approved")}
                    className="px-3 py-1 bg-green-600 text-white rounded"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updateStatus(blog._id, "rejected")}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Reject
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
