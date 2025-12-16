"use client";
import { useEffect, useState } from "react";

export default function CommentsList({ blogId }) {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const res = await fetch(`/api/blog/${blogId}/comment`);
    const data = await res.json();
    setComments(data);
  };

  useEffect(() => {
    fetch(`/api/blog/${blogId}/comment`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, [blogId]);

  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-2">Comments ({comments.length})</h3>

      {comments.map((c) => (
        <div key={c._id} className="border-b py-3">
          <p className="font-medium">{c.user?.name}</p>
          <p className="text-gray-700">{c.text}</p>
          <span className="text-xs text-gray-500">
            {new Date(c.createdAt).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}
