"use client";
import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

export default function CommentBox({ blogId }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const submitComment = async () => {
    if (!text.trim()) return;

    try {
      setLoading(true);
      await fetch(`/api/blog/${blogId}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      setText("");
      window.dispatchEvent(new Event("commentAdded"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <div className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 focus-within:border-black transition">
        
        {/* Input */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 bg-transparent text-sm outline-none placeholder-gray-400"
          onKeyDown={(e) => e.key === "Enter" && submitComment()}
        />

        {/* Send Button */}
        <button
          onClick={submitComment}
          disabled={loading || !text.trim()}
          className="bg-black flex items-center gap-1 rounded-full px-4 py-1.5 text-xs font-medium text-white hover:bg-gray-900 disabled:opacity-50"
        >
          <FaPaperPlane size={12} />
          {loading ? "Sending" : "Send"}
        </button>
      </div>
    </div>
  );
}
