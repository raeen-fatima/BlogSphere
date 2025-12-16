"use client";
import { useEffect, useState } from "react";

export default function Comments({ blogId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch(`/api/comments/${blogId}`)
      .then(res => res.json())
      .then(setComments);
  }, [blogId]);

  const submitComment = async () => {
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blogId, text }),
    });

    if (res.ok) {
      const newComment = await res.json();
      setComments([newComment, ...comments]);
      setText("");
    }
  };

  return (
    <div className="mt-6">
      <h3 className="font-bold mb-2">Comments</h3>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border p-2 rounded"
        placeholder="Write a comment..."
      />

      <button
        onClick={submitComment}
        className="mt-2 bg-black text-white px-4 py-2 rounded"
      >
        Post
      </button>

      <div className="mt-4 space-y-3">
        {comments.map((c) => (
          <div key={c._id} className="border p-2 rounded">
            <p className="text-sm font-medium">{c.user.name}</p>
            <p className="text-sm text-gray-600">{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
