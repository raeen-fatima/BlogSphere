"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function CommentsList({ blogId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`/api/blog/${blogId}/comment`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, [blogId]);

  return (
    <div className="mt-10">
      {/* Header */}
      <h3 className="text-lg font-semibold mb-4">
        Comments <span className="text-gray-500">({comments.length})</span>
      </h3>

      {/* Empty State */}
      {comments.length === 0 && (
        <p className="text-gray-500 text-sm italic">
          No comments yet. Be the first one to comment ✨
        </p>
      )}

      {/* Comments */}
      <div className="space-y-4">
        {comments.map((c) => (
          <div
            key={c._id}
            className="flex gap-3 p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition"
          >
            {/* Avatar */}
            <Image
              src="/avtar.jpg"
              alt={c.user?.name || "User"}
              width={36}
              height={36}
              className="rounded-full border"
            />

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-medium text-sm">
                  {c.user?.name || "Anonymous"}
                </p>
                <span className="text-xs text-gray-500">
                  {new Date(c.createdAt).toLocaleDateString()}
                </span>
              </div>

              <p className="text-gray-700 text-sm mt-1 leading-relaxed">
                {c.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
